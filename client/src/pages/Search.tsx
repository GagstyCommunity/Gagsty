import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { 
  FaSearch, 
  FaGamepad, 
  FaUser, 
  FaMedal, 
  FaFilter, 
  FaCalendarAlt, 
  FaTags, 
  FaCoins,
  FaLaptop,
  FaMobileAlt,
  FaTelegram
} from "react-icons/fa";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type Game, type User, type Badge as BadgeType } from "@shared/schema";

export default function Search() {
  // State for search and filters
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("games");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [, setLocation] = useLocation();
  
  // Get search params from URL
  const params = new URLSearchParams(window.location.search);
  const queryParam = params.get("q") || "";
  const tabParam = params.get("type") || "games";
  
  // Set initial states from URL parameters
  useEffect(() => {
    if (queryParam) setSearchQuery(queryParam);
    if (tabParam) setActiveTab(tabParam);
  }, [queryParam, tabParam]);

  // Update URL when search changes
  const updateSearchParams = (query: string, tab: string) => {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    params.set("type", tab);
    window.history.replaceState(null, "", `?${params.toString()}`);
  };

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateSearchParams(searchQuery, activeTab);
  };
  
  // Update URL when tab changes
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    updateSearchParams(searchQuery, tab);
  };

  // Filters for each tab
  const [gameFilters, setGameFilters] = useState({
    gameType: [] as string[],
    dateRange: "all",
    chipsMin: 0,
    chipsMax: 10000,
    tags: [] as string[]
  });

  // Fetch search results based on active tab and query
  const { data: searchResults, isLoading } = useQuery<any>({
    queryKey: [`/api/search/${activeTab}`, { query: searchQuery, ...gameFilters }],
    enabled: searchQuery.length > 2
  });

  // Sample results based on tab for demo
  const games = (searchResults as Game[] || []).length > 0 ? (searchResults as Game[]) : sampleGames;
  const users = (searchResults as User[] || []).length > 0 ? (searchResults as User[]) : sampleUsers;
  const badges = (searchResults as BadgeType[] || []).length > 0 ? (searchResults as BadgeType[]) : sampleBadges;
  const prompts = Array.isArray(searchResults) && searchResults.length > 0 ? searchResults : samplePrompts;

  return (
    <>
      <Helmet>
        <title>{searchQuery ? `${searchQuery} - Search - Gagsty` : "Search Games, Creators & More - Gagsty"}</title>
        <meta name="description" content="Search for games, creators, badges and prompt types on Gagsty - the AI-powered game creation platform." />
      </Helmet>

      <section className="py-12 bg-gradient-to-b from-darkBase to-black min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto mb-8">
            <h1 className="text-3xl font-bold text-white mb-6 text-center">Find What You're Looking For</h1>
            
            {/* Search Form */}
            <form onSubmit={handleSearch} className="flex items-center relative mb-8">
              <div className="absolute left-3 text-gray-400">
                <FaSearch />
              </div>
              <Input
                type="search"
                placeholder="Search games, creators, badges or prompts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-32 py-6 bg-gray-800 border-gray-700 text-white"
              />
              <Button 
                type="submit" 
                className="absolute right-2 bg-primary hover:bg-primary/90 text-white"
              >
                Search
              </Button>
            </form>
            
            {/* Search Tabs */}
            <div className="flex justify-between items-center mb-4">
              <Tabs 
                defaultValue={activeTab} 
                value={activeTab} 
                onValueChange={handleTabChange} 
                className="w-full"
              >
                <TabsList className="grid grid-cols-4 bg-gray-800/50 w-full max-w-2xl">
                  <TabsTrigger value="games" className="data-[state=active]:bg-primary">
                    <FaGamepad className="mr-2" />
                    Games
                  </TabsTrigger>
                  <TabsTrigger value="creators" className="data-[state=active]:bg-primary">
                    <FaUser className="mr-2" />
                    Creators
                  </TabsTrigger>
                  <TabsTrigger value="badges" className="data-[state=active]:bg-primary">
                    <FaMedal className="mr-2" />
                    Badges
                  </TabsTrigger>
                  <TabsTrigger value="prompts" className="data-[state=active]:bg-primary">
                    <FaTags className="mr-2" />
                    Prompts
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="ml-2"
              >
                <FaFilter className="mr-2" />
                Filter
              </Button>
            </div>
            
            {/* Filter Panel - Shown/hidden based on isFilterOpen */}
            {isFilterOpen && (
              <div className="mb-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                {activeTab === "games" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <h3 className="text-white font-medium mb-2">Game Type</h3>
                      <div className="space-y-2">
                        {["mini-app", "web-game", "mobile"].map((type) => (
                          <div key={type} className="flex items-center">
                            <Checkbox 
                              id={`type-${type}`}
                              checked={gameFilters.gameType.includes(type)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setGameFilters({
                                    ...gameFilters,
                                    gameType: [...gameFilters.gameType, type]
                                  });
                                } else {
                                  setGameFilters({
                                    ...gameFilters,
                                    gameType: gameFilters.gameType.filter(t => t !== type)
                                  });
                                }
                              }}
                              className="mr-2"
                            />
                            <label htmlFor={`type-${type}`} className="text-gray-300 text-sm cursor-pointer flex items-center">
                              {type === "mini-app" && <FaTelegram className="mr-1 text-blue-400" />}
                              {type === "web-game" && <FaLaptop className="mr-1 text-primary" />}
                              {type === "mobile" && <FaMobileAlt className="mr-1 text-green-400" />}
                              {type === "mini-app" ? "Telegram Mini App" : 
                               type === "web-game" ? "Web Game" : "Mobile Game"}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-white font-medium mb-2">Date Added</h3>
                      <Select
                        value={gameFilters.dateRange}
                        onValueChange={(value) => setGameFilters({...gameFilters, dateRange: value})}
                      >
                        <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                          <SelectValue placeholder="Select date range" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-600">
                          <SelectItem value="all">All Time</SelectItem>
                          <SelectItem value="today">Today</SelectItem>
                          <SelectItem value="week">This Week</SelectItem>
                          <SelectItem value="month">This Month</SelectItem>
                          <SelectItem value="year">This Year</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <h3 className="text-white font-medium mb-2">Chips Earned Range</h3>
                      <div className="px-2">
                        <Slider
                          defaultValue={[gameFilters.chipsMin, gameFilters.chipsMax]}
                          max={10000}
                          step={100}
                          onValueChange={(values) => {
                            setGameFilters({
                              ...gameFilters,
                              chipsMin: values[0],
                              chipsMax: values[1]
                            });
                          }}
                          className="my-4"
                        />
                        <div className="flex justify-between text-gray-400 text-xs">
                          <span>{gameFilters.chipsMin} Chips</span>
                          <span>{gameFilters.chipsMax} Chips</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === "creators" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-white font-medium mb-2">Rank</h3>
                      <div className="space-y-2">
                        {["Beginner", "Novice Creator", "Skilled Creator", "Expert Creator", "Master Creator"].map((rank) => (
                          <div key={rank} className="flex items-center">
                            <Checkbox id={`rank-${rank}`} className="mr-2" />
                            <label htmlFor={`rank-${rank}`} className="text-gray-300 text-sm cursor-pointer">
                              {rank}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-white font-medium mb-2">Games Created</h3>
                      <Select defaultValue="any">
                        <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                          <SelectValue placeholder="Any number" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-600">
                          <SelectItem value="any">Any number</SelectItem>
                          <SelectItem value="1-5">1-5 games</SelectItem>
                          <SelectItem value="6-20">6-20 games</SelectItem>
                          <SelectItem value="21+">21+ games</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}
                
                {activeTab === "badges" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-white font-medium mb-2">Badge Type</h3>
                      <div className="space-y-2">
                        {["beginner", "tester", "developer", "growthHacker", "moderator"].map((type) => (
                          <div key={type} className="flex items-center">
                            <Checkbox id={`badge-${type}`} className="mr-2" />
                            <label htmlFor={`badge-${type}`} className="text-gray-300 text-sm cursor-pointer">
                              {type === "beginner" ? "Beginner" : 
                               type === "tester" ? "Game Tester" : 
                               type === "developer" ? "Game Developer" : 
                               type === "growthHacker" ? "Growth Hacker" : 
                               "Community Moderator"}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-white font-medium mb-2">Date Earned</h3>
                      <Select defaultValue="all">
                        <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                          <SelectValue placeholder="Select date range" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-600">
                          <SelectItem value="all">All Time</SelectItem>
                          <SelectItem value="today">Today</SelectItem>
                          <SelectItem value="week">This Week</SelectItem>
                          <SelectItem value="month">This Month</SelectItem>
                          <SelectItem value="year">This Year</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}
                
                {activeTab === "prompts" && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <h3 className="text-white font-medium mb-2">Prompt Category</h3>
                      <div className="space-y-2">
                        {["Adventure", "Strategy", "Puzzle", "RPG", "Educational"].map((category) => (
                          <div key={category} className="flex items-center">
                            <Checkbox id={`category-${category}`} className="mr-2" />
                            <label htmlFor={`category-${category}`} className="text-gray-300 text-sm cursor-pointer">
                              {category}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-white font-medium mb-2">Status</h3>
                      <div className="space-y-2">
                        {["approved", "pending", "rejected"].map((status) => (
                          <div key={status} className="flex items-center">
                            <Checkbox id={`status-${status}`} className="mr-2" />
                            <label htmlFor={`status-${status}`} className="text-gray-300 text-sm cursor-pointer capitalize">
                              {status}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-white font-medium mb-2">Submission Date</h3>
                      <Select defaultValue="all">
                        <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                          <SelectValue placeholder="Select date range" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-600">
                          <SelectItem value="all">All Time</SelectItem>
                          <SelectItem value="today">Today</SelectItem>
                          <SelectItem value="week">This Week</SelectItem>
                          <SelectItem value="month">This Month</SelectItem>
                          <SelectItem value="year">This Year</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}
                
                {/* Apply/Reset Filter Buttons */}
                <div className="flex justify-end mt-4 space-x-2">
                  <Button variant="outline" size="sm">Reset Filters</Button>
                  <Button className="bg-primary" size="sm">Apply Filters</Button>
                </div>
              </div>
            )}
            
            {/* Search Results Count */}
            {searchQuery && (
              <div className="text-gray-400 text-sm mb-6">
                {isLoading ? (
                  "Searching..."
                ) : (
                  <>
                    Found {
                      activeTab === "games" ? games.length :
                      activeTab === "creators" ? users.length :
                      activeTab === "badges" ? badges.length :
                      prompts.length
                    } results for "<span className="text-white">{searchQuery}</span>"
                  </>
                )}
              </div>
            )}
          </div>
          
          {/* Search Results */}
          <div className="mb-12">
            {/* Games Results */}
            <TabsContent value="games" className="space-y-6">
              {isLoading ? (
                <div className="flex justify-center py-20">
                  <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
                </div>
              ) : games.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {games.map((game) => (
                    <Card 
                      key={game.id} 
                      className="bg-gray-800 border-gray-700 hover:border-primary transition-all overflow-hidden cursor-pointer"
                      onClick={() => setLocation(`/game/${game.id}`)}
                    >
                      <div className="relative h-48">
                        <img 
                          src={game.thumbnail || "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=800&q=60"} 
                          alt={game.title} 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-gray-900 to-transparent"></div>
                        <div className="absolute top-2 right-2 flex space-x-1">
                          <Badge className="bg-primary/80 text-white">{game.gameType}</Badge>
                          {game.chipsEarned && game.chipsEarned > 1000 && (
                            <Badge className="bg-amber-500/80 text-white">
                              <FaCoins className="mr-1" /> Popular
                            </Badge>
                          )}
                        </div>
                        <div className="absolute bottom-2 left-2">
                          <div className="text-xs text-gray-400 flex items-center">
                            <FaCalendarAlt className="mr-1" />
                            {game.createdAt ? new Date(game.createdAt).toLocaleDateString() : "Recent"}
                          </div>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="text-lg font-bold text-white mb-1 truncate">{game.title}</h3>
                        <div className="text-sm text-gray-400 mb-3 flex items-center">
                          <FaUser className="mr-1" /> {game.creator || `Creator #${game.creatorId}`}
                        </div>
                        <p className="text-gray-300 text-sm line-clamp-2 mb-3">
                          {game.description || game.prompt || "No description available."}
                        </p>
                        <div className="flex justify-between items-center">
                          <div className="text-xs text-gray-400">
                            Status: <span className={
                              game.status === "approved" ? "text-green-400" :
                              game.status === "pending" ? "text-amber-400" :
                              "text-red-400"
                            }>
                              {game.status || "pending"}
                            </span>
                          </div>
                          <div className="text-[#FFCF44] font-medium flex items-center">
                            <FaCoins className="mr-1" /> 
                            {(game.chipsEarned || 0).toLocaleString()}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-gray-800/50 rounded-lg border border-gray-700">
                  <FaGamepad className="text-4xl text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-white mb-2">No Games Found</h3>
                  <p className="text-gray-400 max-w-md mx-auto mb-6">
                    We couldn't find any games matching your search criteria. Try different keywords or filters.
                  </p>
                  <Button 
                    className="bg-primary hover:bg-primary/90 text-white"
                    onClick={() => {
                      setSearchQuery("");
                      setGameFilters({
                        gameType: [],
                        dateRange: "all",
                        chipsMin: 0,
                        chipsMax: 10000,
                        tags: []
                      });
                    }}
                  >
                    Reset Search
                  </Button>
                </div>
              )}
            </TabsContent>
            
            {/* Creators Results */}
            <TabsContent value="creators" className="space-y-6">
              {isLoading ? (
                <div className="flex justify-center py-20">
                  <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
                </div>
              ) : users.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {users.map((user) => (
                    <Card key={user.id} className="bg-gray-800 border-gray-700 hover:border-primary transition-all">
                      <CardContent className="p-4">
                        <div className="flex items-center mb-4">
                          <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center text-white text-2xl mr-4">
                            {user.username ? user.username.charAt(0).toUpperCase() : "U"}
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-white">{user.username || `User #${user.id}`}</h3>
                            <Badge className="bg-blue-500/20 text-blue-400 mt-1">
                              {user.chips && user.chips >= 10000 ? "Expert Creator" :
                               user.chips && user.chips >= 5000 ? "Skilled Creator" :
                               user.chips && user.chips >= 1000 ? "Novice Creator" :
                               "Beginner"}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Games Created</span>
                            <span className="text-white">12</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Total Chips</span>
                            <span className="text-[#FFCF44]">{(user.chips || 0).toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Badges</span>
                            <span className="text-white">3</span>
                          </div>
                        </div>
                        
                        <Button variant="outline" className="w-full">View Profile</Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-gray-800/50 rounded-lg border border-gray-700">
                  <FaUser className="text-4xl text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-white mb-2">No Creators Found</h3>
                  <p className="text-gray-400 max-w-md mx-auto mb-6">
                    We couldn't find any creators matching your search criteria. Try different keywords or filters.
                  </p>
                  <Button 
                    className="bg-primary hover:bg-primary/90 text-white"
                    onClick={() => setSearchQuery("")}
                  >
                    Reset Search
                  </Button>
                </div>
              )}
            </TabsContent>
            
            {/* Badges Results */}
            <TabsContent value="badges" className="space-y-6">
              {isLoading ? (
                <div className="flex justify-center py-20">
                  <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
                </div>
              ) : badges.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {badges.map((badge) => (
                    <Card key={badge.id} className="bg-gray-800 border-gray-700 hover:border-primary transition-all">
                      <CardContent className="p-4 flex items-start">
                        <div className={`p-3 mr-4 rounded-full ${
                          badge.badgeType === "beginner" ? "bg-green-500/20" : 
                          badge.badgeType === "tester" ? "bg-blue-500/20" :
                          badge.badgeType === "developer" ? "bg-purple-500/20" :
                          badge.badgeType === "growthHacker" ? "bg-amber-500/20" :
                          "bg-red-500/20"
                        }`}>
                          <FaMedal className={`text-2xl ${
                            badge.badgeType === "beginner" ? "text-green-500" : 
                            badge.badgeType === "tester" ? "text-blue-500" :
                            badge.badgeType === "developer" ? "text-purple-500" :
                            badge.badgeType === "growthHacker" ? "text-amber-500" :
                            "text-red-500"
                          }`} />
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-white">
                            {badge.badgeType === "beginner" ? "Beginner Badge" : 
                             badge.badgeType === "tester" ? "Game Tester" :
                             badge.badgeType === "developer" ? "Game Developer" :
                             badge.badgeType === "growthHacker" ? "Growth Hacker" :
                             "Community Moderator"}
                          </h3>
                          <p className="text-sm text-gray-400 my-1">
                            {badge.badgeType === "beginner" ? "Created your first game" : 
                             badge.badgeType === "tester" ? "Tested 10+ games" :
                             badge.badgeType === "developer" ? "Created 5 successful games" :
                             badge.badgeType === "growthHacker" ? "Brought 100+ users" :
                             "Helped moderate the community"}
                          </p>
                          <div className="text-xs text-gray-500 flex items-center mt-2">
                            <FaCalendarAlt className="mr-1" />
                            Earned: {badge.earnedAt ? new Date(badge.earnedAt).toLocaleDateString() : "Recently"}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-gray-800/50 rounded-lg border border-gray-700">
                  <FaMedal className="text-4xl text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-white mb-2">No Badges Found</h3>
                  <p className="text-gray-400 max-w-md mx-auto mb-6">
                    We couldn't find any badges matching your search criteria. Try different keywords or filters.
                  </p>
                  <Button 
                    className="bg-primary hover:bg-primary/90 text-white"
                    onClick={() => setSearchQuery("")}
                  >
                    Reset Search
                  </Button>
                </div>
              )}
            </TabsContent>
            
            {/* Prompts Results */}
            <TabsContent value="prompts" className="space-y-6">
              {isLoading ? (
                <div className="flex justify-center py-20">
                  <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
                </div>
              ) : Array.isArray(prompts) && prompts.length > 0 ? (
                <div className="space-y-4">
                  {prompts.map((prompt: any, index: number) => (
                    <Card key={index} className="bg-gray-800 border-gray-700 hover:border-primary transition-all">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="text-sm text-gray-400 mb-1">
                              Submitted on {prompt.date} by {prompt.user}
                            </div>
                            <div className="text-white font-medium my-2">
                              {prompt.text}
                            </div>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {prompt.tags.map((tag: string, i: number) => (
                                <Badge key={i} className="bg-gray-700 text-gray-300">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <Badge className={
                            prompt.status === "approved" ? "bg-green-500 text-white" : 
                            prompt.status === "pending" ? "bg-yellow-500 text-white" : 
                            "bg-gray-500 text-white"
                          }>
                            {prompt.status}
                          </Badge>
                        </div>
                        
                        {prompt.gameId && (
                          <div className="mt-4 flex justify-end">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => setLocation(`/game/${prompt.gameId}`)}
                            >
                              <FaGamepad className="mr-2" />
                              View Game
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-gray-800/50 rounded-lg border border-gray-700">
                  <FaTags className="text-4xl text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-white mb-2">No Prompts Found</h3>
                  <p className="text-gray-400 max-w-md mx-auto mb-6">
                    We couldn't find any prompts matching your search criteria. Try different keywords or filters.
                  </p>
                  <Button 
                    className="bg-primary hover:bg-primary/90 text-white"
                    onClick={() => setSearchQuery("")}
                  >
                    Reset Search
                  </Button>
                </div>
              )}
            </TabsContent>
          </div>
        </div>
      </section>
    </>
  );
}

// Sample data for demonstration purposes
const sampleGames = [
  {
    id: 1,
    creatorId: 1,
    title: "Neon Space Blaster",
    prompt: "Create a sci-fi space shooter with neon visuals and upgradable ships.",
    description: "A fast-paced arcade shooter set in a neon-lit galaxy. Pilot your ship through increasingly difficult waves of enemies while collecting power-ups and upgrading your weapons.",
    gameType: "mini-app",
    status: "approved",
    thumbnail: "https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&w=800&q=60",
    chipsEarned: 3500,
    createdAt: new Date("2023-10-15"),
    creator: "CyberGamer",
  },
  {
    id: 2,
    creatorId: 2,
    title: "Medieval Quest",
    prompt: "Design a medieval RPG with quests, inventory system, and character progression.",
    description: "Embark on an epic journey through a medieval fantasy world. Complete quests, battle monsters, and upgrade your character's abilities as you explore ancient ruins and magical forests.",
    gameType: "web-game",
    status: "approved",
    thumbnail: "https://images.unsplash.com/photo-1605883705077-8d3d3cebe78c?auto=format&fit=crop&w=800&q=60",
    chipsEarned: 2800,
    createdAt: new Date("2023-11-02"),
    creator: "FantasyDev",
  },
  {
    id: 3,
    creatorId: 3,
    title: "Puzzle Master",
    prompt: "Create a mind-bending puzzle game with increasing difficulty levels.",
    description: "Test your mental agility with this challenging puzzle game. Features diverse puzzle types that progressively increase in difficulty, from simple pattern matching to complex spatial reasoning challenges.",
    gameType: "mobile",
    status: "pending",
    thumbnail: "https://images.unsplash.com/photo-1611996575749-79a3a250f948?auto=format&fit=crop&w=800&q=60",
    chipsEarned: 1200,
    createdAt: new Date("2023-12-05"),
    creator: "PuzzleWhiz",
  },
];

const sampleUsers = [
  {
    id: 1,
    username: "CyberGamer",
    email: "cyber@example.com",
    chips: 12500,
    telegramId: "cyber_telegram",
    createdAt: new Date("2023-08-10"),
  },
  {
    id: 2,
    username: "FantasyDev",
    email: "fantasy@example.com",
    chips: 8700,
    telegramId: "fantasy_telegram",
    createdAt: new Date("2023-09-15"),
  },
  {
    id: 3,
    username: "PuzzleWhiz",
    email: "puzzle@example.com",
    chips: 5200,
    telegramId: "puzzle_telegram",
    createdAt: new Date("2023-10-20"),
  },
];

const sampleBadges = [
  {
    id: 1,
    userId: 1,
    badgeType: "developer",
    earnedAt: new Date("2023-11-10"),
  },
  {
    id: 2,
    userId: 2,
    badgeType: "tester",
    earnedAt: new Date("2023-10-05"),
  },
  {
    id: 3,
    userId: 3,
    badgeType: "beginner",
    earnedAt: new Date("2023-12-15"),
  },
  {
    id: 4,
    userId: 1,
    badgeType: "growthHacker",
    earnedAt: new Date("2023-12-20"),
  },
  {
    id: 5,
    userId: 2,
    badgeType: "moderator",
    earnedAt: new Date("2023-11-25"),
  },
];

const samplePrompts = [
  {
    id: 1,
    text: "Create a cyberpunk RPG where players control AI robots in a dystopian future",
    user: "CyberGamer",
    date: "2023-12-01",
    status: "approved",
    tags: ["RPG", "Cyberpunk", "AI"],
    gameId: 1,
  },
  {
    id: 2,
    text: "A farming simulator with magical creatures and fantasy elements",
    user: "FantasyDev",
    date: "2023-12-10",
    status: "pending",
    tags: ["Simulation", "Fantasy", "Casual"],
    gameId: null,
  },
  {
    id: 3,
    text: "A puzzle game with time manipulation mechanics and neon visuals",
    user: "PuzzleWhiz",
    date: "2023-12-15",
    status: "processing",
    tags: ["Puzzle", "Time", "Neon"],
    gameId: null,
  },
  {
    id: 4,
    text: "An educational game that teaches coding through interactive puzzles",
    user: "TechTeacher",
    date: "2023-12-18",
    status: "approved",
    tags: ["Educational", "Coding", "Puzzle"],
    gameId: 3,
  },
];