import React, { PropTypes } from 'react';
import AlbumCard from './AlbumCard';
import { sortByName } from '../utils/convert';

const AlbumList = ({ albums }) => {
  sortByName(albums);
  return (
    <div className="row">
      { albums.map(album => <span className="col-xs-4" key={album.id}><AlbumCard album={album} /></span>) }
    </div>
  );
};

AlbumList.propTypes = {
  albums: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default AlbumList;
