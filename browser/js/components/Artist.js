import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import * as convert from '../helpers/convert';

class Artist extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      artist: {}
    };
  }

  componentDidMount() {
    const url = `/api/artists/${this.props.params.artistId}`;
    axios.all([axios.get(url), axios.get(`${url}/songs`), axios.get(`${url}/albums`)])
      .then(responses => responses.map(res => res.data))
      .then(results => {
        let [artist, songs, albums] = results;
        artist.songs = songs.map(convert.convertSong);
        artist.albums = albums.map(convert.convertAlbum);
        return artist;
      })
      .then(artist => {
        this.setState({ artist });
      });
  }

  render() {
    return (
      <div>
        <h3>{this.state.artist.name}</h3>
        <ul className="nav nav-tabs">
          <li><Link to={`/artists/${ this.state.artist.id }/albums`}>ALBUMS</Link></li>
          <li><Link to={`/artists/${ this.state.artist.id }/songs`}>SONGS</Link></li>
        </ul>
        { React.cloneElement(this.props.children, { artist: this.state.artist }) }
      </div>
    );
  }
}

Artist.propTypes = {
  params: PropTypes.object.isRequired,
  children: PropTypes.element.isRequired
};

export default Artist;
