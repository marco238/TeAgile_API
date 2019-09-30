var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

const Project = require('../models/project.model');
const Task = require('../models/task.model');

/* GET tasks listing given a Project Id. */
router.get('/:id', function(req, res, next) {
  const id = req.params.id;
  Project.findById(id).populate('tasks')
    .then(project => {
      res.send(project.tasks);
    })
    .catch(err => {
      res.send(err.message, 204, err.errors);
    });
});

module.exports = router;