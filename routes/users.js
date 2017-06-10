'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
var knex = require('../knex');

router.post('/users', function(req,res,next){
  console.log(req.body);
  var newUser = req.body;
  knex('users')
  .select('id')
  .where('email', newUser.email)
  .then(function(data){
    if(data.length > 0){
      res.setHeader('Content-Type', 'text/plain');
      return res.status(400).send('Email already exists');
    }
    knex('users')
    .insert(newUser, '*' )
    .then(function(data){
      res.setHeader('Content-Type', 'application/json');
      return res.send(data[0]);
    });
  });
});


module.exports = router;
