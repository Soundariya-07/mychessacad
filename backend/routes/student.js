const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const Class = require('../models/Class');
const Booking = require('../models/Booking');

// Get student dashboard data
router.get('/dashboard', authenticateToken, async (req, res) => {
  try {
    // Verify user is a student
    if (req.user.role !== 'student') {
      return res.status(403).json({ error: 'Access denied. Student only.' });
    }

    // Get total sessions
    const totalSessions = await Class.countDocuments({
      students: req.user._id
    });

    // Get upcoming sessions
    const upcomingSessions = await Class.find({
      students: req.user._id,
      status: 'scheduled',
      schedule: {
        $gte: new Date(),
        $lte: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // Next 7 days
      }
    }).countDocuments();

    // Get unread messages (placeholder for now)
    const unreadMessages = 0; // Will be implemented with messaging system

    // Get completed sessions
    const completedSessions = await Class.countDocuments({
      students: req.user._id,
      status: 'completed'
    });

    // Get upcoming sessions with details
    const sessions = await Class.find({
      students: req.user._id,
      status: 'scheduled',
      schedule: {
        $gte: new Date(),
        $lte: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      }
    })
    .populate('coach', 'name')
    .sort({ schedule: 1 })
    .limit(5);

    // Format sessions for frontend
    const formattedSessions = sessions.map(session => ({
      _id: session._id,
      title: session.name,
      coach: session.coach.name,
      date: session.schedule,
      duration: session.duration,
      type: 'regular',
      status: session.status
    }));

    res.json({
      stats: {
        totalSessions,
        upcomingSessions,
        unreadMessages,
        completedSessions
      },
      upcomingSessions: formattedSessions
    });
  } catch (error) {
    console.error('Student dashboard error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router; 