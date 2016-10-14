import React, { Component, PropTypes } from 'react';
import Bluebird from 'bluebird';
import { connect } from 'react-redux';
import Col from 'react-bootstrap/lib/Col';
import Grid from 'react-bootstrap/lib/Grid';
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
    dispatch: PropTypes.func,
    user: PropTypes.object
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch, user } = this.props;
    let fetches = [
      dispatch(fetchAlbums()),
      dispatch(fetchArtists()),
      dispatch(fetchSongs())
    ];
    if (user) {
      fetches.push(dispatch(fetchPlaylists(user.id)));
    }
    Bluebird.all(fetches);
  }


  render() {
    const { children } = this.props;
    return (
      <div id="app">
        <Grid fluid={true}>
          <Col xs={2}>
            <Sidebar {...this.props} />
          </Col>
          <Col xs={10}>
            { children }
          </Col>
          <footer>
            <Player />
          </footer>
        </Grid>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    user: state.auth.user
  };
}

export default connect(mapStateToProps)(App);
