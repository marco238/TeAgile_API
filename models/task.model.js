const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new mongoose.Schema({
  project: {
    type: Schema.Types.ObjectId,
    ref: 'Project'
  },
  name: {
    type: String,
    required: [true, 'Task needs a name']
  },
  description: {
    type: String,
    required: [true, 'Task needs a description']
  },
  priority: {
    type: Number,
    enum: [1, 2, 3, 4, 5, 6],
    default: 6
  }
}, { 
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      ret.id = doc._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;