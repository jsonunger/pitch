import React, { Component, PropTypes } from 'react';
import { push } from 'react-router-redux';
import Button from 'react-bootstrap/lib/Button';
import { deletePlaylist } from '../action-reducers/playlists';
import NavLink from './NavLink';
import PlaylistForm from '../containers/PlaylistFormContainer';
import Glyphicon from './Glyphicon';
import '../../scss/playlist';

class Playlists extends Component {
  static propTypes = {
    playlists: PropTypes.arrayOf(PropTypes.object).isRequired,
    dispatch: PropTypes.func.isRequired,
    playlist: PropTypes.object,
    user: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.del = this.del.bind(this);
  }

  del(playlistId) {
    const { dispatch, user, playlist } = this.props;
    dispatch(deletePlaylist(user.id, playlistId))
      .then(() => {
        if (playlist.id === playlistId) dispatch(push('/albums'));
      });
  }

  render() {
    const { playlists } = this.props;
    return (
      <section id="playlist">
        <h4 className="text-muted">PLAYLISTS</h4>
        {playlists.map(playlist =>
          <NavLink key={playlist.id} to={`/playlists/${playlist.id}`}>
            <section className="playlist">
              <span className="menu-item ellipsis">{playlist.name}
                <Button
                  bsSize="xsmall"
                  onClick={e => {
                    e.preventDefault();
                    this.del(playlist.id);
                }}>
                  <Glyphicon glyph="remove" />
                </Button>
              </span>
            </section>
          </NavLink>
        )}
        <PlaylistForm />
      </section>
    );
  }
}

export default Playlists;
