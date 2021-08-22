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
import Loader from '../../components/Loader'
import {
  widthScale,
  heightScale
} from '../../utils/dimensionHelper'

const ResetPasswordHolder = props => {
  const {
    onContinueClick,
    onBackPress,
    error,
    onTextChange,
    form,
    errorForm,
    isLoading,
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
      <Text style={styles.titleText}>Reset Password</Text>
      <Input
        placeholder="New Password"
        val={form["newPassword"]}
        name="newPassword"
        onTextChange={onTextChange}
        error={errorForm["newPassword"]}
        containerStyle={{
          marginVertical: heightScale(10),
        }}
      />
      <Input
        placeholder="Confirm Password"
        val={form["confirmPassword"]}
        name="confirmPassword"
        onTextChange={onTextChange}
        error={errorForm["confirmPassword"]}
        containerStyle={{
          marginVertical: heightScale(10),
        }}
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

export default ResetPasswordHolder