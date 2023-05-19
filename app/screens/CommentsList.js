import { StyleSheet, Text, View, Image,ScrollView, ImageBackground,Dimensions ,SafeAreaView, Keyboard, Alert, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import axios from 'axios';
import {Poppins_400Regular,Poppins_400Regular_Italic,Poppins_500Medium} from '@expo-google-fonts/poppins';
import { useFonts } from '@expo-google-fonts/dev';
import { useEffect } from 'react';
import { FlatList } from 'react-native';
import { sizes, urlApiAlphaO } from '../const/CONST';
import LoaderAnimation from '../components/LoaderAnimation';
import { StatusBar } from 'react-native';

export const CommentsList = ({navigation}) => {
  const [userRating,setUserRating] = useState([1,2,3,4,5])
  const [defaultRating,setDefaultRating] = useState(5)
  const [showAnimation,setShowAnimation] = useState()
  const [commentList,setCommentList] = useState([])
  const [info,setInfo] = useState("Todavia no se han registrado opiniones, se el primero en valorar nuestra app!")


  useEffect(() => {
    getComments()
    console.log("COMENTARIOS RECUPERADOS ---- ",commentList)
  },[])


  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium
  });


  const getComments = async () => {
    setShowAnimation(true)
    try {
        console.log("Realizando peticion")
        const response = await axios.get(
          `${urlApiAlphaO}/api/alpha/commentpublic`,
        )
        console.log(response.data.data.comments);
        (response.data.data.comments)
        ? setCommentList(response.data.data.comments)
        : setInfo(info)
        setShowAnimation(false)
    } catch (e) {
      console.log(e)
      setShowAnimation(false)
      alert("Error al cargar comentarios");
    }
}

const HEART_CORNER = require('../../assets/heart_corner.png')
const HEART_FILLED = require('../../assets/heart_filled.png')

const CustomRating = ({defaultRating}) => {
  return(
    <View style={styles.customRatingBarStyle}>
      {
        userRating.map((item,key) => {
          return(
            <View
              key={item}
            >
              <Image
                style={styles.heartImage}
                source={
                  item <= defaultRating
                  ? HEART_FILLED
                  : HEART_CORNER
                }
              />
            </View>
          )
        })
      }
    </View>
    
  )
}

  const RenderItem = ({ item }) => {
    setDefaultRating(item.calificacion)
    console.log("DATOS DE LOS COMENTARIOS")
    console.log(item)
    return(
      <View>
        <View style={{backgroundColor:"rgba(255, 228, 181,0.8)",marginBottom:10, flexDirection:"row",padding:10, borderRadius:10,}}>
            <View>
                <Image 
                    source={{uri:"https://static.vecteezy.com/system/resources/previews/002/275/847/original/male-avatar-profile-icon-of-smiling-caucasian-man-vector.jpg"}}
                    style={{width:100,height:100,borderRadius:10}}
                    />
            </View>
            <View style={{height:100, paddingHorizontal:10, width:sizes.width, flex:10}}>
                <View style={{flexDirection:'row',width:sizes.width - 150,justifyContent:'space-between'}}>
                  <Text style={styles.title}>{item.creadoby.username}</Text>
                  <CustomRating defaultRating={item.calificacion}/>
                </View>
                <Text style={styles.subtitleComments}>{item.comentario}</Text>
            </View>
        </View>
    </View>
    )
  
  }
    


  if (!fontsLoaded) {
    return null;
  } else {
  return (
    <KeyboardAvoidingView style={styles.mainContainer}>
      <StatusBar animated={true} backgroundColor="transparent" barStyle={'dark-content'}/>
      <LoaderAnimation visible={showAnimation}/>
      <ImageBackground 
        source={require("../../assets/garza-fondo.jpg")}
        imageStyle= {{opacity:0.2}}
        style={styles.background}
      >
      <View style={styles.contentContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.titles}>
              Opiniones recurrentes
          </Text>
          <Text style={styles.subtitle}>Esto es lo que los usuarios piensan de nuestra aplicación</Text>
            {
              (commentList)
              ? (<FlatList
                keyExtractor={(item, index) => index.toString()}
                data={commentList}
                renderItem={RenderItem}
                />)
              : (<Text style={styles.subtitle}>{info}</Text>)
              
            }
        </ScrollView>
        </View>
        </ImageBackground>
    </KeyboardAvoidingView>
        )
    }
}

export default CommentsList;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff',
      },
    contentContainer:{
      padding: 12,
    },
    background:{
      width: sizes.width,
      height: sizes.height
    },
    title:{
        flex:1,
        fontSize:15,
        textAlign:'justify',
        fontFamily: 'Poppins_800ExtraBold'
    },
    titles:{
        marginVertical:20,
        fontSize:26,
        textAlign:'justify',
        fontFamily: 'Poppins_500Medium'
    },
    subtitle:{
        fontSize:14,
        marginBottom: 10,
        fontFamily: 'Poppins_400Regular'
    },
    subtitleComments:{
      fontSize:13,
      fontFamily: 'Poppins_400Regular'
  },
    customRatingBarStyle:{
      justifyContent:'center',
      flexDirection:'row'
    }
    ,
    heartImage:{
      width:22,
      height:20,
      margin:1,
      resizeMode:'cover',
    }
})