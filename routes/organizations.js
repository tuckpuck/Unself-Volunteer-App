'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const jwt = require('jsonwebtoken');
var knex = require('../knex');

router.post('/organizations', function(req,res,next){
  var newOrg = req.body;
  knex('organizations')
  .select('id')
  .where('name', newOrg.name)
  .then(function(data){
    if(data.length > 0){
      res.setHeader('Content-Type', 'text/plain');
      return res.status(400).send('Email already exists');
    }

    bcrypt.hash(newOrg.password, 10, function(err, hash) {
      if (err) {
        console.error(err);
      }
      newOrg.hashed_password = hash;
      delete newOrg.password;
      knex.transaction(function(t) {
          return knex('organizations')
            .transacting(t)
            .insert({
              name: newOrg.name,
              email: newOrg.email,
              phone: newOrg.phone,
              description: newOrg.description,
              web_url: newOrg.web_url,
              photo_url: newOrg.photo_url
            }).returning('*')
            .then(function(org_data) {
              insertedOrg = org_data[0];
              let token = {
                user_id: null,
                organization_id: insertedOrg.id,
                email: insertedOrg.email
              };
                res.cookie('token',jwt.sign(token, process.env.JWT_SECRET), { httpOnly: true });
              return knex('user_auth')
                .transacting(t)
                .insert({
                  email: insertedOrg.email,
                  hashed_password: newOrg.hashed_password
                });
            })
            .then(t.commit)
            .catch(t.rollback);
        })
        .then(function() {
          res.setHeader('Content-Type', 'application/json');
          let stringData = JSON.stringify(insertedOrg);
          return res.send(stringData);
        })
        .catch(function(e) {
          return res.sendStatus(500);
        });
    });
  });
});


module.exports = router;
