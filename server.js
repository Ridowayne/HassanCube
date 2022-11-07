const mongoose = require('mongoose');
const express = require('express');
require('dotenv').config({ path: __dirname + '/config.env' });

const app = express();

app.get('/', (req, res) => {
  res.send('welcome to the karpos api');
});

const db = process.env.DB;
mongoose
  .connect(db, {})
  .then(console.log('connected to the database successfully'));

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`app running on port ${port}...🖥️`);
});
