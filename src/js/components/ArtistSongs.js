import React, { PropTypes } from 'react';
import SongList from '../containers/SongListContainer';

const ArtistSongs = ({ artist }) => {
  return (
    <div>
      <h4>SONGS</h4>
      <SongList songs={ artist.songs } />
    </div>
  );
};

ArtistSongs.propTypes = {
  artist: PropTypes.object.isRequired
};

export default ArtistSongs;
