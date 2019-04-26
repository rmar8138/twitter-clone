import axios from 'axios';
import { ADD_TWEET, EDIT_TWEET, DELETE_TWEET, GET_TWEETS } from './types';
import { getToken } from './auth';

export const addTweet = ({ text, user }) => {
  return (dispatch) => {
    axios
      .post('/api/tweet', { text, user }, getToken())
      .then((res) => {
        dispatch({
          type: ADD_TWEET,
          payload: res.data,
        });
      })
      .catch((err) => console.log(err));
  };
};

export const editTweet = (editedTweet) => {
  return (dispatch) => {
    axios
      .patch(`/api/tweet/${editedTweet._id}`, editedTweet)
      .then((res) => {
        dispatch({
          type: EDIT_TWEET,
          payload: res.data.tweet,
        });
      })
      .catch((err) => {
        // dispatch error action
        console.log(err);
      });
  };
};

export const deleteTweet = (id) => {
  return (dispatch) => {
    axios
      .delete(`/api/tweet/${id}`)
      .then((res) => {
        dispatch({
          type: DELETE_TWEET,
          payload: id,
        });
      })
      .catch((err) => {
        // dispatch error action
        console.log(err);
      });
  };
};

export const getTweets = () => {
  return (dispatch) => {
    axios
      .get('/api/tweet')
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: GET_TWEETS,
          payload: res.data.tweets,
        });
      })
      .catch((err) => {
        // dispatch error action
        console.log(err);
      });
  };
};
