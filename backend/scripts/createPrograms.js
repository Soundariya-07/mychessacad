const mongoose = require('mongoose');
const Program = require('../models/Program');
require('dotenv').config();

const programs = [
  {
    title: "Beginner Program",
    level: "Beginner",
    description: "Perfect for those who are new to chess. Learn the fundamentals of the game, piece movements, and basic strategies.",
    features: [
      "Basic piece movements",
      "Simple checkmates",
      "Opening principles"
    ],
    duration: "3 months",
    price: 299,
    type: "group",
    classesPerWeek: 2,
    minutesPerClass: 60
  },
  {
    title: "Intermediate 1 Program",
    level: "Intermediate 1",
    description: "Building on fundamentals, this program teaches tactical patterns, planning, and middle game concepts.",
    features: [
      "Basic tactics",
      "Positional concepts",
      "Endgame fundamentals"
    ],
    duration: "4 months",
    price: 399,
    type: "group",
    classesPerWeek: 2,
    minutesPerClass: 90
  },
  {
    title: "Intermediate 2 Program",
    level: "Intermediate 2",
    description: "For improving players, focusing on deeper strategic understanding, complex tactics, and specific openings.",
    features: [
      "Advanced tactics",
      "Opening repertoire",
      "Strategic planning"
    ],
    duration: "4 months",
    price: 499,
    type: "group",
    classesPerWeek: 3,
    minutesPerClass: 90
  },
  {
    title: "Advanced Program",
    level: "Advanced",
    description: "Elite training for serious competitors, covering sophisticated strategies, deep analysis, and tournament preparation.",
    features: [
      "Critical positions",
      "Complex endgames",
      "Tournament preparation"
    ],
    duration: "6 months",
    price: 699,
    type: "group",
    classesPerWeek: 3,
    minutesPerClass: 120
  }
];

const createPrograms = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    for (const program of programs) {
      const existingProgram = await Program.findOne({ title: program.title });
      if (!existingProgram) {
        await Program.create(program);
        console.log(`Created program: ${program.title}`);
      } else {
        console.log(`Program already exists: ${program.title}`);
      }
    }

    console.log('All programs created successfully');
  } catch (error) {
    console.error('Error creating programs:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

createPrograms(); 