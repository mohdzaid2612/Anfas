import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin'

import {
  ERROR,
} from '../../utils/constant'

const googleSignIn = () => (
  new Promise( async (resolve, reject) => {
    try {
      await GoogleSignin.hasPlayServices()
      const userInfo = await GoogleSignin.signIn()
      resolve(userInfo)
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        reject(ERROR.ERROR_SIGN_IN_CANCELLED)
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        reject(ERROR.ERROR_SIGN_IN_PROGRESS)
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        reject(ERROR.PLAY_SERVICES_NOT_AVAILABLE)
      } else {
        // some other error happened
        reject(error.message)
      }
    }
  })
)

export default googleSignIn