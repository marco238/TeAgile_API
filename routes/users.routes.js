var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/user.model');

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log('get userrr');
  User.find(function(err, users) {
    res.send(users);
  });
});

/* POST create user. */
router.post('/', function(req, res, next) {
  User.findOne({ email: req.body.email })
  .then(user => {
    if (user) {
        res.send('User already registered', 400);
      } else {
        user = new User(req.body);
        user.save()
          .then(() => {
            res.json(user);
          })
          .catch(error => {
            if (error instanceof mongoose.Error.ValidationError) {
              res.send(error.message, 400, error.errors);
            } else {
              res.send(error);
            }
          });
      }
    }).catch(error => {
      res.send('Error creating user', 500);
    });
});

module.exports = router;
