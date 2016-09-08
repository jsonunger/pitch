import { connect } from 'react-redux';
import Player from '../components/Player';
import { next, previous } from '../action-reducers/playerActions';
import { togglePlaying } from '../action-reducers/isPlaying';
import { setScrollWidth } from '../action-reducers/scrollWidth';

function mapStateToProps (state) {
  return {
    isPlaying: state.isPlaying,
    currentSong: state.currentSong,
    scrollWidth: state.scrollWidth,
    progress: state.progress,
    currentList: state.currentList
  };
}

function mapDispatchToProps (dispatch) {
  return {
    next() {
      return dispatch(next());
    },
    previous() {
      return dispatch(previous());
    },
    toggle() {
      return dispatch(togglePlaying());
    },
    setScrollWidth(width) {
      return dispatch(setScrollWidth(width));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Player);
