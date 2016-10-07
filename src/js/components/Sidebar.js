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
        <a onClick={handleLogout} className="btn btn-block">
          Sign out
        </a>
        <Playlists routes={routes} />
      </div>
    );
  } else {
    const providers = ['Facebook'];
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
  let routeName;
  routes.forEach(route => {
    if (route.name) {
      routeName = route.name;
    }
  });
  return (
    <div id="sidebar">
      <Link to="/"><img src="/pitch.svg" className="logo" /></Link>
      <h4 className={ `menu-item${ routeName === 'albums' ? ' active' : '' }` }><NavLink to="/albums">ALBUMS</NavLink></h4>
      <h4 className={ `menu-item${ routeName === 'artists' ? ' active' : '' }` }><NavLink to="/artists">ARTISTS</NavLink></h4>
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
