
import React from "react";

interface TestimonialCardProps {
  quote: string;
  name: string;
  title: string;
  image: string;
  rating?: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  quote,
  name,
  title,
  image,
  rating = 5,
}) => {
  return (
    <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-6 md:p-8 h-full transition-all duration-300 hover:border-accent/30">
      <div className="mb-6 flex">
        {Array.from({ length: rating }).map((_, index) => (
          <svg
            key={index}
            className="w-5 h-5 text-accent fill-current"
            viewBox="0 0 24 24"
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        ))}
      </div>

      <blockquote className="text-white/90 text-lg mb-6 relative">
        <span className="absolute -top-4 -left-2 text-4xl text-accent opacity-30">"</span>
        {quote}
        <span className="absolute -bottom-6 -right-2 text-4xl text-accent opacity-30">"</span>
      </blockquote>

      <div className="flex items-center mt-8">
        <div className="w-12 h-12 mr-4 rounded-full overflow-hidden border border-white/20">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h4 className="font-semibold text-white">{name}</h4>
          <p className="text-sm text-muted-foreground">{title}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
