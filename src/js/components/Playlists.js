import React, { PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
import '../../scss/playlist';

const deletePlaylist = (delFunc, id, current) => {
  delFunc(id)
    .then(() => {
      if (current.id === id) browserHistory.push('/albums');
    });
};

const Playlists = ({ playlists, del, playlist, routes }) => {
  let playRoute = routes.some(route => route.name === 'playlist');
  return (
    <section id="playlist">
      <h4 className="text-muted">PLAYLISTS</h4>
      {playlists.map(play =>
        <p key={play.id} className={`playlist menu-item${playRoute && play.name === playlist.name ? ' active' : ''}`}>
          <Link to={`/playlists/${play.id}`}>{play.name}</Link>
          <button className="btn btn-default btn-xs" onClick={ () => deletePlaylist(del, play.id, playlist) }>
            <span className="glyphicon glyphicon-remove"></span>
          </button>
        </p>
      )}
      <p>
        <Link to="/playlists/new" className="btn btn-primary btn-block"><span className="glyphicon glyphicon-plus"></span> PLAYLIST</Link>
      </p>
    </section>
  );
};

Playlists.propTypes = {
  playlists: PropTypes.arrayOf(PropTypes.object).isRequired,
  del: PropTypes.func.isRequired,
  playlist: PropTypes.object,
  routes: PropTypes.arrayOf(PropTypes.object)
};

export default Playlists;
