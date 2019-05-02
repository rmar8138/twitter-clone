import { combineReducers } from 'redux';
import tweet from './tweet';
import user from './user';
import auth from './auth';
import error from './error';

export default combineReducers({ tweet, user, auth, error });
