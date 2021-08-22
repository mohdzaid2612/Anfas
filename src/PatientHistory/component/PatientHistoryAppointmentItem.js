import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'

import {
  getPatientReasonColor,
  getPatientAppointmentTypeColor,
  getPatientHistoryAppointmentTimeColor,
  getPatientHistoryAppointmentBackgroundColor,
  getBackgroundColor,
  getAppointmentTextColor,
} from '../../utils/colorHelper'

import {
  widthScale,
  heightScale,
} from '../../utils/dimensionHelper'

import moment from 'moment'

import ICONVC from '../../assets/Appointment/ic_videocall.svg'

const PatientHistoryAppointmentItem = props => {
  const {
    date,
    reason,
    appointmentType,
    showReason,
    containerStyle,
    dateStyle,
    onPress,
  } = props


  const time = moment(date).format("hh:mm")
  const timeSuffix = moment(date).format("A")

  const dateFormatted = moment(date).format("DD MMM YYYY")
  const weekDay = moment(date).format("ddd")
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.container, containerStyle]}>
        {date !== "" && (<View style={styles.timeContainer}>
          <Text style={styles.timeText}>{time}</Text>
          <Text style={styles.timeSuffixText}>{timeSuffix}</Text>
        </View>)}
        <View style={styles.infoContainer}>
          {date !== "" && (<View style={styles.infoHolder}>
            {showReason && (<Text style={styles.reasonText}>{reason}</Text>)}
            <Text style={[styles.dateFormattedText, dateStyle]}>{`${dateFormatted} \u2022 ${weekDay}`}</Text>
          </View>)}
          {appointmentType === "Video" && (<View style={styles.iconContainer}>
            <ICONVC
              width={34}
              height={34}
            />
          </View>)}
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: getBackgroundColor(),
    paddingHorizontal: widthScale(16),
    paddingVertical: heightScale(18),
    marginHorizontal: widthScale(20),
    marginBottom: widthScale(10),
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  timeContainer: {
    flex: 0.2,
    backgroundColor: getPatientHistoryAppointmentBackgroundColor(),
    padding: widthScale(8),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  timeText: {
    fontFamily: "Roboto-Regular",
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "700",
    color: getPatientHistoryAppointmentTimeColor()
  },
  timeSuffixText: {
    fontFamily: "Roboto-Regular",
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "700",
    color: getPatientHistoryAppointmentTimeColor()
  },
  infoContainer: {
    flex: 0.8,
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: widthScale(14),
    alignItems: "center"
  },
  iconContainer: {

  },
  infoHolder: {
  },
  reasonText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 21.75,
    fontWeight: "600",
    color: getPatientReasonColor(),
    marginBottom: widthScale(4)
  },
  dateFormattedText: {
    fontFamily: "Roboto-Regular",
    fontSize: 13,
    lineHeight: 16,
    fontWeight: "700",
    color: getAppointmentTextColor(),
    marginBottom: widthScale(4)
  },
  appointmentTypeText: {
    fontFamily: "Roboto-Regular",
    fontSize: 12,
    lineHeight: 16.34,
    fontWeight: "400",
    color: getPatientAppointmentTypeColor()
  }
})

PatientHistoryAppointmentItem.defaultProps = {
  date: new Date(),
  reason: "Consultation",
  showReason: true,
  containerStyle: {},
  dateStyle: {},
}

export default PatientHistoryAppointmentItem

