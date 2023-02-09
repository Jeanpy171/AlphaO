import { StyleSheet, Text, View, Image, ImageBackground, KeyboardAvoidingView, StatusBar } from 'react-native'
import React, { useContext, useState } from 'react'
import Input from '../components/Input'
import Button from '../components/Button'
import Loader from '../components/Loader';
import { validateEmail, validatePassword } from '../utils/helpers';
import axios from 'axios';
import { AuthContext, } from '../../app/context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { Poppins_400Regular, Poppins_700Bold, Poppins_800ExtraBold, Poppins_600SemiBold, Poppins_500Medium } from '@expo-google-fonts/poppins';
import { useFonts } from '@expo-google-fonts/dev';
import { colors, sizes } from '../const/CONST';
import { Alert } from 'react-native';

export default function Login() {
  const [userData, setUserData] = useState({ email: '', password: '' });
  const [errorEmail, setErrorEmail] = useState();
  const [errorPassword, setErrorPassword] = useState();
  const [isLoading, setIsLoading] = useState(false);

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold
  });

  const navigation = useNavigation();
  const { login } = useContext(AuthContext);
  const LOGO = require("../../assets/biodanza-logo.png");

  const validate = async () => {
    let isValid = true;
    if (errorEmail != '') {
      console.log('DATOS DE EMAIL')
      setErrorEmail('El campo correo electronico no puede estar vacio')
      isValid = false;
    }
    if (errorPassword != '') {
      setErrorPassword('Debes ingresar una contrasena valida');
      isValid = false;
    }

    if (errorPassword != '' && errorEmail != '') {
      Alert.alert("Datos errorenos", "Asegurese de ingresar datos correctos para iniciar sesión")
    }

    if (isValid) {
      setIsLoading(true)
      console.log(userData.email, userData.password)
      await onLogin(userData.email, userData.password)
    }
  };


  const onLogin = async (email, password) => {
    try {
      console.log("Realizando peticion")
      const response = await axios.post(
        'https://alphaofinal.herokuapp.com/api/alpha/login',
        { email, password },
        { headers: { 'accept': 'application/json' } }
      )
      console.log("DATOS EXTRAIDOS")
      console.log(response.data)
      const { access_token, token_type, user } = response.data.data
      login(user, `${token_type} ${access_token}`);
      console.log(access_token)
      console.log(token_type)
      console.log(user)
      setIsLoading(false)
      navigation.navigate('home')
    } catch (e) {
      console.log(e.response.data.message)
      Alert.alert("Error de inicio de sesion", e.response.data.message);
      setIsLoading(false)
    }
  }

  if (!fontsLoaded) {
    return null;
  } else {
    return (
      <KeyboardAvoidingView style={styles.mainContainer}>
        <StatusBar hidden={false} />
        <Loader visible={isLoading} text="Iniciando sesion" />
        <ImageBackground
          source={require("../../assets/garza-fondo.jpg")}
          imageStyle={{ opacity: 0.3 }}
          style={styles.background}
        >
          <View style={styles.contentContainer}>
            <View style={styles.subcontainer}>
              <Image
                style={styles.image}
                source={LOGO}
                resizeMethod={'resize'}
              />
            </View>
            <Text style={styles.title}>
              Bienvenido!
            </Text>
            <Text style={styles.subtitle}>
              Inicia sesión para ser parte de nuestra  danza cósmica
            </Text>
            <Input
              onChangeText={txt => {
                validateEmail(txt, setErrorEmail)
                setUserData({ ...userData, email: txt })
              }}
              iconName="email-outline"
              label="Correo Electrónico"
              placeholder="Ingresa tu correo electrónico"
              maxLength={30}
              error={errorEmail}
              keyboard='email-address'
              editable={true}
              value={userData.email}
            />
            <Input
              onChangeText={text => {
                validatePassword(text, setErrorPassword)
                setUserData({ ...userData, password: text })
              }
              }
              iconName="lock-outline"
              label="Contraseña"
              placeholder="Ingresa tu contraseña"
              error={errorPassword}
              maxLength={15}
              password
              keyboard='default'
              editable={true}
              value={userData.password}
            />
            <Text
              onPress={() => navigation.navigate('recoverPassword')}
              style={styles.recover}>
              ¿Olvidaste tu contraseña?
              <Text style={styles.indications}> Recuperala aquí!</Text>
            </Text>
            <Button title="INICIAR SESIÓN" onPress={validate} />
            <Text
              onPress={() => navigation.navigate('register')}
              style={styles.register}>
              ¿No tienes una cuenta?
              <Text style={styles.indications}> Regístrate aquí!</Text>
            </Text>
            <Text
              onPress={() => navigation.navigate('comments-list')}
              style={styles.comments}>
              ¿Aún no estas convencido?
              <Text style={[styles.indications, { marginVertical: 10 }]}> Revisa las opiniones de nuestros usuarios aquí!</Text>
            </Text>
            <Text onPress={() => navigation.navigate('emotions-screen')}
              style={styles.comments}>
              <Text style={[styles.indications, { marginVertical: 10 }]}> Explorar emociones</Text>
            </Text>
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
    width: sizes.width,
    height: sizes.height
  },
  contentContainer: {
    paddingHorizontal: 24,
    paddingVertical: 10,
  },
  background: {
    width: sizes.width,
    height: sizes.height
  },
  subcontainer: {
    marginVertical: '2%',
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
    marginVertical: 3,
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
    color: colors.red,
    fontFamily: 'Poppins_700Bold'
  },
  comments: {
    color: colors.black,
    textAlign: 'center',
    fontSize: 13,
    marginTop: 15,
    fontFamily: 'Poppins_400Regular'
  },
  indicationsComments: {
    color: colors.red,
    fontFamily: 'Poppins_700Bold'
  }
})