import { StyleSheet, Text, View, Image, ImageBackground, Dimensions, Alert, KeyboardAvoidingView } from 'react-native'
import React from 'react'
import Input from '../components/Input'
import Button from '../components/Button'
import Loader from '../components/Loader';
import { validateEmail } from '../utils/helpers';
import axios from 'axios';
import { Poppins_400Regular, Poppins_500Medium } from '@expo-google-fonts/poppins';
import { useFonts } from '@expo-google-fonts/dev';
import { colors, sizes, urlApiAlphaO } from '../const/CONST';
import { useState } from 'react';
import { StatusBar } from 'react-native';

export default function RecoverPassword({ navigation }) {
  const [email, setEmail] = useState();
  const [errorEmail, setErrorEmail] = useState();
  const [isLoading, setIsLoading] = useState();


  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium
  });

  const validate = () => {
    let isValid = true;
    if (errorEmail != '') {
      console.log('DATOS DE EMAIL')
      setErrorEmail('El campo correo electrónico no puede estar vacio')
      isValid = false;
    }
    if (isValid) {
      forgotPassword(email)
    }
  };

  const forgotPassword = async (email) => {
    setIsLoading(true)
    try {
      console.log("Realizando peticion")
      const response = await axios.post(
        `${urlApiAlphaO}/api/alpha/forgot-password`,
        { email },
        { headers: { 'accept': 'application/json' } }
      )
      console.log(response.data.message);
      Alert.alert('Cuenta encontrada!', "Te hemos enviado un mensaje a tu correo electrónico con un link para reestablecer tu contraseña.");
      navigation.goBack()
    } catch (e) {
      console.log(e.response.data.errors.email)
      setIsLoading(false)
      Alert.alert('Error de verificación', "No pudimos encontrar al usuario con el correo que digitaste.");
    }
  }


  if (!fontsLoaded) {
    return null;
  } else {
    return (
      <KeyboardAvoidingView style={styles.mainContainer}>
        <StatusBar animated={true} backgroundColor="transparent" barStyle={'dark-content'}/>
        <Loader visible={isLoading} text="Validando email" />
        <ImageBackground
          source={require("../../assets/garza-fondo.jpg")}
          imageStyle={{ opacity: 0.2 }}
          style={styles.background}
        >
          <View style={styles.contentContainer}>
            <View style={styles.subcontainer}>
              <Image
                style={styles.image}
                source={require("../../assets/biodanza-logo.png")}
              />
            </View>
            <Text style={styles.title}>
              Recuperar contraseña
            </Text>
            <Text style={styles.subtitle}>Proporciona tu email para enviarte un correo de recuperación</Text>
            <Input
              onChangeText={txt => {
                validateEmail(txt, setErrorEmail)
                setEmail(txt)
              }}
              //onFocus={() => handleError(null, 'email')}
              iconName="email-outline"
              label="Correo Electrónico"
              placeholder="Ingresa tu correo electrónico"
              maxLength={30}
              error={errorEmail}
              keyboard='email-address'
              editable={true}
              value={email}
            />
            <Button title="SOLICITAR CÓDIGO" onPress={validate} />
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 24,
  },
  background: {
    width: sizes.width,
    height: sizes.height + 50
  },
  subcontainer: {
    marginVertical: '8%',
    alignItems: 'center',
    justifyContent: 'center',
    width: sizes.width - 50,
    height: sizes.height / 6,
  },
  image: {
    width: sizes.width - 80,
    height: sizes.height - 50,
    resizeMode: 'contain',
  },
  title: {
    marginVertical: 15,
    fontSize: 27,
    textAlign: 'justify',
    fontFamily: 'Poppins_500Medium'
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'justify',
    fontFamily: 'Poppins_400Regular'
  },
  recover: {
    color: colors.black,
    textAlign: 'right',
    fontSize: 13,
    fontFamily: 'Poppins_400Regular'
  },
  register: {
    color: colors.black,
    textAlign: 'center',
    fontSize: 13,
    fontFamily: 'Poppins_400Regular'
  },
  indications: {
    color: "#FC6B6B",
    fontFamily: 'Poppins_400Regular'
  }
})