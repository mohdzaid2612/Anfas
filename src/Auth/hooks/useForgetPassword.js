import {
  useState,
} from 'react'

import API from '../../utils/api'
import {
  URL,
} from '../../utils/constant'

export default () => {
  const [isLoadingForgetPassword, setLoadingForgetPassword] = useState(false)
  const [responseForgetPassword, setResponseForgetPassword] = useState({})
  const [errorForgetPassword, setErrorForgetPassword] = useState("")
  const requestForgetPassword = async payload => {
    try {
      setLoadingForgetPassword(true)
      setResponseForgetPassword({})
      setErrorForgetPassword("")
      const response = await API({
        method: "POST",
        url: URL.FORGET_PASSWORD,
        data: payload
      })
      const {
        otp_sent,
        secret,
        message,
      } = response
      setLoadingForgetPassword(false)
      if (otp_sent === false && secret === null) {
        setResponseForgetPassword({})
        setErrorForgetPassword(message)
      }
      else {
        setResponseForgetPassword(response)
      }
    } catch (error) {
      setLoadingForgetPassword(false)
      setResponseForgetPassword({})
      setErrorForgetPassword("")
    }
  }

  return [isLoadingForgetPassword, responseForgetPassword, errorForgetPassword, requestForgetPassword]
}