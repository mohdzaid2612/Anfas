import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  SectionList,
  ScrollView
} from 'react-native'

import get from 'lodash/get'

import {
  getMainBackgroundColor,
  getAppointmentTextColor
} from '../../utils/colorHelper'

import {
  widthScale,
  heightScale,
} from '../../utils/dimensionHelper'

import Loader from '../../components/Loader'
import ErrorView from '../../components/ErrorView'

import PatientContact from '../component/PatientCall'
import PatientAppointmentHistoryItem from '../component/PatientHistoryAppointmentItem'
import PatientHistoryHeader from '../component/PatientHistoryHeader'
import PatientTile from '../../Appointment/component/AppointmentTile'

const PatientHistoryHolder = props => {

  const {
    data,
    onCallClicked,
    onBackPress,
    onAppointmentClicked,
    isLoading,
    error,
    role,
  } = props

  const {
    appointment,
    patient,
    doctor,
  } = data

  const {
    mobile,
    name,
    age,
    sex,
  } = patient

  const {
    mobile: doctorMobile = "",
    first_name = "",
    last_name = "",
    age: doctorAge = "",
    sex: doctorSex = "",
    department,
  } = doctor

  const userMobile = role === "doctor" ? mobile : doctorMobile
  const userName = role === "doctor" ? name: (first_name !== "" || last_name !== "") ? `Dr. ${first_name} ${last_name}` : ""
  const userAge = role === "doctor" ? age: doctorAge
  const userSex = role === "doctor" ? sex : doctorSex

  const renderAppointmentTile = ({item, index, section}) => {
    const isCompletedConsultation = section.title === "Completed appoinments"
    const {
      patient,
      date,
      apointment_mode
    } = item

    let appointmentType = ""
    if (apointment_mode === "1") {
      appointmentType = "Video"
    } else if (apointment_mode === "0") {
      appointmentType = "In Person"
    }

    const name = get(patient, "name", "")
    const age = get(patient, "age", "")
    const gender = get(patient, "sex", "")

    return (
      <PatientAppointmentHistoryItem
        onPress={() => onAppointmentClicked(item)}
        name={name}
        gender={gender}
        age={`${age}`}
        date={date}
        appointmentType={appointmentType}
        showPatientInfoOnly={!isCompletedConsultation}
        showCompletedAppointmentInfo={isCompletedConsultation}
        showReason={true}
      />
    )
  }

  return (
    <View style={styles.container}>
      <PatientHistoryHeader
        onBackPress={onBackPress}
        role={role}
      />
      <Loader isLoading={isLoading}/>
      <ErrorView message={error}/>
      <ScrollView>
        <View style={styles.patientDetailContainer}>
          <PatientTile
            name={userName}
            gender={userSex}
            age={`${userAge}`}
            onTilePressed={() => {}}
            department={role === "doctor" ? "" :department}
          />
        </View>
        {userMobile !== "" && (<PatientContact
          phoneNumber={userMobile}
        />)}
        <SectionList
          sections={appointment}
          keyExtractor={(item, index) => item + index}
          renderItem={renderAppointmentTile}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.tileHeader}>{title}</Text>
          )}
        />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: getMainBackgroundColor()
  },
  tileHeader: {
    fontWeight: "500",
    fontFamily: "Roboto-Regular",
    fontSize: 14,
    lineHeight: 16,
    marginBottom: widthScale(16),
    letterSpacing: 0.6,
    paddingHorizontal: widthScale(16),
    color: getAppointmentTextColor(),
    marginTop: heightScale(10),
    marginLeft: 10,
  },
  patientDetailContainer: {
    marginTop: heightScale(20),
    marginHorizontal: widthScale(4)
  }
})

PatientHistoryHolder.defaultProps = {}

export default PatientHistoryHolder