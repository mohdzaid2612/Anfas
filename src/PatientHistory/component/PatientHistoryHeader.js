import React from 'react'
import {
  View,
  StyleSheet,
  Text,
} from 'react-native'

import {
  getBackgroundColor,
  getHeaderTitleColor,
  getPatientHistoryGenderColor,
} from '../../utils/colorHelper'
  
import {
  widthScale,
} from '../../utils/dimensionHelper'

import BackButton from '../../components/BackButton'

const PatientHistoryHeader = props => {
  const {
    onBackPress,
    role,
  } = props

  const title = role === "doctor" ? "Patient Details" : "Doctor Details"
  return (
    <View style={styles.container}>
      <BackButton
        onBackPress={onBackPress}
      />
      <View style={styles.infoHolder}>
        <Text style={styles.headerTitleColor}>{title}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  nameText: {
    fontFamily: "Roboto-Regular",
    fontSize: 20,
    lineHeight: 28,
    fontWeight: "700",
    color: getHeaderTitleColor(),
    marginBottom: widthScale(4)
  },
  genderText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    fontWeight: "400",
    color: getPatientHistoryGenderColor(),
  },
  container: {
    backgroundColor: getBackgroundColor(),
    paddingHorizontal: widthScale(20),
    paddingTop: widthScale(30),
    paddingBottom: widthScale(15),
    flexDirection: "row",
  },
  infoHolder: {
    marginLeft: widthScale(12),
    marginBottom: widthScale(4)
  },
  headerTitleColor: {
    fontFamily: "Roboto-Medium",
    fontSize: 20,
    lineHeight: 27.4,
    fontWeight: "700",
    color: getHeaderTitleColor()
  },
})

PatientHistoryHeader.defaultProps = {
  onBackPress: () => {}
}

export default PatientHistoryHeader