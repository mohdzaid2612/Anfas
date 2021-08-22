import {
  useState,
} from 'react'
    
import API from '../../utils/api'
import {
  URL,
} from '../../utils/constant'
    
export default () => {
  const [isLoadingResetPassword, setLoadingResetPassword] = useState(false)
  const [responseResetPassword, setResponseResetPassword] = useState({})
  const [errorResetPassword, setErrorResetPassword] = useState("")
  const requestResetPassword = async payload => {
    try {
      setLoadingResetPassword(true)
      setResponseResetPassword({})
      setErrorResetPassword("")
      const response = await API({
        method: "POST",
        url: URL.RESET_PASSWORD,
        data: payload
      })
      setLoadingResetPassword(false)
      setResponseResetPassword(response)
    } catch (error) {
      setLoadingResetPassword(false)
      setResponseResetPassword({})
      setErrorResetPassword(error)
    }
  }

  return [isLoadingResetPassword, responseResetPassword, errorResetPassword, requestResetPassword]
}