import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import NoLoginStack from './NoLoginStack'
import Splash from '../../screens/Splash'
import CitizenDrawer from '../CitizenDrawer'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'

const Stack=createStackNavigator();

export const LoginStack = () => {
    return (
        
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                    name="home"
                    component={CitizenDrawer}
                />
                
        </Stack.Navigator>

      )
}

export default LoginStack

const styles = StyleSheet.create({})