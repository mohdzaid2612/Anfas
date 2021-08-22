import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const ErrorView = ({message}) => {
  if (message == null || message.length === 0) {
    return null;
  }

  return (
    <View>
      <Text style={styles.errorTextStyle}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  errorTextStyle: {
    marginLeft: 16,
    color: 'red',
    fontSize: 14,
    fontWeight: '500',
  },
})

export default ErrorView
