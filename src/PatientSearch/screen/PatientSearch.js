import React, {
  useRef,
  useState,
} from 'react'

import {
  useSelector,
} from 'react-redux'

import get from 'lodash/get'

import debounce from 'lodash/debounce'
import PatientSearchHolder from '../component/PatientHistory'

import usePatientSearchApi from '../hooks/usePatientSearchApi'

const PatientSearch = props => {

  const {
    navigation,
  } = props

  const {
    user,
  } = useSelector(state => state.auth)

  const role = get(user, "role", "")

  const [searchTerm, setSearchTerm] = useState("")
  const [
    isSearchingPatient,
    searchResponse,
    errorSearchResponse,
    searchPatient
  ] = usePatientSearchApi()

  const onSearchChanged = searchText => {
    setSearchTerm(searchText)
    delayedQuery(searchText)
  }

  const delayedQuery = useRef(debounce(searchTerm =>
    searchPatient(searchTerm), 500
  )).current

  const onPatientTileClicked = item => {
    navigation.navigate("PatientHistory", {
      patient: item
    })
  }

  const onBackClicked = () => {
    navigation.goBack()
  }

  const selectedCategory = name => {
    console.log(name)
    navigation.navigate("SelectCategory", {
      type: name
    });
  }

  return (
    <>
      <PatientSearchHolder
        selectedCategory={selectedCategory}
        onPatientClicked={onPatientTileClicked}
        onBackPress={onBackClicked}
        data={searchResponse}
        onSearchChanged={onSearchChanged}
        searchTerm={searchTerm}
        error={errorSearchResponse}
        role={role}
      />
    </>
  )
}

export default PatientSearch