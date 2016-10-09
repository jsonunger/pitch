import React, { PropTypes } from 'react';
import SongList from '../containers/SongListContainer';

const ArtistSongs = ({ artist: { songs } }) => {
  return (
    <div>
      <br />
      <SongList songs={ songs } listType={'artist'} />
    </div>
  );
};

ArtistSongs.propTypes = {
  artist: PropTypes.object.isRequired
};

export default ArtistSongs;
