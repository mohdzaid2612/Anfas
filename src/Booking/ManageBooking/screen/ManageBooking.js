import React, {
  useState,
  useEffect,
} from 'react'
import {
  useNavigation,
  useNavigationParam
} from 'react-navigation-hooks'

import {
  useSelector,
} from 'react-redux'

import get from 'lodash/get'
import moment from 'moment'
import isEmpty from 'lodash/isEmpty'
import RNFetchBlob from 'rn-fetch-blob'

import ManageBookingHolder from '../component/ManageBookingHolder'
import CancelPopUp from '../../../components/CancelPopUp'

import {
  APPOINTMENT_MODE,
  DOCUMENT_MODE,
} from '../../../utils/constant'

import {
  usePrevious,
} from '../../../utils/usePreviousValue'

import useCancelBooking from '../hooks/useCancelBooking'
import useDeleteDocument from '../hooks/useDeleteDocument'
import useUploadDocument from '../hooks/useUploadDocument'

const ManageBooking = () => {

  const {
    user,
  } = useSelector(state => state.auth)

  const [showCancelPopUp, setShowCancelPopUp] = useState(false)

  const [
    cancelBookingState,
    cancelBooking
  ] = useCancelBooking()

  const [
    deleteDocumentState,
    deleteDocument
  ] = useDeleteDocument()

  const [uploadDocumentState, uploadDocument] = useUploadDocument()

  const [documentList, setDocumentList] = useState([])
  const [documentSelectedDelete, setDocumentSelectedDelete] = useState("")
  const [documentSelectedUpload, setDocumentSelectedUpload] = useState([])

  const prevIsCancellingBooking = usePrevious(cancelBookingState.isLoading)
  const prevIsDeletingBooking = usePrevious(deleteDocumentState.isLoading)
  const prevIsUploadingDocument = usePrevious(uploadDocumentState.isLoading)
  
  const navigation = useNavigation()
  const data = useNavigationParam("data")

  const role = get(user, "role", "")

  const date = get(data, "timeinfo", "")
  const packagePrice = get(data, "package.price", "")
  const packageName = get(data, "package.name", "")
  const serviceName = get(data, "package.service.name", "")
  const serviceDetail = get(data, "package.service.description", "")
  const patientName = get(data, "patient.name", "")
  const patientDOB = get(data, "patient.dob", "")

  const assignedStaff = get(data, "assigned_to1")
  const appointmentStatus = get(data, "status")
  const uploads = get(data, "uploads", [])

  const age = moment().diff(patientDOB, 'years',false)

  useEffect(() => {
    setDocumentList(uploads)
  }, [])

  useEffect(() => {
    if (prevIsCancellingBooking === true && cancelBookingState.isLoading === false && cancelBookingState.error === "") {
      if(!isEmpty(cancelBookingState.response)) {
        navigation.navigate("AppointmentConfirmation", {
          variant: "Service",
          selectedPackage: {
            name: packageName,
            price: packagePrice
          },
          type: "CANCELLED",
          appointmentInfo: {
            appointment: {
              date: moment(date).utc().format(),
            }
          }
        })
      }
    }
  }, [prevIsCancellingBooking, cancelBookingState.isLoading, cancelBookingState.error])

  useEffect(() => {
    if (prevIsDeletingBooking === true && deleteDocumentState.isLoading === false && deleteDocumentState.error === "") {
      let updatedList = documentList.filter(item => item !== documentSelectedDelete)
      setDocumentList(updatedList)
    } else if (prevIsDeletingBooking === true && deleteDocumentState.isLoading === false && deleteDocumentState.error !== "") {
      setDocumentSelectedDelete("")
    }
  }, [prevIsDeletingBooking, deleteDocumentState.isLoading, deleteDocumentState.error])

  useEffect(() => {
    if (prevIsUploadingDocument === true && uploadDocumentState.isLoading === false && uploadDocumentState.error === "") {
      let updatedList = documentSelectedUpload.map(item => item.uri)
      setDocumentList([
        ...documentList,
        ...updatedList
      ])
      setDocumentSelectedUpload([])
    } else if (prevIsUploadingDocument === true && uploadDocumentState.isLoading === false && uploadDocumentState.error !== "") {
      setDocumentSelectedUpload([])
    }
  }, [prevIsUploadingDocument, uploadDocumentState.isLoading, uploadDocumentState.error])

  const onBackPress = () => {
    navigation.goBack()
  }

  const showAppointmentActionButton = ((role === "patientuser") && (appointmentStatus !== APPOINTMENT_MODE.COMPLETED) && (appointmentStatus !== APPOINTMENT_MODE.CANCELLED))

  const onRescheduleButtonClicked = () => {
    const payload = {
      mode: "reschedule",
      selectedPackage: get(data, "package", {}),
      booking: get(data, "package.service", {}),
      selectedDate: get(data, "timeinfo", {}),
      metaData: data,
    }
    navigation.navigate("SlotSelection", payload)
  }

  const onCancelButtonClicked = () => {
    setShowCancelPopUp(true)
  }

  const onDeletePhoto = url => {
    const id = get(data, "id", "")
    setDocumentSelectedDelete(url)
    deleteDocument({
      objtype: DOCUMENT_MODE.BOOKING,
      objid: id,
      file_url: url
    })
  }

  const onCancelClicked = reason => {
    const id = get(data, "id", "")
    setShowCancelPopUp(false)
    cancelBooking({
      booking_id: id,
      cancel_reason: reason,
    })
  }

  const onCloseClicked = () => {
    setShowCancelPopUp(false)
  }

  const onPhotosSelected = files => {
    const image = files.map(item => {
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
    const id = get(data, "id", "")
    const formData = {
      objtype: DOCUMENT_MODE.BOOKING,
      objid: id,
    }
    let payload = Object.keys(formData).map(item => ({name: item, data: String(formData[[item]])}))

    payload = [
      ...payload,
      ...image
    ]

    setDocumentSelectedUpload(files)
    uploadDocument(payload)
  }

  return (
    <>
      <ManageBookingHolder
        onBackPress={onBackPress}
        date={date}
        packagePrice={packagePrice}
        packageName={packageName}
        serviceName={serviceName}
        serviceDetail={serviceDetail}
        patientName={patientName}
        patientAge={age}
        assignedStaff={assignedStaff}
        appointmentStatus={appointmentStatus}
        showAppointmentActionButton={showAppointmentActionButton}
        onRescheduleButtonClicked={onRescheduleButtonClicked}
        onCancelButtonClicked={onCancelButtonClicked}
        uploads={documentList}
        onDeletePhoto={onDeletePhoto}
        isLoading={cancelBookingState.isLoading || deleteDocumentState.isLoading || uploadDocumentState.isLoading}
        error={cancelBookingState.error || deleteDocumentState.error || uploadDocumentState.error}
        onPhotosSelected={onPhotosSelected}
      />
      <CancelPopUp
        isVisible={showCancelPopUp}
        onCancelClicked={onCancelClicked}
        onCloseClicked={onCloseClicked}
      />
    </>
  )
}

export default ManageBooking