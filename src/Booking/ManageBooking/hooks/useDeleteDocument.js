import {
  useState,
} from 'react'
    
import API from '../../../utils/api'
      
import {
  URL,
} from '../../../utils/constant'
      
export default () => {
  const [deleteDocumentState, setDeleteDocumentState] = useState({
    isLoading: false,
    response: [],
    error: ""
  })

  const deleteDocument = async payload => {
    try {
      setDeleteDocumentState({
        isLoading: true,
        response: {},
        error: "",
      })
      const response = await API({
        url: URL.DELETE_DOCUMENT,
        method: "POST",
        data:payload
      })
      setDeleteDocumentState({
        isLoading: false,
        response,
        error: "",
      })
    } catch (error) {
      setDeleteDocumentState({
        isLoading: false,
        response: {},
        error,
      })
    }
  }

  return [deleteDocumentState, deleteDocument]
}