'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
var knex = require('../knex');

router.use(cookieParser());

router.get('/events', function(req, res, next){
  var newEvent = req.body;
  knex('events')
  .then(function(data){
    return res.send(data[0]);
  });
});


router.post('/events', function(req,res,next){
  var newEvent = req.body;
  if (req.cookies.token) {
    jwt.verify(req.cookies.token, process.env.JWT_SECRET, function (err,decoded){
      if (err) {
        console.log(err);
      }
      newEvent.organization_id = decoded.organizations_id;
    });
  }
  knex('events')
  .select()
  .where('name', newEvent.name)
  .then(function(data){
    if(data.length > 0){
      res.setHeader('Content-Type', 'text/plain');
      return res.status(400).send('Event already exists');
    }
    knex('events')
    .insert(newEvent, '*' )
    .then(function(data){
      var eventId = data[0].id;
      res.cookie('newEvent', eventId, {httpOnly: true});
      return res.send(data[0]);
    });
  });
});

module.exports = router;
