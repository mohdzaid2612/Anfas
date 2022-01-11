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
  ActivityIndicator,
} from 'react-native';
import Loader from '../components/Loader';
import {
  getPatientHistoryPhoneNumberCardBorderColor,
  getBackgroundColor,
  getButtonBackGround,
} from '../utils/colorHelper';

import {heightScale, widthScale} from '../utils/dimensionHelper';
import Button from '../components/Button';

import BackIcon from '../components/BackButton';
import LeftIcon from '../assets/Booking/leftArrow.svg';
import RightIcon from '../assets/Booking/rightArrow.svg';
import IconCalender from '../assets/AddPatient/ic_calender.svg';
import Entypo from 'react-native-vector-icons/Entypo';

import {useNavigation, useIsFocused} from 'react-navigation-hooks';
import ErrorView from '../components/ErrorView';

import DatePicker from 'react-native-date-picker';
import {Calendar} from 'react-native-calendars';
import moment from 'moment';
import AsyncStorage from '@react-native-community/async-storage';
import store from '../Store';
import {URL} from '../utils/constant';

const VideoCallBooking = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [form, setForm] = useState({
    date: moment(new Date()).format('YYYY-MM-DD'),
    time: moment(new Date()).format('hh:mm A'),
  });
  const [showPicker, setShowPicker] = useState(false);
  const [bookingdate, setBookingDate] = useState(new Date());
  const [value, setValue] = useState('');
  const [loader, setLoader] = useState(false);

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    console.log('keyBoardView', isKeyboardVisible);
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
    setForm({
      date: moment(new Date()).format('YYYY-MM-DD'),
      time: moment(new Date()).format('hh:mm A'),
    });
    setBookingDate(new Date());
    setValue('');
  }, [isFocused == true]);

  const renderCalender = () => {
    return (
      <Calendar
        renderArrow={direction => {
          if (direction === 'left') {
            return <LeftIcon width={10} height={10} />;
          } else {
            return <RightIcon width={10} height={10} />;
          }
        }}
        onDayPress={date => {
          setForm({
            ...form,
            date: date.dateString,
          });
        }}
        markedDates={{
          [moment(form.date).format('YYYY-MM-DD')]: {
            customStyles: {
              container: {
                backgroundColor: '#1faeae',
                borderRadius: 8,
                borderWidth: 1,
                borderColor: '#fff',
                padding: widthScale(2),
              },
              text: {
                fontFamily: 'HKGrotesk-Bold',
                fontSize: 20,
                lineHeight: 21,
                color: '#fff',
              },
            },
          },
        }}
        markingType={'custom'}
        minDate={new Date()}
        hideExtraDays={true}
        theme={{
          textDayFontFamily: 'HKGrotesk-Bold',
          textMonthFontFamily: 'HKGrotesk-Bold',
          textDayHeaderFontFamily: 'HKGrotesk-Regular',
          textDayFontSize: 20,
          textMonthFontSize: 18,
          textDayHeaderFontSize: 14,
          selectedDayBackgroundColor: '#1faeae',
          todayTextColor: '#1faeae',
          textDisabledColor: '#7e94a7',
          dayTextColor: 'rgba(40, 52, 82, 1)',
          calendarBackground: '#fff',
          backgroundColor: '#000',
          textSectionTitleColor: 'rgba(119, 130, 159, 1)',
          textDisabledColor: '#A5B1CF',
          todayTextColor: '#02044a',
        }}
      />
    );
  };

  const renderTimeHolder = () => {
    return (
      <View style={styles.timeHolder}>
        <Text style={styles.selectTime}>Select Time</Text>
        <TouchableOpacity onPress={() => setShowPicker(!showPicker)}>
          <View style={styles.appointmentDateHolder}>
            <Text style={styles.selectedDateText}>
              {moment(bookingdate).format('hh:mm A')}
            </Text>
            <IconCalender width={20} height={20} />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const renderProblemContainer = () => {
    return (
      <View style={{paddingHorizontal: widthScale(20)}}>
        <Text style={styles.bookingDetailText}>Write your problem</Text>
        <TextInput
          multiline={true}
          placeholder="Tell doctor about your problem..."
          underlineColorAndroid="transparent"
          style={styles.textAreaContainer}
          value={value}
          onChangeText={e => setValue(e)}
        />
      </View>
    );
  };

  const renderButton = () => {
    // const selectedHour = parseInt(moment(form.time).format('H'));
    // const startHour = moment({hour: 8, minute: 0});
    // const timeStatus = moment(bookingdate).format('hh:mm A');
    // const endHour = moment({hour: 17, minute: 0});
    // const nowHour = parseInt(moment().format('H'));
    // // console.log(timeStatus.isSame(startHour))
    // var condition1 = moment(bookingdate).isAfter(startHour);
    // var condition2 = moment(bookingdate).isBefore(endHour);
    // const isValid = condition1 && condition2 ? false : true;
    // console.log(isValid);
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
            buttonTitle="Confirm date & time"
            buttonStyle={styles.buttonStyle}
            onPress={handleClick}
            //   isDisabled={isValid}
          />
        )}
      </View>
    );
  };

  const handleClick = async () => {
    setLoader(true);
    const id = await AsyncStorage.getItem('docID');

    const token = store.getState().auth ? store.getState().auth.token : '';

    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${token}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };

    console.log(form.date);
    fetch(
      `${URL.checkVideoAppointment}?doc_id=${id}&date=${form.date}`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        setLoader(false);
        if (result?.present == false) {
          var data = {
            date: form?.date,
            time: form?.time,
            desc: value,
          };
          console.log('object', data);
          AsyncStorage.setItem('VideoCallAppointment', JSON.stringify(data));
          navigation.navigate('PaymentDetails');
        } else {
          if (result?.appointment?.transaction?.isVerified == '0') {
            navigation.navigate('AppointmentStatus', {
              status: 0,
              patientName: result?.appointment?.patient?.name,
              patientAddress: result?.appointment?.patient?.address,
              doctorId: result?.appointment?.assigned_to?.id,
              appointmentDate: result?.appointment?.date,
            });
          } else {
            navigation.navigate('AppointmentStatus', {
              status: 1,
              patientName: result?.appointment?.patient?.name,
              patientAddress: result?.appointment?.patient?.address,
              doctorId: result?.appointment?.assigned_to?.id,
              appointmentDate: result?.appointment?.date,
            });
          }
        }
      })
      .catch(error => {
        console.log('error', error), setLoader(false);
      });
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
          <Text style={styles.headerTitle}>Select Date & Time</Text>
        </View>
      </View>
      <ScrollView contentContainerStyle={{paddingBottom: 20}}>
        <ErrorView message="" />
        {renderCalender()}
        {renderTimeHolder()}
        {renderProblemContainer()}
      </ScrollView>
      {isKeyboardVisible || showPicker ? null : renderButton()}
      {showPicker && (
        <View
          style={{
            width: '100%',
            borderTopWidth: 0.5,
            position: 'relative',
            zIndex: 999,
            backgroundColor: '#fff',
            borderColor: '#ddd',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {/* <DateTimePicker
            mode="time"
            display={Platform.OS === "android" ? "clock" : "spinner"}
            value={Platform.OS === "android" ? new Date() : form["time"]}
            onChange={onDateChange}
          /> */}
          <TouchableOpacity
            onPress={() => setShowPicker(false)}
            style={{
              position: 'absolute',
              right: 0,
              top: '0%',
              right: '5%',
              zIndex: 999,
            }}>
            <Entypo name="cross" color={'#000'} size={33} />
          </TouchableOpacity>
          <DatePicker
            style={{
              backgroundColor: '#fff',
              width: Dimensions.get('screen').width,
            }}
            mode="time"
            is24hourSource="locale"
            date={bookingdate}
            onDateChange={date => {
              setForm({
                ...form,
                time: moment(date).format('HH:mm:ss'),
              });
              setBookingDate(date);
            }}
            textColor={'#000'}
          />
        </View>
      )}
    </View>
  );
};

export default VideoCallBooking;

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
  buttonStyle: {
    marginVertical: heightScale(16),
    marginHorizontal: widthScale(20),
  },
  timeHolder: {
    marginTop: heightScale(32),
    paddingHorizontal: widthScale(20),
  },
  selectTime: {
    fontFamily: 'HKGrotesk-Bold',
    fontSize: 14,
    lineHeight: 16,
    fontWeight: '600',
    color: '#4B5879',
  },
  appointmentDateHolder: {
    backgroundColor: getBackgroundColor(),
    paddingHorizontal: widthScale(16),
    marginTop: heightScale(16),
    paddingVertical: heightScale(12),
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 10,
    borderColor: getPatientHistoryPhoneNumberCardBorderColor(),
    marginBottom: heightScale(30),
    borderWidth: 1,
  },
  selectedDateText: {
    fontFamily: 'HKGrotesk-Regular',
    fontSize: 18,
    lineHeight: 21.4,
    fontWeight: 'bold',
    color: '#25282B',
  },
  warningContainer: {
    flexDirection: 'row',
    paddingRight: widthScale(20),
  },
  warningText: {
    fontFamily: 'HKGrotesk-Regular',
    fontSize: 16,
    lineHeight: 20,
    color: '#100637',
    marginLeft: widthScale(10),
    flexShrink: 1,
  },
  warningTimeText: {
    fontFamily: 'HKGrotesk-Bold',
    fontSize: 14,
    lineHeight: 20,
    color: '#4B5879',
  },
  okText: {
    alignSelf: 'flex-end',
    marginHorizontal: widthScale(16),
    color: '#5451FF',
  },

  bookingDetailText: {
    fontFamily: 'HKGrotesk-Bold',
    fontSize: 18,
    lineHeight: 20,
    color: '#000',
  },
  textAreaContainer: {
    backgroundColor: '#FFF',
    minHeight: 120,
    borderStyle: 'solid',
    borderRadius: 10,
    textAlignVertical: 'top',
    paddingHorizontal: 10,
    marginTop: heightScale(19),
    fontFamily: 'HKGrotesk-Regular',
    fontSize: 16,
    lineHeight: 22,
    color: '#000',
    borderWidth: 0.5,
    borderColor: '#ddd',
    fontWeight: '600',
  },
});
