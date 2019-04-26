import { combineReducers } from 'redux';
import tweet from './tweet';
import auth from './auth';
import error from './error';

export default combineReducers({ tweet, auth, error });
