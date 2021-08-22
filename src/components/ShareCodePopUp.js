import React from 'react'
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native'
  
import Button from './Button'
import IconCross from '../assets/Auth/crossIcon.svg'

import CopyIcon from '../assets/AddPatient/copy.svg'

const ShareCodePopUp = props => {
  const {
    isVisible,
    onToggleShareVisiblity,
    code,
    onCopyClicked,
  } = props
  return isVisible ? (
    <View style={styles.container}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity style={{
            alignItems: "flex-end",
            marginBottom:20,
          }}
            onPress={onToggleShareVisiblity}
          >
            <IconCross
              width={20}
              height={20}
            />
          </TouchableOpacity>
          <View>
            <Text style={styles.titleText}>Your profile code</Text>
            <View style={styles.codeContainer}>
              <Text>{code}</Text>
              <TouchableOpacity onPress={onCopyClicked} style={{
                marginLeft:4,
              }}>
                <CopyIcon
                  width={20}
                  height={20}
                />
              </TouchableOpacity>
            </View>
            <Button
              onPress={onToggleShareVisiblity}
              buttonTitle="Share code"
            />
          </View>
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
    backgroundColor: '#101F4266',
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
  titleText: {
    fontFamily: "HKGrotesk-Bold",
    fontSize: 18,
    lineHeight: 24,
    color: "#5D6987",
    fontWeight:"600",
    marginBottom: 14,
  },
  codeContainer: {
    borderWidth:1,
    borderColor: "#E2E2EF",
    borderRadius:12,
    paddingHorizontal:18,
    paddingVertical:12,
    marginBottom: 26,
    flexDirection: "row",
    justifyContent: "space-between",
  }
})

export default ShareCodePopUp