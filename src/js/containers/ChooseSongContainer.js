import { connect } from 'react-redux';
import ChooseSong from '../components/ChooseSong';
import { addSong } from '../action-reducers/playlist';
import { fetchSongs } from '../action-reducers/songs';
import { setSelectedSong } from '../action-reducers/selectedSong';

function doesSongExist (songId, playlistSongs) {
  return playlistSongs.some(song => song.id === +songId);
}

function mapStateToProps (state) {
  return {
    playlist: state.playlist,
    songs: state.songs,
    selectedSong: state.selectedSong,
    songExists: doesSongExist(state.selectedSong, state.playlist.songs)
  };
}

function mapDispatchToProps (dispatch) {
  return {
    addSong (playlistId, songId) {
      return dispatch(addSong(playlistId, songId));
    },
    fetchSongs () {
      return dispatch(fetchSongs());
    },
    setSelectedSong (songId) {
      return dispatch(setSelectedSong(songId));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChooseSong);
