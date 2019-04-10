const express = require('express');
const mongoose = require('mongoose');
const tweet = require('./routes/api/tweet');

const app = express();
const port = process.env.PORT || 7000; // use heroku environment port, else use localhost:7000

// Connect to DB
const db =
  'mongodb+srv://rmar8138:Punk4123@cluster0-gzhib.mongodb.net/test?retryWrites=true';
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('Connected to DB'))
  .catch((err) => console.log(err.message));

// Body parser
app.use(express.json());

// Routes
app.use('/api/tweet', tweet);

app.listen(port, () => console.log(`Server running on port ${port}`));
