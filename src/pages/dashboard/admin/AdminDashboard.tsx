import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import DashboardLayout from '@/components/layouts/DashboardLayout';

const AdminDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <DashboardLayout userType="admin">
      <div className="p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">User Management</h1>
            <p className="text-[#94A3B8]">Manage users, roles, and permissions</p>
          </div>
          <div className="flex space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#94A3B8] w-5 h-5" />
              <Input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-[#1F2937] border-[#374151] text-white placeholder-[#94A3B8] w-64"
              />
            </div>
            <Button className="bg-[#60A5FA] hover:bg-[#3B82F6] text-white">
              Add New User
            </Button>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-[#111827]/50 backdrop-blur-sm border border-[#1F2937] rounded-xl p-6">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#1F2937]">
                <th className="text-left py-3 text-[#94A3B8]">User</th>
                <th className="text-left py-3 text-[#94A3B8]">Role</th>
                <th className="text-left py-3 text-[#94A3B8]">Email</th>
                <th className="text-left py-3 text-[#94A3B8]">Status</th>
                <th className="text-left py-3 text-[#94A3B8]">Last Active</th>
                <th className="text-left py-3 text-[#94A3B8]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Sample row - will be mapped from actual data */}
              <tr className="border-b border-[#1F2937]/50">
                <td className="py-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-[#60A5FA] flex items-center justify-center">
                      <span className="text-white text-sm">JD</span>
                    </div>
                    <span className="text-white">John Doe</span>
                  </div>
                </td>
                <td className="py-4">
                  <span className="px-3 py-1 rounded-full text-sm bg-purple-500/10 text-purple-500">
                    Coach
                  </span>
                </td>
                <td className="py-4 text-[#94A3B8]">john.doe@example.com</td>
                <td className="py-4">
                  <span className="px-3 py-1 rounded-full text-sm bg-green-500/10 text-green-500">
                    Active
                  </span>
                </td>
                <td className="py-4 text-[#94A3B8]">2 hours ago</td>
                <td className="py-4">
                  <div className="flex space-x-2">
                    <Button className="bg-[#1F2937] hover:bg-[#374151] text-white">
                      Edit
                    </Button>
                    <Button className="bg-red-500 hover:bg-red-600 text-white">
                      Suspend
                    </Button>
                  </div>
                </td>
              </tr>
              <tr className="border-b border-[#1F2937]/50">
                <td className="py-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-[#60A5FA] flex items-center justify-center">
                      <span className="text-white text-sm">JS</span>
                    </div>
                    <span className="text-white">Jane Smith</span>
                  </div>
                </td>
                <td className="py-4">
                  <span className="px-3 py-1 rounded-full text-sm bg-blue-500/10 text-blue-500">
                    Student
                  </span>
                </td>
                <td className="py-4 text-[#94A3B8]">jane.smith@example.com</td>
                <td className="py-4">
                  <span className="px-3 py-1 rounded-full text-sm bg-green-500/10 text-green-500">
                    Active
                  </span>
                </td>
                <td className="py-4 text-[#94A3B8]">5 minutes ago</td>
                <td className="py-4">
                  <div className="flex space-x-2">
                    <Button className="bg-[#1F2937] hover:bg-[#374151] text-white">
                      Edit
                    </Button>
                    <Button className="bg-red-500 hover:bg-red-600 text-white">
                      Suspend
                    </Button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-6">
            <p className="text-[#94A3B8]">Showing 1-10 of 50 users</p>
            <div className="flex space-x-2">
              <Button className="bg-[#1F2937] hover:bg-[#374151] text-white">
                Previous
              </Button>
              <Button className="bg-[#60A5FA] hover:bg-[#3B82F6] text-white">
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard; 