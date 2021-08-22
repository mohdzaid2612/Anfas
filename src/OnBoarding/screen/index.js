import React, {useEffect, useState} from 'react'
import {
  useDispatch,
  useSelector,
} from 'react-redux'

import OnboardingComponent from '../component/OnBoarding'
import {
  getUserData,
} from '../../utils/dataHelper'

import {
  successSocialLogin,
  fetchUserPatients,
} from '../../Auth/authAction'

import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'

import {
  usePrevious
} from '../../utils/usePreviousValue'

const Onboarding = props => {
  const {
    navigation
  } = props

  const {
    errorLoadingPatient,
    isLoadingPatient,
  } = useSelector(state => state.auth)

  const prevLoadingPatient = usePrevious(isLoadingPatient)

  const dispatch = useDispatch()

  const [show, setShow] = useState('')

  useEffect(() => {
    handleNavigation()
  }, [])

  useEffect(() => {
    if (isLoadingPatient === false && prevLoadingPatient === true && errorLoadingPatient === "") {
      navigation.navigate("MainPatient")
    }
  }, [isLoadingPatient, errorLoadingPatient])

  const handleNavigation = async () => {
    try {
      const user = await getUserData()
      if (!isEmpty(user)) {
        dispatch(successSocialLogin(user))
        const typeUser = get(user, "user.role")
        if (typeUser === "doctor") {
          navigation.navigate("MainDoctor")
        } else if (typeUser === "patientuser") {
          dispatch(fetchUserPatients())
        }
      }
      else {
        setShow(false)
      }
    }
    catch (e) {
    }
  }

  const onLoginClicked = async () => {
    navigation.navigate("LoginFlow")
  }

  const onSignUpClicked = async () => {
    navigation.navigate("SignUpFlow")
  }

  return (
    show === false ? (<OnboardingComponent
      onLoginClicked={onLoginClicked}
      onSignUpClicked={onSignUpClicked}
    />): null
  )
}

export default Onboarding