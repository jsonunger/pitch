import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import routes from './routes';
import store from './store';

const Juke = () => (
  <Provider store={store}>
    <Router routes={routes} history={browserHistory} />
  </Provider>
);

render(<Juke />, document.getElementById('app'));
