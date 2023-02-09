import { StatusBar } from 'expo-status-bar';
import { Modal, StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react'
import Lottie from 'lottie-react-native';
import { useState } from 'react';
import {Poppins_400Regular,Poppins_400Regular_Italic,Poppins_500Medium,Poppins_800ExtraBold,Poppins_600SemiBold} from '@expo-google-fonts/poppins';
import { useFonts } from '@expo-google-fonts/dev';
import { Pressable } from 'react-native';


const AccountCreated = ({navigation,route}) => {
  const {userCredentials} = route.params
  const [modalVisible, setModalVisible] = useState(false);
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
    <View style={styles.container}>
      <Lottie 
      source={require('../../assets/account-created.json')} 
      autoPlay 
      loop = {false}
      speed= {1}
      onAnimationFinish = {async() => {
        setModalVisible(true)
        console.log(userCredentials)
        //onLogin(userCredentials.email,userCredentials.password)
        console.log("ANIMACI[ON DE CUENTA CREADA TERMINADA")
      }}
    />
      <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          //Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{width:250,height:200,left:'4%', marginBottom:10}}>
              <Lottie 
                source={require('../../assets/thanks.json')} 
                autoPlay 
                loop = {true}
                speed= {1}
                onAnimationFinish = {async() => {
                  console.log(userCredentials)
                  //onLogin(userCredentials.email,userCredentials.password)
                  console.log("ANIMACI[ON DE CUENTA CREADA TERMINADA")
                  setModalVisible(true)
                }}
            />
            </View>
            <Text style={styles.modalText}>Bienvenido, {userCredentials.username}, Nos complace tenerte junto a nosotros!</Text>
            <Text style={styles.secondText}>Deseamos que tu experiencia sea gratificante e inolvidable</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setModalVisible(!modalVisible) 
                navigation.navigate('home')
              }}
            >
              <Text style={styles.textStyle}>Continuar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
    </View>
  )
            }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#fff',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    //marginTop: 22
  },
  modalView: {
    marginHorizontal: 15,
    backgroundColor: "white",
    justifyContent:'center',
    borderRadius: 20,
    width:"80%",
    height:390,
    padding: 25,
    //alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    bottom:20,
    marginBottom: 5,
    fontSize:15,
    textAlign: "center",
    fontFamily: 'Poppins_600SemiBold',
  },
  secondText: {
    bottom:10,
    marginBottom: 5,
    fontSize:13,
    textAlign: "center",
    fontFamily: 'Poppins_500Medium',
  }
});

export default AccountCreated