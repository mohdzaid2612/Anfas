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
  heightScale,
} from '../../utils/dimensionHelper'
import Loader from '../../components/Loader'

import {
   getButtonBackGround
} from '../../utils/colorHelper'

const VerifyOTPHolder = props => {
  const {
    onContinueClick,
    onBackPress,
    error,
    email,
    onTextChange,
    otp,
    isLoading,
    onResendOTP
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
      <Text style={styles.titleText}>Verify OTP?</Text>
      <Text style={styles.infoText}>{`Enter the otp received in the ${email}.`}</Text>
      <Input
        placeholder="OTP"
        val={otp}
        name="otp"
        onTextChange={onTextChange}
      />
      <View style={styles.resendContainer}>
        <Text style={styles.registerNowText} onPress={onResendOTP}>Resend OTP</Text>
      </View>
      <ErrorView
        message={error}
      />
      <Button
        onPress={onContinueClick}
        buttonTitle="Verify"
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
  },
  registerNowText: {
    fontFamily: "HKGrotesk-Regular",
    fontSize: 14,
    lineHeight: 16,
    color: getButtonBackGround(),
    fontWeight: "400",
  },
  resendContainer: {
    alignItems: "flex-end",
    marginTop: widthScale(12)
  }
})

export default VerifyOTPHolder