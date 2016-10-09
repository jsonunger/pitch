import { connect } from 'react-redux';
import Player from '../components/Player';
import { next, previous } from '../action-reducers/playerActions';
import { togglePlaying } from '../action-reducers/isPlaying';

function mapStateToProps (state) {
  return {
    isPlaying: state.isPlaying,
    currentSong: state.currentSong,
    progress: state.progress,
    currentList: state.currentList
  };
}

function mapDispatchToProps (dispatch) {
  return {
    nextSong() {
      return dispatch(next());
    },
    previousSong() {
      return dispatch(previous());
    },
    toggle() {
      return dispatch(togglePlaying());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Player);
