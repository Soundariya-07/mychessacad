
import React from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface PricingCardProps {
  title: string;
  price: string;
  frequency: string;
  description: string;
  features: string[];
  popular?: boolean;
  onClick?: () => void;
}

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  price,
  frequency,
  description,
  features,
  popular,
  onClick,
}) => {
  return (
    <div
      className={`relative group ${
        popular ? "border-accent shadow-lg shadow-accent/10" : "border-white/10"
      } border bg-chess-dark backdrop-blur-sm rounded-xl overflow-hidden transition-all duration-300 hover:border-accent/50 hover:transform hover:translate-y-[-5px]`}
    >
      {popular && (
        <div className="absolute top-0 right-0">
          <div className="text-xs font-semibold bg-accent text-chess-dark py-1 px-3 rounded-bl-lg">
            Popular Choice
          </div>
        </div>
      )}

      <div className="p-8">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <div className="flex items-baseline mb-6">
          <span className="text-4xl font-bold">{price}</span>
          <span className="text-muted-foreground ml-2">{frequency}</span>
        </div>
        <p className="text-muted-foreground mb-6">{description}</p>

        <div className="space-y-4 mb-8">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start">
              <div className="mt-1 mr-3 bg-accent/20 p-0.5 rounded-full">
                <Check size={14} className="text-accent" />
              </div>
              <span className="text-white/80 text-sm">{feature}</span>
            </div>
          ))}
        </div>

        <div className="pt-4">
          <Button
            onClick={onClick}
            className={`w-full button-effect ${
              popular
                ? "bg-accent hover:bg-accent/90 text-chess-dark"
                : "bg-white/10 hover:bg-white/20 text-white"
            }`}
          >
            Enroll Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PricingCard;
