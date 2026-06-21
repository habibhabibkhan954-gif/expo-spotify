import * as React from 'react';
import PropTypes from 'prop-types';
import { Animated, Image, StyleSheet, Text, View } from 'react-native';
import { Feather, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { colors, device, func, gStyle, images } from '../constants';

// components
import ModalHeader from '../components/ModalHeader';
import TouchIcon from '../components/TouchIcon';

// context
import Context from '../context';

function ModalMusicPlayer(props) {
  // get main app state
  const { currentSongData } = React.useContext(Context);

  // local state
  const [favorited, setFavorited] = React.useState(false);
  const [paused, setPaused] = React.useState(true);
  const albumArtScale = React.useRef(new Animated.Value(1)).current;

  const { navigation } = props;

  React.useEffect(() => {
    Animated.spring(albumArtScale, {
      toValue: paused ? 0.85 : 1,
      useNativeDriver: true
    }).start();
  }, [paused]);

  // ui state
  const favoriteColor = favorited ? colors.accent_green : colors.white;
  const favoriteIcon = favorited ? 'heart' : 'heart-o';
  const iconPlay = paused ? 'play-circle' : 'pause-circle';
  const timePast = func.formatTime(0);
  const timeLeft = func.formatTime(currentSongData.length);

  return (
    <View style={gStyle.container}>
      <Image
        source={images[currentSongData.image]}
        style={StyleSheet.absoluteFill}
        blurRadius={50}
      />
      <View style={[StyleSheet.absoluteFill, styles.backgroundOverlay]} />

      <ModalHeader
        left={<Feather color={colors.text_primary} name="chevron-down" />}
        leftPress={() => navigation.goBack(null)}
        right={<Feather color={colors.text_primary} name="more-horizontal" />}
        text={currentSongData.album}
      />

      <View style={gStyle.p3}>
        <Animated.View
          style={[
            { transform: [{ scale: albumArtScale }] },
            styles.containerAlbumArt
          ]}
        >
          <Image source={images[currentSongData.image]} style={styles.image} />
        </Animated.View>

        <View style={[gStyle.flexRowSpace, styles.containerDetails]}>
          <View style={styles.containerSong}>
            <Text ellipsizeMode="tail" numberOfLines={1} style={styles.song}>
              {currentSongData.title}
            </Text>
            <Text style={styles.artist}>{currentSongData.artist}</Text>
          </View>
          <View style={styles.containerFavorite}>
            <TouchIcon
              icon={<FontAwesome color={favoriteColor} name={favoriteIcon} />}
              onPress={() => setFavorited(!favorited)}
            />
          </View>
        </View>

        <View style={styles.containerVolume}>
          <Slider
            minimumValue={0}
            maximumValue={currentSongData.length}
            minimumTrackTintColor={colors.white}
            maximumTrackTintColor="rgba(255,255,255,0.2)"
            thumbTintColor={colors.white}
          />
          <View style={styles.containerTime}>
            <Text style={styles.time}>{timePast}</Text>
            <Text style={styles.time}>{`-${timeLeft}`}</Text>
          </View>
        </View>

        <View style={styles.containerControls}>
          <TouchIcon
            icon={<Feather color={colors.text_secondary} name="shuffle" />}
            onPress={() => null}
          />
          <View style={gStyle.flexRowCenterAlign}>
            <TouchIcon
              icon={<FontAwesome color={colors.white} name="step-backward" />}
              iconSize={32}
              onPress={() => null}
            />
            <View style={gStyle.pH3}>
              <TouchIcon
                icon={<FontAwesome color={colors.white} name={iconPlay} />}
                iconSize={64}
                onPress={() => setPaused(!paused)}
              />
            </View>
            <TouchIcon
              icon={<FontAwesome color={colors.white} name="step-forward" />}
              iconSize={32}
              onPress={() => null}
            />
          </View>
          <TouchIcon
            icon={<Feather color={colors.text_secondary} name="repeat" />}
            onPress={() => null}
          />
        </View>

        <View style={styles.containerBottom}>
          <TouchIcon
            icon={<Feather color={colors.text_secondary} name="speaker" />}
            onPress={() => null}
          />
          <TouchIcon
            icon={
              <MaterialIcons
                color={colors.text_secondary}
                name="playlist-play"
              />
            }
            onPress={() => null}
          />
        </View>
      </View>
    </View>
  );
}

ModalMusicPlayer.propTypes = {
  // required
  navigation: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  backgroundOverlay: {
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  containerAlbumArt: {
    alignSelf: 'center'
  },
  image: {
    borderRadius: 8,
    height: device.width - 64,
    marginVertical: device.iPhoneNotch ? 36 : 8,
    width: device.width - 64
  },
  containerDetails: {
    marginBottom: 16
  },
  containerSong: {
    flex: 6
  },
  song: {
    ...gStyle.textSpotifyBold24,
    color: colors.white
  },
  artist: {
    ...gStyle.textSpotify18,
    color: colors.greyInactive
  },
  containerFavorite: {
    alignItems: 'flex-end',
    flex: 1,
    justifyContent: 'center'
  },
  containerTime: {
    ...gStyle.flexRowSpace
  },
  time: {
    ...gStyle.textSpotify10,
    color: colors.greyInactive
  },
  containerControls: {
    ...gStyle.flexRowSpace,
    marginTop: device.iPhoneNotch ? 24 : 8
  },
  containerBottom: {
    ...gStyle.flexRowSpace,
    marginTop: device.iPhoneNotch ? 32 : 8
  }
});

export default ModalMusicPlayer;
