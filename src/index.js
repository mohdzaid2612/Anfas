import React, {useEffect} from 'react';
import {Alert, SafeAreaView} from 'react-native';

import SplashScreen from 'react-native-splash-screen';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

import {Provider} from 'react-redux';
import store from './Store';

import AppNavigator from './Navigation/AppNavigation';
import NavigationService from './utils/NavigationService';

import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-community/async-storage';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
    GoogleSignin.configure({
      webClientId:
        '342338604003-jcp2o78gbbl98slo540b31d0k84po87u.apps.googleusercontent.com',
      offlineAccess: true,
    });
  }, []);

  useEffect(() => {
    messaging()
      .requestPermission()
      .then(authStatus => {
        console.log('APNs Status :', authStatus);

        if (
          authStatus == messaging.AuthorizationStatus.AUTHORIZED ||
          messaging.AuthorizationStatus.PROVISIONAL
        ) {
          messaging()
            .getToken()
            .then(token => {
              console.log('messaging token :', token);
              AsyncStorage.setItem('messagingToken', token);
            });

          messaging().onTokenRefresh(token => {
            console.log('messaging onTokenRefresh', token);
          });

          messaging().onMessage(async remoteMessage => {
            console.log('A new Message arrived', remoteMessage);
            Alert.alert(
              remoteMessage.notification.title,
              remoteMessage.notification.body,
            );
          });
        }
      })
      .catch(err => {
        console.log('messaging permission error :', err);
      });
  }, []);

  return (
    <Provider store={store}>
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <AppNavigator
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
      </SafeAreaView>
    </Provider>
  );
};

export default App;
