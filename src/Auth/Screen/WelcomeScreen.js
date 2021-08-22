import React from 'react'

import WelcomeHolder from '../Component/WelcomeHolder'

const WelcomeScreen = props => {

  const {
    navigation,
  } = props


  const onLoginClicked = () => {
    navigation.navigate("Login")
  }

  const onSignClicked = () => {
    navigation.navigate("SignUp")
  }


  return (
    <WelcomeHolder
      onLoginClicked={onLoginClicked}
      onSignClicked={onSignClicked}
    />
  )
}

export default WelcomeScreen