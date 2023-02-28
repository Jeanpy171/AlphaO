import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Rating, AirbnbRating } from 'react-native-ratings';
import { TextInput } from 'react-native-paper';
import Button from '../components/Button';
import { Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../components/Loader';
import { urlApiAlphaO } from '../const/CONST';
import { StatusBar } from 'react-native';


const WATER_IMAGE = "https://www.pngplay.com/wp-content/uploads/6/5-Star-Rating-Vector-Transparent-PNG.png"
const Comments = ({navigation}) => {
    const [comment,setComment] = useState("")
    const [rating,setRating] = useState(0)
    const [isLoading, SetIsLoading] = useState(false)
    const token = AsyncStorage.getItem('token');
    const ratingCompleted = (rate) => {
        setRating(rate)
    }

    const storeComments = async(comentario, calificacion) =>{
        SetIsLoading(true)
        console.log(await token)
        try {
            console.log("Registrando comentario . . . ")
            const response = await axios.post(
                `${urlApiAlphaO}/api/alpha/comments/comment-create`,
                { comentario, calificacion },
                { headers: { 'accept': 'application/json','authorization': await token } }
            )
            console.log(response.data)
            console.log("COMENTARIO ALMACENADO");
            SetIsLoading(false)
            Alert.alert("Valoración registradacon exito","Tu comentario ha sido enviado a nuestro equipo de desarrollo")
            navigation.goBack()
        } catch (e) {
        console.log(e.response.data);
        SetIsLoading(false)
        Alert.alert("Error al guardar comentario","Ya haz registrado un comentario anteriormente");
        }
    }

    const validar = () =>{
        if(comment!="" && rating!=0){
            console.log("COMENTARIO: ",comment)
            console.log("CALIFICACION: ",rating)
            storeComments(comment,rating)
        }else{
            Alert.alert("Registro invalido","Necesitamos que nos brindes tu opinón y calificación.")
        }
    }

    


  return (
    <View style={styles.container}>
        <StatusBar animated={true} backgroundColor="transparent" barStyle={'dark-content'}/>
        <Loader visible={isLoading} text="Almacenando comentario" />
      <View>
        <Text style={styles.title}>
                ¿Qué te ha parecido la experiencia?
            </Text>
            <Text style={styles.subtitle}>
            Déjanos un comentario para rectificar en aquello que crea erroneo y asi seguir mejorando nuestro servicio
            </Text>
            <Rating
                type='heart'
                ratingCount={5}
                onSwipeRating
                imageSize={60}
                startingValu={0}
                //showRating
                onFinishRating={ratingCompleted}
                />
            <TextInput
            style={{marginVertical:"10%"}}
            multiline={true}
            numberOfLines={4}
            maxLength={150}
            label={"Redacta tu opinón aquí"}
            placeholder={"Redacta tu opinón aquí"}
            onChangeText={(text) => setComment(text)}
            value={comment}/>
            <Button title="ENVIAR" onPress={validar}/>
            </View>
            </View>
        )
}

export default Comments

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      //alignItems: 'center',
      paddingHorizontal:20,
      //justifyContent: 'center',
    },
    title:{
        marginVertical:10,
        fontSize:22,
        //color:"#33576f",
        textAlign:'left',
        //fontWeight:'bold',
        fontFamily: 'Poppins_500Medium'
    },
    subtitle:{
        fontSize:14,
        marginBottom: 10,
        //color:"#33576f",
        textAlign:'justify',
        fontFamily: 'Poppins_400Regular'
    },
  });
  