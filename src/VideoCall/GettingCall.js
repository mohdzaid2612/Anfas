import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Button from './Button';

const GettingCall = () => {
  return (
    <View style={styles.container}>
      <Text>Getting Call</Text>
      <View style={styles.bContainer}>
        <Button name="phone" backgroundColor="green" />
        <Button name="phone" backgroundColor="red" />
      </View>
    </View>
  );
};

export default GettingCall;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: '10%',
  },
  bContainer: {
    flexDirection: 'row',
    width: '100%',
  },
});
