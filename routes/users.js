'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const jwt = require('jsonwebtoken');
var knex = require('../knex');
const bcrypt = require('bcrypt');

router.post('/users', function(req, res, next) {
  var newUser = req.body;
  var insertedUser = {};
  if (!newUser.email) {
    res.setHeader('Content-Type', 'text/plain');
    return res.status(400).send('Email must not be blank');
  }

  if (!newUser.password || newUser.password.length < 8) {
    res.setHeader('Content-Type', 'text/plain');
    return res.status(400).send('Password must be at least 8 characters long');
  }

  knex('user_auth')
    .select('email')
    .where('email', newUser.email)
    .then(function(data) {
      if (data.length > 0) {
        res.setHeader('Content-Type', 'text/plain');
        return res.status(400).send('Email already exists');
      }

      bcrypt.hash(newUser.password, 10, function(err, hash) {
        if (err) {
          console.error(err);
        }
        newUser.hashed_password = hash;
        delete newUser.password;
        knex.transaction(function(t) {
            return knex('users')
              .transacting(t)
              .insert({
                first_name: newUser.first_name,
                last_name: newUser.last_name,
                email: newUser.email,
                phone: newUser.phone,
                age: newUser.age,
                photo_url: newUser.photo_url
              }).returning('*')
              .then(function(user_data) {
                insertedUser = user_data[0];
                let token = {
                  user_id: insertedUser.id,
                  organization_id: null,
                  email: insertedUser.email
                };
                console.log(token);
                  res.cookie('token1',jwt.sign(token, process.env.JWT_SECRET), { httpOnly: true });
                return knex('user_auth')
                  .transacting(t)
                  .insert({
                    email: insertedUser.email,
                    hashed_password: newUser.hashed_password
                  });
              })
              .then(t.commit)
              .catch(t.rollback);
          })
          .then(function() {
            res.setHeader('Content-Type', 'application/json');
            let stringData = JSON.stringify(insertedUser);
            return res.send(stringData);
          })
          .catch(function(e) {
            return res.sendStatus(500);
          });
      });
    });
});

module.exports = router;
