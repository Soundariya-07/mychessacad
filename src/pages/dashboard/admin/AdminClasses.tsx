import React from 'react';
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
        <ClassManagement />
      </div>
    </DashboardLayout>
  );
};

export default AdminClasses; 