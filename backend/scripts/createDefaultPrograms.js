require('dotenv').config();
const mongoose = require('mongoose');
const Program = require('../models/Program');

async function createDefaultPrograms() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/beyond-the-board');
    console.log('Connected to MongoDB');

    const defaultPrograms = [
      {
        name: 'Beginner Chess Program',
        level: 'Beginner',
        description: 'Perfect for those new to chess. Learn the basics of chess strategy and tactics.',
        requirements: 'No prior experience needed'
      },
      {
        name: 'Intermediate Chess Program',
        level: 'Intermediate',
        description: 'Enhance your chess skills with advanced strategies and complex tactics.',
        requirements: 'Basic understanding of chess principles'
      },
      {
        name: 'Advanced Chess Program',
        level: 'Advanced',
        description: 'Master advanced chess concepts and compete at a higher level.',
        requirements: 'Strong foundation in chess strategy and tactics'
      }
    ];

    for (const program of defaultPrograms) {
      const existingProgram = await Program.findOne({ name: program.name });
      if (!existingProgram) {
        await Program.create(program);
        console.log(`Created program: ${program.name}`);
      } else {
        console.log(`Program already exists: ${program.name}`);
      }
    }

    console.log('Default programs setup completed');
    await mongoose.connection.close();
  } catch (error) {
    console.error('Error creating default programs:', error);
  }
}

createDefaultPrograms(); 