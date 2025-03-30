import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    name: "Michael Chen",
    role: "Advanced Student",
    content: "The coaches here are amazing! I've improved my game significantly in just a few months. Their strategic insights have completely transformed my approach to chess."
  },
  {
    name: "Sarah Williams",
    role: "Parent of Young Champion",
    content: "My daughter loves her chess classes. The personalized attention and structured learning approach have helped her win several junior tournaments."
  }
];

export const Testimonials = () => {
  return (
    <section className="py-16 bg-gray-900" id="testimonials">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-white mb-12">What Our Students Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors">
              <CardContent className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-white">{testimonial.name}</h3>
                  <p className="text-blue-400">{testimonial.role}</p>
                </div>
                <p className="text-gray-300 italic">{testimonial.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}; 