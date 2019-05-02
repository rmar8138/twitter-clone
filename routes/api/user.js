const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../../models/User');
const router = express.Router();

// GET /api/user
// Public
// Get all users

router.get('/', (req, res) => {
  User.find()
    .select('-password') // dont include password when sending user object to client
    .then((users) => {
      res.json({ users });
    })
    .catch((err) => res.status(400).json({ msg: err.message }));
});

// GET /api/user/:username
// Public
// Get user by username

router.get('/:username', (req, res) => {
  const { username } = req.params;
  User.find({ username })
    .select('-password') // dont include password when sending user object to client
    .then((user) => {
      res.json(...user);
    })
    .catch((err) => res.status(400).json({ msg: err.message }));
});

// POST /api/user
// Public
// Register new user

router.post('/', (req, res) => {
  // Construct new user
  const { name, username, email, password } = req.body;
  const user = { name, username, email, password };

  // Check if all fields have been entered
  if (!name || !username || !email || !password) {
    return res.status(400).json({ msg: 'Please fill out all the fields' });
  }

  // Check if username exists
  User.findOne({ username }).then((userExists) => {
    if (userExists) {
      return res.status(400).json({ msg: 'Username already exists' });
    }
  });

  // Generate salt and hash
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return res.json({ msg: 'Error saving password, please try again' });
    }

    bcrypt.hash(password, salt, (err, hash) => {
      if (err) {
        return res.json({ msg: 'Error saving password, please try again' });
      }

      // Set user password to hash
      user.password = hash;

      // If email not in use, save user to db
      User.findOne({ email }).then((userExists) => {
        if (!userExists) {
          const newUser = new User(user);
          newUser
            .save()
            .then((user) => {
              // Generate auth token and send in response
              jwt.sign(
                { id: user.id },
                config.get('secret'),
                { expiresIn: '1h' },
                (err, token) => {
                  if (err) {
                    return res.status(400).json({ msg: err.message });
                  }

                  res.json({ user, token });
                },
              );
            })
            .catch((err) => res.status(400).json({ msg: err.message }));
        } else {
          return res.status(400).json({ msg: 'Email already in use' });
        }
      });
    });
  });
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
