import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import { DemoBooking } from "./DemoBooking";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const programs = [
  {
    title: "Beginner",
    description: "Perfect for those who are new to chess. Learn the fundamentals of the game, piece movements, and basic strategies.",
    features: [
      "Basic piece movements",
      "Simple checkmates",
      "Opening principles"
    ],
    image: "/beginner-chess.jpg"
  },
  {
    title: "Intermediate 1",
    description: "Building on fundamentals, this program teaches tactical patterns, planning, and middle game concepts.",
    features: [
      "Basic tactics",
      "Positional concepts",
      "Endgame fundamentals"
    ],
    image: "/intermediate-chess.jpg"
  },
  {
    title: "Intermediate 2",
    description: "For improving players, focusing on deeper strategic understanding, complex tactics, and specific openings.",
    features: [
      "Advanced tactics",
      "Opening repertoire",
      "Strategic planning"
    ],
    image: "/intermediate2-chess.jpg"
  },
  {
    title: "Advanced",
    description: "Elite training for serious competitors, covering sophisticated strategies, deep analysis, and tournament preparation.",
    features: [
      "Critical positions",
      "Complex endgames",
      "Tournament preparation"
    ],
    image: "/advanced-chess.jpg"
  }
];

const ProgramsSection = () => {
  const [selectedProgram, setSelectedProgram] = useState<typeof programs[0] | null>(null);

  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <div className="inline-block py-1 px-3 rounded-full bg-accent/10 border-accent/20 mb-4">
            <p className="text-accent text-sm font-medium">Our Programs</p>
          </div>
        <h2 className="text-4xl font-bold mb-4">Elevate Your Chess Skills</h2>
        <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
          Choose from our carefully crafted programs designed for players of all levels. Learn from
          the best coaches and join a global community of chess enthusiasts.
          </p>
        </div>
        
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {programs.map((program, index) => (
          <div 
            key={index}
            className="bg-card/50 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:border-accent/50 transition-all duration-300"
          >
            <div className="aspect-square relative overflow-hidden">
              <img 
                src={program.image} 
                alt={program.title} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-3">{program.title}</h3>
              <p className="text-muted-foreground text-sm mb-4">{program.description}</p>
              
              <ul className="space-y-2 mb-6">
                {program.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm text-muted-foreground">
                    <Check className="h-4 w-4 mr-2 text-accent" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button 
                className="w-full bg-accent/10 hover:bg-accent/20 text-accent border-accent/20"
                variant="outline"
                onClick={() => setSelectedProgram(program)}
              >
                Learn More
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
              </div>
              
      <Dialog open={!!selectedProgram} onOpenChange={() => setSelectedProgram(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedProgram?.title}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground">{selectedProgram?.description}</p>
              </div>
              
            <div>
              <h3 className="font-semibold mb-4">Key Features</h3>
              <ul className="space-y-2">
                {selectedProgram?.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-muted-foreground">
                    <Check className="h-4 w-4 mr-2 text-accent" />
                    {feature}
                  </li>
                ))}
              </ul>
          </div>
          
            <div className="pt-4">
              <DemoBooking />
            </div>
          </div>
        </DialogContent>
      </Dialog>
      </div>
  );
};

export default ProgramsSection;
