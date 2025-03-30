import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/contexts/AuthContext';
import { AuthDialog } from '@/components/AuthForms';
import { DemoBooking } from '@/components/DemoBooking';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProgramsOpen, setIsProgramsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-background/90 backdrop-blur-md border-b border-white/5 py-3' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="mr-4">
              <h1 className="text-2xl font-bold text-white">
                <span className="text-accent">Beyond</span>TheBoard
              </h1>
              <p className="text-xs text-muted-foreground mt-0.5">An online global chess academy</p>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Programs</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-4 w-[400px]">
                      <Link 
                        to="/courses/beginner"
                        className="block p-3 space-y-1 hover:bg-accent/10 rounded-md transition-colors"
                      >
                        <div className="font-medium">Beginner</div>
                        <p className="text-sm text-muted-foreground">Start your chess journey with the fundamentals</p>
                      </Link>
                      <Link 
                        to="/courses/intermediate"
                        className="block p-3 space-y-1 hover:bg-accent/10 rounded-md transition-colors"
                      >
                        <div className="font-medium">Intermediate</div>
                        <p className="text-sm text-muted-foreground">Take your game to the next level</p>
                      </Link>
                      <Link 
                        to="/courses/advanced"
                        className="block p-3 space-y-1 hover:bg-accent/10 rounded-md transition-colors"
                      >
                        <div className="font-medium">Advanced</div>
                        <p className="text-sm text-muted-foreground">Master advanced strategies and tactics</p>
                      </Link>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <Button 
              variant="ghost" 
              onClick={() => scrollToSection('benefits')}
            >
              Benefits
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => scrollToSection('pricing')}
            >
              Pricing
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => scrollToSection('testimonials')}
            >
              Testimonials
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => scrollToSection('faq')}
            >
              FAQ
            </Button>
            <DemoBooking />
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <Button
                    onClick={() => navigate(`/dashboard/${user.role}`)}
                    className="bg-[#60A5FA] text-white hover:bg-[#3B82F6]"
                  >
                    Dashboard
                  </Button>
                  <Button
                    onClick={() => {
                      logout();
                      navigate('/');
                    }}
                    variant="outline"
                    className="border-[#60A5FA] text-[#60A5FA] hover:bg-[#60A5FA] hover:text-white"
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <AuthDialog />
                </>
              )}
            </div>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-card/95 backdrop-blur-lg border-b border-white/5 py-4 animate-fade-in">
          <div className="container mx-auto px-4">
            <nav className="flex flex-col space-y-4">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Programs</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid gap-3 p-4 w-[400px]">
                        <Link
                          to="/courses/beginner"
                          className="block p-3 space-y-1 hover:bg-accent/10 rounded-md transition-colors"
                        >
                          <div className="font-medium">Beginner</div>
                          <p className="text-sm text-muted-foreground">Start your chess journey with the fundamentals</p>
                        </Link>
                        <Link
                          to="/courses/intermediate"
                          className="block p-3 space-y-1 hover:bg-accent/10 rounded-md transition-colors"
                        >
                          <div className="font-medium">Intermediate</div>
                          <p className="text-sm text-muted-foreground">Take your game to the next level</p>
                        </Link>
                        <Link
                          to="/courses/advanced"
                          className="block p-3 space-y-1 hover:bg-accent/10 rounded-md transition-colors"
                        >
                          <div className="font-medium">Advanced</div>
                          <p className="text-sm text-muted-foreground">Master advanced strategies and tactics</p>
                        </Link>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
              <Button 
                variant="ghost" 
                onClick={() => scrollToSection('benefits')}
              >
                Benefits
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => scrollToSection('pricing')}
              >
                Pricing
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => scrollToSection('testimonials')}
              >
                Testimonials
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => scrollToSection('faq')}
              >
                FAQ
              </Button>
              <DemoBooking />
              <div className="space-y-2">
                {user ? (
                  <>
                    <Button
                      onClick={() => {
                        navigate(`/dashboard/${user.role}`);
                        setIsMenuOpen(false);
                      }}
                      className="w-full bg-[#60A5FA] text-white hover:bg-[#3B82F6]"
                    >
                      Dashboard
                    </Button>
                    <Button
                      onClick={() => {
                        logout();
                        navigate('/');
                        setIsMenuOpen(false);
                      }}
                      variant="outline"
                      className="w-full border-[#60A5FA] text-[#60A5FA] hover:bg-[#60A5FA] hover:text-white"
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <AuthDialog />
                  </>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}
      </div>
    </header>
  );
};

export default Navbar;
