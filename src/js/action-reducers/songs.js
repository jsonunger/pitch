import { get } from '../utils/api';
import { requestFailed } from './error';

/** ACTION TYPES */
const RECEIVE_SONGS = 'RECEIVE_SONGS';

/** SYNC ACTION CREATORS */
export const receiveAlbum = songs => ({
  type: RECEIVE_SONGS,
  songs
});

/** ASYNC ACTION CREATORS */
export const fetchSongs = () => dispatch => {
  return get('/api/songs')
    .then(returnedSongs => dispatch(receiveAlbum(returnedSongs)))
    .catch(err => dispatch(requestFailed(err)));
};

/** REDUCER */
export default function songs (state = [], action) {
  switch (action.type) {
    case RECEIVE_SONGS:
      return action.songs;
    default:
      return state;
  }
}
