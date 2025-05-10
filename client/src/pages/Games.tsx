import { useState } from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import { GAME_FILTERS, SAMPLE_GAMES } from "@/config/gameTypes";
import GameCard from "@/components/games/GameCard";
import GameFilters from "@/components/games/GameFilters";

const Games = () => {
  const [activeFilter, setActiveFilter] = useState("trending");
  
  // Fetch games from API
  const { data: games, isLoading, error } = useQuery({
    queryKey: ['/api/games'],
  });
  
  // Fallback to sample games if API fails
  const displayGames = games || SAMPLE_GAMES;
  
  return (
    <>
      <Helmet>
        <title>Game Hub - Gagsty</title>
        <meta name="description" content="Browse and play games created with Gagsty. Trending, AI-powered, and earnable games available on Telegram and Web." />
      </Helmet>
      
      <section className="py-20 bg-darkBase">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold font-poppins text-white mb-4">Game <span className="text-primary">Hub</span></h1>
            <p className="max-w-2xl mx-auto text-gray-400">Discover and play games created by our community</p>
          </div>
          
          {/* Game Filters */}
          <GameFilters activeFilter={activeFilter} onFilterChange={setActiveFilter} />
          
          {/* Games Grid */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              // Show skeleton loading cards
              Array(6).fill(0).map((_, index) => (
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
            ) : error ? (
              <div className="col-span-full text-center py-10">
                <p className="text-destructive">Error loading games. Please try again later.</p>
              </div>
            ) : displayGames.length === 0 ? (
              <div className="col-span-full text-center py-10">
                <p className="text-gray-400">No games found. Try a different filter.</p>
              </div>
            ) : (
              displayGames.map((game) => (
                <GameCard key={game.id} game={game} />
              ))
            )}
          </div>
          
          {/* Pagination (simplified) */}
          {!isLoading && displayGames.length > 0 && (
            <div className="mt-12 flex justify-center">
              <div className="flex space-x-2">
                <button className="w-10 h-10 rounded-md bg-gray-800 flex items-center justify-center text-white font-medium">1</button>
                <button className="w-10 h-10 rounded-md bg-gray-800/50 flex items-center justify-center text-gray-400 hover:bg-gray-800">2</button>
                <button className="w-10 h-10 rounded-md bg-gray-800/50 flex items-center justify-center text-gray-400 hover:bg-gray-800">3</button>
                <button className="w-10 h-10 rounded-md bg-gray-800/50 flex items-center justify-center text-gray-400 hover:bg-gray-800">...</button>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Games;
