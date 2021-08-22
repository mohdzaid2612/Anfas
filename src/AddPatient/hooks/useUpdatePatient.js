import {
  useState,
} from 'react'
    
import API from '../../utils/api'
      
import {
  URL,
} from '../../utils/constant'
      
export default () => {
  const [updatePatientState, setUpdatePatientState] = useState({
    isLoading: false,
    response: [],
    error: ""
  })

  const updatePatient = async payload => {
    try {
      setUpdatePatientState({
        isLoading: true,
        response: {},
        error: "",
      })
      const response = await API({
        url: URL.UPDATE_PATIENT,
        method: "PUT",
        data:payload
      })
      setUpdatePatientState({
        isLoading: false,
        response,
        error: "",
      })
    } catch (error) {
      setUpdatePatientState({
        isLoading: false,
        response: {},
        error,
      })
    }
  }

  return [updatePatientState, updatePatient]
}