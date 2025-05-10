import { useState } from "react";
import { useParams, useLocation } from "wouter";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SAMPLE_GAMES } from "@/config/gameTypes";
import { 
  FaBrain, 
  FaTelegram, 
  FaGlobe, 
  FaCode, 
  FaUserPlus, 
  FaTrophy, 
  FaCalendarCheck, 
  FaTasks,
  FaArrowRight,
  FaShareAlt,
  FaStar,
  FaChartLine,
  FaCoins
} from "react-icons/fa";

const GameView = () => {
  const { id } = useParams();
  const [, navigate] = useLocation();
  const [activeTab, setActiveTab] = useState("overview");
  
  // Fetch game data
  const { data: game, isLoading, error } = useQuery({
    queryKey: [`/api/games/${id}`],
  });
  
  // Fallback to sample game if API fails or while loading
  const displayGame = game || SAMPLE_GAMES.find(g => g.id.toString() === id) || SAMPLE_GAMES[0];
  
  if (isLoading) {
    return (
      <div className="py-20 min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="py-20 min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-destructive mb-4">Error Loading Game</h2>
        <p className="text-gray-400 mb-6">We couldn't find the game you're looking for.</p>
        <Button onClick={() => navigate("/games")}>
          Browse Games
        </Button>
      </div>
    );
  }
  
  return (
    <>
      <Helmet>
        <title>{displayGame.title} - Gagsty</title>
        <meta name="description" content={displayGame.description} />
      </Helmet>
      
      <section className="py-12 bg-gradient-to-b from-darkBase to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Game Header */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Game Thumbnail */}
            <div className="relative rounded-xl overflow-hidden gradient-card border border-gray-800">
              <img 
                src={displayGame.thumbnail} 
                alt={`${displayGame.title} thumbnail`} 
                className="w-full h-64 object-cover"
              />
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-darkBase to-transparent"></div>
              <div className="absolute top-4 right-4 bg-primary/80 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                <FaBrain className="inline mr-1" /> AI-Generated
              </div>
            </div>
            
            {/* Game Info */}
            <div className="lg:col-span-2">
              <div className="flex flex-wrap justify-between items-start mb-4">
                <h1 className="text-3xl font-bold text-white">{displayGame.title}</h1>
                <div className="flex items-center bg-[#FFCF44]/20 px-3 py-1 rounded text-sm mt-2 sm:mt-0">
                  <FaCoins className="text-[#FFCF44] mr-2" />
                  <span className="text-[#FFCF44] font-semibold">{displayGame.chipsEarned.toLocaleString()} Chips Earned</span>
                </div>
              </div>
              
              <p className="text-gray-300 mb-6">{displayGame.description}</p>
              
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center text-gray-400 text-sm">
                  <div className="w-8 h-8 rounded-full bg-gray-700 mr-2"></div>
                  <span>Created by <span className="text-accent">@{displayGame.creator}</span></span>
                </div>
                
                <div className="flex items-center text-gray-400 text-sm">
                  <span>Created: {new Date(displayGame.createdAt).toLocaleDateString()}</span>
                </div>
                
                <div className="flex items-center text-gray-400 text-sm">
                  <span className="bg-primary/20 text-primary text-xs px-2 py-1 rounded-full">
                    {displayGame.gameType === 'mini-app' ? 'Telegram Mini App' : 
                     displayGame.gameType === 'web-game' ? 'Web Game' : 'Mobile Game'}
                  </span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg"
                  className="bg-[#229ED9] hover:bg-[#229ED9]/90 text-white telegram-glow"
                >
                  <FaTelegram className="mr-2" /> Play on Telegram
                </Button>
                
                <Button 
                  size="lg"
                  variant="secondary"
                  className="bg-gray-800 hover:bg-gray-700 text-white accent-glow"
                >
                  <FaGlobe className="mr-2" /> Play on Web
                </Button>
                
                <Button 
                  variant="outline"
                  className="border-gray-700 text-gray-300 hover:bg-gray-800"
                >
                  <FaShareAlt className="mr-2" /> Share
                </Button>
              </div>
            </div>
          </div>
          
          {/* Game Content Tabs */}
          <Tabs defaultValue="overview" className="mt-12" onValueChange={setActiveTab}>
            <TabsList className="bg-gray-800/80 border border-gray-700 p-1 mb-8">
              <TabsTrigger
                value="overview"
                className={`data-[state=active]:bg-primary px-4 ${activeTab === 'overview' ? 'text-white' : 'text-gray-400'}`}
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="telegram"
                className={`data-[state=active]:bg-[#229ED9] px-4 ${activeTab === 'telegram' ? 'text-white' : 'text-gray-400'}`}
              >
                Mini App Integration
              </TabsTrigger>
              <TabsTrigger
                value="viral"
                className={`data-[state=active]:bg-secondary px-4 ${activeTab === 'viral' ? 'text-white' : 'text-gray-400'}`}
              >
                Go Viral
              </TabsTrigger>
              <TabsTrigger
                value="gamenomics"
                className={`data-[state=active]:bg-[#FFCF44] px-4 ${activeTab === 'gamenomics' ? 'text-white' : 'text-gray-400'}`}
              >
                Gamenomics
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="p-0">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <div className="gradient-card rounded-xl p-6 border border-gray-800">
                    <h3 className="text-xl font-medium text-white mb-4">Game Description</h3>
                    <p className="text-gray-300">{displayGame.description}</p>
                    
                    <h4 className="text-lg font-medium text-white mt-6 mb-3">Features</h4>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-center">
                        <span className="text-accent mr-2">•</span> Engaging gameplay with intuitive controls
                      </li>
                      <li className="flex items-center">
                        <span className="text-accent mr-2">•</span> Beautiful graphics and immersive sound effects
                      </li>
                      <li className="flex items-center">
                        <span className="text-accent mr-2">•</span> Multiple levels with increasing difficulty
                      </li>
                      <li className="flex items-center">
                        <span className="text-accent mr-2">•</span> Regular content updates and new challenges
                      </li>
                    </ul>
                  </div>
                  
                  <div className="gradient-card rounded-xl p-6 border border-gray-800">
                    <h3 className="text-xl font-medium text-white mb-4">How to Play</h3>
                    <div className="space-y-4">
                      <div className="bg-gray-800/60 p-4 rounded-lg">
                        <h4 className="text-white font-medium mb-2">Telegram Mini App</h4>
                        <p className="text-gray-400 text-sm">Launch the game directly from Telegram by clicking the "Play on Telegram" button above.</p>
                      </div>
                      
                      <div className="bg-gray-800/60 p-4 rounded-lg">
                        <h4 className="text-white font-medium mb-2">Web Browser</h4>
                        <p className="text-gray-400 text-sm">Play in your browser by clicking the "Play on Web" button above. Works on desktop and mobile devices.</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="gradient-card rounded-xl p-6 border border-gray-800">
                    <h3 className="text-xl font-medium text-white mb-4">Game Stats</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Total Players</span>
                        <span className="text-white font-medium">3,541</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Total Plays</span>
                        <span className="text-white font-medium">12,738</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Chips Earned</span>
                        <span className="text-[#FFCF44] font-medium">{displayGame.chipsEarned.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Rating</span>
                        <div className="flex items-center">
                          <span className="text-white font-medium mr-1">4.8</span>
                          <div className="flex text-[#FFCF44]">
                            <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-primary/10 rounded-xl p-6 border border-primary/30">
                    <h3 className="text-xl font-medium text-white mb-4">Top Players</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between bg-gray-800/60 p-3 rounded-lg">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-gray-700 mr-2 flex items-center justify-center">1</div>
                          <span className="text-white">@PlayerOne</span>
                        </div>
                        <span className="text-[#FFCF44]">28,500 pts</span>
                      </div>
                      <div className="flex items-center justify-between bg-gray-800/60 p-3 rounded-lg">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-gray-700 mr-2 flex items-center justify-center">2</div>
                          <span className="text-white">@GameMaster</span>
                        </div>
                        <span className="text-[#FFCF44]">24,120 pts</span>
                      </div>
                      <div className="flex items-center justify-between bg-gray-800/60 p-3 rounded-lg">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-gray-700 mr-2 flex items-center justify-center">3</div>
                          <span className="text-white">@PixelHero</span>
                        </div>
                        <span className="text-[#FFCF44]">19,845 pts</span>
                      </div>
                    </div>
                    <Button className="w-full mt-4 bg-gray-800 hover:bg-gray-700 text-white">
                      View Full Leaderboard
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="telegram" className="p-0">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <div className="gradient-card rounded-xl p-6 border border-gray-800">
                    <h3 className="text-xl font-medium text-white mb-4">Telegram Mini App Integration</h3>
                    <p className="text-gray-300 mb-6">Follow these steps to integrate your game with Telegram and reach millions of potential players.</p>
                    
                    <div className="space-y-4">
                      <div className="bg-gray-800/60 p-4 rounded-lg">
                        <h4 className="text-white font-medium mb-2">1. Link Your Telegram Bot</h4>
                        <p className="text-gray-400 text-sm mb-2">Connect your game to a Telegram bot to enable Mini App functionality.</p>
                        <Button 
                          variant="secondary"
                          className="bg-[#229ED9]/20 text-[#229ED9] border-[#229ED9]/40 hover:bg-[#229ED9]/30"
                        >
                          <FaTelegram className="mr-2" /> Connect Telegram Bot
                        </Button>
                      </div>
                      
                      <div className="bg-gray-800/60 p-4 rounded-lg">
                        <h4 className="text-white font-medium mb-2">2. Auto-Generated JSON Config</h4>
                        <p className="text-gray-400 text-sm mb-2">Use this configuration for your Telegram Mini App setup:</p>
                        <div className="bg-gray-900 p-3 rounded-lg border border-gray-700 overflow-x-auto">
                          <pre className="text-xs text-gray-300 font-mono"><code>{`{
  "name": "${displayGame.title}",
  "description": "${displayGame.description.substring(0, 50)}...",
  "botUsername": "${displayGame.title.toLowerCase().replace(/\s+/g, '')}Bot",
  "startParam": "play_game_${id}",
  "payload": "play_game_${id}",
  "features": ["dailyRewards", "inviteFriends", "leaderboard"]
}`}</code></pre>
                        </div>
                      </div>
                      
                      <div className="bg-gray-800/60 p-4 rounded-lg">
                        <h4 className="text-white font-medium mb-2">3. Webhook Integration</h4>
                        <p className="text-gray-400 text-sm">Set up webhook integration to receive real-time updates from your Telegram Mini App.</p>
                        <div className="mt-2">
                          <Button 
                            variant="outline"
                            className="border-gray-700 text-gray-300 hover:bg-gray-800"
                          >
                            <FaCode className="mr-2" /> View Webhook Documentation
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="gradient-card rounded-xl p-6 border border-gray-800">
                    <h3 className="text-xl font-medium text-white mb-4">Viral Growth Features</h3>
                    <div className="space-y-3">
                      <div className="bg-gray-800/60 p-3 rounded-lg flex items-center">
                        <div className="w-10 h-10 rounded-full bg-[#229ED9]/20 flex items-center justify-center mr-3">
                          <FaUserPlus className="text-[#229ED9]" />
                        </div>
                        <div>
                          <h4 className="text-white text-sm font-medium">Invite-to-Play</h4>
                          <p className="text-xs text-gray-400">Players get 2x XP when inviting friends</p>
                        </div>
                      </div>
                      
                      <div className="bg-gray-800/60 p-3 rounded-lg flex items-center">
                        <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center mr-3">
                          <FaCalendarCheck className="text-secondary" />
                        </div>
                        <div>
                          <h4 className="text-white text-sm font-medium">Daily Rewards</h4>
                          <p className="text-xs text-gray-400">Keep players returning with daily rewards</p>
                        </div>
                      </div>
                      
                      <div className="bg-gray-800/60 p-3 rounded-lg flex items-center">
                        <div className="w-10 h-10 rounded-full bg-[#FFCF44]/20 flex items-center justify-center mr-3">
                          <FaTrophy className="text-[#FFCF44]" />
                        </div>
                        <div>
                          <h4 className="text-white text-sm font-medium">Leaderboards</h4>
                          <p className="text-xs text-gray-400">Weekly and all-time high score tables</p>
                        </div>
                      </div>
                      
                      <div className="bg-gray-800/60 p-3 rounded-lg flex items-center">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                          <FaTasks className="text-primary" />
                        </div>
                        <div>
                          <h4 className="text-white text-sm font-medium">Game Challenges</h4>
                          <p className="text-xs text-gray-400">Auto-generated challenges based on your game</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="viral" className="p-0">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <div className="gradient-card rounded-xl p-6 border border-gray-800">
                    <h3 className="text-xl font-medium text-white mb-4">Growth Strategies</h3>
                    <p className="text-gray-300 mb-6">Follow these strategies to get more players and maximize your earnings.</p>
                    
                    <div className="space-y-4">
                      <div className="bg-gray-800/60 p-4 rounded-lg">
                        <h4 className="text-white font-medium mb-2 flex items-center">
                          <FaShareAlt className="text-secondary mr-2" /> Invite & Share = Rewards
                        </h4>
                        <p className="text-gray-400 text-sm">Players earn bonus Chips when they invite friends to play your game. This creates a network effect that amplifies growth.</p>
                        <div className="mt-3 p-3 bg-secondary/10 rounded-lg border border-secondary/30">
                          <p className="text-sm text-gray-300">Invite Bonus: <span className="text-secondary">50 Chips</span> per active player referred</p>
                        </div>
                      </div>
                      
                      <div className="bg-gray-800/60 p-4 rounded-lg">
                        <h4 className="text-white font-medium mb-2 flex items-center">
                          <FaStar className="text-[#FFCF44] mr-2" /> Star Prompt Referral Links
                        </h4>
                        <p className="text-gray-400 text-sm mb-3">Create customized referral links that include the game prompt for others to remix and build upon.</p>
                        <div className="p-3 bg-gray-900 rounded-lg border border-gray-700">
                          <p className="text-sm text-gray-300">Your Referral Link:</p>
                          <div className="flex mt-2">
                            <input
                              type="text"
                              value={`https://gagsty.com/g/${id}?ref=${displayGame.creator}`}
                              readOnly
                              className="flex-1 bg-gray-800 border border-gray-700 rounded-l-lg px-3 py-2 text-sm text-gray-300"
                            />
                            <Button className="rounded-l-none bg-secondary hover:bg-secondary/90">Copy</Button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-800/60 p-4 rounded-lg">
                        <h4 className="text-white font-medium mb-2 flex items-center">
                          <FaChartLine className="text-[#FF8855] mr-2" /> Go Viral Tips
                        </h4>
                        <ul className="space-y-2 text-gray-400 text-sm pl-6 list-disc">
                          <li>Share gameplay videos on social media with your referral link</li>
                          <li>Host mini-tournaments in Telegram groups</li>
                          <li>Create challenges for players to share their best scores</li>
                          <li>Update your game regularly with new content</li>
                          <li>Respond to player feedback and suggestions</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="gradient-card rounded-xl p-6 border border-gray-800">
                    <h3 className="text-xl font-medium text-white mb-4">Growth Statistics</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-400">Daily Active Players</span>
                          <span className="text-white">248</span>
                        </div>
                        <div className="w-full bg-gray-800 rounded-full h-2">
                          <div className="bg-accent h-2 rounded-full w-[70%]"></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-400">Referral Conversion</span>
                          <span className="text-white">42%</span>
                        </div>
                        <div className="w-full bg-gray-800 rounded-full h-2">
                          <div className="bg-[#FF8855] h-2 rounded-full w-[42%]"></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-400">Retention Rate</span>
                          <span className="text-white">65%</span>
                        </div>
                        <div className="w-full bg-gray-800 rounded-full h-2">
                          <div className="bg-primary h-2 rounded-full w-[65%]"></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-400">Weekly Growth</span>
                          <span className="text-secondary">+28%</span>
                        </div>
                        <div className="w-full bg-gray-800 rounded-full h-2">
                          <div className="bg-secondary h-2 rounded-full w-[28%]"></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-[#FFCF44]/10 rounded-lg border border-[#FFCF44]/30">
                      <h4 className="text-white text-sm font-medium mb-2">Performance vs. Average</h4>
                      <p className="text-xs text-gray-300">Your game is performing <span className="text-[#FFCF44] font-medium">32% better</span> than the average game in this category.</p>
                    </div>
                  </div>
                  
                  <div className="bg-accent/10 rounded-xl p-6 border border-accent/30">
                    <h3 className="text-xl font-medium text-white mb-4">Power Tips</h3>
                    <div className="space-y-3">
                      <div className="p-3 bg-gray-800/60 rounded-lg">
                        <p className="text-sm text-gray-300">Engage with your players in the comments to boost retention.</p>
                      </div>
                      <div className="p-3 bg-gray-800/60 rounded-lg">
                        <p className="text-sm text-gray-300">Run a 7-day challenge with special rewards to increase engagement.</p>
                      </div>
                      <div className="p-3 bg-gray-800/60 rounded-lg">
                        <p className="text-sm text-gray-300">Add seasonal events to keep your game fresh and exciting.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="gamenomics" className="p-0">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <div className="gradient-card rounded-xl p-6 border border-gray-800">
                    <h3 className="text-xl font-medium text-white mb-4">Game Economy</h3>
                    <p className="text-gray-300 mb-6">Understand how Chips are earned and distributed in your game's economy.</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gray-800/60 p-4 rounded-lg">
                        <h4 className="text-white font-medium mb-3 flex items-center">
                          <FaCoins className="text-[#FFCF44] mr-2" /> Chips Source
                        </h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex justify-between">
                            <span className="text-gray-400">Playing</span>
                            <span className="text-white">5-50 Chips/session</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-gray-400">Daily Login</span>
                            <span className="text-white">10 Chips/day</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-gray-400">Referral</span>
                            <span className="text-white">50 Chips/player</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-gray-400">Challenges</span>
                            <span className="text-white">20-100 Chips</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="bg-gray-800/60 p-4 rounded-lg">
                        <h4 className="text-white font-medium mb-3 flex items-center">
                          <FaArrowRight className="text-accent mr-2" /> Chips Sink
                        </h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex justify-between">
                            <span className="text-gray-400">Boosts</span>
                            <span className="text-white">20-100 Chips</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-gray-400">Lootboxes</span>
                            <span className="text-white">50-200 Chips</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-gray-400">Skins</span>
                            <span className="text-white">100-500 Chips</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-gray-400">Upgrades</span>
                            <span className="text-white">30-300 Chips</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="gradient-card rounded-xl p-6 border border-gray-800">
                    <h3 className="text-xl font-medium text-white mb-4">Revenue Split Logic</h3>
                    <p className="text-gray-300 mb-6">Your game follows the standard Gagsty revenue split model:</p>
                    
                    <div className="relative h-48 mb-8">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-32 h-32 rounded-full border-8 border-gray-800 flex items-center justify-center bg-gray-900">
                          <div className="text-center">
                            <div className="text-xs text-gray-400">Total</div>
                            <div className="text-xl font-bold text-white">100%</div>
                          </div>
                        </div>
                        
                        {/* Creator slice */}
                        <div className="absolute inset-0">
                          <svg viewBox="0 0 100 100" className="w-full h-full">
                            <path d="M50,50 L50,0 A50,50 0 0,1 92.7,75 L50,50" fill="#5D2E8C" />
                          </svg>
                        </div>
                        
                        {/* Referral slice */}
                        <div className="absolute inset-0">
                          <svg viewBox="0 0 100 100" className="w-full h-full">
                            <path d="M50,50 L92.7,75 A50,50 0 0,1 70.7,93.8 L50,50" fill="#FF8855" />
                          </svg>
                        </div>
                        
                        {/* Platform slice */}
                        <div className="absolute inset-0">
                          <svg viewBox="0 0 100 100" className="w-full h-full">
                            <path d="M50,50 L70.7,93.8 A50,50 0 0,1 7.3,25 L50,0 L50,50" fill="#00E0FF" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-sm text-gray-400">Creator</div>
                        <div className="text-xl font-bold text-primary">60%</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">Referral</div>
                        <div className="text-xl font-bold text-[#FF8855]">10%</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">Gagsty</div>
                        <div className="text-xl font-bold text-accent">30%</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="gradient-card rounded-xl p-6 border border-gray-800">
                    <h3 className="text-xl font-medium text-white mb-4">Current Earnings</h3>
                    
                    <div className="mb-6">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-[#FFCF44]">{displayGame.chipsEarned.toLocaleString()}</div>
                        <div className="text-sm text-gray-400">Total Chips Earned</div>
                      </div>
                      
                      <div className="mt-6 grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-gray-800/60 rounded-lg">
                          <div className="text-lg font-bold text-primary">{Math.round(displayGame.chipsEarned * 0.6).toLocaleString()}</div>
                          <div className="text-xs text-gray-400">Your Share (60%)</div>
                        </div>
                        
                        <div className="text-center p-3 bg-gray-800/60 rounded-lg">
                          <div className="text-lg font-bold text-[#FF8855]">{Math.round(displayGame.chipsEarned * 0.1).toLocaleString()}</div>
                          <div className="text-xs text-gray-400">Referrals (10%)</div>
                        </div>
                      </div>
                    </div>
                    
                    <h4 className="text-white font-medium mb-2">Earnings Trend</h4>
                    <div className="h-48 w-full bg-gray-800/60 rounded-lg p-4 flex items-end justify-between">
                      <div className="flex flex-col items-center">
                        <div className="w-6 bg-primary rounded-t-sm" style={{height: '30%'}}></div>
                        <div className="text-xs text-gray-500 mt-2">Mon</div>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-6 bg-primary rounded-t-sm" style={{height: '45%'}}></div>
                        <div className="text-xs text-gray-500 mt-2">Tue</div>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-6 bg-primary rounded-t-sm" style={{height: '38%'}}></div>
                        <div className="text-xs text-gray-500 mt-2">Wed</div>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-6 bg-primary rounded-t-sm" style={{height: '65%'}}></div>
                        <div className="text-xs text-gray-500 mt-2">Thu</div>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-6 bg-primary rounded-t-sm" style={{height: '52%'}}></div>
                        <div className="text-xs text-gray-500 mt-2">Fri</div>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-6 bg-primary rounded-t-sm" style={{height: '85%'}}></div>
                        <div className="text-xs text-gray-500 mt-2">Sat</div>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-6 bg-primary rounded-t-sm" style={{height: '90%'}}></div>
                        <div className="text-xs text-gray-500 mt-2">Sun</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-[#FFCF44]/10 rounded-xl p-6 border border-[#FFCF44]/30">
                    <h3 className="text-xl font-medium text-white mb-4">Optimization Tips</h3>
                    <ul className="space-y-3 text-gray-300 text-sm">
                      <li className="flex items-start">
                        <span className="text-[#FFCF44] mr-2">•</span>
                        <span>Add more in-game rewards to encourage longer play sessions.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#FFCF44] mr-2">•</span>
                        <span>Use push notifications to remind players about daily rewards.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#FFCF44] mr-2">•</span>
                        <span>Create limited-time events to drive engagement spikes.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#FFCF44] mr-2">•</span>
                        <span>Implement a friend referral system with bonus rewards.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </>
  );
};

export default GameView;
