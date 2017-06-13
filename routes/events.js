'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
var knex = require('../knex');

router.use(cookieParser());

router.get('/events', function(req, res, next){
  knex('events')
  .then(function(data){
    return res.send(data);
  });
});

router.get('/events/user', function(req, res, next){
  if (req.cookies.token) {
    jwt.verify(req.cookies.token, process.env.JWT_SECRET, function (err,decoded){
      if (err) {
        console.log(err);
        return;
      }
      knex('events')
      .select(
        'event.id',
        'event.name',
        'event.descrition',
        'event.start_date',
        'event.end_date',
        'event.start_time',
        'event.end_time',
        'event.street_address',
        'event.zip_code',
        'event.photo_url',
        'event.event_url')
      .join('event_roles', 'events.id', 'event_roles.event_id')
      .join('user_event_roles', 'event_roles.id', 'user_event_roles.event_role_id')
      .where('user_id', decoded.user_id)
      .then(function(data){
        return res.send(data);
      });
    });
  }
});


router.get('/events/org', function(req, res, next){
  if (req.cookies.token) {
    jwt.verify(req.cookies.token, process.env.JWT_SECRET, function (err,decoded){
      if (err) {
        console.log(err);
        return;
      }
      knex('events')
      .where('organization_id', decoded.organization_id)
      .then(function(data){
        return res.send(data);
      });
    });
  }
});


router.post('/events', function(req,res,next){
  var newEvent = req.body;
  if (req.cookies.token) {
    jwt.verify(req.cookies.token, process.env.JWT_SECRET, function (err,decoded){
      if (err) {
        console.log(err);
        return;
      }
      newEvent.organization_id = decoded.organization_id;
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
  }
});



module.exports = router;
