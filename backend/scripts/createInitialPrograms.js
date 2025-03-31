require('dotenv').config();
const mongoose = require('mongoose');
const Program = require('../models/Program');

async function createInitialPrograms() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/beyond-the-board');
    console.log('Connected to MongoDB');

    const programs = [
      {
        title: 'Beginner Chess Program',
        level: 'Beginner',
        description: 'For students who are new to chess',
        requirements: 'No prior experience needed',
        minutesPerClass: 60,
        classesPerWeek: 2,
        type: 'group',
        price: 99,
        duration: '3 months'
      },
      {
        title: 'Intermediate 1 Chess Program',
        level: 'Intermediate 1',
        description: 'For students with basic chess knowledge',
        requirements: 'Basic understanding of chess rules and strategies',
        minutesPerClass: 90,
        classesPerWeek: 2,
        type: 'group',
        price: 149,
        duration: '3 months'
      },
      {
        title: 'Intermediate 2 Chess Program',
        level: 'Intermediate 2',
        description: 'For students with intermediate chess knowledge',
        requirements: 'Strong understanding of chess strategies and tactics',
        minutesPerClass: 90,
        classesPerWeek: 2,
        type: 'group',
        price: 179,
        duration: '3 months'
      },
      {
        title: 'Advanced Chess Program',
        level: 'Advanced',
        description: 'For experienced chess players',
        requirements: 'Advanced understanding of chess strategies and tactics',
        minutesPerClass: 120,
        classesPerWeek: 3,
        type: 'group',
        price: 199,
        duration: '3 months'
      }
    ];

    for (const program of programs) {
      const existingProgram = await Program.findOne({ level: program.level });
      if (!existingProgram) {
        const newProgram = new Program(program);
        await newProgram.save();
        console.log(`Created ${program.title}`);
      } else {
        console.log(`${program.title} already exists`);
      }
    }

    console.log('Initial programs setup completed');
    await mongoose.connection.close();
  } catch (error) {
    console.error('Error creating initial programs:', error);
  }
}

createInitialPrograms(); 