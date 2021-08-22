import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native'

import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'

import {
  widthScale,
  heightScale,
} from '../../../utils/dimensionHelper'

import BackIcon from '../../../components/BackButton'
import Button from '../../../components/Button'

import PackageItem from './PackageItem'

const PackageSelectionHolder = props => {

  const {
    onBackPress,
    onConfirmPackage,
    packages,
    onPackageSelected,
    selectedPackage,
  } = props

  const renderHeader = () => {
    return (
      <View style={styles.headerHolder}>
        <View style={styles.headerContainer}>
          <BackIcon
            onBackPress={onBackPress}
            containerStyle={styles.backButtonContainer}
          />
          <Text style={styles.headerTitle}>Package details</Text>
        </View>
      </View>
    )
  }

  const renderPackageItem = ({ item, index }) => {
    const {
      name,
      price,
      id,
    } = item

    const selectedID = get(selectedPackage, "id", "")

    return (
      <PackageItem
        title={name}
        price={price}
        onPackageSelected={() => onPackageSelected(item)}
        isSelected={selectedID === id}

      />
    )
  }

  const renderPacakgeList = () => {
    return (
      <FlatList
        data={packages}
        renderItem={renderPackageItem}
        contentContainerStyle={{
          marginTop: heightScale(12),
        }}
      />
    )
  }

  const renderButton = () => {
    return (
      <View>
        <Button
          buttonTitle="Confirm"
          buttonStyle={styles.buttonStyle}
          onPress={onConfirmPackage}
          isDisabled={isEmpty(selectedPackage)}
        />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {renderHeader()}
      {renderPacakgeList()}
      {renderButton()}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-between"
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  headerTitle: {
    fontFamily: "HKGrotesk-Bold",
    fontSize: 20,
    lineHeight: 21,
    color: "#001133",
    marginLeft: widthScale(16)
  },
  backButtonContainer: {
    marginTop: heightScale(3)
  },
  headerHolder: {
    paddingTop: heightScale(30),
    paddingHorizontal: widthScale(20),
    paddingBottom: heightScale(10)
  },
  buttonStyle: {
    marginVertical: heightScale(16),
    marginHorizontal: widthScale(20),
  },
})

export default PackageSelectionHolder