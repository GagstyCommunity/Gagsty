import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { GAME_FILTERS, SAMPLE_GAMES } from "@/config/gameTypes";
import { FaFire, FaBrain, FaCoins, FaGlobe, FaTelegram } from "react-icons/fa";
import GameCard from "@/components/games/GameCard";

const FeaturedGames = () => {
  const [, navigate] = useLocation();
  const [activeFilter, setActiveFilter] = useState("trending");

  // Fetch featured games from API
  const { data: games, isLoading } = useQuery({
    queryKey: ['/api/games/featured'],
  });

  // Fallback to sample games if API fails or is loading
  const displayGames = games || SAMPLE_GAMES;
  
  // Filter games based on active filter
  const filteredGames = displayGames;

  return (
    <section id="games" className="py-20 bg-darkBase">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
          <div>
            <h2 className="text-3xl font-bold font-poppins text-white">Featured <span className="text-primary">Games</span></h2>
            <p className="text-gray-400 mt-2">Discover trending games created by our community</p>
          </div>
          <div className="hidden md:flex gap-3 flex-wrap">
            {GAME_FILTERS.slice(0, 3).map((filter) => (
              <Button
                key={filter.id}
                variant="ghost"
                className={`bg-gray-800 border ${activeFilter === filter.id ? 'border-primary/50' : 'border-gray-700'} rounded-lg text-gray-300 hover:text-white hover:border-primary/50 transition-all accent-glow`}
                onClick={() => setActiveFilter(filter.id)}
              >
                {filter.id === 'trending' && <FaFire className="text-[#FF8855] mr-2" />}
                {filter.id === 'ai-powered' && <FaBrain className="text-accent mr-2" />}
                {filter.id === 'earnable' && <FaCoins className="text-[#FFCF44] mr-2" />}
                {filter.name}
              </Button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            // Show skeleton loading cards
            Array(3).fill(0).map((_, index) => (
              <div key={index} className="gradient-card rounded-xl overflow-hidden border border-gray-800 animate-pulse">
                <div className="h-48 bg-gray-800" />
                <div className="p-5 space-y-4">
                  <div className="h-6 bg-gray-800 rounded w-3/4" />
                  <div className="h-4 bg-gray-800 rounded w-full" />
                  <div className="h-4 bg-gray-800 rounded w-5/6" />
                  <div className="flex justify-between items-center">
                    <div className="h-6 bg-gray-800 rounded w-1/3" />
                    <div className="h-8 bg-gray-800 rounded w-1/4" />
                  </div>
                </div>
              </div>
            ))
          ) : (
            filteredGames.slice(0, 3).map((game) => (
              <GameCard key={game.id} game={game} />
            ))
          )}
        </div>
        
        <div className="mt-12 text-center">
          <Button 
            variant="outline"
            size="lg"
            className="border-gray-700 bg-gray-800/80 hover:bg-gray-700/80 accent-glow"
            onClick={() => navigate("/games")}
          >
            Browse All Games
            <FaFire className="ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedGames;
