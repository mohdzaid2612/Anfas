import {
  useState,
} from 'react'

import API from '../../utils/api'
import {
  URL
} from '../../utils/constant'

export default () => {
  const [isCreatingPatient, setCreatingPatient] = useState(false)
  const [responseAddPatient, setResponseAddPatient] = useState({})
  const [errorAddPatient, setErrorAddPatient] = useState("")
  const createPatient = async payload => {
    try {
      setCreatingPatient(true)
      setResponseAddPatient({})
      setErrorAddPatient("")
      const response = await API({
        method: "POST",
        url: URL.ADD_PATIENT,
        data: payload
      })
      console.debug(response)
      setCreatingPatient(false)
      setResponseAddPatient(response)
    } catch (error) {
      console.debug(error)
      setCreatingPatient(false)
      setResponseAddPatient({})
      setErrorAddPatient(error)
    }
  }

  return [isCreatingPatient, responseAddPatient, errorAddPatient, createPatient]
}