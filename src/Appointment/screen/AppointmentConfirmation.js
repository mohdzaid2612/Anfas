import React from 'react'

import {
  useNavigationParam,
  useNavigation,
} from 'react-navigation-hooks'

import get from 'lodash/get'

import AppointmentConfirmationHolder from '../component/AppointmentConfirmationHolder'

const AppointmentConfirmation = () => {

  const navigation = useNavigation()

  const appointmentInfo = useNavigationParam("appointmentInfo")
  const type = useNavigationParam("type")
  const variant = useNavigationParam("variant", "Appointment")
  const selectedPackage = useNavigationParam("selectedPackage", {})

  const date = get(appointmentInfo, "appointment.date", new Date())
  const patientName = get(appointmentInfo, "appointment.patient.name", "")

  const onBackPress = () => {
    navigation.popToTop()
  }

  console.debug(date)

  return (
    <AppointmentConfirmationHolder
      date={date}
      onBackPress={onBackPress}
      patientName={patientName}
      type={type}
      variant={variant}
      selectedPackage={selectedPackage}
    />
  )

}

export default AppointmentConfirmation