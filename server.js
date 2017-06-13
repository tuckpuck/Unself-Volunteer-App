const express = require('express');
const app = express();
const bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(express.static('public'));

const users = require('./routes/users');
const organizations = require('./routes/organizations');
const roles = require('./routes/roles');
const eventRoles = require('./routes/event_roles');
const events = require('./routes/events');

app.use(users);
app.use(organizations);
app.use(roles);
app.use(eventRoles);
app.use(events);

app.use((_req, res) => {
  res.sendStatus(404);
});

const port = process.env.PORT || 3000;

app.listen(port);
