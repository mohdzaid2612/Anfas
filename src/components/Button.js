import React from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'

import {
  getButtonBackGround,
  getButtonTextColor
} from '../utils/colorHelper'

import {
  heightScale,
} from '../utils/dimensionHelper'

const Button = props => {
   const {
    onPress,
    iconText,
    buttonTitle,
    buttonStyle,
    buttonTitleStyle,
    iconTextStyle,
    iconRequired,
    isDisabled,
    iconView,
    iconViewContainerStyle,
   } = props

   const onButtonClickListener = () => {
      if (isDisabled) return
      onPress()
   }

   const {
     container,
     buttonText,
     iconStyle,
     disabledButtonText,
     disabledContainer,
     disbaledIconText,
     iconViewStyle,
   } = styles
   return (
       <TouchableOpacity
         activeOpacity={0.7}
         onPress={onButtonClickListener}
          accessibilityLabel="touchable_container_home_button"
         testID="touchable_container_home_button"
       >
           <View
             style={[
               container,
               buttonStyle,
               isDisabled && disabledContainer,
             ]}
              accessibilityLabel="container_home_button"
             testID="container_home_button"
           >
            {iconRequired &&
              React.isValidElement(iconView)? (
                <View style={[iconViewStyle, iconViewContainerStyle]}>
                  {iconView}
                </View>
              ) : null
            }
            <Text
              style={[
                buttonText,
                buttonTitleStyle,
                isDisabled && disabledButtonText,
              ]}
               accessibilityLabel="text_home_button"
              testID="text_home_button"
            >{buttonTitle}</Text>
           </View>
       </TouchableOpacity>
   )  
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: getButtonBackGround(),
    borderColor: getButtonBackGround(),
    borderRadius: 15,
    borderWidth: 1,
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 5,
    paddingVertical: heightScale(12),
  },
  buttonText: {
    color: getButtonTextColor(),
    fontFamily: "HKGrotesk-Bold",
    fontSize: 14,
    textAlign: "center",
    textAlignVertical: "center",
  },
  iconStyle: {
    fontFamily: "design-system",
    fontSize: 16,
    color: getButtonTextColor(),
    marginRight:8,
    textAlign: "center",
    textAlignVertical: "center",
  },
  disabledContainer: {
    backgroundColor: "#BDBEC3",
    borderColor: "#BDBEC3"
  },
  disabledButtonText: {
    color: getButtonTextColor(),
  },
  disbaledIconText: {
    color: getButtonTextColor(),
  },
  iconViewStyle: {
    marginRight: 10,
    justifyContent: "center"
  }
})

Button.defaultProps = {
    onPress: () => {}, // Callback on click of button
    iconText: "4", // Text of Icon. Currently only supporting the font icon
    buttonTitle: "Join Call", // Text of Button
    buttonStyle: {}, // Style of body of button
    buttonTitleStyle: {}, // Style of button text
    iconTextStyle: {}, // Style of icon
    iconRequired: false, // to set an icon on the button
    isDisabled: false, // to disable the functionality of button callback
    iconViewContainerStyle: {}, // Style of Icon View
    iconView: (<View />), // React View
}

export default Button