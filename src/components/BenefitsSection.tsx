
import React from "react";
import { LightbulbIcon, BrainIcon, HandshakeIcon, HeartIcon, TrophyIcon, BarChart2Icon } from "lucide-react";

type BenefitCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

const BenefitCard = ({ icon, title, description }: BenefitCardProps) => {
  return (
    <div className="p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-white/5 hover:border-accent/20 transition-all duration-300">
      <div className="bg-accent/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
        <div className="text-accent">{icon}</div>
      </div>
      <h3 className="text-xl font-semibold mb-3 text-white">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

const BenefitsSection = () => {
  const benefits = [
    {
      icon: <BrainIcon size={24} />,
      title: "Cognitive Development",
      description: "Chess enhances problem-solving abilities, critical thinking, and pattern recognition in players of all ages."
    },
    {
      icon: <LightbulbIcon size={24} />,
      title: "Strategic Thinking",
      description: "Learning to plan ahead, evaluate positions, and adapt to changing circumstances builds strategic thinking skills."
    },
    {
      icon: <HeartIcon size={24} />,
      title: "Improved Focus",
      description: "Chess teaches patience and concentration that transfer to academic and professional success."
    },
    {
      icon: <TrophyIcon size={24} />,
      title: "Competitive Spirit",
      description: "Developing a healthy approach to competition and learning to win and lose gracefully."
    },
    {
      icon: <HandshakeIcon size={24} />,
      title: "Social Skills",
      description: "Chess connects people across generations and cultures, fostering respect and sportsmanship."
    },
    {
      icon: <BarChart2Icon size={24} />,
      title: "Academic Performance",
      description: "Studies show chess players often exhibit improved memory, reading skills, and mathematics ability."
    }
  ];

  return (
    <section id="benefits" className="py-24 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,rgba(30,30,50,0.4),transparent_60%)]"></div>
      <div className="absolute inset-0 chess-pattern-bg opacity-10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block py-1 px-3 rounded-full bg-accent/10 border border-accent/20 mb-4">
            <p className="text-accent text-sm font-medium">Why Learn Chess</p>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Benefits of Chess</h2>
          <p className="text-muted-foreground text-lg">
            Chess is more than just a game. It's a powerful tool for developing minds and building character.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <BenefitCard 
              key={index}
              icon={benefit.icon}
              title={benefit.title}
              description={benefit.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
