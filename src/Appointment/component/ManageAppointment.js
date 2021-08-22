import React from 'react';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';

import moment from 'moment';

import {widthScale, heightScale} from '../../utils/dimensionHelper';

import {APPOINTMENT_MODE} from '../../utils/constant';

import InitiatedAppointmentImage from '../../assets/Appointment/initiatedAppointment.png';
import CancelAppointmentImage from '../../assets/Appointment/cancelAppointment.png';

import UnisexIcon from '../../assets/Appointment/avatar_patient/unisex.svg';
import CalenderIcon from '../../assets/Auth/ic_calender.svg';
import TimeIcon from '../../assets/Auth/ic_time.svg';

import ErrorView from '../../components/ErrorView';
import Loader from '../../components/Loader';
import BackIcon from '../../components/BackButton';
import Button from '../../components/Button';

const ManageAppointmentHolder = props => {
  const {
    patientName,
    doctorName,
    isLoading,
    error,
    date,
    apointmentType,
    onBackPress,
    speciality,
    showAppointmentActionButton,
    onRescheduleButtonClicked,
    onCancelButtonClicked,
    appointmentStatus,
  } = props;

  const dateText = moment(date).format('DD MMM YYYY');
  const timeText = moment(date).format('HH:mm A');

  const renderStatusImage = () => {
    let source = InitiatedAppointmentImage;

    if (appointmentStatus === APPOINTMENT_MODE.COMPLETED) return null;

    if (appointmentStatus === APPOINTMENT_MODE.CANCELLED) {
      source = CancelAppointmentImage;
    }
    return (
      <View style={styles.imageStyle}>
        <Image source={source} />
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
        <Text style={styles.headerTitle}>Appointment</Text>
      </View>
      <Loader isLoading={isLoading} />
      <ErrorView message={error} />
      <ScrollView>
        {!isLoading && (
          <View>
            {renderStatusImage()}
            {doctorName !== '' && (
              <View
                style={[
                  styles.patientHolder,
                  {
                    marginBottom: widthScale(16),
                  },
                ]}>
                <View>
                  <UnisexIcon width={40} height={40} />
                </View>
                <View style={styles.patientInfoHolder}>
                  <View>
                    <Text style={styles.patientName}>{doctorName}</Text>
                    <Text style={styles.reasonText}>{speciality}</Text>
                  </View>
                </View>
              </View>
            )}
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
            <View>
              <Text style={styles.patientTitleText}>Patient details</Text>
              <View style={styles.patientHolder}>
                <View>
                  <UnisexIcon width={40} height={40} />
                </View>
                <View style={styles.patientInfoHolder}>
                  <View>
                    <Text style={styles.patientName}>{patientName}</Text>
                    <Text style={styles.reasonText}>For consultation</Text>
                  </View>
                </View>
              </View>
            </View>
            {showAppointmentActionButton && (
              <Button
                onPress={onCancelButtonClicked}
                buttonTitle="Cancel Appointment"
                buttonTitleStyle={styles.cancelButtonText}
                buttonStyle={styles.cancelButtonContainer}
              />
            )}
            {showAppointmentActionButton && (
              <Button
                onPress={onRescheduleButtonClicked}
                buttonTitle="Reschedule Appointment"
                buttonTitleStyle={styles.rescheduleButtonText}
                buttonStyle={styles.rescheduleContainer}
              />
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    paddingTop: heightScale(30),
    paddingBottom: heightScale(20),
    paddingHorizontal: widthScale(20),
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
  patientHolder: {
    marginHorizontal: widthScale(20),
    backgroundColor: '#fff',
    borderRadius: 12,
    flexDirection: 'row',
    paddingHorizontal: widthScale(16),
    paddingVertical: heightScale(14),
    alignItems: 'center',
    elevation: 2,
    marginVertical: 4,
  },
  patientInfoHolder: {
    marginLeft: widthScale(16),
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexShrink: 1,
  },
  patientName: {
    fontFamily: 'HKGrotesk-Bold',
    fontSize: 16,
    lineHeight: 21,
    color: '#001133',
  },
  reasonText: {
    fontFamily: 'HKGrotesk-Regular',
    fontSize: 12,
    lineHeight: 14,
    color: 'rgba(56, 58, 105, 0.62)',
    letterSpacing: 0.02,
    marginTop: widthScale(4),
  },
  patientTitleText: {
    fontFamily: 'HKGrotesk-Regular',
    fontSize: 18,
    lineHeight: 23,
    color: '#777A95',
    fontWeight: '600',
    marginHorizontal: widthScale(20),
    marginBottom: widthScale(8),
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
    color: '#FFFFFF',
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
    color: '#5451FF',
  },
  cancelButtonContainer: {
    paddingVertical: widthScale(14),
    marginHorizontal: widthScale(20),
    borderWidth: 1,
    borderColor: '#5451FF',
    backgroundColor: 'transparent',
    borderRadius: 15,
    marginVertical: widthScale(15),
    marginTop: widthScale(30),
  },
  rescheduleButtonText: {
    fontFamily: 'HKGrotesk-Bold',
    fontSize: 16,
    lineHeight: 22,
    color: 'rgba(255, 255, 255, 1)',
  },
  rescheduleContainer: {
    paddingVertical: widthScale(14),
    marginHorizontal: widthScale(20),
    borderRadius: 15,
    marginBottom: widthScale(15),
  },
  imageStyle: {
    alignItems: 'center',
    marginBottom: widthScale(20),
  },
});

ManageAppointmentHolder.defaultProps = {
  patientName: 'Sahil Ramola',
  doctorName: '',
};

export default ManageAppointmentHolder;
