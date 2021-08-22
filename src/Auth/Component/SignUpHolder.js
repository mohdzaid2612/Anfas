import React from 'react'
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
} from 'react-native'

import CountryPicker from 'react-native-country-picker-modal'

import {
  widthScale,
  heightScale,
} from '../../utils/dimensionHelper'

import {
  getPrimaryTextColor,
  getLoginTextColor,
  getForgotPasswordColor,
  getTextFieldBorderColor,
} from '../../utils/colorHelper'

import Input from '../../components/Input'
import Button from '../../components/Button'
import BackButton from '../../components/BackButton'
import ErrorView from '../../components/ErrorView'
import Loader from '../../components/Loader'

const SignUpHolder = props => {
  const {
    onRegisterClicked,
    onCreateAccountClicked,
    onBackPress,
    form,
    errorForm,
    onTextChanged,
    error,
    isLoading,
    showBackIcon
  } = props

  const onCountryChange = country => {
    onTextChanged("country", country)
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Loader
        isLoading={isLoading}
      />
      <View>
        {showBackIcon && (<BackButton
          onBackPress={onBackPress}
          containerStyle={{
            marginBottom: heightScale(20)
          }}
        />)}
        <ErrorView
          message={error}
        />
        <Text style={styles.welcomeBackTextStyle}>Create new account</Text>
        <Text style={styles.enterYourLoginTextStyle}>Create an account on Anfas</Text>
        <View>
          <Input
            placeholder="First name"
            placeholderTextColor={getLoginTextColor()}
            containerStyle={{
              marginTop: heightScale(20),
              marginBottom: heightScale(12)
            }}
            val={form["firstName"]}
            name="firstName"
            onTextChange={onTextChanged}
            error={errorForm["firstName"]}
          />
          <Input
            placeholder="Last Name"
            placeholderTextColor={getLoginTextColor()}
            containerStyle={{
              marginBottom: heightScale(12)
            }}
            val={form["lastName"]}
            name="lastName"
            onTextChange={onTextChanged}
            error={errorForm["lastName"]}
          />
          <Input
            placeholder="Email address"
            placeholderTextColor={getLoginTextColor()}
            containerStyle={{
              marginBottom: heightScale(12)
            }}
            val={form["email"]}
            name="email"
            onTextChange={onTextChanged}
            error={errorForm["email"]}
          />
          <View style={styles.phoneNumberContainer}>
            <CountryPicker
              withCallingCodeButton={true}
              onSelect={onCountryChange}
              countryCode={form["country"].cca2}
              withAlphaFilter={true}
              withFilter={true}
              containerButtonStyle={[styles.inputContainer, {
                paddingVertical: widthScale(10)
              }]}
            />
            <Input
              bodyContainerStyle={styles.inputContainer}
              placeholder="Enter your phone number"
              keyboardType="number-pad"
              val={form["phoneNumber"]}
              name="phoneNumber"
              onTextChange={onTextChanged}
              error={errorForm["phoneNumber"]}
              containerStyle={{
                flex:1,
                marginLeft: widthScale(10)
              }}
              placeholderTextColor={getLoginTextColor()}
            />
        </View> 
          <Input
            placeholder="Password"
            placeholderTextColor={getLoginTextColor()}
            containerStyle={{
              marginBottom: heightScale(4)
            }}
            val={form["password"]}
            name="password"
            onTextChange={onTextChanged}
            error={errorForm["password"]}
          />
          <Text style={styles.infoPassword}>Your password needs to be at least 8 characters. Include multiple words and phrases to make it more secure.</Text>
        </View>
        <Button
          onPress={onCreateAccountClicked}
          buttonTitle="Create account"
          buttonStyle={styles.btnStyle}
        />
        <Text
          onPress={onRegisterClicked}
          style={styles.registerText}
        >
          Already have an account?<Text style={styles.registerNowText}> Login now</Text>
        </Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: widthScale(24),
    paddingVertical: heightScale(24),
    backgroundColor: "#F6F3FF",
    flex:1
  },
  welcomeBackTextStyle: {
    fontFamily: "HKGrotesk-Bold",
    fontSize: 24,
    lineHeight: 24,
    color: getPrimaryTextColor(),
    fontWeight: "600",
    marginBottom: heightScale(10)
  },
  enterYourLoginTextStyle: {
    fontFamily: "HKGrotesk-Regular",
    fontSize: 14,
    lineHeight: 16,
    color: getLoginTextColor(),
    fontWeight: "400"
  },
  forgotPasswordText: {
    color: getForgotPasswordColor(),
    fontFamily: "HKGrotesk-Regular",
    fontSize: 12,
    lineHeight: 16,
  },
  forgotPasswordTextContainer: {
    alignItems: "flex-end"
  },
  btnStyle: {
    marginTop: heightScale(32),
    paddingVertical: heightScale(12)
  },
  registerText: {
    fontFamily: "HKGrotesk-Regular",
    fontSize: 14,
    lineHeight: 16,
    color: getLoginTextColor(),
    fontWeight: "400",
    marginTop: widthScale(30),
  },
  registerNowText: {
    fontFamily: "HKGrotesk-Regular",
    fontSize: 14,
    lineHeight: 16,
    color: "#5451FF",
    fontWeight: "400",
  },
  infoPassword: {
    fontFamily: "HKGrotesk-Regular",
    fontSize: 10,
    lineHeight: 12,
    color: getLoginTextColor(),
    marginBottom: heightScale(20)
  },
  phoneNumberContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: getTextFieldBorderColor(),
    marginBottom: heightScale(12),
    paddingHorizontal: widthScale(16),
  },
  inputContainer: {
    borderWidth: 0,
  },
})

export default SignUpHolder