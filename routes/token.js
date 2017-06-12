'use strict';

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const knex = require('../knex');
const bcrypt = require('bcrypt');

router.get('/token', function (req,res,next) {
  res.setHeader('Content-Type', 'application/json');
  if (req.user) {
    res.send(true);
  }
  else {
    res.send(false);
  }
});

router.post('/token', function (req,res,next) {
  let body = req.body;

  if(!body.email){
    res.setHeader('Content-Type', 'text/plain');
    return res.status(400).send('Email must not be blank');
  }

  if(!body.password){
    res.setHeader('Content-Type', 'text/plain');
    return res.status(400).send('Password must not be blank');
  }

  knex.select()
  .from('user_auth')
  .join('users', 'user_auth.user_id', 'users.user_id')
  .leftJoin('organizations', 'users.organization_id', 'organizations.organization_id')
  .where('email', body.email)
  .then(function(users){
    if(users.length === 0){
      res.setHeader('Content-Type', 'text/plain');
      return res.status(400).send('Bad email or password');
    }
    bcrypt.compare(body.password, users[0].hashed_password, function(err, result) {
      if(result === true){
        var retUser = users[0];
        delete retUser.hashed_password;
        let payload = Object.assign({}, retUser);
        res.cookie('token',jwt.sign(payload, process.env.JWT_SECRET), { httpOnly: true });
        return res.send(retUser);
      }
      else{
        res.setHeader('Content-Type', 'text/plain');
        return res.status(400).send('Bad email or password');
      }
    });
  });
});

router.delete('/token', function (req,res,next) {
  res.setHeader('Content-Type', 'application/json');
  res.cookie('token', '');
  res.sendStatus(200);
});

module.exports = router;
