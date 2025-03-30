import React from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';

const AdminDashboard = () => {
  return (
    <DashboardLayout userType="admin">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Users Card */}
          <div className="bg-[#1F2937] p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-white mb-4">Users</h2>
            <p className="text-[#94A3B8]">Manage coaches and students</p>
          </div>

          {/* Classes Card */}
          <div className="bg-[#1F2937] p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-white mb-4">Classes</h2>
            <p className="text-[#94A3B8]">Monitor and manage all classes</p>
          </div>

          {/* Reports Card */}
          <div className="bg-[#1F2937] p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-white mb-4">Reports</h2>
            <p className="text-[#94A3B8]">View analytics and reports</p>
          </div>

          {/* Settings Card */}
          <div className="bg-[#1F2937] p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-white mb-4">Settings</h2>
            <p className="text-[#94A3B8]">Configure system settings</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard; 