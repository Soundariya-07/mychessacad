import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { MultiSelect } from '@/components/ui/multi-select';
import { useToast } from '@/components/ui/use-toast';
import api from '@/lib/api';
import { Label } from '@/components/ui/label';

interface Program {
  _id: string;
  level: string;
  description?: string;
  // Add any other properties that might be in your Program model
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

const TIMEZONES = [
  { value: 'Asia/Kolkata', label: 'IST (UTC+5:30)' },
  { value: 'America/Los_Angeles', label: 'PST (UTC-8)' },
  { value: 'America/New_York', label: 'EST (UTC-5)' }
];

const PROGRAMS = [
  { id: 'beginner', title: 'Beginner' },
  { id: 'intermediate', title: 'Intermediate' },
  { id: 'advanced', title: 'Advanced' }
];

const ClassManagement = () => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [dbPrograms, setDbPrograms] = useState<Program[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editingClass, setEditingClass] = useState<Class | null>(null);
  const { toast } = useToast();

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    program: '',
    coach: '',
    students: [] as string[],
    schedule: {
      dayOfWeek: 0,
      startTime: '',
      duration: 60,
      timezone: TIMEZONES[0].value
    },
    maxStudents: 10,
    description: ''
  });

  // Add portal container ref
  const portalContainerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchClasses();
    fetchCoaches();
    fetchPrograms();
  }, []);

  // Fetch students when program changes
  useEffect(() => {
    if (formData.program) {
      fetchStudentsByProgram(formData.program);
    }
  }, [formData.program]);

  // Reset form when dialog closes
  useEffect(() => {
    if (!isDialogOpen) {
      setFormData({
        name: '',
        program: '',
        coach: '',
        students: [],
        schedule: {
          dayOfWeek: 0,
          startTime: '',
          duration: 60,
          timezone: TIMEZONES[0].value
        },
        maxStudents: 10,
        description: ''
      });
      setEditingClass(null);
    }
  }, [isDialogOpen]);

  const fetchPrograms = async () => {
    try {
      const response = await api.get('/programs');
      setDbPrograms(response.data);
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

  const fetchCoaches = async () => {
    try {
      const response = await api.get('/users');
      setCoaches(response.data.filter((user: any) => user.role === 'coach'));
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch coaches',
        variant: 'destructive',
      });
    }
  };

  const fetchStudentsByProgram = async (programLevel: string) => {
    try {
      // Convert program ID (beginner, intermediate, advanced) to proper level name
      const level = PROGRAMS.find(p => p.id === programLevel)?.title;
      if (!level) {
        throw new Error('Invalid program level');
      }

      // Fetch students enrolled in the specific program level
      const response = await api.get(`/users/by-program/${level}`);
      const students = response.data.filter((user: any) => user.role === 'student');
      setStudents(students);
    } catch (error) {
      console.error('Error fetching students:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch students',
        variant: 'destructive',
      });
      // Set empty array to prevent undefined errors
      setStudents([]);
    }
  };

  // Update the program selection button click handler
  const handleProgramSelect = (programId: string) => {
    setFormData({ 
      ...formData, 
      program: programId,
      students: [] // Reset selected students when program changes
    });
    fetchStudentsByProgram(programId);
  };

  const handleEdit = (classObj: Class) => {
    setEditingClass(classObj);
    // Find the program ID from PROGRAMS array
    const programId = PROGRAMS.find(p => 
      p.title.toLowerCase() === classObj.program.level.toLowerCase()
    )?.id || '';

    setFormData({
      name: classObj.name,
      program: programId,
      coach: classObj.coach._id,
      students: classObj.students.map(s => s._id),
      schedule: {
        dayOfWeek: classObj.schedule.dayOfWeek,
        startTime: classObj.schedule.startTime,
        duration: classObj.schedule.duration,
        timezone: classObj.schedule.timezone
      },
      maxStudents: classObj.maxStudents,
      description: classObj.description
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Find the actual program ID from the database
      const selectedProgram = dbPrograms.find(p => p.level.toLowerCase() === formData.program);
      
      if (!selectedProgram) {
        throw new Error('Selected program not found');
      }

      const programData = {
        name: formData.name,
        program: selectedProgram._id,
        coach: formData.coach,
        students: formData.students,
        schedule: {
          dayOfWeek: parseInt(formData.schedule.dayOfWeek.toString()),
          startTime: formData.schedule.startTime,
          duration: parseInt(formData.schedule.duration.toString()),
          timezone: formData.schedule.timezone
        },
        maxStudents: parseInt(formData.maxStudents.toString()),
        description: formData.description,
        status: editingClass ? editingClass.status : 'scheduled'
      };

      let response;
      if (editingClass) {
        response = await api.put(`/classes/${editingClass._id}`, programData);
        toast({
          title: 'Success',
          description: 'Class updated successfully',
        });
      } else {
        response = await api.post('/classes', programData);
        toast({
          title: 'Success',
          description: 'Class created successfully',
        });
      }

      setIsDialogOpen(false);
      fetchClasses();
    } catch (error: any) {
      console.error('Error saving class:', error.response?.data || error);
      toast({
        title: 'Error',
        description: error.response?.data?.message || `Failed to ${editingClass ? 'update' : 'create'} class`,
        variant: 'destructive',
      });
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

  return (
    <div className="space-y-4">
      {/* Add portal container */}
      <div ref={portalContainerRef} className="relative z-50" />
      
      <div className="flex justify-between items-center">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#94A3B8] w-5 h-5" />
          <Input
            type="text"
            placeholder="Search classes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-[#1F2937] border-[#374151] text-white placeholder-[#94A3B8] w-64"
          />
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#60A5FA] hover:bg-[#3B82F6] text-white">
              <Plus className="w-4 h-4 mr-2" />
              {editingClass ? 'Edit Class' : 'Add New Class'}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] bg-[#111827] text-white max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingClass ? 'Edit Class' : 'Add New Class'}</DialogTitle>
              <DialogDescription className="text-[#94A3B8]">
                {editingClass ? 'Update class details' : 'Create a new class and assign a coach'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="className">Class Name</Label>
                <Input
                  id="className"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="bg-[#1F2937] border-[#374151] text-white w-full"
                />
              </div>

              <div>
                <Label>Select Program</Label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {PROGRAMS.map((program) => (
                    <button
                      key={program.id}
                      type="button"
                      onClick={() => handleProgramSelect(program.id)}
                      className={`px-4 py-3 rounded-lg transition-all text-base font-medium ${
                        formData.program === program.id
                          ? 'bg-[#60A5FA] text-white'
                          : 'bg-[#1F2937] text-[#94A3B8] hover:bg-[#374151] hover:text-white'
                      }`}
                    >
                      {program.title}
                    </button>
                  ))}
                </div>
              </div>

              {formData.program && students.length > 0 && (
                <div>
                  <Label htmlFor="studentsSelect">Select Students ({students.length} available)</Label>
                  <MultiSelect
                    id="studentsSelect"
                    value={formData.students}
                    onChange={(value) => setFormData({ ...formData, students: value })}
                    options={students.map(student => ({
                      value: student._id,
                      label: student.name
                    }))}
                    className="bg-[#1F2937] border-[#374151] text-white w-full"
                    placeholder="Select students"
                  />
                </div>
              )}

              {formData.program && students.length === 0 && (
                <div className="text-[#94A3B8] text-sm">
                  No students found for this program level.
                </div>
              )}

              <div>
                <Label htmlFor="coachSelect">Coach</Label>
                <Select
                  value={formData.coach}
                  onValueChange={(value) => setFormData({ ...formData, coach: value })}
                >
                  <SelectTrigger id="coachSelect" className="bg-[#1F2937] border-[#374151] text-white w-full">
                    <SelectValue placeholder="Select coach" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1F2937] border-[#374151]">
                    {coaches.map((coach) => (
                      <SelectItem key={coach._id} value={coach._id}>
                        {coach.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Schedule</Label>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div>
                    <Label htmlFor="daySelect">Day</Label>
                    <Select
                      value={formData.schedule.dayOfWeek.toString()}
                      onValueChange={(value) =>
                        setFormData({
                          ...formData,
                          schedule: { ...formData.schedule, dayOfWeek: parseInt(value) }
                        })
                      }
                    >
                      <SelectTrigger id="daySelect" className="bg-[#1F2937] border-[#374151] text-white">
                        <SelectValue placeholder="Select day" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1F2937] border-[#374151]">
                        {DAYS_OF_WEEK.map((day, index) => (
                          <SelectItem key={index} value={index.toString()}>
                            {day}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="startTime">Time</Label>
                    <Input
                      id="startTime"
                      type="time"
                      value={formData.schedule.startTime}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          schedule: { ...formData.schedule, startTime: e.target.value }
                        })
                      }
                      required
                      className="bg-[#1F2937] border-[#374151] text-white"
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label>Duration</Label>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div>
                    <Label htmlFor="duration">Length (minutes)</Label>
                    <Input
                      id="duration"
                      type="number"
                      value={formData.schedule.duration}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          schedule: { ...formData.schedule, duration: parseInt(e.target.value) }
                        })
                      }
                      required
                      className="bg-[#1F2937] border-[#374151] text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="timezoneSelect">Timezone</Label>
                    <Select
                      value={formData.schedule.timezone}
                      onValueChange={(value) =>
                        setFormData({
                          ...formData,
                          schedule: { ...formData.schedule, timezone: value }
                        })
                      }
                    >
                      <SelectTrigger id="timezoneSelect" className="bg-[#1F2937] border-[#374151] text-white">
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1F2937] border-[#374151]">
                        {TIMEZONES.map((tz) => (
                          <SelectItem key={tz.value} value={tz.value}>
                            {tz.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="maxStudents">Max Students</Label>
                <Input
                  id="maxStudents"
                  type="number"
                  value={formData.maxStudents}
                  onChange={(e) =>
                    setFormData({ ...formData, maxStudents: parseInt(e.target.value) })
                  }
                  required
                  className="bg-[#1F2937] border-[#374151] text-white"
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-2 rounded bg-[#1F2937] border border-[#374151] text-white min-h-[100px]"
                  required
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  className="border-[#374151] text-[#94A3B8] hover:bg-[#374151] hover:text-white"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-[#60A5FA] hover:bg-[#3B82F6] text-white"
                  disabled={loading}
                >
                  {loading ? 'Saving...' : 'Save Class'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-[#111827]/50 backdrop-blur-sm border border-[#1F2937] rounded-xl p-6">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#1F2937]">
              <th className="text-left py-3 text-[#94A3B8]">Class Name</th>
              <th className="text-left py-3 text-[#94A3B8]">Program</th>
              <th className="text-left py-3 text-[#94A3B8]">Coach</th>
              <th className="text-left py-3 text-[#94A3B8]">Students</th>
              <th className="text-left py-3 text-[#94A3B8]">Schedule</th>
              <th className="text-left py-3 text-[#94A3B8]">Status</th>
              <th className="text-left py-3 text-[#94A3B8]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((classObj) => (
              <tr key={classObj._id} className="border-b border-[#1F2937]">
                <td className="py-4 text-white">{classObj.name}</td>
                <td className="py-4 text-[#94A3B8]">{classObj.program.level}</td>
                <td className="py-4 text-[#94A3B8]">{classObj.coach.name}</td>
                <td className="py-4 text-[#94A3B8]">
                  <span className={`${
                    classObj.students.length >= classObj.maxStudents ? 'text-red-500' : 'text-green-500'
                  }`}>
                    {classObj.students.length}/{classObj.maxStudents}
                  </span>
                </td>
                <td className="py-4 text-[#94A3B8]">
                  {DAYS_OF_WEEK[classObj.schedule.dayOfWeek]} at {classObj.schedule.startTime}
                </td>
                <td className="py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      classObj.status === 'scheduled'
                        ? 'bg-blue-500/20 text-blue-500'
                        : classObj.status === 'in-progress'
                        ? 'bg-green-500/20 text-green-500'
                        : classObj.status === 'completed'
                        ? 'bg-gray-500/20 text-gray-500'
                        : 'bg-red-500/20 text-red-500'
                    }`}
                  >
                    {classObj.status}
                  </span>
                </td>
                <td className="py-4">
                  <div className="flex items-center space-x-2">
                    <Select
                      value={classObj.status}
                      onValueChange={(value) => handleStatusUpdate(classObj._id, value)}
                    >
                      <SelectTrigger className="bg-[#1F2937] border-[#374151] text-white w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1F2937] border-[#374151]">
                        <SelectItem value="scheduled">Scheduled</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      onClick={() => handleEdit(classObj)}
                      variant="outline"
                      className="border-[#374151] text-[#94A3B8] hover:bg-[#374151] hover:text-white"
                    >
                      Edit
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClassManagement; 