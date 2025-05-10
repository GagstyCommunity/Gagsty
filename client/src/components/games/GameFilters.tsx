import { GAME_FILTERS } from "@/config/gameTypes";
import { Button } from "@/components/ui/button";
import { FaFire, FaBrain, FaCoins, FaUsers, FaFlask } from "react-icons/fa";

interface GameFiltersProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const GameFilters = ({ activeFilter, onFilterChange }: GameFiltersProps) => {
  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {GAME_FILTERS.map((filter) => (
        <Button
          key={filter.id}
          variant="ghost"
          className={`bg-gray-800 border ${
            activeFilter === filter.id ? "border-primary/50" : "border-gray-700"
          } rounded-lg text-gray-300 hover:text-white hover:border-primary/50 transition-all accent-glow`}
          onClick={() => onFilterChange(filter.id)}
        >
          {filter.id === "trending" && (
            <FaFire className="text-[#FF8855] mr-2" />
          )}
          {filter.id === "ai-powered" && (
            <FaBrain className="text-accent mr-2" />
          )}
          {filter.id === "earnable" && (
            <FaCoins className="text-[#FFCF44] mr-2" />
          )}
          {filter.id === "community" && (
            <FaUsers className="text-primary mr-2" />
          )}
          {filter.id === "beta" && (
            <FaFlask className="text-secondary mr-2" />
          )}
          {filter.name}
        </Button>
      ))}
    </div>
  );
};

export default GameFilters;
