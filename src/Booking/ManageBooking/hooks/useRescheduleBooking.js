import {
  useState,
} from 'react'
  
import API from '../../../utils/api'
    
import {
  URL,
} from '../../../utils/constant'
    
export default () => {
  const [rescheduleBookingState, setRescheduleBookingState] = useState({
    isLoading: false,
    response: [],
    error: ""
  })

  const rescheduleBooking = async payload => {
    try {
      setRescheduleBookingState({
        isLoading: true,
        response: {},
        error: "",
      })
      const response = await API({
        url: URL.RESCHEDULE_BOOKING,
        method: "PUT",
        data:payload
      })
      setRescheduleBookingState({
        isLoading: false,
        response,
        error: "",
      })
    } catch (error) {
      setRescheduleBookingState({
        isLoading: false,
        response: {},
        error,
      })
    }
  }

  return [rescheduleBookingState, rescheduleBooking]
}