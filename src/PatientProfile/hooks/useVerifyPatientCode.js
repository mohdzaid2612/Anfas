import {
  useState,
} from 'react'
  
import API from '../../utils/api'
import {
  URL,
} from '../../utils/constant'
  
export default () => {
  const [verifyPatientCodeState, setVerifyPatientCode] = useState({
    isLoading: false,
    response: {},
    error: ""
  })

  const verifyPatientCode = async payload => {
    try {
      setVerifyPatientCode({
        isLoading: true,
        response: {},
        error: ""
      })
      const response = await API({
        method:"POST",
        url: URL.VERIFY_PATIENT_CODE,
        data: payload
      })
      setVerifyPatientCode({
        isLoading: false,
        response: response,
        error: ""
      })
    } catch (error) {
      setVerifyPatientCode({
        isLoading: false,
        response: {},
        error
      })
    }
  }

  return [verifyPatientCodeState, verifyPatientCode]
}