import React from 'react';
import Navbar from '@/components/Navbar';
import { DemoBooking } from '@/components/DemoBooking';

interface CourseLayoutProps {
  children: React.ReactNode;
}

const CourseLayout = ({ children }: CourseLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        {children}
      </main>
      <footer className="bg-card/50 backdrop-blur-sm border-t border-white/10 py-12 mt-24">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Start Your Chess Journey?</h3>
          <p className="text-muted-foreground mb-8">Book your free demo class today and experience the difference!</p>
          <DemoBooking />
        </div>
      </footer>
    </div>
  );
};

export default CourseLayout; 