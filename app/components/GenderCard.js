import { StyleSheet, Text, View,Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FlatList } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { Image } from 'react-native'
import {colors,shadow, sizes, spacing} from '../const/CONST'
import { genders } from './data/data'
import {Poppins_400Regular,Poppins_700Bold,Poppins_800ExtraBold,Poppins_600SemiBold,Poppins_500Medium} from '@expo-google-fonts/poppins';
import { useFonts } from '@expo-google-fonts/dev';
import { Button, Icon } from '@rneui/base'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

const CARD_WIDTH = sizes.width - 20;
const CARD_HEIGHT = 300;
const CARD_WIDTH_SPACING = CARD_WIDTH + spacing.l;


const GenderCard = () => {
  const token = AsyncStorage.getItem('token');
  const [estres,setEstres] = useState([]);
    const navigation = useNavigation();
    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_500Medium,
        Poppins_600SemiBold,
        Poppins_700Bold,
        Poppins_800ExtraBold
      });

      
const getMusicList = async () => {
  try {
      console.log("Recopilando canciones")
      const response = await axios.get(
          'https://alphaofinal.herokuapp.com/api/alpha/musicOne/lista',
          { headers: { 'accept': 'application/json', 'authorization': await token } }
      );
      //console.log(response.data.data.music_ones);
      setEstres(response.data.data.music_ones)
  } catch (e) {
    console.log(e)
    alert("Error al cargar las canciones");
  }
}

useEffect(() => {
  getMusicList()
  //console.log("CANCIONES CARGADAS: ",estres)
},[])


if (!fontsLoaded) {
     return null;
} else {
  return (
    <FlatList
        data={genders}
        //horizontal
        snapToInterval={CARD_WIDTH_SPACING}
        decelerationRate="fast"
        showsVerticalScrollIndicator={false}
        keyExtractor={i => i.id}
        renderItem={({item, index}) => {
            return(
                <View style={styles.container}>
                    <View style={[styles.card,shadow.dark]}>
                        <View style={styles.imageBox}>
                            <Image source={{uri:item.image}} style={styles.image}/>
                        </View>
                        <View style={styles.titleBox}>
                            <Text style={styles.title}>{item.title}</Text>
                            <Text style={styles.resume}>{item.resume}</Text>
                            <TouchableOpacity
                            style={{flexDirection:'row',alignItems:'center',backgroundColor:colors.orange,width:"55%",height:"25%",borderRadius:20,paddingHorizontal:10}}
                                onPress={()=>{navigation.navigate(item.title, {gender:item})}}
                            >
                                <View style={{borderRadius:15,backgroundColor:colors.white,width:"15%",height:"80%",alignItems:'center',justifyContent:'center'}}>
                                    <Icon name={'play'} type='ionicon' size={15} color="black" />
                                </View>
                                <Text style={styles.textButton}>Saber más</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )
        }}
        
    />
  )
}
}


export default GenderCard

const styles = StyleSheet.create({
    container:{
    justifyContent:'center',
    alignItems:'center',
    //backgroundColor:'blue'
    },
    card: {
      width: CARD_WIDTH,
      marginHorizontal:10,
      height: CARD_HEIGHT + 20,
      borderRadius: sizes.radius,
      marginVertical: 10,
      //borderWidth:2,
      //backgroundColor: 'red',
      justifyContent:'center',
      alignItems:'center',
      shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 10,
        
    },
    imageBox: {
      width: CARD_WIDTH,
      height: CARD_HEIGHT ,
      borderRadius: sizes.radius,
      overflow: 'hidden',
    },
    image: {
      width: CARD_WIDTH,
      height: CARD_HEIGHT - 100,
      resizeMode: 'cover',
    },
    titleBox: {
      position: 'absolute',
      backgroundColor:'white',
      top: CARD_HEIGHT - 120,
      width:CARD_WIDTH,
      height:140,
      padding:10,
      borderBottomStartRadius:sizes.radius,
      borderBottomEndRadius:sizes.radius,
      
      //left: 16,
    },
    title: {
      fontSize: 20,
      //fontWeight: 'bold',
      color: colors.primary,
      fontFamily:'Poppins_600SemiBold',
    },
    resume: {
      fontSize: 12,
      color: colors.primary,
      marginBottom:5,
      fontFamily:'Poppins_500Medium',
    },
    textButton:{
      fontSize: 18,
      //backgroundColor:'black',
      //fontWeight: 'bold',
      paddingLeft:10,
      //bottom:5,
      color: colors.primary,
      fontFamily:'Poppins_600SemiBold',
    }
  });