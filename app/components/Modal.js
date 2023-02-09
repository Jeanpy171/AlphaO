import { StyleSheet, Text, View,Modal } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { Dimensions } from 'react-native'
import {Poppins_400Regular,Poppins_700Bold,Poppins_800ExtraBold,Poppins_600SemiBold,Poppins_500Medium} from '@expo-google-fonts/poppins';
import { useFonts } from '@expo-google-fonts/dev';
import { StatusBar } from 'react-native'


const WIDTH = Dimensions.get('window').width;
const HEIGTH_MODAL = 160;
const CustomModal = ({isModalVisible,setIsModalVisible,ButtonName,onPress,title,text}) => {

    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_500Medium,
        Poppins_600SemiBold,
        Poppins_700Bold,
        Poppins_800ExtraBold
      });
    const SimpleModal = () => {
        return(<TouchableOpacity
            disabled={true}
            style={styles.modalContainer}
        >
            <View style={styles.modal}>
                <View style={styles.textView}>
                    <Text style={styles.text}>{title}</Text>
                    <Text style={styles.errorText}>{text}</Text>
                </View>
                <View style={styles.buttonsView}>
                    <TouchableOpacity 
                        style={styles.buttonLeft}
                        onPress={onPress}
                    >
                        <Text style={{fontFamily:'Poppins_600SemiBold',color:'blue'}}>{ButtonName}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.buttonRigth}
                        onPress={() => {changeModalVisible(false)
                        
                        }}
                    >
                        <Text style={{fontFamily:'Poppins_600SemiBold',color:'blue'}}>Revisar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>)
    }
  const changeModalVisible = (bool) => {
        setIsModalVisible(bool)
    }
    if (!fontsLoaded) {
        return null;
   } else {
  return (
    <SafeAreaView style={styles.container}>
        <Modal 
            transparent={true}
            //animationType='fade'
            animationType="fade"
            visible={isModalVisible}
            nRequestClose={() => {changeModalVisible(false)}}
        >
            <SimpleModal/>
        </Modal>
    </SafeAreaView>
  )
}
}

export default CustomModal

const styles = StyleSheet.create({
    modalContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'rgba(0, 0, 0, 0.4);'
        },
    modal:{
        height:HEIGTH_MODAL,
        width:WIDTH - 80,
        paddingTop:10,
        backgroundColor:'white',
        borderRadius:10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        
    },
    textView:{
        flex:1,
        alignItems:'center',
    },
    text:{
        fontSize:14,
        margin:5,
        fontFamily:'Poppins_600SemiBold',
        
    },
    errorText:{
        fontSize:13,
        margin:5,
        paddingHorizontal:10,
        fontFamily:'Poppins_800ExtraBold',
    },
    buttonsView:{
        width:'100%',
        flexDirection:'row',
        //backgroundColor:'red',
        borderBottomEndRadius:10,
        borderBottomStartRadius:10,
        //borderWidth:1,
    },
    buttonLeft:{
        flex:1,
        alignItems:'center',
        paddingVertical:10,
        borderWidth:0.5,
        //borderBottomEndRadius:10,
        borderBottomStartRadius:10,
    },
    buttonRigth:{
        flex:1,
        alignItems:'center',
        paddingVertical:10,
        borderWidth:0.5,
        borderBottomEndRadius:10,
        
        //borderBottomStartRadius:10,
    }
})