import {
  LOGOUT_USER,
  SAVE_USER_INFO,
  FETCH_USER_INFO,
  INITAITE_SOCIAL_LOGIN,
  SUCCESS_SOCIAL_LOGIN,
  ERROR_SOCIAL_LOGIN,
  SAVE_PATIENT_LIST,
  ERROR_SAVE_PATIENT_LIST,
  INIT_PATIENT_LIST,
  CHANGE_SELECTED_PATIENT,
} from './authActionType';

import get from 'lodash/get';

const initialState = {
  user: {},
  isLoading: false,
  error: '',
  isLoadingAuth: false,
  token: '',
  refreshToken: '',
  patient: [], // patient added in patientuser,
  isLoadingPatient: false,
  errorLoadingPatient: '',
  selectedPatient: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_INFO:
      return {
        ...state,
        isLoading: true,
      };
    case SAVE_USER_INFO:
      console.log('save user info', action.payload);
      return {
        ...state,
        isLoading: false,
        user: get(action.payload, 'user.user', {}),
        token: get(action.payload, 'user.access', ''),
        refreshToken: get(action.payload, 'user.refresh', ''),
      };
    case LOGOUT_USER:
      return initialState;
    case INITAITE_SOCIAL_LOGIN:
      return {
        ...state,
        isLoadingAuth: true,
      };
    case SUCCESS_SOCIAL_LOGIN:
      return {
        ...state,
        isLoadingAuth: false,
        user: get(action.payload, 'user.user', {}),
        token: get(action.payload, 'user.access', ''),
        refreshToken: get(action.payload, 'user.refresh', ''),
      };
    case ERROR_SOCIAL_LOGIN:
      return {
        ...state,
        isLoadingAuth: false,
        user: {},
        token: '',
        refreshToken: '',
        error: action.payload.error || 'Error',
      };
    case INIT_PATIENT_LIST:
      return {
        ...state,
        isLoadingPatient: true,
        errorLoadingPatient: '',
      };
    case SAVE_PATIENT_LIST:
      let selectedPatient = {};
      const patient = get(action.payload, 'patient', []);
      if (patient && patient.length > 0) {
        selectedPatient = patient[0];
      }
      return {
        ...state,
        isLoadingPatient: false,
        errorLoadingPatient: '',
        patient,
        selectedPatient,
      };
    case ERROR_SAVE_PATIENT_LIST:
      return {
        ...state,
        isLoadingPatient: false,
        errorLoadingPatient: get(action.payload, 'error', ''),
      };
    case CHANGE_SELECTED_PATIENT:
      return {
        ...state,
        selectedPatient: get(action.payload, 'selectedPatient', ''),
      };
    default:
      return initialState;
  }
};
