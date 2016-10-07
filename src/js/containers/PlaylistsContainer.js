import { connect } from 'react-redux';
import Playlists from '../components/Playlists';

function mapStateToProps (state) {
  return {
    playlists: state.playlists,
    playlist: state.playlist,
    user: state.auth.user
  };
}

export default connect(mapStateToProps)(Playlists);
