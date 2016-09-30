import { connect } from 'react-redux';
import Playlist from '../components/Playlist';
import { fetchPlaylist, unsetPlaylist } from '../action-reducers/playlist';

function mapStateToProps (state) {
  return {
    playlist: state.playlist
  };
}

function mapDispatchToProps (dispatch) {
  return {
    fetchPlaylist (playlistId) {
      return dispatch(fetchPlaylist(playlistId));
    },
    unset () {
      return dispatch(unsetPlaylist());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Playlist);
