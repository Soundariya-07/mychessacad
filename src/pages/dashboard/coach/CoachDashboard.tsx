import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import DashboardLayout from '@/components/layouts/DashboardLayout';

const CoachDashboard = () => {
  const [activeTab, setActiveTab] = useState('completed');

  return (
    <DashboardLayout userType="coach">
      <div className="p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Sessions</h1>
            <p className="text-[#94A3B8]">Manage your upcoming and completed sessions</p>
          </div>
          <div className="flex space-x-4">
            <Button
              onClick={() => setActiveTab('completed')}
              className={`px-6 py-2 rounded-lg transition-all duration-200 ${
                activeTab === 'completed'
                  ? 'bg-[#60A5FA] text-white'
                  : 'bg-[#1F2937] text-[#94A3B8] hover:text-white'
              }`}
            >
              Completed
            </Button>
            <Button
              onClick={() => setActiveTab('upcoming')}
              className={`px-6 py-2 rounded-lg transition-all duration-200 ${
                activeTab === 'upcoming'
                  ? 'bg-[#60A5FA] text-white'
                  : 'bg-[#1F2937] text-[#94A3B8] hover:text-white'
              }`}
            >
              Upcoming
            </Button>
          </div>
        </div>

        {/* Google Calendar Integration */}
        <div className="mb-8">
          <Button className="bg-white text-gray-800 hover:bg-gray-100 flex items-center space-x-2">
            <img src="/google-calendar-icon.png" alt="Google Calendar" className="w-5 h-5" />
            <span>Add to Google Calendar</span>
          </Button>
        </div>

        {/* Sessions Table */}
        <div className="bg-[#111827]/50 backdrop-blur-sm border border-[#1F2937] rounded-xl p-6">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#1F2937]">
                <th className="text-left py-3 text-[#94A3B8]">Student Name</th>
                <th className="text-left py-3 text-[#94A3B8]">Class Type</th>
                <th className="text-left py-3 text-[#94A3B8]">Date & Time</th>
                <th className="text-left py-3 text-[#94A3B8]">Status</th>
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
                <td className="py-4 text-[#94A3B8]">1:1 Chess Class</td>
                <td className="py-4 text-[#94A3B8]">Mar 5, 2024 6:30 AM</td>
                <td className="py-4">
                  <span className="px-3 py-1 rounded-full text-sm bg-green-500/10 text-green-500">
                    Completed
                  </span>
                </td>
                <td className="py-4">
                  <div className="flex space-x-2">
                    <Button className="bg-[#1F2937] hover:bg-[#374151] text-white">
                      Add Notes
                    </Button>
                    <Button className="bg-[#60A5FA] hover:bg-[#3B82F6] text-white">
                      Start Session
                    </Button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CoachDashboard; 