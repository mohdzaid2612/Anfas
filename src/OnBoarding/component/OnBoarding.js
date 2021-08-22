import React, { useEffect, useRef, useState } from 'react'
import { View, Text, FlatList, Animated, StyleSheet, Dimensions, ImageBackground, Image, TouchableOpacity, Platform } from 'react-native'
import { useNavigation } from 'react-navigation-hooks'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import {
  widthScale, heightScale, ratioHeight, ratioWidth,
} from '../../utils/dimensionHelper'

import onboarding1 from '../../assets/onboarding1.png'
import onboarding2 from '../../assets/onboarding2.png'
import onboarding3 from '../../assets/onboarding3.png'

const { width, height } = Dimensions.get("screen")
const Onboarding = props => {

  const navigation = useNavigation()
  const DATA = [
    {
      img: Image.resolveAssetSource(onboarding1).uri,
      text: 'Find the best doctors',
      text2: 'in your vicinity',
      id: 1,
      desc: 'With the help of our intelligent algorithms,now locate the best doctors around your vicinity at total ease.'
    },
    {
      img: Image.resolveAssetSource(onboarding2).uri,
      text: 'Schedule appointments',
      text2: 'with expert doctors',
      id: 2,
      desc: 'Find experienced specialist doctors with expert ratings and reviews and book your appoinments hassle-free.'
    },
    {
      img: Image.resolveAssetSource(onboarding3).uri,
      text: 'Book appointments',
      id: 3,
      desc: 'Can’t go to the hospital? Book audio call appointments with your doctor within the app in a few minutes.'
    },

  ]

  const Indicator = ({ scrollX }) => {

    return (
      <View style={{ flexDirection: 'row', }}>
        {
          DATA.map((_, i) => {
            const inputRange = [(i - 1) * width, i * width, (i + 1) * width]

            const backgroundColor = scrollX.interpolate({
              inputRange,
              outputRange: ['#ddd', '#008B8B', '#ddd'],
              extrapolate: 'clamp'
            })
            return (
              <>
                <Animated.View key={i} style={[{ width: 30, backgroundColor, height: 7, margin: 5, borderRadius: 999 }]}></Animated.View>
              </>
            )
          })
        }
      </View>
    )
  }

  const scrollX = React.useRef(new Animated.Value(0)).current;
  const flatlist = useRef();
  let CurrentSlide = 0;
  let IntervalTime = 3000;

  return (
    <View style={styles.container}>
      <Animated.FlatList
        ref={flatlist}
        data={DATA}
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        pagingEnabled
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        keyExtractor={item => item?.id}
        renderItem={({ item, index }) => {

          return (
            <View style={{ width: width, height: height - 200, }}>
              <View style={{ flex: 1, padding: 20, width: '100%', alignItems: 'center', }}>
                <View style={{ width: '100%', marginTop: '1%', height: 50, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Image source={require('../../assets/logo.png')} style={{ width: 60, height: 60, resizeMode: 'contain' }} />
                  <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={{ color: '#5B6A6B' }}>Skip</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ justifyContent: 'flex-start', width: '100%', marginTop: '5%' }}>
                  <Text style={{ fontSize: 24, color: '#000', fontWeight: 'bold' }}>
                    {item?.text}
                  </Text>
                  <Text style={{ fontSize: 24, color: '#000', fontWeight: 'bold', marginBottom: '2%' }}>
                    {item?.text2}
                  </Text>
                  <Text style={{ fontSize: 16, color: '#aaa', width: '94%' }}>
                    {item?.desc}
                  </Text>
                </View>
                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                  <Image source={{ uri: item?.img }} style={{ height: '100%', resizeMode: 'contain', width: '100%' }} />
                </View>
              </View>

            </View>
          )
        }}
      />
      <View style={{ position: 'relative', height: 100, justifyContent: 'center' }}>
        <View style={{ justifyContent: 'space-between', flexDirection: 'row', width: '100%', alignItems: 'center', }}>
          <View style={[styles.Indicator, { marginLeft: 0 }]}>
            <View style={styles.innerIndicator}>
              <Indicator scrollX={scrollX} />
            </View>
          </View>
          <View style={{ marginRight: 10 }}>
            {
              <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.getStarted}>
                <Text style={{ color: '#fff', fontSize: 16 }}>Get Started</Text>
                <MaterialIcons style={{ fontSize: 22, marginLeft: 5, transform: [{ translateY: 1 }] }} name="arrow-right-alt" color="#fff" />
              </TouchableOpacity>

              // <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.getStarted}>
              //     <Text style={{ color: '#fff', fontSize: 16 }}>Get Started</Text>
              //     <MaterialIcons style={{ fontSize: 22, marginLeft: 5, transform: [{ translateY: 1 }] }} name="arrow-right-alt" color="#fff" />
              //   </TouchableOpacity>
            }
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    lineHeight: 36,
    color: "#001133",
    marginTop: 35,
    fontFamily: "HKGrotesk-Bold",
    textAlign: "center"
  },
  subTitle: {
    fontFamily: "HKGrotesk-Regular",
    fontSize: 16,
    lineHeight: 21,
    color: "rgba(119, 122, 149, 1)",
    marginTop: 5,
    textAlign: "center"
  },
  itemContainer: {
  },
  buttonHolder: {
    borderRadius: 15,
    backgroundColor: "#5451FF",
    paddingVertical: heightScale(16),
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },
  btnStyle: {
    marginHorizontal: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  logoHeaderContainer: {
    paddingHorizontal: widthScale(20),
    marginTop: widthScale(20),
    marginBottom: widthScale(10),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  infoHolder: {
    backgroundColor: "#FFF",
    marginHorizontal: widthScale(20),
    paddingHorizontal: widthScale(27),
    paddingVertical: heightScale(10),
    borderRadius: 20,
    marginTop: heightScale(60),
    marginBottom: heightScale(30)
  },
  buttonText: {
    fontFamily: "HKGrotesk-Bold",
    fontSize: 16,
    lineHeight: 19,
    fontWeight: "600",
    color: "#FFF",
    marginRight: 10,
  },
  skipText: {
    fontFamily: "HKGrotesk-Regular",
    fontSize: 14,
    lineHeight: 16,
    color: "#A5A9CA",
    marginTop: 12,
    textAlign: "center",
    fontWeight: "500"
  },
  getStarted: {
    paddingHorizontal: 34,
    paddingVertical: 12,
    backgroundColor: '#008B8B',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center'
  }
})

export default Onboarding