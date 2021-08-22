import {
  useState,
} from 'react'

import API from '../../utils/api'
import {
  URL,
} from '../../utils/constant'

export default () => {
  const [createAppointmentState, setCreateAppointmentState] = useState({
    isCreatingAppointment: false,
    responseCreateAppointment: {},
    errorCreateAppointment: ""
  })

  const createAppointment = async payload => {
    try {
      setCreateAppointmentState({
        isCreatingAppointment: true,
        responseCreateAppointment: {},
        errorCreateAppointment: ""
      })
      const response = await API({
        data: payload,
        url: URL.CREATE_APPOINTMENT,
        method: "POST"
      })
      setCreateAppointmentState({
        isCreatingAppointment: false,
        responseCreateAppointment: response,
        errorCreateAppointment: "",
      })
    } catch (error) {
      console.debug(error)
      setCreateAppointmentState({
        isCreatingAppointment: false,
        responseCreateAppointment: {},
        errorCreateAppointment: error,
      })
    }
  }

  return [createAppointmentState, createAppointment]
}