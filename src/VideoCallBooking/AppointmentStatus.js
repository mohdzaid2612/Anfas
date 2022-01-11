import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  TextInput,
  Keyboard,
  Image,
} from 'react-native';
import Loader from '../components/Loader';
import BackIcon from '../components/BackButton';
import {useNavigation} from 'react-navigation-hooks';
import {heightScale, widthScale} from '../utils/dimensionHelper';
import Button from '../components/Button';
import {
  getBackgroundColor,
  getButtonBackGround,
  getButtonTextColor,
} from '../utils/colorHelper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';

import store from '../Store';
import {URL} from '../utils/constant';
import moment from 'moment';

const AppointmentStatus = props => {
  const navigation = useNavigation();
  var status = props.navigation.getParam('status');
  var patientname = props.navigation.getParam('patientName');
  console.log(status);
  const [dt, setDt] = useState('');

  useEffect(() => {
    const getAppointmentDetails = async () => {
      const values = await AsyncStorage.getItem('VideoCallAppointment');

      const appointment_details = JSON.parse(values);
      setDt(`${appointment_details?.date} ${appointment_details?.time}`);
    };
    getAppointmentDetails();
  }, []);

  const renderStatusImage = () => {
    return (
      <View style={styles.innerContainer}>
        <View style={styles.insideContainer}>
          <View style={styles.statusImage}>
            {status == 0 ? (
              <Image
                source={require('../assets/VideoCall/pending.png')}
                style={{width: 84, height: 84, resizeMode: 'contain'}}
              />
            ) : (
              <Image
                source={require('../assets/VideoCall/confirm.png')}
                style={{width: 84, height: 84, resizeMode: 'contain'}}
              />
            )}
          </View>
        </View>
      </View>
    );
  };

  const renderStatusText = () => {
    return (
      <View style={styles.innerContainer}>
        <View style={styles.insideContainer}>
          <View style={styles.statusText}>
            <Text style={styles.headingText}>
              {status == 0
                ? 'Your appointment is in processing'
                : 'Appointment booked successsfully'}
            </Text>
            <Text style={styles.headingPara}>
              {status == 0
                ? 'A confirmation will be sent to your registered email and phone number after we confirm the transection.'
                : 'A confirmation has been sent to your registered email and phone number'}
              number
            </Text>
          </View>
          <View style={styles.statusText}>
            <View style={styles.bookingContainer}>
              <Text
                style={{
                  fontFamily: 'HKGrotesk-Bold',
                  color: '#09b8b8',
                  fontSize: 16,
                }}>
                {moment(props.navigation.getParam('appointmentDate')).format(
                  'YYYY-MM-DD hh:mm A',
                )}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const patientInfo = () => {
    return (
      <View style={styles.innerContainer}>
        <View style={styles.insideContainer}>
          <View style={styles.patientCard}>
            <Text style={{fontFamily: 'HKGrotesk-Medium', color: '#A9B1C2'}}>
              Patient
            </Text>
            <View style={styles.patientProfile}>
              <View style={styles.patientImage}>
                <Image
                  source={require('../assets/VideoCall/user.png')}
                  style={{width: 48, height: 48, resizeMode: 'contain'}}
                />
              </View>
              <View style={styles.patientName}>
                <Text style={styles.name}>
                  {props.navigation.getParam('patientName')}
                </Text>
                {/* <Text style={styles.reason}>For home care visit</Text> */}
              </View>
            </View>
            <View style={styles.patientAddress}>
              <View style={styles.markerContainer}>
                <Image
                  source={require('../assets/VideoCall/marker.png')}
                  style={{width: 14, height: 17, resizeMode: 'contain'}}
                />
              </View>
              <View style={styles.address}>
                <Text style={{fontFamily: 'Roboto-Medium', fontSize: 16}}>
                  Address
                </Text>
                <Text
                  style={{
                    fontFamily: 'Roboto-Regular',
                    fontSize: 14,
                    color: '#4B5879',
                    marginTop: 5,
                  }}>
                  {props.navigation.getParam('patientAddress')}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const startVideoCall = async () => {
    const token = store.getState().auth ? store.getState().auth.token : '';
    console.warn('videoCallToken', token);
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${token}`);
    myHeaders.append('Content-Type', 'application/json');

    console.log('doctorId', props.navigation.getParam('doctorId'));
    var raw = JSON.stringify({
      callto: props.navigation.getParam('doctorId'),
    });
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };
    // setLoader(true);
    fetch(URL.videoCall, requestOptions)
      .then(response => response.json())
      .then(result => {
        // setApikey(result?.key);
        // setSessionid(result?.session_id);
        // setToken(result?.token);
        // setLoader(false);
        console.warn('SessionId', result?.session_id);
        navigation.navigate('VideoCall', {
          apiKey: result?.key,
          sessionID: result?.session_id,
          token: result?.token,
        });
      })
      .catch(error => console.log('error', error));
  };

  return (
    <View style={styles.container}>
      <Loader isLoading={false} />
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 30,
          marginTop: '5%',
        }}>
        {renderStatusImage()}
        {renderStatusText()}
        {patientInfo()}
      </ScrollView>
      <View style={styles.buttonContainer}>
        {status == 0 ? null : (
          <TouchableOpacity
            disabled={
              moment(props.navigation.getParam('appointmentDate')).format(
                'YYYY-MM-DD',
              ) == moment(new Date()).format('YYYY-MM-DD')
                ? false
                : true
            }
            onPress={startVideoCall}
            style={[
              styles.button,
              {
                marginBottom: '3%',
                backgroundColor:
                  moment(props.navigation.getParam('appointmentDate')).format(
                    'YYYY-MM-DD',
                  ) == moment(new Date()).format('YYYY-MM-DD')
                    ? '#E5FCFC'
                    : 'silver',
                flexDirection: 'row',
                alignItems: 'center',
              },
            ]}>
            <MaterialCommunityIcons
              name="video-vintage"
              style={{
                fontSize: 18,
                marginRight: 5,
                color:
                  moment(props.navigation.getParam('appointmentDate')).format(
                    'YYYY-MM-DD',
                  ) == moment(new Date()).format('YYYY-MM-DD')
                    ? getButtonBackGround()
                    : '#fff',
              }}
            />
            <Text
              style={[
                styles.buttonText,
                {
                  color:
                    moment(props.navigation.getParam('appointmentDate')).format(
                      'YYYY-MM-DD',
                    ) == moment(new Date()).format('YYYY-MM-DD')
                      ? getButtonBackGround()
                      : '#fff',
                },
              ]}>
              Start Video Call
            </Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Home')}>
          <Text style={styles.buttonText}>Back to home</Text>
        </TouchableOpacity>
      </View>
      {/* {isKeyboardVisible || showPicker ? null : renderButton()} */}
    </View>
  );
};

export default AppointmentStatus;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  innerContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  insideContainer: {
    width: '90%',
  },
  statusImage: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '10%',
  },
  statusText: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '5%',
  },
  headingText: {
    // fontFamily: 'Roboto-Bold',
    fontFamily: 'HKGrotesk-Bold',
    fontSize: 20,
    textAlign: 'center',
  },
  headingPara: {
    fontFamily: 'HKGrotesk-Regular',
    color: '#4B5879',
    marginTop: '4%',
    width: '80%',
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 16,
  },

  bookingContainer: {
    backgroundColor: '#e6f8f8',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },

  patientCard: {
    width: '100%',
    marginTop: '10%',
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderRadius: 12,
    borderColor: '#ECECFB',
  },
  patientProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '2%',
    borderBottomWidth: 0.5,
    paddingBottom: 15,
    borderColor: '#ddd',
  },
  patientImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 0.5,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  patientName: {
    marginLeft: 10,
  },
  name: {
    fontFamily: 'HKGrotesk-Bold',
    fontSize: 16,
  },
  reason: {
    fontFamily: 'HKGrotesk-Regular',
    color: '#4B5879',
  },

  patientAddress: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '4%',
  },
  markerContainer: {
    width: 16,
    height: 16,
    borderRadius: 15,
  },
  address: {
    marginLeft: 10,
  },

  buttonContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '5%',
  },
  button: {
    paddingHorizontal: 5,
    paddingVertical: heightScale(12),
    width: '90%',
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: getButtonBackGround(),
    borderColor: getButtonBackGround(),
    borderRadius: 15,
  },
  buttonText: {
    color: getButtonTextColor(),
    fontFamily: 'HKGrotesk-Bold',
    fontSize: 14,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
