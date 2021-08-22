import React, {useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import moment from 'moment';
import get from 'lodash/get';

import ActionSheet from 'react-native-actionsheet';

import {heightScale, widthScale} from '../../../utils/dimensionHelper';

import {APPOINTMENT_MODE} from '../../../utils/constant';

import BackIcon from '../../../components/BackButton';
import Button from '../../../components/Button';
import Loader from '../../../components/Loader';
import ErrorView from '../../../components/ErrorView';

import UploadPhotoIcon from '../../../assets/Booking/uploadPhoto.svg';
import InitiatedAppointmentImage from '../../../assets/Appointment/initiatedAppointment.png';
import CancelAppointmentImage from '../../../assets/Appointment/cancelAppointment.png';
import CalenderIcon from '../../../assets/Auth/ic_calender.svg';
import TimeIcon from '../../../assets/Auth/ic_time.svg';
import UnisexIcon from '../../../assets/Appointment/avatar_patient/unisex.svg';
import PackageBackGround from '../../../assets/Booking/packageBorder.png';
import ServiceImage from '../../../assets/Booking/serviceManage.png';

import RemoveIcon from '../../../assets/Booking/remove.svg';

import {showImagePicker} from '../../../utils/imagePicker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ManageBookingHolder = props => {
  const {
    onBackPress,
    appointmentStatus,
    date,
    packagePrice,
    packageName,
    serviceName,
    serviceDetail,
    patientName,
    patientAge,
    onRescheduleButtonClicked,
    onCancelButtonClicked,
    showAppointmentActionButton,
    assignedStaff,
    uploads,
    onDeletePhoto,
    isLoading,
    error,
    onPhotosSelected,
  } = props;

  const actionSheetRef = useRef(null);

  const selectPhotos = () => {
    if (actionSheetRef && actionSheetRef.current) {
      actionSheetRef.current.show();
    }
  };

  const dateText = moment(date).format('DD MMM YYYY');
  const timeText = moment(date).format('HH:mm A');

  const assignedFirstName = get(assignedStaff, 'first_name', '');
  const assignedLastName = get(assignedStaff, 'last_name', '');

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

  const renderHeader = () => {
    return (
      <View style={styles.headerHolder}>
        <View style={styles.headerContainer}>
          <BackIcon
            onBackPress={onBackPress}
            containerStyle={styles.backButtonContainer}
          />
          <Text style={styles.headerTitle}>Manage Booking</Text>
        </View>
      </View>
    );
  };

  const renderTimeInfo = () => {
    return (
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
    );
  };

  const renderPackageDetail = () => {
    return (
      <View style={styles.bookingDetailContainer}>
        <View style={styles.packageHeader}>
          <Text style={styles.bookingDetailText}>Package details</Text>
        </View>
        <View
          style={{
            width: '100%',
            marginTop: heightScale(16),
            backgroundColor: '#1faeae',
            borderRadius: 10,
            elevation: 4,
          }}>
          <View style={styles.packageHolder}>
            <Text style={styles.packageNameText}>{packageName}</Text>
            <Text style={styles.packagePriceText}>{`${packagePrice} SAR`}</Text>
          </View>
        </View>
      </View>
    );
  };

  const renderServiceDetail = () => {
    return (
      <View style={styles.bookingDetailContainer}>
        <View style={styles.packageHeader}>
          <Text style={styles.bookingDetailText}>Service details</Text>
        </View>
        <View style={styles.serviceInfoHolder}>
          <Image
            source={ServiceImage}
            style={{
              width: 64,
              height: 64,
            }}
          />
          <View style={styles.serviceInfo}>
            <Text style={styles.serviceNameText}>{serviceName}</Text>
            <Text style={styles.serviceDetailText}>{serviceDetail}</Text>
          </View>
        </View>
      </View>
    );
  };

  const renderPatientDetail = () => {
    return (
      <View style={styles.bookingDetailContainer}>
        <View style={styles.patientInfoHolder}>
          <Text style={styles.patientHeading}>Patient</Text>
          <View style={styles.patientInfo}>
            <UnisexIcon width={48} height={48} />
            <View style={styles.serviceInfo}>
              <Text style={styles.serviceNameText}>{patientName}</Text>
              <Text
                style={styles.serviceDetailText}>{`Age: ${patientAge}`}</Text>
            </View>
          </View>
          {assignedStaff && (
            <>
              <View style={styles.seprator} />
              <Text style={styles.patientHeading}>Staff appointment</Text>
              <View style={styles.patientInfo}>
                <UnisexIcon width={48} height={48} />
                <View style={styles.serviceInfo}>
                  <Text
                    style={
                      styles.serviceNameText
                    }>{`${assignedFirstName} ${assignedLastName}`}</Text>
                  {/* <Text style={styles.serviceDetailText}>{`Age: ${patientAge}`}</Text> */}
                </View>
              </View>
            </>
          )}
        </View>
      </View>
    );
  };

  const renderBottomSection = () => {
    return (
      <View style={styles.bookingDetailContainer}>
        {uploads.length > 0 && (
          <View>
            <View style={styles.packageHeader}>
              <Text style={styles.bookingDetailText}>Uploaded documents</Text>
            </View>
            <FlatList
              data={uploads}
              renderItem={renderPhotoList}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => `image${index}`}
              contentContainerStyle={styles.imageItem}
            />
          </View>
        )}
        {showAppointmentActionButton && (
          <TouchableOpacity onPress={selectPhotos}>
            <View style={styles.uploadPhotoContainer}>
              <MaterialCommunityIcons
                name="image-plus"
                size={28}
                color="#ddd"
              />
              <Text style={styles.uploadPhotoText}>Upload Photo</Text>
            </View>
          </TouchableOpacity>
        )}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'stretch',
            justifyContent: 'space-between',
            width: '100%',
            marginTop: 20,
            padding: 0,
          }}>
          {showAppointmentActionButton && (
            <Button
              onPress={onCancelButtonClicked}
              buttonTitle="Cancel"
              buttonTitleStyle={styles.cancelButtonText}
              buttonStyle={styles.cancelButtonContainer}
            />
          )}
          {showAppointmentActionButton && (
            <Button
              onPress={onRescheduleButtonClicked}
              buttonTitle="Reschedule"
              buttonTitleStyle={styles.rescheduleButtonText}
              buttonStyle={styles.rescheduleContainer}
            />
          )}
        </View>
      </View>
    );
  };

  const renderPhotoList = ({item, index}) => {
    return (
      <View
        style={{
          width: 120,
          height: 110,
          padding: 10,
        }}>
        <Image
          style={{
            width: 100,
            height: 100,
            borderRadius: 4,
          }}
          source={{
            uri: item,
          }}
        />
        <View
          style={{
            position: 'absolute',
            top: 0,
            right: 5,
          }}>
          <TouchableOpacity onPress={() => onDeletePhoto(item)}>
            <RemoveIcon width={20} height={20} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const onImageSelctionClick = index => {
    const task = index === 0 ? 'GALLERY' : 'CAMERA';
    if (index !== 1) showImagePicker(task, appendForUpload);
  };

  const appendForUpload = files => {
    onPhotosSelected(files);
  };

  return (
    <View style={styles.container}>
      {renderHeader()}
      <Loader isLoading={isLoading} />
      <ScrollView>
        <ErrorView message={error} />
        <View style={styles.statusHolder}>
          {renderStatusImage()}
          {renderTimeInfo()}
        </View>
        {renderPatientDetail()}
        {renderServiceDetail()}
        {renderPackageDetail()}
        {renderBottomSection()}
      </ScrollView>
      <ActionSheet
        ref={actionSheetRef}
        title={'Select Image File To Send'}
        options={['Choose from gallery', 'Cancel']}
        cancelButtonIndex={1}
        onPress={onImageSelctionClick}
      />
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
    backgroundColor: '#fff',
    paddingTop: heightScale(30),
    paddingHorizontal: widthScale(20),
    paddingBottom: heightScale(10),
  },
  imageStyle: {
    alignItems: 'center',
    marginBottom: widthScale(20),
  },
  timeInfo: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: heightScale(5),
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
  statusHolder: {
    backgroundColor: '#fff',
    paddingTop: heightScale(12),
  },
  bookingDetailContainer: {
    backgroundColor: '#fff',
    paddingTop: heightScale(24),
    paddingBottom: heightScale(20),
    paddingHorizontal: widthScale(20),
    marginTop: heightScale(2),
  },
  packageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  bookingDetailText: {
    fontFamily: 'HKGrotesk-Bold',
    fontSize: 18,
    lineHeight: 20,
    color: '#0B152D',
  },
  serviceInfoHolder: {
    flexDirection: 'row',
    marginTop: heightScale(12),
  },
  serviceInfo: {
    flexShrink: 1,
    marginLeft: widthScale(15),
    justifyContent: 'center',
  },
  serviceNameText: {
    fontFamily: 'HKGrotesk-Bold',
    fontSize: 16,
    lineHeight: 20,
    color: '#0B152D',
  },
  serviceDetailText: {
    fontFamily: 'HKGrotesk-Regular',
    fontSize: 12,
    lineHeight: 14,
    color: '#4B5879',
    letterSpacing: 0.12,
    marginTop: heightScale(8),
  },
  patientInfoHolder: {
    backgroundColor: '#FFF',
    padding: widthScale(16),
    borderRadius: 10,
    borderWidth: 0.6,
    borderColor: '#E3E5F3',
    elevation: 2,
  },
  patientHeading: {
    fontFamily: 'HKGrotesk-Regular',
    fontSize: 14,
    lineHeight: 18,
    color: '#8390AF',
    marginBottom: heightScale(8),
  },
  patientInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seprator: {
    height: 2,
    backgroundColor: '#EAECFE',
    opacity: 0.4,
    marginVertical: heightScale(16),
  },
  cancelButtonText: {
    fontFamily: 'HKGrotesk-Bold',
    fontSize: 16,
    lineHeight: 22,
    color: '#d9534f',
  },
  cancelButtonContainer: {
    // paddingVertical: widthScale(14),
    borderWidth: 1,
    borderColor: '#d9534f',
    backgroundColor: 'transparent',
    borderRadius: 15,
    // marginVertical: widthScale(15),
    // marginTop: widthScale(30),
    width: '80%',
  },
  rescheduleButtonText: {
    fontFamily: 'HKGrotesk-Bold',
    fontSize: 16,
    // lineHeight: 22,
    color: 'rgba(255, 255, 255, 1)',
  },
  rescheduleContainer: {
    // paddingVertical: widthScale(14),
    borderRadius: 15,
    // marginBottom: widthScale(15),
    width: '88%',
  },
  imageItem: {
    marginVertical: heightScale(16),
  },
  uploadPhotoText: {
    fontFamily: 'HKGrotesk-Bold',
    fontSize: 16,
    lineHeight: 22,
    color: '#aaa',
    marginLeft: widthScale(8),
  },
  uploadPhotoContainer: {
    borderStyle: 'dashed',
    flex: 1,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: '#999',
    paddingVertical: heightScale(15),
    justifyContent: 'center',
    backgroundColor: '#fff',
    flexDirection: 'row',
    marginVertical: heightScale(5),
    alignItems: 'center',
  },
});

ManageBookingHolder.defaultProps = {
  date: new Date(),
};

export default ManageBookingHolder;
