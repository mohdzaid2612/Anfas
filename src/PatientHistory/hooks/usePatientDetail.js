import {
  useState,
} from 'react'
import API from '../../utils/api'
import {
  URL,
} from '../../utils/constant'

export default () => {
  const [isLoadingPatientDetail, setLoadingPatientDetail] = useState(false)
  const [patientDetailResponse, setPatientDetailResponse] = useState({})
  const [errorPatientDetailResponse, setErrorPatientDetailResponse] = useState("")
  const fetchPatientDetail = async payload => {
    try {
      setLoadingPatientDetail(true)
      setPatientDetailResponse({})
      setErrorPatientDetailResponse("")
      const {
        patientID,
        doctorID,
      } = payload
      const url = `${URL.PATIENT_DETAILS}?patient_id=${patientID}&doctor_id=${doctorID}`
      const response = await API({
        method: "GET",
        url
      })
      setLoadingPatientDetail(false)
      setPatientDetailResponse(response)
    } catch (error) {
      setLoadingPatientDetail(false)
      setPatientDetailResponse({})
      setErrorPatientDetailResponse(error)
    }
  }
  return [isLoadingPatientDetail, patientDetailResponse, errorPatientDetailResponse, fetchPatientDetail]
}