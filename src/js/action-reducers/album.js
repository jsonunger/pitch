import { get } from '../utils/api';
import { requestFailed } from './error';
import { convertSong, convertAlbum } from '../utils/convert';

/** ACTION TYPES */
const RECEIVE_ALBUM = 'RECEIVE_ALBUM';
const UNSET_ALBUM = 'UNSET_ALBUM';

/** SYNC ACTION CREATORS */
export const receiveAlbum = album => ({
  type: RECEIVE_ALBUM,
  album
});

export const unsetAlbum = () => ({
  type: UNSET_ALBUM
});

/** ASYNC ACTION CREATORS */
export const fetchAlbum = albumId => (dispatch, getState) => {
  if (getState().album.id === +albumId) return;

  return get(`/api/albums/${albumId}`)
    .then(convertAlbum)
    .then(returnedAlbum => {
      returnedAlbum.songs = returnedAlbum.songs.map(convertSong);
      return dispatch(receiveAlbum(returnedAlbum));
    })
    .catch(err => dispatch(requestFailed(err)));
};

/** REDUCER */
export default function album (state = { name: '', imageUrl: '', songs: [] }, action) {
  switch (action.type) {
    case RECEIVE_ALBUM:
      return action.album;
    case UNSET_ALBUM:
      return { name: '', imageUrl: '', songs: [] };
    default:
      return state;
  }
}
