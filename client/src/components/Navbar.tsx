import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { 
  FaBars, 
  FaTelegram,
  FaGamepad,
  FaGraduationCap,
  FaCoins,
  FaChartLine,
  FaBriefcase,
  FaHandshake,
  FaInfoCircle,
  FaQuestionCircle,
  FaSearch
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
    { name: "Home", path: "/", icon: <FaGamepad className="mr-2" /> },
    { name: "Create Game", path: "/create-game", icon: <FaGamepad className="mr-2" /> },
    { name: "Game Directory", path: "/games", icon: <FaGamepad className="mr-2" /> },
    { name: "Dashboard", path: "/dashboard", icon: <FaChartLine className="mr-2" /> },
    { name: "Earn & Badges", path: "/earn", icon: <FaCoins className="mr-2" /> },
    { name: "Learn Hub", path: "/learn-hub", icon: <FaGraduationCap className="mr-2" /> },
    { name: "Gagsty Chips", path: "/chips", icon: <FaCoins className="mr-2" /> },
    { name: "Gagsty Token", path: "/token", icon: <FaChartLine className="mr-2" /> },
  ];
  
  const secondaryLinks = [
    { name: "Jobs & Gigs", path: "/jobs", icon: <FaBriefcase className="mr-2" /> },
    { name: "Partners", path: "/partners", icon: <FaHandshake className="mr-2" /> },
    { name: "About Us", path: "/about", icon: <FaInfoCircle className="mr-2" /> },
    { name: "Help / FAQ", path: "/help", icon: <FaQuestionCircle className="mr-2" /> },
  ];

  return (
    <nav className="bg-darkBase/90 backdrop-blur-md sticky top-0 z-50 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <div className="text-primary font-poppins font-bold text-2xl">GAGSTY</div>
            </Link>
            <div className="hidden md:ml-10 md:flex items-center space-x-4">
              {navLinks.slice(0, 5).map((link) => (
                <Link 
                  key={link.name}
                  href={link.path} 
                  className="text-gray-300 hover:text-accent px-3 py-2 text-sm font-medium"
                >
                  {link.name}
                </Link>
              ))}
              <div className="relative group">
                <button className="text-gray-300 hover:text-accent px-3 py-2 text-sm font-medium flex items-center">
                  More <span className="ml-1">▼</span>
                </button>
                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-darkBase/95 backdrop-blur-lg border border-gray-800 ring-1 ring-black ring-opacity-5 hidden group-hover:block z-50">
                  <div className="py-1 divide-y divide-gray-800">
                    <div className="space-y-1 p-1">
                      {navLinks.slice(5).map((link) => (
                        <Link
                          key={link.name}
                          href={link.path}
                          className="flex items-center rounded-md px-3 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white w-full"
                        >
                          {link.icon}
                          {link.name}
                        </Link>
                      ))}
                    </div>
                    <div className="space-y-1 p-1">
                      {secondaryLinks.map((link) => (
                        <Link
                          key={link.name}
                          href={link.path}
                          className="flex items-center rounded-md px-3 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white w-full"
                        >
                          {link.icon}
                          {link.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
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
                      <div className="space-y-1">
                        {/* Primary Navigation Links */}
                        <div className="mb-4">
                          <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Navigation</h3>
                          {navLinks.map((link) => (
                            <Link 
                              key={link.name}
                              href={link.path} 
                              onClick={() => setIsOpen(false)}
                              className="flex items-center py-2 px-4 text-sm hover:bg-gray-800 rounded-md"
                            >
                              {link.icon}
                              {link.name}
                            </Link>
                          ))}
                        </div>
                        
                        {/* Secondary Navigation Links */}
                        <div>
                          <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">More</h3>
                          {secondaryLinks.map((link) => (
                            <Link 
                              key={link.name}
                              href={link.path} 
                              onClick={() => setIsOpen(false)}
                              className="flex items-center py-2 px-4 text-sm hover:bg-gray-800 rounded-md"
                            >
                              {link.icon}
                              {link.name}
                            </Link>
                          ))}
                        </div>
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
