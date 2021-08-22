import React, {
  useState,
} from 'react'
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Platform,
} from 'react-native'

import get from 'lodash/get'

import moment from 'moment'

import HistoryTile from './HistoryTile'

import {
  widthScale, heightScale,
} from '../../utils/dimensionHelper'

import {
  getBackgroundColor,
} from '../../utils/colorHelper'

import AppointmentSelected from '../../assets/Appointment/ic_appointment_selected.svg'
import DateTimePicker from '@react-native-community/datetimepicker'
import EmptyAppointment from '../../assets/Appointment/EmptyAppointment.svg'

import Ionicons from 'react-native-vector-icons/Ionicons'

import Loader from '../../components/Loader'
import Error from '../../components/ErrorView'

const AppointmentHistoryHolder = props => {

  const {
    onAppointmentClicked,
    onChangeDate,
    selectedDate,
    isLoading,
    data,
    error,
  } = props

  const [showDatePicker, setDatePicker] = useState(false)

  const renderAppointmentTile = ({ item, index }) => {
    const {
      patient,
      date,
      package: selectedPackage,
    } = item

    const name = get(patient, "name", "")
    const gender = get(patient, "sex", "")

    const packageName = get(selectedPackage, "name", "")
    const formattedDate = moment(date).format("DD MMM YYYY \u2022 HH:mm A")
    return (
      <HistoryTile
        onHistoryTileClicked={() => onAppointmentClicked(item)}
        title={name}
        subTitle={packageName || formattedDate}
        gender={gender}
      />
    )
  }

  const onDateChangeClicked = () => {
    setDatePicker(true)
  }

  const onDateChange = (event, date) => {
    if (event && event.type !== "dismissed") {
      setDatePicker(Platform.OS === "ios")
      onChangeDate(moment(date).format("YYYY-MM-DD"))
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitleColor}>Appointment History</Text>
      </View>
      <Loader isLoading={isLoading} />
      <Error message={error} />
      <TouchableOpacity onPress={onDateChangeClicked}>
        <View style={styles.dateContainer}>
          <Ionicons name="calendar-outline" style={{ fontSize: 22, color: '#999' }} />
          <Text style={styles.dateText}>{selectedDate}</Text>
        </View>
      </TouchableOpacity>
      <FlatList
        data={data}
        renderItem={renderAppointmentTile}
        style={{
          marginTop: heightScale(12)
        }}
        ListEmptyComponent={(
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <EmptyAppointment
              width={350}
              height={350}
            />
          </View>
        )}
      />
      {showDatePicker && (
        <View>
          {Platform.OS === "ios" ? (<Text style={styles.okText} onPress={() => setDatePicker(false)}>Ok</Text>) : null}
          <DateTimePicker
            mode="date"
            display={Platform.OS === "android" ? "calendar" : "spinner"}
            value={new Date(selectedDate)}
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
  headerContainer: {
    paddingHorizontal: widthScale(16),
    backgroundColor: getBackgroundColor(),
    paddingTop: widthScale(20),
    paddingBottom: widthScale(20),
  },
  headerTitleColor: {
    fontFamily: "HKGrotesk-Bold",
    fontSize: 20,
    lineHeight: 21,
    color: "#001133",
  },
  dateText: {
    fontFamily: "HKGrotesk-Regular",
    fontSize: 16,
    lineHeight: 21.7,
    fontWeight: "600",
    color: '#999',
    marginLeft: 4
  },
  dateContainer: {
    marginVertical: widthScale(10),
    marginHorizontal: widthScale(20),
    flexDirection: "row",
    alignItems: "center"
  },
  okText: {
    alignSelf: "flex-end",
    marginHorizontal: widthScale(16),
    color: "#5451FF"
  }
})

AppointmentHistoryHolder.defaultProps = {

}

export default AppointmentHistoryHolder