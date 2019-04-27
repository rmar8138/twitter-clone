import {
  ADD_TWEET,
  EDIT_TWEET,
  DELETE_TWEET,
  GET_TWEETS,
} from '../actions/types';

const initialState = {
  tweets: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TWEET:
      return {
        tweets: [...state.tweets, action.payload.tweet],
      };
    case EDIT_TWEET:
      return {
        tweets: state.tweets.map((tweet) => {
          if (tweet._id === action.payload._id) {
            return action.payload;
          } else {
            return tweet;
          }
        }),
      };
    case DELETE_TWEET:
      return {
        tweets: state.tweets.filter((tweet) => {
          return tweet._id !== action.payload;
        }),
      };
    case GET_TWEETS:
      return {
        tweets: action.payload,
      };
    default:
      return state;
  }
};
