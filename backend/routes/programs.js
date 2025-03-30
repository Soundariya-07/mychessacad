const express = require('express');
const router = express.Router();
const Program = require('../models/Program');
const Enrollment = require('../models/Enrollment');
const { authenticateToken } = require('../middleware/auth');

// Get all programs
router.get('/', async (req, res) => {
  try {
    const programs = await Program.find();
    res.json(programs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching programs', error: error.message });
  }
});

// Get program by ID
router.get('/:id', async (req, res) => {
  try {
    const program = await Program.findById(req.params.id);
    if (!program) {
      return res.status(404).json({ message: 'Program not found' });
    }
    res.json(program);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching program', error: error.message });
  }
});

// Enroll in a program
router.post('/:id/enroll', authenticateToken, async (req, res) => {
  try {
    const program = await Program.findById(req.params.id);
    if (!program) {
      return res.status(404).json({ message: 'Program not found' });
    }

    // Check if already enrolled
    const existingEnrollment = await Enrollment.findOne({
      student: req.user.userId,
      program: program._id,
      status: 'active'
    });

    if (existingEnrollment) {
      return res.status(400).json({ message: 'Already enrolled in this program' });
    }

    const enrollment = new Enrollment({
      student: req.user.userId,
      program: program._id
    });

    await enrollment.save();
    res.status(201).json({ message: 'Successfully enrolled', enrollment });
  } catch (error) {
    res.status(500).json({ message: 'Error enrolling in program', error: error.message });
  }
});

module.exports = router; 