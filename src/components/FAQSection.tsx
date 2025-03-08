
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "What age groups do you teach?",
      answer: "We welcome students of all ages, from 5 years old to seniors. Our programs are tailored to different age groups and skill levels, ensuring everyone receives appropriate instruction.",
    },
    {
      question: "How do online chess lessons work?",
      answer: "Our lessons are conducted via secure video conferencing platforms. You'll interact with your coach in real-time, share a virtual chess board, and receive personalized instruction, analysis, and feedback.",
    },
    {
      question: "Do I need special equipment for online chess lessons?",
      answer: "You only need a computer or tablet with a stable internet connection. Our platform is user-friendly and doesn't require any special software downloads.",
    },
    {
      question: "What if I miss a scheduled class?",
      answer: "We understand life can be unpredictable. With advance notice, we can reschedule your lesson. Each student is also allowed two rescheduled lessons per month.",
    },
    {
      question: "How are students matched with coaches?",
      answer: "During your free demo session, we evaluate your current skill level, learning style, and goals. Then we match you with a coach whose teaching approach and expertise align with your needs.",
    },
    {
      question: "Can I switch between individual and group lessons?",
      answer: "Yes, we offer flexible plans. You can start with individual lessons and transition to group classes, or combine both for a comprehensive learning experience.",
    },
  ];

  return (
    <section id="faq" className="py-24 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(30,30,50,0.4),transparent_60%)]"></div>
      <div className="absolute inset-0 chess-pattern-bg opacity-10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block py-1 px-3 rounded-full bg-accent/10 border border-accent/20 mb-4">
            <p className="text-accent text-sm font-medium">Common Questions</p>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Frequently Asked Questions</h2>
          <p className="text-muted-foreground text-lg">
            Everything you need to know about our chess programs and online learning process.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-white/10">
                <AccordionTrigger className="text-white hover:text-accent text-left">
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
