import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import api from '@/lib/api';

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
  createdAt: string;
}

interface UserManagementDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user?: User;
  onUserAdded?: () => void;
  onUserUpdated?: () => void;
}

const UserManagementDialog: React.FC<UserManagementDialogProps> = ({
  open,
  onOpenChange,
  user,
  onUserAdded,
  onUserUpdated,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student' as 'student' | 'coach' | 'admin',
    program: '',
  });
  const [loading, setLoading] = useState(false);
  const [programs, setPrograms] = useState<Program[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        password: '',
        role: user.role,
        program: user.program || '',
      });
    } else {
      setFormData({
        name: '',
        email: '',
        password: '',
        role: 'student',
        program: '',
      });
    }
  }, [user]);

  useEffect(() => {
    // Fetch programs when dialog opens
    if (open) {
      fetchPrograms();
    }
  }, [open]);

  const fetchPrograms = async () => {
    try {
      const response = await api.get('/programs');
      console.log('Fetched programs:', response.data);
      setPrograms(response.data);
    } catch (error) {
      console.error('Error fetching programs:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch programs',
        variant: 'destructive',
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create a copy of formData without empty password
      const submitData = { ...formData };
      if (!submitData.password) {
        delete submitData.password;
      }
      
      // Only include program if role is student
      if (submitData.role !== 'student') {
        delete submitData.program;
      }

      console.log('Submitting user data:', submitData);
      console.log('Selected program:', programs.find(p => p._id === submitData.program));

      if (user) {
        // Update existing user
        const response = await api.put(`/users/${user._id}`, submitData);
        console.log('Update response:', response.data);
        toast({
          title: 'Success',
          description: 'User updated successfully',
        });
        onUserUpdated?.();
      } else {
        // Create new user
        const response = await api.post('/users', submitData);
        console.log('Create response:', response.data);
        toast({
          title: 'Success',
          description: 'User created successfully',
        });
        onUserAdded?.();
      }
      onOpenChange(false);
    } catch (error) {
      console.error('User management error:', error);
      toast({
        title: 'Error',
        description: user ? 'Failed to update user' : 'Failed to create user',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-[#111827] text-white">
        <DialogHeader>
          <DialogTitle>{user ? 'Edit User' : 'Add New User'}</DialogTitle>
          <DialogDescription className="text-[#94A3B8]">
            {user ? 'Update user information' : 'Create a new user account'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="bg-[#1F2937] border-[#374151] text-white"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="bg-[#1F2937] border-[#374151] text-white"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required={!user}
              className="bg-[#1F2937] border-[#374151] text-white"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select
              value={formData.role}
              onValueChange={(value: 'student' | 'coach' | 'admin') =>
                setFormData({ ...formData, role: value, program: value === 'student' ? formData.program : '' })
              }
            >
              <SelectTrigger className="bg-[#1F2937] border-[#374151] text-white">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent className="bg-[#1F2937] border-[#374151]">
                <SelectItem value="student">Student</SelectItem>
                <SelectItem value="coach">Coach</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {formData.role === 'student' && (
            <div className="space-y-2">
              <Label htmlFor="program">Program</Label>
              <Select
                value={formData.program}
                onValueChange={(value: string) =>
                  setFormData({ ...formData, program: value })
                }
              >
                <SelectTrigger className="bg-[#1F2937] border-[#374151] text-white">
                  <SelectValue placeholder="Select program" />
                </SelectTrigger>
                <SelectContent className="bg-[#1F2937] border-[#374151]">
                  {programs.map((program) => (
                    <SelectItem key={program._id} value={program._id}>
                      {program.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-[#374151] text-[#94A3B8] hover:bg-[#374151] hover:text-white"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-[#60A5FA] hover:bg-[#3B82F6] text-white"
              disabled={loading}
            >
              {loading ? (user ? 'Updating...' : 'Creating...') : (user ? 'Update' : 'Create')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UserManagementDialog; 