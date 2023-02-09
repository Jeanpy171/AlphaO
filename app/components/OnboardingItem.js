import { StyleSheet, Text, View, useWindowDimensions, Image } from 'react-native'
import React from 'react'
import {Poppins_400Regular,Poppins_400Regular_Italic,Poppins_500Medium} from '@expo-google-fonts/poppins';
import { useFonts } from '@expo-google-fonts/dev';
import { colors } from '../const/CONST';

const OnboardingItem = ({item}) => {
  const {width} = useWindowDimensions()
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium
  });

  if (!fontsLoaded) {
    return null;
  } else {
  return (
    <View style={[styles.container,{width}]}>
      <Image source={item.image} style={[styles.image, {width, resizeMode:'contain'}]}/>
      <View style={{flex:0.3, paddingHorizontal:10}}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    
    </View>
  )
}
}

export default OnboardingItem

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
      image:{
        flex:0.7,
        justifyContent:'center'
      },
      title:{
        //fontWeight:'800',
        fontSize: 28,
        marginBottom:10,
        color:colors.blue,
        fontFamily: 'Poppins_500Medium',
        textAlign:'center'
      },
      description:{
        fontWeight:'300',
        color:'#62656b',
        textAlign:'justify',
        fontFamily: 'Poppins_400Regular',
        paddingHorizontal: 30
      }
})