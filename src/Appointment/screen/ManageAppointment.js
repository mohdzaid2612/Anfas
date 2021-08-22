import React, {
  useEffect,
  useState,
} from 'react'

import {
  useSelector,
} from 'react-redux'

import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'

import useFetchAppointmentDetails from '../hooks/useFetchAppointmentDetails'
import ManageAppointmentHolder from '../component/ManageAppointment'

import useCancelAppointment from '../hooks/useCancelAppointment'

import CancelPopUp from '../../components/CancelPopUp'

import {
  usePrevious
} from '../../utils/usePreviousValue'

import {
  APPOINTMENT_MODE,
} from '../../utils/constant'

import {
  getAppointmentStatus
} from '../../utils/dataHelper'

const ManageAppointment = props => {
  const {
    navigation,
  } = props

  const [showCancelPopUp, setShowCancelPopUp] = useState(false)

  const {
    user,
  } = useSelector(state => state.auth)

  const appointmentID = navigation.getParam("appointmentID", "")
  const role = get(user, "role", "")

  const [
    isLoadingAppointmentDetail,
    appointmentDetail,
    errorAppointmentDetail,
    fetchAppointmentDetail
  ] = useFetchAppointmentDetails()

  const [
    cancelledApiState,
    cancelAppointment
  ] = useCancelAppointment()

  const prevCancellationState = usePrevious(cancelledApiState.isCancelleingAppointment)

  useEffect(() => {
    if (appointmentID) {
      fetchAppointmentDetail({appointmentID})
    }
  }, [])

  useEffect(() => {
    if (!cancelledApiState.isCancelleingAppointment && prevCancellationState && cancelledApiState.errorCancelledApi === "") {
      if (!isEmpty(cancelledApiState.responseCancelledApi)) {
        const body = {
          appointment: {
            date: get(appointmentDetail, "date", "")
          }
        }
        navigation.navigate("AppointmentConfirmation", {
          appointmentInfo: body,
          type: "CANCELLED",
          variant: "Appointment",
        })
      }
    }
  }, [prevCancellationState, cancelledApiState.isCancelleingAppointment, cancelledApiState.errorCancelledApi])

  const onBackPress = () => {
    navigation.goBack()
  }

  const onCancelButtonClicked =  () => {
    setShowCancelPopUp(true)
  }

  const onRescheduleButtonClicked = () => {
    const patientID = get(appointmentDetail, "patient.id", "")
    const payload = {
      appointment_id: appointmentID,
      patientID,
      type: "RESCHEDULE"
    }
    navigation.navigate("AddAppointment", payload)
  }

  const parseResponse = () => {
    let doctorName = ''
    let patientName = ''
    let date = ''
    let apointmentType = ''
    let speciality = ''
    let appointmentStatus = ''
    if (!isEmpty(appointmentDetail)) {
      appointmentStatus = getAppointmentStatus(get(appointmentDetail, "status", ""))
      patientName = get(appointmentDetail, "patient.name", "")
      let doctorFirstName = get(appointmentDetail, "assigned_to.first_name", "")
      let doctorLastName = get(appointmentDetail, "assigned_to.last_name", "")
      speciality = get(appointmentDetail, "assigned_to.department", "")
      if (doctorFirstName !== "" || doctorLastName !== "" ) {
        doctorName = `Dr. ${doctorFirstName} ${doctorLastName}`
      }
      date = get(appointmentDetail, "date", "")
      let apointment_mode = get(appointmentDetail, "apointment_mode", "")
      if (apointment_mode === "1") {
        apointmentType = "Video"
      } else if (apointment_mode === "0") {
        apointmentType = "In Person"
      }
    }
    return {
      doctorName,
      patientName,
      date,
      apointmentType,
      speciality,
      appointmentStatus,
    }
  }

  const {
    doctorName,
    patientName,
    date,
    apointmentType,
    speciality,
    appointmentStatus
  } = parseResponse()

  const showAppointmentActionButton = ((role === "patientuser") && (appointmentStatus !== APPOINTMENT_MODE.COMPLETED) && (appointmentStatus !== APPOINTMENT_MODE.CANCELLED))

  const onCancelClicked = reason => {
    setShowCancelPopUp(false)
    const payload = {
      appointment_id: appointmentID,
      cancel_reason: reason
    }
    cancelAppointment(payload)
  }

  const onCloseClicked = () => {
    setShowCancelPopUp(false)
  }


  return (
    <>
      <ManageAppointmentHolder
        appointmentStatus={appointmentStatus}
        onBackPress={onBackPress}
        doctorName={doctorName}
        patientName={patientName}
        isLoading={isLoadingAppointmentDetail || cancelledApiState.isCancelleingAppointment}
        error={errorAppointmentDetail || cancelledApiState.errorCancelledApi}
        date={date}
        apointmentType={apointmentType}
        speciality={speciality}
        showAppointmentActionButton={showAppointmentActionButton}
        onRescheduleButtonClicked={onRescheduleButtonClicked}
        onCancelButtonClicked={onCancelButtonClicked}
      />
      <CancelPopUp
        isVisible={showCancelPopUp}
        onCancelClicked={onCancelClicked}
        onCloseClicked={onCloseClicked}
      />
    </>
  )
}

export default ManageAppointment