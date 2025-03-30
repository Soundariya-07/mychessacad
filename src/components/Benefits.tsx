import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const benefits = [
  {
    title: "Expert Coaches",
    description: "Learn from experienced chess masters who have competed at the highest levels.",
    image: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?q=80&w=2071&auto=format&fit=crop"
  },
  {
    title: "Personalized Learning",
    description: "Get customized training plans based on your skill level and goals.",
    image: "https://images.unsplash.com/photo-1580541832626-2a7131ee809f?q=80&w=2071&auto=format&fit=crop"
  },
  {
    title: "Flexible Schedule",
    description: "Choose class timings that fit your schedule with our flexible booking system.",
    image: "https://images.unsplash.com/photo-1611195974226-a6a9be9dd68b?q=80&w=2070&auto=format&fit=crop"
  }
];

export const Benefits = () => {
  return (
    <section className="py-16 bg-gray-900" id="benefits">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-white mb-12">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <Card key={index} className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">{benefit.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <img 
                  src={benefit.image} 
                  alt={benefit.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <p className="text-gray-300">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}; 