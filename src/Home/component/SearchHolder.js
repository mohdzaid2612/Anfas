import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native'

import {
  widthScale,
} from '../../utils/dimensionHelper'

import {
  getAppointmentTextColor,
  getBackgroundColor,
  getAppointmentTileBorderColor,
} from '../../utils/colorHelper'

import SearchIcon from '../../assets/Appointment/ic_search.svg'

const SearchHolder = props => {
  const {
    onSearchPress,
    containerStyle,
    editMode,
    searchTerm,
    onChangeSearchTerm,
    role,
  } = props

  const getTitle = () => {
    if (role === "doctor") {
      return `Search Patient`
    }
    else if (role === "patientuser") {
      return "Search Doctor"
    }
  }


  return (
    <TouchableOpacity onPress={onSearchPress} disabled={editMode}>
      <View style={[styles.container, containerStyle]}>
        <TextInput
          style={styles.patientText}
          editable={editMode}
          placeholder={getTitle()}
          autoFocus={true}
          value={searchTerm}
          onChangeText={onChangeSearchTerm}
        />
        <SearchIcon
          width={20}
          height={20}
        />
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: getBackgroundColor(),
    borderRadius: 12,
    borderColor: getAppointmentTileBorderColor(),
    borderWidth: 1,
    marginHorizontal: widthScale(16),
    marginBottom: widthScale(20),
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: widthScale(14),
    paddingVertical: widthScale(5),
    alignItems: "center"
  },
  patientText: {
    fontWeight: "500",
    fontFamily: "Roboto-Regular",
    fontSize: 14,
    lineHeight: 16,
    color: getAppointmentTextColor(),
    height: 50,
  }
})

SearchHolder.defaultProps = {
  containerStyle: {},
  editMode: false
}

export default SearchHolder