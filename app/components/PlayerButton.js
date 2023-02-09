import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import color from '../misc/color';
import { Image } from 'react-native';
import { TouchableOpacity } from 'react-native';

 export const PlayerButton = ({variation,onPress}) => {

  const PAUSE = require('../../assets/icon/pause.png');
  const PLAY = require('../../assets/icon/play.png');
  const NEXT = require('../../assets/icon/next.png');
  const PREV = require('../../assets/icon/prev.png');
  //const { iconType, size = 40, iconColor = color.FONT, onPress } = props;

    switch (variation) {
      case 'PLAY':
        return <TouchableOpacity onPress={onPress}>
                 <Image source={PLAY} style={{width:30,height:30,marginHorizontal:5}}/>
               </TouchableOpacity>;
      case 'PAUSE':
        return <TouchableOpacity onPress={onPress}>
                  <Image source={PAUSE} style={{width:30,height:30,marginHorizontal:5}}/>
                </TouchableOpacity>;
      case 'NEXT':
        return <TouchableOpacity onPress={onPress}>
                <Image source={NEXT} style={{width:25,height:25,marginHorizontal:5}}/>
                </TouchableOpacity>;
      case 'PREV':
        return <TouchableOpacity onPress={onPress}>
                <Image source={PREV} style={{width:25,height:25,marginHorizontal:5}}/>
                </TouchableOpacity>;
    
  };
  /*return (
    <AntDesign
      {...props}
      onPress={onPress}
      name={getIconName(iconType)}
      size={size}
      color={iconColor}
    />
  );*/
};

export default PlayerButton;
