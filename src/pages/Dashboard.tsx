import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-24">
        <h1 className="text-3xl font-bold mb-6">Welcome, {user?.name}!</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-card p-6 rounded-lg border border-white/10">
            <h2 className="text-xl font-semibold mb-4">My Programs</h2>
            <p className="text-muted-foreground">View your enrolled programs and track your progress.</p>
          </div>
          <div className="bg-card p-6 rounded-lg border border-white/10">
            <h2 className="text-xl font-semibold mb-4">Upcoming Classes</h2>
            <p className="text-muted-foreground">Check your scheduled classes and manage bookings.</p>
          </div>
          <div className="bg-card p-6 rounded-lg border border-white/10">
            <h2 className="text-xl font-semibold mb-4">My Profile</h2>
            <p className="text-muted-foreground">Update your profile information and preferences.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard; 