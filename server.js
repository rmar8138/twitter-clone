const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const tweet = require('./routes/api/tweet');
const user = require('./routes/api/user');
const auth = require('./routes/api/auth');

const app = express();
const port = process.env.PORT || 7000; // use heroku environment port, else use localhost:7000

// Body parser
app.use(express.json());

// Connect to DB
mongoose
  .connect(config.get('db'), {
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => console.log('Connected to DB'))
  .catch((err) => console.log(err.message));

// Routes
app.use('/api/tweet', require('./routes/api/tweet'));
app.use('/api/user', require('./routes/api/user'));
app.use('/api/auth', require('./routes/api/auth'));

app.listen(port, () => console.log(`Server running on port ${port}`));
