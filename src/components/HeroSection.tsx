
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section 
      id="home" 
      className="relative min-h-screen pt-28 pb-20 flex flex-col justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-50"></div>
      
      {/* Chess board squares pattern overlay with reduced opacity */}
      <div className="absolute inset-0 chess-pattern-bg opacity-10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className={`space-y-6 ${loaded ? 'animate-fade-in-up' : 'opacity-0'}`} style={{animationDelay: '0.1s'}}>
            <div className="inline-block py-1 px-3 rounded-full bg-primary/10 border border-primary/20">
              <p className="text-primary text-sm font-medium">Learn Chess Online</p>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/70">
                Making Chess Reach Across the Globe
              </span>
            </h1>
            
            <p className="text-lg text-foreground max-w-xl">
              Elevate your chess game with expert coaches from around the world. 
              Our online academy brings world-class chess instruction directly to you, 
              no matter where you are.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-2">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 button-effect">
                Book Free Demo <ArrowRight size={16} className="ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="hover:bg-primary/5 button-effect">
                View Programs
              </Button>
            </div>
          </div>
          
          <div className={`relative ${loaded ? 'animate-fade-in' : 'opacity-0'}`} style={{animationDelay: '0.4s'}}>
            <div className="relative w-full aspect-square max-w-md mx-auto lg:ml-auto">
              {/* Decorative chess board backdrop */}
              <div className="absolute top-4 right-4 w-full h-full rounded-xl bg-secondary"></div>
              
              {/* Main image */}
              <div className="relative z-10 w-full h-full overflow-hidden rounded-xl border border-border shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1611195974226-a6a9be9dd763?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Chess master teaching online" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Floating stats card */}
              <div className="absolute -bottom-5 -left-5 glass rounded-lg p-4 shadow-md animate-fade-in" style={{animationDelay: '1s'}}>
                <div className="flex items-center gap-4">
                  <div className="bg-primary/20 rounded-full p-3">
                    <div className="w-10 h-10 flex items-center justify-center">
                      <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                        <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path>
                      </svg>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Students trained</p>
                    <p className="text-2xl font-bold text-foreground">5,000+</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
