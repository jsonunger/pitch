import { connect } from 'react-redux';
import ArtistAlbums from '../components/ArtistAlbums';
import ArtistSongs from '../components/ArtistSongs';

function mapStateToProps (state) {
  return {
    artist: state.artist
  };
}

export const AAlbums = connect(mapStateToProps)(ArtistAlbums);

export const ASongs = connect(mapStateToProps)(ArtistSongs);
