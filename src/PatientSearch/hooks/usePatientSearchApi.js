import {
  useState,
} from 'react'
import API from '../../utils/api'
import {
  URL,
} from '../../utils/constant'

export default () => {
  const [isSearchingPatient, setSearchingPatient] = useState(false)
  const [searchResponse, setSeachResponse] = useState([])
  const [errorSearchResponse, setErrorSearchResponse] = useState("")
  const searchPatient = async searchTerm => {
    try {
      setSearchingPatient(true)
      setSeachResponse([])
      setErrorSearchResponse("")
      const url = `${URL.SEARCH_PATIENT}?query=${searchTerm}`
      const response = await API({
        method: "GET",
        url
      })
      setSearchingPatient(false)
      setSeachResponse(response.result)
      setErrorSearchResponse("")
    } catch (error) {
      setSearchingPatient(false)
      setSeachResponse([])
      setErrorSearchResponse(error)
    }
  }

  return [isSearchingPatient, searchResponse, errorSearchResponse, searchPatient]
}