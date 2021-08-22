import React from 'react'

import {
  Text,
  View,
  StyleSheet,
} from 'react-native'

const ProgressIndicator = props => {
  const {
    data,
    currentIndex,
  } = props

  const renderItem = () => {
    let views = []
    for (let i=0; i<data.length; i++) {
      views = [
        ...views,
        (
          <Text key={`${i}-`} style={i === currentIndex ? styles.active : styles.inactive}>{data[i]}</Text>
        )
      ]
    }
    return views
  }

  return (
    <View style={styles.container}>
      {renderItem()}
    </View>
  )
}

const styles = StyleSheet.create({
  active: {
    fontSize: 25,
    fontWeight: "800",
    color: "#4A5CD0",
    marginTop: 20,
    fontFamily: "HKGrotesk-Bold",
    marginHorizontal: 3,
  },
  inactive: {
    fontSize: 25,
    fontWeight: "800",
    color: "#4A5CD0",
    marginTop: 20,
    fontFamily: "HKGrotesk-Bold",
    marginHorizontal: 3,
    opacity:0.1,
  },
  container: {
    flexDirection: "row",
    marginBottom: 30,
    marginHorizontal: 28,
    justifyContent: "center"
  }
})

export default ProgressIndicator