import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class Artist extends Component {
  static propTypes = {
    params: PropTypes.object.isRequired,
    children: PropTypes.element.isRequired,
    fetchArtist: PropTypes.func.isRequired,
    unset: PropTypes.func.isRequired,
    artist: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { fetchArtist, params } = this.props;
    fetchArtist(params.artistId);
  }

  componentWillReceiveProps(nextProps) {
    const { fetchArtist, params } = nextProps;
    fetchArtist(params.artistId);
  }

  componentWillUnmount() {
    this.props.unset();
  }

  render() {
    const { artist } = this.props;
    return (
      <div>
        <h3>{ artist.name }</h3>
        <ul className="nav nav-tabs">
          <li><Link to={`/artists/${ artist.id }/albums`}>ALBUMS</Link></li>
          <li><Link to={`/artists/${ artist.id }/songs`}>SONGS</Link></li>
        </ul>
        { this.props.children }
      </div>
    );
  }
}

export default Artist;
