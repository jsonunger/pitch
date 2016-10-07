import React, { Component, PropTypes } from 'react';
import ArtistList from './ArtistList';

function filteredArtists (artists, filter) {
  if (!filter) {
    return artists;
  } else {
    return artists.filter(artist => new RegExp(filter, 'ig').test(artist.name));
  }
}

class Artists extends Component {
  static propTypes = {
    artists: PropTypes.arrayOf(PropTypes.object).isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      filter: ''
    };
  }

  render() {
    const { artists } = this.props;
    return (
      <div>
        <h3>Artists</h3>
        <div className="panel input-group">
          <span className="input-group-addon">Filter</span>
          <input type="text" className="form-control" placeholder="by name" onChange={e => this.setState({ filter: e.target.value || '' })} />
        </div>
        <ArtistList artists={filteredArtists(artists, this.state.filter)} />
      </div>
    );
  }
}

export default Artists;
