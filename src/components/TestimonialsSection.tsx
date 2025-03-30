import React from "react";
import TestimonialCard from "@/components/TestimonialCard";

const TestimonialsSection = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">What Our Students Say</h2>
        <p className="text-muted-foreground">Read testimonials from our chess community</p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        <TestimonialCard
          quote="My daughter LOVES these classes so much and has taken so much interest in Chess that it has truly surprised me. Now she wants to participate in Chess competitions!!"
          name="Annie J"
          title="Mom of Raina (8 yr old)"
          image="/testimonials/annie.jpg"
          rating={5}
        />
        <TestimonialCard
          quote="The teachers and the teaching style is exceptional. I did not think that my daughter would like these classes but thought of giving it a try and they did not disappoint."
          name="David M"
          title="Elizabeth's (8 yr. old) dad"
          image="/testimonials/david.jpg"
          rating={5}
        />
        <TestimonialCard
          quote="We love BeyondTheBoard. My 6 year started to show interest in chess few months ago, and after searching to find a good class to continue his interest, we found BeyondTheBoard."
          name="Vinitha V"
          title="Vivin's (6 yr old) mom"
          image="/testimonials/vinitha.jpg"
          rating={5}
        />
      </div>
    </div>
  );
};

export default TestimonialsSection; 