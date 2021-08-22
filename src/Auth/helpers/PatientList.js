import API from '../../utils/api'
import {
  URL,
} from '../../utils/constant'

const fetchPatientList = () => (
  new Promise((resolve, reject) => {
    API({
      method: "GET",
      url: URL.PATIENT_LIST,
    }).then(res => resolve(res.result))
    .catch(err => reject(err))
  })
)

export default fetchPatientList