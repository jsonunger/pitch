import { get, post } from '../utils/api';
import { clearCurrentList } from './currentList';
import { setCurrentSong } from './currentSong';
import { pauseMusic } from './isPlaying';

const LOAD = 'LOAD';
const LOAD_SUCCESS = 'LOAD_SUCCESS';
const LOAD_FAILURE = 'LOAD_FAILURE';
const LOGIN = 'LOGIN';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILURE = 'LOGIN_FAILURE';
const LOGOUT = 'LOGOUT';
const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
const LOGOUT_FAILURE = 'LOGOUT_FAILURE';
const SIGNUP = 'SIGNUP';
const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

const fetchSession = () => get('/session');

const trySignup = (credentials) => post('/signup', credentials);

const tryLogin = (credentials) => post('/login', credentials);

const tryLogout = () => get('/logout');

export function isLoaded (state) {
  return state.auth && state.auth.loaded;
}

export const load = () => (dispatch, getState) => {
  dispatch({ type: LOAD });
  const { auth: { user } } = getState();

  if (user) {
    return new Promise(resolve => resolve(dispatch({ type: LOAD_SUCCESS, result: { user } })));
  } else {
    return fetchSession()
    .then(
      result => dispatch({ result, type: LOAD_SUCCESS }),
      error => dispatch({ error, type: LOAD_FAILURE })
    )
    .catch(err => dispatch({ error: err.message || 'An error occured', type: LOAD_FAILURE }));
  }
};

export const login = credentials => ({
  types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE],
  promise: tryLogin(credentials)
});

export const signup = credentials => ({
  types: [SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAILURE],
  promise: trySignup(credentials)
});

export const logout = () => (dispatch, getState) => {
  dispatch({ type: LOGOUT });
  return tryLogout()
    .then(() => {
      const { currentList } = getState();
      if (currentList.listType === 'playlist') {
        dispatch(pauseMusic());
        dispatch(clearCurrentList());
        return dispatch(setCurrentSong());
      } else {
        return;
      }
    })
    .then(
      () => dispatch({ type: LOGOUT_SUCCESS }),
      error => dispatch({ error, type: LOGOUT_FAILURE })
    )
    .catch(err => dispatch({ error: err.message || 'An error occured', type: LOGOUT_FAILURE }));
};

export default function reducer (state = { loaded: false }, action) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true,
        loadError: null
      };
    case SIGNUP:
    case LOGIN:
    case LOGOUT:
      return {
        ...state,
        loading: true,
        error: null
      };
    case LOAD_SUCCESS:
    case SIGNUP_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        user: action.result.user
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: false,
        user: null
      };
    case LOAD_FAILURE:
      return {
        ...state,
        loading: false,
        loadError: action.error.response
      };
    case SIGNUP_FAILURE:
    case LOGIN_FAILURE:
    case LOGOUT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error.response
      };
    default:
      return state;
  }
}
