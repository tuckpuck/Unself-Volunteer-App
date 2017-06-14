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

router.get('/event_roles:id', function (req,res,next) {
  var eventId = req.params.id;
  knex.select(
    'events.name',
    'roles.name',
    'roles.description',
    'event_roles.id as event_role_id',
    'event_roles.number_needed',
    knex.raw('count(user_event_roles.event_role_id) as number_volunteers'))
  .from('events')
  .leftJoin('event_roles','events.id','event_roles.event_id')
  .leftJoin('roles','event_roles.role_id','roles.id')
  .leftJoin('user_event_roles', 'event_roles.id', 'user_event_roles.event_role_id')
  .where('event_roles.event_id',eventId)
  .groupByRaw(['events.name',
  'roles.name',
  'roles.description',
  'event_roles.id',
  'event_roles.number_needed'])
  .then(function(data) {
    res.send(data);
  });
});

module.exports = router;
