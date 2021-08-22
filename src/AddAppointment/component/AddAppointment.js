import React from 'react'
import {
  StyleSheet,
  View,
  Text,
} from 'react-native'

import {
  widthScale,
  heightScale,
} from '../../utils/dimensionHelper'

import DateTimePicker from '@react-native-community/datetimepicker'

import Header from '../../components/Header'
import Button from '../../components/Button'
import Loader from '../../components/Loader'
import ErrorView from '../../components/ErrorView'

import AddAppointmentForm from '../component/AddAppointmentForm'

const AddAppointmentHolder = props => {

  const {
    onBackPress,
    onAppointmentCreateClicked,
    isLoading,
    error,
    form,
    onChangeFormValue,
    errorForm,
    onDateIconSelected,
    pickerConfig,
    setPickerConfig
  } = props

  const onDateChange = (event, date) => {
    if (event && event.type === "dismissed") {
      setPickerConfig({
        isVisible: false,
        mode: Platform.OS === "ios" ? "datetime" : "datetime",
        display: Platform.OS === "ios" ? "spinner" : "calendar"
      })
      return
    }

    if (Platform.OS === "ios") {
      onChangeFormValue("appointmentDate", date)
      onChangeFormValue("appointmentTime", date)
      return
    }

    if (pickerConfig.mode === "datetime") {
      const updatedValue = date
      setPickerConfig({
        mode: "time",
        display: "clock",
        isVisible: true
      })
      onChangeFormValue("appointmentDate", updatedValue)
    }
    else if (pickerConfig.mode === "time") {
      const updatedValue = date
      setPickerConfig({
        isVisible: false,
        mode: Platform.OS === "ios" ? "datetime" : "datetime",
        display: Platform.OS === "ios" ? "default" : "calendar"
      })
      onChangeFormValue("appointmentTime", updatedValue)
    }
  }

  const onOKIOSPressed = () => {
    setPickerConfig({
      ...pickerConfig,
      isVisible: false
    })
  }


  return (
    <View style={styles.container}>
      <Header
        onBackPress={onBackPress}
        headerTitle={"Appointment"}
      />
      <Loader isLoading={isLoading} />
      <ErrorView message={error} />
      <View style={styles.holder}>
        <AddAppointmentForm
          form={form}
          errorForm={errorForm}
          onChangeFormValue={onChangeFormValue}
          onDateIconSelected={onDateIconSelected}
        />
        <Button
          onPress={onAppointmentCreateClicked}
          buttonTitle="Continue"
          buttonStyle={styles.btnStyle}
          buttonTitleStyle={styles.buttonText}
        />
      </View>
      {pickerConfig.isVisible && (
        <View>
          {Platform.OS === "ios" ? (<Text style={styles.okText} onPress={onOKIOSPressed}>Ok</Text>) : null}
          <DateTimePicker
            mode={pickerConfig.mode}
            display={pickerConfig.display}
            minimumDate={new Date()}
            value={Platform.OS === "android" ? new Date() : new Date(form["appointmentTime"])}
            onChange={onDateChange}
          />
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  holder: {
    flex: 1,
    justifyContent: "space-between"
  },
  btnStyle: {
    marginHorizontal: widthScale(16),
    marginBottom: heightScale(20),
    paddingVertical: heightScale(15),
  },
  buttonText: {
    fontFamily: "HKGrotesk-Bold",
    fontSize: 16,
    lineHeight: 22,
    color: "rgba(255, 255, 255, 1)",
  },
  okText: {
    alignSelf: "flex-end",
    marginHorizontal: widthScale(16),
    color: "#5451FF"
  }
})

export default AddAppointmentHolder
