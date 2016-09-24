import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../action-reducers';
import loggerMiddleware from './logger';

let middleware = [thunkMiddleware];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(loggerMiddleware);
}

const store = createStore(rootReducer, applyMiddleware(...middleware));

export default store;

export const dispatch = store.dispatch;
