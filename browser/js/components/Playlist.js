import React, { Component } from 'react';
import axios from 'axios';
import SongList from './SongList';
import ChooseSong from './ChooseSong';
import { convertSong } from '../helpers/convert';

export default class Playlist extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      playlist: {
        songs: []
      }
    };

    this.addSong = this.addSong.bind(this);
    this.removeSong = this.removeSong.bind(this);
  }

  componentDidMount() {
    axios.get(`/api/playlists/${this.props.params.playlistId}`)
      .then(res => res.data)
      .then(playlist => {
        playlist.songs = playlist.songs.map(convertSong);
        playlist.songs.sort((a, b) => new Date(a.playlistSong.createdAt) - new Date(b.playlistSong.createdAt));
        this.setState({ playlist });
      });
  }

  componentWillReceiveProps(nextProps) {
    axios.get(`/api/playlists/${nextProps.params.playlistId}`)
      .then(res => res.data)
      .then(playlist => {
        playlist.songs = playlist.songs.map(convertSong);
        playlist.songs.sort((a, b) => new Date(a.playlistSong.createdAt) - new Date(b.playlistSong.createdAt));
        this.setState({ playlist });
      });
  }

  addSong(id) {
    axios.post(`/api/playlists/${this.state.playlist.id}/songs`, { id })
    .then(res => res.data)
    .then(song => {
      const playlist = {
        ...this.state.playlist,
        songs: [...this.state.playlist.songs, song]
      }
      this.setState({ playlist });
    });
  }

  removeSong(id, idx) {
    axios.delete(`/api/playlists/${this.state.playlist.id}/songs/${id}`)
      .then(res => res.data)
      .then(() => {
        const songs = this.state.playlist.songs,
        playlist = {
          ...this.state.playlist,
          songs: [...songs.slice(0,idx), ...songs.slice(idx + 1)]
        };
        this.setState({ playlist });
      })
  }

  render() {
    return (
      <div>
        <h3>{ this.state.playlist.name }</h3>
        <SongList {...this.props} removeSong={ this.removeSong } songs={ this.state.playlist.songs || [] } />
        {!this.state.playlist.songs.length && <small>No songs.</small>}
        <hr />
        <ChooseSong songs={ this.state.playlist.songs || [] } addSong={ this.addSong } />
      </div>
    );
  }
}
