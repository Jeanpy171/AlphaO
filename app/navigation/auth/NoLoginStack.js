import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AccountCreated from '../../screens/AccountCreated';
import CommentsList from '../../screens/CommentsList';
import Login from '../../screens/Login';
import Register_part2 from '../../screens/Register_part2';
import Register from '../../screens/Register';
import RecoverPassword from '../../screens/RecoverPassword';
import Onboarding from '../../components/Onboarding';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EmotionsNoLogin from '../../screens/EmotionsNoLogin';

const Stack=createStackNavigator();


export const NoLoginStack = () => {
        useEffect(() => {
            console.log("VARIABLE DE VERIFICACION: ",isNotFirstTime)
        },[isNotFirstTime])
    
        const [isNotFirstTime,setIsNotFirstTime] = useState("null");
        const recoverValue = async() => {
            let isFirstTime = await AsyncStorage.getItem('isNotFirstTime')
            setIsNotFirstTime(isFirstTime)
            return;
        }
        recoverValue()
        console.log("ESTADO DE ONBOARDING: ",isNotFirstTime)
        if(isNotFirstTime == "null"){
            return;
        }
        return (
            <Stack.Navigator
            initialRouteName={
                (isNotFirstTime) ? "login" : "onboarding"
            }
                screenOptions={{
                    headerShown: false
                }}
            >
             <Stack.Screen
                    name="onboarding"
                    component={Onboarding}
                />
                <Stack.Screen
                    name="recoverPassword"
                    component={RecoverPassword}
                />
                <Stack.Screen
                    name="register"
                    component={Register}
                />
                <Stack.Screen
                    name="register_part2"
                    component={Register_part2}
                />
                <Stack.Screen
                    name="login"
                    component={Login}
                />
                <Stack.Screen
                    name="account-created"
                    component={AccountCreated}
                />
                <Stack.Screen
                    name="comments-list"
                    component={CommentsList}
                />
                <Stack.Screen
                    name="emotions-screen"
                    component={EmotionsNoLogin}
                />

        </Stack.Navigator>

      )
}

export default NoLoginStack

const styles = StyleSheet.create({})