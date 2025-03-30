import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import BenefitsSection from '@/components/BenefitsSection';
import ProgramsSection from '@/components/ProgramsSection';
import PricingSection from '@/components/PricingSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';

const Home = () => {
  return (
    <div className="min-h-screen bg-[#0A0C10]">
      {/* Grid Background */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#4f46e5_1px,transparent_1px),linear-gradient(to_bottom,#4f46e5_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      
      {/* Gradient Overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-[#0A0C10] via-[#0A0C10]/80 to-[#0A0C10]" />

      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <ProgramsSection />
        <BenefitsSection />
        <PricingSection />
        <TestimonialsSection />
        <FAQSection />
        <Footer />
      </div>
    </div>
  );
};

export default Home; 