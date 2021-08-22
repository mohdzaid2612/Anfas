import React, {
  useState,
} from 'react'
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native'

import {
  widthScale,
  heightScale,
} from '../../utils/dimensionHelper'

import DateTimePicker from '@react-native-community/datetimepicker'

import Header from '../../components/Header'
import PatientCreateForm from './PatientCreateForm'
import Button from '../../components/Button'
import Loader from '../../components/Loader'
import ErrorView from '../../components/ErrorView'

const AddPatientHolder = props => {
  const {
    onBackPress,
    onCreatePatientClicked,
    form,
    onChangeFormValue,
    errorForm,
    isLoading,
    error,
    mode,
  } = props

  const [showDatePicker, setShowDatePicker] = useState(false)

  const onDateChange = (event, date) => {
    if (event && event.type !== "dismissed") {
      setShowDatePicker(Platform.OS === "ios")
      onChangeFormValue("dob", date)
    }
  }

  const onDateTimeFieldPressed = () => {
    setShowDatePicker(!showDatePicker)
  }

  return (
    <View style={styles.container}>
      <Header
        onBackPress={onBackPress}
        headerTitle={"Patient’s Details"}
      />
      <Loader
        isLoading={isLoading}
      />
      <ErrorView
        message={error}
      />
      <ScrollView
      >
        <View style={styles.contentHolder}>
          <PatientCreateForm
            form={form}
            onChangeFormValue={onChangeFormValue}
            errorForm={errorForm}
            mode={mode}
            onDateTimeFieldPressed={onDateTimeFieldPressed}
          />
          <Button
            onPress={onCreatePatientClicked}
            buttonTitle="Save"
            buttonStyle={styles.btnStyle}
            buttonTitleStyle={styles.buttonText}
          />
        </View>
      </ScrollView>
      {showDatePicker && (
        <View>
          {Platform.OS === "ios" ? (<Text style={styles.okText} onPress={() => setShowDatePicker(false)}>Ok</Text>) : null}
          <DateTimePicker
            mode="date"
            display={Platform.OS === "android" ? "calendar" : "spinner"}
            maximumDate={new Date()}
            value={Platform.OS === "android" ? new Date() : form["dob"]}
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
  contentHolder: {
    justifyContent: "space-between",
    flex: 1,
  },
  btnStyle: {
    marginHorizontal: widthScale(16),
    marginBottom: heightScale(20),
    paddingVertical: heightScale(15),
    marginTop: heightScale(30)
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

export default AddPatientHolder

