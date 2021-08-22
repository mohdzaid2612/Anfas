import {
  useState,
} from 'react'

import API from '../../utils/api'
import {
  URL,
} from '../../utils/constant'

export default () => {
  const [rescheduleAPIState, setRescheduleAPIState] = useState({
    isReschedulingAPI: false,
    responseReschedulingAPI: {},
    errorReschedulingAPI: ""
  })

  const rescheduleAppointment = async payload => {
    try {
      setRescheduleAPIState({
        isReschedulingAPI: true,
        responseReschedulingAPI: {},
        errorReschedulingAPI: "",
      })
      const response = await API({
        method: "PUT",
        url: URL.RESCHEDULE_APPOINTMENT,
        data: payload
      })
      setRescheduleAPIState({
        isReschedulingAPI: false,
        responseReschedulingAPI: response,
        errorReschedulingAPI: "",
      })
    } catch (error) {
      setRescheduleAPIState({
        isReschedulingAPI: false,
        responseReschedulingAPI: {},
        errorReschedulingAPI: error,
      })
    }
  }

  return [rescheduleAPIState, rescheduleAppointment]
}