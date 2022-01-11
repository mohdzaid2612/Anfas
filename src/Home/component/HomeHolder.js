import React, {useEffect, useRef, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  SectionList,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Image,
  Dimensions,
  FlatList,
  TextInput,
  Platform,
} from 'react-native';

import get from 'lodash/get';

import {widthScale} from '../../utils/dimensionHelper';
import {
  getMainBackgroundColor,
  getHeaderTitleColor,
  getBackgroundColor,
  getButtonBackGround,
} from '../../utils/colorHelper';
import {getWish} from '../../utils/dataHelper';

import ConsultationTile from '../../Appointment/component/ConsultationTile';
import Loader from '../../components/Loader';
import ErrorView from '../../components/ErrorView';

import AnfasLogo from '../../assets/OnBoarding/anfas.svg';
import UnisexIcon from '../../assets/Appointment/avatar_patient/unisex.svg';
import EmptyAppointment from '../../assets/Appointment/EmptyAppointment.svg';

import HomeBackground from '../../assets/Appointment/homeBackground.png';
import SearchIcon from '../../assets/Appointment/ic_search.svg';
import HomeServiceHolder from './HomeServiceHolder';
import FindDoctorBanner from '../../assets/Auth/banner.png';

import RBSheet from 'react-native-raw-bottom-sheet';
import DoctorsList from '../../PatientSearch/component/DoctorsList';

import Icon from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

import Carousel, {Pagination} from 'react-native-snap-carousel';

import {heightScale} from '../../utils/dimensionHelper';

import banner_1 from '../../assets/Banner/banner/banner1.png';
import banner_2 from '../../assets/Banner/banner/banner2.png';
import banner_3 from '../../assets/Banner/banner/banner3.png';
import banner_4 from '../../assets/Banner/banner/banner4.png';
import banner_5 from '../../assets/Banner/banner/banner5.png';

import image1 from '../../assets/category/image1.png';
import image2 from '../../assets/category/image2.png';
import image3 from '../../assets/category/image3.png';

import {useNavigation} from 'react-navigation-hooks';
import store from '../../Store';
import {URL} from '../../utils/constant';
import {cos} from 'react-native-reanimated';

const category = [
  {
    id: 1,
    text: 'All',
  },
  {
    id: 2,
    text: 'Cardio',
  },
  {
    id: 3,
    text: 'Dentist',
  },
  {
    id: 4,
    text: 'Gynaecologist',
  },
  {
    id: 5,
    text: 'Neuro Surgeon',
  },
];

const doctors = [
  {
    id: 1,
    name: 'Dr. Mahmud Nik Hasan',
    speciality: 'Cardiologist',
    number: '966-96583 23404',
    status: 'Available',
  },
  {
    id: 2,
    name: 'Dr. Mahmud Nik Hasan',
    speciality: 'Cardiologist',
    number: '966-96583 23404',
    status: 'Available',
  },
  {
    id: 3,
    name: 'Dr. Mahmud Nik Hasan',
    speciality: 'Cardiologist',
    number: '966-96583 23404',
    status: 'Not Available',
  },
  {
    id: 4,
    name: 'Dr. Mahmud Nik Hasan',
    speciality: 'Cardiologist',
    number: '966-96583 23404',
    status: 'Available',
  },
  {
    id: 5,
    name: 'Dr. Mahmud Nik Hasan',
    speciality: 'Cardiologist',
    number: '966-96583 23404',
    status: 'Not Available',
  },
  {
    id: 6,
    name: 'Dr. Mahmud Nik Hasan',
    speciality: 'Cardiologist',
    number: '966-96583 23404',
    status: 'Available',
  },
  {
    id: 7,
    name: 'Dr. Mahmud Nik Hasan',
    speciality: 'Cardiologist',
    number: '966-96583 23404',
    status: 'Available',
  },
];

const HomeHolder = props => {
  const {
    name,
    data,
    onSearchPress,
    onAppointmentClicked,
    isLoading,
    error,
    role,
    onProfileIconClicked,
    activeService,
    onExploreClicked,
    selectedCategory,
    onVideoCallClicked,
  } = props;

  const refRBSheet = useRef();
  const navigation = useNavigation();
  const [value, setValue] = useState('');
  const [activeSlide, setActiveslide] = useState(0);
  const [doctorsList, setDoctorsList] = useState([]);
  const ref = useRef();
  const carousalData = [
    {
      img: Image.resolveAssetSource(banner_1).uri,
      text: 'ZAid',
    },
    {
      img: Image.resolveAssetSource(banner_2).uri,
      text: 'uzaif',
    },
    {
      img: Image.resolveAssetSource(banner_3).uri,
      text: 'zaid',
    },
    {
      img: Image.resolveAssetSource(banner_4).uri,
      text: 'zaid',
    },
    {
      img: Image.resolveAssetSource(banner_5).uri,
      text: 'zaid',
    },
  ];

  const categoryList = [
    {
      img: Image.resolveAssetSource(image1).uri,
      text: 'Cardio Specialist',
    },
    {
      img: Image.resolveAssetSource(image2).uri,
      text: 'Cardio Specialist',
    },
    {
      img: Image.resolveAssetSource(image3).uri,
      text: 'Cardio Specialist',
    },
    {
      img: Image.resolveAssetSource(image2).uri,
      text: 'Cardio Specialist',
    },
  ];

  useEffect(() => {
    getDoctorsList();
  }, []);

  const getDoctorsList = async () => {
    const token = store.getState().auth ? store.getState().auth.token : '';
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${token}`);
    myHeaders.append('Content-Type', 'application/json');

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };

    console.log(URL.doctorsList);
    fetch(URL.doctorsList, requestOptions)
      .then(response => response.json())
      .then(result => {
        var val = [];
        val = result;
        if (val.length == 0) {
          setDoctorsList([]);
        } else {
          setDoctorsList(val);
        }
      })
      .catch(error => console.log('error doctorsList', error));
  };

  const pagination = () => {
    return (
      <Pagination
        dotsLength={carousalData.length}
        activeDotIndex={activeSlide}
        containerStyle={{
          backgroundColor: '#fff',
          paddingTop: 5,
          paddingBottom: 0,
        }}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 0,
          backgroundColor: '#1ea396',
        }}
        inactiveDotStyle={
          {
            // Define styles for inactive dots here
          }
        }
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
  };

  const renderAppointmentTile = ({item, index, section}) => {
    const {patient, date, assigned_to} = item;

    const firstName = get(assigned_to, 'first_name', '');
    const lastName = get(assigned_to, 'last_name', '');
    const age = get(patient, 'age', '');
    const gender = get(patient, 'sex', '');
    const department = get(assigned_to, 'department', '');

    return (
      <ConsultationTile
        onTilePressed={() => onAppointmentClicked(item)}
        name={`Dr. ${firstName} ${lastName}`}
        age={`${age}`}
        date={date}
        department={department}
      />
    );
  };

  const closeBottomSheet = () => {
    refRBSheet.current.close();
  };

  const BottomSheet = () => {
    return (
      <View style={bottomsheet.container}>
        <View style={bottomsheet.textinputContainer}>
          <View style={bottomsheet.inneTextInputContainer}>
            <View style={bottomsheet.searchIcon}>
              <SearchIcon width={30} height={25} />
            </View>
            <TextInput
              style={bottomsheet.textInput}
              placeholder="Search Category"
              // onChangeText={e => setValue(e)}
              value={value}
              onChange={e => setValue(e)}
              onSubmitEditing={() => {}}
            />
          </View>
        </View>

        {/* <View style={bottomsheet.categoryContainer}>
          <View style={bottomsheet.innerCategoryContainer}>
            <FlatList
              data={category}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item?.id}
              renderItem={({item}) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setTimeout(() => {
                        refRBSheet.current.close();
                      }, 500),
                        selectedCategory(item?.text);
                    }}
                    key={item?.id}
                    style={[
                      bottomsheet.categoryType,
                      {
                        backgroundColor:
                          item?.text == 'All' ? getButtonBackGround() : '#fff',
                      },
                    ]}>
                    <Text
                      style={[
                        bottomsheet.categoryText,
                        {color: item?.text == 'All' ? '#fff' : '#999'},
                      ]}>
                      {item?.text}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </View> */}

        <DoctorsList
          onVideoCallClicked={onVideoCallClicked}
          doctors={doctorsList}
          closeBottomSheet={closeBottomSheet}
        />
      </View>
    );
  };

  return (
    <>
      <View style={[styles.container, {backgroundColor: '#fff'}]}>
        <View style={styles.container}>
          <View style={styles.logoHeaderContainer}>
            <AnfasLogo width={60} height={50} />
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={onProfileIconClicked}>
              <View style={styles.avatar}>
                <Ionicons
                  style={{color: getButtonBackGround(), marginLeft: 3}}
                  size={40}
                  name="person-circle"
                />
              </View>
            </TouchableOpacity>
          </View>
          <Loader isLoading={isLoading} />
          {/* <ErrorView message={error} /> */}
          <ScrollView nestedScrollEnabled={true}>
            <View>
              <TouchableOpacity
                onPress={() => refRBSheet.current.open()}
                // onPress={onVideoCallClicked}
                style={styles.searchContainer}>
                <View style={styles.innerSearchContainer}>
                  <Icon name="search" size={24} style={{marginRight: 8}} />
                  <Text
                    style={{
                      fontFamily: 'HKGrotesk-Regular',
                      fontSize: 14,
                      marginTop: -2,
                      color: '#aaa',
                    }}>
                    Searches for Services and Professionals
                  </Text>
                </View>
              </TouchableOpacity>

              <View>
                <Text style={[styles.categoryText, {marginLeft: 15}]}>
                  In the spotlight ✨
                </Text>
                <Carousel
                  ref={ref}
                  data={carousalData}
                  containerCustomStyle={{
                    position: 'relative',
                    top: (46 - 46) / 2,
                    padding: 0,
                    right: 7,
                    alignSelf: 'center',
                  }}
                  renderItem={({item, index}) => {
                    return (
                      <View style={[styles.banner]}>
                        <TouchableOpacity
                          style={{width: '100%', alignItems: 'center'}}>
                          <View style={styles.bannerImage}>
                            <Image
                              source={{
                                uri: item?.img,
                              }}
                              style={{
                                resizeMode: 'contain',
                                width: Dimensions.get('screen').width - 15,
                                alignSelf: 'center',
                                height: 190,
                                borderRadius: 0,
                              }}
                            />
                          </View>
                        </TouchableOpacity>
                      </View>
                    );
                  }}
                  layoutCardOffset={10}
                  enableSnap
                  // hasParallaxImages
                  pagingEnabled
                  inactiveSlideScale={1}
                  inactiveSlideOpacity={1}
                  nestedScrollEnabled
                  scrollEnabled
                  useNativeDriver
                  centerContent
                  sliderWidth={Dimensions.get('screen').width - 0}
                  itemWidth={Dimensions.get('screen').width - 0}
                  onSnapToItem={index => setActiveslide(index)}
                />
                {pagination()}
              </View>

              <View style={styles.categoryContainer}>
                <View style={styles.innerCategoryContainer}>
                  <View style={styles.categoryHeading}>
                    <Text style={styles.categoryText}>Browse by category</Text>
                    <TouchableOpacity>
                      <Feather style={{fontSize: 22}} name="chevron-right" />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.categoryFlatlist}>
                    <FlatList
                      horizontal
                      data={categoryList}
                      showsHorizontalScrollIndicator={false}
                      renderItem={({item, index}) => {
                        return (
                          <View key={index} style={styles.catergoryCard}>
                            <View
                              style={{
                                width: 50,
                                height: 40,
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}>
                              <Image
                                source={{uri: item?.img}}
                                style={{
                                  width: 40,
                                  height: 40,
                                  resizeMode: 'contain',
                                }}
                              />
                            </View>
                            <Text style={styles.categoryType}>
                              {item?.text}
                            </Text>
                            <Text
                              style={[
                                styles.doctorsNumbers,
                                {color: '#3E3F5C', fontSize: 12},
                              ]}>
                              27 doctors
                            </Text>
                          </View>
                        );
                      }}
                    />
                  </View>
                </View>
              </View>

              {role === 'patientuser' && activeService.length > 0 && (
                <HomeServiceHolder
                  data={activeService}
                  onExploreClicked={onExploreClicked}
                />
              )}
              <SectionList
                sections={data}
                keyExtractor={(item, index) => item + index}
                renderItem={renderAppointmentTile}
                renderSectionHeader={({section: {title}}) => (
                  <Text style={styles.tileHeader}>{title}</Text>
                )}
                contentContainerStyle={{
                  marginBottom: widthScale(20),
                }}
              />
              {data.length === 0 && !isLoading && (
                <View
                  style={{
                    alignItems: 'center',
                  }}>
                  <EmptyAppointment width={300} height={300} />
                </View>
              )}
            </View>
          </ScrollView>
        </View>
      </View>

      <RBSheet
        ref={refRBSheet}
        height={Dimensions.get('screen').height - 100}
        openDuration={450}
        closeDuration={450}
        closeOnDragDown={true}
        dragFromTopOnly={true}
        keyboardAvoidingViewEnabled={true}
        customStyles={{
          container: {
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff',
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
          },
          wrapper: {
            backgroundColor: 'rgba(0,0,0,0.5)',
          },
          draggableIcon: {
            backgroundColor: '#a6b1d2',
          },
        }}>
        <BottomSheet />
      </RBSheet>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  helloText: {
    fontFamily: 'HKGrotesk-Bold',
    fontSize: 29,
    lineHeight: 35,
    marginBottom: widthScale(20),
    marginTop: widthScale(10),
    paddingHorizontal: widthScale(16),
    color: '#001133',
    marginLeft: widthScale(4),
  },
  tileHeader: {
    // fontFamily: 'HKGrotesk-Regular',
    fontSize: 18,
    lineHeight: 23.45,
    marginBottom: widthScale(8),
    paddingHorizontal: widthScale(16),
    color: '#000',
    marginTop: widthScale(20),
    fontWeight: '800',
  },
  logoHeaderContainer: {
    paddingHorizontal: widthScale(14),
    marginTop: widthScale(10),
    // marginBottom: widthScale(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.3,
    paddingBottom: 10,
    borderBottomColor: '#dddddd',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: '#fff',
    elevation: 2,
  },
  banner: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerBanner: {
    width: '50%',
    // flexDirection: 'row',
    // alignItems: 'center',
    // backgroundColor: '#5451FF',
    // justifyContent: 'space-between',
    height: 190,
    elevation: 1,
  },
  bannerText: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    // backgroundColor: 'yellow',
    height: 200,
    width: '60%',
    paddingLeft: '6%',
  },
  bannerButton: {
    padding: 12,
    backgroundColor: '#fff',
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  bannerImage: {
    width: '100%',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  emptyText: {
    fontWeight: '500',
    fontFamily: 'Roboto-Regular',
    fontSize: 22,
    lineHeight: 30,
    marginTop: widthScale(10),
    color: '#2D2D2D',
  },
  categoryContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '3%',
  },
  innerCategoryContainer: {
    width: '93%',
    // justifyContent: 'flex-start',
  },
  categoryHeading: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 20,
  },
  catergoryCard: {
    width: 100,
    height: 130,
    backgroundColor: '#fff',
    marginRight: 20,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: 10,
    elevation: 4,
    marginBottom: 5,
    marginTop: 5,
    marginLeft: 5,
  },
  categoryType: {
    textAlign: 'center',
    fontWeight: '600',
  },
  categoryText: {
    // fontFamily: 'HKGrotesk-Regular',
    fontSize: 18,
    // lineHeight: 23.45,
    // marginBottom: widthScale(8),
    color: '#000',
    // marginTop: widthScale(20),
    fontWeight: '800',
  },
  wishText: {
    fontFamily: 'HKGrotesk-Regular',
    fontSize: 13,
    lineHeight: 17,
    marginTop: widthScale(10),
    paddingHorizontal: widthScale(16),
    color: '#001133',
    marginLeft: widthScale(4),
    fontWeight: '600',
  },

  searchContainer: {
    marginHorizontal: widthScale(16),
    backgroundColor: '#fff',
    borderRadius: 6,
    // padding: widthScale(16),
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    // elevation: 4,
    marginTop: 10,
    borderWidth: 0.5,
    borderColor: '#dddddd',
    marginBottom: '5%',
  },
  innerSearchContainer: {
    width: '94%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  findText: {
    fontFamily: 'HKGrotesk-Bold',
    fontWeight: '800',
    fontSize: 22,
    lineHeight: 22.4,
    color: '#F5F8FF',
    width: '50%',
    paddingVertical: heightScale(14),
  },
  infoHolder: {
    flexDirection: 'row',
    flex: 1,
  },
  searchHolder: {
    borderWidth: 2,
    borderRadius: 15,
    borderColor: 'rgba(175, 182, 250, 1)',
    backgroundColor: 'rgba(142, 146, 249, 1)',
    paddingVertical: heightScale(15),
    paddingHorizontal: widthScale(16),
    marginTop: 10,
  },
  searchText: {
    fontFamily: 'HKGrotesk-Regular',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 16,
    color: '#F5F8FF',
  },
});

const bottomsheet = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontFamily: 'Roboto-Medium',
    fontSize: 20,
    lineHeight: 27.4,
    fontWeight: '700',
    color: getHeaderTitleColor(),
    marginLeft: widthScale(10),
  },
  headerContainer: {
    backgroundColor: getBackgroundColor(),
    paddingTop: widthScale(20),
    paddingHorizontal: widthScale(16),
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: heightScale(10),
  },
  backButtonContainer: {
    marginBottom: 0,
    marginTop: 0,
  },
  textinputContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '5%',
  },
  inneTextInputContainer: {
    width: '93%',
    position: 'relative',
    borderWidth: 0.5,
    borderRadius: 6,
    height: 50,
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderColor: '#ddd',
  },
  textInput: {
    width: '88%',
    height: 50,
    fontSize: 16,
  },
  searchIcon: {
    width: '12%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  categoryContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '5%',
  },
  innerCategoryContainer: {
    width: '93%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  categoryType: {
    borderWidth: 0.5,
    padding: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    borderRadius: 6,
    borderColor: '#ddd',
    backgroundColor: getBackgroundColor(),
  },
  categoryText: {
    fontWeight: '500',
  },
  cross: {
    position: 'absolute',
    right: 0,
    top: -18,
  },
});

export default HomeHolder;
