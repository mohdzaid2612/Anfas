import React, {
  useState,
} from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native'

import moment from 'moment'

import CountryPicker from 'react-native-country-picker-modal'

import {
  widthScale,
  heightScale,
} from '../../utils/dimensionHelper'
  
import {
  getHeaderTitleColor,
  getTextFieldBorderColor
} from '../../utils/colorHelper'

import IconName from '../../assets/AddPatient/ic_profile.svg'
import IconCalender from '../../assets/AddPatient/ic_calender.svg'
import IconPhoneCall from '../../assets/AddPatient/ic_call.svg'
import IconGender from '../../assets/AddPatient/ic_gender.svg'

import Input from '../../components/Input'
import CheckBox from '../../components/CheckBox'

const PatientCreateForm = props => {
  const {
    form,
    onChangeFormValue,
    errorForm,
    mode,
    onDateTimeFieldPressed,
  } = props

  const renderGenderCheckBox = () => (
    ["Male", "Female"].map((item, index) => (
      <CheckBox
        key={index}
        isSelected={form["gender"] === item}
        label={item}
        containerStyle={index === 1 ? {
          marginLeft: widthScale(30)
        }: {}}
        onPress={() => onChangeFormValue("gender", item)}
      />
    ))
  )

  const onCountryChange = country => {
    onChangeFormValue("country", country)
  }

  return (
    <View style={styles.container}>
      {mode !== "edit" && (<View style={styles.fieldContainer}>
        <View style={styles.labelContainer}>
          <Text style={[styles.labelText, {
            marginLeft:4,
          }]}>Patient Code</Text>
        </View>
        <Input
          bodyContainerStyle={styles.inputContainer}
          val={form["patientCode"]}
          placeholder="Enter patient code"
          name="patientCode"
          onTextChange={onChangeFormValue}
          error={errorForm["patientCode"]}
        />
      </View>)}
      {mode !== "edit" && (
        <Text style={{
          alignSelf: "center",
          color:"#5D6987"
        }}>------ or ------</Text>
      )}
      <View style={styles.fieldContainer}>
        <View style={styles.labelContainer}>
          <IconName
            width={20}
            height={20}
          />
          <Text style={styles.labelText}>Name</Text>
        </View>
        <Input
          bodyContainerStyle={styles.inputContainer}
          placeholder="Enter patient name"
          val={form["name"]}
          name="name"
          onTextChange={onChangeFormValue}
          error={errorForm["name"]}
        />
      </View>
      <View style={styles.fieldContainer}>
        <View style={styles.labelContainer}>
          <IconName
            width={20}
            height={20}
          />
          <Text style={styles.labelText}>Address</Text>
        </View>
        <Input
          bodyContainerStyle={styles.inputContainer}
          placeholder="Enter patient address"
          val={form["address"]}
          name="address"
          onTextChange={onChangeFormValue}
          error={errorForm["address"]}
        />
      </View>
      <View style={styles.fieldContainer}>
        <View style={styles.labelContainer}>
          <IconCalender
            width={20}
            height={20}
          />
          <Text style={styles.labelText}>Enter DOB</Text>
        </View>
        <TouchableOpacity onPress={onDateTimeFieldPressed}>
          <View style={[styles.inputContainer, {
            width: "100%",
            paddingVertical: 16,
          }]}>
            <Text style={styles.dobTextStyle}>{moment(form["dob"]).format("DD/MM/YYYY")}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.fieldContainer}>
        <View style={styles.labelContainer}>
          <IconPhoneCall
            width={20}
            height={20}
          />
          <Text style={styles.labelText}>Phone Number</Text>
        </View>
        <View style={styles.phoneNumberContainer}>
           <CountryPicker
            withCallingCodeButton={true}
            onSelect={onCountryChange}
            countryCode={form["country"].cca2}
            withAlphaFilter={true}
            withFilter={true}
            containerButtonStyle={[styles.inputContainer, {
              paddingVertical: widthScale(10)
            }]}
          />
          <Input
            bodyContainerStyle={styles.inputContainer}
            placeholder="Enter your phone number"
            keyboardType="number-pad"
            val={form["phoneNumber"]}
            name="phoneNumber"
            onTextChange={onChangeFormValue}
            error={errorForm["phoneNumber"]}
            containerStyle={{
              flex:1,
              marginLeft: widthScale(10)
            }}
          />
        </View> 
      </View>
      <View style={styles.fieldContainer}>
        <View style={styles.labelContainer}>
          <IconGender
            width={20}
            height={20}
          />
          <Text style={styles.labelText}>Gender</Text>
        </View>
        <View style={styles.checkBoxContainer}>
          {renderGenderCheckBox()}
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: widthScale(16),
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  labelText: {
    fontSize: 16,
    lineHeight: 18.75,
    fontFamily: "HKGrotesk-Regular",
    color: getHeaderTitleColor(),
    fontWeight: "400",
    marginLeft: widthScale(12)
  },
  inputContainer: {
    borderWidth: 0,
    borderBottomWidth: 1,
    paddingHorizontal: 0,
    borderRadius: 0,
    borderColor: getTextFieldBorderColor() 
  },
  fieldContainer: {
    marginTop: heightScale(10),
    marginBottom: heightScale(15),
  },
  checkBoxContainer: {
    marginTop: heightScale(10),
    flexDirection: "row",
  },
  phoneNumberContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  dobTextStyle: {
    fontFamily: "HKGrotesk-Regular",
  }
})

export default PatientCreateForm