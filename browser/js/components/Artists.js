import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import axios from 'axios';

const ArtistList = ({ artists }) => {
  return (
    <div className="list-group">
      {artists.map(artist => (
        <div key={artist.id} className="list-group-item">
          <Link to={`/artists/${artist.id}`}>{ artist.name }</Link>
        </div>
      ))}
    </div>
  );
};

ArtistList.propTypes = {
  artists: PropTypes.arrayOf(PropTypes.object)
};

export default class Artists extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      artists: [],
      filteredArtists: []
    };
    this.filterArtists = this.filterArtists.bind(this);
  }

  componentDidMount() {
    axios.get('/api/artists')
      .then(res => res.data)
      .then(artists => {
        this.setState({
          artists: artists,
          filteredArtists: artists
        });
      });
  }

  filterArtists(evt) {
    let value = evt.target.value;
    let filteredArtists = this.state.artists;
    if (value) {
      filteredArtists = filteredArtists.filter(artist => new RegExp(value, 'ig').test(artist.name));
    }

    this.setState({ filteredArtists });
  }

  render() {
    return (
      <div>
        <h3>Artists</h3>
        <div className="panel input-group">
          <span className="input-group-addon">Filter</span>
          <input type="text" className="form-control" placeholder="by name" onChange={this.filterArtists} />
        </div>
        <ArtistList artists={this.state.filteredArtists} />
      </div>
    );
  }
}
