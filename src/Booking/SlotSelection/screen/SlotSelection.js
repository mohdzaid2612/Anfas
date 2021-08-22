import React, {
  useState,
  useEffect,
} from 'react'

import {
  useNavigation,
  useNavigationParam,
} from 'react-navigation-hooks'

import moment from 'moment'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'

import SlotSelectionHolder from '../component/SlotSelectionHolder'

import useRescheduleBooking from '../../ManageBooking/hooks/useRescheduleBooking'

import {
  usePrevious,
} from '../../../utils/usePreviousValue'

const SlotSelection = () => {

  const navigation = useNavigation()
  const [form, setForm] = useState({
    date: new Date(),
    time: new Date()
  })

  const [rescheduleBookingState, rescheduleBooking] = useRescheduleBooking()

  const prevIsReschedulingBooking = usePrevious(rescheduleBookingState.isLoading) 

  const onBackPress = () => {
    navigation.goBack()
  }

  const serviceData = useNavigationParam("booking", {})
  const mode = useNavigationParam("mode", "")
  const selectedDate = useNavigationParam("selectedDate", "")
  const selectedPackage = useNavigationParam("selectedPackage", "")

  const startTime = get(serviceData, "start_time", "")
  const endTime = get(serviceData, "end_time", "")

  const metaData = useNavigationParam("metaData", {})

  useEffect(() => {
    if (mode === "edit" || mode === "reschedule") {
      setForm({
        date: new Date(selectedDate),
        time: new Date(selectedDate)
      })
    }
  }, [mode])

  useEffect(() => {
    if (prevIsReschedulingBooking === true && rescheduleBookingState.isLoading === false && rescheduleBookingState.error === "") {
      if (!isEmpty(rescheduleBookingState.response)) {
        const hour = moment(form.time).format("HH")
        const minute = moment(form.time).format("mm")
        navigation.navigate("AppointmentConfirmation", {
          variant: "Service",
          selectedPackage,
          type: "RESCHEDULE",
          appointmentInfo: {
            appointment: {
              date: moment(form.date).startOf("day").add(hour, "hour").add(minute, "minute").format("YYYY-MM-DD HH:mm:ss"),
            }
          }
        })
      }
    }
  }, [prevIsReschedulingBooking, rescheduleBookingState.isLoading, rescheduleBookingState.error])


  const onConfirmDate = () => {
    const hour = moment(form.time).format("HH")
    const minute = moment(form.time).format("mm")
    const dateStringUTC = moment(form.date).startOf("day").add(hour, "hour").add(minute, "minute").format("YYYY-MM-DD HH:mm:ss")
    const dateUTC = moment(dateStringUTC, "YYYY-MM-DD HH:mm:ss").unix()*1000

    if (mode === "edit") {
      navigation.navigate("AddPatientDetail", {
        selectedPackage,
        selectedDate: dateUTC,
        serviceData
      })
    }
    else if (mode === "reschedule") {
      const booking_id = get(metaData, "id", "")
      const payload = {
        booking_id,
        timeinfo: moment(dateStringUTC).utc().format("YYYY-MM-DD HH:mm:ss")
      }
      rescheduleBooking(payload)
    } else {
      navigation.navigate("PackageSelection", {
        selectedDate: dateUTC,
        serviceData,
      })
    }
    
  }

  const onDateSelected = date => {
    setForm({
      ...form,
      date: date.timestamp,
    })
  }

  const onTimeSelection = time => {
    setForm({
      ...form,
      time,
    })
  }

  

  return (
    <SlotSelectionHolder
      onBackPress={onBackPress}
      onConfirmDate={onConfirmDate}
      onDateSelected={onDateSelected}
      onTimeSelection={onTimeSelection}
      form={form}
      startTime={startTime}
      endTime={endTime}
      isLoading={rescheduleBookingState.isLoading}
      error={rescheduleBookingState.error}
    />
  )
}

export default SlotSelection