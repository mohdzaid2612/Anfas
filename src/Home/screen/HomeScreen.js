import React, {useCallback} from 'react';
import {useSelector} from 'react-redux';
import {useFocusEffect} from 'react-navigation-hooks';

import get from 'lodash/get';

import HomeHolder from '../component/HomeHolder';

import useDoctorDashboard from '../hooks/useDoctorDashboard';
import useFetchActiveService from '../hooks/useFetchActiveService';

const HomeScreen = props => {
  const {navigation} = props;

  const {user} = useSelector(state => state.auth);

  const [
    isLoadingDoctorDashboard,
    doctorDashboardResponse,
    errorDoctorDashboard,
    fetchDoctorDashboard,
  ] = useDoctorDashboard();

  const [activeServiceState, fetchActiveService] = useFetchActiveService();

  useFocusEffect(
    useCallback(() => {
      fetchDoctorDashboard();
      if (role === 'patientuser') {
        fetchActiveService();
      }
    }, []),
  );

  const firstName = get(user, 'first_name', '');
  const lastName = get(user, 'last_name', '');
  const role = get(user, 'role', '');

  const getHomeTitle = () => {
    if (role === 'doctor') {
      return `Hi Dr. ${firstName} ${lastName}`;
    } else if (role === 'patientuser') {
      return `${firstName} ${lastName}`;
    }
  };

  const name = getHomeTitle();

  const onSearchPress = () => {
    navigation.navigate('PatientSearch');
  };

  const onAppointmentClicked = item => {
    const {id} = item;
    navigation.navigate('ManageAppointment', {
      appointmentID: id,
    });
  };

  const getData = () => {
    let data = [];
    const upcomingData = get(doctorDashboardResponse, 'upcoming', []);
    const completedData = get(doctorDashboardResponse, 'completed', []);
    if (upcomingData && upcomingData.length > 0) {
      data = [
        ...data,
        {
          title: 'Upcoming consultation',
          data: upcomingData,
        },
      ];
    }
    if (completedData && completedData.length > 0) {
      data = [
        ...data,
        {
          title: 'Previous consultation',
          data: completedData,
        },
      ];
    }
    return data;
  };

  const onProfileIconClicked = () => {
    navigation.navigate('PatientProfile');
  };
  const onVideoCallClicked = () => {
    navigation.navigate('VideoCall');
  };

  const onExploreClicked = data => {
    navigation.navigate('BookingDetail', {
      data,
    });
  };
  const selectedCategory = name => {
    console.log(name);
    navigation.navigate('SelectCategory', {
      type: name,
    });
  };

  return (
    <>
      <HomeHolder
        onVideoCallClicked={onVideoCallClicked}
        selectedCategory={selectedCategory}
        name={name}
        data={getData()}
        onSearchPress={onSearchPress}
        onAppointmentClicked={onAppointmentClicked}
        error={errorDoctorDashboard || activeServiceState.error}
        isLoading={isLoadingDoctorDashboard || activeServiceState.isLoading}
        role={role}
        onProfileIconClicked={onProfileIconClicked}
        activeService={activeServiceState.activeService}
        onExploreClicked={onExploreClicked}
      />
    </>
  );
};

export default HomeScreen;
