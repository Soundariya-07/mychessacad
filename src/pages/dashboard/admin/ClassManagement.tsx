import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import api from '@/lib/api';
import { ClassManagementDialog } from '@/components/admin/ClassManagementDialog';

interface Program {
  _id: string;
  name: string;
  level: string;
  description?: string;
}

interface Coach {
  _id: string;
  name: string;
  email: string;
}

interface Class {
  _id: string;
  name: string;
  program: Program;
  coach: Coach;
  students: Array<{
    _id: string;
    name: string;
    email: string;
  }>;
  schedule: {
    dayOfWeek: number;
    startTime: string;
    duration: number;
    timezone: string;
  };
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  maxStudents: number;
  description: string;
}

const DAYS_OF_WEEK = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

const ClassManagement = () => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editingClass, setEditingClass] = useState<Class | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchClasses();
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      const response = await api.get('/programs');
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

  const fetchClasses = async () => {
    try {
      const response = await api.get('/classes');
      setClasses(response.data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch classes',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (classId: string, status: string) => {
    try {
      await api.patch(`/classes/${classId}/status`, { status });
      toast({
        title: 'Success',
        description: 'Class status updated successfully',
      });
      fetchClasses();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update class status',
        variant: 'destructive',
      });
    }
  };

  const filteredClasses = classes.filter((cls) =>
    cls.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-[#94A3B8]">Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight text-white">Classes</h2>
          <p className="text-sm text-[#94A3B8]">Manage class schedules and assignments</p>
        </div>
        <Button
          onClick={() => {
            setEditingClass(null);
            setIsDialogOpen(true);
          }}
          className="bg-[#60A5FA] hover:bg-[#3B82F6] text-white"
        >
          Add Class
        </Button>
      </div>

      <div className="space-y-4">
        <Input
          placeholder="Search classes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-[#1F2937] border-[#374151] text-white w-full max-w-sm"
        />

        <div className="rounded-md border border-[#374151]">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#374151]">
                <th className="text-left py-3 px-4 text-[#94A3B8]">Name</th>
                <th className="text-left py-3 px-4 text-[#94A3B8]">Program</th>
                <th className="text-left py-3 px-4 text-[#94A3B8]">Coach</th>
                <th className="text-left py-3 px-4 text-[#94A3B8]">Schedule</th>
                <th className="text-left py-3 px-4 text-[#94A3B8]">Students</th>
                <th className="text-left py-3 px-4 text-[#94A3B8]">Status</th>
                <th className="text-left py-3 px-4 text-[#94A3B8]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredClasses.map((cls) => (
                <tr key={cls._id} className="border-b border-[#374151]">
                  <td className="py-4 px-4 text-white">{cls.name}</td>
                  <td className="py-4 px-4 text-[#94A3B8]">{cls.program?.name || 'N/A'}</td>
                  <td className="py-4 px-4 text-[#94A3B8]">{cls.coach?.name || 'N/A'}</td>
                  <td className="py-4 px-4 text-[#94A3B8]">
                    {DAYS_OF_WEEK[cls.schedule?.dayOfWeek]} at {cls.schedule?.startTime}
                  </td>
                  <td className="py-4 px-4 text-[#94A3B8]">
                    {cls.students?.length || 0} / {cls.maxStudents}
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      cls.status === 'scheduled' ? 'bg-blue-500/20 text-blue-400' :
                      cls.status === 'in-progress' ? 'bg-green-500/20 text-green-400' :
                      cls.status === 'completed' ? 'bg-gray-500/20 text-gray-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {cls.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 space-x-2">
                    <Button
                      onClick={() => {
                        setEditingClass(cls);
                        setIsDialogOpen(true);
                      }}
                      className="text-[#60A5FA] hover:text-[#3B82F6]"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleStatusUpdate(cls._id, 'cancelled')}
                      className="text-red-500 hover:text-red-600"
                    >
                      Cancel
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ClassManagementDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        editingClass={editingClass}
        onClassAdded={fetchClasses}
        onClassUpdated={fetchClasses}
        programs={programs}
      />
    </div>
  );
};

export default ClassManagement; 