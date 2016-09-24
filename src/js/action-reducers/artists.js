import { get } from '../utils/api';
import { requestFailed } from './error';

/** ACTION TYPES */
const RECEIVE_ARTISTS = 'RECEIVE_ARTISTS';

/** SYNC ACTION CREATORS */
export const receiveArtists = artists => ({
  type: RECEIVE_ARTISTS,
  artists
});

/** ASYNC ACTION CREATORS */
export const fetchArtists = () => dispatch => {
  return get('/api/artists')
  .then(returnedArtists => dispatch(receiveArtists(returnedArtists)))
  .catch(err => dispatch(requestFailed(err)));
};

/** REDUCER */
export default function artists (state = [], action) {
  switch (action.type) {
    case RECEIVE_ARTISTS:
      return action.artists;
    default:
      return state;
  }
}
