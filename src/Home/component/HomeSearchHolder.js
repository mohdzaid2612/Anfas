import React from 'react'
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native'

import FindDoctorBanner from '../../assets/Auth/banner.png'

import {
  widthScale,
  heightScale,
} from '../../utils/dimensionHelper'

const HomeSearchHolder = props => {
  const {
    onSearchPress,
    role,
  } = props
  return (
    <TouchableOpacity onPress={onSearchPress}>
      <View style={styles.container}>
        <View style={styles.infoHolder}>
          <Text style={styles.findText}>{`Lets Find your ${role === "doctor" ? "Patient" : "Specialist"}`}</Text>
          <View style={{
            position: "absolute",
            right: -15,
            width: 170,
            height: 120,
            top: -44
          }}>
            <Image
              style={{
                width: 170,
                height: 122,
              }}
              source={FindDoctorBanner}
            />
          </View>
        </View>
        <View style={styles.searchHolder}>
          <Text style={styles.searchText}>Search</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: widthScale(16),
    backgroundColor: "rgba(124, 122, 248, 1)",
    borderRadius: 16,
    padding: widthScale(16),
  },
  findText: {
    fontFamily: "HKGrotesk-Bold",
    fontWeight: "800",
    fontSize: 22,
    lineHeight: 22.4,
    color: "#F5F8FF",
    width: "50%",
    paddingVertical: heightScale(14)
  },
  infoHolder: {
    flexDirection: "row",
    flex: 1,
  },
  searchHolder: {
    borderWidth: 2,
    borderRadius: 15,
    borderColor: "rgba(175, 182, 250, 1)",
    backgroundColor: "rgba(142, 146, 249, 1)",
    paddingVertical: heightScale(15),
    paddingHorizontal: widthScale(16)
  },
  searchText: {
    fontFamily: "HKGrotesk-Regular",
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 16,
    color: "#F5F8FF",
  }
})

export default HomeSearchHolder