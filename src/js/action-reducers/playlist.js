import { get, post, del } from '../utils/api';
import { requestFailed } from './error';
import { convertSong } from '../utils/convert';
import { next } from './playerActions';
import { setCurrentList } from './currentList';
import { pauseMusic } from './isPlaying';

/** ACTION TYPES */
const RECEIVE_PLAYLIST = 'RECEIVE_PLAYLIST';
const ADD_SONG_TO_PLAYLIST = 'ADD_SONG_TO_PLAYLIST';
const REMOVE_SONG_FROM_PLAYLIST = 'REMOVE_SONG_FROM_PLAYLIST';
const UNSET_PLAYLIST = 'UNSET_PLAYLIST';

/** SYNC ACTION CREATORS */
export const receivePlaylist = playlist => ({
  type: RECEIVE_PLAYLIST,
  playlist
});

export const addSongToPlaylist = song => ({
  type: ADD_SONG_TO_PLAYLIST,
  song
});

export const removeSongFromPlaylist = songId => ({
  type: REMOVE_SONG_FROM_PLAYLIST,
  songId
});

export const unsetPlaylist = () => ({
  type: UNSET_PLAYLIST
});

/** ASYNC ACTION CREATORS */
export const fetchPlaylist = (userId, playlistId) => (dispatch, getState) => {
  if (getState().playlist.id === +playlistId) return;

  return get(`/api/users/${userId}/playlists/${playlistId}`)
    .then(returnedPlaylist => {
      returnedPlaylist.songs = returnedPlaylist.songs.map(convertSong);
      return dispatch(receivePlaylist(returnedPlaylist));
    })
    .catch(err => dispatch(requestFailed(err)));
};

export const addSong = (userId, playlistId, id) => (dispatch, getState) => {
  const { currentList } = getState();
  const changingCurrentList = currentList.listType === 'playlist' && currentList.id === playlistId;
  return post(`/api/users/${userId}/playlists/${playlistId}/songs`, { id })
    .then(convertSong)
    .then(song => dispatch(addSongToPlaylist(song)))
    .then(() => {
      if (changingCurrentList) {
        const { playlist } = getState();
        return dispatch(setCurrentList(playlist.songs, playlist.id, 'playlist'));
      } else {
        return;
      }
    })
    .catch(err => dispatch(requestFailed(err)));
};

export const removeSong = (userId, playlistId, id) => (dispatch, getState) => {
  const { currentList } = getState();
  const changingCurrentList = currentList.listType === 'playlist' && currentList.id === playlistId;
  return del(`/api/users/${userId}/playlists/${playlistId}/songs/${id}`)
    .then(() => dispatch(removeSongFromPlaylist(id)))
    .then(() => {
      if (changingCurrentList) {
        const { playlist } = getState();
        return dispatch(setCurrentList(playlist.songs, playlist.id, 'playlist'));
      } else {
        return;
      }
    })
    .then(() => {
      const { currentSong } = getState();
      if (!getState().currentList.songs.length) {
        return dispatch(pauseMusic());
      } else if (+id === currentSong.id) {
        return dispatch(next());
      }
    })
    .catch(err => dispatch(requestFailed(err)));
};

/** REDUCER */
export default function reducer (state = { songs: [] }, action) {
  switch (action.type) {
    case RECEIVE_PLAYLIST:
      return action.playlist;
    case ADD_SONG_TO_PLAYLIST:
      return {
        ...state,
        songs: [...state.songs, action.song]
      };
    case REMOVE_SONG_FROM_PLAYLIST:
      return {
        ...state,
        songs: state.songs.filter(song => song.id !== action.songId)
      };
    case UNSET_PLAYLIST:
      return { songs: [] };
    default:
      return state;
  }
}
