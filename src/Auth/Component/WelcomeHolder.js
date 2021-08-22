import React from 'react'
import {
  ImageBackground,
  View,
  StyleSheet,
  Text,
} from 'react-native'

import {
  widthScale,
  heightScale,
} from '../../utils/dimensionHelper'

import {
  getMainBackgroundColor,
  getBackgroundColor,
  getPatientReasonColor,
} from '../../utils/colorHelper'

import BackGroundImage from '../../assets/Auth/welcomeBackground.png'
import IconWelcome from '../../assets/Auth/welcomeLogo.svg'

import Button from '../../components/Button'

const WelcomeHolder = props => {
  const {
    onSignClicked,
    onLoginClicked,
  } = props
  return (
    <View style={styles.container}>
      <ImageBackground source={BackGroundImage} style={styles.image} resizeMode="stretch">
        <View style={styles.holderContainer}>
          <View>
            <IconWelcome
              width={100}
              height={100}
            />
            <Text style={styles.titletext}>Less of a hospital </Text>
            <Text style={[styles.titletext, {
              paddingTop: 0,
            }]}>more like a home</Text>
          </View>
          <View>
            <Button
              buttonTitle="Create a new account"
              buttonStyle={{
                backgroundColor: getBackgroundColor(),
                borderColor: getBackgroundColor(),
                paddingVertical: heightScale(10),
                marginBottom: heightScale(15)
              }}
              buttonTitleStyle={{
                fontSize: 16,
                fontFamily: "Roboto-Regular",
                fontWeight: "600",
                lineHeight: 20,
                color: getPatientReasonColor(),
              }}
              onPress={onSignClicked}
            />
            <Button
              buttonTitle="Login"
              buttonStyle={{
                backgroundColor: "transparent",
                borderColor: getBackgroundColor(),
                paddingVertical: heightScale(10),
                marginBottom: heightScale(15)
              }}
              buttonTitleStyle={{
                fontSize: 16,
                fontFamily: "Roboto-Regular",
                fontWeight: "500",
                lineHeight: 20,
                color: getBackgroundColor(),
              }}
              onPress={onLoginClicked}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  image: {
    flex: 1,
    paddingHorizontal: widthScale(20),
    paddingTop: heightScale(30),
  },
  titletext: {
    fontSize: 28,
    fontFamily: "Roboto-Regular",
    fontWeight: "700",
    lineHeight: 33,
    color: getBackgroundColor(),
    paddingTop: heightScale(30)
  },
  holderContainer: {
    flex: 1,
    justifyContent: "space-between",
    paddingBottom: heightScale(30)
  }
})

export default WelcomeHolder