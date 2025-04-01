const express = require('express');
const router = express.Router();
const Class = require('../models/Class');
const { authenticateToken } = require('../middleware/auth');

// Get all classes (admin only)
router.get('/', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const classes = await Class.find()
      .populate('program', 'name level description')
      .populate('coach', 'name email')
      .populate('students', 'name email')
      .sort({ createdAt: -1 });

    res.json(classes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching classes', error: error.message });
  }
});

// Create a new class (admin only)
router.post('/', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const {
      name,
      program,
      coach,
      students,
      schedule,
      maxStudents,
      description
    } = req.body;

    const newClass = new Class({
      name,
      program,
      coach,
      students: students || [],
      schedule,
      maxStudents,
      description,
      status: 'scheduled'
    });

    await newClass.save();

    // Populate the new class with referenced data
    const populatedClass = await Class.findById(newClass._id)
      .populate('program', 'name level description')
      .populate('coach', 'name email')
      .populate('students', 'name email');

    res.status(201).json(populatedClass);
  } catch (error) {
    console.error('Error creating class:', error);
    res.status(500).json({ message: 'Error creating class', error: error.message });
  }
});

// Update class status (admin only)
router.patch('/:id/status', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const { status } = req.body;
    const classObj = await Class.findById(req.params.id);

    if (!classObj) {
      return res.status(404).json({ message: 'Class not found' });
    }

    classObj.status = status;
    await classObj.save();

    res.json({ message: 'Class status updated successfully', class: classObj });
  } catch (error) {
    res.status(500).json({ message: 'Error updating class status', error: error.message });
  }
});

// Add student to class (admin only)
router.post('/:id/students', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const { studentId } = req.body;
    const classObj = await Class.findById(req.params.id);

    if (!classObj) {
      return res.status(404).json({ message: 'Class not found' });
    }

    if (classObj.students.length >= classObj.maxStudents) {
      return res.status(400).json({ message: 'Class is full' });
    }

    if (classObj.students.includes(studentId)) {
      return res.status(400).json({ message: 'Student is already enrolled in this class' });
    }

    classObj.students.push(studentId);
    await classObj.save();

    res.json({ message: 'Student added to class successfully', class: classObj });
  } catch (error) {
    res.status(500).json({ message: 'Error adding student to class', error: error.message });
  }
});

// Remove student from class (admin only)
router.delete('/:id/students/:studentId', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const classObj = await Class.findById(req.params.id);

    if (!classObj) {
      return res.status(404).json({ message: 'Class not found' });
    }

    classObj.students = classObj.students.filter(
      studentId => studentId.toString() !== req.params.studentId
    );

    await classObj.save();

    res.json({ message: 'Student removed from class successfully', class: classObj });
  } catch (error) {
    res.status(500).json({ message: 'Error removing student from class', error: error.message });
  }
});

// Update class (admin only)
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const {
      name,
      program,
      coach,
      students,
      schedule,
      maxStudents,
      description,
      status
    } = req.body;

    const classObj = await Class.findById(req.params.id);
    if (!classObj) {
      return res.status(404).json({ message: 'Class not found' });
    }

    // Update fields
    classObj.name = name;
    classObj.program = program;
    classObj.coach = coach;
    classObj.students = students || [];
    classObj.schedule = schedule;
    classObj.maxStudents = maxStudents;
    classObj.description = description;
    if (status) classObj.status = status;

    await classObj.save();

    // Return populated class
    const updatedClass = await Class.findById(classObj._id)
      .populate('program', 'name level description')
      .populate('coach', 'name email')
      .populate('students', 'name email');

    res.json(updatedClass);
  } catch (error) {
    console.error('Error updating class:', error);
    res.status(500).json({ message: 'Error updating class', error: error.message });
  }
});

module.exports = router; 