import axios from 'axios';

const API_URL = '/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  register: async (data: { name: string; email: string; password: string; role?: string }) => {
    const response = await api.post('/auth/register', data);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  login: async (data: { email: string; password: string }) => {
    const response = await api.post('/auth/login', data);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
};

// Programs API
export const programsAPI = {
  getAllPrograms: async () => {
    const response = await api.get('/programs');
    return response.data;
  },

  getProgram: async (id: string) => {
    const response = await api.get(`/programs/${id}`);
    return response.data;
  },

  enrollInProgram: async (programId: string) => {
    const response = await api.post(`/programs/${programId}/enroll`);
    return response.data;
  },
};

// Bookings API
export const bookingsAPI = {
  createBooking: async (data: { 
    name: string; 
    email: string; 
    phone: string; 
    preferredDateTime: string;
    timezone: string;
  }) => {
    const response = await api.post('/bookings/demo', data);
    return response.data;
  },
  getMyBookings: async () => {
    const response = await api.get('/bookings/my');
    return response.data;
  }
};

// User API
export const userAPI = {
  getProfile: async () => {
    const response = await api.get('/users/profile');
    return response.data;
  },

  updateProfile: async (data: { name?: string; bio?: string; profilePicture?: string }) => {
    const response = await api.put('/users/profile', data);
    return response.data;
  },
};

export default api; 