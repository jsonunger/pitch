import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import NavLink from './NavLink';
import Playlists from '../containers/PlaylistsContainer';

const Sidebar = ({ routes }) => {
  let routeName;
  routes.forEach(route => {
    if (route.name) {
      routeName = route.name;
    }
  });
  return (
    <div id="sidebar">
      <Link to="/"><img src="/juke.svg" className="logo" /></Link>
      <h4 className={ `menu-item${ routeName === 'albums' ? ' active' : '' }` }><NavLink to="/albums">ALBUMS</NavLink></h4>
      <h4 className={ `menu-item${ routeName === 'artists' ? ' active' : '' }` }><NavLink to="/artists">ARTISTS</NavLink></h4>
      <hr />
      <Playlists routes={ routes } />
    </div>
  );
};

Sidebar.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.object)
};

export default Sidebar;
