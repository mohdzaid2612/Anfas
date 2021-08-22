import React, {useEffect} from 'react';
import {Text, View, StyleSheet, ScrollView, Image} from 'react-native';

import {
  widthScale,
  heightScale,
  ratioWidth,
  ratioHeight,
} from '../../utils/dimensionHelper';

import Input from '../../components/Input';
import Button from '../../components/Button';
import SocialLogin from './SocialMode';
import ErrorView from '../../components/ErrorView';
import Loader from '../../components/Loader';

import IconPasswordEye from '../../assets/Auth/passwordeye.svg';
import IconPassword from '../../assets/Auth/eye_ic.svg';
import SignInIcon from '../../assets/Auth/signbanner/ic_banner_signin.png';
import AsyncStorage from '@react-native-community/async-storage';

const LoginHolder = props => {
  const {
    onGoogleModeClicked,
    onFBModeClicked,
    onRegisterClicked,
    onContinueClicked,
    error,
    onForgetPassword,
    onTextChanged,
    form,
    errorForm,
    isLoading,
    secureTextEntry,
    onPasswordEyeClicked,
  } = props;

  return (
    <View style={styles.container}>
      <View
        style={{
          width: '100%',
          marginTop: '1%',
          height: 50,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'absolute',
          top: 20,
          left: 20,
        }}>
        <Image
          source={require('../../assets/logo.png')}
          style={{width: 60, height: 60, resizeMode: 'contain'}}
        />
      </View>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <Loader isLoading={isLoading} />
        <View style={{marginTop: '40%'}}>
          {/* <Image
            source={SignInIcon}
            style={{
              width: '100%',
            }}
          /> */}
          <View style={styles.loginHolder}>
            <ErrorView message={error} />
            <Text style={styles.signInText}>Less of a hospital</Text>
            <Text style={styles.signInText}>more like a home...</Text>
            <View
              style={{
                // flex: 1,
                marginTop: 20,
              }}>
              <Text
                style={{
                  fontWeight: '100',
                  color: '#000',
                  fontFamily: 'HKGrotesk-Bold',
                  // transform: [{translateY: 10}, {translateX: 10}],
                  zIndex: 999,
                  fontSize: 14,
                }}>
                Email
              </Text>
              <Input
                name="email"
                val={form['email']}
                onTextChange={onTextChanged}
                error={errorForm['email']}
                // placeholder="Enter your email here!"
                containerStyle={{
                  paddingBottom: heightScale(20),
                }}
              />
              <Text
                style={{
                  // fontWeight: 'bold',
                  color: '#000',
                  fontFamily: 'HKGrotesk-Bold',
                  // transform: [{translateY: 10}, {translateX: 10}],
                  zIndex: 999,
                  fontSize: 14,
                }}>
                Password
              </Text>
              <Input
                name="password"
                val={form['password']}
                onTextChange={onTextChanged}
                error={errorForm['password']}
                // placeholder="Enter your password here!"
                secureTextEntry={secureTextEntry}
                iconRight={<IconPassword width={20} height={20} />}
                containerStyle={{
                  paddingBottom: heightScale(20),
                }}
                onIconPress={onPasswordEyeClicked}
              />
              <View style={styles.forgetPasswordContainer}>
                <Text
                  style={styles.forgetPasswordText}
                  onPress={onForgetPassword}>
                  Forget Password ?
                </Text>
              </View>
              <Button onPress={onContinueClicked} buttonTitle="Continue" />
              <View style={styles.socialContainer}>
                <Text style={styles.dontHaveAccount}>
                  Don't have an account?{' '}
                  <Text
                    onPress={onRegisterClicked}
                    style={styles.createAccountText}>
                    Create Account
                  </Text>
                </Text>
                <Text style={styles.orText}>Or sign in with</Text>
                <SocialLogin
                  onFBModeClicked={onFBModeClicked}
                  onGoogleModeClicked={onGoogleModeClicked}
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInText: {
    fontFamily: 'HKGrotesk-Bold',
    color: 'rgba(0, 17, 51, 1)',
    fontSize: 30,
  },
  loginHolder: {
    paddingHorizontal: widthScale(20),
    // flex: 1,
  },
  forgetPasswordContainer: {
    alignItems: 'flex-end',
    paddingBottom: heightScale(30),
  },
  forgetPasswordText: {
    fontFamily: 'HKGrotesk-Regular',
    color: 'rgba(153, 153, 153, 1)',
    fontSize: 12,
    lineHeight: 14,
  },
  dontHaveAccount: {
    fontFamily: 'HKGrotesk-Regular',
    color: '#999999',
    fontSize: 13,
    lineHeight: 16,
    paddingBottom: heightScale(20),
  },
  createAccountText: {
    fontFamily: 'HKGrotesk-Bold',
    color: '#5451FF',
    fontSize: 13,
    lineHeight: 16,
  },
  socialContainer: {
    alignItems: 'center',
    paddingTop: heightScale(20),
  },
  orText: {
    fontFamily: 'HKGrotesk-Regular',
    color: 'rgba(153, 153, 153, 1)',
    fontSize: 12,
    lineHeight: 14,
    paddingBottom: heightScale(20),
  },
});

export default LoginHolder;
