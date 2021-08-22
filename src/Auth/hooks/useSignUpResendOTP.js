import {
  useState,
} from 'react'
    
import API from '../../utils/api'
import {
  URL,
} from '../../utils/constant'
    
export default () => {
  const [isLoadingSignUpResendOTP, setLoadingSignUpResendOTP] = useState(false)
  const [responseSignUpResendOTP, setResponseSignUpResendOTP] = useState({})
  const [errorSignUpResendOTP, setErrorSignUpResendOTP] = useState("")
  const requestSignUpResendOTP = async payload => {
    try {
      setLoadingSignUpResendOTP(true)
      setResponseSignUpResendOTP({})
      setErrorSignUpResendOTP("")
      const response = await API({
        method: "POST",
        url: URL.SIGNUP_RESEND_OTP,
        data: payload
      })
      const {
        otp_sent,
        secret,
        message,
      } = response
      setLoadingSignUpResendOTP(false)
      if (otp_sent === false && secret === null) {
        setResponseSignUpResendOTP({})
        setErrorSignUpResendOTP(message)
      }
      else {
        setResponseSignUpResendOTP(response)
      }
    } catch (error) {
      setLoadingSignUpResendOTP(false)
      setResponseSignUpResendOTP({})
      setErrorSignUpResendOTP("")
    }
  }

  return [isLoadingSignUpResendOTP, responseSignUpResendOTP, errorSignUpResendOTP, requestSignUpResendOTP]
}