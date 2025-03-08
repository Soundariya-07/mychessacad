
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, UserCheck } from "lucide-react";

const ProgramsSection = () => {
  return (
    <section id="programs" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-chess-dark via-chess-darker to-chess-dark opacity-50"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block py-1 px-3 rounded-full bg-accent/10 border border-accent/20 mb-4">
            <p className="text-accent text-sm font-medium">Our Programs</p>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Elevate Your Chess Skills</h2>
          <p className="text-muted-foreground text-lg">
            Choose from our carefully crafted programs designed for players of all levels.
            Learn from the best coaches and join a global community of chess enthusiasts.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* One-to-One Program */}
          <div className="relative rounded-xl overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-chess-dark to-chess-darker/80"></div>
            <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMCAwaDIwdjIwSDB6TTIwIDIwaDIwdjIwSDIweiIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIwLjMiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg==')]"></div>
            
            <div className="relative p-8 md:p-10 h-full border border-white/10 rounded-xl transition-transform duration-500 group-hover:scale-[0.98]">
              <div className="flex items-center justify-between mb-6">
                <div className="bg-accent/20 rounded-full p-3">
                  <UserCheck className="w-6 h-6 text-accent" />
                </div>
                <div className="py-1 px-3 rounded-full bg-accent/10 border border-accent/20">
                  <p className="text-accent text-sm font-medium">Premium</p>
                </div>
              </div>
              
              <h3 className="text-2xl font-bold mb-4">One-to-One Classes</h3>
              <p className="text-muted-foreground mb-6">
                Personalized instruction tailored to your specific needs and goals.
                Our coaches work with you individually to address your strengths and weaknesses.
              </p>
              
              <div className="space-y-3 mb-8">
                <div className="flex items-center">
                  <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center mr-3">
                    <span className="text-accent text-xs">✓</span>
                  </div>
                  <p className="text-white/90">Personalized lesson plans</p>
                </div>
                <div className="flex items-center">
                  <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center mr-3">
                    <span className="text-accent text-xs">✓</span>
                  </div>
                  <p className="text-white/90">Game analysis & feedback</p>
                </div>
                <div className="flex items-center">
                  <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center mr-3">
                    <span className="text-accent text-xs">✓</span>
                  </div>
                  <p className="text-white/90">Flexible scheduling</p>
                </div>
                <div className="flex items-center">
                  <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center mr-3">
                    <span className="text-accent text-xs">✓</span>
                  </div>
                  <p className="text-white/90">Premium chess platform access</p>
                </div>
              </div>
              
              <Button className="w-full bg-accent text-chess-dark hover:bg-accent/90 button-effect">
                Learn More <ArrowRight size={16} className="ml-2" />
              </Button>
            </div>
          </div>
          
          {/* Group Program */}
          <div className="relative rounded-xl overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-chess-dark to-chess-darker/80"></div>
            <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMCAwaDIwdjIwSDB6TTIwIDIwaDIwdjIwSDIweiIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIwLjMiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg==')]"></div>
            
            <div className="relative p-8 md:p-10 h-full border border-white/10 rounded-xl transition-transform duration-500 group-hover:scale-[0.98]">
              <div className="flex items-center justify-between mb-6">
                <div className="bg-accent/20 rounded-full p-3">
                  <Users className="w-6 h-6 text-accent" />
                </div>
                <div className="py-1 px-3 rounded-full bg-accent/10 border border-accent/20">
                  <p className="text-accent text-sm font-medium">Popular</p>
                </div>
              </div>
              
              <h3 className="text-2xl font-bold mb-4">Group Classes</h3>
              <p className="text-muted-foreground mb-6">
                Learn and grow alongside peers in a collaborative environment.
                Perfect for developing your skills while making friends in the chess community.
              </p>
              
              <div className="space-y-3 mb-8">
                <div className="flex items-center">
                  <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center mr-3">
                    <span className="text-accent text-xs">✓</span>
                  </div>
                  <p className="text-white/90">Structured curriculum</p>
                </div>
                <div className="flex items-center">
                  <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center mr-3">
                    <span className="text-accent text-xs">✓</span>
                  </div>
                  <p className="text-white/90">Interactive learning</p>
                </div>
                <div className="flex items-center">
                  <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center mr-3">
                    <span className="text-accent text-xs">✓</span>
                  </div>
                  <p className="text-white/90">Weekly challenges</p>
                </div>
                <div className="flex items-center">
                  <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center mr-3">
                    <span className="text-accent text-xs">✓</span>
                  </div>
                  <p className="text-white/90">Chess platform subscription</p>
                </div>
              </div>
              
              <Button className="w-full bg-accent text-chess-dark hover:bg-accent/90 button-effect">
                Learn More <ArrowRight size={16} className="ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;
