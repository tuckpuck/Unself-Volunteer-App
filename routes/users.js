'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
var knex = require('../knex');
const bcrypt = require('bcrypt');

router.post('/users', function(req,res,next){
  console.log(req.body);
  var newUser = req.body;

  if (!newUser.email) {
    res.setHeader('Content-Type', 'text/plain');
    return res.status(400).send('Email must not be blank');
  }

  if (!newUser.password || newUser.password.length < 8) {
    res.setHeader('Content-Type', 'text/plain');
    return res.status(400).send('Password must be at least 8 characters long');
  }

  knex('user_auth')
  .select('id')
  .where('email', newUser.email)
  .then(function(data){
    if(data.length > 0){
      res.setHeader('Content-Type', 'text/plain');
      return res.status(400).send('Email already exists');
    }

    bcrypt.hash(newUser.password, 10, function(err, hash) {
      if(err){
        console.log(err);
      }
      newUser.hashed_password = hash;
      delete newUser.password;

      knex.transaction(function(t) {
        return knex('users')
        .transacting(t)
        .insert({first_name: newUser.first_name, last_name: newUser.last_name, email: newUser.email, phone: newUser.phone, age: newUser.age, photo_url: newUser.photo_url}, '*')
        .then(function(user_data) {
          return knex('user_auth')
          .insert({user_id: user_data.user_id, email:user_data.email, hashed_password: newUser.hashed_password});
        })
        .then(t.commit)
        .catch(function(e) {
          t.rollback();
          throw e;
        });
      })
      .then(function(user_data) {
        res.setHeader('Content-Type', 'application/json');
        return res.send(user_data[0]);
      })
      .catch(function(e) {
         return res.sendStatus(500);
      });
    });
  });
});


module.exports = router;
