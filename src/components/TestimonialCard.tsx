import { Star } from "lucide-react";

interface TestimonialCardProps {
  quote: string;
  name: string;
  title: string;
  image: string;
  rating: number;
}

const TestimonialCard = ({
  quote,
  name,
  title,
  image,
  rating
}: TestimonialCardProps) => {
  return (
    <div className="bg-background/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-accent/50 transition-colors">
      <div className="flex gap-1 mb-4">
        {Array.from({ length: rating }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-accent text-accent" />
        ))}
      </div>
      
      <blockquote className="mb-6">
        <p className="text-muted-foreground">"{quote}"</p>
      </blockquote>
      
      <div className="flex items-center gap-3">
        <img
          src={image}
          alt={name}
          className="w-12 h-12 rounded-full object-cover border border-white/10"
        />
        <div>
          <p className="font-medium">{name}</p>
          <p className="text-sm text-muted-foreground">{title}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
