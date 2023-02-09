import React from 'react';
import {
  useWindowDimensions,
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Dimensions
} from 'react-native';
import { sizes,colors, } from '../const/CONST';
const Loader = ({visible = false, text=""}) => {
  const {width, height} = useWindowDimensions();
  return (
    visible && (
      <View style={[style.container, {height, width}]}>
        <View style={style.loader}>
          <ActivityIndicator size="large" color={colors.blue} />
          <Text style={{marginLeft: 10, fontSize: 16}}>{text}</Text>
        </View>
      </View>
    )
  );
};

const style = StyleSheet.create({
  loader: {
    height: 70,
    backgroundColor: colors.white,
    marginHorizontal: 50,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    zIndex:10,
  },
  container: {
    position: 'absolute',
    //zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    width: sizes.width,
    height: sizes.height,
    zIndex: 13,
    //zIndex:3,
  },
});

export default Loader;