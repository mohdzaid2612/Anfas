import React, {useState, useEffect} from 'react';
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
  ActivityIndicator,
} from 'react-native';
import Loader from '../components/Loader';
import {
  getPatientHistoryPhoneNumberCardBorderColor,
  getBackgroundColor,
  getTextFieldBorderColor,
  getButtonBackGround,
} from '../utils/colorHelper';

import {heightScale, widthScale} from '../utils/dimensionHelper';
import Button from '../components/Button';

import BackIcon from '../components/BackButton';
import LeftIcon from '../assets/Booking/leftArrow.svg';
import RightIcon from '../assets/Booking/rightArrow.svg';
import IconCalender from '../assets/AddPatient/ic_calender.svg';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {useNavigation} from 'react-navigation-hooks';
import ErrorView from '../components/ErrorView';

import DatePicker from 'react-native-date-picker';
import {Calendar} from 'react-native-calendars';
import moment from 'moment';
import Input from '../components/Input';
import AsyncStorage from '@react-native-community/async-storage';
import store from '../Store';
import {URL} from '../utils/constant';

const PaymentDetails = ({route}) => {
  const navigation = useNavigation();
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [focus, setFocus] = useState(false);
  const [loader, setLoader] = useState(false);

  const [description, setDescription] = useState('');
  const [dt, setDt] = useState('');
  const [docid, setDocid] = useState('');
  const [uniqueid, setUniqueid] = useState('');

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, [isKeyboardVisible]);

  useEffect(() => {
    const getAppointmentDetails = async () => {
      const docId = await AsyncStorage.getItem('docID');
      const values = await AsyncStorage.getItem('VideoCallAppointment');

      const doctor_Id = Number(docId);
      setDocid(doctor_Id);
      const appointment_details = JSON.parse(values);
      console.log('appointment_details', appointment_details);
      setDt(`${appointment_details?.date} ${appointment_details?.time}`);
      setDescription(appointment_details?.desc);
    };
    getAppointmentDetails();
  }, []);

  const warningArea = () => {
    return (
      <View style={styles.innerContainer}>
        <View style={[styles.mainFields, {flexDirection: 'row'}]}>
          <View>
            <Image
              source={require('../assets/VideoCall/info.png')}
              style={{width: 26, height: 26, resizeMode: 'contain'}}
            />
          </View>
          <View style={{width: '95%', marginLeft: 10}}>
            <Text style={styles.warningText}>
              Kindly pay the video consultation fee of{' '}
              <Text style={{fontFamily: 'HKGrotesk-Bold'}}>SAR 250</Text> on the
              below mentioned account number.
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const hospitalBankInfo = () => {
    return (
      <View style={[styles.innerContainer, {marginTop: '9%'}]}>
        <View style={styles.mainFields}>
          {/* Customer Name */}
          <View style={styles.infoCard}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: '4%',
              }}>
              <Feather name="user" style={styles.icon} />
              <Text style={styles.label}>Customer Name</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={styles.value}>Anfas Medical Care</Text>
              <MaterialCommunityIcons name="content-copy" style={styles.icon} />
            </View>
          </View>

          {/* IBAN Number */}
          <View style={styles.infoCard}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: '4%',
              }}>
              <Feather name="credit-card" style={styles.icon} />
              <Text style={styles.label}>IBAN number</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={styles.value}>SA1405000068202409653001</Text>
              <MaterialCommunityIcons name="content-copy" style={styles.icon} />
            </View>
          </View>
        </View>
      </View>
    );
  };

  const uniqueID = () => {
    return (
      <View
        style={[
          styles.innerContainer,
          {marginTop: '0%', backgroundColor: '#F7F7FA', paddingVertical: 12},
        ]}>
        <View style={[styles.mainFields, {flexDirection: 'row'}]}>
          <View>
            <Image
              source={require('../assets/VideoCall/info.png')}
              style={{width: 26, height: 26, resizeMode: 'contain'}}
            />
          </View>
          <View style={{width: '95%', marginLeft: 10}}>
            <Text style={styles.warningText}>
              Paste the{' '}
              <Text style={{fontFamily: 'HKGrotesk-Bold'}}>
                Unique Transaction ID
              </Text>{' '}
              of the transaction below, to successfully book your appointment
            </Text>
          </View>
        </View>
        <View style={[styles.mainFields, {marginTop: '8%'}]}>
          <Text style={[styles.label, {fontSize: 15, marginLeft: 0}]}>
            Unique Transaction ID
          </Text>
          <TextInput
            value={uniqueid}
            onChangeText={e => setUniqueid(e)}
            keyboardType="number-pad"
            placeholder="*************6789"
            style={[
              styles.textInput,
              {borderColor: focus && isKeyboardVisible ? '#1faeae' : '#9E9DC2'},
            ]}
            onFocus={() => {
              setFocus(true);
            }}
          />
        </View>
      </View>
    );
  };

  const renderButton = () => {
    const onSubmit = () => {
      setLoader(true);

      const token = store.getState().auth ? store.getState().auth.token : '';

      var myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${token}`);
      myHeaders.append('Content-Type', 'application/json');

      var raw = JSON.stringify({
        description: description,
        date: dt,
        comment: '',
        apointment_mode: '1',
        payment_status: '0',
        is_video_booking: true,
        doc_id: docid,
        transaction_id: uniqueid,
      });

      console.log('raw', raw);
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };

      fetch(URL.videoCallAppointment, requestOptions)
        .then(response => response.json())
        .then(result => {
          setLoader(false);
          console.log('result', result);
          if (result?.message == 'Appointment intiated') {
            navigation.replace('AppointmentStatus', {
              status: 0,
              patientName: result?.appointment?.patient?.name,
              patientAddress: result?.appointment?.patient?.address,
              doctorId: result?.appointment?.assigned_to?.id,
              appointmentDate: result?.appointment?.date,
            });
          } else {
            alert(JSON.stringify(result?.message));
          }
        })
        .catch(error => {
          console.log('error', error), setLoader(false);
        });
    };
    return (
      <View>
        {loader ? (
          <ActivityIndicator
            size="large"
            color={getButtonBackGround()}
            style={{marginBottom: '5%'}}
          />
        ) : (
          <Button
            isDisabled={uniqueid == '' ? true : false}
            buttonTitle="Submit"
            buttonStyle={styles.buttonStyle}
            onPress={onSubmit}
          />
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Loader isLoading={false} />
      <View style={styles.headerHolder}>
        <View style={styles.headerContainer}>
          <BackIcon
            onBackPress={() => navigation.goBack()}
            containerStyle={styles.backButtonContainer}
          />
          <Text style={styles.headerTitle}>Payment details</Text>
        </View>
      </View>
      <ScrollView contentContainerStyle={{paddingBottom: 30, marginTop: '5%'}}>
        <ErrorView message="" />
        {warningArea()}
        {hospitalBankInfo()}
        {uniqueID()}
      </ScrollView>
      {isKeyboardVisible ? null : renderButton()}
      {/* {isKeyboardVisible || showPicker ? null : renderButton()} */}
    </View>
  );
};

export default PaymentDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: 'HKGrotesk-Bold',
    fontSize: 20,
    lineHeight: 21,
    color: '#001133',
    marginLeft: widthScale(16),
  },
  backButtonContainer: {
    marginTop: heightScale(3),
  },
  headerHolder: {
    paddingTop: heightScale(30),
    paddingHorizontal: widthScale(20),
    paddingBottom: heightScale(10),
  },
  innerContainer: {
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainFields: {
    width: '90%',
    marginTop: '3%',
    // flexDirection: 'row',
  },
  warningText: {
    fontFamily: 'HKGrotesk-Medium',
    fontSize: 14,
    lineHeight: 20,
    color: '#100637',
    fontWeight: '500',
  },
  infoCard: {
    width: '100%',
    borderBottomWidth: 0.5,
    borderColor: '#ced0dd',
    paddingBottom: 10,
    marginBottom: '9%',
  },
  icon: {
    fontSize: 24,
    color: '#777A95',
  },
  label: {
    fontFamily: 'Roboto-Regular',
    marginLeft: 8,
    color: '#777A95',
    fontSize: 17,
  },
  value: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
  },

  buttonStyle: {
    marginVertical: heightScale(16),
    marginHorizontal: widthScale(20),
  },

  textInput: {
    width: '100%',
    fontFamily: 'HKGrotesk-Regular',
    height: heightScale(45),
    fontSize: 16,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ddd',
    marginTop: '4%',
    paddingLeft: 12,
  },
});
