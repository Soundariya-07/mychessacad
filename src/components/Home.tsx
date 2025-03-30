import { Button } from "@/components/ui/button";
import { useState } from "react";

export const Home = () => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="relative h-[600px] w-full">
      {!imageError ? (
        <img 
          src="/images/hero-chess.jpg"
          alt="Strategic Chess Game" 
          className="w-full h-full object-cover rounded-lg brightness-75"
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg flex items-center justify-center">
          <div className="text-center text-white max-w-3xl px-4">
            <h1 className="text-6xl font-bold mb-4 text-white drop-shadow-lg">Master Chess with Expert Coaches</h1>
            <p className="text-2xl mb-8 text-gray-100">Learn strategic thinking and advanced techniques from grandmasters</p>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-6 text-lg transition-all">
              Start Your Journey
            </Button>
          </div>
        </div>
      )}
      <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg flex items-center justify-center backdrop-blur-[1px]">
        <div className="text-center text-white max-w-3xl px-4">
          <h1 className="text-6xl font-bold mb-4 text-white drop-shadow-lg">Master Chess with Expert Coaches</h1>
          <p className="text-2xl mb-8 text-gray-100">Learn strategic thinking and advanced techniques from grandmasters</p>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-6 text-lg transition-all">
            Start Your Journey
          </Button>
        </div>
      </div>
    </div>
  );
}; 