var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

const Project = require('../models/project.model');
const User = require('../models/user.model');

/* GET projects listing by user's Id. */
router.get('/:id', function(req, res, next) {
  const id = req.params.id;
  User.findById(id).populate('projects')
    .then(user => {
      console.log('user: ', user);
      res.send(user.projects);
    })
    .catch(err => {
      res.send(err.message, 204, err.errors);
    });
});

/* POST create a project. */
router.post('/', function(req, res, next) {
  const project = new Project(req.body);
  User.findById(req.body.user)
    .then(user => {
      if(user) {
        user.projects.push(project._id);
        User.updateOne({_id: req.body.user}, {projects: user.projects})
          .then(() => {
            project.save()
              .then(() => {
                res.status(201).json(project);
              })
              .catch(error => {
                console.log(error);
              });
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        res.send('User not found in DB', 204);
      }
    })
    .catch(error => {
      console.log(error);
    });
});

module.exports = router;