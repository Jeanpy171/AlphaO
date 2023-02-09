import React, { useContext, useMemo } from 'react';
import { View, StyleSheet, StatusBar,Text } from 'react-native';
import color from '../misc/color';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import AudioProvider, { AudioContext } from '../context/AudioProvider';
import { AuthContext } from '../context/AuthContext';
const Screen = ({ children,rowRenderer }) => {
  const snapPoints = useMemo( () => ['30%','80%'],[])
  const {audioFiles} = useContext(AudioContext)
  const renderSingleMusic = () => {
    return (
      <>
        {children}
      </>
      
    );
  };
  return (
    <View style={styles.container}>
      {children}
    </View>
      
    )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.APP_BG,
    paddingTop: StatusBar.currentHeight,
  },
});

export default Screen;
