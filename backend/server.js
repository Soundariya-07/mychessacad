const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const programRoutes = require('./routes/programs');
const bookingRoutes = require('./routes/bookings');
const enrollmentRoutes = require('./routes/enrollments');
const classRoutes = require('./routes/classes');
const coachRoutes = require('./routes/coach');
const studentRoutes = require('./routes/student');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB with error handling
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/beyond-the-board')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Add unhandled promise rejection handler
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/programs', programRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/coach', coachRoutes);
app.use('/api/student', studentRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 