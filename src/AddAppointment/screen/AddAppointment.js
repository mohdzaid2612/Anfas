import React, {
  useState,
  useEffect,
} from 'react'

import {
  useSelector,
} from 'react-redux'

import moment from 'moment'
import isEmpty from 'lodash/isEmpty'

import AddAppointmentHolder from '../component/AddAppointment'
import useCreateAppointment from '../hooks/useCreateAppointment'

import useRescheduleAppointment from '../../Appointment/hooks/useRescheduleAppointment'

import {
  useNavigationParam,
} from 'react-navigation-hooks'

import {
  usePrevious
 } from '../../utils/usePreviousValue'

const AddAppointment = props => {
  const {
    navigation,
  } = props

  const {
    selectedPatient
  } = useSelector(state => state.auth)

  const [
    rescheduleAPIState,
    rescheduleAppointment
  ] = useRescheduleAppointment()

  const type = useNavigationParam("type")
  const rescheduleAppointmentID = useNavigationParam("appointment_id")
  const reschedulePatientID = useNavigationParam("patientID")

  const [form, setForm] = useState({
    "appointmentDate": moment().format(),
    "appointmentTime": moment().format(),
    "comment": "",
    "modeAppointment": "Video"
  })

  const [pickerConfig, setPickerConfig] = useState({
    mode: Platform.OS === "ios" ? "datetime": "datetime",
    display: Platform.OS === "ios" ? "spinner": "calendar",
    isVisible: false
  })

  const onDateIconSelected = () => setPickerConfig({
    ...pickerConfig,
    isVisible: true
  })

  const [errorForm, setErrorForm] = useState({
    "appointmentDate": "",
  })

  const onFormValueChanged = (key, value) => {
    if (errorForm[key]) {
      if (value) {
        let updatedErrorForm = {
          ...errorForm,
          [key]: ""
        }
        setErrorForm(updatedErrorForm)
      }
    }
    setForm(preValue => {
      const updatedFormValue = {
        ...preValue,
        [key]: value
      }
      return updatedFormValue
    })
  }

  const [
    createAppointmentState,
    createAppointment
  ] = useCreateAppointment()

  const prevIsCreatingAppointment = usePrevious(createAppointmentState.isCreatingAppointment)
  const prevIsReschedulingAppointment = usePrevious(rescheduleAPIState.isReschedulingAPI)

  useEffect(() => {
    if (createAppointmentState.isCreatingAppointment === false && prevIsCreatingAppointment === true && createAppointmentState.errorCreateAppointment === "") {
      if (!isEmpty(createAppointmentState.responseCreateAppointment)) {
        navigation.navigate("AppointmentConfirmation", {
          variant: "Appointment",
          appointmentInfo: createAppointmentState.responseCreateAppointment
        })
      }
    }
  }, [createAppointmentState.isCreatingAppointment, createAppointmentState.errorCreateAppointment, prevIsCreatingAppointment, createAppointmentState.responseCreateAppointment])

  useEffect(() => {
    if (rescheduleAPIState.isReschedulingAPI === false && prevIsReschedulingAppointment === true && rescheduleAPIState.errorReschedulingAPI === "") {
      if (!isEmpty(rescheduleAPIState.responseReschedulingAPI)) {
        navigation.navigate("AppointmentConfirmation", {
          variant: "Appointment",
          appointmentInfo: rescheduleAPIState.responseReschedulingAPI,
          type
        })
      }
    }
  }, [rescheduleAPIState.isReschedulingAPI, rescheduleAPIState.errorReschedulingAPI, prevIsReschedulingAppointment, rescheduleAPIState.rescheduleAPIState])

  const onBackPress = () => {
    navigation.goBack(null)
  }

  const onAppointmentCreateClicked = () => {
    if (isEmpty(selectedPatient)) return
    if (!checkValidation()) return
    let apointment_mode = "0"
    const mode = form["modeAppointment"]
    if (mode === "Video") {
      apointment_mode = "1"
    } else if (mode === "In Person") {
      apointment_mode = "0"
    }
    const hour = moment(form["appointmentTime"]).format("HH")
    const minute = moment(form["appointmentTime"]).format("mm")
    const dateStringUTC = `${moment(form["appointmentDate"]).startOf("day").add(hour, "hour").add(minute, "minute").format("YYYY-MM-DD HH:mm:ss")}`
    const dateUTC = moment(dateStringUTC, "YYYY-MM-DD HH:mm:ss").utc().format("YYYY-MM-DD HH:mm:ss")
    const {
      id,
    } = selectedPatient
    const payload = {
      patient: id,
      description: form["comment"],
      apointment_mode,
      payment_status: "3",
      date: dateUTC
    }
    if (type === "RESCHEDULE") {
      onRescheduleAppointment(payload)
    }
    else {
      createAppointment(payload)
    }
  }

  const onRescheduleAppointment = data => {
    const payload = {
      appointment_id: rescheduleAppointmentID,
      patient: reschedulePatientID,
      description: data.description,
      apointment_mode: data.apointment_mode,
      payment_status: "3",
      date: data.date
    }
    console.debug(payload)
    rescheduleAppointment(payload)
  }

  const checkValidation = () => {
    const keyTitleMap = {
      appointmentDateTime: "date for the appointment",
    }
    let updatedErrorForm = {}
    let isValidForm = true
    if (!form["comment"]) {
      isValidForm = false
    }
    if (!form["appointmentDate"]) {
      const errorMessage = `Please enter the ${keyTitleMap[key]}`
      updatedErrorForm = {
          ...updatedErrorForm,
          [key]: errorMessage
      }
      isValidForm = false
    }
    setErrorForm(updatedErrorForm)
    return isValidForm
  }

  return (
    <AddAppointmentHolder
      onBackPress={onBackPress}
      onAppointmentCreateClicked={onAppointmentCreateClicked}
      isLoading={createAppointmentState.isCreatingAppointment || rescheduleAPIState.isReschedulingAPI}
      error={createAppointmentState.errorCreateAppointment || rescheduleAPIState.errorReschedulingAPI}
      form={form}
      errorForm={errorForm}
      onChangeFormValue={onFormValueChanged}
      onDateIconSelected={onDateIconSelected}
      pickerConfig={pickerConfig}
      setPickerConfig={setPickerConfig}
    />
  )
}

export default AddAppointment