import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { DemoBooking } from "./DemoBooking";

const HeroSection = () => {
  return (
    <div className="min-h-[90vh] relative flex items-center">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(30,30,50,0.4),transparent_60%)]"></div>
      
      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left content */}
        <div className="relative z-10">
          <Button variant="outline" className="mb-8 bg-accent/10 border-accent/20 text-accent hover:bg-accent/20">
            Learn Chess Online
          </Button>
          
          <h1 className="text-5xl lg:text-7xl font-bold mb-6 text-accent">
            Making Chess<br />
            Reach Across<br />
            the Globe
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-xl">
            Elevate your chess game with expert coaches from around the world. Our online academy brings world-class chess instruction directly to you, no matter where you are.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <DemoBooking />
            <Button 
              variant="outline" 
              className="group"
              onClick={() => document.getElementById('programs')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Programs
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>

        {/* Right content - Chess Image */}
        <div className="relative hidden lg:block">
          <div className="absolute inset-0 bg-gradient-to-r from-background/50 to-transparent z-10"></div>
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src="/images/chess-hero.jpg" 
              alt="Chess pieces on board" 
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
