import { VideoFullscreenUpdate } from 'expo-av';
import { View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  Image,
  SafeAreaView,
  TouchableOpacity,Dimensions } from 'react-native'
import * as ScreenOrientation from 'expo-screen-orientation';
import { Video,Audio } from 'expo-av';
import React, { useEffect, useState } from 'react'
import MainHeader from '../components/MainHeader';
import { ScrollView } from 'react-native-gesture-handler';
import {Poppins_400Regular,Poppins_700Bold,Poppins_800ExtraBold,Poppins_600SemiBold,Poppins_500Medium} from '@expo-google-fonts/poppins';
import { useFonts } from '@expo-google-fonts/dev';
import { play,pause, resume, playAnother } from '../utils/audioController';
import TrackListScreen from './TrackListScreen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoaderAnimation from '../components/LoaderAnimation';
import { StatusBar } from 'react-native';
//const INSETS = useSafeAreaInsets();
const EstresScreen = ({navigation,route}) => {
  const {gender} = route.params
  const token = AsyncStorage.getItem('token');
  const [canciones,setcanciones] = useState([]);
  const [refresh,setRefresh] = useState(true);
  const [showAnimation,setShowAnimation] = useState(false);

  const getMusicList = async () => {
    setShowAnimation(true)
    console.log(gender.playList)
    console.log(await token)
    try {
        console.log("Recopilando canciones")
        const response = await axios.get(
          gender.playList,
            { headers: { 'accept': 'application/json', 'authorization': await token } }
        );
        //console.log(response.data.data.music_ones);
        setcanciones(response.data.data.musics)
        //setRefresh(ref)
        setShowAnimation(false)
    } catch (e) {
      console.log(e)
      setShowAnimation(false)
      alert("Error al cargar las canciones");
    }
  }
  
  useEffect(() => {
    getMusicList()
    console.log("CANCIONES CARGADAS: ",canciones)
  },[])


  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold
  });

    function setOrientation() {
        if (Dimensions.get('window').height > Dimensions.get('window').width) {
    
          //Device is in portrait mode, rotate to landscape mode.
          ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    
        }
        else {
          
          //Device is in landscape mode, rotate to portrait mode.
          ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    
        }
      }

    


  if (!fontsLoaded) {
    return null;
} else {
  return (
    <View style={styles.container}>
        <StatusBar hidden={false} />
        <LoaderAnimation visible={showAnimation}/>
      <MainHeader screen={gender.title} name={'ios-arrow-back'} onPress={() => {
        setcanciones([])
        navigation.navigate("GenderScreen")
      }
        }/>
      <Text style={styles.title}>Video introductorio</Text>
                <View style={styles.videoView}>
                <Video
                source={{
                  uri: 'https://res.cloudinary.com/dcya5apib/video/upload/v1671203849/videos/Rolando_Toro_Biodanza_Demonstratie_intense_dans_1_480P_pc26a5.mp4',
                }}
                rate={1.0}
                volume={1.0}
                isMuted={false}
                resizeMode="cover"
                shouldPlay={false}
                isLooping={false}
                useNativeControls
                onFullscreenUpdate={setOrientation}
                style={{ width:Dimensions.get("window").width, height:Dimensions.get("window").height/3,}}
                /> 
                </View>
                <Text style={styles.subtitle}>{gender.body}</Text>
                <TrackListScreen musiclibrary={canciones}/>
      
    </View>
  )
}
}

export default EstresScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      //justifyContent: 'center',
    },
    subcontainer: {
      flex: 4,
      backgroundColor: '#191414',
      //backgroundColor: '#fff',
      //marginTop:10,
      alignItems: 'center',
      width:Dimensions.get("window").width,
      height: Dimensions.get("window").height,
    },
    videoView:{
      width:Dimensions.get("window").width,
      height: Dimensions.get("window").height/3,
      borderRadius:15,
      //paddingHorizontal:20,
      backgroundColor:'black',
      //right:20,
  },
  title:{
    fontSize:20,
    paddingVertical:5,
    paddingHorizontal:10,
    right:"20%",
    //color:"#33576f",
    textAlign:'justify',
    fontFamily:'Poppins_600SemiBold',
    //fontFamily: 'Poppins_400Regular'
},
  subtitle:{
      fontSize:15,
      paddingVertical:10,
      paddingHorizontal:10,
      //color:"#33576f",
      textAlign:'justify',
      //fontFamily:'Poppins_500Medium',
      fontFamily: 'Poppins_400Regular'
  },
  video: {
      width:Dimensions.get("window").width,
      height: Dimensions.get("window").height
    },
    
  });