import { connect } from 'react-redux';
import Album from '../components/Album';
import { fetchAlbum, unsetAlbum } from '../action-reducers/album';

function mapStateToProps (state) {
  return {
    album: state.album
  };
}

function mapDispatchToProps (dispatch) {
  return {
    fetchAlbum (albumId) {
      return dispatch(fetchAlbum(albumId));
    },
    unset () {
      return dispatch(unsetAlbum());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Album);
