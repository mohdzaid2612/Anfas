import React, {useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';

import moment from 'moment';
import ActionSheet from 'react-native-actionsheet';

import BackIcon from '../../../components/BackButton';
import Button from '../../../components/Button';

import {widthScale, heightScale} from '../../../utils/dimensionHelper';

import {showImagePicker} from '../../../utils/imagePicker';

import UnisexIcon from '../../../assets/Appointment/avatar_patient/unisex.svg';
import LocationSVG from '../../../assets/Booking/location.svg';
import DateTimeSVG from '../../../assets/Booking/dateTime.svg';
import PackageBackGround from '../../../assets/Booking/packageBorder.png';
import UploadPhotoIcon from '../../../assets/Booking/uploadPhoto.svg';
import RemoveIcon from '../../../assets/Booking/remove.svg';

import Loader from '../../../components/Loader';
import ErrorView from '../../../components/ErrorView';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {getButtonBackGround} from '../../../utils/colorHelper';

const AddPatientDetailHolder = props => {
  const {
    onBackPress,
    patientName,
    selectedService,
    dateSelected,
    address,
    packageName,
    packagePrice,
    selectedPhotos,
    onPhotosSelected,
    onDeletePhoto,
    onConfirm,
    reason,
    onTextChange,
    isLoading,
    error,
    onEditClicked,
  } = props;

  const formattedTime = moment(dateSelected)
    .utc(true)
    .format('MMM DD, YYYY HH:mm A');

  const actionSheetRef = useRef(null);

  const selectPhotos = () => {
    if (actionSheetRef && actionSheetRef.current) {
      actionSheetRef.current.show();
    }
  };

  const renderHeader = () => {
    return (
      <View style={styles.headerHolder}>
        <View style={styles.headerContainer}>
          <BackIcon
            onBackPress={onBackPress}
            containerStyle={styles.backButtonContainer}
          />
          <Text style={styles.headerTitle}>Booking Details</Text>
        </View>
      </View>
    );
  };

  const renderPatientDetail = () => {
    return (
      <View style={styles.patientContainer}>
        <UnisexIcon width={50} height={50} />
        <View style={styles.patientInfoHolder}>
          <View>
            <Text style={styles.patientNameText}>{patientName}</Text>
            <Text
              style={
                styles.selectedServiceText
              }>{`For ${selectedService}`}</Text>
          </View>
          <Text
            style={styles.changePatientText}
            onPress={() => onEditClicked('patient')}>
            Change Patient
          </Text>
        </View>
      </View>
    );
  };

  const renderBookingDetails = () => {
    return (
      <View style={styles.bookingDetailContainer}>
        <Text style={styles.bookingDetailText}>Booking details</Text>
        <View style={styles.bookingItemContainer}>
          <DateTimeSVG width={20} height={20} />
          <View style={styles.bookingItemHolder}>
            <View style={styles.bookingInfoDetailContainer}>
              <Text style={styles.bookingItemTitle}>Date & Time</Text>
              <Text
                style={styles.editText}
                onPress={() => onEditClicked('time')}>
                Edit
              </Text>
            </View>
            <Text style={styles.bookingItemSubTitle}>{formattedTime}</Text>
          </View>
        </View>
        <View style={styles.bookingItemContainer}>
          <LocationSVG width={20} height={20} />
          <View style={styles.bookingItemHolder}>
            <View style={styles.bookingInfoDetailContainer}>
              <Text style={styles.bookingItemTitle}>Address</Text>
              <Text
                style={styles.editText}
                onPress={() => onEditClicked('address')}>
                Edit
              </Text>
            </View>
            <Text style={styles.bookingItemSubTitle}>{address}</Text>
          </View>
        </View>
      </View>
    );
  };

  const renderProblemContainer = () => {
    return (
      <View style={styles.bookingDetailContainer}>
        <Text style={styles.bookingDetailText}>Write your problem</Text>
        <TextInput
          multiline={true}
          placeholder="Tell doctor about your problem..."
          underlineColorAndroid="transparent"
          style={styles.textAreaContainer}
          value={reason}
          onChangeText={onTextChange}
        />
      </View>
    );
  };

  const renderPackageDetail = () => {
    return (
      <View style={styles.bookingDetailContainer}>
        <View style={styles.packageHeader}>
          <Text style={styles.bookingDetailText}>Package details</Text>
          <Text
            style={styles.editText}
            onPress={() => onEditClicked('package')}>
            Edit
          </Text>
        </View>
        <View
          style={{
            width: '100%',
            marginTop: heightScale(16),
            backgroundColor: '#f5a261',
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
            uri: item.uri,
          }}
        />
        <View
          style={{
            position: 'absolute',
            top: 0,
            right: 5,
          }}>
          <TouchableOpacity onPress={() => onDeletePhoto(index)}>
            <RemoveIcon width={20} height={20} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderPhotoComponent = () => {
    return (
      <View style={styles.bookingDetailContainer}>
        <TouchableOpacity onPress={selectPhotos}>
          <View style={styles.uploadPhotoContainer}>
            <MaterialCommunityIcons name="image-plus" size={28} color="#ddd" />
            <Text style={styles.uploadPhotoText}>Upload Photo</Text>
          </View>
        </TouchableOpacity>
        <FlatList
          data={selectedPhotos}
          renderItem={renderPhotoList}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => `image${index}`}
          contentContainerStyle={styles.imageItem}
        />
      </View>
    );
  };

  const renderButton = () => {
    return (
      <View
        style={{
          backgroundColor: '#fff',
        }}>
        <Button
          buttonTitle="Confirm"
          buttonStyle={styles.buttonStyle}
          onPress={onConfirm}
        />
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
      <Loader isLoading={isLoading} />
      {renderHeader()}
      <ScrollView>
        <ErrorView message={error} />
        {renderPatientDetail()}
        {renderBookingDetails()}
        {renderProblemContainer()}
        {renderPackageDetail()}
        {renderPhotoComponent()}
      </ScrollView>
      {renderButton()}
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
  patientContainer: {
    paddingTop: heightScale(16),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: widthScale(20),
    paddingBottom: heightScale(30),
    // borderWidth: 1
  },
  patientInfoHolder: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: widthScale(16),
    flex: 1,
  },
  patientNameText: {
    fontFamily: 'HKGrotesk-Bold',
    fontSize: 20,
    lineHeight: 24,
    color: '#0B152D',
  },
  selectedServiceText: {
    fontFamily: 'HKGrotesk-Regular',
    fontSize: 12,
    lineHeight: 14,
    color: 'rgba(56, 58, 105, 0.62)',
    letterSpacing: 0.02,
    marginTop: heightScale(6),
  },
  changePatientText: {
    fontFamily: 'HKGrotesk-Bold',
    fontSize: 14,
    lineHeight: 24,
    color: getButtonBackGround(),
    letterSpacing: 0.12,
  },
  bookingDetailContainer: {
    backgroundColor: '#fff',
    paddingTop: heightScale(24),
    paddingBottom: heightScale(20),
    paddingHorizontal: widthScale(20),
    marginTop: heightScale(2),
  },
  bookingDetailText: {
    fontFamily: 'HKGrotesk-Bold',
    fontSize: 18,
    lineHeight: 20,
    color: '#000',
  },
  bookingItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: heightScale(24),
  },
  bookingItemHolder: {
    marginLeft: widthScale(12),
    flex: 1,
  },
  bookingItemTitle: {
    fontFamily: 'HKGrotesk-Bold',
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '600',
    color: '#0B152D',
  },
  bookingItemSubTitle: {
    fontFamily: 'HKGrotesk-Regular',
    fontSize: 14,
    lineHeight: 22,
    color: '#4B5879',
  },
  editText: {
    fontFamily: 'HKGrotesk-Bold',
    fontSize: 14,
    lineHeight: 20,
    color: getButtonBackGround(),
    letterSpacing: 0.12,
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
    borderColor: '#000',
    paddingVertical: heightScale(15),
    justifyContent: 'center',
    backgroundColor: '#fff',
    flexDirection: 'row',
  },
  buttonStyle: {
    marginVertical: heightScale(16),
    marginHorizontal: widthScale(20),
  },
  imageItem: {
    marginTop: heightScale(16),
  },
  bookingInfoDetailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

AddPatientDetailHolder.defaultProps = {
  patientName: 'Marvin M.',
  selectedService: 'nursing care',
  dateSelected: new Date(),
  address: 'Jessica, 6391 Elgin St. Celina, Delaware 10299',
  packageName: 'Home Care Visit by GP w/Nurse',
  packagePrice: '840',
};

export default AddPatientDetailHolder;
