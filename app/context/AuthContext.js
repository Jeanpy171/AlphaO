import React, {createContext, useState, useReducer, useEffect} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from "@react-navigation/native";
import { types } from './types';
import { authReducer } from "./AuthReducer";
import { urlApiAlphaO } from "../const/CONST";


export const AuthContext = createContext();


export const AuthProvider = ({children}) => {
    const [userInfo, setUserInfo] = useState({});
    const [avatar, setAvatar] = useState({url: 'http://cdn.onlinewebfonts.com/svg/img_568656.png'});
    const [isLoading, setIsLoading] = useState(false);
    const [isLogged, setIsLogged] = useState(null);
    const [token, setToken] = useState(null);
    const [notifications, setNotifications] = useState(0);

    const initialization = () => 
    {
        const user = JSON.stringify(AsyncStorage.getItem('user'))
        return {
            logged: !!user,
            user: user,
        }
    }
   

    const [authState, dispatch] = useReducer(authReducer,{}, initialization)


    const getEventsList = async (token) => {
        try {
            console.log("Recopilando mis eventos")
            const response = await axios.get(
                `${urlApiAlphaO}/api/alpha/reservas/misreservs`,
                { headers: { 'accept': 'application/json', 'authorization': await token } }
            );
            console.log("EVENTOS QUE TIENE EL USUARIO - - - - - - - - -",response.data);
            if (response.data.hasOwnProperty('data')) {
                console.log("NOTIFICACIONES RESCATADAS - - - - - - - - -",response.data.data.reservas.length);
                console.log("GUARDO NOTIFICACIONES: ",(response.data.data.reservas.length).toString())
                AsyncStorage.setItem('notifications', (response.data.data.reservas.length).toString());
                setNotifications(response.data.data.reservas.length)
            } else {
                setNotifications(0)
                let zero = 0;
                AsyncStorage.setItem('notifications', zero.toString());
                console.log(reservas.length)
            }
        } catch (e) {
            console.log(e)
        }
    }

    const login = async (user, token) => 
    {
        const action = { type: types.login, payload: user }
        AsyncStorage.setItem('user', JSON.stringify(user));
        AsyncStorage.setItem('token', token);
        profileInformation(token)
        getEventsList(token)
        dispatch(action);
        setIsLogged(true)
    }


    const isLoggedIn = async() => {
        console.log("CARGANDO LOS DATOS DE INCIO",)
        try{
            //setLogged(true)
            setIsLoading(true)
            let userInfo = await AsyncStorage.getItem('user_profile')
            let avatarData = await AsyncStorage.getItem('avatar')
            let notify = await AsyncStorage.getItem('notifications')
            console.log("ESTO LLEGA DE NOTIFICACIONES: ",notify )
            setNotifications(parseInt(notify))
            userInfo = JSON.parse(userInfo)
            if( userInfo ){
                setTimeout(() => setIsLogged(false)
                ,2300)
                setUserInfo(userInfo)
                setAvatar({...avatar,...{url:avatarData.substring(1,avatarData.length-1)}})
                console.log("DATO CONSEGUIDO DE ASYNC ---------------")
                console.log("\nDATOS DE USUARIO:\n")
                console.log(userInfo)
                console.log("\nDATOS DE AVATAR:\n")
                console.log(avatarData)
            }else{
                setTimeout(() => setIsLogged(false),2300)
                
            }
          
        
        }catch(e){
            console.log(`IS LOGGED ERROR ${e}`)
            setTimeout(() => setIsLogged(false),2300)
        }
    }

    useEffect(()=> {
        //fetchUser()
        isLoggedIn()
    },[])

    const profileInformation = async (token) => {
        try {
            const response = await axios.get(
                `${urlApiAlphaO}/api/alpha/profile`,
                { headers: { 'accept': 'application/json', 'authorization': await token } }
            );
            console.log("-----------------------------ENTRADA AL PERFIL ----------------\n")
            setUserInfo(response.data.data.user)
            setAvatar({...avatar,url:response.data.data.avatar})
            AsyncStorage.setItem('user_profile', JSON.stringify(response.data.data.user));
            AsyncStorage.setItem('avatar',JSON.stringify(response.data.data.avatar));
            console.log("AVATAR: ",avatar)
            console.log("DATOS DE USUARIO: ",userInfo)
            console.log("\nESTA LOGGEADO?-------------------------",isLogged)
        } catch (error) {
            console.log(error);
        }
    };

    const logout = () => 
    {
        setIsLogged(false)
        AsyncStorage.removeItem('user_profile');
        AsyncStorage.removeItem('user');
        AsyncStorage.removeItem('token');
        AsyncStorage.removeItem('avatar');
        AsyncStorage.removeItem('notifications')
        //AsyncStorage.removeItem('isNotFirstTime');
        setToken(null)
        const action = { type: types.logout }
        dispatch(action)
    }

    return(
    <AuthContext.Provider value={{
        ...authState,
        isLogged,
        login: login,
        logout: logout,
        profileInformation,
        userInfo,
        avatar,
        token,
        setNotifications,
        notifications
    }}>{children}</AuthContext.Provider>
    )
}