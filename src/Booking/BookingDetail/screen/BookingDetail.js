import React, {
  useState,
  useRef
} from 'react'

import {
  Dimensions,
  StyleSheet,
  Text,
  Easing,
  View,
} from 'react-native'
import get from 'lodash/get'

import {
  useNavigationParam,
  useNavigation,
} from 'react-navigation-hooks'

import {
  ratioHeight,
} from '../../../utils/dimensionHelper'

import Modal from 'react-native-modalbox'

const {width, height} = Dimensions.get('window')

import BookingDetailHolder from '../component/BookingDetail'
import ContactDetail from '../component/ContactDetail'

const BookingDetail = () => {

  const navigation = useNavigation()
  const data = useNavigationParam("data", {})

  const modelRef = useRef(null)

  const name = get(data, "name", "")
  const subTitle = get(data, "description", "")

  const onGetStartedClicked = () => {
    navigation.navigate("SlotSelection", {
      booking: data,
    })
  }

  const onContactDetailClicked = () => {
    if (modelRef && modelRef.current) {
      modelRef.current.open()
    }
  }

  return (
    <>
      <BookingDetailHolder
        name={name}
        subTitle={subTitle}
        onGetStartedClicked={onGetStartedClicked}
        onContactDetailClicked={onContactDetailClicked}
      />
      <Modal
        entry="bottom"
        ref={modelRef}
        backdropPressToClose={true}
        isTransparent={true}
        coverScreen={true}
        useNativeDriver={false}
        easing={Easing.elastic(0.5)}
        style={styles.modalBox}
        position="bottom"
        backButtonClose={true}
      >
        <View style={styles.calendarContent}>
          <ContactDetail />
        </View>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  modalBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    height,
    width,
    backgroundColor: 'transparent',
  },
  calendarContent: {
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    width,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
})

export default BookingDetail