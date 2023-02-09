import { StyleSheet, Text, View, ScrollView, Alert, ImageBackground } from 'react-native'
import React, { useContext, useState } from 'react'
import Input from '../components/Input'
import Button from '../components/Button'
import Loader from '../components/Loader';
import { validateAddress, validateHomePhone, validatePhone, validateUsername } from '../utils/helpers';
import axios from 'axios';
import { AuthContext, AuthProvider } from '../../app/context/AuthContext';
import { Poppins_400Regular, Poppins_400Regular_Italic, Poppins_500Medium } from '@expo-google-fonts/poppins';
import { useFonts } from '@expo-google-fonts/dev';
import CustomModal from '../components/Modal';
import { StatusBar } from 'react-native';
import { sizes } from '../const/CONST';

export default function Register_part2({ navigation, route }) {
  const [userData, setUserData] = useState({ username: '', home_phone: '', personal_phone: '', address: '' });
  const [errorHome_phone, setErrorHome_phone] = useState();
  const [errorPersonal_phone, setErrorPersonal_phone] = useState();
  const [errorUsername, setErrorUsername] = useState();
  const [errorAddress, setErrorAddress] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [inputError, setInputError] = useState("")
  const datosRecuperados = route.params;
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium
  });

  const { login, profileInformation } = useContext(AuthContext)

  const validate = () => {
    let isValid = true;
    if (errorUsername != '') {
      console.log('DATOS DE USERNAME')
      setErrorUsername('El campo nombre de usuario no puede estar vacio')
      isValid = false;
    }
    if (errorPersonal_phone != '') {
      console.log('DATOS DE TELEFONO')
      setErrorPersonal_phone('el campo numero telefonico no puede estar vacio')
      isValid = false;
    }
    if (errorHome_phone != '') {
      console.log('DATOS DE CONVENCIONAL')
      setErrorHome_phone('El campo telefono convencional no puede estar vacio')
      isValid = false;
    }
    if (errorAddress != '') {
      console.log('DATOS DE ADDRESS')
      setErrorAddress('El campo direccion domiciliaria no puede estar vacio')
      isValid = false;
    }
    if (errorUsername == '' && errorPersonal_phone == '' && errorHome_phone == '' && errorAddress == '') {
      console.log('DATOS SIN ERRORES')
    }
    if (isValid) {
      console.log(datosRecuperados.userData)
      console.log(userData)
      Register(userData.username,
        datosRecuperados.userData.email,
        datosRecuperados.userData.password,
        datosRecuperados.userData.first_name,
        datosRecuperados.userData.last_name,
        userData.address,
        userData.personal_phone,
        userData.home_phone,
      )
    }
  };


  const Register = async (username, email, password, first_name, last_name, address, personal_phone, home_phone) => {
    setIsLoading(true)
    try {
      console.log("Realizando peticion")
      const response = await axios.post(
        'https://alphaofinal.herokuapp.com/api/alpha/register',
        { first_name, last_name, username, email, personal_phone, home_phone, address, password },
        { headers: { 'accept': 'application/json' } }
      )
      console.log("DATOS REGISTRADOS")
      console.log(response.data)
      onLogin(email, password)
      setIsLoading(false)
      navigation.navigate("account-created", { userCredentials: { username: username } })
    } catch (e) {
      console.log(e.response.data.errors)
      Alert.alert('Error al registrar!', JSON.stringify(e.response.data.errors));
      setInputError("Tuvimos un error al crear tu cuenta")
      setIsLoading(false)
    }
  }

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
    } catch (e) {
      console.log(e)

    }
  }




  if (!fontsLoaded) {
    return null;
  } else {
    return (
      <ScrollView style={styles.mainContainer}>
        <Loader visible={isLoading} text="Verificando datos" />
        <StatusBar hidden={false} />
        <CustomModal isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} ButtonName={"Acceder"} onPress={() => {
          navigation.goBack()
        }} title={"Encontramos un problema al crear tu cuenta"} text={inputError} />
        <ImageBackground
          source={require("../../assets/garza-fondo.jpg")}
          imageStyle={{ opacity: 0.3 }}
          style={styles.background}
        >
          <View style={styles.contentContainer}>
            <Text style={styles.title}>
              Ya falta muy poco
            </Text>
            <Text style={styles.subtitle}>
              Completa estos ultimos campos
            </Text>
            <Input
              onChangeText={txt => {
                validateUsername(txt, setErrorUsername)
                setUserData({ ...userData, username: txt })
              }}
              iconName="account-outline"
              label="Nombre de usuario"
              placeholder="Ingresa tu nombre de usuario"
              maxLength={10}
              error={errorUsername}
              keyboard='default'
              editable={true}
              value={userData.username}
            />
            <Input
              onChangeText={txt => {
                validatePhone(txt, setErrorPersonal_phone)
                setUserData({ ...userData, personal_phone: txt })
              }}
              iconName="cellphone"
              label="Numero telefonico"
              placeholder="Ingresa tu numero telefonico"
              maxLength={10}
              error={errorPersonal_phone}
              keyboard='numeric'
              editable={true}
              value={userData.personal_phone}
            />
            <Input
              onChangeText={txt => {
                validateHomePhone(txt, setErrorHome_phone)
                setUserData({ ...userData, home_phone: txt })
              }}
              iconName="phone"
              label="Numero convencional"
              placeholder="Ingresa tu numero convencional"
              maxLength={9}
              error={errorHome_phone}
              keyboard='numeric'
              editable={true}
              value={userData.home_phone}
            />
            <Input
              onChangeText={txt => {
                validateAddress(txt, setErrorAddress)
                setUserData({ ...userData, address: txt })
              }}
              iconName="compass"
              label="Dirección"
              placeholder="Ingresa tu dirección domiciliaria"
              maxLength={50}
              error={errorAddress}
              keyboard='default'
              editable={true}
              value={userData.address}
            />
            <Button title="FINALIZAR REGISTRO" onPress={validate} />
          </View>
        </ImageBackground>
      </ScrollView>
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
    height: sizes.height
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
})