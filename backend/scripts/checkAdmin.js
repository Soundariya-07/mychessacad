require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

async function checkAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/beyond-the-board');
    console.log('Connected to MongoDB');

    const adminUser = await User.findOne({ email: 'admin@beyondtheboard.com' });
    
    if (!adminUser) {
      console.log('Admin user not found');
      return;
    }

    console.log('Admin user found:');
    console.log('Email:', adminUser.email);
    console.log('Role:', adminUser.role);
    console.log('Password hash length:', adminUser.password.length);

    // Test password comparison
    const testPassword = 'imadmin';
    const isMatch = await adminUser.comparePassword(testPassword);
    console.log('Password test result:', isMatch);

    await mongoose.connection.close();
  } catch (error) {
    console.error('Error:', error);
  }
}

checkAdmin(); 