import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

import ParallaxScrollView from 'react-native-parallax-scroll-view';

import Button from '../../../components/Button';

import {
  widthScale,
  heightScale,
  ratioHeight,
} from '../../../utils/dimensionHelper';

import ServiceBullet from '../../../assets/Booking/ellipses.png';
import LaraWoodIcon from '../../../assets/Booking/larawood.png';
import ForwardIcon from '../../../assets/Booking/forwardIcon.svg';
import DetailBackGround from '../../../assets/Booking/serviceDetailBackground.png';

const BookingDetailHolder = props => {
  const {name, subTitle, onGetStartedClicked, onContactDetailClicked} = props;

  const data = [
    'In consultation with the physician, a registered nurse will set up a plan of care and educate the family/care giver on how to care for the patient.',
    'The level of nursing care required will depend on the patient’s condition and needs.',
    'Nursing care may include wound care, ostomy and catheter care, intravenous therapy, administering medication, PEG feeding tube care, monitoring the general health of the patient, pain control.',
    'Nursing care may include other health support such as health education for the patient and family.',
  ];

  const renderServiceListItem = ({item, index}) => {
    return (
      <View style={styles.serviceContainer}>
        <Image
          source={require('../../../assets/Booking/ellipses.png')}
          style={{
            width: 18,
            height: 18,
            marginTop: heightScale(10),
            resizeMode: 'contain',
          }}
        />
        <Text style={styles.serviceListItemTitle}>{item}</Text>
      </View>
    );
  };

  return (
    <ParallaxScrollView
      parallaxHeaderHeight={280}
      contentContainerStyle={styles.infoHolder}
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled={true}
      renderBackground={() => (
        <View>
          <Image
            source={require('../../../assets/Appointment/serviceDefault.png')}
            style={{
              height: ratioHeight(50),
              width: '100%',
            }}
          />
        </View>
      )}>
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
        }}>
        <View style={{backgroundColor: '#fff', flex: 1}}>
          <View style={styles.infoContainer}>
            <Text style={styles.serviceTitle}>{name}</Text>
            <Text style={styles.serviceSubTitle}>{subTitle}</Text>
            <Text style={styles.serviceInclude}>Service include:</Text>
            <FlatList data={data} renderItem={renderServiceListItem} />
            <Text style={styles.contactHeader}>Contact info:</Text>
            <TouchableOpacity onPress={onContactDetailClicked}>
              <View style={styles.contactDetailHolder}>
                <View>
                  <Image
                    source={LaraWoodIcon}
                    style={{
                      width: 60,
                      height: 60,
                    }}
                  />
                </View>
                <View style={styles.contactInfoHolder}>
                  <View>
                    <Text style={styles.contactName}>Lara Wood</Text>
                    <Text style={styles.contactDescription}>
                      Project Manger and Home Healthcare Director
                    </Text>
                  </View>
                  <ForwardIcon width={10} height={10} />
                </View>
              </View>
            </TouchableOpacity>
            <Button
              buttonTitle="Get started"
              buttonStyle={{
                marginTop: widthScale(30),
                marginBottom: widthScale(10),
              }}
              buttonTitleStyle={styles.buttonTitle}
              onPress={onGetStartedClicked}
            />
          </View>
        </View>
      </View>
    </ParallaxScrollView>
  );
};

const styles = StyleSheet.create({
  infoHolder: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: 'red',
  },
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
  infoContainer: {
    paddingHorizontal: widthScale(20),
    paddingTop: heightScale(26),
  },
  serviceTitle: {
    fontFamily: 'HKGrotesk-Bold',
    fontSize: 20,
    lineHeight: 20,
    color: '#0B152D',
  },
  serviceSubTitle: {
    fontFamily: 'HKGrotesk-Regular',
    fontSize: 12,
    lineHeight: 14,
    color: 'rgba(75, 88, 121, 1)',
    letterSpacing: 0.12,
    marginTop: heightScale(8),
    marginBottom: heightScale(4),
  },
  serviceInclude: {
    fontFamily: 'HKGrotesk-Bold',
    fontSize: 16,
    lineHeight: 20,
    color: '#0B152D',
    marginTop: heightScale(4),
  },
  serviceListItemTitle: {
    fontFamily: 'HKGrotesk-Regular',
    fontSize: 14,
    lineHeight: 19,
    color: '#4B5879',
    marginTop: heightScale(8),
    marginLeft: widthScale(8),
    paddingRight: widthScale(10),
  },
  serviceContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  contactHeader: {
    fontFamily: 'HKGrotesk-Bold',
    fontSize: 16,
    lineHeight: 20,
    color: '#0B152D',
    fontWeight: '500',
    marginTop: heightScale(20),
  },
  contactDetailHolder: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: heightScale(16),
  },
  contactInfoHolder: {
    flexDirection: 'row',
    marginLeft: widthScale(12),
    justifyContent: 'space-between',
    flex: 1,
  },
  contactName: {
    fontFamily: 'HKGrotesk-Bold',
    fontSize: 14,
    lineHeight: 16,
    color: 'rgba(11, 21, 45, 1)',
  },
  contactDescription: {
    fontFamily: 'HKGrotesk-Regular',
    fontSize: 12,
    lineHeight: 16,
    color: 'rgba(75, 88, 121, 1))',
    letterSpacing: 0.12,
    marginTop: heightScale(4),
  },
  buttonTitle: {
    fontFamily: 'HKGrotesk-Bold',
    fontSize: 16,
    lineHeight: 22,
    color: '#FFF',
  },
});

BookingDetailHolder.defaultProps = {
  name: 'Nursing care Home',
  subTitle:
    'Nurses play an important role in the delivery of home healthcare. ',
};

export default BookingDetailHolder;
