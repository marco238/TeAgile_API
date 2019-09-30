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

/* POST create a task inside a project. */
router.post('/', function(req, res, next) {
  const task = new Task(req.body);
  Project.findById(req.body.project)
    .then(project => {
      if(project) {
        project.tasks.push(task._id);
        Project.updateOne({_id: req.body.project}, {tasks: project.tasks})
          .then(() => {
            task.save()
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
        res.send('Project not found in DB', 204);
      }
    })
    .catch(error => {
      console.log(error);
    });
});

module.exports = router;