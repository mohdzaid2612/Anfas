import {
  useState,
} from 'react'
  
import API from '../../utils/api'
import {
  URL,
} from '../../utils/constant'
  
export default () => {
  const [isLoadingResendPassword, setLoadingResendPassword] = useState(false)
  const [responseResendPassword, setResponseResendPassword] = useState({})
  const [errorResendPassword, setErrorResendPassword] = useState("")
  const requestResendPassword = async payload => {
    try {
      setLoadingResendPassword(true)
      setResponseResendPassword({})
      setErrorResendPassword("")
      const response = await API({
          method: "POST",
          url: URL.RESEND_OTP,
          data: payload
      })
      const {
        otp_sent,
        secret,
        message,
      } = response
      setLoadingResendPassword(false)
      if (otp_sent === false && secret === null) {
        setResponseResendPassword({})
        setErrorResendPassword(message)
      }
      else {
        setResponseResendPassword(response)
      }
    } catch (error) {
        setLoadingResendPassword(false)
        setResponseResendPassword({})
        setErrorResendPassword("")
      }
  }

  return [isLoadingResendPassword, responseResendPassword, errorResendPassword, requestResendPassword]
}