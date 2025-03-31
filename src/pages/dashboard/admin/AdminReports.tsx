import React from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Users, BookOpen, Calendar, DollarSign } from 'lucide-react';

const AdminReports = () => {
  return (
    <DashboardLayout userType="admin">
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Reports & Analytics</h1>
          <p className="text-[#94A3B8]">View system-wide statistics and reports</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-[#1F2937] border-[#374151] p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-500/20 rounded-full">
                <Users className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <p className="text-[#94A3B8] text-sm">Total Users</p>
                <h3 className="text-2xl font-bold text-white">0</h3>
              </div>
            </div>
          </Card>

          <Card className="bg-[#1F2937] border-[#374151] p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-500/20 rounded-full">
                <BookOpen className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <p className="text-[#94A3B8] text-sm">Active Classes</p>
                <h3 className="text-2xl font-bold text-white">0</h3>
              </div>
            </div>
          </Card>

          <Card className="bg-[#1F2937] border-[#374151] p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-yellow-500/20 rounded-full">
                <Calendar className="w-6 h-6 text-yellow-500" />
              </div>
              <div>
                <p className="text-[#94A3B8] text-sm">Upcoming Sessions</p>
                <h3 className="text-2xl font-bold text-white">0</h3>
              </div>
            </div>
          </Card>

          <Card className="bg-[#1F2937] border-[#374151] p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-purple-500/20 rounded-full">
                <DollarSign className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <p className="text-[#94A3B8] text-sm">Monthly Revenue</p>
                <h3 className="text-2xl font-bold text-white">$0</h3>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-[#1F2937] border-[#374151] p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Enrollment Trends</h2>
            <div className="h-64 flex items-center justify-center text-[#94A3B8]">
              Chart will be implemented here
            </div>
          </Card>

          <Card className="bg-[#1F2937] border-[#374151] p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Revenue Overview</h2>
            <div className="h-64 flex items-center justify-center text-[#94A3B8]">
              Chart will be implemented here
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminReports; 