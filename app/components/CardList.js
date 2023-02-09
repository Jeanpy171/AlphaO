import { StyleSheet, Text, View,Dimensions } from 'react-native'
import React, { useRef, useState } from 'react'
import { FlatList } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { Image } from 'react-native'
import {colors,shadow, sizes, spacing} from '../const/CONST'
import { Animated } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const SLIDER_WIDTH = sizes.width + 80
const CARD_WIDTH = sizes.width - 50;
const CARD_HEIGHT = 350;
const CARD_WIDTH_SPACING = CARD_WIDTH + spacing.l;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7)

const CardList = ({list}) => {
    const [index, setIndex] = useState(0)
    const scrollX = useRef(new Animated.Value(0)).current;
    const isCarousel = React.useRef(null)
    const navigation = useNavigation()
    return (
      <View>
      <FlatList
          data={list}
          horizontal
          snapToInterval={CARD_WIDTH_SPACING}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          keyExtractor={i => i.id}
          renderItem={({item, index}) => {
              return(
                <View style={{width:sizes.width/1.5,height:sizes.height/3,backgroundColor:'rgb(248, 248, 255)',paddingVertical:5}}>
                    <TouchableOpacity
                        style={{
                            marginLeft: spacing.l,
                            marginRight: index === list.length - 1 ? spacing.l : 0,
                            
                        }}
                        onPress={() => {(navigation.navigate('PowerDetailsScreen',{power:item}))}}
                    >
                        <View style={{width:sizes.width,height:sizes.height/3.1,borderRadius:15,shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 10,}}>
                            <View style={{width:"100%",height:"50%",overflow:'hidden'}}>
                                <Image source={{uri:item.image}} style={{width:sizes.width/1.5,height:sizes.height/6}}/>
                            </View>
                            <View style={{backgroundColor:'white',width:"61%",height:"100%",paddingHorizontal:5,overflow:'hidden',flex:1}}>
                                <Text style={styles.title}>{item.title}</Text>
                                <Text style={styles.caption}>{item.resume}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    
                </View>
                  
                  
              )
          }}
          
      />
      </View>
    )
  }
  
  export default CardList
  
  const styles = StyleSheet.create({
      card: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        //marginVertical: 10,
      },
      imageBox: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        backgroundColor:'blue',
        //borderRadius: sizes.radius,
        overflow: 'hidden',
      },
      image: {
        width: CARD_WIDTH,
        height: (CARD_HEIGHT + 50)/2,
        resizeMode: 'cover',
      },
      titleBox: {
        position: 'absolute',
        backgroundColor:'red',
        paddingHorizontal:15,
        width: CARD_WIDTH,
        height: (CARD_HEIGHT - 50) / 2,
        top: (CARD_HEIGHT + 50)/2,
      },
      title: {
        fontSize: sizes.h3,
        color: colors.black,
        fontFamily: 'Poppins_700Bold'
      },
      caption: {
        fontSize: sizes.body,
        color: colors.black,
        fontFamily: 'Poppins_400Regular'
      },
    });