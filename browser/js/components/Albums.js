import React, { Component } from 'react';
import AlbumList from './AlbumList';
import axios from 'axios';
import { convertAlbum } from '../helpers/convert';

export default class Albums extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      albums: []
    };
  }

  componentDidMount() {
    axios.get('/api/albums')
      .then(res => res.data.map(convertAlbum))
      .then(albums => {
        this.setState({ albums });
      });
  }

  render() {
    return (
      <div>
        <h3>Albums</h3>
        <AlbumList albums={ this.state.albums } />
      </div>
    );
  }
}
