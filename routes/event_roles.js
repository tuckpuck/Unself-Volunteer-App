'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const cookieParser = require('cookie-parser');
const knex = require('../knex');

router.use(cookieParser());

router.post('/event_roles', function(req,res,next){
  var newRole = req.body;
  newRole.event_id = req.cookies.newEvent;
  knex('event_roles')
  .insert(newRole, '*' )
  .then(function(data){
    res.setHeader('Content-Type', 'application/json');
    return res.send(data[0]);
  });
});

module.exports = router;
