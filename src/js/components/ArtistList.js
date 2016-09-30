import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { sortByName } from '../utils/convert';

const ArtistList = ({ artists }) => {
  sortByName(artists);
  return (
    <div className="list-group">
      {artists.map(artist => (
        <div key={artist.id} className="list-group-item">
          <Link to={`/artists/${artist.id}`}>{ artist.name }</Link>
        </div>
      ))}
    </div>
  );
};

ArtistList.propTypes = {
  artists: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default ArtistList;
