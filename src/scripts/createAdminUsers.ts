import connectDB from '@/lib/db';
import User from '@/models/User';

const createAdminUsers = async () => {
  try {
    await connectDB();
    console.log('Connected to database');

    const adminUsers = [
      {
        name: 'BTB-Admin',
        email: 'admin@beyondtheboard.com',
        password: 'imadmin',
        role: 'admin'
      },
      {
        name: 'Admin 2',
        email: 'admin2@beyondtheboard.com',
        password: 'imadmin2',
        role: 'admin'
      }
    ];

    for (const admin of adminUsers) {
      const existingAdmin = await User.findOne({ email: admin.email });
      if (!existingAdmin) {
        await User.create(admin);
        console.log(`Created admin user: ${admin.email}`);
      } else {
        console.log(`Admin user already exists: ${admin.email}`);
      }
    }

    console.log('Admin user creation completed');
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin users:', error);
    process.exit(1);
  }
};

createAdminUsers(); 