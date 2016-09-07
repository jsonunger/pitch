import React, { Component } from 'react';
import { dispatch } from '../store';
import { next } from '../action-reducers/playerActions';
import { setProgress } from '../action-reducers/progress';

let audio = document.createElement('audio');

audio.addEventListener('ended', function () {
  dispatch(next());
});

audio.addEventListener('timeupdate', function () {
  dispatch(setProgress(audio.currentTime / audio.duration));
});

export default class Player extends Component {
  constructor(props) {
    super(props);
    this.handleResize = this.handleResize.bind(this);
    this.seek = this.seek.bind(this);
  }

  seek(e) {
    const { scrollWidth } = this.props;
    let decimal = e.nativeEvent.offsetX / scrollWidth;
    audio.currentTime = audio.duration * decimal;
  }

  componentWillReceiveProps(nextProps) {
    const { currentSong } = this.props;
    if (currentSong.id !== nextProps.currentSong.id) {
      audio.src = nextProps.currentSong.audioUrl;
      audio.load();
    }

    audio[nextProps.isPlaying ? 'play' : 'pause']();
  }

  handleResize() {
    const { progressBar } = this.refs;
    const { setScrollWidth } = this.props;
    if (progressBar) {
      setScrollWidth(progressBar.scrollWidth);
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.scrollWidth && this.refs.progressBar) {
      this.handleResize();
    }
  }

  render() {
    const { currentSong, progress, previous, toggle, isPlaying, next } = this.props;
    if (!currentSong.id) return null;
    return (
      <div>
        <div className="pull-left">
          <button onClick={ previous } className="btn btn-default">
            <span className="glyphicon glyphicon-step-backward"></span>
          </button>{' '}
          <button onClick={ toggle } className="btn btn-default">
            <span className={`glyphicon glyphicon-${ isPlaying ? 'pause' : 'play' }`}></span>
          </button>{' '}
          <button onClick={ next } className="btn btn-default">
            <span className="glyphicon glyphicon-step-forward"></span>
          </button>
        </div>
        <div className="bar">
          <div ref="progressBar" className="progress" onClick={ this.seek }>
            <div className="progress-bar" style={{ width: `${progress * 100}%` }}></div>
          </div>
        </div>
      </div>
    );
  }
}
