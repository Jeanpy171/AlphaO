import 'react-native-gesture-handler';
import { createDrawerNavigator, DrawerContent, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    Alert,
    ScrollView,
    TouchableOpacity,
    ImageBackground,
  } from "react-native";
  import { Input, Icon, Button } from "@rneui/base";
  import { StatusBar } from 'expo-status-bar';
  import React, { useContext, useEffect, useState } from 'react'
  import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../app/context/AuthContext';
import Loader from './Loader';
import axios from 'axios';
import { FAB, Divider } from "@rneui/themed";
import {Poppins_400Regular,Poppins_400Regular_Italic,Poppins_500Medium,Poppins_800ExtraBold,Poppins_600SemiBold,Poppins_700Bold} from '@expo-google-fonts/poppins';
import { useFonts } from '@expo-google-fonts/dev';

export const DrawerOptions = (props) => {
    const {user, logged, logout, isLogged, userInfo,avatar} = useContext(AuthContext)
    const token = AsyncStorage.getItem('token');
    const [data, setData] = useState({})
    const [userData, setUserData] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const navigation = useNavigation();

    useEffect(() => {
      console.log("AVATAR DATA: ",avatar)
    },[avatar])
    const onLogout = async () => {
      setIsLoading(true)
        try {
            await axios.post(
                //'http://10.0.2.2:8000/api/v1/logout',
                //'http://10.0.2.2:8000/api/alpha/logout',
                'https://alphaofinal.herokuapp.com/api/alpha/logout',
                {}, { headers: { 'accept': 'application/json', 'authorization': await token } }
            );
            logout();
            setIsLoading(false)
            navigation.navigate('login')
            console.log("DESLOGUEADO")
            console.log(isLogged)
        } catch (error) {
            console.log(error);
        }
    };
    


    let [fontsLoaded] = useFonts({
      Poppins_400Regular,
      Poppins_500Medium,
      Poppins_800ExtraBold,
      Poppins_700Bold,
      Poppins_600SemiBold
    });
   

  if (!fontsLoaded) {
    return null;
  } else {
    return (
        <View style={styles.container}>
          <Loader visible={isLoading} text="Cerrando sesion" />
        <DrawerContentScrollView {...props} 
            //contentContainerStyle={styles.background}
        >
            <ImageBackground 
                source={{uri: avatar.url}} 
                imageStyle= {{opacity:0.5}}
                style={{padding: 10, height:160,bottom:4}}
            >
                <TouchableOpacity
                    onPress={()=>{
                        console.log('ACTUALIZAR PERFIL')
                        navigation.navigate('profileScreen')
                    }}
                >
                <Image
                    //source={require(avatar.url)} 
                    style={styles.avatar}
                    source={{uri:avatar.url}} 
                />
                </TouchableOpacity>
                <Text style={styles.userInformation}>{userInfo ? userInfo.username: ''}</Text>
                <Text style={styles.userEmail}>{userInfo ? userInfo.email: ''}</Text>
            </ImageBackground>
            <View style={styles.subContainer}>
                <DrawerItemList {...props}/>
            </View>
        </DrawerContentScrollView>
        <View style={styles.otherOptions}>
            <TouchableOpacity 
                style={{paddingVertical: 15}}
                onPress={onLogout}
            >
            <View style={styles.button}>
                <Icon
                    name='log-out'
                    type='ionicon'
                    size={22}
                />
                <Text style={styles.text}>Cerrar sesion</Text>
            </View>
            </TouchableOpacity>
        </View>
        </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor:'blue',
        justifyContent:'center',
        zIndex:1,
        //alignItems:'center'
      },
      subContainer:{
        flex: 1,
        paddingVertical:10,
        //padding:10,
      },
      background:{
        backgroundColor:'#33576f',
      },
      avatar: {
        height: 80,
        width:80,
        borderRadius: 40,
        marginTop: 10,
        marginBottom:5,
      },
      otherOptions: {
        paddingHorizontal: 20,
        borderTopWidth: 1,
        borderTopColor:'#ccc',
        //backgroundColor:'red',
        height: 60,
        //alignItems:'center',
        justifyContent:'center'
      },
      button:{
        flexDirection:'row',
        alignItems:'center',
      },
      text:{
        fontSize:15,
        marginLeft:5,
      },
      userInformation:{
        fontSize:15,
        marginLeft:5,
        //fontWeight:'bold',
        fontFamily: 'Poppins_700Bold'
      },
      userEmail:{
        fontSize:13,
        marginLeft:5,
        fontFamily: 'Poppins_500Medium'
        //fontWeight:'bold'
      },
})


export default DrawerOptions;