import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X, LogIn } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-background/90 backdrop-blur-md border-b border-white/5 py-3' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="mr-4">
              <h1 className="text-2xl font-bold text-white">
                <span className="text-accent">Beyond</span>TheBoard
              </h1>
              <p className="text-xs text-muted-foreground mt-0.5">An online global chess academy</p>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-sm text-white/80 hover:text-accent hover-effect">Home</a>
            <a href="#programs" className="text-sm text-white/80 hover:text-accent hover-effect">Programs</a>
            <a href="#pricing" className="text-sm text-white/80 hover:text-accent hover-effect">Pricing</a>
            <a href="#testimonials" className="text-sm text-white/80 hover:text-accent hover-effect">Testimonials</a>
            <a href="#benefits" className="text-sm text-white/80 hover:text-accent hover-effect">Benefits</a>
            <a href="#faq" className="text-sm text-white/80 hover:text-accent hover-effect">FAQ</a>
            <Button size="sm" variant="outline" className="bg-transparent border-accent text-accent hover:bg-accent hover:text-background button-effect">
              Book Free Demo
            </Button>
            <Button size="sm" className="bg-accent text-background hover:bg-accent/90 button-effect">
              <LogIn className="mr-2 h-4 w-4" /> Login
            </Button>
          </nav>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-card/95 backdrop-blur-lg border-b border-white/5 py-4 animate-fade-in">
          <div className="container mx-auto px-4">
            <nav className="flex flex-col space-y-4">
              <a 
                href="#home" 
                className="text-white/80 hover:text-accent py-2 hover-effect"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </a>
              <a 
                href="#programs" 
                className="text-white/80 hover:text-accent py-2 hover-effect"
                onClick={() => setIsMenuOpen(false)}
              >
                Programs
              </a>
              <a 
                href="#pricing" 
                className="text-white/80 hover:text-accent py-2 hover-effect"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </a>
              <a 
                href="#testimonials" 
                className="text-white/80 hover:text-accent py-2 hover-effect"
                onClick={() => setIsMenuOpen(false)}
              >
                Testimonials
              </a>
              <a 
                href="#benefits" 
                className="text-white/80 hover:text-accent py-2 hover-effect"
                onClick={() => setIsMenuOpen(false)}
              >
                Benefits
              </a>
              <a 
                href="#faq" 
                className="text-white/80 hover:text-accent py-2 hover-effect"
                onClick={() => setIsMenuOpen(false)}
              >
                FAQ
              </a>
              <Button 
                size="sm" 
                variant="outline" 
                className="bg-transparent border-accent text-accent hover:bg-accent hover:text-background w-full mt-2 button-effect"
                onClick={() => setIsMenuOpen(false)}
              >
                Book Free Demo
              </Button>
              <Button 
                size="sm"
                className="bg-accent text-background hover:bg-accent/90 w-full button-effect"
                onClick={() => setIsMenuOpen(false)}
              >
                <LogIn className="mr-2 h-4 w-4" /> Login
              </Button>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
