const mongoose = require('mongoose');

const programSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  level: {
    type: String,
    required: true,
    enum: ['Beginner', 'Intermediate 1', 'Intermediate 2', 'Advanced']
  },
  description: {
    type: String,
    required: true
  },
  features: [{
    type: String
  }],
  duration: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['one-to-one', 'group']
  },
  classesPerWeek: {
    type: Number,
    required: true
  },
  minutesPerClass: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Program', programSchema); 