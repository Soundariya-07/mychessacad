const express = require('express');
const router = express.Router();
const Enrollment = require('../models/Enrollment');
const { authenticateToken } = require('../middleware/auth');

// Get user's enrollments
router.get('/my-enrollments', authenticateToken, async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ student: req.user.userId })
      .populate('program')
      .sort({ createdAt: -1 });
    res.json(enrollments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching enrollments', error: error.message });
  }
});

// Get all enrollments (admin only)
router.get('/', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const enrollments = await Enrollment.find()
      .populate('student', 'name email')
      .populate('program')
      .sort({ createdAt: -1 });
    res.json(enrollments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching enrollments', error: error.message });
  }
});

// Update enrollment status (admin only)
router.patch('/:id/status', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const { status } = req.body;
    const enrollment = await Enrollment.findById(req.params.id);

    if (!enrollment) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }

    enrollment.status = status;
    await enrollment.save();

    res.json({ message: 'Enrollment status updated successfully', enrollment });
  } catch (error) {
    res.status(500).json({ message: 'Error updating enrollment status', error: error.message });
  }
});

// Update payment status (admin only)
router.patch('/:id/payment', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const { paymentStatus } = req.body;
    const enrollment = await Enrollment.findById(req.params.id);

    if (!enrollment) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }

    enrollment.paymentStatus = paymentStatus;
    await enrollment.save();

    res.json({ message: 'Payment status updated successfully', enrollment });
  } catch (error) {
    res.status(500).json({ message: 'Error updating payment status', error: error.message });
  }
});

module.exports = router; 