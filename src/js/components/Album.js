import React, { Component, PropTypes } from 'react';
import Image from 'react-bootstrap/lib/Image';
import SongList from '../containers/SongListContainer';
import '../../scss/album';

class Album extends Component {
  static propTypes = {
    params: PropTypes.object.isRequired,
    fetchAlbum: PropTypes.func.isRequired,
    unset: PropTypes.func.isRequired,
    album: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { fetchAlbum, params } = this.props;
    fetchAlbum(params.albumId);
  }

  componentWillReceiveProps(nextProps) {
    const { fetchAlbum, params } = nextProps;
    fetchAlbum(params.albumId);
  }

  componentWillUnmount() {
    this.props.unset();
  }

  render() {
    const { album } = this.props;
    album.songs.sort((a, b) => a.trackNum - b.trackNum);
    return (
      <div className="album">
        <div>
          <h3>{ album.name }</h3>
          <Image src={ album.imageUrl } thumbnail />
        </div>
        <SongList songs={album.songs} listType={'album'} />
      </div>

    );
  }
}

export default Album;
