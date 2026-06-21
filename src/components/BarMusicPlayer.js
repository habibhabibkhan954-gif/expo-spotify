import * as React from 'react';
import PropTypes from 'prop-types';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { colors, device, gStyle, images } from '../constants';

function BarMusicPlayer({ song }) {
  const navigation = useNavigation();

  // local state
  const [favorited, setFavorited] = React.useState(false);
  const [paused, setPaused] = React.useState(true);

  const favoriteColor = favorited ? colors.accent_green : colors.white;
  const favoriteIcon = favorited ? 'heart' : 'heart-o';
  const iconPlay = paused ? 'play' : 'pause';

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => navigation.navigate('ModalMusicPlayer')}
      style={styles.container}
    >
      <View style={gStyle.flexRowCenterAlign}>
        {song && <Image source={images[song.image]} style={styles.image} />}
        {song && (
          <View style={styles.containerSong}>
            <Text ellipsizeMode="tail" numberOfLines={1} style={styles.title}>
              {song.title}
            </Text>
            <Text ellipsizeMode="tail" numberOfLines={1} style={styles.artist}>
              {song.artist}
            </Text>
          </View>
        )}
      </View>

      <View style={gStyle.flexRowCenterAlign}>
        <TouchableOpacity
          activeOpacity={gStyle.activeOpacity}
          onPress={() => setFavorited(!favorited)}
          style={styles.containerIcon}
        >
          <FontAwesome color={favoriteColor} name={favoriteIcon} size={20} />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={gStyle.activeOpacity}
          onPress={() => setPaused(!paused)}
          style={styles.containerIcon}
        >
          <FontAwesome color={colors.white} name={iconPlay} size={24} />
        </TouchableOpacity>
      </View>

      <View style={styles.progressBarBackground}>
        <View style={styles.progressBarFill} />
      </View>
    </TouchableOpacity>
  );
}

BarMusicPlayer.defaultProps = {
  song: null
};

BarMusicPlayer.propTypes = {
  // optional
  song: PropTypes.shape({
    artist: PropTypes.string,
    image: PropTypes.string,
    title: PropTypes.string
  })
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.player_bg,
    borderRadius: 8,
    bottom: device.iPhoneNotch ? 90 : 60,
    flexDirection: 'row',
    height: 56,
    justifyContent: 'space-between',
    left: 0,
    marginHorizontal: 8,
    paddingRight: 8,
    position: 'absolute',
    right: 0,
    zIndex: 100
  },
  image: {
    borderRadius: 4,
    height: 40,
    marginLeft: 8,
    width: 40
  },
  containerIcon: {
    ...gStyle.flexCenter,
    width: 40
  },
  containerSong: {
    marginLeft: 12,
    width: device.width - 180
  },
  title: {
    ...gStyle.text_sm,
    color: colors.text_primary,
    fontWeight: '600'
  },
  artist: {
    ...gStyle.text_xs,
    color: colors.text_secondary
  },
  progressBarBackground: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 1,
    bottom: 0,
    height: 2,
    left: 8,
    position: 'absolute',
    right: 8
  },
  progressBarFill: {
    backgroundColor: colors.text_primary,
    borderRadius: 1,
    height: 2,
    width: '30%'
  }
});

export default BarMusicPlayer;
