import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { 
  FaBars, 
  FaTelegram,
  FaGamepad
} from "react-icons/fa";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const Navbar = () => {
  const [, setLocation] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "How It Works", path: "/#how-it-works" },
    { name: "Games", path: "/games" },
    { name: "Earn", path: "/earn" },
    { name: "Token", path: "/token" },
  ];

  return (
    <nav className="bg-darkBase/90 backdrop-blur-md sticky top-0 z-50 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <div className="text-primary font-poppins font-bold text-2xl">GAGSTY</div>
            </Link>
            <div className="hidden md:ml-10 md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link 
                  key={link.name}
                  href={link.path} 
                  className="text-gray-300 hover:text-accent px-3 py-2 text-sm font-medium"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Button 
                onClick={() => setLocation("/create-game")}
                className="bg-primary hover:bg-primary/90 text-white primary-glow"
              >
                Create Game
              </Button>
            </div>
            <div className="hidden md:ml-4 md:flex-shrink-0 md:flex md:items-center">
              <Button 
                variant="ghost"
                className="bg-gray-800/60 hover:bg-gray-700 text-gray-200 telegram-glow flex items-center space-x-2"
              >
                <FaTelegram className="text-[#229ED9] mr-2" />
                <span className="text-sm">Join Community</span>
              </Button>
            </div>
            <div className="ml-4 md:hidden flex items-center">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700">
                    <FaBars className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="bg-darkBase border-gray-800 text-white p-0">
                  <div className="flex flex-col h-full">
                    <div className="p-6 border-b border-gray-800">
                      <Link href="/" onClick={() => setIsOpen(false)}>
                        <div className="text-primary font-poppins font-bold text-2xl">GAGSTY</div>
                      </Link>
                    </div>
                    
                    <div className="flex-1 overflow-auto py-6 px-4">
                      <div className="space-y-4">
                        {navLinks.map((link) => (
                          <Link 
                            key={link.name}
                            href={link.path} 
                            onClick={() => setIsOpen(false)}
                            className="block py-2 px-4 text-lg hover:bg-gray-800 rounded-md"
                          >
                            {link.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                    
                    <div className="p-6 border-t border-gray-800 space-y-4">
                      <Button 
                        className="w-full bg-primary hover:bg-primary/90 text-white"
                        onClick={() => {
                          setLocation("/create-game");
                          setIsOpen(false);
                        }}
                      >
                        <FaGamepad className="mr-2" />
                        Create Game
                      </Button>
                      
                      <Button 
                        variant="outline"
                        className="w-full border-gray-700 hover:bg-gray-800"
                      >
                        <FaTelegram className="text-[#229ED9] mr-2" />
                        Join Community
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
