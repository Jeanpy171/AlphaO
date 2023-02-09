import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  SafeAreaView,
} from 'react-native';
import React, { useMemo, useState } from 'react'
import { Divider } from '@rneui/base';
import { play, pause, resume, playAnother } from '../utils/audioController';
import { Poppins_400Regular, Poppins_700Bold, Poppins_800ExtraBold, Poppins_600SemiBold, Poppins_500Medium } from '@expo-google-fonts/poppins';
import { useFonts } from '@expo-google-fonts/dev';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { Audio } from 'expo-av';
import secsToTimestamp from '../utils/timeFormat';
import Slider from '@react-native-community/slider';
import { useContext } from 'react';
import MusicContext from '../context/MusicContext/MusicContext';
import { useEffect } from 'react';
import { sizes } from '../const/CONST';

const TrackListScreen = ({ musiclibrary }) => {
  const [selectedMusic, setSelectedMusic] = useState(null);
  const [selectedMusicIndex, setSelectedMusicIndex] = useState(null);
  const [isPlayerModalVisible, setisPlayerModalVisible] = useState(false);
  const [timestamp, setTimestamp] = useState(0);
  const [data, setData] = useState()
  const [playBackObj, setPlayBackObj] = useState(null)
  const [soundObj, setSoundObj] = useState(null)
  const [playbackPosition, setPlaybackPosition] = useState(null)
  const [playbackDuration, setPlaybackDuration] = useState(null)
  const [verificator, setVerificator] = useState(false)
  const [currentPosition, setCurrentPosition] = useState(0);

  const [tempV, setTempV] = useState(0)
  const { currentSong, getSliderValue, onSlidingCompleteContext, onValueChangeSliderContext, onSlidingStartContect, onPrevMusic, onNextMusic, loadSounds, playSound, currentTime, musicDuration, onPlayPause, isPlaying, sliderVale, sliderValeMax } = useContext(MusicContext);

  useEffect(() => {
    console.log("musiclibrary------", musiclibrary)

    loadSounds(musiclibrary)
  }, [musiclibrary])

  const snapPoints = useMemo(() => ['40%', '80%'], [])

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold
  });

  const renderCurrentTime = () => {
    return secsToTimestamp(playbackPosition / 1000)
  }

  const onSelectTrack = async (selectedTrack, index) => {
    console.log("INDEX DE LA LISTA: ", index)
    setSelectedMusic(selectedTrack);
    setCurrentPosition(0);
    setData(selectedTrack)
    playOrPause();
  };

  const playOrPause = async () => {
    //console.log(soundObj)
    console.log("DATA ID: ", data.id)
    console.log("AUDIO EN REPRODUCCION: ", selectedMusicIndex)
    //playing audio for the first time
    if (soundObj === null) {
      console.log("\n--------------REPRODUCIENDO CANCION POR PRIMERA VEZ----------------\n")
      console.log("\n")
      console.log("Datos de la cancion reproducida-----------------", data)
      setSelectedMusic(data)
      setSelectedMusicIndex(data.id)
      const playbackObj = new Audio.Sound()
      const status = await play(playbackObj, data.audio)
      setPlayBackObj(playbackObj)
      setSoundObj(status)
      return playbackObj.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate)
    }
    //pause audio
    if (soundObj.isLoaded && soundObj.isPlaying) {
      console.log("\n--------------CANCION DETENIDA----------------\n")
      console.log("La cancion ya esta siendo reproducida")
      console.log("DATA ID: ", data.id)
      console.log("\nAUDIO EN REPRODUCCION: ", selectedMusicIndex)
      const status = await pause(playBackObj)
      return setSoundObj(status)

    }

    //resume audio
    if (soundObj.isLoaded && !soundObj.isPlaying
      && selectedMusicIndex === (data.id)) {
      console.log("\n--------------REPRODUCIENDO CANCION NUEVAMENTE----------------\n")
      console.log("Reproduciendo nuevamente . . . .")
      console.log("DATA ID: ", data.id)
      console.log("\nAUDIO EN REPRODUCCION: ", selectedMusicIndex)
      const status = await resume(playBackObj)
      return setSoundObj(status)
    }

    //select another audio
    if (soundObj.isLoaded && selectedMusicIndex !== data.id) {
      console.log("\n-------------CAMBIANDO CANCION----------------\n")
      console.log("Reproduciendo nueva cancion. . . .")
      const status = await playAnother(playBackObj, data.audio)
      console.log("DATA ID: ", data.id)
      console.log("\nAUDIO EN REPRODUCCION: ", data.id)
      setSelectedMusic(data)
      setSelectedMusicIndex(data.id)
      setPlayBackObj(playBackObj)
      return setSoundObj(status)
    }

  };

  const onSeekTrack = newTimeStamp => {
    setTimestamp(newTimeStamp);
  };


  const audioFinish = async () => {
    console.log(playBackObj)
    setTimestamp(0);
    setVerificator(true)
    const nextAudioIndex = selectedMusicIndex + 1;
    const audio = musiclibrary[nextAudioIndex];
    const status = await play(playBackObj, audio.url)
    setSelectedMusicIndex(nextAudioIndex);
    setSelectedMusic(audio)
    setPlayBackObj(playBackObj)
    setSoundObj(status)
  }

  const playback = async () => {
    console.log(playBackObj)

  }

  const onPlaybackStatusUpdate = async playbackStatus => {
    if (playbackStatus.isLoaded && playbackStatus.isPlaying) {
      setPlaybackPosition(playbackStatus.positionMillis)
      setPlaybackDuration(playbackStatus.durationMillis)
    }

    if (playbackStatus.didJustFinish) {
      console.log("\n--------------LA CANCION HA FINALIZADO --------------------\n")
    }
  }

  const onPressNext = async () => {
    console.log("\n----------------CAMBIANDO CANCION (SIGUIENTE)-------------------\n")
    setTimestamp(0);
    setSelectedMusicIndex(selectedMusicIndex + 1);
    const { isLoaded } = await playBackObj.getStatusAsync();
    let nextAudioIndex;
    const isLastAudio = selectedMusicIndex + 1 === musiclibrary.length;
    let status;

    if (!isLoaded && !isLastAudio) {
      nextAudioIndex = selectedMusicIndex + 1;
      const audio = musiclibrary[nextAudioIndex];
      setData(audio)
      setSelectedMusic(audio)
      status = await play(playBackObj, audio.audio)
    }

    if (isLoaded && !isLastAudio) {
      nextAudioIndex = selectedMusicIndex + 1;
      const audio = musiclibrary[nextAudioIndex];
      setData(audio)
      setSelectedMusic(audio)
      status = await playAnother(playBackObj, audio.audio)
    }

    if (isLastAudio) {
      nextAudioIndex = 0;
      const audio = musiclibrary[nextAudioIndex];
      setData(audio)
      setSelectedMusic(audio)
      if (isLoaded) {
        status = await playAnother(playBackObj, audio.audio)
      } else {
        status = await play(playBackObj, audio.audio)
      }
    }

    setSelectedMusicIndex(nextAudioIndex);
    setPlayBackObj(playBackObj)
    setSoundObj(status)
  };




  const onPressPrev = async () => {
    console.log("\n----------------CAMBIANDO CANCION (PREVIA)-------------------\n")
    if (selectedMusicIndex === 0) {
      return;
    }
    setTimestamp(0);
    setSelectedMusicIndex(selectedMusicIndex - 1);
    const { isLoaded } = await playBackObj.getStatusAsync();
    let nextAudioIndex;
    const isFirstAudio = selectedMusicIndex <= 0;
    let status;

    if (!isLoaded && !isFirstAudio) {
      nextAudioIndex = selectedMusicIndex - 1;
      const audio = musiclibrary[nextAudioIndex];
      setSelectedMusic(audio)
      setData(audio)
      status = await play(playBackObj, audio.audio)
    }

    if (isLoaded && !isFirstAudio) {
      nextAudioIndex = selectedMusicIndex - 1;
      const audio = musiclibrary[nextAudioIndex];
      setSelectedMusic(audio)
      setData(audio)
      status = await playAnother(playBackObj, audio.audio)
    }

    if (isFirstAudio) {
      nextAudioIndex = musiclibrary.length - 1;
      const audio = musiclibrary[nextAudioIndex];
      setData(audio)
      setSelectedMusic(audio)
      if (isLoaded) {
        status = await playAnother(playBackObj, audio.audio)
      } else {
        status = await play(playBackObj, audio.audio)
      }
    }

    setSelectedMusicIndex(nextAudioIndex);
    setPlayBackObj(playBackObj)
    setSoundObj(status)
  };

  const renderSingleMusic = ({ item, index }) => {

    return (
      <>
        <Pressable onPress={() => {
          playSound(item)
        }}>
          <View>
            <Text style={styles.musicTitle}>{item.tema}</Text>
            <Text style={styles.artisteTitle}>{item.genero}</Text>
            <Divider />
          </View>
        </Pressable>
      </>

    );
  };

  const calculateSeedBar = () => {
    if (playbackPosition !== null && playbackDuration !== null) {
      return playbackPosition / playbackDuration
    }
    return 0
  }


  if (!fontsLoaded) {
    return null;
  } else {
    return (
      <BottomSheet snapPoints={snapPoints}>
        <View style={styles.container}>
          <SafeAreaView />
          <View style={[styles.widgetContainer, { justifyContent: 'center' }]}>
            <Text style={styles.subtitle}>Lista de reproduccion</Text>
          </View>
          <BottomSheetFlatList
            data={musiclibrary}
            keyExtractor={item => item.id}
            renderItem={renderSingleMusic}
          />

          {currentSong && (
            <Pressable onPress={() => setisPlayerModalVisible(true)}>
              <View style={[styles.widgetContainerControl]}>
                <View style={{ flexDirection: 'row' }}>
                  <Image
                    resizeMode="cover"
                    source={{ uri: currentSong.imagen }}
                    style={styles.widgetImageStyle}
                  />
                </View>
                <View style={{ width: "80%", justifyContent: 'flex-start' }}>
                  <View>
                    <Text style={styles.widgetMusicTitle}>
                      {currentSong.tema}

                    </Text>
                    <View style={styles.progressBar}>
                      <Text style={styles.mainText}>{currentTime}</Text>
                      {console.log("vcalor de slider", getSliderValue())}
                      <Slider
                        style={{ width: '70%', height: 20 }}
                        value={getSliderValue()}
                        minimumTrackTintColor="#FFFFFF"
                        maximumTrackTintColor="gray"
                        thumbTintColor='#FFFFFF'
                        onSlidingStart={onSlidingStartContect}
                        minimumValue={0}
                        onValueChange={value => {
                          onValueChangeSliderContext(value)

                        }}
                        maximumValue={1}

                      />

                      <Text style={styles.mainText}>{musicDuration}</Text>
                    </View>
                  </View>
                  <View style={{ width: "93%", flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 100, bottom: '2%' }}>
                    <Pressable onPress={onPrevMusic}>
                      <Image
                        source={require('../../assets/icon/prev.png')}
                        style={{ height: 25, tintColor: '#fff', width: 25 }}
                      />
                    </Pressable>
                    <Pressable onPress={onPlayPause}>
                      <Image
                        source={isPlaying ? require('../../assets/icon/pause.png') : require('../../assets/icon/play.png')}
                        style={{ height: 30, tintColor: '#fff', width: 30 }}
                      />
                    </Pressable>
                    <Pressable onPress={onNextMusic}>
                      <Image
                        source={require('../../assets/icon/next.png')}
                        style={{ height: 25, tintColor: '#fff', width: 25 }}
                      />
                    </Pressable>
                  </View>

                </View>
              </View>
            </Pressable>
          )}
        </View>
      </BottomSheet>
    )
  }
}

export default TrackListScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191414',
  },
  mainText: {
    fontSize: 13,
    color: '#fff',
    opacity: 0.8,
    fontFamily: 'Poppins_400Regular',
    width: 38
  },
  musicTitle: {
    fontSize: 17,
    color: '#fff',
    fontWeight: '500',
    marginTop: 12,
    marginHorizontal: 20,
    marginBottom: 1,
    fontFamily: 'Poppins_700Bold',
  },
  progressBar: {
    flexDirection: 'row',
    marginVertical: 10,
    marginHorizontal: 15,
  },
  progressBarText: {
    color: 'white',
    alignSelf: 'center',
  },
  artisteTitle: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.8,
    marginHorizontal: 20,
    marginBottom: 12,
    marginTop: 1,
    fontFamily: 'Poppins_400Regular',
    width: sizes.width,
  },
  widgetArtisteTitle: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.8,
    marginHorizontal: 10,
    marginBottom: 12,
    marginTop: 1,
  },
  widgetContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 0,
    height: 60,
    width: sizes.width,
    backgroundColor: '#5E5A5A',
  },
  widgetContainerControl: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 0,
    height: 100,
    width: sizes.width,
    backgroundColor: '#5E5A5A',
  },
  widgetMusicTitle: {
    fontSize: 15,
    color: '#fff',
    fontWeight: '500',
    marginTop: 3,
    marginHorizontal: 10,
    fontFamily: 'Poppins_500Medium',
  },
  widgetArtisteTitle: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.8,
    marginHorizontal: 10,
    marginBottom: 12,
    marginTop: 1,
  },
  widgetImageStyle: {
    width: 100,
    height: 100,
  },
  subtitle: {
    fontSize: 20,
    color: '#fff',
    marginHorizontal: 20,
    fontFamily: 'Poppins_500Medium',
  },
})