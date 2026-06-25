import React, { useMemo, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

// context
import Context from './index';

function AppState({ children }) {
  const [state, setState] = useState({
    currentSongData: {
      album: 'Swimming',
      artist: 'Mac Miller',
      image: 'swimming',
      length: 312,
      title: 'So It Goes'
    },
    isLoading: true,
    showMusicBar: true
  });

  const updateState = useCallback((key, value) => {
    setState((prevState) => ({
      ...prevState,
      [key]: value
    }));
  }, []);

  const value = useMemo(
    () => ({
      ...state,
      updateState
    }),
    [state, updateState]
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
