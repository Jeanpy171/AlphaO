import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Image } from 'react-native'
import { sizes, spacing } from '../const/CONST'
import { Icon } from '@rneui/base'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import PowerDetailsCard from '../components/PowerDetailsCard'
import * as Animatable from 'react-native-animatable'

const PowersDetails = ({ navigation, route }) => {
  const { power } = route.params
  const insets = useSafeAreaInsets();
  return (
    <View style={styles.container}>
      <View style={[StyleSheet.absoluteFillObject, styles.imageBox]}>
        <Animatable.View style={[styles.backButton, { marginTop: insets.top }]} animation='fadeIn' delay={300} duration={400} easing='ease-in-out'>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name='arrowleft' type='ant-design' size={30} color={'white'} />
          </TouchableOpacity>
        </Animatable.View>
        <Image
          source={{ uri: power.image }}
          style={[StyleSheet.absoluteFillObject, styles.image]}
        />
        <PowerDetailsCard power={power} />
      </View>
    </View>
  )
}

export default PowersDetails

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBox: {
    borderRadius: sizes.radius,
    overflow: 'hidden'
  },
  image: {
    width: sizes.width,
    height: sizes.height + 20,
    resizeMode: 'cover'
  },
  backButton: {
    zIndex: 1,
    position: 'absolute',
    left: spacing.l
  }
});
