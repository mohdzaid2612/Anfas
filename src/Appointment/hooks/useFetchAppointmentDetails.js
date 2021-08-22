import {
  useState,
} from 'react'
  
import API from '../../utils/api'
import {
  URL,
} from '../../utils/constant'
  
export default () => {
  const [isLoadingAppointmentDetail, setLoadingAppointmentDetail] = useState(false)
  const [appointmentDetail, setAppointmentDetail] = useState({})
  const [errorAppointmentDetail, setErrorAppointmentDetail] = useState("")

  const fetchAppointmentDetail = async payload => {
    try {
      setLoadingAppointmentDetail(true)
      setAppointmentDetail({})
      setErrorAppointmentDetail("")
      const {
        appointmentID,
      } = payload
      const url = `${URL.APPOINTMENT_DETAIL}?appointment_id=${appointmentID}`
      const response = await API({
        method: "GET",
        url
      })
      setLoadingAppointmentDetail(false)
      setAppointmentDetail(response)
    } catch (error) {
      setLoadingAppointmentDetail(false)
      setAppointmentDetail([])
      setErrorAppointmentDetail(error)
    }
  }

  return [isLoadingAppointmentDetail, appointmentDetail, errorAppointmentDetail, fetchAppointmentDetail]
}