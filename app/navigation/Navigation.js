import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'
import LoginStack from './auth/LoginStack'
import NoLoginStack from './auth/NoLoginStack'
import Splash from '../screens/Splash'


export const Navigation = () => {
    const { isLogged } = useContext(AuthContext)
    useEffect(() => {
        console.log("ESTADO :", isLogged)
    }, [isLogged])
    return (

        <>
            {
                isLogged == null ? <Splash /> : isLogged == false ? <NoLoginStack /> : <LoginStack />
            }
        </>





    )
}

export default Navigation

const styles = StyleSheet.create({})