const express = require('express');
const Tweet = require('../../models/Tweet');
const accessAuthRoute = require('../../middleware/auth');
const router = express.Router();

// GET /api/tweet
// Public
// Get all tweets

router.get('/', (req, res) => {
  Tweet.find()
    .then((tweets) => {
      res.json({ tweets });
    })
    .catch((err) => res.status(400).json({ msg: err.message }));
});

// GET /api/tweet/:id
// Public
// Get user tweets

router.get('/:id', (req, res) => {
  const { id } = req.params;

  // Find all tweets by user id
  Tweet.find({
    userId: id,
  })
    .then((tweets) => {
      res.json({ tweets });
    })
    .catch((err) => res.status(400).json({ msg: err.message }));
});

// POST /api/tweet
// Private
// Post new tweet under user

router.post('/', accessAuthRoute, (req, res) => {
  const { text, userName, userEmail, userId } = req.body;

  // Save tweet to db
  const newTweet = new Tweet({ text, userName, userEmail, userId });
  newTweet
    .save()
    .then((tweet) => {
      res.json({ tweet });
    })
    .catch((err) => res.status(400).json({ msg: err.message }));
});

// PATCH /api/tweet
// Private
// Update tweet

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const updatedText = req.body.text;

  Tweet.findByIdAndUpdate(
    id,
    { text: updatedText, lastUpdatedAt: Date.now() },
    { new: true },
  )
    .then((updatedTweet) => {
      // Error handling for invalid id
      if (!updatedTweet) {
        return res.status(400).json({ msg: 'Tweet not found' });
      }

      res.json({
        tweet: updatedTweet,
      });
    })
    .catch((err) => res.status(400).json({ msg: err.message }));
});

// DELETE /api/tweet
// Private
// Delete tweet

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  Tweet.findByIdAndDelete(id)
    .then((deletedTweet) => {
      // Error handling for invalid id
      if (!deletedTweet) {
        return res.status(400).json({ msg: 'Tweet not found' });
      }

      res.json({
        tweet: deletedTweet,
      });
    })
    .catch((err) => res.status(400).json({ msg: err.message }));
});

module.exports = router;
