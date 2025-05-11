
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link } from "wouter";
import { 
  FaBars, 
  FaHome, 
  FaGamepad, 
  FaCoins, 
  FaGraduationCap,
  FaTelegramPlane, 
  FaInfoCircle,
  FaQuestionCircle,
  FaTimes
} from "react-icons/fa";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  
  const closeMenu = () => setOpen(false);
  
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden text-gray-400 hover:text-white"
        >
          <FaBars className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="bg-gray-900 border-gray-800 w-[280px] p-0">
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-gray-800">
            <div className="flex items-center justify-between">
              <Link href="/" onClick={closeMenu}>
                <h2 className="font-bold text-xl text-white">Gagsty</h2>
              </Link>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={closeMenu}
                className="text-gray-400 hover:text-white"
              >
                <FaTimes className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          <div className="flex-1 overflow-auto py-2">
            <nav className="flex flex-col space-y-1">
              <Link href="/" onClick={closeMenu}>
                <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white">
                  <FaHome className="mr-3 h-4 w-4" /> Home
                </Button>
              </Link>
              <Link href="/create-game" onClick={closeMenu}>
                <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white">
                  <FaGamepad className="mr-3 h-4 w-4" /> Create Game
                </Button>
              </Link>
              <Link href="/games" onClick={closeMenu}>
                <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white">
                  <FaGamepad className="mr-3 h-4 w-4" /> Games
                </Button>
              </Link>
              <Link href="/earn" onClick={closeMenu}>
                <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white">
                  <FaCoins className="mr-3 h-4 w-4" /> Earn & Badges
                </Button>
              </Link>
              <Link href="/learn" onClick={closeMenu}>
                <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white">
                  <FaGraduationCap className="mr-3 h-4 w-4" /> Learn Hub
                </Button>
              </Link>
              <Link href="/telegram-integration" onClick={closeMenu}>
                <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white">
                  <FaTelegramPlane className="mr-3 h-4 w-4" /> Telegram
                </Button>
              </Link>
              <Link href="/token" onClick={closeMenu}>
                <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white">
                  <FaCoins className="mr-3 h-4 w-4" /> Gagsty Token
                </Button>
              </Link>
            </nav>
          </div>
          
          <div className="p-4 border-t border-gray-800">
            <div className="flex space-x-2">
              <Link href="/about" onClick={closeMenu}>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  <FaInfoCircle className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/help" onClick={closeMenu}>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  <FaQuestionCircle className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
