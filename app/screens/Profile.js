import { StyleSheet, Text, View, Dimensions, Image, } from 'react-native'
import React, { useContext, useEffect, } from 'react'
import { AuthContext } from '../../app/context/AuthContext'
import { BackgroundImage, Icon } from '@rneui/base'
import { Poppins_400Regular, Poppins_500Medium, Poppins_800ExtraBold, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import { useFonts } from '@expo-google-fonts/dev';
import { FAB, Divider } from "@rneui/themed";
import MainHeader from '../components/MainHeader';
import { colors, sizes } from '../const/CONST';


export const Profile = ({ navigation }) => {
  const { userInfo, avatar } = useContext(AuthContext)

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_800ExtraBold,
    Poppins_600SemiBold
  });

  const isLoggedIn = () => {
    console.log("\nINFORMACION DEL PERFIL\n")
    console.log(userInfo)
    console.log("\nINFO DEL AVATAR: ", avatar.url)
  }
  useEffect(() => {
  }, [])

  if (!fontsLoaded) {
    return null;
  } else {
    return (
      <View style={styles.container}>
        <MainHeader screen={"Mi Perfil"} name={'ios-menu-outline'} onPress={() => navigation.openDrawer()} />
        <View style={styles.headerContainer}>
          <BackgroundImage
            source={{ uri: avatar.url }}
            imageStyle={{ opacity: 0.8 }}
            style={styles.backgroundImage}
          >
          </BackgroundImage>
        </View>
        <View style={styles.mainInformation}>
          <Image
            source={{ uri: avatar.url }}
            style={styles.avatar}
          />
          <Text style={styles.title}>{userInfo ? userInfo.username : ''}</Text>
          <Text style={styles.subtitle}>{userInfo ? userInfo.email : ''}</Text>
        </View>
        <View style={{ flexDirection: 'row', width: '80%', justifyContent: 'space-between', alignItems: 'center', right: '7%', bottom: "43%" }}>
          <FAB
            style={styles.edit}
            visible={true}
            size='small'
            icon={<Icon name='expeditedssl' type='font-awesome' color={'white'} size={20} />}
            color={colors.orange}
            onPress={() => {
              console.log(userInfo)
              console.log(avatar)
              console.log("Navegando ----------------")
              navigation.navigate('UpdatePasswordScreen')
            }}
          />
          <FAB
            style={styles.edit}
            visible={true}
            size='small'
            icon={<Icon name='edit' type='font-awesome' color={'white'} size={20} />}
            color={colors.orange}
            onPress={() => {
              console.log(userInfo)
              console.log(avatar)
              console.log("Navegando ----------------")
              navigation.navigate('EditProfileScreen')
            }}
          />
        </View>

        <View style={styles.contentContainer}>
          <Divider width={1} style={{ marginVertical: 15 }} />
          <Text style={styles.items}>NOMBRE COMPLETO: </Text>
          <Text style={styles.subtitle}>{userInfo ? userInfo.first_name : ''} {userInfo ? userInfo.last_name : ''}</Text>
          <Text style={styles.items}>NÚMERO TELEFÓNICO: </Text>
          <Text style={styles.subtitle}>{userInfo ? userInfo.personal_phone : ''}</Text>
          <Text style={styles.items}>NÚMERO CONVENCIONAL: </Text>
          <Text style={styles.subtitle}>{userInfo ? userInfo.home_phone : ''}</Text>
          <Text style={styles.items}>DIRECCIÓN DOMICILIARIA: </Text>
          <Text style={styles.subtitle}>{userInfo ? userInfo.address : ''}</Text>
          <Text style={styles.items}>FECHA DE NACIMIENTO: </Text>
          <Text style={styles.subtitle}>{userInfo.birthdate ? userInfo.birthdate : 'Dato no ingresado'}</Text>

        </View>
      </View>
    )
  }
}

export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    flexDirection: 'column'
  },
  headerContainer: {
    width: sizes.width,
    height: sizes.height / 3,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  backgroundImage: {
    width: sizes.width,
    height: sizes.height / 3,
    aspectRatio: 3,
    resizeMode: 'contain',
  },
  contentContainer: {
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 120,
    width: sizes.width,
    height: sizes.height,
    bottom: '33%'
  },
  viewContainer: {
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    backgroundColor: 'red',
    paddingHorizontal: 15,
    width: sizes.width - 30,
    height: '60%',
  },
  mainInformation: {
    width: "100%",
    height: '20%',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: '14%',
    zIndex: 1,

  },
  edit: {
    left: "18.5%",
    bottom: "40%",
    zIndex: 2,
  },
  dataContainer: {
    backgroundColor: colors.red,
    borderRadius: 15,
    padding: 20,
    width: '100%',
    height: '100%'
  },

  avatar: {
    height: 115,
    width: 115,
    borderRadius: 15,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.40)',

  },
  information: {
    flexDirection: 'row',
    alignItems: 'center',
    width: sizes.width - 20,
    height: '13%',
    borderRadius: 15,
    marginTop: 10,
    shadowOpacity: 0.90,
    shadowRadius: 5,
    shadowColor: 'red',
    shadowOffset: { height: 0, width: 0 },
  },
  title: {
    fontSize: 22,
    marginRight: 10,
    textAlign: 'justify',
    fontFamily: 'Poppins_600SemiBold'
  },
  items: {
    fontSize: 17,
    marginRight: 10,
    textAlign: 'justify',
    fontFamily: 'Poppins_600SemiBold'
  },
  subtitle: {
    fontSize: 16,
    marginRight: 10,
    textAlign: 'justify',
    fontFamily: 'Poppins_400Regular',
    marginBottom: '1.5%',
  },

})