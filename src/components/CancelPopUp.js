import React, {
  useState,
} from 'react'
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native'

import {
  heightScale,
  widthScale,
} from '../utils/dimensionHelper'

import Button from './Button'
import CheckBox from './CheckBox'

const CancelPopUp = props => {
  const {
    isVisible,
    onCancelClicked,
    onCloseClicked,
  } = props

  const [selectedOption, setSelectedOption] = useState("")

  const onOptionSelected = option => {
    setSelectedOption(option)
  }

  const data = [
    "Some other reason.",
    "I only become a member to receive and specific benefit and now i’ve got it. ",
    "My financial situation changed.",
    "I did not receive the promised rewards.",
  ]

  const renderCancelOptionItem = ({item, index}) => {
    return (
      <TouchableOpacity onPress={() => onOptionSelected(item)}>
        <View style={styles.optionContainer}>
          <CheckBox
            isSelected={item === selectedOption}
            mode="radio"
            onPress={() => onOptionSelected(item)}
          />
          <Text style={styles.optionItemText}>{item}</Text>
      </View>
      </TouchableOpacity>
    )
  }

  return isVisible ? (
    <View style={styles.container}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.title}>Confirm cancellation</Text>
          <FlatList
            data={data}
            renderItem={renderCancelOptionItem}
            keyExtractor={(item,index) =>  `canceloption${index}`}
          />
          <Button
            onPress={() => onCancelClicked(selectedOption)}
            buttonTitle="Cancel booking"
          />
          <Text style={styles.okText} onPress={onCloseClicked}>OK, I’ll decide later</Text>
        </View>
      </View>
    </View>
  ) : null
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    height: "100%"
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: '#14151A60'
  },
  modalView: {
    backgroundColor: "white",
    borderColor: "#FFF",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 28,
    paddingBottom: 34,
    shadowColor: "#000",
    marginHorizontal: 20,
  },
  title: {
    fontFamily: "HKGrotesk-Bold",
    fontSize: 20,
    lineHeight: 26,
    color: "#262C41",
    textAlign: "center",
    marginBottom: heightScale(18)
  },
  okText: {
    fontFamily: "HKGrotesk-Bold",
    fontSize: 16,
    lineHeight: 22,
    color: "#5451FF",
    textAlign: "center",
    marginTop: heightScale(22)
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: heightScale(15)
  },
  optionItemText: {
    fontFamily: "HKGrotesk-Regular",
    fontSize: 14,
    lineHeight: 18,
    color: "#6D7C9D",
    marginLeft: widthScale(12),
    flexShrink:1
  }
})

export default CancelPopUp

