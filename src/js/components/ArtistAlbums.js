import React, { PropTypes } from 'react';
import AlbumList from './AlbumList';

const ArtistAlbums = ({ artist }) => {
  return (
    <div>
      <h4>ALBUMS</h4>
      <AlbumList albums={ artist.albums } />
    </div>
  );
};

ArtistAlbums.propTypes = {
  artist: PropTypes.object.isRequired
};

export default ArtistAlbums;
