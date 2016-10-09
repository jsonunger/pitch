import { connect } from 'react-redux';
import PlaylistForm from '../components/PlaylistForm';

function mapStateToProps (state) {
  return {
    playlists: state.playlists,
    user: state.auth.user
  };
}

export default connect(mapStateToProps)(PlaylistForm);
