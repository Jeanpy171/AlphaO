import 'react-native-gesture-handler';
import { createDrawerNavigator, DrawerContent, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    Alert,
    ScrollView,
    TouchableOpacity,
  } from "react-native";
import { Icon } from "@rneui/base";
import DrawerOptions from '../components/DrawerOptions';
import ProfileStack from './ProfileStack';
import HomeStack from './HomeStack';
import GenderStack from './GenderStack';
import MiReserves from '../screens/MiReserves';
import Events from '../screens/Events';
import News from '../screens/News';
import ReserveStack from './ReservStack';


const Drawer = createDrawerNavigator();

export const CitizenDrawer = () => {
  return (
    <Drawer.Navigator
        drawerContent={props => <DrawerOptions {...props} />} 
        useLegacyImplementation={true}
        screenOptions={{

            headerShown:false,
            drawerInactiveTintColor:'#333',
            drawerLabelStyle: {
                marginLeft: -25,
                fontSize: 15,
            }
        }}
    >
        <Drawer.Screen 
          name='homeScreen'
          component={HomeStack}
          options={{ 
            title: "Página principal",
            drawerIcon: ({color})=> (
                <Icon
                    name='home'
                    type='ionicon'
                    size={22}
                    color={color}
                    />
            )
            }} />
            <Drawer.Screen 
          name='eventsScreen'
          component={Events}
          options={{ 
            title: "Eventos presenciales",
            drawerIcon: ({color})=> (
                <Icon
                  name='ticket-alt' 
                  type='fontisto' 
                  color={color} 
                  size={20}
                    />
            )
            }} />
            <Drawer.Screen 
          name='newsScreen'
          component={News}
          options={{ 
            title: "Novedades",
            drawerIcon: ({color})=> (
                <Icon
                  name='newspaper-o' 
                  type='font-awesome' 
                  color={color} 
                  size={20}
                    />
            )
            }} />
            <Drawer.Screen 
          name='MyReserves'
          component={ReserveStack}
          options={{ 
            title: "Mis reservas",
            drawerIcon: ({color})=> (
                <Icon
                    name='inbox'
                    type='font-awesome-5'
                    size={22}
                    color={color}
                    />
            )
            }} />
        <Drawer.Screen 
          name='GenerScreen'
          component={GenderStack}
          options={{ 
            title: "Emociones",
            drawerIcon: ({color})=> (
                <Icon
                    name='musical-notes-sharp'
                    type='ionicon'
                    size={22}
                    color={color}
                    />
            )
            }} />
        <Drawer.Screen 
          name='profileScreen'
          component={ProfileStack}
          options={{ 
            title: "Ajustes",
            drawerIcon: ({color})=> (
                <Icon
                    name='md-settings-sharp'
                    type='ionicon'
                    size={22}
                    color={color}
                    />
            )
            }} />
            {/*<Drawer.Screen 
          name='trackScreen'
          component={PlayListScreen}
          options={{ 
            title: "Ajustes",
            drawerIcon: ({color})=> (
                <Icon
                    name='md-settings-sharp'
                    type='ionicon'
                    size={22}
                    color={color}
                    />
            )
            }} />*/}
    </Drawer.Navigator>
  );
}

export default CitizenDrawer;