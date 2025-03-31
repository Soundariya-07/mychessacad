const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  program: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Program',
    required: true
  },
  coach: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  schedule: {
    dayOfWeek: {
      type: Number, // 0-6 (Sunday-Saturday)
      required: true
    },
    startTime: {
      type: String, // HH:mm format
      required: true
    },
    duration: {
      type: Number, // in minutes
      required: true
    },
    timezone: {
      type: String,
      required: true
    }
  },
  status: {
    type: String,
    enum: ['scheduled', 'in-progress', 'completed', 'cancelled'],
    default: 'scheduled'
  },
  maxStudents: {
    type: Number,
    required: true,
    default: 10
  },
  description: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Class', classSchema); 