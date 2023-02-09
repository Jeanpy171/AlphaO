import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Image } from 'react-native'
import { Dimensions } from 'react-native'
import { FlatList } from 'react-native'
import { Animated } from 'react-native'
import { Button, Icon } from '@rneui/base'
import { TouchableOpacity } from 'react-native'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { sizes } from '../const/CONST'
import LoaderAnimation from './LoaderAnimation'



const CarouselItem = ({item,ref}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.cardView}>
      <TouchableOpacity onPress={() => {
        if(item.tipo == 'publicidad'){
          navigation.navigate("newsScreen")
        }else{
          navigation.navigate("eventsScreen")
        }
      }
        } >
        <Image style={styles.image} source={{uri:item.imagen}}/>
      </TouchableOpacity>
    </View>
  )
}

const Carousel = ({data}) => {
  const token = AsyncStorage.getItem('token');
  const [banner,setBanner] = useState([]);
  const [refresh,setRefresh] = useState(false);
  const [showAnimation,setShowAnimation] = useState(false);
  
  const getBannerPhotos = async () => {
    setShowAnimation(true)
      try {
          console.log("Recopilando fotos de banner")
          const response = await axios.get(
              'https://alphaofinal.herokuapp.com/api/alpha/banner/total',
              { headers: { 'accept': 'application/json', 'authorization': await token } }
          );
          console.log(response.data.data.banners);
          const res = [];
          //res.push(response.data.data.banners)
          setBanner(response.data.data.banners)
          setShowAnimation(false)
          setRefresh(true)
      } catch (e) {
      console.log(e)
      setShowAnimation(false)
      alert("Error al cargar las imagenes del banner");
      }
  }

  useEffect(() => {
    getBannerPhotos()
      console.log("IMAGENES CARGADAS CARGADAS: ",banner)
  },[refresh])

  let scrollX = new Animated.Value(0)
  let position = Animated.divide(scrollX,sizes.width)

  const [dataList,setDataList] = useState(data)

  /*useEffect(() => {
    setDataList(data)
    //infiniteScroll(dataList)
  },[])*/

  const flatListRef = useRef(null)
  const infiniteScroll = (dataList) => {
    let index=0;
    const totalIndex = dataList.length - 1;
  
    setInterval(() => {
      index++;
        if(index < totalIndex) {
            flatListRef.current.scrollToIndex({animated: true, index: index})
        } else {
            flatListRef.current.scrollToIndex({animated: true, index: 0})
        }
      },3000)
    }
  if(data&&data.length){
    return (
      <View>
        <LoaderAnimation visible={showAnimation}/>
        <FlatList data={banner}
          keyExtractor = {(item,index) => index}
          //ref = {flatListRef}
          horizontal
          pagingEnabled
          scrollEnabled
          snapToAlignment='center'
          scrollEventThrottle={16}
          decelerationRate = {"fast"}
          showsHorizontalScrollIndicator={false}
          renderItem = {({item,index}) => {
            return <CarouselItem item={item} ref={flatListRef.current}/>
            }
          }
          onScroll={Animated.event([{ nativeEvent: { contentOffset :{ x: scrollX}}}], {useNativeDriver: false})}
        />

        <View style={styles.dotView}>
          <View style={{backgroundColor:'rgba(248, 248, 255,0.8)',borderRadius:15,flexDirection:'row',}}>
          {banner.map((_,i) =>{
            let opacity = position.interpolate({
              inputRange: [i - 1, i, i + 1],
              outputRange: [0.3, 1, 0.3],
              extrapolate: "clamp"
            })
            return (
                  <Animated.View
                  key = {i}
                  style = {{opacity, height:10,width:10, margin:8, borderRadius:5,backgroundColor:"#595959"}}
                  />
            )
          })}
        </View>
        </View>
      </View>
    )
  }
}

export default Carousel

const styles = StyleSheet.create({
  cardView:{
    flex:1,
    width:sizes.width,
    height:sizes.height/3,
    backgroundColor:"white",
    marginTop:10,
    alignItems:'center',
      shadowColor: "#000",
        shadowOffset: {
            width: 0.5,
            height: 0.5,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        elevation: 5,
        zIndex:0
  },
  textView:{
    position:"absolute",
    bottom:30,
    //margin:20,
    marginLeft:30,
    left:5
  },
  image:{
    width:sizes.width,
    height:sizes.height/3,
    resizeMode:'stretch',
    zIndex:0
  },
  itemTitle:{
    color:"white",
    fontSize:22,
    shadowColor: "#000",
    shadowOffset: {
        width: 0.8,
        height: 0.8,
      },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 5,
  },
  itemDescription:{
    color:"white",
    fontSize:12,
    shadowColor: "#000",
    shadowOffset: {
        width: 0.8,
        height: 0.8,
      },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 5,
  },
  dotView:{
    bottom:30,
    flexDirection:'row',
    //backgroundColor:'red',
    justifyContent:'center'
  }
})