'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const knex = require('../knex');

router.post('/roles', function(req,res,next){
  var newRole = req.body;
  knex('roles')
  .select('id')
  .where('name', newRole.name)
  .andWhere('organization_id', newRole.organization_id)
  .then(function(data){
    if(data.length > 0){
      res.setHeader('Content-Type', 'text/plain');
      return res.status(400).send('Role already exists');
    }
    knex('roles')
    .insert(newRole, '*' )
    .then(function(data){
      res.setHeader('Content-Type', 'application/json');
      return res.send(data[0]);
    });
  });
});


module.exports = router;
