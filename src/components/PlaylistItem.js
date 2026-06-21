import * as React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { colors, gStyle } from '../constants';

function PlaylistItem({ bgColor, onPress, title }) {
  return (
    <TouchableOpacity
      activeOpacity={gStyle.activeOpacity}
      onPress={onPress}
      style={[styles.playlistItem, { backgroundColor: bgColor }]}
    >
      <Text style={styles.playlistTitle}>{title}</Text>
    </TouchableOpacity>
  );
}

PlaylistItem.propTypes = {
  // required
  bgColor: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
  playlistItem: {
    borderRadius: 8,
    flex: 1,
    height: 98,
    marginBottom: 16,
    marginRight: 16,
    overflow: 'hidden',
    paddingLeft: 12,
    paddingTop: 12
  },
  playlistTitle: {
    ...gStyle.text_md,
    color: colors.white
  }
});

export default PlaylistItem;
