import React, { useState } from 'react'
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native'

import {
  getMainBackgroundColor,
  getHeaderTitleColor,
  getBackgroundColor,
  getButtonBackGround
} from '../../utils/colorHelper'

import {
  widthScale,
  heightScale,
} from '../../utils/dimensionHelper'

import PatientTile from '../../Appointment/component/AppointmentTile'
import SearchHolder from '../../Home/component/SearchHolder'
import BackButton from '../../components/BackButton'
import ErrorView from '../../components/ErrorView'

import SearchIcon from '../../assets/Appointment/ic_search.svg'
import DoctorsList from './DoctorsList'

import { useNavigation } from 'react-navigation-hooks';

const category = [
  {
    id: 1,
    text: 'All'
  },
  {
    id: 2,
    text: 'Cardio'
  },
  {
    id: 3,
    text: 'Dentist'
  },
  {
    id: 4,
    text: 'Gynaecologist'
  },
  {
    id: 5,
    text: 'Neuro Surgeon'
  },
]

const doctors = [
  {
    id: 1,
    name: 'Dr. Mahmud Nik Hasan',
    speciality: 'Cardiologist',
    number: '966-96583 23404',
    status: 'Available'
  },
  {
    id: 2,
    name: 'Dr. Mahmud Nik Hasan',
    speciality: 'Cardiologist',
    number: '966-96583 23404',
    status: 'Available'
  },
  {
    id: 3,
    name: 'Dr. Mahmud Nik Hasan',
    speciality: 'Cardiologist',
    number: '966-96583 23404',
    status: 'Not Available'
  },
  {
    id: 4,
    name: 'Dr. Mahmud Nik Hasan',
    speciality: 'Cardiologist',
    number: '966-96583 23404',
    status: 'Available'
  },
  {
    id: 5,
    name: 'Dr. Mahmud Nik Hasan',
    speciality: 'Cardiologist',
    number: '966-96583 23404',
    status: 'Not Available'
  },
  {
    id: 6,
    name: 'Dr. Mahmud Nik Hasan',
    speciality: 'Cardiologist',
    number: '966-96583 23404',
    status: 'Available'
  },
  {
    id: 7,
    name: 'Dr. Mahmud Nik Hasan',
    speciality: 'Cardiologist',
    number: '966-96583 23404',
    status: 'Available'
  },
]

const PatientHistory = props => {
  const {
    data,
    onPatientClicked,
    onBackPress,
    selectedCategory,
    onSearchChanged,
    searchTerm,
    error,
    role,
  } = props

  const [value, setValue] = useState('')
  const { navigate } = useNavigation();


  const renderPatientTile = ({ item, index }) => {
    const {
      name,
      age,
      sex,
      first_name,
      last_name,
      department
    } = item
    let doctorName = `Dr. ${first_name} ${last_name}`

    return (
      <PatientTile
        name={role === "doctor" ? name : doctorName}
        age={age}
        gender={sex}
        onTilePressed={() => onPatientClicked(item)}
        department={department}
      />
    )
  }

  const getTitle = () => {
    if (role === "doctor") {
      return `Find Patient`
    }
    else if (role === "patientuser") {
      return "Find Doctor"
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerTitleContainer}>
          <BackButton
            onBackPress={onBackPress}
            containerStyle={styles.backButtonContainer}
          />
        </View>
      </View>
      <View style={styles.textinputContainer}>
        <View style={styles.inneTextInputContainer}>
          <View style={styles.searchIcon}>
            <SearchIcon width={30} height={25} />
          </View>
          <TextInput
            style={styles.textInput}
            placeholder="Search Category"
            value={value}
            onChangeText={(e) => setValue(e)}
          />
        </View>
      </View>

      <View style={styles.categoryContainer}>
        <View style={styles.innerCategoryContainer}>
          <FlatList
            data={category}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item?.id}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity onPress={() => selectedCategory(item?.text)} key={item?.id} style={[styles.categoryType, { backgroundColor: item?.text == 'All' ? getButtonBackGround() : '#fff' }]}>
                  <Text style={[styles.categoryText, { color: item?.text == 'All' ? '#fff' : '#999' }]}>{item?.text}</Text>
                </TouchableOpacity>
              )
            }}
          />
        </View>
      </View>

      <DoctorsList doctors={doctors} />

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontFamily: "Roboto-Medium",
    fontSize: 20,
    lineHeight: 27.4,
    fontWeight: "700",
    color: getHeaderTitleColor(),
    marginLeft: widthScale(10)
  },
  headerContainer: {
    backgroundColor: getBackgroundColor(),
    paddingTop: widthScale(20),
    paddingHorizontal: widthScale(16),
  },
  headerTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: heightScale(10)
  },
  backButtonContainer: {
    marginBottom: 0,
    marginTop: 0,
  },
  textinputContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '5%'
  },
  inneTextInputContainer: {
    width: '93%',
    position: 'relative',
    borderWidth: 0.5,
    borderRadius: 6,
    height: 50,
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderColor: '#ddd'
  },
  textInput: {
    width: '88%',
    height: 50,
    fontSize: 16
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
    marginTop: '5%'
  },
  innerCategoryContainer: {
    width: '93%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
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
    backgroundColor: getBackgroundColor()
  },
  categoryText: {
    fontWeight: '500'
  }

})

PatientHistory.defaultProps = {}

export default PatientHistory

