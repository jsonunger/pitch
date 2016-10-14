import { connect } from 'react-redux';
import SongList from '../components/SongList';
import { start } from '../action-reducers/playerActions';
import { removeSong } from '../action-reducers/playlist';
import { togglePlaying } from '../action-reducers/isPlaying';
import { push } from 'react-router-redux';

function mapStateToProps (state) {
  return {
    currentList: state.currentList,
    currentSong: state.currentSong,
    playlist: state.playlist,
    album: state.album,
    user: state.auth.user,
    artist: state.artist,
    isPlaying: state.isPlaying
  };
}

function mapDispatchToProps (dispatch) {
  return {
    playSong (song, list, listType) {
      return dispatch(start(song, list, listType));
    },
    removeSong (playlistId, songId, userId) {
      return dispatch(removeSong(userId, playlistId, songId));
    },
    toggleSong () {
      return dispatch(togglePlaying());
    },
    goTo (path) {
      return dispatch(push(path));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SongList);
