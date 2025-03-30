import React from "react";
import { Globe2, Users, Trophy, Calendar, Video, BookOpen } from "lucide-react";

const benefits = [
  {
    icon: <Globe2 className="w-8 h-8 text-accent" />,
    title: "Global Community",
    description: "Connect with chess enthusiasts from around the world and learn from diverse playing styles."
  },
  {
    icon: <Users className="w-8 h-8 text-accent" />,
    title: "Expert Coaches",
    description: "Learn from international masters and grandmasters with years of teaching experience."
  },
  {
    icon: <Trophy className="w-8 h-8 text-accent" />,
    title: "Proven Results",
    description: "Our students consistently improve their ratings and achieve success in tournaments."
  },
  {
    icon: <Calendar className="w-8 h-8 text-accent" />,
    title: "Flexible Schedule",
    description: "Choose class times that work for you with our 24/7 booking system."
  },
  {
    icon: <Video className="w-8 h-8 text-accent" />,
    title: "Interactive Learning",
    description: "Engage in live online sessions with real-time feedback and analysis."
  },
  {
    icon: <BookOpen className="w-8 h-8 text-accent" />,
    title: "Structured Curriculum",
    description: "Follow a carefully designed learning path that ensures steady progress."
  }
];

const BenefitsSection = () => {
  return (
    <section className="py-24 relative bg-card">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_60%,rgba(30,30,50,0.4),transparent_60%)]"></div>
      <div className="absolute inset-0 chess-pattern-bg opacity-10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block py-1 px-3 rounded-full bg-accent/10 border border-accent/20 mb-4">
            <p className="text-accent text-sm font-medium">Why Choose Us</p>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Benefits of Learning with Us</h2>
          <p className="text-muted-foreground text-lg">
            Experience the advantages of our comprehensive online chess education platform
            designed to help you reach your full potential.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="bg-background/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-accent/50 transition-colors"
            >
              <div className="mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
              <p className="text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
