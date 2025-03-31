import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Users, Calendar, MessageSquare, Clock } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import api from '@/lib/api';

interface DashboardStats {
  totalStudents: number;
  upcomingSessions: number;
  unreadMessages: number;
  pendingMakeups: number;
}

interface RecentActivity {
  _id: string;
  type: 'session' | 'message' | 'makeup';
  title: string;
  description: string;
  date: string;
  status: 'pending' | 'completed' | 'cancelled';
}

const CoachDashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalStudents: 0,
    upcomingSessions: 0,
    unreadMessages: 0,
    pendingMakeups: 0,
  });
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await api.get('/coach/dashboard');
      setStats(response.data.stats);
      setRecentActivities(response.data.recentActivities);
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
    <DashboardLayout userType="coach">
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Coach Dashboard</h1>
          <p className="text-[#94A3B8]">Welcome back! Here's your overview for today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-[#1F2937] border-[#374151] p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-500/20 rounded-full">
                <Users className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <p className="text-[#94A3B8] text-sm">Total Students</p>
                <h3 className="text-2xl font-bold text-white">{stats.totalStudents}</h3>
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
                <p className="text-[#94A3B8] text-sm">Pending Makeups</p>
                <h3 className="text-2xl font-bold text-white">{stats.pendingMakeups}</h3>
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Activities */}
        <div className="bg-[#111827]/50 backdrop-blur-sm border border-[#1F2937] rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Recent Activities</h2>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div
                key={activity._id}
                className="flex items-center justify-between p-4 bg-[#1F2937] rounded-lg border border-[#374151]"
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-full ${
                    activity.type === 'session' ? 'bg-blue-500/20' :
                    activity.type === 'message' ? 'bg-yellow-500/20' :
                    'bg-purple-500/20'
                  }`}>
                    {activity.type === 'session' ? <Calendar className="w-5 h-5 text-blue-500" /> :
                     activity.type === 'message' ? <MessageSquare className="w-5 h-5 text-yellow-500" /> :
                     <Clock className="w-5 h-5 text-purple-500" />}
                  </div>
                  <div>
                    <h3 className="text-white font-medium">{activity.title}</h3>
                    <p className="text-[#94A3B8] text-sm">{activity.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-[#94A3B8] text-sm">
                    {new Date(activity.date).toLocaleDateString()}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    activity.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500' :
                    activity.status === 'completed' ? 'bg-green-500/20 text-green-500' :
                    'bg-red-500/20 text-red-500'
                  }`}>
                    {activity.status}
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

export default CoachDashboard; 