import { StyleSheet, Text, View,Dimensions, Image } from 'react-native'
import React,{useContext} from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Icon } from '@rneui/base';
import {Poppins_400Regular,Poppins_400Regular_Italic,Poppins_500Medium,Poppins_800ExtraBold,Poppins_600SemiBold} from '@expo-google-fonts/poppins';
import { useFonts } from '@expo-google-fonts/dev';
import { AuthContext } from '../../app/context/AuthContext';
import { ImageBackground } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { withBadge } from 'react-native-elements';
import { sizes } from '../const/CONST';





const MainHeader = ({screen,name,onPress}) => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation()
    const {notifications} = useContext(AuthContext)

    const BadgedIcon = withBadge(notifications)(Icon)


    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_500Medium,
        Poppins_800ExtraBold,
        Poppins_600SemiBold
      });
     
  
    if (!fontsLoaded) {
      return null;
    } else {
  return (
    <View style={[styles.container,{marginTop:insets.top}]}>
      <View style={{backgroundColor:'rgba(0, 0, 0,0.07)', width:30, height:30, alignItems:'center', justifyContent:'center', borderRadius:5}}>
        <TouchableOpacity
            onPress={onPress}
            //style={{backgroundColor:'red'}}
        >
            <Icon name={name} type='ionicon' size={25} color="black" />
        </TouchableOpacity>
        </View>
      <Text style={styles.title}>{screen}</Text>
      <View style={styles.notify}>
        <BadgedIcon type="entypo" name="inbox" />
      </View>
     
    </View>
  )
    }
}

export default MainHeader

const styles = StyleSheet.create({
    container: {
      flexDirection:'row',
      backgroundColor: '#00000000',
      alignItems: 'center',
      justifyContent:'space-between',
      zIndex:2,
      width: sizes.width,
      //height:35,
      paddingHorizontal:10,
    },
    title:{
        fontSize:22,
        fontFamily:'Poppins_600SemiBold',
        //backgroundColor:'red',
        
    },
    notify:{
        right:'30%'
    }
  });
  