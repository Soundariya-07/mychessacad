
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-chess-dark bg-[radial-gradient(circle_at_50%_50%,rgba(30,30,50,0.6),transparent_70%)]">
      <div className="text-center max-w-md px-4">
        <div className="inline-block py-1 px-3 rounded-full bg-accent/10 border border-accent/20 mb-4">
          <p className="text-accent text-sm font-medium">404 Error</p>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">Page Not Found</h1>
        <p className="text-muted-foreground text-lg mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button className="bg-accent text-chess-dark hover:bg-accent/90 button-effect" asChild>
          <a href="/">
            <ArrowLeft size={16} className="mr-2" /> Return to Home
          </a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
