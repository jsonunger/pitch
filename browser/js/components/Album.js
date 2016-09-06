import React, { Component, PropTypes } from 'react';
import axios from 'axios';
import SongList from './SongList';
import * as convert from '../helpers/convert';

class Album extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      album: {}
    };
  }

  componentDidMount() {
    axios.get(`/api/albums/${this.props.params.albumId}`)
      .then(res => res.data)
      .then(convert.convertAlbum)
      .then(album => {
        album.songs = album.songs.map(convert.convertSong);
        return album;
      })
      .then(album => {
        this.setState({ album });
      });
  }

  render() {
    return (
      <div className="album">
        <div>
          <h3>{ this.state.album.name }</h3>
          <img src={ this.state.album.imageUrl } className="img-thumbnail" />
        </div>
        <SongList {...this.props} songs={this.state.album.songs || []} />
      </div>

    );
  }
}

Album.propTypes = {
  params: PropTypes.object
};

export default Album;
