import React from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';

const CoachDashboard = () => {
  return (
    <DashboardLayout userType="coach">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-white">Welcome to your Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Demo Classes Card */}
          <div className="bg-[#1F2937] p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-white mb-4">Demo Classes</h2>
            <p className="text-[#94A3B8]">Manage your demo class requests and schedule</p>
          </div>

          {/* Sessions Card */}
          <div className="bg-[#1F2937] p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-white mb-4">Sessions</h2>
            <p className="text-[#94A3B8]">View and manage your upcoming sessions</p>
          </div>

          {/* Messages Card */}
          <div className="bg-[#1F2937] p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-white mb-4">Messages</h2>
            <p className="text-[#94A3B8]">Communicate with your students</p>
          </div>

          {/* Makeup Classes Card */}
          <div className="bg-[#1F2937] p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-white mb-4">Makeup Classes</h2>
            <p className="text-[#94A3B8]">Handle makeup class requests</p>
          </div>

          {/* Calendar Card */}
          <div className="bg-[#1F2937] p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-white mb-4">Calendar</h2>
            <p className="text-[#94A3B8]">View your schedule and manage appointments</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CoachDashboard; 