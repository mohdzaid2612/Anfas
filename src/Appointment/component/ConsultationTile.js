import React from 'react'
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native'

import momet from 'moment'

import FemaleDoctorIcon from '../../assets/Appointment/doctor.svg'

import {
  getBackgroundColor, getButtonBackGround,
} from '../../utils/colorHelper'

import {
  widthScale,
  heightScale,
} from '../../utils/dimensionHelper'

const ConsultationTile = props => {

  const {
    department,
    name,
    date,
    onTilePressed,
    containerStyle
  } = props

  const getDoctorIcon = () => {
    return (
      <FemaleDoctorIcon
        width={150}
        height={120}
      />
    )
  }

  const formattedDate = momet(date).format("DD MMM YYYY \u2022 HH:mm A")

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onTilePressed}>
      <View style={[styles.container, containerStyle, { backgroundColor: '#fff' }]}>
        {getDoctorIcon()}
        <View style={styles.infoHolder}>
          <Text style={styles.nameText}>{name}</Text>
          {department !== "" && (<Text style={styles.departmentText}>{department}</Text>)}
          <Text style={[styles.dateText, department === "" && {
            marginTop: heightScale(8)
          }]}>{formattedDate}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginHorizontal: widthScale(16),
    marginTop: 5,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    elevation: 3,
    marginBottom: 5,
  },
  departmentText: {
    fontFamily: "HKGrotesk-Regular",
    fontWeight: "700",
    fontSize: 10,
    lineHeight: 14,
    color: "#777A95",
    marginVertical: heightScale(8),
  },
  nameText: {
    fontFamily: "HKGrotesk-Bold",
    fontSize: 16,
    lineHeight: 22.4,
    color: "#001133",
  },
  dateText: {
    fontFamily: "HKGrotesk-Bold",
    fontSize: 14,
    lineHeight: 16,
    color: getButtonBackGround(),
  },
  infoHolder: {
    paddingTop: heightScale(21),
    paddingBottom: heightScale(29),
    paddingLeft: widthScale(10),
    flexShrink: 1,
    justifyContent: "center",
  }
})

ConsultationTile.defaultProps = {
  containerStyle: {},
  department: ""
}

export default ConsultationTile