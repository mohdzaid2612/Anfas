import React, {
  useState,
  useEffect,
} from 'react'

import isEmpty from 'lodash/isEmpty'

import ResetPasswordHolder from '../Component/ResetPassword'
import useResetPassword from '../hooks/useResetPassword'

import {
  isValidPassword,
} from '../../utils/dataHelper'
  
const ResetPassword = props => {
  const {
    navigation,
  } = props

  const [form, setForm] = useState({
    "newPassword": "",
    "confirmPassword": ""
  })
  const [errorForm, setErrorForm] = useState({
    "newPassword": "",
    "confirmPassword": ""
  })

  const secret = navigation.getParam("secret", "")

  const [
    isLoadingResetPassword,
    responseResetPassword,
    errorResetPassword, 
    requestResetPassword
  ] = useResetPassword()

  useEffect(() => {
    if (!isLoadingResetPassword && !isEmpty(responseResetPassword)) {
      navigation.popToTop()
    }
  }, [
    isLoadingResetPassword,
    responseResetPassword
  ])

  const onBackPress = () => {
    navigation.goBack()
  }

  const validateForm = () => {
    let updatedErrorForm = {
      ...errorForm,
    }
    let isValidForm = true
    console.debug(form)
    if (!form["newPassword"]) {
      updatedErrorForm = {
        ...updatedErrorForm,
        "newPassword": "Please enter the new password"
      }
      isValidForm = false
    }
    else if (form["newPassword"] && !isValidPassword(form["newPassword"])) {
      updatedErrorForm = {
        ...updatedErrorForm,
        "newPassword": "Please enter a valid password"
      }
      isValidForm = false
    }
    if (!form["confirmPassword"]) {
      updatedErrorForm = {
        ...updatedErrorForm,
        "confirmPassword": "Please confirm the password"
      }
      isValidForm = false
    } else if (form["confirmPassword"] && !isValidPassword(form["confirmPassword"])) {
      updatedErrorForm = {
        ...updatedErrorForm,
        "confirmPassword": "Please enter a valid password"
      }
      isValidForm = false
    }

    if (form["newPassword"] && form["confirmPassword"]) {
      if (form["newPassword"] != form["confirmPassword"]) {
        updatedErrorForm = {
          ...updatedErrorForm,
          "newPassword": "Please ensure that password is correct"
        }
        isValidForm = false
      }
    }
    setErrorForm(updatedErrorForm)
    return isValidForm

  }

  const onContinueClick = () => {
    if (!validateForm()) return
    const payload = {
      secret,
      password: form["newPassword"]
    }
    requestResetPassword(payload)
  }

  const onTextChange = (key, val) => {
    const updatedValue = {
      ...form,
      [key]: val
    }
    let updatedErrorForm = {
      ...errorForm,
    }
    if (val && updatedErrorForm[[key]]) {
      updatedErrorForm = {
        [key]: ""
      }
    }
    setForm(updatedValue)
    setErrorForm(updatedErrorForm)
  }

  return (
    <ResetPasswordHolder
      error={errorResetPassword}
      onBackPress={onBackPress}
      onContinueClick={onContinueClick}
      form={form}
      errorForm={errorForm}
      onTextChange={onTextChange}
      isLoading={isLoadingResetPassword}
    />
  )

}

export default ResetPassword