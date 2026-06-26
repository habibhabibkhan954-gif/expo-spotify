import * as React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, gStyle } from '../constants';

function PlaylistItem({ bgColor, onPress, title }) {
  return (
    <TouchableOpacity
      activeOpacity={gStyle.activeOpacity}
      onPress={onPress}
      style={[styles.playlistItem, { backgroundColor: bgColor }]}
    >
      <Text style={styles.playlistTitle}>{title}</Text>
      <View style={styles.imageBox} />
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
    color: colors.white,
    width: '70%'
  },
  imageBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 4,
    bottom: -10,
    height: 64,
    position: 'absolute',
    right: -15,
    transform: [{ rotate: '25deg' }],
    width: 64
  }
});

export default PlaylistItem;
