export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  profilePicture?: string;
  bio?: string;
}

export interface Program {
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

export interface Booking {
  _id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  preferredDateTime: string;
  timezone: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface Enrollment {
  _id: string;
  userId: string;
  programId: string;
  status: 'active' | 'completed' | 'cancelled';
  startDate: string;
  endDate?: string;
  createdAt: string;
  updatedAt: string;
} 