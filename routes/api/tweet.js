const express = require('express');
const Tweet = require('../../models/Tweet');
const router = express.Router();

// GET /api/tweet
// Public
// Get users tweets

router.get('/', (req, res) => {
  // Add user id later to only get user tweets
  Tweet.find()
    .then((tweets) => {
      res.json({ tweets });
    })
    .catch((err) => res.status(400).json({ msg: err.message }));
});

// POST /api/tweet
// Private
// Post new tweet under user

router.post('/', (req, res) => {
  const { text } = req.body;

  const newTweet = new Tweet({ text });
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
      if (!updatedTweet) {
        return res.status(400).json({ msg: 'Tweet not found' });
      }

      res.json({
        tweet: deletedTweet,
      });
    })
    .catch((err) => res.status(400).json({ msg: err.message }));
});

module.exports = router;
