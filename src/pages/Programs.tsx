import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { programsAPI } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';
import Navbar from '@/components/Navbar';

interface Program {
  _id: string;
  title: string;
  level: string;
  description: string;
  features: string[];
  duration: string;
  price: number;
  type: 'one-to-one' | 'group';
  classesPerWeek: number;
  minutesPerClass: number;
}

export default function Programs() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState<string | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const data = await programsAPI.getAllPrograms();
        setPrograms(data);
      } catch (error) {
        console.error('Error fetching programs:', error);
        toast({
          title: 'Error',
          description: 'Failed to load programs. Please try again.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPrograms();
  }, [toast]);

  const handleEnroll = async (programId: string) => {
    if (!user) {
      toast({
        title: 'Login Required',
        description: 'Please login to enroll in a program.',
      });
      return;
    }

    setEnrolling(programId);
    try {
      await programsAPI.enrollInProgram(programId);
      toast({
        title: 'Success',
        description: 'Successfully enrolled in the program!',
      });
      navigate('/dashboard');
    } catch (error) {
      console.error('Error enrolling in program:', error);
      toast({
        title: 'Error',
        description: 'Failed to enroll. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setEnrolling(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Our Programs</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Choose from our carefully crafted programs designed for players of all levels.
            Each program is tailored to help you achieve your chess goals.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <Loader2 className="h-8 w-8 animate-spin text-accent" />
          </div>
        ) : !programs.length ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No programs available at the moment. Please check back later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((program) => (
              <Card key={program._id} className="flex flex-col bg-card border-white/10">
                <CardHeader>
                  <CardTitle>{program.title}</CardTitle>
                  <CardDescription>{program.level}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="mb-4 text-muted-foreground">{program.description}</p>
                  <div className="space-y-3">
                    <p><strong>Duration:</strong> {program.duration}</p>
                    <p><strong>Price:</strong> ${program.price}</p>
                    <p><strong>Type:</strong> {program.type}</p>
                    <p><strong>Classes:</strong> {program.classesPerWeek}x per week ({program.minutesPerClass} minutes each)</p>
                    <div className="mt-4">
                      <strong>Features:</strong>
                      <ul className="list-disc list-inside mt-2 space-y-1">
                        {program.features.map((feature, index) => (
                          <li key={index} className="text-muted-foreground">{feature}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-accent text-background hover:bg-accent/90"
                    onClick={() => handleEnroll(program._id)}
                    disabled={enrolling === program._id}
                  >
                    {enrolling === program._id ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Enrolling...
                      </>
                    ) : (
                      'Enroll Now'
                    )}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 