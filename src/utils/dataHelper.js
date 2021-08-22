import AsyncStorage from '@react-native-community/async-storage'
import moment from 'moment'

import get from 'lodash/get'

import CountryQuery from 'country-query'

import {
  APPOINTMENT_MODE,
} from './constant'

export const getApiErrorMessage = (error) => {
  let messgae = ''
  console.debug(error.response)
  if (error.response) {
    messgae = error.response.data.detail || error.response.data.message
  } else if (error.request) {
    messgae = error.message
  } else {
    messgae = error.message
  }
  return messgae
}

const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value)
  } catch (e) {
    // saving error
    console.debug("error saving data", e.message)
  }
}

const getData = async key => {
  try {
    const value = await AsyncStorage.getItem(key)
    if(value !== null) {
      return value
    }
  } catch(e) {
    // error reading value
    console.debug("error fetching data", e.message)
  }
}

export const showOnBoarding = async () => {
  try {
    const value = await getData("showOnBoarding")
    return value !== "false"
  }
  catch (e) {

  }
}

export const setShowOnBoarding = async show => {
  try {
    const value = show ? "true" : "false"
    await storeData("showOnBoarding", value)
  }
  catch (e) {

  }
}

export const saveUserData = async data => {
  try {
    const value = JSON.stringify(data)
    await storeData("user", value)
  }
  catch (e) {
    console.debug(e)
  }
}

export const getUserData = async () => {
  try {
    const value = await getData("user")
    return JSON.parse(value)
  }
  catch (e) {

  }
}

export const isValidEmail = email => (
  /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/.test(email)
)

export const isValidPassword = password => (
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(password)
)

export const getAppointmentStatus = appointmentStatus  => {
  if (appointmentStatus === APPOINTMENT_MODE.INITIATED) return APPOINTMENT_MODE.INITIATED
  else if (appointmentStatus === APPOINTMENT_MODE.BOOKED) return APPOINTMENT_MODE.BOOKED
  else if (appointmentStatus === APPOINTMENT_MODE.CANCELLED) return APPOINTMENT_MODE.CANCELLED
  else if (appointmentStatus === APPOINTMENT_MODE.COMPLETED) return APPOINTMENT_MODE.COMPLETED
}

export const getWish = () => {
  const hour = moment().hour()
  if (hour >= 0 && hour < 12) return "Good Morning!"
  else if (hour >=12 && hour < 16) return "Good Afternoon!"
  return "Good Evening!"
}

export const getCountryCCA2 = countryCode => {
  let result = CountryQuery.findByIdd(countryCode)
  return get(result, "cca2", "")
}

