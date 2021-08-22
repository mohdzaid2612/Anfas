import {
  useState,
} from 'react'
import API from '../../utils/api'
import {
  URL,
} from '../../utils/constant'

export default () => {
  const [isLoadingDoctorDashboard, setLoadingDoctorDashboard] = useState(false)
  const [doctorDashboardResponse, setDoctorDashboardResponse] = useState({})
  const [errorDoctorDashboard, setErrorDoctorDashbaord] = useState("")

  const fetchDoctorDashboard = async () => {
    try {
      setLoadingDoctorDashboard(true)
      setDoctorDashboardResponse({})
      setErrorDoctorDashbaord("")
      const response = await API({
        method: "GET",
        url: URL.DASHBOARD
      })
      setLoadingDoctorDashboard(false)
      setDoctorDashboardResponse(response)
    } catch (error) {
      setLoadingDoctorDashboard(false)
      setDoctorDashboardResponse({})
      setErrorDoctorDashbaord("")
    }
  }

  return [isLoadingDoctorDashboard, doctorDashboardResponse, errorDoctorDashboard, fetchDoctorDashboard]
}