import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import * as ScreenOrientation from 'expo-screen-orientation';
import { Video } from 'expo-av'
import { sizes } from '../const/CONST'

const VideoComponent = ({videoUrl,setOrientation}) => {
    
  return (
    <View style={styles.videoView}>
        <Video
            source={{uri:videoUrl}}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode="cover"
            shouldPlay={false}
            isLooping={false}
            useNativeControls
            onFullscreenUpdate={setOrientation}
            style={{ width:sizes.width, height:sizes.height/3,}}
            /> 
    </View>
  )
}

export default VideoComponent

const styles = StyleSheet.create({
    videoView:{
        width:sizes.width,
        height:sizes.height/3,
        borderRadius:15,
        //paddingHorizontal:20,
        backgroundColor:'black',
        //right:20,
    },
})