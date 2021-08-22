import API from '../../utils/api'
import {
  URL,
} from '../../utils/constant'

export const emailSignIn = payload => (
  new Promise((resolve, reject) => {
    API({
      method: "POST",
      url: URL.LOGIN,
      data: payload
    }).then(res => resolve(res))
    .catch(err => reject(err))
  })
)