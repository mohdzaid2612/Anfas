import React, {useState} from 'react';

import {Calendar} from 'react-native-calendars';
import moment from 'moment';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  Dimensions,
  Image,
} from 'react-native';

// import DateTimePicker from '@react-native-community/datetimepicker'
import DatePicker from 'react-native-date-picker';

import BackIcon from '../../../components/BackButton';
import Button from '../../../components/Button';

import IconCalender from '../../../assets/AddPatient/ic_calender.svg';

import {widthScale, heightScale} from '../../../utils/dimensionHelper';

import {
  getPatientHistoryPhoneNumberCardBorderColor,
  getBackgroundColor,
  getButtonBackGround,
} from '../../../utils/colorHelper';

import WaringIcon from '../../../assets/Booking/waring.svg';
import WaringSideBarIcon from '../../../assets/Booking/warningSideBar.svg';
import LeftIcon from '../../../assets/Booking/leftArrow.svg';
import RightIcon from '../../../assets/Booking/rightArrow.svg';

import Loader from '../../../components/Loader';
import ErrorView from '../../../components/ErrorView';

import Entypo from 'react-native-vector-icons/Entypo';

const SlotSelectionHolder = props => {
  const {
    onBackPress,
    onConfirmDate,
    onDateSelected,
    onTimeSelection,
    form,
    startTime,
    endTime,
    isLoading,
    error,
  } = props;

  const [showPicker, setShowPicker] = useState(false);

  const selectedDate = moment(form.time).format('hh:mm A');

  const formattedStartTime = moment(startTime).format('hh: mm A');
  const formattedEndTime = moment(endTime).format('hh: mm A');
  const [bookingdate, setBookingDate] = useState(new Date());
  const onDateIconSelected = () => setShowPicker(!showPicker);

  const renderHeader = () => {
    return (
      <View style={styles.headerHolder}>
        <View style={styles.headerContainer}>
          <BackIcon
            onBackPress={onBackPress}
            containerStyle={styles.backButtonContainer}
          />
          <Text style={styles.headerTitle}>Select Date & Time</Text>
        </View>
      </View>
    );
  };

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
          onDateSelected(date);
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
        <TouchableOpacity onPress={onDateIconSelected}>
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

  const renderButton = () => {
    const selectedHour = parseInt(moment(form.time).format('H'));
    const startHour = moment({hour: 8, minute: 0});
    const timeStatus = moment(bookingdate).format('hh:mm A');
    const endHour = moment({hour: 17, minute: 0});
    const nowHour = parseInt(moment().format('H'));
    // console.log(timeStatus.isSame(startHour))
    var condition1 = moment(bookingdate).isAfter(startHour);
    var condition2 = moment(bookingdate).isBefore(endHour);
    const isValid = condition1 && condition2 ? false : true;
    console.log(isValid);
    return (
      <View>
        <Button
          buttonTitle="Confirm date & time"
          buttonStyle={styles.buttonStyle}
          onPress={onConfirmDate}
          isDisabled={isValid}
        />
      </View>
    );
  };

  // const onDateChange = (event, date) => {
  //   if (event && event.type === "dismissed") {
  //     setShowPicker(false)
  //     return
  //   }
  //   setShowPicker(Platform.OS === "ios")
  //   onTimeSelection(date)
  // }

  const renderWarning = () => {
    return (
      <View style={styles.warningContainer}>
        {/* <WaringSideBarIcon
          height={84}
          width={4}
        /> */}
        {/* <WaringIcon
          width={30}
          height={30}
          style={{
            marginLeft: widthScale(12),
          }}
        /> */}
        <Image
          source={require('../../../assets/Booking/warningIcon.png')}
          style={{
            width: 30,
            height: 30,
            resizeMode: 'contain',
            marginLeft: widthScale(12),
          }}
        />
        <Text style={styles.warningText}>
          As per the current situations, we are accepting any appointment
          bookings from{' '}
          <Text style={styles.warningTimeText}>{formattedStartTime}</Text> to{' '}
          <Text style={styles.warningTimeText}>{formattedEndTime}</Text> only.
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Loader isLoading={isLoading} />
      {renderHeader()}
      <ScrollView>
        <ErrorView message={error} />
        {renderCalender()}
        {renderTimeHolder()}
        {renderWarning()}
      </ScrollView>
      {renderButton()}
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
            onPress={onDateIconSelected}
            style={{
              position: 'absolute',
              right: 0,
              top: '0%',
              right: '5%',
              zIndex: 999,
            }}>
            <Entypo name="cross" color={'#999'} size={33} />
          </TouchableOpacity>
          <DatePicker
            style={{
              backgroundColor: '#fff',
              width: Dimensions.get('screen').width,
            }}
            mode="time"
            date={bookingdate}
            onDateChange={date => setBookingDate(date)}
            textColor={'#999'}
          />
        </View>
      )}
    </View>
  );
};

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
});

SlotSelectionHolder.defaultProps = {};

export default SlotSelectionHolder;
