import React from 'react'
import {
  Text,
  View,
  StyleSheet,
} from 'react-native'

import BackIcon from './BackButton'
import {
  getBackgroundColor,
  getHeaderTitleColor
} from '../utils/colorHelper'

import {
  widthScale,
  heightScale,
} from '../utils/dimensionHelper'

const Header = props => {
  const {
    headerTitle,
    onBackPress,
  } = props
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerIconContainer}>
        <BackIcon
          onBackPress={onBackPress}
          containerStyle={{
            marginTop: widthScale(8)
          }}
        />
      </View>
      <View style={styles.headerTextContainer}>
        <Text style={styles.headerTitleColor}>{headerTitle}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    paddingHorizontal: widthScale(16),
    paddingVertical: heightScale(20)
  },
  headerIconContainer: {
    flex: 0.1,
  },
  headerTextContainer: {
    flex: 0.8,
  },
  headerTitleColor: {
    fontFamily: "HKGrotesk-Bold",
    fontSize: 20,
    lineHeight: 27.4,
    color: getHeaderTitleColor()
  },
})

export default Header