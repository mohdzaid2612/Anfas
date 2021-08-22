import { createAppContainer, createSwitchNavigator } from 'react-navigation'

import OnBoarding from '../OnBoarding/screen'
import {
  LoginAuthStack,
  SignUpAuthStack
} from './AuthNavigation'
import {
  DoctorMainStack,
  PatientMainStack,
} from './MainNavigation'

const AppNavigator = createAppContainer(
  createSwitchNavigator({
    OnBoarding,
    LoginFlow: LoginAuthStack,
    SignUpFlow: SignUpAuthStack,
    MainDoctor: DoctorMainStack,
    MainPatient: PatientMainStack
  })
)

export default AppNavigator