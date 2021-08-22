import React from 'react'
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'

import moment from 'moment'

import UnisexIcon from '../../assets/Appointment/avatar_patient/unisex.svg'

import {
  widthScale,
} from '../../utils/dimensionHelper'

import {
  getPatientNameColor,
  getTimeColor,
  getAppointmentTextColor,
  getBackgroundColor,
  getAppointmentTileBorderColor,
} from '../../utils/colorHelper'


const AppointmentTile = props => {
  const {
    name,
    datetime,
    gender,
    age,
    showPatientInfoOnly,
    showCompletedAppointmentInfo,
    onTilePressed,
    department = "",
  } = props

  const date = moment(datetime).format("DD MMM YYYY")
  const time = moment(datetime).format("HH:mm A")

  return (
    <TouchableOpacity onPress={onTilePressed}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <UnisexIcon
            width={40}
            height={40}
          />
        </View>
        <View style={styles.infoHolder}>
          <View style={styles.rowContainer}>
            <View>
              <Text style={styles.nameText}>{name}</Text>
              {(!showPatientInfoOnly && department !== "") && (
                <Text style={[styles.attendeText, {

                }]}>{department}</Text>
              )}
            </View>
            {(showPatientInfoOnly && !showCompletedAppointmentInfo) && (<Text style={styles.dateText}>{date}</Text>)}
          </View>
          <View style={styles.rowContainer}>
            {(gender !== "" && age !== "") && (<Text style={styles.genderText}>{`${gender} \u2022 ${age} Year`}</Text>)}
            {(showPatientInfoOnly && !showCompletedAppointmentInfo) && (<Text style={styles.timeText}>{time}</Text>)}
          </View>
          {(showCompletedAppointmentInfo) && (
            <View style={styles.completedAppointmentDateContainer}>
              <Text style={styles.dateText}>{date}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: getBackgroundColor(),
    flexDirection: "row",
    padding: widthScale(14),
    marginHorizontal: widthScale(16),
    marginBottom: widthScale(12),
    borderRadius: 10,
    alignItems: "center",
    borderColor: getAppointmentTileBorderColor(),
    borderWidth: 1
  },
  infoHolder: {
    flex: 0.85,
  },
  imageContainer: {
    flex: 0.15
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  nameText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "500",
    color: getPatientNameColor()
  },
  dateText: {
    fontFamily: "Roboto-Regular",
    fontSize: 14,
    lineHeight: 18,
    color: getAppointmentTextColor()
  },
  genderText: {
    fontFamily: "Roboto-Regular",
    fontSize: 14,
    lineHeight: 18,
    color: getAppointmentTextColor()
  },
  timeText: {
    fontFamily: "Roboto-Regular",
    fontSize: 14,
    lineHeight: 14,
    color: getTimeColor(),
    fontWeight: "700"
  },
  completedAppointmentDateContainer: {
    marginTop: widthScale(4)
  },
  attendeText: {
    fontFamily: "Roboto-Regular",
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: 0.6,
    color: getAppointmentTextColor(),
    marginBottom: widthScale(8)
  },
})

AppointmentTile.defaultProps = {
  name: "",
  datetime: new Date(),
  gender: "",
  age: "",
  showPatientInfoOnly: false,
  showCompletedAppointmentInfo: false,
  onTilePressed: () => { }
}

export default AppointmentTile