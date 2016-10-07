import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import '../../scss/albumCard';

const AlbumCard = ({ album }) => {
  return (
    <Link className="thumbnail" to={`/albums/${album.id}`}>
      <div className="card">
        <img className="img img-responsive full-width" src={ album.imageUrl } />
      </div>
      <div className="caption">
        <h5 className="ellipsis">{ album.name }</h5>
      </div>
    </Link>
  );
};

AlbumCard.propTypes = {
  album: PropTypes.object.isRequired
};

export default AlbumCard;
