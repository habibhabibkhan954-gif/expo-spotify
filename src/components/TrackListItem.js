import * as React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, gStyle, images } from '../constants';

function TrackListItem({ onPress, songData }) {
  return (
    <TouchableOpacity
      activeOpacity={gStyle.activeOpacity}
      onPress={() => onPress(songData)}
      style={styles.container}
    >
      <View style={gStyle.flexRowCenterAlign}>
        <Image source={images[songData.image]} style={styles.image} />
        <View style={styles.containerText}>
          <Text ellipsizeMode="tail" numberOfLines={1} style={styles.title}>
            {songData.title}
          </Text>
          <Text style={styles.artist}>{songData.artist}</Text>
        </View>
      </View>

      <View style={styles.containerRight}>
        <Feather
          color={colors.text_secondary}
          name="more-horizontal"
          size={20}
        />
      </View>
    </TouchableOpacity>
  );
}

TrackListItem.propTypes = {
  // required
  onPress: PropTypes.func.isRequired,
  songData: PropTypes.shape({
    album: PropTypes.string.isRequired,
    artist: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  }).isRequired
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
    width: '100%'
  },
  image: {
    borderRadius: 4,
    height: 48,
    width: 48
  },
  containerText: {
    justifyContent: 'center',
    marginLeft: 12
  },
  title: {
    ...gStyle.text_base,
    color: colors.text_primary,
    fontWeight: '600'
  },
  artist: {
    ...gStyle.text_sm,
    color: colors.text_secondary,
    marginTop: 2
  },
  containerRight: {
    alignItems: 'flex-end'
  }
});

export default TrackListItem;
