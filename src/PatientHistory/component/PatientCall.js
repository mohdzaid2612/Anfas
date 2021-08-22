import React from 'react'
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'

import ICONCALL from '../../assets/Appointment/ic_call.svg'

import {
  getBackgroundColor,
  getPhoneNumberColor,
  getPatientHistoryPhoneNumberCardBorderColor,
} from '../../utils/colorHelper'

import {
  widthScale,
  heightScale,
} from '../../utils/dimensionHelper'

const PatientCall = props => {
  const {
    phoneNumber,
    onCallClicked,
  } = props
  return (
    <TouchableOpacity onPress={onCallClicked}>
      <View style={styles.container}>
        <View>
          <ICONCALL
            width={50}
            height={50}
          />
        </View>
        <Text style={styles.phoneNumberText}>{phoneNumber}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: getBackgroundColor(),
    paddingHorizontal: widthScale(10),
    paddingVertical: heightScale(10),
    flexDirection: "row",
    borderRadius: 10,
    borderColor: getPatientHistoryPhoneNumberCardBorderColor(),
    borderWidth: 1,
    alignItems: "center",
    marginHorizontal: widthScale(20),
    marginBottom: widthScale(10),
    marginTop: widthScale(10)
  },
  phoneNumberText: {
    fontFamily: "Roboto-Regular",
    fontSize: 18,
    lineHeight: 21,
    fontWeight: "500",
    color: getPhoneNumberColor(),
    marginLeft: widthScale(20)
  }
})

PatientCall.defaultProps = {
  phoneNumber: "+971 8894065231",
  onCallClicked: () => {},
}

export default PatientCall