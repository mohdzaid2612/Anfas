import {
  useState,
} from 'react'

import API from '../../utils/api'
import {
  URL,
} from '../../utils/constant'

export default () => {
  const [isCreatingUser, setCreatingUser] = useState(false)
  const [responseCreateUser, setResponseCreateUser] = useState({})
  const [errorCreateUser, setErrorCreateUser] = useState("")
  const createUser = async payload => {
    try {
      setCreatingUser(true)
      setResponseCreateUser({})
      setErrorCreateUser("")
      console.debug(payload)
      const response = await API({
        method: "POST",
        url: URL.PATIENT_CREATE,
        data: payload
      })
      console.debug(JSON.stringify(response))
      setCreatingUser(false)
      const {
        otp_sent,
        secret,
        message,
      } = response
      if (otp_sent === false && secret === null) {
        setResponseCreateUser({})
        setErrorCreateUser(message)
      }
      else {
        setResponseCreateUser(response)
      }
    } catch (error) {
      console.debug(error)
      setCreatingUser(false)
      setResponseCreateUser({})
      setErrorCreateUser(error)
    }
  }

  return [isCreatingUser, responseCreateUser, errorCreateUser, createUser]
}