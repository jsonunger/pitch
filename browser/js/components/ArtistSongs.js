import React, { Component, PropTypes } from 'react';
import SongList from './SongList';

class ArtistSongs extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      songs: []
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      songs: nextProps.artist.songs
    });
  }

  componentDidMount() {
    this.setState({
      songs: this.props.artist.songs || []
    });
  }

  render() {
    return (
      <div>
        <h4>SONGS</h4>
        <SongList {...this.props} songs={this.state.songs} />
      </div>
    );
  }
}

ArtistSongs.propTypes = {
  artist: PropTypes.object
};

export default ArtistSongs;
