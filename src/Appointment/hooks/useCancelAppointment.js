import {
  useState,
} from 'react'

import API from '../../utils/api'
import {
  URL,
} from '../../utils/constant'

export default () => {
  const [cancelledApiState, setCancelledApi] = useState({
      isCancelleingAppointment: false,
      responseCancelledApi: {},
      errorCancelledApi: ""
    })

  const cancelAppointment = async payload => {
    try {
      setCancelledApi({
        isCancelleingAppointment: true,
        responseCancelledApi: {},
        errorCancelledApi: ""
      })
      const response = await API({
        method: "POST",
        url: URL.CANCEL_APPOINTMENT,
        data: payload
      })
      setCancelledApi({
        isCancelleingAppointment: false,
        responseCancelledApi: response,
        errorCancelledApi: ""
      })
    } catch (error) {
      setCancelledApi({
        isCancelleingAppointment: false,
        responseCancelledApi: {},
        errorCancelledApi: error
      })
    }
  }

  return [cancelledApiState, cancelAppointment]
}