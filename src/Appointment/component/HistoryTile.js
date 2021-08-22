import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native'

import {
  widthScale,
  heightScale,
} from '../../utils/dimensionHelper'

import MaleIcon from '../../assets/Appointment/maleIcon.svg'
import FemaleIcon from '../../assets/Appointment/girlIcon.svg'

const HistoryTile = props => {
  const {
    onHistoryTileClicked,
    title,
    subTitle,
    gender,
  } = props

  const renderGenderIcon = () => {
    let view = null
    if (gender === "M") {
      view = (
        <MaleIcon
          width={40}
          height={40}
        />
      )
    } else if (gender === "F") {
      view = (
        <FemaleIcon
          width={40}
          height={40}
        />
      )
    }
    return view
  }

  return (
    <TouchableOpacity onPress={onHistoryTileClicked}>
      <View style={styles.container}>
        {renderGenderIcon()}
        <View style={styles.holder}>
          <Text style={styles.titleText}>{title}</Text>
          <Text style={styles.subTitleText}>{subTitle}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    marginHorizontal: widthScale(20),
    marginBottom: heightScale(20),
    padding: widthScale(16),
    flexDirection: "row",
    alignItems: "center"
  },
  titleText: {
    fontFamily: "HKGrotesk-Regular",
    fontSize: 16,
    lineHeight: 22,
    color: "#0B152D",
  },
  subTitleText: {
    fontFamily: "HKGrotesk-Bold",
    fontSize: 14,
    lineHeight: 22,
    color: "#4B5879",
    opacity: 0.9
  },
  holder: {
    marginLeft: widthScale(14),
    flexShrink:1
  }
})

export default HistoryTile