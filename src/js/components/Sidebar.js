import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { push } from 'react-router-redux';
import NavLink from './NavLink';
import Playlists from '../containers/PlaylistsContainer';
import { logout } from '../action-reducers/auth';

import '../../scss/sidebar';

const renderPlaylistsOrLogin = (user, dispatch, routes) => {

  function handleLogout () {
    dispatch(logout())
      .then(() => {
        if (routes.some(r => r.name === 'playlist')) {
          dispatch(push('/albums'));
        }
      });
  }

  if (user) {
    return (
      <div>
        <a onClick={handleLogout} className="btn btn-block btn-section btn-default ellipsis">
          Sign out
        </a>
        <Playlists />
      </div>
    );
  } else {
    const providers = ['Facebook', 'Google'];
    return (
      <div>
        {providers.map((provider, i) => <AuthButton key={i} provider={provider} />)}
      </div>
    );
  }
};

const AuthButton = ({ provider }) => {
  const lowProvider = provider.toLowerCase();
  return (
    <section className="btn-section">
      <a href={`/auth/${lowProvider}`} className={`btn btn-social btn-${lowProvider} btn-block btn-oauth`}>
        <i className={`fa fa-${lowProvider}`}></i>
        <span>Sign in with {provider}</span>
      </a>
    </section>
  );
};

AuthButton.propTypes = {
  provider: PropTypes.string
};

const Sidebar = ({ routes, user, dispatch }) => {
  return (
    <div id="sidebar">
      <Link to="/"><img src="/pitch.svg" className="logo" /></Link>
      <NavLink to="/albums">
        <section>
        <h4 className="menu-item">
          ALBUMS
        </h4>
        </section>
      </NavLink>
      <NavLink to="/artists">
        <section>
        <h4 className="menu-item">
          ARTISTS
        </h4>
        </section>
      </NavLink>
      <hr />
      {renderPlaylistsOrLogin(user, dispatch, routes)}
    </div>
  );
};

Sidebar.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
  user: PropTypes.object,
  dispatch: PropTypes.func
};

export default Sidebar;
