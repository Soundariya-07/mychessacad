import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Users, BookOpen, Calendar, Settings } from 'lucide-react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import api from '@/lib/api';
import ClassManagement from '@/components/admin/ClassManagement';

interface User {
  _id: string;
  name: string;
  email: string;
  role: 'student' | 'coach' | 'admin';
  createdAt: string;
}

interface Enrollment {
  _id: string;
  student: {
    _id: string;
    name: string;
    email: string;
  };
  program: {
    _id: string;
    title: string;
  };
  status: 'pending' | 'active' | 'completed' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed';
  createdAt: string;
}

const AdminDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchUsers();
    fetchEnrollments();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get('/users');
      setUsers(response.data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch users',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchEnrollments = async () => {
    try {
      const response = await api.get('/enrollments');
      setEnrollments(response.data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch enrollments',
        variant: 'destructive',
      });
    }
  };

  const handleUpdateEnrollmentStatus = async (enrollmentId: string, status: string) => {
    try {
      await api.patch(`/enrollments/${enrollmentId}/status`, { status });
      fetchEnrollments();
      toast({
        title: 'Success',
        description: 'Enrollment status updated successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update enrollment status',
        variant: 'destructive',
      });
    }
  };

  return (
    <DashboardLayout userType="admin">
      <div className="p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-[#94A3B8]">Manage users, classes, and enrollments</p>
          </div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="bg-[#1F2937] border border-[#374151]">
            <TabsTrigger value="users" className="data-[state=active]:bg-[#60A5FA]">
              <Users className="w-4 h-4 mr-2" />
              Users
            </TabsTrigger>
            <TabsTrigger value="classes" className="data-[state=active]:bg-[#60A5FA]">
              <BookOpen className="w-4 h-4 mr-2" />
              Classes
            </TabsTrigger>
            <TabsTrigger value="enrollments" className="data-[state=active]:bg-[#60A5FA]">
              <Calendar className="w-4 h-4 mr-2" />
              Enrollments
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-[#60A5FA]">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-4">
            <div className="flex justify-between items-center">
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
                  {users.map((user) => (
                    <tr key={user._id} className="border-b border-[#1F2937]">
                      <td className="py-4 text-white">{user.name}</td>
                      <td className="py-4 text-[#94A3B8]">{user.role}</td>
                      <td className="py-4 text-[#94A3B8]">{user.email}</td>
                      <td className="py-4 text-[#94A3B8]">Active</td>
                      <td className="py-4 text-[#94A3B8]">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-4">
                        <Button variant="ghost" className="text-[#60A5FA] hover:text-[#3B82F6]">
                          Edit
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          {/* Classes Tab */}
          <TabsContent value="classes">
            <ClassManagement />
          </TabsContent>

          {/* Enrollments Tab */}
          <TabsContent value="enrollments" className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#94A3B8] w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search enrollments..."
                  className="pl-10 bg-[#1F2937] border-[#374151] text-white placeholder-[#94A3B8] w-64"
                />
              </div>
            </div>

            <div className="bg-[#111827]/50 backdrop-blur-sm border border-[#1F2937] rounded-xl p-6">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#1F2937]">
                    <th className="text-left py-3 text-[#94A3B8]">Student</th>
                    <th className="text-left py-3 text-[#94A3B8]">Program</th>
                    <th className="text-left py-3 text-[#94A3B8]">Status</th>
                    <th className="text-left py-3 text-[#94A3B8]">Payment</th>
                    <th className="text-left py-3 text-[#94A3B8]">Enrolled On</th>
                    <th className="text-left py-3 text-[#94A3B8]">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {enrollments.map((enrollment) => (
                    <tr key={enrollment._id} className="border-b border-[#1F2937]">
                      <td className="py-4 text-white">{enrollment.student.name}</td>
                      <td className="py-4 text-[#94A3B8]">{enrollment.program.title}</td>
                      <td className="py-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          enrollment.status === 'active' ? 'bg-green-500/20 text-green-500' :
                          enrollment.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500' :
                          enrollment.status === 'completed' ? 'bg-blue-500/20 text-blue-500' :
                          'bg-red-500/20 text-red-500'
                        }`}>
                          {enrollment.status}
                        </span>
                      </td>
                      <td className="py-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          enrollment.paymentStatus === 'paid' ? 'bg-green-500/20 text-green-500' :
                          enrollment.paymentStatus === 'pending' ? 'bg-yellow-500/20 text-yellow-500' :
                          'bg-red-500/20 text-red-500'
                        }`}>
                          {enrollment.paymentStatus}
                        </span>
                      </td>
                      <td className="py-4 text-[#94A3B8]">
                        {new Date(enrollment.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-4">
                        <Button
                          variant="ghost"
                          className="text-[#60A5FA] hover:text-[#3B82F6]"
                          onClick={() => handleUpdateEnrollmentStatus(enrollment._id, 'active')}
                        >
                          Update Status
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-4">
            <div className="bg-[#111827]/50 backdrop-blur-sm border border-[#1F2937] rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-4">System Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#94A3B8] mb-2">
                    Site Name
                  </label>
                  <Input
                    type="text"
                    defaultValue="Beyond The Board"
                    className="bg-[#1F2937] border-[#374151] text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#94A3B8] mb-2">
                    Contact Email
                  </label>
                  <Input
                    type="email"
                    defaultValue="contact@beyondtheboard.com"
                    className="bg-[#1F2937] border-[#374151] text-white"
                  />
                </div>
                <Button className="bg-[#60A5FA] hover:bg-[#3B82F6] text-white">
                  Save Changes
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard; 