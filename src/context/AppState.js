import React, { useMemo, useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Audio } from 'expo-av';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';

// context
import Context from './index';

WebBrowser.maybeCompleteAuthSession();

function AppState({ children }) {
  const [state, setState] = useState({
    currentSongData: {
      album: 'Swimming',
      artist: 'Mac Miller',
      image: 'swimming',
      length: 312,
      title: 'So It Goes',
      url: 'https://p.scdn.co/mp3-preview/733917412e690757a7d4d39e38d6df0223709b1f?cid=d8a5ed4734d048f78f6920199e43685e'
    },
    isLoading: true,
    showMusicBar: true,
    isPlaying: false,
    isBuffering: false,
    position: 0,
    duration: 0,
    user: null,
    isLoggedIn: false
  });

  const [sound, setSound] = useState(null);

  const onPlaybackStatusUpdate = useCallback((status) => {
    if (status.isLoaded) {
      setState((prevState) => ({
        ...prevState,
        isPlaying: status.isPlaying,
        isBuffering: status.isBuffering,
        position: status.positionMillis,
        duration: status.durationMillis || prevState.duration
      }));
    } else if (status.error) {
      console.error(`Playback Error: ${status.error}`);
    }
  }, []);

  const playSong = useCallback(
    async (songData) => {
      try {
        if (sound) {
          await sound.unloadAsync();
        }

        const { sound: newSound } = await Audio.Sound.createAsync(
          { uri: songData.url },
          { shouldPlay: true },
          onPlaybackStatusUpdate
        );

        setSound(newSound);
        setState((prevState) => ({
          ...prevState,
          currentSongData: songData,
          isPlaying: true
        }));
      } catch (error) {
        console.error('Error loading sound', error);
      }
    },
    [sound, onPlaybackStatusUpdate]
  );

  const togglePlayPause = useCallback(async () => {
    if (!sound) return;

    if (state.isPlaying) {
      await sound.pauseAsync();
    } else {
      await sound.playAsync();
    }
  }, [sound, state.isPlaying]);

  const seekAudio = useCallback(
    async (value) => {
      if (!sound) return;
      await sound.setPositionAsync(value);
    },
    [sound]
  );

  const updateState = useCallback((key, value) => {
    setState((prevState) => ({
      ...prevState,
      [key]: value
    }));
  }, []);

  useEffect(() => {
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      staysActiveInBackground: true,
      interruptionModeIOS: 1, // InterruptionModeIOS.DoNotMix
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: 1, // InterruptionModeAndroid.DoNotMix
      playThroughEarpieceAndroid: false
    });

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  const [, response, promptAsync] = Google.useAuthRequest({
    androidClientId: 'YOUR_ANDROID_CLIENT_ID',
    iosClientId: 'YOUR_IOS_CLIENT_ID',
    expoClientId: 'YOUR_EXPO_CLIENT_ID'
  });

  useEffect(() => {
    if (response?.type === 'success') {
      // Fetch user data using response.authentication.accessToken if needed
      setState((prevState) => ({
        ...prevState,
        user: {
          name: 'Caleb Nance',
          email: 'caleb@example.com',
          photo: 'https://github.com/calebnance.png'
        },
        isLoggedIn: true
      }));
    }
  }, [response]);

  const loginWithGoogle = useCallback(() => {
    promptAsync();
  }, [promptAsync]);

  const logout = useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      user: null,
      isLoggedIn: false
    }));
  }, []);

  const value = useMemo(
    () => ({
      ...state,
      updateState,
      playSong,
      togglePlayPause,
      seekAudio,
      loginWithGoogle,
      logout
    }),
    [
      state,
      updateState,
      playSong,
      togglePlayPause,
      seekAudio,
      loginWithGoogle,
      logout
    ]
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

AppState.propTypes = {
  // required
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default AppState;
