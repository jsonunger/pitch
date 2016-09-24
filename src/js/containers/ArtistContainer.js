import { connect } from 'react-redux';
import Artist from '../components/Artist';
import { fetchArtist, unsetArtist } from '../action-reducers/artist';

function mapStateToProps (state) {
  return {
    artist: state.artist
  };
}

function mapDispatchToProps (dispatch) {
  return  {
    fetchArtist (artistId) {
      return dispatch(fetchArtist(artistId));
    },
    unset () {
      return dispatch(unsetArtist());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Artist);
