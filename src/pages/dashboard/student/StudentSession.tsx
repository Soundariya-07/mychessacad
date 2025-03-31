import React from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';

const StudentSession = () => {
  return (
    <DashboardLayout userType="student">
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">My Sessions</h1>
          <p className="text-[#94A3B8]">View and manage your chess sessions</p>
        </div>
        <div className="bg-[#111827]/50 backdrop-blur-sm border border-[#1F2937] rounded-xl p-6">
          <p className="text-[#94A3B8]">Session management will be implemented here.</p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentSession; 