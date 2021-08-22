import {
  LOGOUT_USER,
  SAVE_USER_INFO,
  FETCH_USER_INFO,
  INITAITE_SOCIAL_LOGIN,
  ERROR_SOCIAL_LOGIN,
  SUCCESS_SOCIAL_LOGIN,
  SAVE_PATIENT_LIST,
  ERROR_SAVE_PATIENT_LIST,
  INIT_PATIENT_LIST,
  CHANGE_SELECTED_PATIENT,
} from './authActionType'

import {
  AUTH_MODE,
} from '../utils/constant'

import GoogleSignIn from './helpers/GoogleAuth'
import FBSignIn from './helpers/FBAuth'
import {
  emailSignIn
} from './helpers/EmailAuth'
import fetchPatientList from './helpers/PatientList'

import NavigationService from "../utils/NavigationService"

import {
  saveUserData
} from '../utils/dataHelper'

import get from 'lodash/get'

export const initUserInfo = () => (
  {
    type: FETCH_USER_INFO,
  }
)

export const saveUserInfo = user => (
  {
    type: SAVE_USER_INFO,
    payload: user
  }
)

export const logoutUser = () => (
  {
    type: LOGOUT_USER
  }
)

const initSocialLogin = mode => (
  {
    type: INITAITE_SOCIAL_LOGIN,
  }
)

export const successSocialLogin = user => (
  {
    type: SUCCESS_SOCIAL_LOGIN,
    payload: {
      user
    }
  }
)

export const errorSocialLogin = error => (
  {
    type: ERROR_SOCIAL_LOGIN,
    payload: {
      error
    }
  }
)

const initFetchUserPatientList = () => (
  {
    type: INIT_PATIENT_LIST,
  }
)

const saveUserPatientList = res => (
  {
    type: SAVE_PATIENT_LIST,
    payload: {
      patient: res
    }
  }
)

const errorSavePatientList = error => (
  {
    type: ERROR_SAVE_PATIENT_LIST,
    payload: {
      error
    }
  }
)

export const emailLogin = payload => (
  dispatch => {
    dispatch(initSocialLogin())
    dispatch(loginUser(payload))
  }
)

const loginUser = payload => (
  dispatch => {
    emailSignIn(payload).then(res => {
      console.debug(res)
      saveUserData(res)
      dispatch(successSocialLogin(res))
    }).catch(err => {
      console.debug(err)
      dispatch(errorSocialLogin(err))
    })
  }
)

export const fetchUserPatients = () => (
  dispatch => {
    dispatch(initFetchUserPatientList())
    fetchPatientList().then(res => {
      dispatch(saveUserPatientList(res))
    }).catch(err => {
      dispatch(errorSavePatientList(err))
    })
  }
)

export const socialLogin = mode => (
  dispatch => {
    dispatch(initSocialLogin())
    if (mode === AUTH_MODE.GOOGLE) {
      GoogleSignIn().then(res => {
        const idToken = get(res, "idToken", "")
        const payload = {
         idToken,
         type: mode,
         email: "test@gmail.com",
         password: "111"
        }
        console.debug(payload)
        dispatch(loginUser(payload))
      }).catch(err => {
        console.debug(err)
        dispatch(errorSocialLogin(err))
      })
    }
    else if (mode === AUTH_MODE.FB) {
      FBSignIn().then(res => {
        const payload = {
          type: mode,
          idToken: res,
          email: "test@gmail.com",
          password: "111"
        }
        dispatch(loginUser(payload))
      })
      .catch(err => {
        dispatch(errorSocialLogin(err))
      })
    }
  }
)

export const logOut = () => (
  dispatch => {
    NavigationService.navigate("OnBoarding")
    saveUserData({})
    dispatch(logoutUser())
  }
)

export const updateSelectedPatient = selectedPatient => (
  {
    type: CHANGE_SELECTED_PATIENT,
    payload: {
      selectedPatient
    }
  }
)