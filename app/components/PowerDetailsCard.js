import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {Poppins_400Regular,Poppins_400Regular_Italic,Poppins_500Medium,Poppins_800ExtraBold,Poppins_600SemiBold} from '@expo-google-fonts/poppins';
import { useFonts } from '@expo-google-fonts/dev';
import { colors, sizes, spacing } from '../const/CONST'
import * as Animatable from 'react-native-animatable'
import BottomSheet from '@gorhom/bottom-sheet';
import { useMemo } from 'react';

const PowerDetailsCard = ({power}) => {
    const snapPoints = useMemo( () => ['30%','80%'],[])
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
    <BottomSheet snapPoints={snapPoints}>
        <Animatable.View style={styles.header} animation='fadeInUp' delay={300} duration={400} easing='ease-in-out'>
            <Text style={styles.title}>{power.title}</Text>
            <Text style={styles.body}>{power.body}</Text>
        </Animatable.View>
    </BottomSheet>
  )
  //return (
  //  <View style={styles.card}>
  //    <Animatable.View style={styles.header} animation='fadeInUp' delay={300} duration={400} easing='ease-in-out'>
  //      <Text style={styles.title}>{power.title}</Text>
  //      <Text style={styles.body}>{power.body}</Text>
  //    </Animatable.View>
  //  </View>
  //)
}
}

export default PowerDetailsCard

const styles = StyleSheet.create({
    card:{
        position:'absolute',
        bottom:0,
        left:0,
        right:0,
        height:'30%',
    },
    header:{
        paddingVertical:spacing.l,
        paddingHorizontal:spacing.l,
    },
    title:{
        fontSize: sizes.title,
        color:colors.primary,
        fontFamily:'Poppins_600SemiBold',
    },
    body:{
        fontSize: sizes.body,
        color:colors.primary,
        fontFamily:'Poppins_400Regular',
        textAlign:'justify'
    }
})