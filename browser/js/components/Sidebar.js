import React from 'react';
import { Link } from 'react-router';
import NavLink from './NavLink';
import Playlists from './Playlists';

const Sidebar = (props) => {
  return (
    <div id="sidebar">
      <Link to="/"><img src="/juke.svg" className="logo" /></Link>
      <h4 className="menu-item"><NavLink to="/albums">ALBUMS</NavLink></h4>
      <h4 className="menu-item"><NavLink to="/artists">ARTISTS</NavLink></h4>
      <hr />
      <Playlists current={ props.playlistId } />
    </div>
  );
};

export default Sidebar;
