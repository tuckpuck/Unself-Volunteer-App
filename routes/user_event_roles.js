'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const knex = require('../knex');

router.post('/user_event_roles', function(req,res,next){
  console.log("in user event roles");
  var newUserEventRole = req.body;
  knex('user_event_roles')
  .insert(newUserEventRole, '*' )
  .then(function(data){
    res.setHeader('Content-Type', 'application/json');
    knex.select(knex.raw('count(event_role_id) as number_volunteers'))
    .from('user_event_roles')
    .where('event_role_id', newUserEventRole.event_role_id)
    .then(function(count){
       return res.send(count[0]);
     });
  });
});

module.exports = router;
