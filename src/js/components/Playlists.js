import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { push } from 'react-router-redux';
import { deletePlaylist } from '../action-reducers/playlists';
import NavLink from './NavLink';
import '../../scss/playlist';

const del = (dispatch, userId, playlistId, current) => {
  dispatch(deletePlaylist(userId, playlistId))
    .then(() => {
      if (current.id === playlistId) dispatch(push('/albums'));
    });
};

const Playlists = ({ playlists, playlist, user, dispatch }) => {
  return (
    <section id="playlist">
      <h4 className="text-muted">PLAYLISTS</h4>
      {playlists.map(play =>
        <NavLink key={play.id} to={`/playlists/${play.id}`}>
          <section className="playlist">
            <span className="menu-item">{play.name}</span>
            <button className="btn btn-default btn-xs" onClick={ evt => {
                evt.preventDefault();
                del(dispatch, user.id, play.id, playlist);
              }
            }>
              <span className="glyphicon glyphicon-remove"></span>
            </button>
          </section>
        </NavLink>
      )}
      <p>
        <Link to="/playlists/new" className="btn btn-primary btn-block ellipsis"><span className="glyphicon glyphicon-plus"></span> PLAYLIST</Link>
      </p>
    </section>
  );
};

Playlists.propTypes = {
  playlists: PropTypes.arrayOf(PropTypes.object).isRequired,
  dispatch: PropTypes.func.isRequired,
  playlist: PropTypes.object,
  user: PropTypes.object
};

export default Playlists;
