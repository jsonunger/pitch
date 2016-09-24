import React from 'react';
import { Route, IndexRedirect, IndexRoute } from 'react-router';
import App from './containers/App';
import Albums from './containers/AlbumsContainer';
import Album from './containers/AlbumContainer';
import Artists from './containers/ArtistsContainer';
import Artist from './containers/ArtistContainer';
import { ASongs, AAlbums } from './containers/ArtistChildren';
import PlaylistForm from './containers/PlaylistFormContainer';
import Playlist from './containers/PlaylistContainer';

export default (
  <Route path="/" component={App}>
    <IndexRedirect to="/albums" />
    <Route name="albums" path="albums" component={Albums} />
    <Route path="/albums/:albumId" component={Album} />
    <Route name="artists" path="artists">
      <IndexRoute component={Artists} />
      <Route path=":artistId" component={Artist}>
        <IndexRedirect to="/artists/:artistId/albums" />
        <Route path="albums" component={AAlbums} />
        <Route path="songs" component={ASongs} />
      </Route>
    </Route>
    <Route path="playlists/new" component={PlaylistForm} />
    <Route name="playlist" path="playlists/:playlistId" component={Playlist} />
  </Route>
);
