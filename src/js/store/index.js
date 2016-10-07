import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../action-reducers';
import logger from 'redux-logger';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import promise from './middleware/promise';

let middleware = [thunk, promise, routerMiddleware(browserHistory)];

if (process.env.NODE_ENV !== 'production') {
  middleware.push(logger());
}

const enhancers = compose(applyMiddleware(...middleware), window.devToolsExtension ? window.devToolsExtension() : f => f);

const store = createStore(rootReducer, { auth: {} }, enhancers);

export default store;

export const { dispatch, getState } = store;
