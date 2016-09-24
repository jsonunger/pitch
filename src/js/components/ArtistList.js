import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const ArtistList = ({ artists }) => {
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
