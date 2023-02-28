import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Button, Icon } from '@rneui/base'
import MainHeader from '../components/MainHeader'
import Carousel from '../components/Carousel'
import { ScrollView } from 'react-native-gesture-handler'
import CardList from '../components/CardList'
import GenderCard from '../components/GenderCard'
import { StatusBar } from 'react-native'
import { colors, shadow, sizes, spacing } from '../const/CONST'
import { FlatList } from 'react-native'
import { genders } from '../components/data/data'
import { Alert } from 'react-native'


const CARD_WIDTH = sizes.width - 20;
const CARD_HEIGHT = 300;
const CARD_WIDTH_SPACING = CARD_WIDTH + spacing.l;


export const EmotionsNoLogin = ({navigation}) => {
 
  return (
    <View style={styles.container}>
      <StatusBar animated={true} backgroundColor="transparent" barStyle={'dark-content'}/>
      <FlatList
        data={genders}
        //horizontal
        snapToInterval={CARD_WIDTH_SPACING}
        decelerationRate="fast"
        showsVerticalScrollIndicator={false}
        keyExtractor={i => i.id}
        renderItem={({item, index}) => {
            return(
                <View style={styles.container}>
                    <View style={[styles.card,shadow.dark]}>
                        <View style={styles.imageBox}>
                            <Image source={{uri:item.image}} style={styles.image}/>
                        </View>
                        <View style={styles.titleBox}>
                            <Text style={styles.title}>{item.title}</Text>
                            <Text style={styles.resume}>{item.resume}</Text>
                            <TouchableOpacity
                            style={{flexDirection:'row',alignItems:'center',backgroundColor:colors.orange,width:"55%",height:"25%",borderRadius:20,paddingHorizontal:10}}
                                onPress={()=>{Alert.alert("No estas autorizado para revisar este material","Debes iniciar sesión para acceder a este contenido")}}
                            >
                                <View style={{borderRadius:15,backgroundColor:colors.white,width:"15%",height:"80%",alignItems:'center',justifyContent:'center'}}>
                                    <Icon name={'play'} type='ionicon' size={15} color="black" />
                                </View>
                                <Text style={styles.textButton}>Saber más</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )
        }}
        
    />
      <ScrollView>
        <View style={{height:100, backgroundColor:'rgb(0,0,0)'}}></View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  coverPhoto:{
    flex: 10,
    width:'100%',
    height:'100%',
    backgroundColor:'rgba(0,0,0,0.06',
    marginTop:0,
  },
  coverButton:{
    width:'90%',
    height:200,
    backgroundColor:'rgba(0,0,0,0.06',
    marginTop:20,
  },
  card: {
    width: CARD_WIDTH,
    marginHorizontal:10,
    height: CARD_HEIGHT + 20,
    borderRadius: sizes.radius,
    marginVertical: 10,
    //borderWidth:2,
    //backgroundColor: 'red',
    justifyContent:'center',
    alignItems:'center',
    shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 10,
      
  },
  imageBox: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT ,
    borderRadius: sizes.radius,
    overflow: 'hidden',
  },
  image: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT - 100,
    resizeMode: 'cover',
  },
  titleBox: {
    position: 'absolute',
    backgroundColor:'white',
    top: CARD_HEIGHT - 120,
    width:CARD_WIDTH,
    height:140,
    padding:10,
    borderBottomStartRadius:sizes.radius,
    borderBottomEndRadius:sizes.radius,
    
    //left: 16,
  },
  title: {
    fontSize: 20,
    //fontWeight: 'bold',
    color: colors.primary,
    fontFamily:'Poppins_600SemiBold',
  },
  resume: {
    fontSize: 12,
    color: colors.primary,
    marginBottom:5,
    fontFamily:'Poppins_500Medium',
  },
  textButton:{
    fontSize: 18,
    //backgroundColor:'black',
    //fontWeight: 'bold',
    paddingLeft:10,
    //bottom:5,
    color: colors.primary,
    fontFamily:'Poppins_600SemiBold',
  }
})

export default EmotionsNoLogin;