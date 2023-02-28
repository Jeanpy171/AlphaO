import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

export const colors = {
    white: '#fff',
    black: '#000',
    //blue: '#5D5FEE',
    orange:'#FCBB6B',
    grey: '#BABBC3',
    light: '#F3F4FB',
    darkBlue: '#7978B5',
    red: '#FC6B6B',
    blue: "#33576f",
    greyInput:"#D9D9D9"
};

export const shadow = {
  light: {
    shadowColor: colors.black,
    shadowRadius: 4,
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  dark: {
    shadowColor: colors.black,
    shadowRadius: 4,
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
};

export const sizes = {
  width,
  height,
  title: 32,
  h2: 24,
  h3: 18,
  body: 13,
  radius: 16,
};

export const spacing = {
  s: 8,
  m: 18,
  l: 24,
  xl: 40,
};

export const urlApiAlphaO = 'https://alphaofin.herokuapp.com';