import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADING,
  USER_LOADED,
} from '../actions/types';

const initialState = {
  user: {
    id: null,
    name: null,
    username: null,
    email: null,
  },
  token: null,
  isAuthenticated: false,
  userLoading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      // set token to local storage here
      localStorage.setItem('token', action.payload.token);
      return {
        user: {
          ...action.payload.user,
        },
        token: action.payload.token,
        isAuthenticated: true,
        userLoading: false,
      };
    case LOGIN_FAIL:
    case REGISTER_FAIL:
    case LOGOUT:
      // clear token from local storage here
      localStorage.removeItem('token');
      return {
        user: {
          id: null,
          name: null,
          username: null,
          email: null,
        },
        token: null,
        isAuthenticated: false,
        userLoading: false,
      };
    case USER_LOADING:
      return {
        userLoading: true,
      };
    case USER_LOADED:
      return {
        user: {
          ...action.payload,
        },
        isAuthenticated: true,
        userLoading: false,
      };
    default:
      return state;
  }
};
