import React from 'react'

import SpinnerComponent from 'react-native-loading-spinner-overlay'

const Loader = ({isLoading}) => (
    <SpinnerComponent visible={isLoading} textStyle={{ color: '#fff' }} />
)

export default Loader