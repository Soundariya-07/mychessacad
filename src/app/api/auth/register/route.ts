import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(req: Request) {
  try {
    console.log('Starting registration process...'); // Debug log
    
    // Connect to database
    console.log('Connecting to database...'); // Debug log
    await connectDB();
    console.log('Database connected successfully'); // Debug log
    
    const body = await req.json();
    const { name, email, password, role } = body;
    console.log('Received registration data for:', email); // Debug log (don't log password)

    // Validate input
    if (!name || !email || !password) {
      console.log('Missing required fields'); // Debug log
      return NextResponse.json(
        { error: 'Please provide all required fields' },
        { status: 400 }
      );
    }

    // Check if user already exists
    console.log('Checking for existing user...'); // Debug log
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('User already exists:', email); // Debug log
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    // Create new user
    console.log('Creating new user...'); // Debug log
    const user = await User.create({
      name,
      email,
      password,
      role: role || 'student'
    });
    console.log('User created successfully'); // Debug log

    // Generate JWT token
    console.log('Generating JWT token...'); // Debug log
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );
    console.log('JWT token generated successfully'); // Debug log

    // Return user data and token
    return NextResponse.json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt
      },
      token
    });

  } catch (error: any) {
    console.error('Registration error details:', error.message); // Detailed error log
    console.error('Full error:', error); // Full error stack
    return NextResponse.json(
      { error: `Registration failed: ${error.message}` },
      { status: 500 }
    );
  }
} 