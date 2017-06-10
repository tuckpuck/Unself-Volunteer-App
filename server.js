const express = require('express');
const app = express();
const bodyParser = require('body-parser');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

app.use(bodyParser.json());
const path = require('path');
app.use(express.static('public'));

const users = require('./routes/users');
const organizations = require('./routes/organizations');
app.use(users);
app.use(organizations);

app.use((_req, res) => {
  res.sendStatus(404);
});

app.listen(3000);
