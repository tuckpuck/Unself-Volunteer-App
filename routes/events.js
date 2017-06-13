'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const cookieParser = require('cookie-parser');
var knex = require('../knex');

router.use(cookieParser());

router.post('/events', function(req,res,next){
  var newEvent = req.body;
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
