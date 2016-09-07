import { get, post, del } from '../utils/api';
import { requestFailed } from './error';

/** ACTION TYPES */
const RECEIVE_PLAYLISTS = 'RECEIVE_PLAYLISTS';
const ADD_PLAYLIST = 'ADD_PLAYLIST';
const REMOVE_PLAYLIST = 'REMOVE_PLAYLIST';

/** SYNC ACTION CREATORS */
export const receivePlaylists = playlists => ({
  type: RECEIVE_PLAYLISTS,
  playlists
});

export const addPlaylist = playlist => ({
  type: ADD_PLAYLIST,
  playlist
});

export const removePlaylist = playlistId => ({
  type: REMOVE_PLAYLIST,
  playlistId
});

/** ASYNC ACTION CREATORS */
export const fetchPlaylists = () => dispatch => {
  return get('/api/playlists')
  .then(returnedPlaylists => dispatch(receivePlaylists(returnedPlaylists)))
  .catch(err => dispatch(requestFailed(err)));
};

export const createPlaylist = playlist => dispatch => {
  return post('/api/playlists', playlist)
    .then(returnedPlaylist => dispatch(addPlaylist(returnedPlaylist)))
    .catch(err => dispatch(requestFailed(err)));
};

export const deletePlaylist = playlistId => dispatch => {
  return del(`/api/playlists/${playlistId}`)
    .then(() => dispatch(removePlaylist(playlistId)))
    .catch(err => dispatch(requestFailed(err)));
};

/** REDUCER */
export default function playlists (state = [], action) {
  switch (action.type) {
    case RECEIVE_PLAYLISTS:
      return action.playlists;
    case ADD_PLAYLIST:
      return [...state, action.playlist];
    case REMOVE_PLAYLIST:
      return state.filter(playlist => playlist.id !== action.playlistId);
    default:
      return state;
  }
}
