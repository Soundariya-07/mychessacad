require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const Program = require('../models/Program');

async function updateStudentPrograms() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/beyond-the-board');
    console.log('Connected to MongoDB');

    // Find beginner program
    const beginnerProgram = await Program.findOne({ level: 'Beginner' });
    if (!beginnerProgram) {
      console.log('Beginner program not found. Creating it...');
      const newProgram = new Program({
        level: 'Beginner',
        description: 'For students who are new to chess',
        requirements: 'No prior experience needed'
      });
      await newProgram.save();
      console.log('Created Beginner program');
      beginnerProgram = newProgram;
    }

    // Update all existing students to be in beginner program
    const result = await User.updateMany(
      { role: 'student', program: { $exists: false } },
      { $set: { program: beginnerProgram._id } }
    );

    console.log(`Updated ${result.modifiedCount} students to Beginner program`);

    await mongoose.connection.close();
    console.log('Done');
  } catch (error) {
    console.error('Error:', error);
  }
}

updateStudentPrograms(); 