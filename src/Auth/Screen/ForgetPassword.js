import React, {
  useState,
  useEffect,
} from 'react'

import isEmpty from 'lodash/isEmpty'

import ForgetPasswordHolder from '../Component/ForgetPassword'
import useForgetPassword from '../hooks/useForgetPassword'

import {
  isValidEmail,
} from '../../utils/dataHelper'

const ForgetPassword = props => {
  const {
    navigation,
  } = props

  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [
    isLoadingForgetPassword,
    responseForgetPassword,
    errorForgetPassword,
    requestForgetPassword
  ] = useForgetPassword()

  useEffect(() => {
    if (!isLoadingForgetPassword && !isEmpty(responseForgetPassword)) {
      navigation.navigate("VerifyOTP", {
        email,
        responseForgetPassword
      })
    }
  }, [isLoadingForgetPassword, responseForgetPassword])

  const onBackPress = () => {
    navigation.goBack()
  }

  const onContinueClick = () => {
    if (!email || (email && !isValidEmail(email))) {
      setError("Please enter a valid email")
      return
    }
    const payload = {
      email,
    }
    requestForgetPassword(payload)
  }

  const onTextChange = (key, val) => {
    setEmail(val)
    if (val && error) {
      setError("")
    }
  }

  return (
    <ForgetPasswordHolder
      error={error || errorForgetPassword}
      onBackPress={onBackPress}
      onContinueClick={onContinueClick}
      email={email}
      onTextChange={onTextChange}
      isLoading={isLoadingForgetPassword}
    />
  )

}

export default ForgetPassword