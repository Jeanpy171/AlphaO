import { createStackNavigator } from '@react-navigation/stack'
import React, { useContext } from 'react'
import Genders from '../screens/Genders';
import IraScreen from '../screens/IraScreen';
import DepresionScreen from '../screens/DepresionScreen';
import MiedoScreen from '../screens/MiedoScreen';
import AnsiedadScreen from '../screens/AnsiedadScreen';
import SoledadScreen from '../screens/SoledadScreen';


const Stack = createStackNavigator();

export const GenderStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="GenderScreen" component={Genders} />
      <Stack.Screen name="IRA" component={IraScreen} />
      <Stack.Screen name="SOLEDAD" component={SoledadScreen} />
      <Stack.Screen name="ANSIEDAD" component={AnsiedadScreen} />
      <Stack.Screen name="MIEDO" component={MiedoScreen} />
      <Stack.Screen name="DEPRESION" component={DepresionScreen} />
    </Stack.Navigator>
  );
}

export default GenderStack