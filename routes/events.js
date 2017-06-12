'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
var knex = require('../knex');

router.post('/events', function(req,res,next){
  var newEvent = req.body;
  console.log(req.body);
  knex('events')
  .select('id')
  .where('name', newEvent.name)
  .then(function(data){
    if(data.length > 0){
      res.setHeader('Content-Type', 'text/plain');
      return res.status(400).send('Email already exists');
    }
    knex('events')
    .insert(newEvent, '*' )
    .then(function(data){
      res.setHeader('Content-Type', 'application/json');
      return res.send(data[0]);
    });
  });
});

module.exports = router;
