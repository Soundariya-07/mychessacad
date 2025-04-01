const mongoose = require('mongoose');
const Program = require('../models/Program');
require('dotenv').config();

const cleanupPrograms = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Delete all existing programs
    await Program.deleteMany({});
    console.log('Deleted all existing programs');

    // Create the correct programs
    const programs = [
      {
        name: 'Beginner',
        level: 'Beginner',
        description: 'Learn the basics of chess, including piece movement, basic tactics, and fundamental strategies.',
        requirements: 'No prior chess experience required.'
      },
      {
        name: 'Intermediate 1',
        level: 'Intermediate',
        description: 'Build upon basic knowledge with advanced tactics, opening principles, and middle game strategies.',
        requirements: 'Basic understanding of chess rules and piece movement.'
      },
      {
        name: 'Intermediate 2',
        level: 'Intermediate',
        description: 'Deepen your understanding of chess strategy, advanced openings, and endgame techniques.',
        requirements: 'Completion of Intermediate 1 or equivalent experience.'
      },
      {
        name: 'Advanced',
        level: 'Advanced',
        description: 'Master complex strategies, advanced tactics, and professional-level techniques.',
        requirements: 'Completion of Intermediate 2 or equivalent experience.'
      }
    ];

    await Program.insertMany(programs);
    console.log('Created new programs:', programs);

    console.log('Program cleanup completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error during program cleanup:', error);
    process.exit(1);
  }
};

cleanupPrograms(); 