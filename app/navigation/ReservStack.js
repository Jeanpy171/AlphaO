import { createStackNavigator } from '@react-navigation/stack'
import React, { useContext } from 'react'
import MiReserves from '../screens/MiReserves';


const Stack = createStackNavigator();

export const ReserveStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
    }}
    >
        <Stack.Screen name="ReservScreen" component={MiReserves} />
    </Stack.Navigator>
  );
}

export default ReserveStack