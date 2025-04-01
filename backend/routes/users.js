const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { authenticateToken } = require('../middleware/auth');
const bcrypt = require('bcryptjs');
const Program = require('../models/Program');

// Get user profile
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile', error: error.message });
  }
});

// Update user profile
router.put('/profile', authenticateToken, async (req, res) => {
  try {
    const { name, bio, profilePicture } = req.body;
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update fields
    if (name) user.name = name;
    if (bio) user.bio = bio;
    if (profilePicture) user.profilePicture = profilePicture;

    await user.save();
    res.json({ message: 'Profile updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile', error: error.message });
  }
});

// Get all users (admin only)
router.get('/', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
});

// Create new user (admin only)
router.post('/', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const { name, email, password, role, program } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // If role is student and program is provided, verify program exists
    if (role === 'student' && program) {
      const programExists = await Program.findById(program);
      if (!programExists) {
        return res.status(400).json({ message: 'Invalid program selected' });
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
      ...(role === 'student' && program ? { program } : {})
    });

    await user.save();

    // Return user without password
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(201).json(userResponse);
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
});

// Update user (admin only)
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const { name, email, role, program } = req.body;
    const userId = req.params.id;

    console.log('Update user request:', {
      userId,
      name,
      email,
      role,
      program
    });

    // Find user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if email is being changed and if it's already taken
    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already in use' });
      }
    }

    // If role is student and program is provided, verify program exists
    if (role === 'student' && program) {
      console.log('Verifying program:', program);
      const programExists = await Program.findById(program);
      console.log('Found program:', programExists);
      if (!programExists) {
        return res.status(400).json({ message: 'Invalid program selected' });
      }
    }

    // Update user fields
    if (name) user.name = name;
    if (email) user.email = email;
    
    // Handle role and program updates
    if (role) {
      user.role = role;
      if (role !== 'student') {
        // Clear program if role is not student
        user.program = undefined;
      } else if (program) {
        // Update program if role is student and program is provided
        user.program = program;
      }
    } else if (user.role === 'student' && program) {
      // Update program for existing student
      user.program = program;
    }

    // Update password if provided
    if (req.body.password) {
      user.password = await bcrypt.hash(req.body.password, 10);
    }

    console.log('Updated user before save:', user);
    await user.save();

    // Return updated user without password
    const userResponse = user.toObject();
    delete userResponse.password;

    console.log('Final user response:', userResponse);
    res.json(userResponse);
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ message: 'Error updating user', error: error.message });
  }
});

// Delete user (admin only)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const userId = req.params.id;

    // Find and delete user
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
});

// Get students by program
router.get('/by-program/:programId', authenticateToken, async (req, res) => {
  try {
    const { programId } = req.params;
    
    // Find all students enrolled in this program
    const students = await User.find({
      role: 'student',
      program: programId
    }).select('-password');

    res.json(students);
  } catch (error) {
    console.error('Error fetching students by program:', error);
    res.status(500).json({ message: 'Error fetching students' });
  }
});

module.exports = router;