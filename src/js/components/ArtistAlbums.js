import React, { PropTypes } from 'react';
import AlbumList from './AlbumList';

const ArtistAlbums = ({ artist: { albums } }) => {
  return (
    <div>
      <br />
      <AlbumList albums={ albums } />
    </div>
  );
};

ArtistAlbums.propTypes = {
  artist: PropTypes.object.isRequired
};

export default ArtistAlbums;
