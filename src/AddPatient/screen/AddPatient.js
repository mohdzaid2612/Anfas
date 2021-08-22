import React, {
  useState, useEffect,
} from 'react'

import {
  useDispatch,
  useSelector,
} from 'react-redux'

import {
  PhoneNumberUtil,
} from 'google-libphonenumber'

import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import moment from 'moment'

import AddPatientHolder from '../component/AddPatientHolder'

import useCreatePatient from '../hooks/useCreatePatient'

import useUpdatePatient from '../hooks/useUpdatePatient'
import useVerifyPatientCode from '../../PatientProfile/hooks/useVerifyPatientCode'

import {
  fetchUserPatients,
} from '../../Auth/authAction'

import {
  usePrevious
} from '../../utils/usePreviousValue'

import {
  getCountryCCA2,
} from '../../utils/dataHelper'

const AddPatient = props => {

  const {
    navigation,
  } = props

  const dispatch = useDispatch()

  const mode = navigation.getParam("mode")
  const selectedPatient = navigation.getParam("patient", {})
  const serviceData = navigation.getParam("serviceData", {})
  const selectedDate = navigation.getParam("selectedDate", {})
  const selectedPackage = navigation.getParam("selectedPackage", {})

  const phoneNumberUtil = PhoneNumberUtil.getInstance()

  const {
    errorLoadingPatient,
    isLoadingPatient,
  } = useSelector(state => state.auth)

  const [
    isCreatingPatient,
    responseAddPatient,
    errorAddPatient,
    createPatient
  ] = useCreatePatient()

  const [
    updatePatientState,
    updatePatient
  ] = useUpdatePatient()

  const [
    verifyPatientCodeState,
    verifyPatientCode
  ] = useVerifyPatientCode()

  const prevLoadingPatient = usePrevious(isLoadingPatient)
  const prevCreatingPatient = usePrevious(isCreatingPatient)
  const prevIsUpdatingPatient = usePrevious(updatePatientState.isLoading)
  const prevIsVerfyingPatientCode = usePrevious(verifyPatientCodeState.isLoading)

  useEffect(() => {
    if (isCreatingPatient === false && prevCreatingPatient === true && errorAddPatient === "") {
      dispatch(fetchUserPatients())
    }
  }, [
    isCreatingPatient,
    errorAddPatient
  ])

  useEffect(() => {
    if (isLoadingPatient === false && prevLoadingPatient === true && errorLoadingPatient === "") {
      if (mode === "emptyPatient") {
        navigation.replace("AddPatientDetail", {
          serviceData,
          selectedDate,
          selectedPackage
        })
      } else {
        navigation.goBack(null)
      }
    }
  }, [isLoadingPatient, errorLoadingPatient])

  useEffect(() => {
    if (prevIsUpdatingPatient === true && updatePatientState.isLoading === false && updatePatientState.error === "") {
      dispatch(fetchUserPatients())
    }
  }, [
    prevIsUpdatingPatient,
    updatePatientState.isLoading,
    updatePatientState.error,
  ])

  useEffect(() => {
    if (prevIsVerfyingPatientCode === true && verifyPatientCodeState.isLoading === false && verifyPatientCodeState.error === "") {
      console.debug(verifyPatientCodeState.response)
      dispatch(fetchUserPatients())
    }
  }, [
    prevIsVerfyingPatientCode,
    verifyPatientCodeState.isLoading,
    verifyPatientCodeState.error,
  ])

  useEffect(() => {
    if (mode === "edit" && !isEmpty(selectedPatient)) {
      let phoneNumberMeta = get(selectedPatient, "mobile", "")
      let phoneNumberMetaList = phoneNumberMeta.split("-")
      let countryIDD = "SA"
      let callingCode = "966"
      let phoneNumber = phoneNumberMeta
      if (phoneNumberMetaList.length >= 2) {
        callingCode = phoneNumberMeta.split("-")[0]
        phoneNumber = phoneNumberMeta.split("-")[1]
        countryIDD = getCountryCCA2(callingCode)
      }
      setForm({
        name: get(selectedPatient, "name", "") || "",
        dob: new Date(moment(get(selectedPatient, "dob", ""), "YYYY-MM-DD").format()),
        country: {
          cca2:countryIDD,
          callingCode
        },
        phoneNumber,
        gender: get(selectedPatient, "sex", "") === "M" ? "Male": "Female",
        address: get(selectedPatient, "address", "") || ""
      })
    }
  }, [selectedPatient, mode])

  const [form, setForm] = useState({
    name: "",
    dob: new Date(),
    country: {
      cca2: "SA",
      callingCode: "966"
    },
    phoneNumber: "",
    gender: "Male",
    address: "",
    patientCode:""
  })

  const [error, setErrorForm] = useState({
    name: "",
    dob: "",
    countryCode: "",
    phoneNumber: "",
    gender: "Male",
    address: "",
    patientCode:""
  })

  const onFormValueChanged = (key, value) => {
    if (error[key]) {
      if (value) {
        let updatedErrorForm = {
          ...error,
          [key]: ""
        }
        setErrorForm(updatedErrorForm)
      }
    }
    const updatedFormValue = {
      ...form,
      [key]: value
    }
    setForm(updatedFormValue)
  }

  const onBackPress = () => {
    navigation.goBack(null)
  }

  const onCreatePatientClicked = () => {
    if (form["patientCode"] && form["patientCode"] !== "") {
      verifyPatientCode({
        code: form["patientCode"]
      })
    } else {
      if (!checkValidation()) return
      const {
        callingCode,
      } = form["country"]
      const dob = moment(form["dob"]).format("YYYY-MM-DD")
      const age = moment().diff(moment(form["dob"]).format("YYYY"), "year")
      const payload = {
        name: form["name"],
        dob,
        age,
        sex: form["gender"] === "Male" ? "M" : "F",
        mobile: `${callingCode}-${form["phoneNumber"]}`,
        disability: "0",
        user_relation: "test",
        address: form["address"]
      }

      if (mode === "edit") {
        console.debug(payload)
        updatePatient(
          {
            ...payload,
            id: selectedPatient.id
          }
        )
      } else {
        console.debug(payload)
        createPatient(payload)
      }
    }
  }

  const checkValidation = () => {
    const keyTitleMap = {
      name: "name",
      dob: "date of birth",
      country: "country code",
      phoneNumber: "phone number",
      gender: "gender",
      address: "address"
    }
    let updatedErrorForm = {}
    let isValidForm = true
    for (let key in form) {
      if (key !=="country" && key !== "patientCode" && (!form[key])) {
        const errorMessage = `Please enter the ${keyTitleMap[key]}`
        updatedErrorForm = {
          ...updatedErrorForm,
          [key]: errorMessage
        }
        isValidForm = false
      }
    }

    if (isEmpty(form["country"])) {
      const errorMessage = `Please select the country`
        updatedErrorForm = {
          ...updatedErrorForm,
          "phoneNumber": errorMessage
        }
        isValidForm = false
    } else if (form["phoneNumber"] === "") {
      const errorMessage = `Please enter the phone number`
        updatedErrorForm = {
          ...updatedErrorForm,
          "phoneNumber": errorMessage
        }
        isValidForm = false
    } 
    else {
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
        isValidForm = false
      }
    }

    setErrorForm(updatedErrorForm)
    return isValidForm
  }

  return (
    <AddPatientHolder
      onBackPress={onBackPress}
      onCreatePatientClicked={onCreatePatientClicked}
      onChangeFormValue={onFormValueChanged}
      form={form}
      errorForm={error}
      isLoading={isCreatingPatient || isLoadingPatient || updatePatientState.isLoading || verifyPatientCodeState.isLoading}
      error={errorAddPatient || updatePatientState.error || verifyPatientCodeState.error}
      mode={mode}
    />
  )
}

export default AddPatient