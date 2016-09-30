import React, { Component, PropTypes } from 'react';
import Bluebird from 'bluebird';
import { connect } from 'react-redux';
import Sidebar from '../components/Sidebar';
import Player from '../containers/PlayerContainer';
import { fetchPlaylists } from '../action-reducers/playlists';
import { fetchAlbums } from '../action-reducers/albums';
import { fetchArtists } from '../action-reducers/artists';
import { fetchSongs } from '../action-reducers/songs';

import '../../scss/app';

class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    init: PropTypes.func
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.init();
  }

  render() {
    return (
      <div id="app">
        <div className="container-fluid">
          <div className="col-xs-2">
            <Sidebar {...this.props} />
          </div>
          <div className="col-xs-10">
            { this.props.children }
          </div>
          <footer>
            <Player />
          </footer>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps (dispatch) {
  return {
    init() {
      return Bluebird.all([
        dispatch(fetchPlaylists()),
        dispatch(fetchAlbums()),
        dispatch(fetchArtists()),
        dispatch(fetchSongs())
      ]);
    }
  };
}

export default connect(null, mapDispatchToProps)(App);
