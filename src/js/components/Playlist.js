import React, { Component, PropTypes } from 'react';
import SongList from '../containers/SongListContainer';
import ChooseSong from '../containers/ChooseSongContainer';

class Playlist extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { fetchPlaylist, params } = this.props;
    fetchPlaylist(params.playlistId);
  }

  componentWillReceiveProps(nextProps) {
    const { fetchPlaylist, params } = nextProps;
    fetchPlaylist(params.playlistId);
  }

  componentWillUnmount() {
    const { unset } = this.props;
    unset();
  }

  render() {
    const { playlist } = this.props;
    return (
      <div>
        <h3>{ playlist.name }</h3>
        <SongList songs={ playlist.songs } inPlaylist={ true } />
        {!playlist.songs.length && <small>No songs.</small>}
        <hr />
        <ChooseSong />
      </div>
    );
  }
}

Playlist.propTypes = {
  fetchPlaylist: PropTypes.func,
  params: PropTypes.object,
  unset: PropTypes.func,
  playlist: PropTypes.object,
  removeSong: PropTypes.func
};

export default Playlist;
