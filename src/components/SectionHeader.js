import * as React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { colors, gStyle } from '../constants';

function SectionHeader({ title, showAllPress }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {showAllPress && (
        <TouchableOpacity
          activeOpacity={gStyle.activeOpacity}
          onPress={showAllPress}
        >
          <Text style={styles.showAll}>Show all</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

SectionHeader.defaultProps = {
  showAllPress: null
};

SectionHeader.propTypes = {
  // required
  title: PropTypes.string.isRequired,

  // optional
  showAllPress: PropTypes.func
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16
  },
  title: {
    ...gStyle.text_md,
    color: colors.text_primary
  },
  showAll: {
    ...gStyle.text_sm,
    color: colors.accent_green,
    fontWeight: '600'
  }
});

export default SectionHeader;
