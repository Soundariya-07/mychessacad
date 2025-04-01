import React, { Suspense } from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import ClassManagement from '@/components/admin/ClassManagement';

const AdminClasses = () => {
  return (
    <DashboardLayout userType="admin">
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Class Management</h1>
          <p className="text-[#94A3B8]">Manage classes and student enrollments</p>
        </div>
        <Suspense fallback={
          <div className="flex items-center justify-center h-64">
            <div className="text-[#94A3B8]">Loading class management...</div>
          </div>
        }>
          <ErrorBoundary>
            <ClassManagement />
          </ErrorBoundary>
        </Suspense>
      </div>
    </DashboardLayout>
  );
};

// Simple error boundary component
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error('Error in ClassManagement:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-red-500/10 border border-red-500 rounded-lg">
          <h2 className="text-red-500 font-semibold mb-2">Something went wrong</h2>
          <p className="text-[#94A3B8]">There was an error loading the class management interface.</p>
          <button 
            onClick={() => this.setState({ hasError: false })}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default AdminClasses; 