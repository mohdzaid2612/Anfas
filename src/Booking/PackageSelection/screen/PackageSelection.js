import React, {
  useEffect, useState,
} from 'react'
import {
  useNavigation,
  useNavigationParam,
} from 'react-navigation-hooks'

import {
  useSelector,
} from 'react-redux'

import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'

import PackageSelectionHolder from '../component/PackageSelection'

const PackageSelection = () => {

  const navigation = useNavigation()
  const serviceData = useNavigationParam("serviceData", {})
  const selectedDate = useNavigationParam("selectedDate", {})
  const selectedPackage = useNavigationParam("selectedPackage", {})
  const mode = useNavigationParam("mode", "")

  const {
    patient,
  } = useSelector(state => state.auth)

  useEffect(() => {
    if (mode === "edit") {
      setSelectedBooking(selectedPackage)
    }
  }, [mode])


  const [selectedBooking, setSelectedBooking] = useState({})
  
  const onBackPress = () => {
    navigation.goBack()
  }

  const onConfirmPackage = () => {
    if (isEmpty(selectedBooking)) return
    if (patient && patient.length === 0) {
      navigation.navigate("AddPatient", {
        mode: "emptyPatient",
        serviceData,
        selectedDate,
        selectedPackage: selectedBooking,
      })
    } else {
      navigation.navigate("AddPatientDetail", {
        serviceData,
        selectedDate,
        selectedPackage: selectedBooking,
      })
    }
  }

  const packagesList = get(serviceData, "package", [])

  const onPackageSelected = item => {
    setSelectedBooking(item)
  }

  return (
    <PackageSelectionHolder
      onBackPress={onBackPress}
      onConfirmPackage={onConfirmPackage}
      packages={packagesList}
      onPackageSelected={onPackageSelected}
      selectedPackage={selectedBooking}
    />
  )
}

export default PackageSelection
