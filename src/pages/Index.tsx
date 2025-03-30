import React from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProgramsSection from "@/components/ProgramsSection";
import PricingCard from "@/components/PricingCard";
import TestimonialCard from "@/components/TestimonialCard";
import BenefitsSection from "@/components/BenefitsSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { LoginForm } from '@/components/LoginForm';
import { RegisterForm } from '@/components/RegisterForm';
import { DemoBookingForm } from '@/components/DemoBookingForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Index = () => {
  const navigate = useNavigate();

  // Testimonial data
  const testimonials = [
    {
      quote: "BeyondTheBoard has completely transformed my approach to chess. The personalized coaching has helped me increase my rating by over 300 points in just six months.",
      name: "Michael Chen",
      title: "FIDE Rating 2100+",
      image: "https://images.unsplash.com/photo-1580541832626-2a7131ee809f?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      rating: 5
    },
    {
      quote: "The group classes are engaging and the coaches make complex concepts easy to understand. My daughter loves the interactive sessions and the global community.",
      name: "Sarah Johnson",
      title: "Parent of a chess prodigy",
      image: "https://images.unsplash.com/photo-1560807707-8cc77767d783?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      rating: 5
    },
    {
      quote: "As a beginner, I was intimidated by chess, but the coaches at BeyondTheBoard created such a welcoming environment. Now I play confidently and understand the game deeply.",
      name: "David Rodriguez",
      title: "Beginner turned enthusiast",
      image: "https://images.unsplash.com/photo-1614538287231-2779e0e4f8ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <HeroSection />
        <ProgramsSection />
        <BenefitsSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
