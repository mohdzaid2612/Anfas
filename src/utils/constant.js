export const ERROR = {
  ERROR_SIGN_IN_CANCELLED: 'Sign In was cancelled by the user',
  ERROR_SIGN_IN_PROGRESS: 'Sign In is in already progress',
  ERROR_PLAY_SERVICE_NOT_AVAILABLE: 'Play service is not available',
};

export const AUTH_MODE = {
  GOOGLE: 'google',
  FB: 'fb',
};

const baseURL = 'http://ec2-3-144-72-161.us-east-2.compute.amazonaws.com/';

export const URL = {
  LOGIN: 'api/v1/auth/login',
  PATIENT_CREATE: 'api/v1/accounts/signup-patient-user/',
  FORGET_PASSWORD: 'api/v1/accounts/forget-password/',
  RESET_PASSWORD: 'api/v1/accounts/reset-password/',
  VERIFY_OTP: 'api/v1/accounts/otp-verify/',
  SEARCH_PATIENT: 'api/v1/patients/search-patient/',
  PATIENT_DETAILS: 'api/v1/appointments/patient-appointments-details/',
  DASHBOARD: 'api/v1/appointments/user-appointments/',
  ADD_PATIENT: 'api/v1/patients/create-patient-for-user/',
  CREATE_APPOINTMENT: 'api/v1/appointments/create-appointment/',
  APPOINTMENT_HISTORY: 'api/v1/appointments/search-appointments/',
  APPOINTMENT_DETAIL: 'api/v1/appointments/appointment-detail/',
  PATIENT_LIST: 'api/v1/patients/get-patient-for-user/',
  RESEND_OTP: 'api/v1/accounts/resend-otp/',
  SIGNUP_OTP_VERIFY: 'api/v1/accounts/signup-patient-user-verify-otp/',
  SIGNUP_RESEND_OTP: 'api/v1/accounts/signup-patient-user-resend-otp/',
  CANCEL_APPOINTMENT: 'api/v1/appointments/cancel-appointment/',
  RESCHEDULE_APPOINTMENT: 'api/v1/appointments/update-appointment/',
  ACTIVE_SERVICE: 'api/v1/services/get-services/',
  CREATE_BOOKING: 'api/v1/service-booking/create-bookings/',
  CANCEL_BOOKING: 'api/v1/service-booking/cancel-booking/',
  RESCHEDULE_BOOKING: 'api/v1/service-booking/update-booking/',
  UPDATE_PATIENT: 'api/v1/patients/patient-update/',
  DELETE_DOCUMENT: 'upload-delete',
  UPLOAD_DOCUMENT: 'uploads',
  GENERATE_PATIENT_CODE: 'api/v1/patients/patient-share-code/',
  VERIFY_PATIENT_CODE: 'api/v1/patients/verify-patient-share-code/',
  videoCall: baseURL + 'api/v1/call',
  doctorsList: baseURL + 'api/v1/accounts/doctors/?all=1&fromUserBookings=0',
  videoCallAppointment: baseURL + 'api/v1/appointments/create-appointment/',
  checkVideoAppointment: baseURL + 'api/v1/appointments/check-appointment/',
};

export const APPOINTMENT_MODE = {
  INITIATED: '0',
  BOOKED: '1',
  CANCELLED: '2',
  COMPLETED: '3',
};

export const DOCUMENT_MODE = {
  BOOKING: '1',
  APPOINTMENT: '2',
};
