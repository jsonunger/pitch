import React, { PropTypes } from 'react';
import AlbumList from './AlbumList';

const Albums = ({ albums }) => {
  return (
    <div>
      <h3>Albums</h3>
      <AlbumList albums={ albums } />
    </div>
  );
};

Albums.propTypes = {
  albums: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Albums;
