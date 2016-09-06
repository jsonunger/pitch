import React from 'react';
import { Route, IndexRedirect } from 'react-router';
import App from './components/App';
import Albums from './components/Albums';
import Album from './components/Album';
import Artists from './components/Artists';
import Artist from './components/Artist';
import ArtistAlbums from './components/ArtistAlbums';
import ArtistSongs from './components/ArtistSongs';
import PlaylistForm from './components/PlaylistForm';
import Playlist from './components/Playlist';

export default (
  <Route path="/" component={App}>
    <IndexRedirect to="/albums" />
    <Route path="albums" component={Albums} />
    <Route name="album" path="/albums/:albumId" component={Album} />
    <Route path="artists" component={Artists} />
    <Route path="artists/:artistId" component={Artist}>
      <IndexRedirect to="/artists/:artistId/albums" />
      <Route path="albums" component={ArtistAlbums} />
      <Route path="songs" component={ArtistSongs} />
    </Route>
    <Route path="playlists/new" component={PlaylistForm} />
    <Route name="playlist" path="playlists/:playlistId" component={Playlist} />
  </Route>
);
