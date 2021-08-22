import React from 'react'
import {
  View,
  StyleSheet,
  Text,
  Image,
} from 'react-native'

import {
  widthScale,
  heightScale,
  ratioWidth,
} from '../../utils/dimensionHelper'

import Button from '../../components/Button'

const HomeServiceItem = props => {
  const {
    title,
    subTitle,
    image,
    onExploreClicked,
    containerStyle,
  } = props

  const source = image !== "" ? { uri: image } : require("../../assets/Appointment/serviceDefault.png")
  return (
    <View style={[styles.container, containerStyle]}>
      <View>
        <Image
          source={source}
          style={{
            height: "100%",
            width: ratioWidth(40),
            borderTopLeftRadius: 12,
            borderBottomLeftRadius: 12,
          }}
          resizeMode="cover"
        />
      </View>
      <View style={styles.infoHolder}>
        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.subTitleText}>{subTitle}</Text>
        <Button
          onPress={onExploreClicked}
          buttonTitle="Explore"
          buttonStyle={{
            width: "40%",
            paddingVertical: heightScale(5),
            borderRadius: 5,
          }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginRight: widthScale(16),
    backgroundColor: "#FFF",
    borderRadius: 12,
    elevation: 5
  },
  titleText: {
    fontFamily: "HKGrotesk-Bold",
    fontSize: 22,
    lineHeight: 22,
    color: "rgba(0, 17, 51, 1)",
  },
  subTitleText: {
    fontFamily: "HKGrotesk-Regular",
    fontSize: 12,
    lineHeight: 14,
    letterSpacing: 0.12,
    color: "rgba(75, 88, 121, 1)",
  },
  infoHolder: {
    paddingTop: heightScale(25),
    paddingBottom: heightScale(20),
    flexShrink: 1,
    paddingLeft: widthScale(15),
    paddingRight: widthScale(5),
    justifyContent: "space-between"
  }
})

HomeServiceItem.defaultProps = {
  title: "Nursing care home",
  subTitle: "Offering best certified and trained nurses at home to take care of all medical needs.",
  image: "",
  onExploreClicked: () => { },
  containerStyle: {}
}

export default HomeServiceItem