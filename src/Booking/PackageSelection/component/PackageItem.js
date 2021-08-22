import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native'

import {
  widthScale,
  heightScale,
} from '../../../utils/dimensionHelper'

import CheckBox from '../../../components/CheckBox'

const PackageItem = props => {
  const {
    title,
    price,
    onPackageSelected,
    isSelected,
  } = props
  return (
    <TouchableWithoutFeedback onPress={onPackageSelected}>
      <View style={styles.container}>
        <CheckBox
          isSelected={isSelected}
          mode="radio"
          onPress={onPackageSelected}
        />
        <View style={styles.infoHolder}>
          <Text style={styles.titleText}>{title}</Text>
          <Text style={styles.priceText}>{`${price} SAR`}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ECECFB",
    paddingVertical: heightScale(22),
    paddingHorizontal: widthScale(13),
    marginBottom: heightScale(14),
    marginHorizontal: widthScale(20),
    flexDirection: "row",
    alignItems: "center",
    elevation: 2
  },
  infoHolder: {
    flexShrink: 1,
    marginLeft: widthScale(12)
  },
  titleText: {
    fontFamily: "HKGrotesk-Regular",
    fontSize: 14,
    lineHeight: 22,
    color: "#0B152D",
    marginBottom: heightScale(8)
  },
  priceText: {
    fontFamily: "HKGrotesk-Bold",
    fontWeight: "900",
    fontSize: 16,
    lineHeight: 22,
    color: "#0B152D",
  },
})

export default PackageItem