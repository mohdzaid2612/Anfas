import React from 'react';
import {Text, View} from 'react-native';

import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import HomeScreen from '../Home/screen/HomeScreen';
import AppointmentHistory from '../Appointment/screen/AppointmentHistory';
import PatientHistory from '../PatientHistory/screen/PatientHistory';
import PatientSearch from '../PatientSearch/screen/PatientSearch';
import SelectCategory from '../PatientSearch/component/SelectCategory';
import ManageAppointment from '../Appointment/screen/ManageAppointment';
import VideoCall from '../VideoCall/VideoCall';
import Video from '../VideoCall/Video';

import AddAppointment from '../AddAppointment/screen/AddAppointment';
import AddPatient from '../AddPatient/screen/AddPatient';
import PatientProfile from '../PatientProfile/screen/PatientProfile';
import AppointmentConfirmation from '../Appointment/screen/AppointmentConfirmation';

import BookingDetail from '../Booking/BookingDetail/screen/BookingDetail';
import AddPatientDetail from '../Booking/PatientDetail/screen/AddPatientDetail';
import SlotSelection from '../Booking/SlotSelection/screen/SlotSelection';
import PackageSelection from '../Booking/PackageSelection/screen/PackageSelection';
import ManageBooking from '../Booking/ManageBooking/screen/ManageBooking';

import HomeUnSelected from '../assets/Appointment/ic_home_unselected.svg';
import AppointmentSelected from '../assets/Appointment/ic_appointment_selected.svg';
import AppointmentUnSelected from '../assets/Appointment/ic_appointment.svg';
import HomeSelected from '../assets/Auth/homeSelected.svg';

import IconAddPatient from '../assets/Auth/ic_add.svg';

import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {getButtonBackGround} from '../utils/colorHelper';

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    Video: Video,
    VideoCall: VideoCall,
    PatientHistory,
    PatientSearch,
    SelectCategory,
    ManageAppointment,
    PatientProfile,
    AddPatient,
    AppointmentConfirmation,
    BookingDetail,
    AddPatientDetail,
    SlotSelection,
    PackageSelection,
  },
  {
    headerMode: 'none',
    initialRouteName: 'Home',
  },
);

const AppointmentCreationStack = createStackNavigator(
  {
    AddPatient,
    AddAppointment,
    AppointmentConfirmation,
  },
  {
    headerMode: 'none',
    initialRouteName: 'AddAppointment',
  },
);

const AppointmentStack = createStackNavigator(
  {
    AppointmentHistory,
    ManageAppointment,
    AddAppointment,
    AppointmentConfirmation,
    ManageBooking,
    AddPatientDetail,
    SlotSelection,
  },
  {
    headerMode: 'none',
    initialRouteName: 'AppointmentHistory',
  },
);

HomeStack.navigationOptions = ({navigation}) => {
  return getNavigationOptions(navigation, 'Home');
};

AppointmentStack.navigationOptions = ({navigation}) => {
  return getNavigationOptions(navigation, 'Appointment');
};

AppointmentCreationStack.navigationOptions = ({navigation}) => {
  return getNavigationOptions(navigation, 'Add Appointment');
};

export const DoctorMainStack = createBottomTabNavigator(
  {
    Home: HomeStack,
    Appointment: AppointmentStack,
  },
  {
    tabBarOptions: {
      inactiveBackgroundColor: 'white',
      activeBackgroundColor: 'white',
      activeTintColor: '#FFBD3D',
      allowFontScaling: true,
      safeAreaInset: {bottom: 'never'},
      adaptive: true,
      labelStyle: {fontFamily: 'SFProText-Regular'},
      showLabel: false,
    },
  },
);

export const PatientMainStack = createBottomTabNavigator(
  {
    Home: HomeStack,
    AppointmentCreationStack,
    Appointment: AppointmentStack,
  },
  {
    tabBarOptions: {
      inactiveBackgroundColor: 'white',
      activeBackgroundColor: 'white',
      activeTintColor: '#FFBD3D',
      allowFontScaling: true,
      safeAreaInset: {bottom: 'never'},
      adaptive: true,
      labelStyle: {fontFamily: 'SFProText-Regular'},
      showLabel: false,
    },
  },
);

const getNavigationOptions = (navigation, title) => {
  let tabBarVisible = true;
  if (
    navigation.state.index > 0 ||
    navigation.state.key === 'AppointmentCreationStack'
  ) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
    tabBarLabel: title,
    tabBarIcon: ({focused}) => getTabBarIcon(focused, title),
  };
};

const getTabBarIcon = (focused, title) => {
  if (title === 'Add Appointment') {
    return (
      <View
        style={{
          position: 'absolute',
          bottom: 15,
        }}>
        <IconAddPatient
          width={70}
          height={70}
          fill={'#000'}
          // color='red'
        />
      </View>
    );
  }

  if (focused) {
    if (title === 'Home') {
      return (
        <View style={{alignItems: 'center'}}>
          <SimpleLineIcons
            name="home"
            style={{fontSize: 20, color: getButtonBackGround()}}
          />
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 12,
              color: getButtonBackGround(),
            }}>
            Home
          </Text>
        </View>
      );
    } else if (title === 'Appointment') {
      return (
        <View style={{alignItems: 'center'}}>
          <SimpleLineIcons
            name="calendar"
            style={{fontSize: 20, color: getButtonBackGround()}}
          />
          <Text
            style={{
              fontWeight: 'bold',
              color: getButtonBackGround(),
              fontSize: 12,
            }}>
            Appointment
          </Text>
        </View>
      );
    }
  } else {
    if (title === 'Home') {
      return (
        <SimpleLineIcons name="home" style={{fontSize: 20, color: '#999'}} />
      );
    } else if (title === 'Appointment') {
      return (
        <SimpleLineIcons
          name="calendar"
          style={{fontSize: 20, color: '#999'}}
        />
      );
    }
  }
};
