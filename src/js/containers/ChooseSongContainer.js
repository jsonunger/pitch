import { connect } from 'react-redux';
import ChooseSong from '../components/ChooseSong';
import { addSong } from '../action-reducers/playlist';
import { fetchSongs } from '../action-reducers/songs';

function mapStateToProps (state) {
  return {
    playlist: state.playlist,
    songs: state.songs,
    user: state.auth.user
  };
}

function mapDispatchToProps (dispatch) {
  return {
    addSong (playlistId, songId, userId) {
      return dispatch(addSong(userId, playlistId, songId));
    },
    fetchSongs () {
      return dispatch(fetchSongs());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChooseSong);
