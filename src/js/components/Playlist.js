import React, { Component, PropTypes } from 'react';
import SongList from '../containers/SongListContainer';
import ChooseSong from '../containers/ChooseSongContainer';

class Playlist extends Component {
  static propTypes = {
    fetchPlaylist: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
    unset: PropTypes.func.isRequired,
    playlist: PropTypes.object.isRequired
  }

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
    const songs = playlist.songs.filter(s => s.playlistSong);
    songs.sort((a, b) => new Date(a.playlistSong.createdAt) - new Date(b.playlistSong.createdAt));
    songs.push(...playlist.songs.filter(s => !s.playlistSong));
    return (
      <div>
        <h3>{ playlist.name }</h3>
        <SongList songs={ songs } inPlaylist={ true } />
        {!playlist.songs.length && <small>No songs.</small>}
        <hr />
        <ChooseSong />
      </div>
    );
  }
}

export default Playlist;
