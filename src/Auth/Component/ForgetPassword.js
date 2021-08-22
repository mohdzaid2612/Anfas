import React from 'react'
import {
  View,
  Text,
  StyleSheet,
} from 'react-native'

import BackButton from '../../components/BackButton'
import Button from '../../components/Button'
import ErrorView from '../../components/ErrorView'
import Input from '../../components/Input'
import {
  widthScale,
  heightScale
} from '../../utils/dimensionHelper'

import Loader from '../../components/Loader'

const ForgetPassword = props => {
  const {
    onContinueClick,
    onBackPress,
    error,
    email,
    onTextChange,
    isLoading
  } = props
  return (
    <View style={styles.container}>
      <Loader
        isLoading={isLoading}
      />
      <BackButton
        onBackPress={onBackPress}
        containerStyle={{
          marginBottom: heightScale(20)
        }}
      />
      <Text style={styles.titleText}>Forget Password?</Text>
      <Text style={styles.infoText}>Enter the email address associated with your account.</Text>
      <Input
        placeholder="Email"
        val={email}
        name="email"
        onTextChange={onTextChange}
      />
      <ErrorView
        message={error}
      />
      <Button
        onPress={onContinueClick}
        buttonTitle="Continue"
        buttonStyle={styles.btnStyle}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: widthScale(20),
    backgroundColor: "#F6F3FF",
    flex:1,
  },
  titleText: {
    fontFamily: "HKGrotesk-Bold",
    fontSize: 23,
    fontWeight: "600",
    lineHeight: 29,
  },
  infoText: {
    fontFamily: "HKGrotesk-Regular",
    fontSize: 15,
    fontWeight: "600",
    lineHeight: 21,
    color: "#869cb5",
    marginVertical: widthScale(20)
  },
  btnStyle: {
    marginTop: widthScale(20)
  }
})

export default ForgetPassword