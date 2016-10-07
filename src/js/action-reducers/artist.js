import { get } from '../utils/api';
import { requestFailed } from './error';
import { convertSong, convertAlbum } from '../utils/convert';
import Bluebird from 'bluebird';

/** ACTION TYPES */
const RECEIVE_ARTIST = 'RECEIVE_ARTIST';
const UNSET_ARTIST = 'UNSET_ARTIST';

/** SYNC ACTION CREATORS */
export const receiveArtist = artist => ({
  type: RECEIVE_ARTIST,
  artist
});

export const unsetArtist = () => ({
  type: UNSET_ARTIST
});

/** ASYNC ACTION CREATORS */
export const fetchArtist = artistId => (dispatch, getState) => {
  if (getState().artist.id === +artistId) return;

  const url = `/api/artists/${artistId}`;
  return Bluebird.all([get(url), get(`${url}/songs`), get(`${url}/albums`)])
    .spread((returnedArtist, songs, albums) => {
      returnedArtist.songs = songs.map(convertSong);
      returnedArtist.albums = albums.map(convertAlbum);
      return dispatch(receiveArtist(returnedArtist));
    })
    .catch(err => dispatch(requestFailed(err)));
};

/** REDUCER */
export default function reducer (state = { albums: [], songs: [] }, action) {
  switch (action.type) {
    case RECEIVE_ARTIST:
      return action.artist;
    case UNSET_ARTIST:
      return { albums: [], songs: [] };
    default:
      return state;
  }
}
