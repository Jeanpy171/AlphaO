import { Alert, FlatList, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View,} from 'react-native'
import React, { useCallback, useState } from 'react'
import MainHeader from '../components/MainHeader';
import { Image } from 'react-native';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Icon } from '@rneui/base';
import Lottie from 'lottie-react-native';
import { sizes } from '../const/CONST';

const LoaderAnimation = ({visible}) => {
  return (
    visible && (<View style={styles.container}>
                                <Lottie 
                                    source={require('../../assets/loader.json')} 
                                    autoPlay 
                                    loop = {true}
                                    speed= {1}
                                    style={styles.lottieAnimation}
                                    onAnimationFinish = {() => {
                                        console.log("ANIMACION DE RECARGA FINALIZADA")
                                    }}
                                />
                            </View>)
  )
}

export default LoaderAnimation

const styles = StyleSheet.create({
    lottieAnimation:{
        width:50, 
        height:100,
        justifyContent:'center',
        alignItems:'center',
        zIndex:2,
        //backgroundColor:'red'
    },
    container: {
        position: 'absolute',
        //zIndex: 10,
        alignItems:'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        width: sizes.width,
        height: sizes.height,
        zIndex: 1,
        //zIndex:3,
      },
})