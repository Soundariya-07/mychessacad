import React from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { DemoBooking } from "@/components/DemoBooking";
import CourseLayout from "@/components/CourseLayout";

const modules = [
  {
    title: "Attacking the king",
    duration: "2-3 Hours",
    topics: [
      "Attacking a castled king",
      "Attacking an uncastled king"
    ]
  },
  {
    title: "Lead in development, Pawn storming, Outpost, defense",
    duration: "2-4 Hours",
    topics: [
      "How to lead in development",
      "Pawn storming concepts",
      "Using outpost and active defense"
    ]
  },
  {
    title: "Of Kings, Pawns and Bishop",
    duration: "2-3 Hours",
    topics: [
      "King and pawn endgame",
      "Bishop vs pawn",
      "Rook vs pawns"
    ]
  },
  {
    title: "Good vs bad pieces",
    duration: "2-3 Hours",
    topics: [
      "Opposite color bishop endgame",
      "Rook vs rook and pawns"
    ]
  },
  {
    title: "Review",
    duration: "3 Hours",
    topics: [
      "End with reviewing all the concepts and solving chess puzzles"
    ]
  }
];

const AdvancedCourse = () => {
  return (
    <CourseLayout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">Advanced Chess Program</h1>
          
          <div className="bg-card/50 backdrop-blur-sm border border-white/10 rounded-xl p-8 mb-12">
            <h2 className="text-2xl font-semibold mb-4">Description</h2>
            <p className="text-muted-foreground mb-6">
              This is where things get serious. In our advanced course, you will get to work with experts and take your chess game to the next level. Our experts have a lichess rating of 1800+ and will help you analyze games, share tips for improvement. You will get to play tournaments under the guidance of mentors and learn detailed opening strategies and middle and end game tactics.
            </p>
            <p className="text-muted-foreground mb-6">
              Our structured and interactive teaching approach, combined with lots of fun puzzles will make sure that kids will not only learn chess but also master problem solving, creative thinking and logical reasoning!
            </p>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-2">Who This Course is For</h3>
              <p className="text-muted-foreground">
                The course is designed for 5-12 year olds who have mastered the concepts in beginner and intermediate courses.
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

export default AdvancedCourse; 