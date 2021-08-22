import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Dimensions,
  Button,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import {
  OT,
  OTSession,
  OTPublisher,
  OTSubscriber,
  OTSubscriberView,
} from 'opentok-react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const dimensions = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from 'react-navigation-hooks';

const DoctorsList = ({doctors, onVideoCallClicked, closeBottomSheet}) => {
  const navigation = useNavigation();
  const [apikey, setApikey] = useState('47298774');
  const [sessionid, setSessionid] = useState(
    '1_MX40NzI5ODc3NH5-MTYyOTQwMDE1NzY2NX5GSXlJNW5TZ0xVMjVxaHlIWlJtVVh5NmF-UH4',
  );
  const [token, setToken] = useState(
    'T1==cGFydG5lcl9pZD00NzI5ODc3NCZzaWc9NDZjZjkwMWU4NzMxOTFjMDAyYWMxNzI5OWRkZmMxMzIzOTU3MzMyYTpzZXNzaW9uX2lkPTFfTVg0ME56STVPRGMzTkg1LU1UWXlPVFF3TURFMU56WTJOWDVHU1hsSk5XNVRaMHhWTWpWeGFIbElXbEp0VlZoNU5tRi1VSDQmY3JlYXRlX3RpbWU9MTYyOTQwMDE5NCZub25jZT0wLjIzNzAzMzA1MzE3NTQ0Mjc2JnJvbGU9cHVibGlzaGVyJmV4cGlyZV90aW1lPTE2Mjk0ODY1OTMmaW5pdGlhbF9sYXlvdXRfY2xhc3NfbGlzdD0=',
  );

  const handleVideoClick = () => {
    closeBottomSheet();
    navigation.navigate('VideoCall');
  };

  return (
    <View style={styles.doctosContainer}>
      <View style={styles.innerDoctorContainer}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={doctors}
          keyExtractor={item => item?.id}
          renderItem={({item}) => {
            return (
              <View style={styles.doctorCard}>
                <View
                  style={[
                    styles.status,
                    {
                      backgroundColor:
                        item?.status == 'Available' ? '#079C54' : '#EC2A59',
                    },
                  ]}></View>
                <View style={styles.innerDoctorCard}>
                  <View style={styles.doctorProfile}>
                    <View style={styles.doctorImage}>
                      <Image
                        style={{}}
                        source={require('../../assets/Search/doctor.png')}
                      />
                    </View>
                  </View>
                  <View style={styles.doctorInfo}>
                    <View style={styles.doctorName}>
                      <Text numberOfLines={1} style={styles.doctorNameText}>
                        {item?.name}
                      </Text>
                    </View>
                    <View style={styles.doctorDetails}>
                      <View style={styles.doctorSpecialityContainer}>
                        <View>
                          <Text numberOfLines={1} style={styles.specialityText}>
                            Cardiography
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View style={styles.callingFeature}>
                      <View style={styles.voiceCall}>
                        <TouchableOpacity style={styles.callingButton}>
                          <MaterialCommunityIcons
                            name="phone"
                            style={{
                              fontSize: 18,
                              marginRight: 5,
                              color: '#079C9C',
                            }}
                          />
                          <Text style={{color: '#079C9C', fontWeight: 'bold'}}>
                            Voice Call
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <View style={styles.videoCall}>
                        <TouchableOpacity
                          onPress={handleVideoClick}
                          style={styles.callingButton}>
                          <MaterialCommunityIcons
                            name="video-vintage"
                            style={{
                              fontSize: 18,
                              marginRight: 5,
                              color: '#F89853',
                            }}
                          />
                          <Text style={{color: '#F89853', fontWeight: 'bold'}}>
                            Video Call
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

export default DoctorsList;

const styles = StyleSheet.create({
  doctosContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '5%',
    flex: 1,
  },
  innerDoctorContainer: {
    width: '93%',
  },

  doctorCard: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#ddd',
    borderRadius: 6,
    marginBottom: 14,
    elevation: 3,
    backgroundColor: '#fff',
    alignSelf: 'center',
    position: 'relative',
  },
  innerDoctorCard: {
    width: '98%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: '#fff',
    paddingLeft: 20,
    paddingRight: 20,
  },
  doctorProfile: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  doctorInfo: {
    width: '76%',
  },
  doctorImage: {
    width: 80,
    height: 80,
    overflow: 'hidden',
    borderRadius: 40,
    borderWidth: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#aaa',
  },
  doctorSpecialityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  doctorDetails: {
    marginTop: '1%',
  },
  doctorIcon: {
    width: 20,
    height: 20,
    overflow: 'hidden',
    backgroundColor: '#fff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.2,
    borderColor: '#aaa',
    marginRight: 8,
  },
  specialityText: {
    marginTop: -2,
    color: '#aaa',
  },
  doctorNameText: {
    fontSize: 18,
    // fontWeight: 'bold',
  },
  status: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    zIndex: 999,
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
    width: 6,
    height: '100%',
  },
  statusText: {
    fontSize: 12,
    marginTop: -2,
    color: '#fff',
  },
  callingFeature: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  voiceCall: {
    height: 35,
    backgroundColor: '#E6F5F5',
    width: '48%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  videoCall: {
    height: 35,
    backgroundColor: '#FEF2E9',
    width: '48%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    marginTop: '5%',
  },
  callingButton: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonView: {
    backgroundColor: 'transparent', //'#131415' Vonage Black
    display: 'flex',
    width: '100%',
    position: 'absolute',
    bottom: 20,
    // left: 0,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignContent: 'center',
    zIndex: 999,
  },
  iconStyle: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: '#888',
    /* borderRadius: 50 */
  },
  fullView: {
    flex: 1,
    // position: 'relative',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  scrollView: {
    // backgroundColor: Colors.lighter,
  },
  footer: {
    // color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  publisherStyle: {
    width: 100,
    height: 150,
    position: 'absolute',
    top: 5,
    right: 5,
    zIndex: 999,
    borderRadius: 10,
  },
  mainSubscriberStyle: {
    height: (dimensions.height * 3) / 4 - 50,
  },
  secondarySubscribers: {
    height: dimensions.height / 4,
  },
});
