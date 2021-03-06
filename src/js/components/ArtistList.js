import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import { sortByName } from '../utils/helpers';

const ArtistList = ({ artists }) => {
  sortByName(artists);
  return (
    <ListGroup>
      {artists.map(artist => (
        <ListGroupItem key={artist.id}>
          <Link to={`/artists/${artist.id}`}>{ artist.name }</Link>
        </ListGroupItem>
      ))}
    </ListGroup>
  );
};

ArtistList.propTypes = {
  artists: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default ArtistList;
