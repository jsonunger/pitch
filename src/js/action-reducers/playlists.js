import { get, post, del } from '../utils/api';
import { requestFailed } from './error';
import { clearCurrentList } from './currentList';
import { setCurrentSong } from './currentSong';
import { pauseMusic } from './isPlaying';
import { push } from 'react-router-redux';


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
export const fetchPlaylists = userId => dispatch => {
  return get(`/api/users/${userId}/playlists`)
  .then(returnedPlaylists => {
    returnedPlaylists.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    return dispatch(receivePlaylists(returnedPlaylists));
  })
  .catch(err => dispatch(requestFailed(err)));
};

export const createPlaylist = (userId, name) => dispatch => {
  return post(`/api/users/${userId}/playlists`, { name })
    .then(returnedPlaylist => dispatch(addPlaylist(returnedPlaylist)))
    .then(({ playlist }) => dispatch(push(`/playlists/${playlist.id}`)))
    .catch(err => dispatch(requestFailed(err)));
};

export const deletePlaylist = (userId, playlistId) => (dispatch, getState) => {
  const { currentList } = getState();
  const changingCurrentList = currentList.listType === 'playlist' && currentList.id === playlistId;
  return del(`/api/users/${userId}/playlists/${playlistId}`)
    .then(() => dispatch(removePlaylist(playlistId)))
    .then(() => {
      if (changingCurrentList) {
        dispatch(pauseMusic());
        dispatch(clearCurrentList());
        return dispatch(setCurrentSong());
      } else {
        return;
      }
    })
    .catch(err => dispatch(requestFailed(err)));
};

/** REDUCER */
export default function reducer (state = [], action) {
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
