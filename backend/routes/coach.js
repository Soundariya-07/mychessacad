const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const User = require('../models/User');
const Class = require('../models/Class');
const Booking = require('../models/Booking');

// Get coach dashboard data
router.get('/dashboard', authenticateToken, async (req, res) => {
  try {
    // Verify user is a coach
    if (req.user.role !== 'coach') {
      return res.status(403).json({ error: 'Access denied. Coach only.' });
    }

    // Get total students
    const totalStudents = await User.countDocuments({ role: 'student' });

    // Get upcoming sessions
    const upcomingSessions = await Class.find({
      coach: req.user._id,
      status: 'scheduled',
      schedule: {
        $gte: new Date(),
        $lte: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // Next 7 days
      }
    }).countDocuments();

    // Get unread messages (placeholder for now)
    const unreadMessages = 0; // Will be implemented with messaging system

    // Get pending makeup requests
    const pendingMakeups = await Booking.find({
      coach: req.user._id,
      type: 'makeup',
      status: 'pending'
    }).countDocuments();

    // Get recent activities
    const recentActivities = await Promise.all([
      // Recent sessions
      ...(await Class.find({
        coach: req.user._id,
        schedule: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
      })
      .sort({ schedule: -1 })
      .limit(3)
      .map(session => ({
        _id: session._id,
        type: 'session',
        title: session.name,
        description: `Regular session with ${session.students.length} students`,
        date: session.schedule,
        status: session.status
      }))),

      // Recent messages (placeholder for now)
      {
        _id: 'msg1',
        type: 'message',
        title: 'New Message from Parent',
        description: 'Question about upcoming tournament',
        date: new Date(),
        status: 'pending'
      },

      // Recent makeup requests
      ...(await Booking.find({
        coach: req.user._id,
        type: 'makeup',
        status: 'pending'
      })
      .sort({ createdAt: -1 })
      .limit(3)
      .map(booking => ({
        _id: booking._id,
        type: 'makeup',
        title: 'Makeup Session Request',
        description: `Student: ${booking.student.name}`,
        date: booking.createdAt,
        status: booking.status
      })))
    ]);

    // Sort all activities by date
    recentActivities.sort((a, b) => new Date(b.date) - new Date(a.date));

    res.json({
      stats: {
        totalStudents,
        upcomingSessions,
        unreadMessages,
        pendingMakeups
      },
      recentActivities: recentActivities.slice(0, 5) // Get only the 5 most recent activities
    });
  } catch (error) {
    console.error('Coach dashboard error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router; 