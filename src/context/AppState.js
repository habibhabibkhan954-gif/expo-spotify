import React, { useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';

// context
import Context from './index';

function AppState({ children }) {
  const [currentSongData, setCurrentSongData] = useState({
    album: 'Swimming',
    artist: 'Mac Miller',
    image: 'swimming',
    length: 312,
    title: 'So It Goes'
  });
  const [isLoading, setIsLoading] = useState(true);
  const [showMusicBar, setShowMusicBar] = useState(true);

  const updateState = useCallback((key, value) => {
    if (key === 'currentSongData') setCurrentSongData(value);
    if (key === 'isLoading') setIsLoading(value);
    if (key === 'showMusicBar') setShowMusicBar(value);
  }, []);

  const value = useMemo(
    () => ({
      currentSongData,
      isLoading,
      showMusicBar,
      updateState
    }),
    [currentSongData, isLoading, showMusicBar, updateState]
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
