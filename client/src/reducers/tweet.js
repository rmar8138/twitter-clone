import uuid from 'uuid';
import { ADD_TWEET, EDIT_TWEET, DELETE_TWEET } from '../actions/types';

const initialState = {
  tweets: [
    {
      tweet: 'Test tweet 1',
      id: uuid(),
    },
    {
      tweet: 'Test tweet 2',
      id: uuid(),
    },
    {
      tweet: 'Test tweet 3',
      id: uuid(),
    },
  ],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TWEET:
      return {
        tweets: [...state.tweets, action.payload],
      };
    case EDIT_TWEET:
      return {
        tweets: state.tweets.map((tweet) => {
          if (tweet.id === action.payload.id) {
            return action.payload;
          } else {
            return tweet;
          }
        }),
      };
    case DELETE_TWEET:
      return {
        tweets: state.tweets.filter((tweet) => {
          return tweet.id !== action.payload;
        }),
      };
    default:
      return state;
  }
};
