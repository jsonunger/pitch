import { connect } from 'react-redux';
import Playlist from '../components/Playlist';
import { fetchPlaylist, unsetPlaylist } from '../action-reducers/playlist';

function mapStateToProps (state) {
  return {
    playlist: state.playlist,
    user: state.auth.user
  };
}

function mapDispatchToProps (dispatch) {
  return {
    fetchPlaylist (userId, playlistId) {
      return dispatch(fetchPlaylist(userId, playlistId));
    },
    unset () {
      return dispatch(unsetPlaylist());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Playlist);
