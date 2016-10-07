import React from 'react';
import { Route, IndexRedirect, IndexRoute } from 'react-router';
import { App, Album, Albums, Artist, Artists, Playlist, PlaylistForm, ArtistSongs, ArtistAlbums } from './containers';
import { NotFound } from './components';
import { isLoaded as isAuthLoaded, load as loadAuth } from './action-reducers/auth';

export default function buildRoutes (store) {
  const getAuth = (nextState, replace, next) => {
    if (!isAuthLoaded(nextState)) {
      store.dispatch(loadAuth())
        .then(() => next());
    } else {
      return next();
    }
  };

  const requireUser = (nextState, replace, next) => {
    const checkAuth = () => {
      const { auth } = store.getState();
      if (!auth.user) {
        replace('/albums');
      }
      next();
    };

    if (!isAuthLoaded(store.getState())) {
      store.dispatch(loadAuth()).then(checkAuth);
    } else {
      checkAuth();
    }
  };

  return (
    <Route path="/" onEnter={getAuth} component={App}>

      { /* Home redirect */ }
      <IndexRedirect to="/albums" />

      { /* Authenticated Routes */ }
      <Route onEnter={requireUser} >
        <Route path="playlists/new" component={PlaylistForm} />
        <Route name="playlist" path="playlists/:playlistId" component={Playlist} />
      </Route>

      { /* Routes */ }
      <Route name="albums" path="albums" component={Albums} />
      <Route path="/albums/:albumId" component={Album} />
      <Route name="artists" path="artists">
        <IndexRoute component={Artists} />
        <Route path=":artistId" component={Artist}>
          <IndexRedirect to="/artists/:artistId/albums" />
          <Route path="albums" component={ArtistAlbums} />
          <Route path="songs" component={ArtistSongs} />
        </Route>
      </Route>

      { /* Catch all route */ }
      <Route path="*" component={NotFound} />

    </Route>
  );
}
