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
export const fetchPlaylist = playlistId => (dispatch, getState) => {
  if (getState().playlist.id === +playlistId) return;

  return get(`/api/playlists/${playlistId}`)
    .then(returnedPlaylist => {
      returnedPlaylist.songs = returnedPlaylist.songs.map(convertSong);
      return dispatch(receivePlaylist(returnedPlaylist));
    })
    .catch(err => dispatch(requestFailed(err)));
};

export const addSong = (playlistId, id) => dispatch => {
  return post(`/api/playlists/${playlistId}/songs`, { id })
    .then(convertSong)
    .then(song => dispatch(addSongToPlaylist(song)))
    .catch(err => dispatch(requestFailed(err)));
};

export const removeSong = (playlistId, id) => (dispatch, getState) => {
  return del(`/api/playlists/${playlistId}/songs/${id}`)
    .then(() => dispatch(removeSongFromPlaylist(id)))
    .then(() => {
      const { currentSong, playlist, currentList } = getState();
      console.log(currentList == playlist.songs);
      if (currentList == playlist.songs) {
        const idx = currentList.findIndex(song => song.id === +id);
        dispatch(setCurrentList([...currentList(0, idx), ...currentList(idx + 1)]));
      }

      if (!currentList.length) return dispatch(pauseMusic());

      if (!currentSong.id || +id !== currentSong.id) return;
      return dispatch(next());
    })
    .catch(err => dispatch(requestFailed(err)));
};

/** REDUCER */
export default function playlist (state = { songs: [] }, action) {
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
