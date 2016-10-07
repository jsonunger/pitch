import { connect } from 'react-redux';
import Playlists from '../components/Playlists';
import { deletePlaylist } from '../action-reducers/playlists';

function mapStateToProps (state) {
  return {
    playlists: state.playlists,
    playlist: state.playlist,
    user: state.auth.user
  };
}

function mapDispatchToProps (dispatch) {
  return {
    del (userId, playlistId) {
      return dispatch(deletePlaylist(userId, playlistId));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Playlists);
