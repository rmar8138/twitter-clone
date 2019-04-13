import { ADD_TWEET, EDIT_TWEET, DELETE_TWEET } from './types';

export const addTweet = (tweet) => ({
  type: ADD_TWEET,
  payload: tweet,
});

export const editTweet = (editedTweet) => ({
  type: EDIT_TWEET,
  payload: editedTweet,
});

export const deleteTweet = (id) => ({
  type: DELETE_TWEET,
  payload: id,
});
