
import React from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProgramsSection from "@/components/ProgramsSection";
import PricingCard from "@/components/PricingCard";
import TestimonialCard from "@/components/TestimonialCard";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  // Testimonial data
  const testimonials = [
    {
      quote: "BeyondTheBoard has completely transformed my approach to chess. The personalized coaching has helped me increase my rating by over 300 points in just six months.",
      name: "Michael Chen",
      title: "FIDE Rating 2100+",
      image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      rating: 5
    },
    {
      quote: "The group classes are engaging and the coaches make complex concepts easy to understand. My daughter loves the interactive sessions and the global community.",
      name: "Sarah Johnson",
      title: "Parent of a chess prodigy",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      rating: 5
    },
    {
      quote: "As a beginner, I was intimidated by chess, but the coaches at BeyondTheBoard created such a welcoming environment. Now I play confidently and understand the game deeply.",
      name: "David Rodriguez",
      title: "Beginner turned enthusiast",
      image: "https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-chess-dark text-white overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Programs Section */}
      <ProgramsSection />
      
      {/* Pricing Section */}
      <section id="pricing" className="py-24 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_60%,rgba(30,30,50,0.4),transparent_60%)]"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block py-1 px-3 rounded-full bg-accent/10 border border-accent/20 mb-4">
              <p className="text-accent text-sm font-medium">Affordable Plans</p>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Choose Your Path to Mastery</h2>
            <p className="text-muted-foreground text-lg">
              Flexible pricing options to fit your schedule and learning goals.
              All plans include a subscription to our premium chess platform.
            </p>
          </div>
          
          <div className="mt-12">
            <h3 className="text-xl font-semibold mb-6 text-center">One-to-One Classes</h3>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <PricingCard
                title="1 Class Per Week"
                price="$34"
                frequency="/week"
                description="Perfect for casual learners who want dedicated attention at a relaxed pace."
                features={[
                  "1 private class weekly (45 minutes)",
                  "Personalized learning plan",
                  "Access to recorded lessons",
                  "Premium chess platform subscription",
                  "24/7 access to learning materials"
                ]}
              />
              <PricingCard
                title="2 Classes Per Week"
                price="$68"
                frequency="/week"
                description="Ideal for ambitious players looking to improve quickly with intensive coaching."
                features={[
                  "2 private classes weekly (45 minutes each)",
                  "Accelerated learning path",
                  "In-depth game analysis",
                  "Premium chess platform subscription",
                  "Priority access to special workshops"
                ]}
                popular={true}
              />
            </div>
            
            <h3 className="text-xl font-semibold mb-6 mt-16 text-center">Group Classes</h3>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <PricingCard
                title="1 Class Per Week"
                price="$22"
                frequency="/week"
                description="Learn alongside peers in a collaborative environment at an affordable rate."
                features={[
                  "1 group session weekly (60 minutes)",
                  "Structured curriculum by level",
                  "Interactive learning experience",
                  "Premium chess platform subscription",
                  "Weekly chess puzzles and challenges"
                ]}
              />
              <PricingCard
                title="2 Classes Per Week"
                price="$45"
                frequency="/week"
                description="Fast-track your progress with twice the instruction and practice opportunities."
                features={[
                  "2 group sessions weekly (60 minutes each)",
                  "Progressive skill development",
                  "Peer tournaments and competitions",
                  "Premium chess platform subscription",
                  "Monthly progress reports"
                ]}
                popular={true}
              />
            </div>
            
            <div className="text-center mt-12">
              <p className="text-muted-foreground mb-6">
                Not sure which plan is right for you? Try a free demo class first!
              </p>
              <Button className="bg-accent text-chess-dark hover:bg-accent/90 button-effect">
                Book Your Free Demo <ArrowRight size={16} className="ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Chess Board Pattern Divider */}
      <div className="relative h-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMCAwaDIwdjIwSDB6TTIwIDIwaDIwdjIwSDIweiIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIwLjA1IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4=')]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-chess-dark via-transparent to-chess-darker"></div>
      </div>
      
      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-chess-darker relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,rgba(30,30,50,0.4),transparent_60%)]"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block py-1 px-3 rounded-full bg-accent/10 border border-accent/20 mb-4">
              <p className="text-accent text-sm font-medium">Success Stories</p>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">What Our Students Say</h2>
            <p className="text-muted-foreground text-lg">
              Join thousands of satisfied students from around the world who have 
              transformed their chess game with BeyondTheBoard.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                quote={testimonial.quote}
                name={testimonial.name}
                title={testimonial.title}
                image={testimonial.image}
                rating={testimonial.rating}
              />
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <Button variant="outline" className="border-white/10 hover:bg-white/5 button-effect">
              Read More Testimonials <ArrowRight size={16} className="ml-2" />
            </Button>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-chess-dark bg-[radial-gradient(circle_at_50%_50%,rgba(230,199,126,0.08),transparent_50%)]"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto glass rounded-2xl p-10 border border-accent/30">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">Ready to Start Your Chess Journey?</h2>
                <p className="text-muted-foreground mb-6">
                  Join BeyondTheBoard today and take your first step toward chess mastery. 
                  Book a free demo class and experience our world-class instruction.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button className="bg-accent text-chess-dark hover:bg-accent/90 button-effect">
                    Book Free Demo <ArrowRight size={16} className="ml-2" />
                  </Button>
                  <Button variant="outline" className="border-white/10 hover:bg-white/5 button-effect">
                    View All Programs
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -top-5 -left-5 w-full h-full bg-accent/10 rounded-xl"></div>
                <div className="relative z-10 overflow-hidden rounded-xl border border-white/10">
                  <img 
                    src="https://images.unsplash.com/photo-1560807707-8cc77767d783?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="Chess training" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
