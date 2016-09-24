import { combineReducers } from 'redux';

import error from './error';
import playlists from './playlists';
import playlist from './playlist';
import albums from './albums';
import artists from './artists';
import artist from './artist';
import album from './album';
import songs from './songs';
import filter from './filter';
import selectedSong from './selectedSong';
import newPlaylistName from './newPlaylistName';
import isPlaying from './isPlaying';
import currentSong from './currentSong';
import currentList from './currentList';
import progress from './progress';
import scrollWidth from './scrollWidth';

const rootReducer = combineReducers({
  error,
  playlists,
  playlist,
  albums,
  artists,
  artist,
  album,
  songs,
  filter,
  selectedSong,
  newPlaylistName,
  isPlaying,
  currentSong,
  currentList,
  progress,
  scrollWidth
});

export default rootReducer;
