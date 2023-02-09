import { createStackNavigator } from '@react-navigation/stack'
import React, { useContext } from 'react'
import Home from '../screens/Home';
import PowersDetails from '../screens/PowersDetails';
import Comments from '../screens/Comments';


const Stack = createStackNavigator();

export const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
    }}
    >
        <Stack.Screen name="HomeScreen" component={Home} />
        <Stack.Screen name="PowerDetailsScreen" component={PowersDetails} />
        <Stack.Screen name="comments" component={Comments} />
    </Stack.Navigator>
  );
}

export default HomeStack