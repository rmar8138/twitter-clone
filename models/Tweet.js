const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TweetSchema = new Schema({
  text: {
    type: String,
    maxlength: 280,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  lastUpdatedAt: {
    type: Date,
    default: null,
  },
});

const Tweet = mongoose.model('tweet', TweetSchema);

module.exports = Tweet;
