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
import NotFound from '@/pages/NotFound';

// Admin Routes
import AdminUsers from '@/pages/dashboard/admin/AdminUsers';
import AdminClasses from '@/pages/dashboard/admin/AdminClasses';
import AdminReports from '@/pages/dashboard/admin/AdminReports';
import AdminSettings from '@/pages/dashboard/admin/AdminSettings';

// Coach Routes
import CoachDemo from '@/pages/dashboard/coach/CoachDemo';
import CoachSession from '@/pages/dashboard/coach/CoachSession';
import CoachMessages from '@/pages/dashboard/coach/CoachMessages';
import CoachMakeup from '@/pages/dashboard/coach/CoachMakeup';
import CoachCalendar from '@/pages/dashboard/coach/CoachCalendar';

// Student Routes
import StudentSession from '@/pages/dashboard/student/StudentSession';
import StudentMessages from '@/pages/dashboard/student/StudentMessages';
import StudentMakeup from '@/pages/dashboard/student/StudentMakeup';
import StudentCalendar from '@/pages/dashboard/student/StudentCalendar';

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
            
            {/* Admin Routes */}
            <Route path="/dashboard/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
            <Route path="/dashboard/admin/users" element={<ProtectedRoute><AdminUsers /></ProtectedRoute>} />
            <Route path="/dashboard/admin/classes" element={<ProtectedRoute><AdminClasses /></ProtectedRoute>} />
            <Route path="/dashboard/admin/reports" element={<ProtectedRoute><AdminReports /></ProtectedRoute>} />
            <Route path="/dashboard/admin/settings" element={<ProtectedRoute><AdminSettings /></ProtectedRoute>} />
            
            {/* Coach Routes */}
            <Route path="/dashboard/coach" element={<ProtectedRoute><CoachDashboard /></ProtectedRoute>} />
            <Route path="/dashboard/coach/demo" element={<ProtectedRoute><CoachDemo /></ProtectedRoute>} />
            <Route path="/dashboard/coach/session" element={<ProtectedRoute><CoachSession /></ProtectedRoute>} />
            <Route path="/dashboard/coach/messages" element={<ProtectedRoute><CoachMessages /></ProtectedRoute>} />
            <Route path="/dashboard/coach/makeup" element={<ProtectedRoute><CoachMakeup /></ProtectedRoute>} />
            <Route path="/dashboard/coach/calendar" element={<ProtectedRoute><CoachCalendar /></ProtectedRoute>} />
            
            {/* Student Routes */}
            <Route path="/dashboard/student" element={<ProtectedRoute><StudentDashboard /></ProtectedRoute>} />
            <Route path="/dashboard/student/session" element={<ProtectedRoute><StudentSession /></ProtectedRoute>} />
            <Route path="/dashboard/student/messages" element={<ProtectedRoute><StudentMessages /></ProtectedRoute>} />
            <Route path="/dashboard/student/makeup" element={<ProtectedRoute><StudentMakeup /></ProtectedRoute>} />
            <Route path="/dashboard/student/calendar" element={<ProtectedRoute><StudentCalendar /></ProtectedRoute>} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </TooltipProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
