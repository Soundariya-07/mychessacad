import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from '@/contexts/AuthContext';
import Index from '@/pages/Index';
import Programs from '@/pages/Programs';
import Dashboard from '@/pages/Dashboard';
import BeginnerCourse from '@/pages/courses/beginner';
import IntermediateCourse from '@/pages/courses/intermediate';
import AdvancedCourse from '@/pages/courses/advanced';
import ProtectedRoute from '@/components/ProtectedRoute';
import Pricing from '@/pages/Pricing';
import Home from '@/pages/Home';
import CoachDashboard from '@/pages/dashboard/CoachDashboard';
import StudentDashboard from '@/pages/dashboard/StudentDashboard';
import AdminDashboard from '@/pages/dashboard/AdminDashboard';

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <TooltipProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/courses/beginner" element={<BeginnerCourse />} />
            <Route path="/courses/intermediate" element={<IntermediateCourse />} />
            <Route path="/courses/advanced" element={<AdvancedCourse />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/dashboard/coach" element={<CoachDashboard />} />
            <Route path="/dashboard/student" element={<StudentDashboard />} />
            <Route path="/dashboard/admin" element={<AdminDashboard />} />
            <Route path="*" element={<div>404 Not Found</div>} />
          </Routes>
          <Toaster />
        </TooltipProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
