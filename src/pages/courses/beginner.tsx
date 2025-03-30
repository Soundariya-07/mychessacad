import React from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { DemoBooking } from "@/components/DemoBooking";
import CourseLayout from "@/components/CourseLayout";

const modules = [
  {
    title: "Chess Basics",
    duration: "2-3 Hours",
    topics: [
      "Introduction to Chess and Goal of the game",
      "Chess Notation",
      "How pieces move"
    ]
  },
  {
    title: "Attack & Protection",
    duration: "1-2 Hours",
    topics: [
      "How to capture opponent's pieces",
      "Protecting your own pieces",
      "Responding to opponent's move"
    ]
  },
  {
    title: "More Rules: Check, Checkmate, Stalemate",
    duration: "2-3 Hours",
    topics: [
      "What is Check and Checkmate",
      "What is Stalemate",
      "Check in One, Mate in One"
    ]
  },
  {
    title: "Forcing Checkmate",
    duration: "2-3 Hours",
    topics: [
      "Forcing checkmate with a Queen and Rook",
      "Forcing checkmate with two rooks"
    ]
  },
  {
    title: "Review",
    duration: "1 Hour",
    topics: [
      "End with reviewing all the concepts and solving chess puzzles"
    ]
  }
];

const BeginnerCourse = () => {
  return (
    <CourseLayout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">Chess for Beginners</h1>
          
          <div className="bg-card/50 backdrop-blur-sm border border-white/10 rounded-xl p-8 mb-12">
            <h2 className="text-2xl font-semibold mb-4">Description</h2>
            <p className="text-muted-foreground mb-6">
              Chess for beginners is a great way to start kids on their chess journey and get them excited not only about chess but teach them the critical skills of problem solving, creative thinking and reasoning too! This interactive course is especially designed for kids with little or no background in chess. They will learn chess online with in a very interactive fashion via engaging teachers and by solving fun puzzles!
            </p>
            <p className="text-muted-foreground mb-6">
              The beginner course will cover all the basics including how pieces move, naming the chess squares, basic tactics like capturing, combat and defense. They will also learn how to put the opponent in check and defend themselves from one, all while solving hundreds of fun & interactive chess puzzles!
            </p>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-2">Who This Course is For</h3>
              <p className="text-muted-foreground">
                The course is designed for 5-12 year olds who have little or no exposure to chess
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

export default BeginnerCourse; 