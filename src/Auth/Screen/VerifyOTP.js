import React, {
  useState,
  useEffect,
} from 'react'

import {
  useDispatch,
} from 'react-redux'

import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'
  
import VerifyOTPHolder from '../Component/VerifyOTP'
import useVerifyOTP from '../hooks/useOTPVerify'
import useResendOTP from '../hooks/useResendOTP'
import useSignUpVerifyOTP from '../hooks/useSignUpOTPVerify'
import useSignUpResendOTP from '../hooks/useSignUpResendOTP'

import {
  saveUserData
} from '../../utils/dataHelper'

import {
  successSocialLogin,
} from '../../Auth/authAction'
  
const VerifyOTP = props => {
  const {
    navigation,
  } = props

  const dispatch = useDispatch()

  const [otp, setOTP] = useState("")
  const [error, setError] = useState("")
  const [
    isLoadingOTPVerify,
    responseOTPVerify,
    errorOTPVerify,
    requestOTPVerify
  ] = useVerifyOTP()

  const [
    isLoadingResendOTP,
    responseResendOTP,
    errorResendOTP,
    requestResendOTP
  ] = useResendOTP()

  const [
    isLoadingSignUpOTPVerify,
    responseSignUpOTPVerify,
    errorSignUpOTPVerify,
    requestSignUpOTPVerify
  ] = useSignUpVerifyOTP()

  const [
    isLoadingSignUpResendOTP,
    responseSignUpResendOTP,
    errorSignUpResendOTP,
    requestSignUpResendOTP
  ] = useSignUpResendOTP()

  
  const email = navigation.getParam("email", "")
  const type = navigation.getParam("type", "")

  const resendUpdatedSecret = get(type === "SIGN_UP" ? responseSignUpResendOTP: responseResendOTP, "secret", "")
  const {
    secret
  } = navigation.getParam("responseForgetPassword", {})

  useEffect(() => {
    if (!isLoadingOTPVerify && !isEmpty(responseOTPVerify)) {
      const {
        otp_verify,
        message,
      } = responseOTPVerify
      if (otp_verify) {
        navigation.navigate("ResetPassword", {
          secret
        })
      }
      else {
        setError(message)
      }
    }
  }, [
    isLoadingOTPVerify,
    responseOTPVerify
  ])

  useEffect(() => {
    if (!isLoadingSignUpOTPVerify && !isEmpty(responseSignUpOTPVerify)) {
      dispatch(successSocialLogin(responseSignUpOTPVerify))
      navigation.navigate("MainPatient")
      saveUserData(responseSignUpOTPVerify)
    }
  }, [
    responseSignUpOTPVerify,
    isLoadingSignUpOTPVerify
  ])

  const onBackPress = () => {
    navigation.goBack()
  }

  const onContinueClick = () => {
    if (!otp) {
      setError("Please enter a valid otp")
      return
    }
    const payload = {
      secret: resendUpdatedSecret || secret,
      user_otp: parseInt(otp)
    }

    if (type === "SIGN_UP") {
      requestSignUpOTPVerify(payload)
    } else {
      requestOTPVerify(payload)
    }

  }

  const onTextChange = (key, val) => {
    setOTP(val)
    if (val && error) {
      setError("")
    }
  }

  const onResendOTP = () => {
    const payload = {
      secret,
    }

    if (type === "SIGN_UP") {
      requestSignUpResendOTP(payload)
    } else {
      requestResendOTP(payload)
    }
    
  }

  return (
    <VerifyOTPHolder
      error={error || errorOTPVerify || errorResendOTP || errorSignUpOTPVerify || errorSignUpResendOTP}
      onBackPress={onBackPress}
      onContinueClick={onContinueClick}
      email={email}
      onTextChange={onTextChange}
      otp={otp}
      isLoading={isLoadingOTPVerify || isLoadingResendOTP || isLoadingSignUpOTPVerify || isLoadingSignUpResendOTP}
      onResendOTP={onResendOTP}
    />
  )

}  
export default VerifyOTP