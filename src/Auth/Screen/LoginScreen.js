import React, {useEffect, useState} from 'react';
import LoginHolder from '../Component/LoginHolder';
import {useDispatch, useSelector} from 'react-redux';

import {socialLogin, emailLogin, fetchUserPatients} from '../authAction';

import {AUTH_MODE} from '../../utils/constant';

import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';

import {isValidEmail} from '../../utils/dataHelper';

import {usePrevious} from '../../utils/usePreviousValue';
import AsyncStorage from '@react-native-community/async-storage';

const LoginScreen = props => {
  const {navigation} = props;

  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [messagingToken, setMessagingtoken] = useState('');

  const dispatch = useDispatch();
  const {
    user,
    isLoadingAuth,
    error,
    errorLoadingPatient,
    isLoadingPatient,
  } = useSelector(state => state.auth);

  const prevLoadingPatient = usePrevious(isLoadingPatient);

  const [form, setForm] = useState({
    email: '',
    password: '',
    notification_token: messagingToken,
  });

  const [errorForm, setErrorForm] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    if (!isLoadingAuth && !isEmpty(user)) {
      console.debug(user);
      const typeUser = get(user, 'role');
      console.debug(typeUser);
      if (typeUser === 'doctor') {
        navigation.navigate('MainDoctor');
      } else if (typeUser === 'patientuser') {
        dispatch(fetchUserPatients());
      }
    }
  }, [user, isLoadingAuth]);

  useEffect(() => {
    const fetchingMessagingToken = async () => {
      const value = await AsyncStorage.getItem('messagingToken');

      // value previously stored
      console.log('messagingToken', value);
      setMessagingtoken(value);
    };

    fetchingMessagingToken();
  }, []);
  useEffect(() => {
    console.debug(isLoadingPatient, errorLoadingPatient);
    if (
      isLoadingPatient === false &&
      prevLoadingPatient === true &&
      errorLoadingPatient === ''
    ) {
      navigation.navigate('MainPatient');
    }
  }, [isLoadingPatient, errorLoadingPatient]);

  const onGoogleModeClicked = () => {
    dispatch(socialLogin(AUTH_MODE.GOOGLE));
  };

  const onFBModeClicked = () => {
    dispatch(socialLogin(AUTH_MODE.FB));
  };

  const onPasswordEyeClicked = () => setSecureTextEntry(!secureTextEntry);

  const onRegisterClicked = () => {
    navigation.navigate('SignUp');
  };

  const onContinueClicked = () => {
    if (!validateForm()) return;
    dispatch(emailLogin(form));
  };

  const validateForm = () => {
    let isValid = true;
    let updatedErrorForm = {
      ...errorForm,
    };
    if (!form['email']) {
      updatedErrorForm = {
        ...updatedErrorForm,
        email: 'Please enter the email associated with the account',
      };
      isValid = false;
    } else if (form['email'] && !isValidEmail(form['email'])) {
      updatedErrorForm = {
        ...updatedErrorForm,
        email: 'Please enter the valid email',
      };
      isValid = false;
    }
    if (!form['password']) {
      updatedErrorForm = {
        ...updatedErrorForm,
        password: 'Please enter the password associated with the account',
      };
      isValid = false;
    }
    setErrorForm(updatedErrorForm);
    return isValid;
  };

  const onForgetPassword = () => {
    navigation.navigate('ForgetPassword');
  };

  const onTextChanged = (key, value) => {
    const updatedValue = {
      ...form,
      [key]: value,
    };
    let updatedErrorForm = {
      ...errorForm,
    };
    if (value && updatedErrorForm[[key]]) {
      updatedErrorForm = {
        [key]: '',
      };
    }
    setForm(updatedValue);
    setErrorForm(updatedErrorForm);
  };

  return (
    <LoginHolder
      error={error}
      onGoogleModeClicked={onGoogleModeClicked}
      onFBModeClicked={onFBModeClicked}
      onRegisterClicked={onRegisterClicked}
      onContinueClicked={onContinueClicked}
      onForgetPassword={onForgetPassword}
      onTextChanged={onTextChanged}
      form={form}
      errorForm={errorForm}
      isLoading={isLoadingAuth || isLoadingPatient}
      onPasswordEyeClicked={onPasswordEyeClicked}
      secureTextEntry={secureTextEntry}
    />
  );
};

export default LoginScreen;
