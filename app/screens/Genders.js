import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Button } from '@rneui/base'
import MainHeader from '../components/MainHeader'
import Carousel from '../components/Carousel'
import { ScrollView } from 'react-native-gesture-handler'
import CardList from '../components/CardList'
import GenderCard from '../components/GenderCard'
import { StatusBar } from 'react-native'

export const Genders = ({navigation}) => {
 
  return (
    <View style={styles.container}>
      <StatusBar hidden={false} />
      <MainHeader screen={"Emociones"} name={'ios-menu-outline'} onPress={() => navigation.openDrawer()}/>
      <GenderCard/>
      <ScrollView>
        <View style={{height:100, backgroundColor:'rgb(0,0,0)'}}></View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  coverPhoto:{
    flex: 10,
    width:'100%',
    height:'100%',
    backgroundColor:'rgba(0,0,0,0.06',
    marginTop:0,
  },
  coverButton:{
    width:'90%',
    height:200,
    backgroundColor:'rgba(0,0,0,0.06',
    marginTop:20,
  }
})

export default Genders;