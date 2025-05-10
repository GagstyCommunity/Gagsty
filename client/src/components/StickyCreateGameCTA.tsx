import { useLocation } from "wouter";
import { FaWandMagicSparkles, FaGamepad } from "react-icons/fa6";
import { Button } from "@/components/ui/button";

const StickyCreateGameCTA = () => {
  const [, setLocation] = useLocation();

  return (
    <div className="fixed bottom-0 left-0 w-full bg-gradient-to-r from-darkBase/90 to-primary/90 backdrop-blur-md border-t border-gray-800 py-4 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="hidden md:block">
          <div className="text-white font-medium">Ready to create your own game?</div>
          <div className="text-gray-300 text-sm">No coding required. Get started in minutes.</div>
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto justify-center md:justify-end">
          <Button 
            onClick={() => setLocation("/create-game")}
            className="bg-primary hover:bg-primary/90 text-white primary-glow"
          >
            <FaWandMagicSparkles className="mr-2" />
            Build Game
          </Button>
          <Button 
            onClick={() => setLocation("/games")}
            variant="outline"
            className="hidden md:inline-flex border-gray-700 bg-transparent hover:bg-gray-800 accent-glow"
          >
            <FaGamepad className="mr-2" />
            Browse Games
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StickyCreateGameCTA;
