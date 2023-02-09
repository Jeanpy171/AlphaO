import { StyleSheet, Text, View, Dimensions,Image, KeyboardAvoidingView, Alert, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../app/context/AuthContext'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BackgroundImage,Icon } from '@rneui/base'
import axios from 'axios';
import Input from '../components/Input';
import { validateName, validateLastname,validateAddress,validateHomePhone,validatePhone,validateUsername, } from '../utils/helpers';
import {Poppins_400Regular,Poppins_400Regular_Italic,Poppins_500Medium,Poppins_800ExtraBold,Poppins_600SemiBold} from '@expo-google-fonts/poppins';
import { useFonts } from '@expo-google-fonts/dev';
import * as ImagePicker from 'expo-image-picker';
import Button from '../components/Button'
import DatePick from '../components/DatePick';
import MainHeader from '../components/MainHeader';
import Loader from '../components/Loader';
import CustomModal from '../components/Modal';
import { sizes } from '../const/CONST';

const EditProfile = ({navigation,route}) => {
  const {user, logged, logout, isLogged,userInfo,avatar,profileInformation} = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(false)
  const [text, setText] = useState('')
  //const [newAvatar, setNewAvatar] = useState('')
  const [newAvatar,setNewAvatar] = useState({url:avatar.url})
    const [errorName, setErrorName] = useState('');
    const [errorLastname, setErrorLastname] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorHome_phone, setErrorHome_phone] = useState('');
    const [errorPersonal_phone, setErrorPersonal_phone] = useState('');
    const [errorUsername, setErrorUsername] = useState('');
    const [errorAddress, setErrorAddress] = useState('');
    const token = AsyncStorage.getItem('token');
    //const [userInfo, setUserInfo] = useState(({first_name:'',last_name:'',email:'',username: '',home_phone: '',personal_phone:'', address: '',birthdate:''}))
    //const [inputErrors, setInputErrors] = useState(({first_name:'',last_name:'',email:'',username: '',home_phone: '',personal_phone:'', address:'',birthdate:''}))v
    const [userData, setUserData] = useState(({first_name:userInfo.first_name,last_name:userInfo.last_name,email:userInfo.email,username: userInfo.username,home_phone: userInfo.home_phone,personal_phone:userInfo.personal_phone, address: userInfo.address,birthdate:userInfo.birthdate}))
    //const [userData, setUserData] = useState({})
    const [date, setDate] = useState(new Date())
    const [isValue,setValue] = useState(false)
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isModalVisible,setIsModalVisible] = useState(false)
    const [inputError,setInputError] = useState("")
    
    let [fontsLoaded] = useFonts({
      Poppins_400Regular,
      Poppins_500Medium,
      Poppins_800ExtraBold,
      Poppins_600SemiBold
    });

    useEffect(() => {
      if(isValue){
        setUserData({...userData, birthdate:date})
      }
    },[date])

    const showDatePicker = () => {
      setDatePickerVisibility(true);
    };
    
    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };

    const updateAvatar = async (image) => {
      let filename = image.split('/').pop();
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;
      let formData = new FormData();
      formData.append('image', { uri: image, name: filename, type });
      console.log(image)
      console.log(await token)
      setText("Actualizando foto de perfil")
      setIsLoading(true)
      try {
          console.log("Entrando a actualizar perfil")
          const response = await axios.post(
            'https://alphaofinal.herokuapp.com/api/alpha/profile/avatar',
            formData,
            { headers: { 'Content-Type': 'multipart/form-data', 'authorization': await token } }
        );
          console.log("ACTUALIZANDO AVATAR DEL PERFIL")
          console.log("--------------------------------------")
          profileInformation(token)
          console.log(response.data.message)
          setIsLoading(false)
          navigation.navigate('ProfileScreen')
      } catch (e) {
        console.log(e)
        setIsLoading(false)
        alert("FALLO AL ACTUALIZAR EL AVATAR");
      }
    }

     const validate = () => {
        let isValid = true;
        console.log(userInfo)
        if(newAvatar.url!=avatar.url){
          updateAvatar(newAvatar.url)
          console.log('AVATAR MODIFICADO')
      }
        if(errorName!=''){
            setIsModalVisible(true)
            setInputError(errorName)
            console.log('DATOS DE NOMBRE')
            
            isValid = false;
        }
        if(errorLastname!=''){
            setIsModalVisible(true)
            console.log('DATOS DE APELLIDO')
            setInputError(errorLastname)
            isValid = false;
        }
        if(errorEmail!=''){
            setIsModalVisible(true)
            console.log('DATOS DE EMAIL')
            setInputError(errorEmail)
            isValid = false;
        }
    
        if(errorName=='' && errorLastname==''&& errorEmail=='' && errorUsername=='' && errorPersonal_phone==''&& errorHome_phone==''&& errorAddress==''){
            console.log('DATOS SIN ERRORES')
        }
        if(errorUsername!=''){
            setIsModalVisible(true)
            console.log('DATOS DE USERNAME')
            setInputError(errorUsername)
            isValid = false;
          }
          if(errorPersonal_phone!=''){
              setIsModalVisible(true)
              console.log('DATOS DE TELEFONO')
              setInputError(errorPersonal_phone)
              isValid = false;
          }
          if(errorHome_phone!=''){
              setIsModalVisible(true)
              console.log('DATOS DE CONVENCIONAL')
              setInputError(errorHome_phone)
              isValid = false;
          }
          if(errorAddress!=''){
              setIsModalVisible(true)
              console.log('DATOS DE ADDRESS')
              setInputError(errorAddress)
              isValid = false;
          }
        
        if (isValid) {
          updateProfile(userData.first_name,userData.last_name, userData.username,userData.address, userData.personal_phone,userData.home_phone,userData.birthdate)
        }
      };

    const updateProfile = async (first_name,last_name,username,address,personal_phone,home_phone, birthdate) => {
      setText("Actualizando datos del perfil")
      setIsLoading(true)
      try {
        const response = await axios.post(
            'https://alphaofinal.herokuapp.com/api/alpha/profile',
            { first_name,last_name,username,birthdate,personal_phone,home_phone,address, },
            { headers: { 'accept': 'application/json', 'authorization': await token } }
        );
        console.log("-----------------------------MODIFICANDO EL PERFIL  ----------------\n")
        profileInformation(token)
        console.log(response.data)
        setIsLoading(false)
        navigation.navigate('ProfileScreen')
    } catch (error) {
        console.log(error.response.data);
        setIsLoading(false)
        Alert.alert("Error al actualizar el campo",error.response.data.message)
        setInputError(error.response.data)
    }
    }
 
    const selectImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.cancelled) {
          //setAvatar({...avatar,url:result.uri});
          setNewAvatar({...newAvatar,url:result.uri});
          //setNewAvatar(result.uri)
        }
        console.log("-----------------------------------------------")
        //console.log(avatar);
        console.log(newAvatar);
        console.log("///////////////////////////////////////////////")
        //console.log(formData);
    }
    
    if (!fontsLoaded) {
      return null;
    } else {
      return (
        
        <View style={styles.container}>
         <Loader visible={isLoading} text={text} />
          <MainHeader screen={"Actualizar Perfil"} name={'ios-arrow-back'} onPress={() => navigation.goBack()}/>
          <CustomModal isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} ButtonName={"Cancelar"} onPress={() => navigation.goBack()} title={"Se han encontrado errores en los campos modificados"} text={inputError}/>
          <View style={{paddingVertical:5,width:'95%'}}>
            <Text style={styles.title}>
                Edita los campos que quieres actualizar
            </Text>
            </View>
          <View style={{width:'100%', flexDirection:'row', paddingHorizontal:10}}>

            <View style={{width:'48%', marginRight:6}}>
            
            <Input
            onChangeText={txt => {
              //setErrorName("")
              validateName(txt,setErrorName)
              setUserData({...userData, first_name:txt})
            }}
            //onFocus={() => handleError(null, 'email')}
            iconName="account-outline"
            label="Nombre"
            maxLength={10}
            error={errorName}
            keyboard='default'
            editable={true}
            value={userData.first_name}
            />
            <Input
            onChangeText={txt => {
              //setErrorEmail("")
              validateUsername(txt,setErrorUsername)
              setUserData({...userData, username:txt})
            }}
            //onFocus={() => handleError(null, 'email')}
            iconName="account-outline"
            label="Nombre de usuario"
            maxLength={10}
            error={errorUsername}
            keyboard='default'
            editable={true}
            value={userData.username}
            />
            <Input
            onChangeText={txt => {
              //setErrorEmail("")
              validateHomePhone(txt,setErrorHome_phone)
              setUserData({...userData, home_phone:txt})
            }}
            //onFocus={() => handleError(null, 'email')}
            iconName="phone"
            label="Numero convencional"
            maxLength={9}
            error={errorHome_phone}
            keyboard='numeric'
            editable={true}
            value={userData.home_phone}
            />
            </View>
            <View style={{width:'50%'}}>
             <Input
            onChangeText={txt => {
              //setErrorLastname("")
              validateLastname(txt,setErrorLastname)
              setUserData({...userData, last_name:txt})
            }}
            //onFocus={() => handleError(null, 'email')}
            iconName="account-outline"
            label="Apellido"
            maxLength={15}
            error={errorLastname}
            keyboard='default'
            editable={true}
            value={userData.last_name}
            />
            <Input
            onChangeText={txt => {
              //setErrorEmail("")
              validatePhone(txt,setErrorPersonal_phone)
              setUserData({...userData, personal_phone:txt})
            }}
            //onFocus={() => handleError(null, 'email')}
            iconName="cellphone"
            label="Numero telefonico"
            maxLength={10}
            error={errorPersonal_phone}
            keyboard='numeric'
            editable={true}
            value={userData.personal_phone}
            />
            <DatePick
            onPress={showDatePicker}
            getDate={setDate}
            iconName="cake"
            label="Fecha de nacimiento"
            maxLength={30}
            //error={errorAddress}
            keyboard='default'
            editable={false}
            value={userData.birthdate}
            setData={setValue}
           />
            </View>
            
            </View>
            <View style={{width:'95%'}}>
            <Input
            onChangeText={txt => {
              //setErrorEmail("")
              validateAddress(txt,setErrorAddress)
              setUserData({...userData, address:txt})
            }}
            //onFocus={() => handleError(null, 'email')}
            iconName="compass"
            label="Dirección"
            maxLength={40}
            error={errorAddress}
            keyboard='default'
            editable={true}
            value={userData.address}
            />
            </View>
            <View style={styles.headerContainer}>
              <BackgroundImage
                  source={{uri:newAvatar.url}}
                  imageStyle= {{opacity:0.5}}
                  style={styles.backgroundImage}
              >
              </BackgroundImage>
              </View>
              <View style={styles.avatarContainer}>
                <Image
                    source={{uri:newAvatar.url}} 
                    style={styles.avatar}
                />
                <TouchableOpacity 
                  style={{width:50,height:50,backgroundColor:'white',bottom:'5%', justifyContent:'center',alignItems:'center',left:60, borderRadius:25}}
                  onPress={selectImage}
                >
                  <Image
                      source={require('../../assets/camera.png')} 
                      style={{width:30,height:25}}
                  />
                </TouchableOpacity>
              </View>
          <View style={{width:'95%',alignItems:'center',justifyContent:'center', height:'10%', bottom:'20%'}}>
            <Button title="ACTUALIZAR PERFIL" onPress={validate}/>
          </View>
          </View>
          
      )
              }
    }

export default EditProfile

const styles = StyleSheet.create({
    container: {
      flex:1,
        backgroundColor: "#fff",
        alignItems: 'center',
      },
      
      headerContainer: {
        //paddingHorizontal:10,
        width: sizes.width - 20,
        height: sizes.height/3.5,
        //backgroundColor:'red'
      },
      backgroundImage:{
        width:  sizes.width - 20,
        height: sizes.height/3.5,
        aspectRatio: 2, 
        resizeMode: 'stretch',
      },
    contentContainer:{
      
      borderTopStartRadius:15,
      borderTopEndRadius:15,
      backgroundColor:'blue',
      //alignItems: 'center',
      paddingHorizontal:10,
      paddingVertical:15,
      
      width: "100%",
      height: 200,
      
    },
    avatarContainer:{
      width: "70%",
      height:'20%',
      alignItems:'center',
      //backgroundColor:'blue',
      justifyContent:'center',
      bottom:'24%',
      zIndex:1,
      //left:"26%",
    },

    avatar: {
        height: 125,
        width: 125,
        borderRadius: 20,
        top:'15%',
        
        },
    title:{
      fontSize:16,
      textAlign:'left',
      fontFamily: 'Poppins_500Medium',
  },
  
    
})