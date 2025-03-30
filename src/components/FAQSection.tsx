import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What equipment do I need for online chess classes?",
    answer: "You'll need a computer or tablet with a stable internet connection, a webcam, and a microphone. We recommend using a desktop or laptop for the best learning experience."
  },
  {
    question: "How long are the chess classes?",
    answer: "Individual classes are 45 minutes long, while group classes run for 60 minutes. The duration is optimized for maximum learning while maintaining focus and engagement."
  },
  {
    question: "Can I switch between different programs?",
    answer: "Yes, you can switch between programs as you progress. Our coaches will help assess your level and recommend the most suitable program for your development."
  },
  {
    question: "What happens if I miss a class?",
    answer: "We understand that schedules can be unpredictable. You can reschedule a class with at least 24 hours notice. We also record sessions for review upon request."
  },
  {
    question: "Do you offer trial classes?",
    answer: "Yes! We offer a free demo class to help you experience our teaching methodology and meet our coaches before committing to a program."
  },
  {
    question: "What is your refund policy?",
    answer: "We offer a 100% satisfaction guarantee for your first month. If you're not satisfied with our services, we'll provide a full refund for unused classes."
  }
];

const FAQSection = () => {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(30,30,50,0.4),transparent_60%)]"></div>
      <div className="absolute inset-0 chess-pattern-bg opacity-10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block py-1 px-3 rounded-full bg-accent/10 border border-accent/20 mb-4">
            <p className="text-accent text-sm font-medium">FAQ</p>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Frequently Asked Questions</h2>
          <p className="text-muted-foreground text-lg">
            Find answers to common questions about our online chess academy and learning programs.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
