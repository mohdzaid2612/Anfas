import {
  useState,
} from 'react'

import API from '../../../utils/api'
  
import {
  URL,
} from '../../../utils/constant'
  
export default () => {
  const [cancelBookingState, setCancelBookingState] = useState({
    isLoading: false,
    response: [],
    error: ""
  })

  const cancelBooking = async payload => {
    try {
      setCancelBookingState({
        isLoading: true,
        response: {},
        error: "",
      })
      const response = await API({
        url: URL.CANCEL_BOOKING,
        method: "POST",
        data:payload
      })
      setCancelBookingState({
        isLoading: false,
        response,
        error: "",
      })
    } catch (error) {
      setCancelBookingState({
        isLoading: false,
        response: {},
        error,
      })
    }
  }

  return [cancelBookingState, cancelBooking]
}