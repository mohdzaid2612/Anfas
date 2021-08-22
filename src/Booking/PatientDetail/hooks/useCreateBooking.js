import {
  useState,
} from 'react'
import RNFetchBlob from 'rn-fetch-blob'

import {
  URL
} from '../../../utils/constant'

import store from '../../../Store'

export default () => {
  const [createBookingState, setCreateBookingState] = useState({
    isLoading: false,
    response: {},
    error: ""
  })

  const createBooking = async data => {
    try {
      setCreateBookingState({
        isLoading: true,
        response: {},
        error: ""
      })
      const response = await RNFetchBlob.fetch("POST", `http://ec2-3-128-155-225.us-east-2.compute.amazonaws.com:8000/${URL.CREATE_BOOKING}`, {
        'Content-Type' : 'multipart/form-data',
        "Authorization" : `Bearer ${store.getState().auth.token}`,
      }, data)
      setCreateBookingState({
        isLoading: false,
        response: response.json(),
        error: ""
      })
    } catch (error) {
      setCreateBookingState({
        isLoading: false,
        response: {},
        error: error.message
      })
    }
  }
  return [createBookingState, createBooking]
}
