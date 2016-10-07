import { connect } from 'react-redux';
import PlaylistForm from '../components/PlaylistForm';
import { createPlaylist } from '../action-reducers/playlists';
import { requestFailed } from '../action-reducers/error';

function mapStateToProps (state) {
  return {
    playlists: state.playlists,
    user: state.auth.user
  };
}

function mapDispatchToProps (dispatch) {
  return {
    create (name, userId) {
      return dispatch(createPlaylist(userId, { name }));
    },
    err (err) {
      return dispatch(requestFailed(err));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistForm);
