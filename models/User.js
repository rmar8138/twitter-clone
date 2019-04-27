const mongoose = require('mongoose');
const validator = require('validator');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(username) {
        const regex = RegExp(/^[A-Za-z0-9_-]{3,16}$/);
        return regex.test(username);
      },
      message: (props) =>
        `${
          props.value
        } is not a valid username. Username must be between 3-16 character and can only contain upper or lowercase letters, numbers, dashes and underscores.`,
    },
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    validate: {
      validator: function(email) {
        return validator.isEmail(email);
      },
      message: (props) => `${props.value} is not a valid email address.`,
    },
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
