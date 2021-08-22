import {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from "react-native-fbsdk-next"

import {
  ERROR,
} from '../../utils/constant'

const fetchFBUserInfo = token => (
  new Promise((resolve, reject) => {
    const PROFILE_REQUEST_PARAMS = {
      fields: {
        string: 'id,name,first_name,last_name,email',
      },
    }
    const profileRequest = new GraphRequest(
      '/me',
      {token, parameters: PROFILE_REQUEST_PARAMS},
      (error, user) => {
        if (error) {
          reject(error)
        } else {
          resolve(user)
        }
      },
    )
    new GraphRequestManager().addRequest(profileRequest).start()
  })
)

const fbSignIn = () => (
  new Promise(async (resolve, reject) => {
    try {
      const response = await LoginManager.logInWithPermissions(['public_profile,email'])
      if (response.isCancelled) {
        reject(ERROR.ERROR_SIGN_IN_CANCELLED)
      }
      else {
        const token = await AccessToken.getCurrentAccessToken()
        const accessToken = token.accessToken.toString()
        if (accessToken) {
          resolve(accessToken)
        }
      }
    } catch (error) {
      reject(error.message || error)
    }
  })
)

export default fbSignIn

