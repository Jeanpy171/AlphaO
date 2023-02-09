import { Alert, FlatList, RefreshControl, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import MainHeader from '../components/MainHeader'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Image } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Icon } from '@rneui/base';
import { colors, sizes } from '../const/CONST';
import LoaderAnimation from '../components/LoaderAnimation';
import { AuthContext } from '../context/AuthContext';

const MiReserves = ({ navigation }) => {
    const token = AsyncStorage.getItem('token');
    const [reservas, setReservas] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [showAnimation, setShowAnimation] = useState(false);
    const [info, setInfo] = useState("")
    const { notifications, setNotifications } = useContext(AuthContext)
    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }
    const getEventsList = async () => {
        
        console.log(await token)
        setShowAnimation(true)
        try {
            console.log("Recopilando mis eventos")
            const response = await axios.get(
                'https://alphaofinal.herokuapp.com/api/alpha/reservas/misreservs',
                { headers: { 'accept': 'application/json', 'authorization': await token } }
            );
            console.log(response.data);
            if (response.data.hasOwnProperty('data')) {
                const res = [];
                res.push(response.data.data.reservas)
                //setNotifications(res.length + 1)
                setReservas(response.data.data.reservas)
            } else {
                setReservas([])
                setNotifications(0)
                setInfo(response.data.message)
                console.log(reservas.length)
            }
            setShowAnimation(false)
        } catch (e) {
            console.log(e)
            setShowAnimation(false)
            alert("Error al cargar mis reservas");
        }
    }

    const deleteReserv = async (number) => {
        setShowAnimation(true)
        try {
            console.log(`Eliminando la reserva: ${number}`)
            console.log(`https://alphaofinal.herokuapp.com/api/alpha/reservas/${number}/destroy`)
            const response = await axios.get(
                `https://alphaofinal.herokuapp.com/api/alpha/reservas/${number}/destroy`,
                { headers: { 'accept': 'application/json', 'authorization': await token } }
            );
            console.log(response.data.message);
            Alert.alert("Enhorabuena!", "Tu reserva se ha eliminado exitosamente");
            AsyncStorage.removeItem('notifications')
            setNotifications(notifications - 1)
            AsyncStorage.setItem('notifications', (notifications - 1).toString());
            setRefresh(!refresh)
            setShowAnimation(false)
            await getEventsList()
        } catch (e) {
            console.log(e.response.data.message)
            alert("Error al cancelar la reserva");
            setShowAnimation(false)
        }
    }

    useEffect(() => {
        getEventsList()
        console.log("RESERVAS CARGADAS: ", reservas)
    }, [refresh])

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getEventsList()
        wait(2000).then(() => setRefreshing(false));
    }, []);

    const RenderItem = ({ item }) => {
        console.log("DATOS INDIVIDUALES")
        console.log(item)
        let fecha = item.evento.evento.substring(0, 10)
        let hora = item.evento.evento.substring(11, 19)
        console.log("FECHA:" + fecha)
        console.log("HORA:" + hora)
        return (
            <View style={{ alignItems: "center" }}>
                <View style={{ backgroundColor: "rgba(255, 228, 181,0.8)", width: 380, height: 220, marginBottom: 10, borderRadius: 5, alignItems: "center", padding: 10, margin: 5, flexDirection: 'row' }}>
                    <View style={{ flex: 4, height: "100%", }}>
                        <Image source={{ uri: item.evento.imagen }} style={{ width: "100%", height: "100%", borderRadius: 10, }} />
                    </View>
                    <View style={{ flex: 6, height: "100%", padding: 5 }}>
                        <View style={{ flex: 5, height: "100%", padding: 5 }}>
                            <Text style={styles.title}>{item.evento.titulo}</Text>
                            <Text style={styles.subtitle}>{item.evento.descripcion}</Text>
                        </View>
                        <View style={{ flex: 1, height: "100%", padding: 5, flexDirection: 'row' }}>
                            <Text style={styles.titles}>Fecha: <Text style={styles.subtitle}>{fecha}  </Text></Text>
                            <Text style={styles.titles}> Hora: <Text style={styles.subtitle}>{hora}</Text></Text>
                        </View>
                        <View style={{ flex: 1.5, height: "100%", justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => { deleteReserv(item.id) }} style={{ width: "80%", height: "80%", backgroundColor: colors.red, justifyContent: 'center', alignItems: 'center' }}>
                                <Icon name='trash' type='entypo' color={"white"} size={20} />
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>

            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar hidden={false} />
            <MainHeader screen={"Mis Reservas"} name={'ios-menu-outline'} onPress={() => navigation.openDrawer()} />
            <LoaderAnimation visible={showAnimation} />
            <ScrollView
                nestedScrollEnabled={true}
                horizontal={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                {
                    (reservas.length > 0)
                    ? (<FlatList
                        keyExtractor={(item, index) => index.toString()}
                        data={reservas}
                        showsVerticalScrollIndicator={false}
                        renderItem={RenderItem}
                    />
                    )
                    : (<Text style={styles.subtitle}>{info}</Text>)
                }

            </ScrollView>
        </SafeAreaView>
    )
}

export default MiReserves

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    title: {
        fontSize: 12,
        textAlign: 'justify',
        fontFamily: 'Poppins_800ExtraBold'
    },
    titles: {
        fontSize: 11,
        textAlign: 'justify',
        fontFamily: 'Poppins_600SemiBold'
    },
    subtitle: {
        fontSize: 11,
        textAlign: 'justify',
        fontFamily: 'Poppins_400Regular'
    },
});
