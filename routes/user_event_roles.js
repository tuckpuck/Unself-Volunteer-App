'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const knex = require('../knex');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

router.use(cookieParser());

router.get('/user_event_roles:id', function(req, res, next){
  var eventId = req.params.id;

  if (req.cookies.token) {
    jwt.verify(req.cookies.token, process.env.JWT_SECRET, function (err,decoded){
      if (err) {
        console.log(err);
        return;
      }
      var userId = decoded.user_id;

      knex
      .select('event_role_id')
      .from('event_roles')
      .join('user_event_roles', 'event_roles.id', 'user_event_roles.event_role_id')
      .where('event_roles.event_id', eventId)
      .andWhere('user_event_roles.user_id', userId)
      .then(function(userData){
        return res.send(userData);
      });
    });
  }
});

router.post('/user_event_roles', function(req,res,next){
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

router.delete('/user_event_roles', function(req, res, next){
  var userId = req.body.user_id;
  var eventRoleId = req.body.event_role_id;

  knex('user_event_roles')
  .where('user_id', userId)
  .andWhere('event_role_id',eventRoleId)
  .del()
  .then(function(){
    return res.sendStatus(200);
  });
});


module.exports = router;
