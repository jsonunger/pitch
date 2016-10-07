import { connect } from 'react-redux';
import SongList from '../components/SongList';
import { start } from '../action-reducers/playerActions';
import { removeSong } from '../action-reducers/playlist';

function mapStateToProps (state) {
  return {
    currentList: state.currentList,
    currentSong: state.currentSong,
    playlist: state.playlist,
    album: state.album,
    user: state.auth.user
  };
}

function mapDispatchToProps (dispatch) {
  return {
    playSong(song, list, listType) {
      return dispatch(start(song, list, listType));
    },
    removeSong (playlistId, songId, userId) {
      return dispatch(removeSong(userId, playlistId, songId));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SongList);
