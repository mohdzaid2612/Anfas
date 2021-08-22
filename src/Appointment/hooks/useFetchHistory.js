import {
  useState,
} from 'react'

import API from '../../utils/api'
import {
  URL,
} from '../../utils/constant'

import moment from 'moment'

export default () => {
  const [isLoadingHistory, setLoadingHistory] = useState(false)
  const [history, setHistory] = useState([])
  const [errorHistoryResponse, setErrorHistoryResponse] = useState("")
  
  const fetchHistory = async payload => {
    try {
      setLoadingHistory(true)
      setHistory([])
      setErrorHistoryResponse("")
      const {
        date
      } = payload
      const url = `${URL.APPOINTMENT_HISTORY}?date=${date}`
      const response = await API({
        method: "GET",
        url
      })
      if (response) {
        const {
          appointments,
          bookings,
        } = response

        if (appointments.length > 0 && bookings.length > 0) {
          const list = [
            ...appointments,
            ...bookings
          ]

          list.sort((itemA, itemB) => {
            const {
              date: dateA,
              timeinfo: timeinfoA
            } = itemA
            const {
              date: dateB,
              timeinfo: timeinfoB
            } = itemB
            const valA = dateA || timeinfoA
            const valB = dateB || timeinfoB

            return moment(valA).isBefore(valB) ? -1 : 1
          })
          setHistory(list)
        } else if (appointments.length >0) {
          setHistory(appointments)
        } else if (bookings.length >0) {
          setHistory(bookings)
        }
      }
      setLoadingHistory(false)
    } catch (error) {
      setLoadingHistory(false)
      setHistory([])
      setErrorHistoryResponse(error)
    }
  }

  return [isLoadingHistory, history, errorHistoryResponse, fetchHistory]
}