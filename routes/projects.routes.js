var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

const Project = require('../models/project.model');
const User = require('../models/user.model');

/* GET projects listing by user's Id. */
router.get('/:id', function(req, res, next) {
  const id = req.params.id;
  User.findById(id, function(err, user) {
    res.send(user.projects);
  });
});

/* POST create a project. */
router.post('/', function(req, res, next) {
  const project = new Project(req.body);
  project.save()
    .then(() => {
      res.status(201).json(project);
    })
    .catch(error => {
      console.log(error);
    });
});

module.exports = router;