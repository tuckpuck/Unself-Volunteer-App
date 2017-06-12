'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const knex = require('../knex');

router.post('/event_roles', function(req,res,next){
  console.log("here");
  var newRole = req.body;
  // knex('event_roles')
  // .select('role_id')
  // .where('role_id', newRole.role_id)
  // .then(function(data){
  //   if(data.length > 0){
  //     res.setHeader('Content-Type', 'text/plain');
  //     return res.status(400).send('Role already exists');
  //   }
    knex('event_roles')
    .insert(newRole, '*' )
    .then(function(data){
      res.setHeader('Content-Type', 'application/json');
      return res.send(data[0]);
    });
  // });
});

module.exports = router;
