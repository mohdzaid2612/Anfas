import React from 'react'
import {
  View,
  StyleSheet,
  Image,
  Text,
  ScrollView,
} from 'react-native'

import {
  widthScale,
  heightScale,
  ratioHeight,
} from '../../../utils/dimensionHelper'

import LaraWoodIcon from '../../../assets/Booking/larawood.png'

const ContactDetail = () => {
  return (
    <View style={styles.container}>
      <View style={styles.contactDetailHolder}>
        <View>
          <Image
            source={LaraWoodIcon}
            style={{
              width:80,
              height:80
            }}
          />
        </View>
        <View style={styles.contactInfoHolder}>
          <View>
            <Text style={styles.contactName}>Lara Wood</Text>
            <Text style={styles.contactDescription}>Project Manger and Home Healthcare Director</Text>
          </View>
        </View>
      </View>
      <ScrollView>
        <Text style={styles.aboutText}>
          Mrs. Lora Wood began her career in Denver Colorado, in 1971 where she worked at St. Luke’s Hospital, as a Systems Analyst until 1986. She attended Metro State College from 1971 until 1977 in the Business Administration Program. In 1999, Lora began working at King Faisal Specialist Hospital in the Health Outreach & Business Affairs Division as a Supervisor for Administrative Services until November 2005. In 2005, she moved to King Fahad Medical City, where she established the Recruitment Department as a Chairperson. In over 9 years, from 2005 until June 2013, she assisted in employing more than 7000 healthcare professionals and staff. Lora then joined Maharah Human Resources in June 2013, where she established the Medical Services and Home Healthcare Departments. She then returned to KFMC for 2 years as a Senior Project Support Manager for the CEO, from 2017 until 2019.
        </Text>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  contactDetailHolder: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: heightScale(20),
  },
  contactInfoHolder: {
    flexDirection: "row",
    marginLeft: widthScale(12),
    justifyContent: "space-between",
  },
  contactName: {
    fontFamily: "HKGrotesk-Bold",
    fontSize: 14,
    lineHeight: 16,
    color: "rgba(11, 21, 45, 1)",
  },
  contactDescription: {
    fontFamily: "HKGrotesk-Regular",
    fontSize: 12,
    lineHeight: 16,
    color: "rgba(75, 88, 121, 1))",
    letterSpacing: 0.12,
    marginTop: heightScale(4)
  },
  container: {
    paddingHorizontal: widthScale(20),
  },
  aboutText: {
    fontFamily: "HKGrotesk-Regular",
    fontSize: 16,
    lineHeight: 28,
    color: "#5B6783",
    marginTop: heightScale(22)
  }
})

export default ContactDetail