
import React from "react";
import { Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-chess-darker border-t border-white/5 pt-16 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <h3 className="text-2xl font-bold mb-4">
              <span className="text-accent">Beyond</span>TheBoard
            </h3>
            <p className="text-muted-foreground mb-4">
              An online global chess academy making chess reach across the globe.
            </p>
            <div className="space-y-2">
              <div className="flex items-center">
                <Mail size={16} className="text-accent mr-2" />
                <a href="mailto:info@beyondtheboard.com" className="text-muted-foreground hover:text-white transition-colors">
                  info@beyondtheboard.com
                </a>
              </div>
              <div className="flex items-center">
                <Phone size={16} className="text-accent mr-2" />
                <a href="tel:+1234567890" className="text-muted-foreground hover:text-white transition-colors">
                  +1 (234) 567-890
                </a>
              </div>
              <div className="flex items-start">
                <MapPin size={16} className="text-accent mr-2 mt-1" />
                <span className="text-muted-foreground">
                  Global Online Academy
                </span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-md font-semibold mb-4 text-white">Programs</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-muted-foreground hover:text-accent transition-colors">One-to-One Classes</a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-accent transition-colors">Group Classes</a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-accent transition-colors">Tournament Preparation</a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-accent transition-colors">Advanced Strategy</a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-accent transition-colors">Endgame Mastery</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-md font-semibold mb-4 text-white">Resources</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-muted-foreground hover:text-accent transition-colors">Chess Blog</a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-accent transition-colors">Practice Puzzles</a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-accent transition-colors">Opening Database</a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-accent transition-colors">Video Library</a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-accent transition-colors">Study Material</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-md font-semibold mb-4 text-white">Company</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-muted-foreground hover:text-accent transition-colors">About Us</a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-accent transition-colors">Our Coaches</a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-accent transition-colors">Testimonials</a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-accent transition-colors">Contact</a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-accent transition-colors">Privacy Policy</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/5 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} BeyondTheBoard. All rights reserved.
          </p>
          
          <div className="flex space-x-4">
            <a href="#" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent/20 transition-colors">
              <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M22.162 5.656a8.384 8.384 0 0 1-2.402.658A4.196 4.196 0 0 0 21.6 4c-.82.488-1.719.83-2.656 1.015a4.182 4.182 0 0 0-7.126 3.814 11.874 11.874 0 0 1-8.62-4.37 4.168 4.168 0 0 0-.566 2.103c0 1.45.738 2.731 1.86 3.481a4.168 4.168 0 0 1-1.894-.523v.052a4.185 4.185 0 0 0 3.355 4.101 4.21 4.21 0 0 1-1.89.072A4.185 4.185 0 0 0 7.97 16.65a8.394 8.394 0 0 1-6.19 1.732 11.83 11.83 0 0 0 6.41 1.88c7.693 0 11.9-6.373 11.9-11.9 0-.18-.005-.362-.013-.54a8.496 8.496 0 0 0 2.087-2.165z" />
              </svg>
            </a>
            <a href="#" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent/20 transition-colors">
              <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent/20 transition-colors">
              <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent/20 transition-colors">
              <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
