import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Calendar, BookOpen, MessageSquare, Clock } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import api from '@/lib/api';

interface DashboardStats {
  totalSessions: number;
  upcomingSessions: number;
  unreadMessages: number;
  completedSessions: number;
}

interface UpcomingSession {
  _id: string;
  title: string;
  coach: string;
  date: string;
  duration: number;
  type: 'regular' | 'makeup' | 'demo';
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
}

const StudentDashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalSessions: 0,
    upcomingSessions: 0,
    unreadMessages: 0,
    completedSessions: 0,
  });
  const [upcomingSessions, setUpcomingSessions] = useState<UpcomingSession[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await api.get('/student/dashboard');
      setStats(response.data.stats);
      setUpcomingSessions(response.data.upcomingSessions);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch dashboard data',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout userType="student">
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Student Dashboard</h1>
          <p className="text-[#94A3B8]">Welcome back! Here's your overview for today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-[#1F2937] border-[#374151] p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-500/20 rounded-full">
                <BookOpen className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <p className="text-[#94A3B8] text-sm">Total Sessions</p>
                <h3 className="text-2xl font-bold text-white">{stats.totalSessions}</h3>
              </div>
            </div>
          </Card>

          <Card className="bg-[#1F2937] border-[#374151] p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-500/20 rounded-full">
                <Calendar className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <p className="text-[#94A3B8] text-sm">Upcoming Sessions</p>
                <h3 className="text-2xl font-bold text-white">{stats.upcomingSessions}</h3>
              </div>
            </div>
          </Card>

          <Card className="bg-[#1F2937] border-[#374151] p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-yellow-500/20 rounded-full">
                <MessageSquare className="w-6 h-6 text-yellow-500" />
              </div>
              <div>
                <p className="text-[#94A3B8] text-sm">Unread Messages</p>
                <h3 className="text-2xl font-bold text-white">{stats.unreadMessages}</h3>
              </div>
            </div>
          </Card>

          <Card className="bg-[#1F2937] border-[#374151] p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-purple-500/20 rounded-full">
                <Clock className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <p className="text-[#94A3B8] text-sm">Completed Sessions</p>
                <h3 className="text-2xl font-bold text-white">{stats.completedSessions}</h3>
              </div>
            </div>
          </Card>
        </div>

        {/* Upcoming Sessions */}
        <div className="bg-[#111827]/50 backdrop-blur-sm border border-[#1F2937] rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Upcoming Sessions</h2>
          <div className="space-y-4">
            {upcomingSessions.map((session) => (
              <div
                key={session._id}
                className="flex items-center justify-between p-4 bg-[#1F2937] rounded-lg border border-[#374151]"
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-full ${
                    session.type === 'regular' ? 'bg-blue-500/20' :
                    session.type === 'makeup' ? 'bg-purple-500/20' :
                    'bg-yellow-500/20'
                  }`}>
                    <Calendar className={`w-5 h-5 ${
                      session.type === 'regular' ? 'text-blue-500' :
                      session.type === 'makeup' ? 'text-purple-500' :
                      'text-yellow-500'
                    }`} />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">{session.title}</h3>
                    <p className="text-[#94A3B8] text-sm">Coach: {session.coach}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-white text-sm">
                      {new Date(session.date).toLocaleDateString()}
                    </p>
                    <p className="text-[#94A3B8] text-sm">
                      {new Date(session.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    session.status === 'scheduled' ? 'bg-green-500/20 text-green-500' :
                    session.status === 'in-progress' ? 'bg-yellow-500/20 text-yellow-500' :
                    session.status === 'completed' ? 'bg-blue-500/20 text-blue-500' :
                    'bg-red-500/20 text-red-500'
                  }`}>
                    {session.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard; 