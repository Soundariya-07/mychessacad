import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";

const programs = [
  {
    title: "Beginner",
    description: "Perfect for those who are new to chess.",
    image: "/images/beginner.jpg",
    features: [
      "Basic piece movements",
      "Simple checkmates",
      "Opening principles"
    ]
  },
  {
    title: "Intermediate 1",
    description: "Building on fundamentals, this program teaches tactical patterns.",
    image: "/images/intermediate1.jpg",
    features: [
      "Basic tactics",
      "Positional concepts",
      "Endgame fundamentals"
    ]
  },
  {
    title: "Intermediate 2",
    description: "For improving players, focusing on deeper strategic understanding.",
    image: "/images/intermediate2.jpg",
    features: [
      "Advanced tactics",
      "Opening repertoire",
      "Strategic planning"
    ]
  },
  {
    title: "Advanced",
    description: "Elite training for serious competitors.",
    image: "/images/advanced.jpg",
    features: [
      "Critical positions",
      "Complex endgames",
      "Tournament preparation"
    ]
  }
];

export const Programs = () => {
  return (
    <section className="py-16 bg-[#0f1729]" id="programs">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-white mb-12">Chess pieces on board</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((program, index) => (
            <Card key={index} className="bg-[#0f1729] border border-gray-800 overflow-hidden group hover:border-blue-500 transition-all">
              <div className="h-40 relative overflow-hidden">
                <img 
                  src={program.image}
                  alt={program.title}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-white mb-2">{program.title}</h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{program.description}</p>
                <ul className="space-y-2 mb-6">
                  {program.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-300">
                      <Check className="h-4 w-4 text-blue-500 mr-2 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm py-2"
                  variant="default"
                >
                  Learn More →
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}; 