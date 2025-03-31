import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

const AdminSettings = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    siteName: 'Beyond The Board',
    contactEmail: 'contact@beyondtheboard.com',
    maxStudentsPerClass: 10,
    defaultClassDuration: 60,
    timezone: 'Asia/Kolkata',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // TODO: Implement settings update API call
      toast({
        title: 'Success',
        description: 'Settings updated successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update settings',
        variant: 'destructive',
      });
    }
  };

  return (
    <DashboardLayout userType="admin">
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">System Settings</h1>
          <p className="text-[#94A3B8]">Configure system-wide settings and preferences</p>
        </div>

        <div className="bg-[#111827]/50 backdrop-blur-sm border border-[#1F2937] rounded-xl p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#94A3B8] mb-2">
                Site Name
              </label>
              <Input
                type="text"
                value={settings.siteName}
                onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                className="bg-[#1F2937] border-[#374151] text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#94A3B8] mb-2">
                Contact Email
              </label>
              <Input
                type="email"
                value={settings.contactEmail}
                onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                className="bg-[#1F2937] border-[#374151] text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#94A3B8] mb-2">
                Max Students Per Class
              </label>
              <Input
                type="number"
                value={settings.maxStudentsPerClass}
                onChange={(e) => setSettings({ ...settings, maxStudentsPerClass: parseInt(e.target.value) })}
                className="bg-[#1F2937] border-[#374151] text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#94A3B8] mb-2">
                Default Class Duration (minutes)
              </label>
              <Input
                type="number"
                value={settings.defaultClassDuration}
                onChange={(e) => setSettings({ ...settings, defaultClassDuration: parseInt(e.target.value) })}
                className="bg-[#1F2937] border-[#374151] text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#94A3B8] mb-2">
                Default Timezone
              </label>
              <Input
                type="text"
                value={settings.timezone}
                onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
                className="bg-[#1F2937] border-[#374151] text-white"
              />
            </div>

            <Button type="submit" className="bg-[#60A5FA] hover:bg-[#3B82F6] text-white">
              Save Changes
            </Button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminSettings; 