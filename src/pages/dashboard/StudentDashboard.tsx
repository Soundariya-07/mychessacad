import React from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';

const StudentDashboard = () => {
  return (
    <DashboardLayout userType="student">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-white">Welcome to your Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Sessions Card */}
          <div className="bg-[#1F2937] p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-white mb-4">Sessions</h2>
            <p className="text-[#94A3B8]">View your upcoming chess sessions</p>
          </div>

          {/* Messages Card */}
          <div className="bg-[#1F2937] p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-white mb-4">Messages</h2>
            <p className="text-[#94A3B8]">Communicate with your coach</p>
          </div>

          {/* Makeup Classes Card */}
          <div className="bg-[#1F2937] p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-white mb-4">Makeup Classes</h2>
            <p className="text-[#94A3B8]">Request makeup classes</p>
          </div>

          {/* Calendar Card */}
          <div className="bg-[#1F2937] p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-white mb-4">Calendar</h2>
            <p className="text-[#94A3B8]">View your class schedule</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard; 