import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
  useToast,
  Select,
} from '@chakra-ui/react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student',
    programId: '',
  });
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await axios.get('/api/auth/programs');
        setPrograms(response.data);
      } catch (error) {
        console.error('Error fetching programs:', error);
        toast({
          title: 'Error',
          description: 'Failed to load programs',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    };

    fetchPrograms();
  }, [toast]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('/api/auth/register', formData);
      localStorage.setItem('token', response.data.token);
      toast({
        title: 'Registration successful',
        description: 'Welcome to Beyond the Board Academy!',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: 'Registration failed',
        description: error.response?.data?.message || 'An error occurred',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p={8} maxWidth="500px" mx="auto">
      <VStack spacing={4} align="stretch">
        <Heading textAlign="center">Register</Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Role</FormLabel>
              <Select name="role" value={formData.role} onChange={handleChange}>
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
              </Select>
            </FormControl>

            {(formData.role === 'student') && (
              <FormControl isRequired>
                <FormLabel>Program</FormLabel>
                <Select
                  name="programId"
                  value={formData.programId}
                  onChange={handleChange}
                  placeholder="Select a program"
                >
                  {programs.map((program) => (
                    <option key={program._id} value={program._id}>
                      {program.name}
                    </option>
                  ))}
                </Select>
              </FormControl>
            )}

            <Button
              type="submit"
              colorScheme="blue"
              width="full"
              isLoading={loading}
            >
              Register
            </Button>
          </VStack>
        </form>
        <Text textAlign="center">
          Already have an account?{' '}
          <Button variant="link" onClick={() => navigate('/login')}>
            Login here
          </Button>
        </Text>
      </VStack>
    </Box>
  );
};

export default Register; 