import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const AlbumCard = ({ album }) => {
  return (
    <Link className="thumbnail" to={`/albums/${album.id}`}>
      <img src={ album.imageUrl } />
      <div className="caption">
        <h5>
          <span>{ album.name }</span>
        </h5>
      </div>
    </Link>
  );
};

AlbumCard.propTypes = {
  album: PropTypes.object.isRequired
};

export default AlbumCard;
