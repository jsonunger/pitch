import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Button } from 'react-bootstrap';
import NavLink from './NavLink';
import Playlists from '../containers/PlaylistsContainer';
import { logout } from '../action-reducers/auth';

import '../../scss/sidebar';

const renderPlaylistsOrLogin = (user, dispatch) => {
  if (user) {
    return (
      <div>
        <section>
          <Button onClick={() => dispatch(logout())} className="btn-section ellipsis" block>
            Sign out
          </Button>
        </section>
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
      <Button href={`/auth/${lowProvider}`} block bsStyle="social" className={`btn-${lowProvider} btn-oauth`}>
        <i className={`fa fa-${lowProvider}`}></i>
        <span>Sign in with {provider}</span>
      </Button>
    </section>
  );
};

AuthButton.propTypes = {
  provider: PropTypes.string
};

const Sidebar = ({ user, dispatch }) => {
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
      {renderPlaylistsOrLogin(user, dispatch)}
    </div>
  );
};

Sidebar.propTypes = {
  user: PropTypes.object,
  dispatch: PropTypes.func
};

export default Sidebar;
