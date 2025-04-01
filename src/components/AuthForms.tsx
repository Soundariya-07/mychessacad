import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import api from '@/lib/api';

// Admin credentials
const ADMIN_CREDENTIALS = [
  { email: 'admin@beyondtheboard.com', password: 'imadmin' },
  { email: 'admin2@beyondtheboard.com', password: 'imadmin2' }
];

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface Program {
  _id: string;
  name: string;
  level: string;
  description: string;
}

export const AuthDialog: React.FC<AuthDialogProps> = ({ open, onOpenChange }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'student' | 'coach'>('student');
  const [programId, setProgramId] = useState('');
  const [programs, setPrograms] = useState<Program[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await api.get('/auth/programs');
        setPrograms(response.data);
      } catch (error) {
        console.error('Error fetching programs:', error);
        toast({
          title: 'Error',
          description: 'Failed to load programs. Please try again.',
          variant: 'destructive',
        });
      }
    };

    if (!isLogin) {
      fetchPrograms();
    }
  }, [isLogin, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await login(email, password);
        toast({
          title: 'Success',
          description: 'Logged in successfully!',
        });
      } else {
        if (role === 'student' && !programId) {
          throw new Error('Please select a program');
        }
        await register(name, email, password, role, programId);
        toast({
          title: 'Success',
          description: 'Registered successfully!',
        });
      }
      onOpenChange(false);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Authentication failed';
      setError(errorMessage);
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-[#60A5FA] text-[#60A5FA] hover:bg-[#60A5FA] hover:text-white">
          Login
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#111827] text-white">
        <DialogHeader>
          <DialogTitle>{isLogin ? 'Login' : 'Register'}</DialogTitle>
          <DialogDescription className="text-[#94A3B8]">
            {isLogin ? 'Welcome back! Please login to your account.' : 'Create a new account to get started.'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="bg-[#1F2937] border-[#374151] text-white"
              />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-[#1F2937] border-[#374151] text-white"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-[#1F2937] border-[#374151] text-white"
            />
          </div>
          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value as 'student' | 'coach')}
                className="w-full p-2 rounded bg-[#1F2937] border border-[#374151] text-white"
              >
                <option value="student">Student</option>
                <option value="coach">Coach</option>
              </select>
            </div>
          )}
          {!isLogin && role === 'student' && (
            <div className="space-y-2">
              <Label htmlFor="program">Program</Label>
              <select
                id="program"
                value={programId}
                onChange={(e) => setProgramId(e.target.value)}
                className="w-full p-2 rounded bg-[#1F2937] border border-[#374151] text-white"
                required
              >
                <option value="">Select a program</option>
                {programs.map((program) => (
                  <option key={program._id} value={program._id}>
                    {program.name}
                  </option>
                ))}
              </select>
            </div>
          )}
          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}
          <Button 
            type="submit" 
            className="w-full bg-[#60A5FA] text-white hover:bg-[#3B82F6]"
            disabled={loading}
          >
            {loading ? (isLogin ? 'Logging in...' : 'Registering...') : (isLogin ? 'Login' : 'Register')}
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="w-full text-[#60A5FA] hover:text-white hover:bg-[#60A5FA]"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}; 