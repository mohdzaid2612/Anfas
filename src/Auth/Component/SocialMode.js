import React from 'react'
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native'

import {
  widthScale,
  heightScale,
} from '../../utils/dimensionHelper'

import {
  getLoginTextColor,
  getTextFieldBorderColor,
} from '../../utils/colorHelper'

import GoogleIcon from '../../assets/Auth/google_ic.svg'
import FaceBookIcon from '../../assets/Auth/facebook_ic.svg'

const SocialMode = props => {
  const {
    onGoogleModeClicked,
    onFBModeClicked,
  } = props
  return (
    <View>
      <View style={{
        flexDirection: "row",
        justifyContent: "center",
        paddingBottom: heightScale(20)
      }}>
        <TouchableOpacity onPress={onGoogleModeClicked}>
          <View style={[styles.socialContainer, {
            marginRight: widthScale(20)
          }]}>
            <GoogleIcon
              width={30}
              height={30}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={onFBModeClicked}>
          <View style={styles.socialContainer}>
            <FaceBookIcon
              width={30}
              height={30}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  socialContainer: {
    borderRadius: 20,
    borderColor: "rgba(112, 112, 112, 0.3)",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    padding: 5,
  },
  socialContainerText: {
    color: getLoginTextColor(),
    fontFamily: "Roboto-Regular",
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 16.41,
  },
  orTextStyle: {
    color: getLoginTextColor(),
  },
  orContainer: {
    alignItems: "center",
    marginVertical: widthScale(16)
  },
  iconContainer: {
  },
  textContainer: {
    flex: 0.6,
    alignItems: "center"
  }
})

export default SocialMode