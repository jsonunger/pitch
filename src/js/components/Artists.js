import React, { Component, PropTypes } from 'react';
import { InputGroup, FormControl } from 'react-bootstrap';
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
        <InputGroup className="panel">
          <InputGroup.Addon>Filter</InputGroup.Addon>
          <FormControl type="text" placeholder="by artist name" onChange={e => this.setState({ filter: e.target.value || '' })} />
        </InputGroup>
        <ArtistList artists={filteredArtists(artists, this.state.filter)} />
      </div>
    );
  }
}

export default Artists;
