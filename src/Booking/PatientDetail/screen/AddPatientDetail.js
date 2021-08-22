import React, {
  useState,
  useEffect,
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

import moment from 'moment'
import RNFetchBlob from 'rn-fetch-blob'

import AddPatientDetailHolder from '../component/AddPatientDetailHolder'
import useCreateBooking from '../hooks/useCreateBooking'

import {
  usePrevious
 } from '../../../utils/usePreviousValue'

const AddPatientDetail = () => {

  const [selectedPhotos, setSelectedPhotos] = useState([])
  const selectedDate = useNavigationParam("selectedDate", "")
  const serviceData = useNavigationParam("serviceData", {})
  const selectedPackage = useNavigationParam("selectedPackage", {})

  const [createBookingState, createBooking] = useCreateBooking()

  const [reason, setReason] = useState("")

  const navigation = useNavigation()
  const {
    selectedPatient
  } = useSelector(state => state.auth)

  const prevIsCreatingBooking = usePrevious(createBookingState.isLoading)

  useEffect(() => {
    if (prevIsCreatingBooking === true && createBookingState.isLoading === false && createBookingState.error === "") {
      if (!isEmpty(createBookingState.response)) {
        navigation.navigate("AppointmentConfirmation", {
          variant: "Service",
          selectedPackage,
          appointmentInfo: {
            appointment: {
              date: moment(selectedDate).utc().format(),
              patient: {
                name:patientName
              }
            }
          }
        })
      }
    }
  }, [prevIsCreatingBooking, createBookingState.isLoading, createBookingState.error])

  const onBackPress = () => {
    navigation.goBack()
  }

  const onTextChange = text => setReason(text)

  const onPhotosSelected = updatedPhotos => {
    console.debug(updatedPhotos)
    let updatedSelectedPhotos = [
      ...selectedPhotos.slice(),
      ...updatedPhotos
    ]
    setSelectedPhotos(updatedSelectedPhotos)
  }

  const onDeletePhoto = index => {
    setSelectedPhotos([...selectedPhotos.slice(0, index), ...selectedPhotos.slice(index + 1)])
  }

  const patientName = get(selectedPatient, "name", "")
  const patientAddress = get(selectedPatient, "address", "")
  const selectedService = get(serviceData, "name", "")

  const packageName = get(selectedPackage, "name", "")
  const packagePrice = get(selectedPackage, "price", "")

  const onConfirm = () => {
    if (!patientAddress || !reason) return
    
    const patientID = get(selectedPatient, "id", "")
    const timeInfo = moment(selectedDate).utc().format("YYYY-MM-DD HH:mm:ss")
    const packageID = get(selectedPackage, "id", "")
    const payment_status = "3"

    const formData = {
      patient: patientID,
      timeinfo: timeInfo,
      package: packageID,
      reason,
      payment_status,
      address: patientAddress
    }

    let payload = Object.keys(formData).map(item => ({name: item, data: String(formData[[item]])}))

    const image = selectedPhotos.map(item => {
      const {
        type,
        uri,
      } = item
     return {
       name: "document",
       filename: "image",
       data: RNFetchBlob.wrap(uri),
       type
     }
    })

    payload = [
      ...payload,
      ...image
    ]

    createBooking(payload)
  }

  const onEditClicked = mode => {
    if (mode === "package") {
      navigation.navigate("PackageSelection", {
        mode: "edit",
        serviceData: serviceData,
        selectedDate: moment(selectedDate).utc().format(),
        selectedPackage,
      })
    } else if (mode === "time") {
      navigation.navigate("SlotSelection", {
        mode: "edit",
        booking: serviceData,
        selectedDate: moment(selectedDate).utc().format(),
        selectedPackage,
      })
    } else if (mode === "address") {
      navigation.navigate("AddPatient", {
        mode: "edit",
        patient:selectedPatient
      })

    } else if (mode === "patient") {
      navigation.navigate("PatientProfile", {
        mode: "edit"
      })
    }
  }

  return (
    <AddPatientDetailHolder
      onBackPress={onBackPress}
      selectedPhotos={selectedPhotos}
      onPhotosSelected={onPhotosSelected}
      onDeletePhoto={onDeletePhoto}
      patientName={patientName}
      dateSelected={selectedDate}
      selectedService={selectedService}
      packageName={packageName}
      packagePrice={packagePrice}
      onConfirm={onConfirm}
      onTextChange={onTextChange}
      reason={reason}
      isLoading={createBookingState.isLoading}
      error={createBookingState.error}
      onEditClicked={onEditClicked}
      address={patientAddress}
    />
  )
}

export default AddPatientDetail