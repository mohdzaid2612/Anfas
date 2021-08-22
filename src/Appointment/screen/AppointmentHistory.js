import React, {
  useState,
  useEffect,
  useCallback,
} from 'react'

import {
  useFocusEffect,
} from 'react-navigation-hooks'

import moment from 'moment'
import AppointmentHistoryHolder from '../component/AppointmentHistoryHolder'

import useFetchHistory from '../hooks/useFetchHistory'

const AppointmentHistory = props => {
  
  const [selectedDate, setSelectedDate] = useState(moment().format("YYYY-MM-DD"))
  const [
    isLoadingHistory,
    history,
    errorHistoryResponse,
    fetchHistory
  ] = useFetchHistory()


  const {
    navigation,
  } = props

  useFocusEffect(useCallback(() => {
    const payload = {
      date: moment().format("YYYY-MM-DD")
    }
    setSelectedDate(moment().format("YYYY-MM-DD"))
    fetchHistory(payload)
  }, []))

  const onAppointmentClicked = item => {
    const {
      id,
      timeinfo,
      date,
    } = item
    if (date) {
      navigation.navigate("ManageAppointment", {
        appointmentID: id
      })
    } else if (timeinfo) {
      navigation.navigate("ManageBooking", {
        data: item
      })
    }
  }

  const onChangeDate = date => {
    const payload = {
      date
    }
    fetchHistory(payload)
    setSelectedDate(date)
  }

  return (
    <AppointmentHistoryHolder
      onChangeDate={onChangeDate}
      onAppointmentClicked={onAppointmentClicked}
      selectedDate={selectedDate}
      isLoading={isLoadingHistory}
      data={history}
      error={errorHistoryResponse}
    />
  )
}

export default AppointmentHistory