import axios from 'axios';
import { GET_USERS, GET_USER_BY_USERNAME } from './types';

export const getUsers = () => {
  return (dispatch) => {
    axios
      .get('/api/user')
      .then((res) => {
        dispatch({
          type: GET_USERS,
          payload: res.data,
        });
      })
      .catch((err) => {
        // err handling
        console.log(err);
      });
  };
};

export const getUserByUsername = (username) => {
  return (dispatch) => {
    axios
      .get(`/api/user/${username}`)
      .then((res) => {
        return dispatch({
          type: GET_USER_BY_USERNAME,
          payload: res.data,
        });
      })
      .catch((err) => {
        // err handling
        console.log(err);
      });
  };
};
