import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MainHeader from '../components/MainHeader'
import { useState } from 'react';
import Input from '../components/Input';
import axios from 'axios';
import Button from '../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../components/Loader';
import { validatePassword, validatePasswords } from '../utils/helpers';
import { Alert } from 'react-native';

const UpdatePassword = ({ navigation }) => {
  const [userData, setUserData] = useState({ password: '', newPassword: '' });
  const [errorNewPassword, setErrorNewPassword] = useState();
  const [errorPassword, setErrorPassword] = useState();
  const token = AsyncStorage.getItem('token');
  const [isLoading, setIsLoading] = useState(false);

  const validatePasswords = (password, password_confirmation) => {
    console.log(password)
    if (password_confirmation.length != 0) {
      if (password != password_confirmation) {
        console.log("Las contraseñas no coinciden ")
        setErrorPassword("Los campos no coinciden")
        setErrorNewPassword("Los campos no coinciden")
      } else {
        setErrorPassword("")
        setErrorNewPassword("")
      }

    }
  }

  const validate = (password, password_confirmation) => {
    let isValid = true;
    if (errorNewPassword != '') {
      console.log('DATOS DE EMAIL')
      setErrorNewPassword('El campo confirmar contraseña no puede estar vacio')
      isValid = false;
    }
    if (errorPassword != '') {
      setErrorPassword('El campo contraseña no puede estar vacio');
      isValid = false;
    }
    if (errorPassword == '' && errorNewPassword == '') {
      console.log("Actualizando contraseña ")
      UpdatePassword(password, password_confirmation)
    }
  }


  const UpdatePassword = async (password, password_confirmation) => {
    setIsLoading(true)
    console.log(await token)
    try {
      console.log("Actualizando contraseña . . . ")
      const response = await axios.post(
        'https://alphaofinal.herokuapp.com/api/alpha/update-password',
        { password, password_confirmation },
        { headers: { 'accept': 'application/json', 'authorization': await token } }
      )
      console.log(response.data)
      setIsLoading(false)
      console.log("LA CONTRASEÑA HA SIDO ACTUALIZADA EXITOSAMENTE");
      alert("La contraseña ha sido actualizada exitosamente!");
      navigation.goBack()
    } catch (e) {
      console.log(e.response.data.errors.password);
      const errors = e.response.data.errors.password;
      setIsLoading(false)
      Alert.alert("Error al actualizar la contraseña", e.response.data.errors.password.toString());
    }
  }
  return (
    <View style={styles.container}>
      <Loader visible={isLoading} text="Actualizando contraseña" />
      <MainHeader screen={"Actualizar Contraseña"} name={'ios-arrow-back'} onPress={() => navigation.goBack()} />
      <View style={{ width: "90%" }}>
        <View style={{ paddingVertical: 20 }}>

          <Text style={styles.title}>
            No estas seguro con tu contraseña actual?
          </Text>
          <Text style={styles.subtitle}>
            Puedes modificarla en este apartado.
          </Text>
          <Input
            onChangeText={text => {
              setUserData({ ...userData, password: text })
              validatePassword(text, setErrorPassword)
              validatePasswords(text, userData.newPassword)
            }
            }
            iconName="lock-outline"
            label="Nueva contraseña"
            placeholder="Ingresa tu nueva contraseña"
            error={errorPassword}
            maxLength={15}
            password
            keyboard='default'
            editable={true}
            value={userData.password}
          />
          <Input
            onChangeText={text => {
              setUserData({ ...userData, newPassword: text })
              validatePassword(text, setErrorNewPassword)
              validatePasswords(text, userData.password)
            }
            }
            iconName="lock-outline"
            label="Confirma tu contraseña"
            placeholder="Ingresa nuevamente tu nueva contraseña"
            error={errorNewPassword}
            maxLength={15}
            password
            keyboard='default'
            editable={true}
            value={userData.newPassword}
          />
          <Button title="ACTUALIZAR CONTRASEÑA" onPress={() => validate(userData.password, userData.newPassword)} />
        </View>
      </View>
    </View>
  )
}

export default UpdatePassword

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    textAlign: 'left',
    fontFamily: 'Poppins_500Medium',
    paddingVertical: 5,
  },
  subtitle: {
    fontSize: 15,
    textAlign: 'left',
    fontFamily: 'Poppins_500Medium',
    paddingVertical: 10,
  },
});
