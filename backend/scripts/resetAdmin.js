require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

async function resetAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/beyond-the-board');
    console.log('Connected to MongoDB');

    // Delete existing admin user if exists
    await User.deleteOne({ email: 'admin@beyondtheboard.com' });
    console.log('Removed existing admin user');

    // Create new admin user with plain password (will be hashed by pre-save hook)
    const adminUser = new User({
      name: 'Admin',
      email: 'admin@beyondtheboard.com',
      password: 'imadmin', // This will be hashed by the pre-save hook
      role: 'admin'
    });

    await adminUser.save();
    console.log('Created new admin user');

    // Verify the password
    const isMatch = await adminUser.comparePassword('imadmin');
    console.log('Password verification:', isMatch);

    if (isMatch) {
      console.log('Admin user created successfully with working password');
    } else {
      console.log('WARNING: Password verification failed');
    }

    await mongoose.connection.close();
    console.log('Done');
  } catch (error) {
    console.error('Error:', error);
  }
}

resetAdmin(); 