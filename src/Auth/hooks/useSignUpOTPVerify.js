import {
  useState,
} from 'react'
    
import API from '../../utils/api'
import {
  URL,
} from '../../utils/constant'
    
export default () => {
  const [isLoadingSignUpOTPVerify, setLoadingSignUpOTPVerify] = useState(false)
  const [responseSignUpOTPVerify, setResponseSignUpOTPVerify] = useState({})
  const [errorSignUpOTPVerify, setErrorSignUpOTPVerify] = useState("")
  const requestSignUpOTPVerify = async payload => {
    try {
      setLoadingSignUpOTPVerify(true)
      setResponseSignUpOTPVerify({})
      setErrorSignUpOTPVerify("")
      const response = await API({
        method: "POST",
        url: URL.SIGNUP_OTP_VERIFY,
        data: payload
      })
      setLoadingSignUpOTPVerify(false)
      setResponseSignUpOTPVerify(response)
    } catch (error) {
      setLoadingSignUpOTPVerify(false)
      setResponseSignUpOTPVerify({})
      setErrorSignUpOTPVerify(error)
    }
  }

return [isLoadingSignUpOTPVerify, responseSignUpOTPVerify, errorSignUpOTPVerify, requestSignUpOTPVerify]
}