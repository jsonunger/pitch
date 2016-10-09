import { get } from '../utils/api';
import { requestFailed } from './error';
import { convertAlbum } from '../utils/helpers';

/** ACTION TYPES */
const RECEIVE_ALBUMS = 'RECEIVE_ALBUMS';

/** SYNC ACTION CREATORS */
export const receiveAlbums = albums => ({
  type: RECEIVE_ALBUMS,
  albums
});

/** ASYNC ACTION CREATORS */
export const fetchAlbums = () => dispatch => {
  return get('/api/albums')
  .then(returnedAlbums => dispatch(receiveAlbums(returnedAlbums.map(convertAlbum))))
  .catch(err => dispatch(requestFailed(err)));
};

/** REDUCER */
export default function reducer (state = [], action) {
  switch (action.type) {
    case RECEIVE_ALBUMS:
      return action.albums;
    default:
      return state;
  }
}
