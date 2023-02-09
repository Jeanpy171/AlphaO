import React, { useState } from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {colors} from '../const/CONST';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Poppins_400Regular,Poppins_700Bold,Poppins_800ExtraBold,Poppins_600SemiBold,Poppins_500Medium} from '@expo-google-fonts/poppins';
import { useFonts } from '@expo-google-fonts/dev';
import Moment from 'moment';
import DateTimePickerModal from "react-native-modal-datetime-picker";



const DatePick = ({label,iconName,error,password,maxLength,keyboard,editable,getDate,setData,value = () => {},...props}) => {
  const [hidePassword, setHidePassword] = React.useState(password);
  const [isFocused, setIsFocused] = React.useState(false);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date,setDate]= useState(new Date());
  //const newDate = Moment(date).format("DD-MM-YYYY");
  //funcion(newDate);
  //setDate(date);
console.log("DATA VALUE-------------", date)
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    const newDate = Moment(date).format("YYYY-MM-DD");
    console.log("------------------- CAMBIANDO VALOR -----------------------")
    setData(true),
    getDate(newDate);
    //setData({...userInfo, birthdate:newDate})
    console.log("FECHA CORTADA: ",newDate)
    //console.warn("A date has been picked: ", date);
    hideDatePicker();
  };

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_800ExtraBold,
    Poppins_600SemiBold
  });

  if (!fontsLoaded) {
    return null;
  } else {
  return (
    <View style={{marginBottom: 10}}>
      <Text style={style.label}>{label}</Text>
      <View
        style={[
          style.inputContainer,
          {
            borderColor: error
              ? colors.red
              : isFocused
              ? colors.darkBlue
              : colors.light,
            alignItems: 'center',
            borderWidth: error
            ? 2 : 0,
          },
        ]}>
        <Icon
          name={iconName}
          style={{color: colors.blue, fontSize: 22, marginRight: 10}}
        />
        <TextInput
          autoCorrect={false}
          onPress
          onFocus={() => {
            //onFocus();
            setIsFocused(true);
          }}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={hidePassword}
          maxLength={maxLength}
          style={{color: colors.blue, flex: 1,fontFamily: 'Poppins_400Regular'}}
          {...props}
          keyboardType={keyboard}
          editable={editable}
          value={value}
        />
        <Icon name="calendar" size={24} color="black" type="font-awesome"
                  onPress={showDatePicker}
                  />
        <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode='date'
        //display="calendar"
        //onChange={() => setDate(date)}
        //date={new Date()}
        //timePickerModeAndroid={undefined}
        //onChange={setDate}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        maximumDate={new Date(2004, 12, 31)}
        minimumDate={new Date(1953, 12, 31)}
        //maximumDate={new Date()}
      />
      </View>
      {error && (
        <Text style={{marginTop: 7, color: colors.red, fontSize: 12, fontFamily:'Poppins_600SemiBold'}}>
          {error}
        </Text>
      )}
    </View>
    );
 };
}

const style = StyleSheet.create({
  label: {
    marginVertical: 2,
    fontSize: 14,
    color: colors.blue,
    //fontWeight:'bold',
    fontFamily: 'Poppins_500Medium'
  },
  inputContainer: {
    height: 55,
    backgroundColor: colors.light,
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderWidth: 0.5,
  },
});

export default DatePick;