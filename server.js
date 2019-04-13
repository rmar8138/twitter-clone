const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const tweet = require('./routes/api/tweet');
const user = require('./routes/api/user');
const auth = require('./routes/api/auth');

const app = express();
const port = process.env.PORT || 7000; // use heroku environment port, else use localhost:7000

// Connect to DB
mongoose
  .connect(config.get('db'), { useNewUrlParser: true })
  .then(() => console.log('Connected to DB'))
  .catch((err) => console.log(err.message));

// Body parser
app.use(express.json());

// Routes
app.use('/api/tweet', tweet);
app.use('/api/user', user);
app.use('/api/auth', auth);

app.listen(port, () => console.log(`Server running on port ${port}`));
