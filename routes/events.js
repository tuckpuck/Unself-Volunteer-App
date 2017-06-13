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
    return res.send(data);
  });
});


router.get('/events/org', function(req, res, next){
  var newEvent = req.body;
  var tokenInfo = getTokenInfo(req);
  if (tokenInfo) {
    knex('events')
    .where('organization_id', tokenInfo.organization_id)
    .then(function(data){
      return res.send(data);
    });
  }
});


router.post('/events', function(req,res,next){
  var newEvent = req.body;
  var tokenInfo = getTokenInfo(req);
  if (tokenInfo) {
    newEvent.organization_id = tokenInfo.organization_id;
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
  }
});

function getTokenInfo(req) {
  if (req.cookies.token) {
    jwt.verify(req.cookies.token, process.env.JWT_SECRET, function (err,decoded){
      if (err) {
        console.log(err);
        return;
      }
    return decoded;
    });
  }
}

module.exports = router;
