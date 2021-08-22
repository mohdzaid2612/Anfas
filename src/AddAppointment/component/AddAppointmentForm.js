import React, {
  useState,
} from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  TextInput,
} from 'react-native'

import moment from 'moment'

import {
  widthScale,
  heightScale,
} from '../../utils/dimensionHelper'
  
import {
  getBackgroundColor,
  getPatientHistoryPhoneNumberCardBorderColor,
} from '../../utils/colorHelper'

import CheckBox from '../../components/CheckBox'

import IconCalender from '../../assets/AddPatient/ic_calender.svg'

const AddAppointmentForm = props => {

  const {
    form,
    onChangeFormValue,
    errorForm,
    onDateIconSelected,
  } = props

  const renderGenderCheckBox = () => (
    ["Video", "In Person"].map((item, index) => (
      <CheckBox
        key={index}
        isSelected={form["modeAppointment"] === item}
        label={item}
        containerStyle={index === 1 ? {
          marginLeft: widthScale(30)
        }: {}}
        onPress={() => onChangeFormValue("modeAppointment", item)}
      />
    ))
  )

  const hour = moment(form["appointmentTime"]).format("HH")
  const minute = moment(form["appointmentTime"]).format("mm")
  const dateStringUTC = `${moment(form["appointmentDate"]).startOf("day").add(hour, "hour").add(minute, "minute").format("DD MMMM, dddd hh:mm A")}`
  return (
    <View style={styles.container}>
      <View style={styles.appointmentDateHolder}>
        <Text style={styles.selectedDateText}>{dateStringUTC}</Text>
        <TouchableOpacity onPress={onDateIconSelected}>
          <IconCalender
            width={20}
            height={20}
          />
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.concernText}>How can we help you? Describe your problem</Text>
        <TextInput
          multiline={true}
          placeholder="Write here..."
          underlineColorAndroid="transparent"
          style={styles.textAreaContainer}
          onChangeText={text => onChangeFormValue("comment", text)}
        />
      </View>
      <View style={{
        marginTop: heightScale(30)
      }}>
        <Text style={styles.concernText}>Mode of apppointment</Text>
        <View style={styles.modeContainer}>
          {renderGenderCheckBox()}
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: widthScale(16),
    paddingVertical: heightScale(12)
  },
  appointmentDateHolder: {
    backgroundColor: getBackgroundColor(),
    paddingHorizontal: widthScale(16),
    paddingVertical: heightScale(12),
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 10,
    borderColor: getPatientHistoryPhoneNumberCardBorderColor(),
    marginBottom: heightScale(30),
    borderWidth:1
  },
  selectedDateText: {
    fontFamily: "HKGrotesk-Regular",
    fontSize: 18,
    lineHeight: 21.4,
    fontWeight: "500",
    color: "#25282B"
  },
  concernText: {
    fontFamily: "HKGrotesk-Bold",
    fontSize: 16,
    lineHeight: 18.75,
    fontWeight: "400",
    color: "#222222",
    marginBottom: widthScale(10),
    marginLeft: widthScale(4)
  },
  textAreaContainer: {
    backgroundColor: "#FFF",
    minHeight: 100,
    borderStyle: "solid",
    borderRadius: 10,
    borderColor: getPatientHistoryPhoneNumberCardBorderColor(),
    textAlignVertical: "top",
    paddingHorizontal: 10,
    borderWidth:1
  },
  modeContainer: {
    flexDirection: "row",
    marginLeft: widthScale(4)
  }
})

export default AddAppointmentForm