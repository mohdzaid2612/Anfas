import React from 'react';
import {Text, StyleSheet, View, TouchableOpacity, Image} from 'react-native';

import {widthScale, heightScale} from '../utils/dimensionHelper';

import {getCheckBoxLabelColor} from '../utils/colorHelper';

import IconSelected from '../assets/AddPatient/checkbox_selected.png';
import IconUnSelected from '../assets/AddPatient/checkbox_unselected.png';

// import RadioSelected from '../assets/Booking/radio_button_selected.png'
import RadioSelected from '../assets/Booking/ellipses.png';
import RadioUnSelected from '../assets/Booking/radio_button_unselected.png';

const CheckBox = props => {
  const {isSelected, containerStyle, onPress, label, mode} = props;

  const getCheckboxIcon = () => {
    let view = null;
    if (isSelected) {
      view = (
        <Image
          source={{uri: Image.resolveAssetSource(RadioSelected).uri}}
          style={{width: 20, height: 20, resizeMode: 'contain'}}
        />
      );
    } else {
      view = (
        <Image
          source={{uri: Image.resolveAssetSource(RadioUnSelected).uri}}
          style={{width: 20, height: 20, resizeMode: 'contain'}}
        />
      );
    }
    return view;
  };

  const getRadioIcon = () => {
    let view = null;
    if (isSelected) {
      view = (
        <Image
          source={{uri: Image.resolveAssetSource(RadioSelected).uri}}
          style={{width: 25, height: 25, resizeMode: 'contain'}}
        />
      );
    } else {
      view = (
        <Image
          source={{uri: Image.resolveAssetSource(RadioUnSelected).uri}}
          style={{width: 25, height: 25, resizeMode: 'contain'}}
        />
      );
    }
    return view;
  };

  const getIcon = () => {
    if (mode === 'radio') return getRadioIcon();
    else if (mode === 'Checkbox') return getCheckboxIcon();
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.container, containerStyle]}>
        {getIcon()}
        {mode === 'Checkbox' ? (
          <Text style={styles.labelStyle}>{label}</Text>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelStyle: {
    fontFamily: 'HKGrotesk-Regular',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 24,
    color: getCheckBoxLabelColor(),
    marginLeft: widthScale(12),
  },
});

CheckBox.defaultProps = {
  isSelected: true,
  containerStyle: {},
  onPress: () => {},
  mode: 'Checkbox',
};

export default CheckBox;
