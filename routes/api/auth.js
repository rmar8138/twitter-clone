const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../../models/User');
const router = express.Router();

// POST /auth/login
// Public
// Login user

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Check if all fields have been entered
  if (!email || !password) {
    res.status(400).json({ msg: 'Please fill out all the fields' });
  }

  User.findOne({ email })
    .then((user) => {
      // Check if user exists
      if (!user) {
        return res.status(400).json({ msg: 'Invalid email' });
      }

      // If user exists, check if password is valid
      bcrypt.compare(password, user.password).then((isMatch) => {
        if (isMatch) {
          // Generater and send jwt token with user id
          jwt
            .sign(
              { id: user.id },
              config.get('secret'),
              { expiresIn: '1h' },
              (err, token) => {
                if (err) {
                  return res.status(400).json({ msg: err.message });
                }

                res.json({ user, token });
              },
            )
            .catch((err) => res.status(400).json({ msg: err.message }));
        } else {
          res.status(401).json({ msg: 'Invalid credentials' });
        }
      });
    })
    .catch((err) => res.status(400).json({ msg: err.message }));
});

// POST /auth/user
// Private
// Get user info

router.post('/user', (req, res) => {
  User.findById(req.user)
    .select('-password') // dont include password when sending user object to client
    .then((user) => {
      res.json({ user });
    })
    .catch((err) => res.status(400).json({ msg: err.message }));
});

module.exports = router;
