import React, {useState} from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

import {getTextFieldBorderColor} from '../utils/colorHelper';

import {widthScale, heightScale} from '../utils/dimensionHelper';

const Input = props => {
  const {
    val,
    onTextChange,
    name,
    placeholder,
    placeholderTextColor,
    containerStyle,
    error,
    bodyContainerStyle,
    iconLeft,
    iconRight,
    onIconPress,
    keyboardType,
    secureTextEntry,
    editable,
    allowFullTouch, // This will disable all the touch of the input
  } = props;

  const [isFoucs, setFocus] = useState(false);

  const getValidReactElement = (view, type) => {
    if (React.isValidElement(view))
      return (
        <TouchableOpacity
          disabled={allowFullTouch}
          onPress={() => onIconPress(type)}>
          {view}
        </TouchableOpacity>
      );
    return null;
  };

  const onFocusChanged = () => setFocus(!isFoucs);

  return (
    <View style={[containerStyle]}>
      <View
        style={[
          styles.container,
          bodyContainerStyle,
          isFoucs && {
            borderColor: '#1faeae',
          },
        ]}>
        {getValidReactElement(iconLeft, 'left')}
        <TextInput
          value={val}
          onChangeText={text => onTextChange(name, text)}
          underlineColorAndroid="transparent"
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          editable={editable}
          style={{
            width: '95%',
            fontFamily: 'HKGrotesk-Regular',
            height: heightScale(45),
            fontSize: 16,
          }}
          onFocus={onFocusChanged}
          onBlur={onFocusChanged}
        />
        {getValidReactElement(iconRight, 'right')}
      </View>
      {error !== '' && <Text style={styles.errorView}>{error}</Text>}
    </View>
  );
};

Input.defaultProps = {
  val: '',
  onTextChange: () => {},
  name: '',
  placeholder: '',
  placeholderTextColor: '',
  containerStyle: {},
  error: '',
  bodyContainerStyle: {},
  editable: true,
  allowFullTouch: false,
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: getTextFieldBorderColor(),
    paddingHorizontal: widthScale(16),
    flexDirection: 'row',
    alignItems: 'center',
  },
  errorView: {
    color: '#F00',
    fontSize: 10,
  },
});

export default Input;
