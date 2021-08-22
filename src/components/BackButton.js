import React from 'react'
import {
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'

import IconBack from '../assets/Auth/backIcon.svg'

const BackButton = props => {
  const {
    onBackPress,
    containerStyle,
  } = props

  return (
    <TouchableOpacity onPress={onBackPress}>
      <View style={[styles.container, containerStyle]}>
        <IconBack
          width={15}
          height={15}
        />
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 5,
    marginTop: 6,
  }
})

BackButton.defaultProps = {
  containerStyle: {},
  onBackPress: () => {}
}

export default BackButton