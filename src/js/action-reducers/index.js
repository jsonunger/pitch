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
import isPlaying from './isPlaying';
import playlist from './playlist';
import playlists from './playlists';
import progress from './progress';
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
  isPlaying,
  playlist,
  playlists,
  progress,
  routing,
  songs
});

export default rootReducer;
