import {
  useState,
} from 'react'

import API from '../../utils/api'

import {
  URL,
} from '../../utils/constant'

export default () => {
  const [activeServiceState, setActiveServiceState] = useState({
    isLoading: false,
    activeService: [],
    error: ""
  })

  const fetchActiveService = async () => {
    try {
      setActiveServiceState({
        isLoading: true,
        activeService: [],
        error: "",
      })
      const response = await API({
        url: URL.ACTIVE_SERVICE,
        method: "GET"
      })
      setActiveServiceState({
        isLoading: false,
        activeService: response,
        error: "",
      })
    } catch (error) {
      setActiveServiceState({
        isLoading: false,
        activeService: [],
        error,
      })
    }
  }

  return [activeServiceState, fetchActiveService]
}