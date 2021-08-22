import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Button = ({name, backgroundColor, onPress}) => {
  console.log(name);
  return (
    <View>
      <TouchableOpacity
        onPress={onPress}
        style={[styles.button, {backgroundColor}]}>
        <Icon name={name} style={{fontSize: 20, color: '#fff'}} />
      </TouchableOpacity>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
});
