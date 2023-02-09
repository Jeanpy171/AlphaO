import { View, Text, StyleSheet, Dimensions } from 'react-native'
import * as ScreenOrientation from 'expo-screen-orientation';
import { Video } from 'expo-av';
import React, { useEffect, useState } from 'react'
import MainHeader from '../components/MainHeader';
import { Poppins_400Regular, Poppins_700Bold, Poppins_800ExtraBold, Poppins_600SemiBold, Poppins_500Medium } from '@expo-google-fonts/poppins';
import { useFonts } from '@expo-google-fonts/dev';
import TrackListScreen from './TrackListScreen';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoaderAnimation from '../components/LoaderAnimation';
import { StatusBar } from 'react-native';
import { sizes } from '../const/CONST';

const MiedoScreen = ({ navigation, route }) => {
  const { gender } = route.params
  const token = AsyncStorage.getItem('token');
  const [data, setData] = useState({});
  const [canciones, setcanciones] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const [showAnimation, setShowAnimation] = useState(false);

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
      console.log(response.data.data.iras);
      setData(response.data.data.iras)
      console.log(response.data.data.music);
      setcanciones(response.data.data.music)
      setShowAnimation(false)
    } catch (e) {
      console.log(e)
      setShowAnimation(false)
      alert("Error al cargar las canciones");
    }
  }

  useEffect(() => {
    getMusicList()
    console.log("CANCIONES CARGADAS: ", canciones)
  }, [])


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
        <LoaderAnimation visible={showAnimation} />
        <MainHeader screen={gender.title} name={'ios-arrow-back'} onPress={() => {
          setcanciones([])
          navigation.navigate("GenderScreen")
        }
        } />
        <Text style={styles.title}>Video introductorio</Text>
        <View style={styles.videoView}>
          <Video
            source={{ uri: data.video }}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode="cover"
            shouldPlay={false}
            isLooping={false}
            useNativeControls
            onFullscreenUpdate={setOrientation}
            style={{ width: Dimensions.get("window").width, height: Dimensions.get("window").height / 3, }}
          />
        </View>
        <Text style={styles.subtitle}>{data.descripcion}</Text>
        <TrackListScreen musiclibrary={canciones} />

      </View>
    )
  }
}

export default MiedoScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  subcontainer: {
    flex: 4,
    backgroundColor: '#191414',
    alignItems: 'center',
    width: sizes.width,
    height: sizes.height,
  },
  videoView: {
    width: sizes.width,
    height: sizes.height / 3,
    borderRadius: 15,
    backgroundColor: 'black',
  },
  title: {
    fontSize: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    right: "20%",
    textAlign: 'justify',
    fontFamily: 'Poppins_600SemiBold',
  },
  subtitle: {
    fontSize: 15,
    paddingVertical: 10,
    paddingHorizontal: 10,
    textAlign: 'justify',
    fontFamily: 'Poppins_400Regular'
  },
  video: {
    width: sizes.width,
    height: sizes.height
  },

});