import React from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { DemoBooking } from "@/components/DemoBooking";
import CourseLayout from "@/components/CourseLayout";

const modules = [
  {
    title: "Double attack, defend against mate, capturing the defender",
    duration: "2-3 Hours",
    topics: [
      "Learn how to double attack",
      "Defending against mate",
      "Capturing defender and solving related puzzles"
    ]
  },
  {
    title: "Opening principles, simplification, Queen check mate",
    duration: "2-3 Hours",
    topics: [
      "Basic Opening Principles",
      "Simplification concept",
      "Queen check mate"
    ]
  },
  {
    title: "Counter attack",
    duration: "3-5 Hours",
    topics: [
      "Principles of counterattack",
      "Pawn Breakthrough",
      "Overloaded pieces"
    ]
  },
  {
    title: "Demolition, clearance and indirect defense",
    duration: "3-4 Hours",
    topics: [
      "Demolition of the pawn structure",
      "Concept of clearance",
      "Under promotion and indirect defense"
    ]
  },
  {
    title: "Review",
    duration: "2-3 Hours",
    topics: [
      "End with reviewing all the concepts and solving chess puzzles"
    ]
  }
];

const IntermediateCourse = () => {
  return (
    <CourseLayout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">Intermediate Chess Program</h1>
          
          <div className="bg-card/50 backdrop-blur-sm border border-white/10 rounded-xl p-8 mb-12">
            <h2 className="text-2xl font-semibold mb-4">Description</h2>
            <p className="text-muted-foreground mb-6">
              Chess for intermediate is ideal for kids who have learnt basics of chess and are familiar with concepts such as movement, attack, defense, mate, etc.
            </p>
            <p className="text-muted-foreground mb-6">
              This course will take their game to the next level by teaching them concepts like double attack, simplification, back rank, counter attack, stalemate, etc. After finishing this level, kids will also become adept at analyzing games and would be trained to think on their feet about next moves- which is a great way to develop planning and strategic thinking.
            </p>
            <p className="text-muted-foreground mb-6">
              This course is split into 2 parts. Kids will need to enroll in Intermediate - 1 before they are allowed to enroll in Intermediate - 2, (or pass our assessment for Intermediate - 1).
            </p>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-2">Who This Course is For</h3>
              <p className="text-muted-foreground">
                The course is designed for 5-12 year olds who have completed Chess Beginner program and are familiar with Chess Basics, including piece movement, check/checkmate, castling etc.
              </p>
            </div>

            <DemoBooking />
          </div>

          <div className="space-y-8">
            <h2 className="text-2xl font-semibold mb-6">Course Curriculum</h2>
            {modules.map((module, index) => (
              <div 
                key={index}
                className="bg-card/50 backdrop-blur-sm border border-white/10 rounded-xl p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold">{module.title}</h3>
                  <span className="text-sm text-muted-foreground">{module.duration}</span>
                </div>
                <ul className="space-y-3">
                  {module.topics.map((topic, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-accent shrink-0" />
                      <span className="text-muted-foreground">{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </CourseLayout>
  );
};

export default IntermediateCourse; 