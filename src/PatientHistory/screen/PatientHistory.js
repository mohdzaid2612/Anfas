import React, {
  useEffect,
} from 'react'
import {
  useNavigationParam,
} from 'react-navigation-hooks'
import {
  useSelector,
} from 'react-redux'

import get from 'lodash/get'

import PatientHistoryHolder from '../component/PatientHistoryHolder'
import usePatientDetails from '../hooks/usePatientDetail'

const PatientHistory = props => {
  const {
    navigation,
  } = props

  const [
    isLoadingPatientDetail,
    patientDetailResponse,
    errorPatientDetailResponse,
    fetchPatientDetail
  ] = usePatientDetails()

  const {
    user,
    selectedPatient
  } = useSelector(state => state.auth)

  const patient = useNavigationParam("patient")
  
  const role = get(user, "role", "")
  const doctorID = get(user, "id", "")

  useEffect(() => {
    let selectedDoctorID = ""
    let selectedPatientID = ""

    const {
      id,
    } = patient

    if (role === "doctor") {
      selectedPatientID = id,
      selectedDoctorID = doctorID
    }
    else if (role === "patientuser") {
      selectedPatientID = selectedPatient.id,
      selectedDoctorID = id
    }
    const payload = {
      patientID: selectedPatientID,
      doctorID: selectedDoctorID
    }
    fetchPatientDetail(payload)
  }, [])

  const getData = () => {
    let data = []
    const upcomingData = get(patientDetailResponse, "upcoming", [])
    const completedData = get(patientDetailResponse, "completed", [])
    const patient = get(patientDetailResponse, "patient", {})
    const doctor = get(patientDetailResponse, "doctor", {})
    if (upcomingData && upcomingData.length > 0) {
      data = [
        ...data,
        {
          title: "Upcoming appoinments",
          data: upcomingData
        },
      ]
    }
    if (completedData && completedData.length > 0) {
      data = [
        ...data,
        {
          title: "Completed appoinments",
          data: completedData
        },
      ]
    }
    return {
      patient,
      appointment: data,
      doctor
    }
  }

  const onBackPress = () => {
    navigation.goBack()
  }

  const onAppointmentClicked = item => {
    const {
      id,
    } = item
    navigation.navigate("ManageAppointment", {
      appointmentID: id
    })
  }

  return (
    <PatientHistoryHolder
      data={getData()}
      onBackPress={onBackPress}
      onAppointmentClicked={onAppointmentClicked}
      isLoading={isLoadingPatientDetail}
      error={errorPatientDetailResponse}
      role={role}
    />
  )
}

export default PatientHistory