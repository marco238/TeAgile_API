var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

const Project = require('../models/project.model');

/* GET projects listing by user's Id. */
router.get('/', function(req, res, next) {
  console.log('get projectssss')
  const id = req.params.id;
  Project.findById(id)(function(err, projects) {
    res.send(projects);
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