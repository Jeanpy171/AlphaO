import { StyleSheet, Text, TouchableOpacity, View, Animated } from 'react-native'
import React, { useEffect, useRef } from 'react'
import Svg, { Circle, G,  } from 'react-native-svg';
import { Icon } from '@rneui/base';
import { colors } from '../const/CONST';


const NextButton = ({percentage,scrollTo}) => {
    const size = 128;
    const strokeWidth = 2;
    const center = size / 2;
    const radius = size / 2 - strokeWidth / 2;
    const circunference = 2 * Math.PI * radius
    const color1 = "#e6e7e8"
    const color2 = "#f4338f"
    const progressAnimation = useRef(new Animated.Value(0)).current
    const progressRef = useRef(null)

    const animation = (toValue) => {
        return Animated.timing(progressAnimation, {
            toValue,
            duration: 250,
            useNativeDriver: true
        }).start()
    }

    useEffect(() => {
        animation(percentage)
    }, [percentage])

    useEffect(() => {
        progressAnimation.addListener((value) => {
        const strokeDashoffset = circunference - (circunference * value.value) / 100;
        
        if(progressRef?.current) {
            progressRef.current.setNativeProps({
                strokeDashoffset
            })
        }
    
    }, [percentage])

    return () => {
        progressAnimation.removeAllListeners();
    }
    },[]);


  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        <G rotation="-90" origin={center}>
        <Circle 
            cx={center} 
            cy={center}
            r={radius}
            stroke="#ddd"
            strokeWidth={strokeWidth}
            //strokeDasharray={circunference}
        />
        <Circle 
            cx={center} 
            cy={center}
            r={radius}
            stroke="#07c"
            strokeWidth={strokeWidth}
            strokeDasharray={circunference}
            ref={progressRef}
            //strokeDashoffset={circunference - (circunference * 25) / 100}
        />
        </G>
      </Svg>
    <TouchableOpacity onPress={scrollTo} style={styles.button} activeOpacity={0.6}>
        <Icon
            name='arrow-right'
            type='feather'
            size={32}
            color="#fff"
            />
      </TouchableOpacity>
    </View>
  )
}

export default NextButton

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
      button:{
        position:'absolute',
        //backgroundColor:'#f4338f',
        backgroundColor:colors.blue,
        borderRadius: 100,
        padding: 20,
      }
})