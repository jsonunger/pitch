import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Image from 'react-bootstrap/lib/Image';
import '../../scss/albumCard';

const AlbumCard = ({ album }) => {
  return (
    <Link className="thumbnail" to={`/albums/${album.id}`}>
      <div className="card">
        <Image src={ album.imageUrl } responsive />
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
