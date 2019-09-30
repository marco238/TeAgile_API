var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

const Task = require('../models/task.model');

/* GET tasks listing. */
router.get('/tasks', function(req, res, next) {
  Task.find(function(err, tasks) {
    res.send(tasks);
  });
});

module.exports = router;