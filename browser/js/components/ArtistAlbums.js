import React, { Component, PropTypes } from 'react';
import AlbumList from './AlbumList';

class ArtistAlbums extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      albums: []
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      albums: nextProps.artist.albums
    });
  }

  componentDidMount() {
    this.setState({
      albums: this.props.artist.albums || []
    });
  }

  render() {
    return (
      <div>
        <h4>ALBUMS</h4>
        <AlbumList albums={this.state.albums} />
      </div>
    );
  }
}

ArtistAlbums.propTypes = {
  artist: PropTypes.object
};

export default ArtistAlbums;
