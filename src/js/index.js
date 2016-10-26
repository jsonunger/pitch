import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import ReactGA from 'react-ga';
import buildRoutes from './routes';
import store from './store';

const history = syncHistoryWithStore(browserHistory, store);
ReactGA.initialize('UA-86348405-2');

function logPageView () {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
}

const Juke = () => (
  <Provider store={store}>
    <Router routes={buildRoutes(store)} history={history} onUpdate={logPageView} />
  </Provider>
);

render(<Juke />, document.getElementById('react-app'));
