const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Program = require('../models/Program');

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role, programId } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // If registering as a student, verify program exists
    if (role === 'student' || !role) {
      if (!programId) {
        return res.status(400).json({ message: 'Program selection is required for students' });
      }

      const program = await Program.findById(programId);
      if (!program) {
        return res.status(400).json({ message: 'Selected program not found' });
      }
    }

    // Create new user
    const user = new User({
      name,
      email,
      password,
      role: role || 'student',
      ...(role === 'student' || !role ? { program: programId } : {})
    });

    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        program: user.program
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
});

// Get available programs
router.get('/programs', async (req, res) => {
  try {
    const programs = await Program.find();
    res.json(programs);
  } catch (error) {
    console.error('Error fetching programs:', error);
    res.status(500).json({ message: 'Error fetching programs' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt received for:', email);
    console.log('Request body:', req.body);

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found with email:', email);
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    console.log('User found:', { email: user.email, role: user.role });

    // Check password
    console.log('Attempting password comparison...');
    const isMatch = await user.comparePassword(password);
    console.log('Password match result:', isMatch);

    if (!isMatch) {
      console.log('Password does not match for user:', email);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );
    console.log('JWT token generated successfully for user:', email);

    const responseData = {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    };
    console.log('Sending response:', responseData);

    res.json(responseData);
  } catch (error) {
    console.error('Login error details:', error);
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
});

module.exports = router; 