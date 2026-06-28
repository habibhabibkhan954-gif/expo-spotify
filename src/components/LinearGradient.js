import * as React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../constants';

function CustomLinearGradient({ fill, height }) {
  return (
    <LinearGradient
      colors={[fill, colors.background]}
      style={[styles.container, { height }]}
    />
  );
}

CustomLinearGradient.defaultProps = {
  fill: colors.accent_green,
  height: 320
};

CustomLinearGradient.propTypes = {
  // optional
  fill: PropTypes.string,
  height: PropTypes.number
};

const styles = StyleSheet.create({
  container: {
    width: '100%'
  }
});

export default CustomLinearGradient;
