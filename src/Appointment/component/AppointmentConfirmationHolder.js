import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  ScrollView,
  Image,
  Animated,
} from 'react-native';

import moment from 'moment';

import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';

import {widthScale, heightScale} from '../../utils/dimensionHelper';

import {
  getPatientReasonColor,
  getPatientAppointmentTypeColor,
  getAppointmentConfirmationTimeColor,
  getForgotPasswordColor,
  getButtonBackGround,
} from '../../utils/colorHelper';

import Button from '../../components/Button';
import BackIcon from '../../components/BackButton';

import IconTick from '../../assets/Appointment/tickIcon.svg';
import CalenderIcon from '../../assets/Auth/ic_calender.svg';
import TimeIcon from '../../assets/Auth/ic_time.svg';

import PackageBackGround from '../../assets/Booking/packageBorder.png';
import Video from 'react-native-video';

import loaderVideo from '../../assets/loaderGif.mp4';

const AppointmentConfirmationHolder = props => {
  const {date, onBackPress, type, variant, selectedPackage} = props;

  const dateText = moment(date).format('DD MMM YYYY');
  const timeText = moment(date).format('HH:mm A');

  const packageName = get(selectedPackage, 'name', '');
  const packagePrice = get(selectedPackage, 'price', '');

  const getTitle = () => {
    let title = '';
    let mode = variant === 'Appointment' ? 'Appointment' : 'Service';
    if (type === 'CANCELLED') {
      title = `${mode} Cancelled Successfully`;
    } else if (type === 'RESCHEDULE') {
      title = `${mode} Rescheduled Successfully`;
    } else {
      title = `${mode} Booked Successfully`;
    }
    return title;
  };
  const title = getTitle();

  const renderPackageDetail = () => {
    return (
      <View style={styles.bookingDetailContainer}>
        <View
          style={{
            width: '100%',
            marginTop: heightScale(16),
            backgroundColor: '#fff',
          }}
          imageStyle={{
            borderRadius: 10,
          }}>
          <View style={styles.packageHolder}>
            <Text style={styles.packageNameText}>{packageName}</Text>
            <Text style={styles.packagePriceText}>{`${packagePrice} SAR`}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <BackIcon
          onBackPress={onBackPress}
          containerStyle={styles.backButtonContainer}
        />
        <Text style={styles.headerTitle}>Confirmation</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.infoHeader}>
          <View
            style={{
              alignItems: 'center',
            }}>
            {/* <IconTick
              width={150}
              height={150}
            /> */}
            <Image
              source={require('../../assets/loaderGif.gif')}
              style={{width: 200, height: 200, resizeMode: 'contain'}}
            />
          </View>
          <Text style={styles.successText}>{title}</Text>
          <Text style={styles.subHeaderText}>
            A confirmation has been sent to your registered email
          </Text>
          <View style={styles.timeInfo}>
            <View style={styles.timeHolder}>
              <Text style={styles.timeText}>{dateText}</Text>
              <View style={styles.timeIconContainer}>
                <CalenderIcon width={35} height={35} />
              </View>
            </View>
            <View
              style={[
                styles.timeHolder,
                {
                  marginLeft: widthScale(30),
                },
              ]}>
              <Text
                style={[
                  styles.timeText,
                  {
                    width: '70%',
                    paddingHorizontal: widthScale(10),
                  },
                ]}>
                {timeText}
              </Text>
              <View style={styles.timeIconContainer}>
                <TimeIcon width={35} height={35} />
              </View>
            </View>
          </View>
          {/* {!isEmpty(selectedPackage) && renderPackageDetail()} */}
        </View>
      </ScrollView>
      <Button
        onPress={onBackPress}
        buttonTitle="Back To home"
        buttonTitleStyle={styles.cancelButtonText}
        buttonStyle={styles.cancelButtonContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: widthScale(16),
    justifyContent: 'space-between',
  },
  successText: {
    fontFamily: 'HKGrotesk-Bold',
    fontSize: 20,
    lineHeight: 26,
    color: getPatientReasonColor(),
    paddingTop: heightScale(20),
    paddingBottom: heightScale(10),
    textAlign: 'center',
  },
  infoHeader: {},
  subHeaderText: {
    fontFamily: 'HKGrotesk-Regular',
    fontSize: 16,
    lineHeight: 22,
    color: getPatientAppointmentTypeColor(),
    paddingBottom: heightScale(20),
    textAlign: 'center',
  },
  appointmentDateContainer: {
    paddingHorizontal: widthScale(20),
    paddingVertical: heightScale(8),
    backgroundColor: getAppointmentConfirmationTimeColor(),
    borderRadius: 8,
  },
  dateText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '700',
    color: getForgotPasswordColor(),
  },
  appointmentInfoHolder: {
    flex: 1,
    justifyContent: 'space-between',
  },
  headerContainer: {
    paddingTop: heightScale(20),
    paddingBottom: heightScale(20),
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButtonContainer: {
    marginTop: heightScale(6),
  },
  headerTitle: {
    fontFamily: 'HKGrotesk-Bold',
    fontSize: 20,
    lineHeight: 26,
    color: '#001133',
    marginLeft: widthScale(16),
  },
  timeInfo: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: heightScale(10),
    marginBottom: heightScale(60),
  },
  timeHolder: {
    backgroundColor: '#1faeae',
    borderRadius: 20,
    paddingHorizontal: widthScale(10),
    paddingVertical: heightScale(20),
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  timeText: {
    fontFamily: 'HKGrotesk-Bold',
    fontSize: 18,
    lineHeight: 23,
    color: '#FFF',
    width: '60%',
    textAlign: 'center',
  },
  timeIconContainer: {
    backgroundColor: '#FFF',
    borderColor: '#F8FAFF',
    borderWidth: 3,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    position: 'absolute',
    top: 70,
    elevation: 2,
  },
  cancelButtonText: {
    fontFamily: 'HKGrotesk-Bold',
    fontSize: 16,
    lineHeight: 22,
    color: getButtonBackGround(),
  },
  cancelButtonContainer: {
    paddingVertical: widthScale(14),
    borderWidth: 1,
    borderColor: getButtonBackGround(),
    backgroundColor: 'transparent',
    borderRadius: 15,
    marginBottom: widthScale(30),
  },
  bookingDetailContainer: {
    backgroundColor: 'rgba(247, 246, 253, 0.83)',
    paddingBottom: heightScale(20),
  },
  packageHolder: {
    paddingHorizontal: widthScale(14),
    paddingVertical: heightScale(10),
    borderRadius: 20,
  },
  packageNameText: {
    fontFamily: 'HKGrotesk-Bold',
    fontSize: 14,
    lineHeight: 22,
    color: '#FFFFFF',
  },
  packagePriceText: {
    fontFamily: 'HKGrotesk-Bold',
    fontSize: 16,
    lineHeight: 22,
    color: '#FFFFFF',
  },
});

export default AppointmentConfirmationHolder;
