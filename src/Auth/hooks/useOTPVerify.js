import {
  useState,
} from 'react'
  
import API from '../../utils/api'
import {
  URL,
} from '../../utils/constant'
  
export default () => {
  const [isLoadingOTPVerify, setLoadingOTPVerify] = useState(false)
  const [responseOTPVerify, setResponseOTPVerify] = useState({})
  const [errorOTPVerify, setErrorOTPVerify] = useState("")
  const requestOTPVerify = async payload => {
    try {
      setLoadingOTPVerify(true)
      setResponseOTPVerify({})
      setErrorOTPVerify("")
      const response = await API({
        method: "POST",
        url: URL.VERIFY_OTP,
        data: payload
      })
      setLoadingOTPVerify(false)
      setResponseOTPVerify(response)
    } catch (error) {
      setLoadingOTPVerify(false)
      setResponseOTPVerify({})
      setErrorOTPVerify(error)
    }
  }

  return [isLoadingOTPVerify, responseOTPVerify, errorOTPVerify, requestOTPVerify]
}