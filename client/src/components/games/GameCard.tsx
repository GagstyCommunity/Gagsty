import { useLocation } from "wouter";
import { FaBrain, FaGlobe, FaTelegram } from "react-icons/fa";
import { Button } from "@/components/ui/button";

interface GameCardProps {
  game: {
    id: number;
    title: string;
    description: string;
    creator: string;
    chipsEarned: number;
    thumbnail: string;
    gameType: string;
  };
}

const GameCard = ({ game }: GameCardProps) => {
  const [, navigate] = useLocation();
  
  return (
    <div className="gradient-card rounded-xl overflow-hidden border border-gray-800 hover:border-primary/50 transition-all group accent-glow">
      <div className="relative">
        {/* Game thumbnail */}
        <img 
          src={game.thumbnail} 
          alt={`${game.title} game thumbnail`} 
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-darkBase to-transparent"></div>
        <div className="absolute top-4 right-4 bg-primary/80 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
          <FaBrain className="inline mr-1" /> AI-Generated
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-medium text-white group-hover:text-accent transition-colors">{game.title}</h3>
          <div className="flex items-center bg-[#FFCF44]/20 px-2 py-1 rounded text-xs">
            <i className="fas fa-coins text-[#FFCF44] mr-1"></i>
            <span className="text-[#FFCF44]">{game.chipsEarned.toLocaleString()}</span>
          </div>
        </div>
        
        <p className="text-gray-400 text-sm mt-2 mb-4 line-clamp-3">{game.description}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-gray-500 text-sm">
            <div className="w-6 h-6 rounded-full bg-gray-700 mr-2"></div>
            <span>@{game.creator}</span>
          </div>
          
          <div className="flex gap-2">
            <Button 
              size="sm"
              className="bg-[#229ED9]/90 hover:bg-[#229ED9] text-white telegram-glow"
            >
              <FaTelegram className="mr-1" /> Play
            </Button>
            
            <Button 
              size="sm"
              variant="secondary"
              className="bg-gray-700 hover:bg-gray-600 text-white accent-glow"
              onClick={() => navigate(`/game/${game.id}`)}
            >
              <FaGlobe className="mr-1" /> Web
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
