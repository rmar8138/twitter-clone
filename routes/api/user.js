const express = require('express');
const User = require('../../models/User');
const router = express.Router();

// GET /api/user
// Public
// Get all users

router.get('/', (req, res) => {
  User.find()
    .then((users) => {
      res.json({ users });
    })
    .catch((err) => res.status(400).json({ msg: err.message }));
});

// POST /api/user
// Public
// Register new user

router.post('/', (req, res) => {
  const { name, email, password } = req.body;

  // Check if all fields have been entered
  if (!name || !email || !password) {
    return res.status(400).json({ msg: 'Please fill out all the fields' });
  }

  const newUser = new User({ name, email, password });
  newUser
    .save()
    .then((user) => {
      res.json({ user });
    })
    .catch((err) => res.status(400).json({ msg: err.message }));
});

// PATCH /api/user
// Private
// Update user info

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  User.findByIdAndUpdate(id, updates, { new: true })
    .then((updatedUser) => {
      // Error handling for invalid id
      if (!updatedUser) {
        return res.status(400).json({ msg: 'User not found' });
      }

      res.json({ user: updatedUser });
    })
    .catch((err) => res.status(400).json({ msg: err.message }));
});

// DELETE /api/user
// Private
// Delete user

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  User.findByIdAndDelete(id)
    .then((deletedUser) => {
      // Error handling for invalid id
      if (!deletedUser) {
        return res.status(400).json({ msg: 'User not found' });
      }

      res.json({ user: deletedUser });
    })
    .catch((err) => res.status(400).json({ msg: err.message }));
});

module.exports = router;
