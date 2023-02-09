import { Alert, FlatList, RefreshControl, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View,} from 'react-native'
import React, { useCallback, useContext, useState } from 'react'
import MainHeader from '../components/MainHeader';
import { Image } from 'react-native';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Icon } from '@rneui/base';
import Lottie from 'lottie-react-native';
import { colors, sizes } from '../const/CONST';
import LoaderAnimation from '../components/LoaderAnimation';
import { AuthContext } from '../context/AuthContext';

const Events = ({navigation}) => {
  const [refreshing, setRefreshing] = useState(false);
  const token = AsyncStorage.getItem('token');
  const [eventos,setEventos] = useState([]);
  const [refresh,setRefresh] = useState(false);
  const [showAnimation,setShowAnimation] = useState(false);
  const { notifications, setNotifications } = useContext(AuthContext)
  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  const getEventsList = async () => {
    setShowAnimation(true)
    try {
        console.log("Recopilando eventos")
        const response = await axios.get(
            'https://alphaofinal.herokuapp.com/api/alpha/reservas/reservalist',
            { headers: { 'accept': 'application/json', 'authorization': await token } }
        );
        console.log(response.data.data.eventos);
        setEventos(response.data.data.eventos)
        setShowAnimation(false)
    } catch (e) {
        console.log(e)
        setShowAnimation(false)
        alert("Error al cargar eventos");
        }
    }

    const getReserve = async(item) => {
        console.log(await token)
        setShowAnimation(true)
        try {
            console.log("Reservando cupo")
            console.log(`https://alphaofinal.herokuapp.com/api/alpha/reservas/reserva-create/${item}`)
            const response = await axios.post(
                `https://alphaofinal.herokuapp.com/api/alpha/reservas/reserva-create/${item}`,
                { },
                { headers: { 'accept': 'application/json' , 'authorization': await token } }
            );
            console.log(response.data);
            Alert.alert("Tu reserva ha sido generada exitosamente",response.data.message);
            AsyncStorage.removeItem('notifications')
            setNotifications(notifications + 1)
            AsyncStorage.setItem('notifications', (notifications + 1).toString());
            setRefresh(!refresh)
            setShowAnimation(false)
        } catch (e) {
            console.log(e.response)
            setShowAnimation(false)
            Alert.alert("SE ha producido un error",e.response.data.message);
            }
    }

    useEffect(() => {
        getEventsList()
        //getPublishList()
        console.log("EVENTOS CARGADAS: ",eventos)
        //console.log("PUBLICIDADES CARGADAS: ",publicidades)
    },[refresh])

  const RenderItemEvents = ({ item }) => {
    let fecha = item.evento.substring(0,10)
    let hora = item.evento.substring(11,19)
    console.log("FECHA:"+fecha)
    console.log("HORA:"+hora)
    return(
    <ScrollView horizontal={false} nestedScrollEnabled={true}>
        <View style={{alignItems:"center", justifyContent:"center",top:"2%",height:'100%'}}>
            <View style={{flex:10,height:450, padding:10,backgroundColor:"rgba(255, 228, 181,0.8)",width:"98%",marginBottom:10, borderRadius:5,marginBottom:15,}}>
                    <View style={{flex:1.2,height:"100%",alignItems:"center"}}>
                        <Text style={styles.title}>{item.titulo}</Text>
                        <Text style={styles.subtitle}>{item.descripcion}</Text>
                    </View>
                    <View style={{flexDirection:'row',flex:0.6, paddingHorizontal:5}}>
                        <View style={{flex:1,height:"100%",}}>
                            <View style={{flexDirection:'row'}}>
                                <Text style={styles.titles}>Fecha: <Text style={styles.subtitle}>{fecha}  </Text></Text>
                                <Text style={styles.titles}>Hora: <Text style={styles.subtitle}>{hora}</Text></Text>
                            </View>
                            <Text style={styles.titles}>Cupos: <Text style={styles.subtitle}>{item.cupos}</Text></Text>
                        </View>
                        <View style={{flex:0.5,height:"80%",justifyContent:'center',alignItems:'center'}}>
                            <TouchableOpacity onPress={async()=>{await getReserve(item.id)}} style={{width:"80%", height:"80%",backgroundColor:colors.orange,justifyContent:'center',alignItems:'center'}}>
                                <Icon name='ticket-alt' type='fontisto' color={"white"} size={20}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{flex:3}}>
                        <Image source={{uri:item.imagen}}style={{width:"100%",height:"100%",borderRadius:10,resizeMode:"stretch"}}/>
                    </View>

                    </View>
                    
            </View>
    </ScrollView>
  )}

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    //setRefresh(!refresh)
    getEventsList()
    //setShowAnimation(true)
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const GetEvents = () => {
    return(
        <View style={{justifyContent:"center",alignItems:'center',width:'100%',height:'100%'}}>
            <FlatList
                //style={{bottom:"4%"}}
                keyExtractor={(item, index) => index.toString()}
                horizontal={false}
                data={eventos}
                renderItem={RenderItemEvents}
            />
        </View>
    )
}
  return (
    <SafeAreaView style={styles.container}>
        <StatusBar hidden={false} />
        <LoaderAnimation visible={showAnimation}/>
        <MainHeader screen={"Eventos presenciales"} name={'ios-menu-outline'} onPress={() => navigation.openDrawer()}/>
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
            <GetEvents/>
                
        </ScrollView>
    </SafeAreaView>
    
  )
}

export default Events

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    containerScroll: {
        //flex: 1,
        //backgroundColor: '#fff',
        //alignItems: 'center',
        //justifyContent: 'center',
      },
      title:{
        //marginVertical:15,
        fontSize:15,
        //color:"#33576f",
        textAlign:'justify',
        //fontWeight:'bold',
        fontFamily: 'Poppins_800ExtraBold'
    },
    titles:{
        //marginVertical:20,
        fontSize:12,
        //color:"#33576f",
        textAlign:'justify',
        //fontWeight:'bold',
        fontFamily: 'Poppins_600SemiBold'
    },
    subtitle:{
        fontSize:12,
        //marginBottom: 10,
        //color:"#33576f",
        //marginVertical:10,
        textAlign:'justify',
        fontFamily: 'Poppins_400Regular'
    },
  });
  