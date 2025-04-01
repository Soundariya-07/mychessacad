import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, UserPlus, UserMinus } from 'lucide-react';
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
import { useToast } from '@/components/ui/use-toast';
import api from '@/lib/api';
import { Label } from '@/components/ui/label';

// Define interfaces for our data types
interface Coach {
  _id: string;
  name: string;
  email: string;
  students: string[];
}

interface Student {
  _id: string;
  name: string;
  email: string;
  program: {
    _id: string;
    level: string;
  };
}

interface Program {
  _id: string;
  level: string;
}

const ClassManagement = () => {
  // State management
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCoach, setSelectedCoach] = useState<Coach | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  // Fetch initial data
  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      try {
        await Promise.all([
          fetchCoaches(),
          fetchPrograms(),
          fetchStudents()
        ]);
      } catch (error) {
        console.error('Error fetching initial data:', error);
        toast({
          title: 'Error',
          description: 'Failed to load data',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };
    fetchInitialData();
  }, []);

  // API calls
  const fetchCoaches = async () => {
    try {
      const response = await api.get('/coaches');
      setCoaches(response.data);
    } catch (error) {
      console.error('Error fetching coaches:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch coaches',
        variant: 'destructive',
      });
    }
  };

  const fetchPrograms = async () => {
    try {
      const response = await api.get('/programs');
      console.log('Fetched programs:', response.data); // Debugging log
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

  const fetchStudents = async () => {
    try {
      const response = await api.get('/users');
      const studentsData = response.data.filter((user: any) => user.role === 'student');
      setStudents(studentsData);
    } catch (error) {
      console.error('Error fetching students:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch students',
        variant: 'destructive',
      });
    }
  };

  const handleAssignStudent = async (studentId: string) => {
    if (!selectedCoach) return;

    try {
      await api.post(`/coaches/${selectedCoach._id}/students`, {
        studentId
      });
      
      // Refresh coaches data to get updated student list
      await fetchCoaches();
      
      // Update selected coach
      const updatedCoach = coaches.find(c => c._id === selectedCoach._id);
      if (updatedCoach) {
        setSelectedCoach(updatedCoach);
      }

      toast({
        title: 'Success',
        description: 'Student assigned successfully',
      });
    } catch (error: any) {
      console.error('Error assigning student:', error);
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to assign student',
        variant: 'destructive',
      });
    }
  };

  const handleRemoveStudent = async (studentId: string) => {
    if (!selectedCoach) return;

    try {
      await api.delete(`/coaches/${selectedCoach._id}/students/${studentId}`);
      
      // Refresh coaches data to get updated student list
      await fetchCoaches();
      
      // Update selected coach
      const updatedCoach = coaches.find(c => c._id === selectedCoach._id);
      if (updatedCoach) {
        setSelectedCoach(updatedCoach);
      }

      toast({
        title: 'Success',
        description: 'Student removed successfully',
      });
    } catch (error: any) {
      console.error('Error removing student:', error);
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to remove student',
        variant: 'destructive',
      });
    }
  };

  function fetchStudentsByProgram(programId: string) {
    console.log(`Fetching students for program ID: ${programId}`);
    const filteredStudents = students.filter(
      (student) => student.program._id === programId
    );

    if (filteredStudents.length === 0) {
      toast({
        title: "Info",
        description: "No students found for the selected program.",
        variant: "info",
      });
    }

    setStudents(filteredStudents);
  }

  const handleProgramSelect = (programId: string) => {
    fetchStudentsByProgram(programId);
  };

  const availablePrograms = [
    { "_id": "1", "level": "Beginner" },
    { "_id": "2", "level": "Intermediate" },
    { "_id": "3", "level": "Advanced" },
    { "_id": "4", "level": "Expert" }
  ];

  console.log("Available programs:", availablePrograms);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-[#94A3B8]">Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#94A3B8] w-5 h-5" />
          <Input
            type="text"
            placeholder="Search coaches..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-[#1F2937] border-[#374151] text-white w-64"
          />
        </div>
      </div>

      {/* Coaches List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {coaches.map((coach) => (
          <div
            key={coach._id}
            className={`p-4 rounded-lg cursor-pointer transition-all ${
              selectedCoach?._id === coach._id
                ? 'bg-[#60A5FA] text-white'
                : 'bg-[#1F2937] text-[#94A3B8] hover:bg-[#374151] hover:text-white'
            }`}
            onClick={() => setSelectedCoach(coach)}
          >
            <h3 className="font-medium">{coach.name}</h3>
            <p className="text-sm">{coach.email}</p>
            <p className="text-sm mt-2">
              {coach.students?.length || 0} students assigned
            </p>
          </div>
        ))}
      </div>

      {/* Selected Coach Details */}
      {selectedCoach && (
        <div className="bg-[#1F2937] rounded-lg p-6">
          <h2 className="text-xl font-medium mb-4">{selectedCoach.name}'s Students</h2>
          
          {/* Available Students */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Available Students</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {students
                .filter(student => !selectedCoach.students.includes(student._id))
                .map((student) => (
                  <div
                    key={student._id}
                    className="flex items-center justify-between p-4 bg-[#374151] rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{student.name}</p>
                      <p className="text-sm text-[#94A3B8]">{student.email}</p>
                      <p className="text-sm text-[#94A3B8]">
                        Program: {student.program?.level || 'No Program'}
                      </p>
                    </div>
                    <Button
                      onClick={() => handleAssignStudent(student._id)}
                      className="bg-[#60A5FA] hover:bg-[#3B82F6] text-white"
                    >
                      <UserPlus className="w-4 h-4 mr-2" />
                      Assign
                    </Button>
                  </div>
                ))}
            </div>
          </div>

          {/* Assigned Students */}
          <div>
            <h3 className="text-lg font-medium mb-2">Assigned Students</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {students
                .filter(student => selectedCoach.students.includes(student._id))
                .map((student) => (
                  <div
                    key={student._id}
                    className="flex items-center justify-between p-4 bg-[#374151] rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{student.name}</p>
                      <p className="text-sm text-[#94A3B8]">{student.email}</p>
                      <p className="text-sm text-[#94A3B8]">
                        Program: {student.program?.level || 'No Program'}
                      </p>
                    </div>
                    <Button
                      onClick={() => handleRemoveStudent(student._id)}
                      className="bg-red-500 hover:bg-red-600 text-white"
                    >
                      <UserMinus className="w-4 h-4 mr-2" />
                      Remove
                    </Button>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
      <div>
        <h1>Class Management</h1>
        <Select onValueChange={handleProgramSelect}>
          <SelectTrigger>
            <SelectValue placeholder="Select Program" />
          </SelectTrigger>
          <SelectContent>
            {programs.map((program) => (
              <SelectItem key={program._id} value={program._id}>
                {program.level}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {/* Render students here */}
      </div>
    </div>
  );
};

export default ClassManagement;