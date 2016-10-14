import React, { Component, PropTypes } from 'react';
import Button from 'react-bootstrap/lib/Button';
import ProgressBar from 'react-bootstrap/lib/ProgressBar';
import { dispatch } from '../store';
import { next } from '../action-reducers/playerActions';
import { setProgress } from '../action-reducers/progress';
import { findProp } from '../utils/helpers';
import Glyphicon from './Glyphicon';

let audio = document.createElement('audio');

audio.addEventListener('ended', function () {
  dispatch(next());
});

audio.addEventListener('timeupdate', function () {
  dispatch(setProgress(audio.currentTime / audio.duration));
});

export default class Player extends Component {
  static propTypes = {
    currentSong: PropTypes.object,
    progress: PropTypes.number,
    previousSong: PropTypes.func.isRequired,
    nextSong: PropTypes.func.isRequired,
    toggle: PropTypes.func.isRequired,
    isPlaying: PropTypes.bool.isRequired,
    currentList: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.seek = this.seek.bind(this);
  }

  seek({ target, nativeEvent }) {
    let barWidth = findProp(target, `${target.className === 'progress' ? '' : 'parentNode.'}scrollWidth`);
    let decimal = nativeEvent.offsetX / barWidth;
    audio.currentTime = audio.duration * decimal;
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.currentSong.id !== nextProps.currentSong.id) {
      audio.src = nextProps.currentSong.audioUrl;
      audio.load();
    }

    audio[nextProps.isPlaying ? 'play' : 'pause']();
  }

  render() {
    const { currentSong, progress, previousSong, toggle, isPlaying, nextSong, currentList } = this.props;
    if (!currentSong.id) return null;
    return (
      <div>
        <div className="pull-left">
          <Button onClick={previousSong} disabled={currentList.songs.length <= 1}>
            <Glyphicon glyph="step-backward" />
          </Button>{' '}
          <Button onClick={ toggle }>
            <Glyphicon glyph={isPlaying ? 'pause' : 'play'} />
          </Button>{' '}
          <Button onClick={ nextSong } disabled={ currentList.songs.length <= 1 }>
            <Glyphicon glyph="step-forward" />
          </Button>
        </div>
        <div className="bar">
          <ProgressBar onClick={this.seek} now={progress * 100} label={ `${currentSong.name} - ${currentSong.artists.map(a => a.name).join(', ')}` } />
        </div>
      </div>
    );
  }
}
