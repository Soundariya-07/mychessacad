import React from 'react';
import { Button } from '@/components/ui/button';
import DashboardLayout from '@/components/layouts/DashboardLayout';

const StudentDashboard = () => {
  return (
    <DashboardLayout userType="student">
      <div className="p-8">
        {/* Progress Overview */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">My Progress</h1>
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-[#111827]/50 backdrop-blur-sm border border-[#1F2937] rounded-xl p-6">
              <h3 className="text-[#94A3B8] mb-2">Total Classes</h3>
              <p className="text-3xl font-bold text-white">24</p>
            </div>
            <div className="bg-[#111827]/50 backdrop-blur-sm border border-[#1F2937] rounded-xl p-6">
              <h3 className="text-[#94A3B8] mb-2">Hours Learned</h3>
              <p className="text-3xl font-bold text-white">36</p>
            </div>
            <div className="bg-[#111827]/50 backdrop-blur-sm border border-[#1F2937] rounded-xl p-6">
              <h3 className="text-[#94A3B8] mb-2">Current Rating</h3>
              <p className="text-3xl font-bold text-white">1200</p>
            </div>
          </div>
        </div>

        {/* Class Schedule */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">Upcoming Classes</h2>
            <Button className="bg-[#60A5FA] hover:bg-[#3B82F6] text-white">
              Schedule New Class
            </Button>
          </div>
          <div className="bg-[#111827]/50 backdrop-blur-sm border border-[#1F2937] rounded-xl p-6">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1F2937]">
                  <th className="text-left py-3 text-[#94A3B8]">Coach</th>
                  <th className="text-left py-3 text-[#94A3B8]">Class Type</th>
                  <th className="text-left py-3 text-[#94A3B8]">Date & Time</th>
                  <th className="text-left py-3 text-[#94A3B8]">Status</th>
                  <th className="text-left py-3 text-[#94A3B8]">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[#1F2937]/50">
                  <td className="py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-[#60A5FA] flex items-center justify-center">
                        <span className="text-white text-sm">MC</span>
                      </div>
                      <span className="text-white">Magnus Carlsen</span>
                    </div>
                  </td>
                  <td className="py-4 text-[#94A3B8]">1:1 Chess Class</td>
                  <td className="py-4 text-[#94A3B8]">Mar 6, 2024 4:30 PM</td>
                  <td className="py-4">
                    <span className="px-3 py-1 rounded-full text-sm bg-yellow-500/10 text-yellow-500">
                      Upcoming
                    </span>
                  </td>
                  <td className="py-4">
                    <div className="flex space-x-2">
                      <Button className="bg-[#1F2937] hover:bg-[#374151] text-white">
                        Reschedule
                      </Button>
                      <Button className="bg-[#60A5FA] hover:bg-[#3B82F6] text-white">
                        Join Class
                      </Button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard; 