import { connect } from 'react-redux';
import Artists from '../components/Artists';
import { setFilter } from '../action-reducers/filter';

function filteredArtists (artists, filter) {
  if (!filter) {
    return artists;
  } else {
    return artists.filter(artist => new RegExp(filter, 'ig').test(artist.name));
  }
}

function mapStateToProps (state) {
  return {
    artists: filteredArtists(state.artists, state.filter)
  };
}

function mapDispatchToProps (dispatch) {
  return {
    setFilter (filter) {
      return dispatch(setFilter(filter));
    },
    unsetFilter () {
      return dispatch(setFilter(''));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Artists);
