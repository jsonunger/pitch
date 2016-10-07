import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import buildRoutes from './routes';
import store from './store';

const history = syncHistoryWithStore(browserHistory, store);

const Juke = () => (
  <Provider store={store}>
    <Router routes={buildRoutes(store)} history={history} />
  </Provider>
);

render(<Juke />, document.getElementById('react-app'));
