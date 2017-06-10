const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.static('public'));

const users = require('./routes/users');
const organizations = require('./routes/organizations');
app.use(users);
app.use(organizations);

app.use((_req, res) => {
  res.sendStatus(404);
});

app.listen(3000);
