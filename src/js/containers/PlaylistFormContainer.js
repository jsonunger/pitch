import { connect } from 'react-redux';
import PlaylistForm from '../components/PlaylistForm';
import { createPlaylist } from '../action-reducers/playlists';
import { requestFailed } from '../action-reducers/error';
import { setNewPlaylistName } from '../action-reducers/newPlaylistName';

function isNameTaken(name, playlists) {
  return playlists.some(play => play.name === name);
}

function mapStateToProps (state) {
  return {
    playlists: state.playlists,
    newPlaylistName: state.newPlaylistName,
    nameTaken: isNameTaken(state.newPlaylistName, state.playlists)
  };
}

function mapDispatchToProps (dispatch) {
  return {
    create (name) {
      return dispatch(createPlaylist({ name }));
    },
    err (err) {
      return dispatch(requestFailed(err));
    },
    setName (name) {
      return dispatch(setNewPlaylistName(name));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistForm);
