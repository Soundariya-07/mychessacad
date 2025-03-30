import React from "react";
import { DemoBooking } from "@/components/DemoBooking";

const CTASection = () => {
  return (
    <div className="container mx-auto px-4 text-center">
      <h2 className="text-3xl font-bold mb-4">Ready to Start Your Chess Journey?</h2>
      <p className="text-muted-foreground mb-8">Book your free demo class today and experience the difference!</p>
      <DemoBooking />
    </div>
  );
};

export default CTASection; 