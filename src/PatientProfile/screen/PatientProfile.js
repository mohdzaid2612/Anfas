import React, {
  useState,
  useEffect,
} from 'react'
import {
  useSelector,
  useDispatch,
} from 'react-redux'

import {
  useNavigationParam
} from 'react-navigation-hooks'

import {
  logOut,
  updateSelectedPatient
} from '../../Auth/authAction'

import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'

import Clipboard from '@react-native-clipboard/clipboard'

import PatientProfileHolder from '../component/PatientProfile'
import useGeneratePatientCode from '../hooks/useGeneratePatientCode'

import {
  usePrevious
} from '../../utils/usePreviousValue'

const PatientProfile = props => {

  const {
    navigation,
  } = props
  
  const {
    user,
    patient,
    selectedPatient
  } = useSelector(state => state.auth)

  const [
    generatePatientCodeState,
    generatePatientCode
  ] = useGeneratePatientCode()

  const [shareCodeState, setShareCodeState] = useState({
    code: "",
    isVisible: false
  })

  const mode = useNavigationParam("mode", "")

  const dispatch = useDispatch()

  const firstName = get(user, "first_name", "")
  const lastName = get(user, "last_name", "")
  const role = get(user, "role", "")
  const email = get(user, "email", "")

  const selectedPatientID = get(selectedPatient, "id", "")

  const prevIsGeneratingCode = usePrevious(generatePatientCodeState.isLoading)

  useEffect(() => {
    if (prevIsGeneratingCode === true && generatePatientCodeState.isLoading === false && generatePatientCodeState.error === "") {
      if (!isEmpty(generatePatientCodeState.response)) {
        const {
          allowed,
          code,
        } = generatePatientCodeState.response
        if (allowed) {
          setShareCodeState({
            code,
            isVisible: true
          })
        }
      }
    }
  }, [prevIsGeneratingCode, generatePatientCodeState.isLoading, generatePatientCodeState.error])

  const getHomeTitle = () => {
    if (role === "doctor") {
      return `Dr. ${firstName} ${lastName}`
    }
    else if (role === "patientuser") {
      return `${firstName} ${lastName}`
    }
  }

  const onBackPress = () => {
    navigation.goBack()
  }

  const onPatientSelect = item => {
    dispatch(updateSelectedPatient(item))
    if (mode === "edit") {
      navigation.goBack()
    }
  }

  const onAddPatientClicked = () => {
    navigation.navigate("AddPatient")
  }

  const onLogOutClicked = () => {
    dispatch(logOut())
  }

  const onEditClicked = item => {
    console.debug(item)
    navigation.navigate("AddPatient", {
      mode: "edit",
      patient: item
    })
  }

  const onShareClicked = item => {
    const patientID = get(item, "id", "")
    const payload = {
      patient:patientID
    }
    generatePatientCode(payload)
  }

  const onToggleShareVisiblity = () => {
    setShareCodeState({
      code: "",
      isVisible: false
    })
  }

  const onCopyClicked = () => {
    Clipboard.setString(shareCodeState.code)
  }

  return (
    <PatientProfileHolder
      email={email}
      name={getHomeTitle()}
      onBackPress={onBackPress}
      onPatientSelect={onPatientSelect}
      patient={patient}
      onAddPatientClicked={onAddPatientClicked}
      onLogOutClicked={onLogOutClicked}
      role={role}
      onEditClicked={onEditClicked}
      selectedPatientID={selectedPatientID}
      onShareClicked={onShareClicked}
      onToggleShareVisiblity={onToggleShareVisiblity}
      isSharePopUpVisible={shareCodeState.isVisible}
      onCopyClicked={onCopyClicked}
      isLoading={generatePatientCodeState.isLoading}
      error={generatePatientCodeState.error}
      shareCode={shareCodeState.code}
    />
  )
}

export default PatientProfile