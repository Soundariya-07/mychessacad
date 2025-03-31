require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

async function resetAdminPassword() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Find admin user
    const adminUser = await User.findOne({ email: 'admin@beyondtheboard.com' });
    
    if (!adminUser) {
      console.log('Admin user not found. Creating new admin user...');
      const hashedPassword = await bcrypt.hash('imadmin', 10);
      const newAdmin = new User({
        name: 'Admin',
        email: 'admin@beyondtheboard.com',
        password: hashedPassword,
        role: 'admin'
      });
      await newAdmin.save();
      console.log('Admin user created successfully');
    } else {
      console.log('Admin user found. Resetting password...');
      const hashedPassword = await bcrypt.hash('imadmin', 10);
      adminUser.password = hashedPassword;
      await adminUser.save();
      console.log('Admin password reset successfully');
    }

    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

resetAdminPassword(); 