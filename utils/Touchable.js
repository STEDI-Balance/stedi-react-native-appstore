import React from 'react';
import PropTypes from 'prop-types';
import {
  TouchableOpacity,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import { ViewPropTypes } from 'deprecated-react-native-prop-types';
import {
  IS_ANDROID,
  IS_LT_LOLLIPOP,
  noop,
} from './constants.js';

const Touchable = ({
  onPress,
  style,
  children,
  useForeground,
}) => {
  if (IS_ANDROID && !IS_LT_LOLLIPOP) {
    return (
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.SelectableBackground()}
        useForeground={useForeground}
        onPress={onPress}
      >
        <View
          style={style}
        >
          {children}
        </View>
      </TouchableNativeFeedback>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      style={style}
    >
      {children}
    </TouchableOpacity>
  );
};

Touchable.propTypes = {
  onPress: PropTypes.func,
  style: ViewPropTypes.style,
  useForeground: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

Touchable.defaultProps = {
  onPress: noop,
  style: {},
  useForeground: false,
};

export default Touchable;