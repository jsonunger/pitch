import { connect } from 'react-redux';
import SongList from '../components/SongList';
import { start } from '../action-reducers/playerActions';
import { removeSong } from '../action-reducers/playlist';

function mapStateToProps (state) {
  return {
    currentList: state.currentList,
    currentSong: state.currentSong,
    playlist: state.playlist
  };
}

function mapDispatchToProps (dispatch) {
  return {
    playSong(song, list) {
      return dispatch(start(song, list));
    },
    removeSong (playlistId, songId) {
      return dispatch(removeSong(playlistId, songId));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SongList);
