const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const { authenticateToken } = require('../middleware/auth');

// Create a demo booking
router.post('/demo', async (req, res) => {
  try {
    const { name, email, phone, preferredDateTime, timezone } = req.body;

    const booking = new Booking({
      name,
      email,
      phone,
      preferredDateTime,
      timezone,
      bookingType: 'demo'
    });

    await booking.save();

    res.status(201).json({
      message: 'Demo class booked successfully',
      booking
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ message: 'Error booking demo class' });
  }
});

// Get user's bookings
router.get('/my', authenticateToken, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.userId })
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ message: 'Error fetching bookings' });
  }
});

module.exports = router; 