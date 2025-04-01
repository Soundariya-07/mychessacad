import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import api from '@/lib/api';
import UserManagementDialog from '@/components/admin/UserManagementDialog';

interface Program {
  _id: string;
  name: string;
  level: string;
  description: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
  role: 'student' | 'coach' | 'admin';
  program?: string;
  programDetails?: Program;
  createdAt: string;
}

const AdminUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | undefined>();
  const { toast } = useToast();

  useEffect(() => {
    fetchUsers();
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      const response = await api.get('/programs');
      setPrograms(response.data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch programs',
        variant: 'destructive',
      });
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await api.get('/users');
      const usersWithPrograms = await Promise.all(
        response.data.map(async (user: User) => {
          if (user.role === 'student' && user.program) {
            try {
              const programResponse = await api.get(`/programs/${user.program}`);
              return {
                ...user,
                programDetails: programResponse.data,
              };
            } catch (error) {
              console.error(`Failed to fetch program details for user ${user._id}:`, error);
              return user;
            }
          }
          return user;
        })
      );
      setUsers(usersWithPrograms);
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

  const handleAddUser = () => {
    setSelectedUser(undefined);
    setIsDialogOpen(true);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsDialogOpen(true);
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return;

    try {
      await api.delete(`/users/${userId}`);
      toast({
        title: 'Success',
        description: 'User deleted successfully',
      });
      fetchUsers();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete user',
        variant: 'destructive',
      });
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout userType="admin">
      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">User Management</h1>
            <p className="text-[#94A3B8]">Manage users and their roles</p>
          </div>
          <Button 
            className="bg-[#60A5FA] hover:bg-[#3B82F6] text-white"
            onClick={handleAddUser}
          >
            Add New User
          </Button>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#94A3B8] w-5 h-5" />
          <Input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-[#1F2937] border-[#374151] text-white placeholder-[#94A3B8] w-64"
          />
        </div>

        <div className="bg-[#111827]/50 backdrop-blur-sm border border-[#1F2937] rounded-xl p-6">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#1F2937]">
                <th className="text-left py-3 text-[#94A3B8]">User</th>
                <th className="text-left py-3 text-[#94A3B8]">Role</th>
                <th className="text-left py-3 text-[#94A3B8]">Email</th>
                <th className="text-left py-3 text-[#94A3B8]">Program</th>
                <th className="text-left py-3 text-[#94A3B8]">Last Active</th>
                <th className="text-left py-3 text-[#94A3B8]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user._id} className="border-b border-[#1F2937]">
                  <td className="py-4 text-white">{user.name}</td>
                  <td className="py-4 text-[#94A3B8]">{user.role}</td>
                  <td className="py-4 text-[#94A3B8]">{user.email}</td>
                  <td className="py-4 text-[#94A3B8]">
                    {user.role === 'student' && user.programDetails ? (
                      user.programDetails.name
                    ) : (
                      '-'
                    )}
                  </td>
                  <td className="py-4 text-[#94A3B8]">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-4 space-x-2">
                    <Button 
                      variant="ghost" 
                      className="text-[#60A5FA] hover:text-[#3B82F6]"
                      onClick={() => handleEditUser(user)}
                    >
                      Edit
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="text-red-500 hover:text-red-400"
                      onClick={() => handleDeleteUser(user._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <UserManagementDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          user={selectedUser}
          onUserAdded={fetchUsers}
          onUserUpdated={fetchUsers}
        />
      </div>
    </DashboardLayout>
  );
};

export default AdminUsers; 