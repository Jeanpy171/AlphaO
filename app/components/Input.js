import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Poppins_400Regular,Poppins_700Bold,Poppins_800ExtraBold,Poppins_600SemiBold,Poppins_500Medium} from '@expo-google-fonts/poppins';
import { useFonts } from '@expo-google-fonts/dev';
import { colors } from '../const/CONST';



const Input = ({label,iconName,error,password,maxLength,keyboard,editable,value = () => {},...props}) => {
  const [hidePassword, setHidePassword] = React.useState(password);
  const [isFocused, setIsFocused] = React.useState(false);

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
        {password && (
          <Icon
            onPress={() => setHidePassword(!hidePassword)}
            name={hidePassword ? 'eye-outline' : 'eye-off-outline'}
            style={{color: colors.blue, fontSize: 22}}
          />
        )}
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

export default Input;