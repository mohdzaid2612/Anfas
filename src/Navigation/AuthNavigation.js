import {createStackNavigator} from 'react-navigation-stack';

import LoginScreen from '../Auth/Screen/LoginScreen';
import SignUpScreen from '../Auth/Screen/SignUpScreen';
import ForgetPassword from '../Auth/Screen/ForgetPassword';
import VerifyOTP from '../Auth/Screen/VerifyOTP';
import ResetPassword from '../Auth/Screen/ResetPassword';
import WelcomeScreen from '../Auth/Screen/WelcomeScreen';
import VideoCall from '../VideoCall/VideoCall';

export const LoginAuthStack = createStackNavigator(
  {
    Login: LoginScreen,
    SignUp: SignUpScreen,
    ForgetPassword: ForgetPassword,
    VerifyOTP,
    ResetPassword,
    WelcomeScreen,
  },
  {
    headerMode: 'none',
    initialRouteName: 'Login',
  },
);

export const SignUpAuthStack = createStackNavigator(
  {
    Login: LoginScreen,
    SignUp: SignUpScreen,
    ForgetPassword: ForgetPassword,
    VerifyOTP,
    ResetPassword,
    WelcomeScreen,
  },
  {
    headerMode: 'none',
    initialRouteName: 'SignUp',
  },
);
