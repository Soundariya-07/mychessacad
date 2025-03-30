import React from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface PricingCardProps {
  title: string;
  price: string;
  frequency?: string;
  description: string;
  features: string[];
  popular?: boolean;
}

const PricingCard = ({
  title,
  price,
  frequency = "/week",
  description,
  features,
  popular = false
}: PricingCardProps) => {
  return (
    <div 
      className={`relative rounded-xl p-8 ${
        popular 
          ? 'border-2 border-accent bg-accent/5' 
          : 'border border-white/10 bg-card/50'
      } backdrop-blur-sm`}
    >
      {popular && (
        <div className="absolute -top-3 right-6">
          <div className="bg-accent/20 text-accent text-sm font-medium px-3 py-1 rounded-full">
            Popular Choice
          </div>
        </div>
      )}
      
      <div className="mb-6">
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <div className="flex items-baseline gap-1 mb-3">
          <span className="text-4xl font-bold">${price}</span>
          <span className="text-muted-foreground">{frequency}</span>
        </div>
        <p className="text-muted-foreground">{description}</p>
      </div>

      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-3">
            <Check className="h-5 w-5 text-accent shrink-0" />
            <span className="text-muted-foreground">{feature}</span>
          </li>
        ))}
      </ul>

      <Button 
        className={`w-full ${
          popular 
            ? 'bg-accent text-background hover:bg-accent/90' 
            : 'bg-card/50 hover:bg-card'
        }`}
      >
        Enroll Now
      </Button>
    </div>
  );
};

export default PricingCard;
