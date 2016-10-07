import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import album from './album';
import albums from './albums';
import artist from './artist';
import artists from './artists';
import auth from './auth';
import currentList from './currentList';
import currentSong from './currentSong';
import error from './error';
import filter from './filter';
import isPlaying from './isPlaying';
import playlist from './playlist';
import playlists from './playlists';
import progress from './progress';
import scrollWidth from './scrollWidth';
import songs from './songs';

const rootReducer = combineReducers({
  album,
  albums,
  artist,
  artists,
  auth,
  currentList,
  currentSong,
  error,
  filter,
  isPlaying,
  playlist,
  playlists,
  progress,
  routing,
  scrollWidth,
  songs
});

export default rootReducer;
