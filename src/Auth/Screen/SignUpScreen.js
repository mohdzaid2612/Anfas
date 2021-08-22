import React, {
  useState,
  useEffect
} from 'react'
import SignUpHolder from '../Component/SignUpHolder'
import useCreateUser from '../hooks/useCreateUser'

import {
  isValidEmail,
  isValidPassword
} from '../../utils/dataHelper'

import {
  PhoneNumberUtil,
} from 'google-libphonenumber'

import isEmpty from 'lodash/isEmpty'

const SignUpScreen = props => {

  const {
    navigation,
  } = props

  const index = navigation.dangerouslyGetParent().state.index
  const phoneNumberUtil = PhoneNumberUtil.getInstance()

  const [
    isCreatingUser,
    responseCreateUser,
    errorCreateUser,
    createUser
  ] = useCreateUser()

  useEffect(() => {
    if (!isCreatingUser && !isEmpty(responseCreateUser)) {
      navigation.navigate("VerifyOTP", {
        responseForgetPassword: responseCreateUser,
        email: form["email"],
        type: "SIGN_UP"
      })
    }
  }, [
    isCreatingUser,
    responseCreateUser
  ])

  const [form, setForm] = useState({
    "firstName": "",
    "email": "",
    "password": "",
    "phoneNumber": "",
    "lastName": "",
    "country": {
      cca2: "SA"
    }
  })
  const [errorForm, setErrorForm] = useState({
    "firstName": "",
    "email": "",
    "password": "",
    "phoneNumber": "",
    "lastName": "",
    "countryCode": ""
  })

  const onRegisterClicked = () => {
    if (index > 0) {
      navigation.goBack()
    }
    else {
      navigation.navigate("Login")
    }
  }

  const onCreateAccountClicked = () => {
    if (!validateForm()) return
    const {
      callingCode,
    } = form["country"]
    const payload = {
      first_name: form["firstName"],
      last_name: form["lastName"],
      mobile: `${callingCode}${form["phoneNumber"]}`,
      email: form["email"],
      password: form["password"],
      sex: ""
    }
    createUser(payload)
  }

  const onBackPress = () => {
    navigation.goBack()
  }

  const validateForm = () => {
    let isValid = true
    let updatedErrorForm = {
      ...errorForm,
    }
    if (!form["email"]) {
      updatedErrorForm = {
        ...updatedErrorForm,
        "email": "Please enter the email associated with the account"
      }
      isValid = false
    } else if (form["email"] && !isValidEmail(form["email"])) {
      updatedErrorForm = {
        ...updatedErrorForm,
        "email": "Please enter the valid email"
      }
      isValid = false
    }

    if (!form["password"]) {
      updatedErrorForm = {
        ...updatedErrorForm,
        "password": "Please enter the valid password"
      }
      isValid = false
    } else if (form["password"] && !isValidPassword(form["password"])) {
      updatedErrorForm = {
        ...updatedErrorForm,
        "password": "Please enter the valid password"
      }
      isValid = false
    }

    if (isEmpty(form["country"])) {
      const errorMessage = `Please select the country`
        updatedErrorForm = {
          ...updatedErrorForm,
          "phoneNumber": errorMessage
        }
        isValid = false
    } else if (!form["phoneNumber"]) {
      const errorMessage = `Please enter the valid phone number`
        updatedErrorForm = {
          ...updatedErrorForm,
          "phoneNumber": errorMessage
        }
        isValid = false
    } 
    else if (form["phoneNumber"]) {
      const {
        cca2,
      } = form["country"]
      const numberToCheck = phoneNumberUtil.parseAndKeepRawInput(`${form["phoneNumber"]}`, cca2)
      if (!phoneNumberUtil.isValidNumber(numberToCheck)) {
        const errorMessage = `Please enter the valid phone number`
        updatedErrorForm = {
          ...updatedErrorForm,
          "phoneNumber": errorMessage
        }
        isValid = false
      }
    }
    if (!form["firstName"]) {
      updatedErrorForm = {
        ...updatedErrorForm,
        "firstName": "Please enter the first name associated with the account"
      }
      isValid = false
    }
    if (!form["lastName"]) {
      updatedErrorForm = {
        ...updatedErrorForm,
        "lastName": "Please enter the last name associated with the account"
      }
      isValid = false
    }
    setErrorForm(updatedErrorForm)
    return isValid
  }

  const onTextChanged = (key, value) => {
    const updatedValue = {
      ...form,
      [key]: value
    }
    let updatedErrorForm = {
      ...errorForm,
    }
    if (value && updatedErrorForm[[key]]) {
      updatedErrorForm = {
        [key]: ""
      }
    }
    setForm(updatedValue)
    setErrorForm(updatedErrorForm)
  }

  return (
    <SignUpHolder
      onRegisterClicked={onRegisterClicked}
      onCreateAccountClicked={onCreateAccountClicked}
      onBackPress={onBackPress}
      onTextChanged={onTextChanged}
      form={form}
      errorForm={errorForm}
      error={errorCreateUser}
      isLoading={isCreatingUser}
      showBackIcon={index > 0 }
    />
  )
}

export default SignUpScreen