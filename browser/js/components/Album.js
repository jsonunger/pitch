import React, { Component, PropTypes } from 'react';
import SongList from '../containers/SongListContainer';

class Album extends Component {
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
    return (
      <div className="album">
        <div>
          <h3>{ album.name }</h3>
          <img src={ album.imageUrl } className="img-thumbnail" />
        </div>
        <SongList songs={album.songs} />
      </div>

    );
  }
}

Album.propTypes = {
  params: PropTypes.object,
  fetchAlbum: PropTypes.func.isRequired,
  unset: PropTypes.func,
  album: PropTypes.object
};

export default Album;
