import { connect } from 'react-redux';
import Playlists from '../components/Playlists';
import { deletePlaylist } from '../action-reducers/playlists';

function mapStateToProps (state) {
  return {
    playlists: state.playlists,
    playlist: state.playlist
  };
}

function mapDispatchToProps (dispatch) {
  return {
    del (id) {
      return dispatch(deletePlaylist(id));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Playlists);
