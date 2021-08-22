import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native'

import {
  getMainBackgroundColor,
  getProfileNameText,
  getProfileEmailText,
  getAppointmentTextColor,
  getBackgroundColor,
  getPatientNameColor,
  getButtonBackGround,
} from '../../utils/colorHelper'

import {
  widthScale,
  heightScale,
} from '../../utils/dimensionHelper'

import UnisexIcon from '../../assets/Appointment/avatar_patient/unisex.svg'
import IconCross from '../../assets/Auth/crossIcon.svg'
import IconAddAccount from '../../assets/Auth/addAccount.svg'
import IconLogOut from '../../assets/Auth/logOut.svg'

import EditIcon from '../../assets/AddPatient/edit.svg'
import ShareIcon from '../../assets/AddPatient/share.svg'

import CheckBox from '../../components/CheckBox'
import SharePopUp from '../../components/ShareCodePopUp'

import Loader from '../../components/Loader'
import ErrorView from '../../components/ErrorView'
import Button from '../../components/Button'
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'

const PatientProfileHolder = props => {
  const {
    name,
    email,
    onBackPress,
    onPatientSelect,
    patient,
    onAddPatientClicked,
    onLogOutClicked,
    role,
    onEditClicked,
    selectedPatientID,
    onShareClicked,
    onToggleShareVisiblity,
    isSharePopUpVisible,
    onCopyClicked,
    isLoading,
    error,
    shareCode
  } = props

  const renderPatient = ({ item, index }) => {
    const {
      name,
      mobile,
      id,
    } = item
    return (
      <TouchableOpacity style={{ backgroundColor: '#fff' }} activeOpacity={1} onPress={() => onPatientSelect(item)}>
        <View style={styles.patientInfoContainer}>
          <CheckBox
            isSelected={id === selectedPatientID}
            mode="radio"
            onPress={() => onPatientSelect(item)}
          />
          <View style={styles.patientHolder}>
            <View style={styles.patientDetailContainer}>
              <Text style={styles.patientNameText}>{`${name}`}</Text>
              <Text style={styles.patientEmailText}>{mobile}</Text>
            </View>
            <View style={styles.actionHolder}>
              <TouchableOpacity onPress={() => onEditClicked(item)} style={{
                marginRight: widthScale(16)
              }}>
                <EditIcon
                  width={16}
                  height={16}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onShareClicked(item)}>
                <ShareIcon
                  width={16}
                  height={16}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onBackPress} style={styles.crossContainer}>
        {/* <IconCross
          width={25}
          height={25}
        /> */}
        <Feather name="arrow-left" style={{ fontSize: 24 }} />
      </TouchableOpacity>
      <Loader
        isLoading={isLoading}
      />
      <ErrorView
        message={error}
      />
      <ScrollView
        nestedScrollEnabled={true}
        style={{
          flex: 1
        }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: widthScale(20),
          paddingTop: heightScale(10)
        }}
      >
        <View style={styles.holder}>
          <View>
            <View style={styles.userDetailContainer}>
              <Ionicons style={{ color: getButtonBackGround(), marginLeft: 3 }} size={60} name="person-circle" />
              <View style={styles.infoContainer}>
                <Text style={styles.nameText}>{`Hi ${name}`}</Text>
                <Text style={styles.emailText}>{email}</Text>
              </View>
            </View>
            {role !== "doctor" && (
              <Button
                buttonStyle={{
                  backgroundColor: getButtonBackGround(),
                  borderColor: "#ECECFB",
                  marginTop: 24,
                }}
                buttonTitleStyle={{
                  color: "#fff"
                }}
                buttonTitle="Add another account"
                onPress={onAddPatientClicked}
                iconView={(
                  <Feather name="user-plus" style={{ fontSize: 16, color: '#fff' }} />
                )}
                iconRequired={true}
              />
            )}
            {(role !== "doctor" && patient.length > 0) && (<View style={styles.patientContainer}>
              <Text style={styles.selectPatientText}>Select Patient</Text>
              <FlatList
                data={patient}
                renderItem={renderPatient}
                keyExtractor={(item, index) => `${item.id}${index}`}
              />
            </View>)}
          </View>
          <TouchableOpacity onPress={onLogOutClicked}>
            <View style={styles.logOutContainer}>
              <IconLogOut
                width={20}
                height={20}
              />
              <Text style={styles.logOutText}>Log out</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <SharePopUp
        isVisible={isSharePopUpVisible}
        onToggleShareVisiblity={onToggleShareVisiblity}
        code={shareCode}
        onCopyClicked={onCopyClicked}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  userDetailContainer: {
    marginTop: heightScale(20),
    flexDirection: "row",
    alignItems: "center"
  },
  nameText: {
    fontFamily: "HKGrotesk-Regular",
    fontSize: 24,
    lineHeight: 24,
    color: getProfileNameText(),
  },
  emailText: {
    fontFamily: "HKGrotesk-Regular",
    fontSize: 14,
    lineHeight: 16,
    color: getProfileEmailText(),
    marginTop: widthScale(4)
  },
  infoContainer: {
    marginLeft: widthScale(16)
  },
  crossContainer: {
    marginLeft: widthScale(2),
    paddingHorizontal: widthScale(20),
    paddingTop: heightScale(20)
  },
  patientContainer: {
    marginTop: heightScale(30)
  },
  selectPatientText: {
    fontFamily: "HKGrotesk-Regular",
    fontSize: 16,
    lineHeight: 24,
    color: getAppointmentTextColor(),
    fontWeight: "500"
  },
  patientInfoContainer: {
    flexDirection: "row",
    backgroundColor: '#fff',
    paddingVertical: heightScale(16),
    paddingHorizontal: widthScale(16),
    borderRadius: 10,
    marginVertical: heightScale(10),
    alignItems: "center",
    elevation: 4,
    marginLeft: 2,
    marginRight: 2
  },
  patientDetailContainer: {
    marginLeft: widthScale(16),
    justifyContent: "center"
  },
  patientNameText: {
    fontFamily: "HKGrotesk-Bold",
    fontSize: 16,
    lineHeight: 18,
    color: getPatientNameColor(),
    letterSpacing: 0.15
  },
  patientEmailText: {
    fontFamily: "HKGrotesk-Bold",
    fontSize: 14,
    lineHeight: 18,
    color: getAppointmentTextColor(),
    fontWeight: "400",
    letterSpacing: 0.25,
    marginTop: widthScale(4)
  },
  addPatientContainer: {
    flexDirection: "row",
    marginTop: heightScale(16),
    alignItems: "center"
  },
  addAccountText: {
    fontFamily: "HKGrotesk-Regular",
    fontSize: 16,
    lineHeight: 18.75,
    color: getButtonBackGround(),
    fontWeight: "400",
    marginLeft: widthScale(6)
  },
  holder: {
    justifyContent: "space-between",
    flex: 1
  },
  logOutContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: heightScale(20)
  },
  logOutText: {
    fontFamily: "HKGrotesk-Regular",
    fontSize: 16,
    lineHeight: 18.75,
    color: getButtonBackGround(),
    fontWeight: "400",
    marginLeft: widthScale(6)
  },
  patientHolder: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1
  },
  actionHolder: {
    flexDirection: "row"
  }
})

export default PatientProfileHolder