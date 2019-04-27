import axios from 'axios';
import { getUserTweets } from './tweet';
import { returnErrors, clearErrors } from './error';
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADING,
  USER_LOADED,
  GET_ERRORS,
} from '../actions/types';

export const register = ({ name, username, email, password }) => {
  return (dispatch) => {
    axios
      .post('/api/user', { name, username, email, password })
      .then((res) => {
        dispatch({
          type: REGISTER_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        const { data, status } = err.response;
        dispatch(returnErrors(data, status, 'REGISTER_FAIL'));
        dispatch({
          type: REGISTER_FAIL,
        });
      });
  };
};

export const login = ({ email, password }) => {
  return (dispatch) => {
    axios
      .post('api/auth/login', { email, password })
      .then((res) => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        // send error to error reducer
        const { data, status } = err.response;
        dispatch(returnErrors(data, status, 'LOGIN_FAIL'));

        dispatch({
          type: LOGIN_FAIL,
        });
      });
  };
};

export const logout = () => ({
  type: LOGOUT,
});

export const getUser = () => {
  // get user info through token to persist login session
  return (dispatch) => {
    // user loading
    dispatch({ type: USER_LOADING });

    axios
      .get('/api/auth/user', getToken())
      .then((res) => {
        dispatch({
          type: USER_LOADED,
          payload: res.data.user,
        });
        console.log(res.data.user._id);
        // get user tweets
        dispatch(getUserTweets(res.data.user._id));
      })
      .catch((err) => {
        console.log(err);
        // error handling here!
      });
  };
};

export const getToken = () => {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (token) {
    config.headers['x-auth-token'] = token;
    return config;
  }
};
