import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/beyond-the-board';

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env');
}

console.log('MongoDB URI:', MONGODB_URI); // Debug log

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  try {
    if (cached.conn) {
      console.log('Using existing database connection');
      return cached.conn;
    }

    if (!cached.promise) {
      const opts = {
        bufferCommands: true,
      };

      console.log('Attempting to connect to MongoDB...'); // Debug log
      cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
        console.log('New database connection established successfully');
        return mongoose;
      });
    }

    cached.conn = await cached.promise;
    return cached.conn;
  } catch (e) {
    console.error('MongoDB connection error:', e); // Debug log
    cached.promise = null;
    throw e;
  }
}

export default connectDB; 