import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  MessageSquare, 
  Users, 
  Settings, 
  FileText, 
  LogOut,
  LayoutDashboard
} from 'lucide-react';

interface SidebarItem {
  name: string;
  icon: React.ReactNode;
  path: string;
}

interface DashboardLayoutProps {
  children: React.ReactNode;
  userType: 'coach' | 'student' | 'admin';
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, userType }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const getSidebarItems = (): SidebarItem[] => {
    switch (userType) {
      case 'coach':
        return [
          { name: 'Demo', icon: <Users className="w-5 h-5" />, path: '/dashboard/coach/demo' },
          { name: 'Session', icon: <Calendar className="w-5 h-5" />, path: '/dashboard/coach/session' },
          { name: 'Messages', icon: <MessageSquare className="w-5 h-5" />, path: '/dashboard/coach/messages' },
          { name: 'Makeup Class', icon: <Calendar className="w-5 h-5" />, path: '/dashboard/coach/makeup' },
          { name: 'Calendar', icon: <Calendar className="w-5 h-5" />, path: '/dashboard/coach/calendar' },
        ];
      case 'student':
        return [
          { name: 'Session', icon: <Calendar className="w-5 h-5" />, path: '/dashboard/student/session' },
          { name: 'Messages', icon: <MessageSquare className="w-5 h-5" />, path: '/dashboard/student/messages' },
          { name: 'Makeup Class', icon: <Calendar className="w-5 h-5" />, path: '/dashboard/student/makeup' },
          { name: 'Calendar', icon: <Calendar className="w-5 h-5" />, path: '/dashboard/student/calendar' },
        ];
      case 'admin':
        return [
          { name: 'Users', icon: <Users className="w-5 h-5" />, path: '/dashboard/admin/users' },
          { name: 'Classes', icon: <Calendar className="w-5 h-5" />, path: '/dashboard/admin/classes' },
          { name: 'Reports', icon: <FileText className="w-5 h-5" />, path: '/dashboard/admin/reports' },
          { name: 'Settings', icon: <Settings className="w-5 h-5" />, path: '/dashboard/admin/settings' },
        ];
      default:
        return [];
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#111827] text-white">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 min-h-screen bg-[#1F2937] p-4">
          <div className="mb-8">
            <h1 className="text-xl font-bold text-[#60A5FA]">
              {userType.charAt(0).toUpperCase() + userType.slice(1)} Dashboard
            </h1>
          </div>
          <nav className="space-y-2">
            {getSidebarItems().map((item) => (
              <button
                key={item.name}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  location.pathname === item.path
                    ? 'bg-[#60A5FA] text-white'
                    : 'text-[#94A3B8] hover:bg-[#374151] hover:text-white'
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </button>
            ))}
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-2 px-4 py-2 rounded-lg text-red-400 hover:bg-red-900/20 hover:text-red-300 transition-colors mt-4"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {children}
        </div>
      </div>
    </div>
  );
}; 