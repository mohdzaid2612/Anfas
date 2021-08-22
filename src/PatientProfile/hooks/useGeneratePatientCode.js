import {
  useState,
} from 'react'

import API from '../../utils/api'
import {
  URL,
} from '../../utils/constant'

export default () => {
  const [generatePatientCodeState, setGeneratePatientCode] = useState({
    isLoading: false,
    response: {},
    error: ""
  })

  const generatePatientCode = async payload => {
    try {
      setGeneratePatientCode({
        isLoading: true,
        response: {},
        error: ""
      })
      const response = await API({
        method:"POST",
        url: URL.GENERATE_PATIENT_CODE,
        data: payload
      })
      if (response && response.allowed) {
        setGeneratePatientCode({
          isLoading: false,
          response: response,
          error: ""
        })
      } else {
        setGeneratePatientCode({
          isLoading: false,
          response: response,
          error: response.message
        })
      }
    } catch (error) {
      setGeneratePatientCode({
        isLoading: false,
        response: {},
        error
      })
    }
  }

  return [generatePatientCodeState, generatePatientCode]
}