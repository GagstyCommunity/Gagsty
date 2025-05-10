import { useState } from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import { FaGamepad, FaHistory, FaCoins, FaMedal, FaChartBar, FaGift } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { type Game, type User, type Badge as BadgeType } from "@shared/schema";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("my-games");
  
  // Fetch user data
  const { data: user, isLoading: isLoadingUser } = useQuery<User>({
    queryKey: ["/api/auth/user"],
  });

  // Fetch user's games
  const { data: userGames, isLoading: isLoadingGames } = useQuery<Game[]>({
    queryKey: ["/api/games", { creatorId: user?.id }],
    enabled: !!user?.id,
  });

  // Fetch user's badges
  const { data: userBadges, isLoading: isLoadingBadges } = useQuery<BadgeType[]>({
    queryKey: ["/api/user/badges", { userId: user?.id }],
    enabled: !!user?.id,
  });

  // User's rank based on chips and badges
  const userRank = getRankFromChipsAndBadges(user?.chips || 0, userBadges?.length || 0);

  // Loading state for all queries
  const isLoading = isLoadingUser || isLoadingGames || isLoadingBadges;

  return (
    <>
      <Helmet>
        <title>My Dashboard - Gagsty</title>
        <meta name="description" content="Manage your games, track your earnings, and view your badges on Gagsty." />
      </Helmet>

      <section className="py-12 bg-gradient-to-b from-darkBase to-black min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Dashboard Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">My Dashboard</h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="bg-primary/20 text-primary p-2 rounded mr-2">
                  <FaCoins />
                </div>
                <div>
                  <div className="text-sm text-gray-400">Chips Balance</div>
                  <div className="text-xl font-bold text-[#FFCF44]">{(user?.chips || 0).toLocaleString()}</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="bg-blue-500/20 text-blue-500 p-2 rounded mr-2">
                  <FaMedal />
                </div>
                <div>
                  <div className="text-sm text-gray-400">Rank</div>
                  <div className="text-xl font-bold text-white">{userRank}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Dashboard Tabs */}
          <Tabs defaultValue="my-games" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid grid-cols-6 max-w-4xl bg-gray-800/50">
              <TabsTrigger value="my-games" className="data-[state=active]:bg-primary">
                <FaGamepad className="mr-2" />
                <span className="hidden sm:inline">My Games</span>
              </TabsTrigger>
              <TabsTrigger value="prompts" className="data-[state=active]:bg-primary">
                <FaHistory className="mr-2" />
                <span className="hidden sm:inline">Prompts</span>
              </TabsTrigger>
              <TabsTrigger value="earnings" className="data-[state=active]:bg-primary">
                <FaCoins className="mr-2" />
                <span className="hidden sm:inline">Earned Chips</span>
              </TabsTrigger>
              <TabsTrigger value="badges" className="data-[state=active]:bg-primary">
                <FaMedal className="mr-2" />
                <span className="hidden sm:inline">Badges</span>
              </TabsTrigger>
              <TabsTrigger value="analytics" className="data-[state=active]:bg-primary">
                <FaChartBar className="mr-2" />
                <span className="hidden sm:inline">Analytics</span>
              </TabsTrigger>
              <TabsTrigger value="rewards" className="data-[state=active]:bg-primary">
                <FaGift className="mr-2" />
                <span className="hidden sm:inline">Claim</span>
              </TabsTrigger>
            </TabsList>

            {/* Loading State */}
            {isLoading && (
              <div className="flex items-center justify-center py-20">
                <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
              </div>
            )}

            {/* My Games Tab */}
            <TabsContent value="my-games" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">My Games</h2>
                <Button className="bg-primary hover:bg-primary/90 text-white">
                  Create New Game
                </Button>
              </div>

              {userGames && userGames.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {userGames.map((game) => (
                    <Card key={game.id} className="bg-gray-800 border-gray-700 overflow-hidden">
                      <div className="relative h-40">
                        <img 
                          src={game.thumbnail || "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=800&q=60"} 
                          alt={game.title} 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2">
                          <Badge className="bg-gray-900/80 text-white text-xs">{game.gameType}</Badge>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="text-lg font-bold text-white truncate">{game.title}</h3>
                        <div className="flex justify-between items-center mt-2">
                          <div className="text-sm text-gray-400">Status</div>
                          <Badge 
                            className={
                              game.status === "approved" ? "bg-green-500" : 
                              game.status === "pending" ? "bg-yellow-500" : 
                              "bg-red-500"
                            }
                          >
                            {game.status}
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <div className="text-sm text-gray-400">Chips Earned</div>
                          <div className="text-[#FFCF44] font-medium">{(game.chipsEarned || 0).toLocaleString()}</div>
                        </div>
                        <div className="mt-4 flex justify-between">
                          <Button variant="outline" size="sm" className="text-xs">Edit</Button>
                          <Button variant="outline" size="sm" className="text-xs">Analytics</Button>
                          <Button variant="outline" size="sm" className="text-xs">Share</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-gray-800/50 rounded-lg border border-gray-700">
                  <FaGamepad className="text-4xl text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-white mb-2">No Games Yet</h3>
                  <p className="text-gray-400 max-w-md mx-auto mb-6">
                    You haven't created any games yet. Start transforming your ideas into games with AI.
                  </p>
                  <Button className="bg-primary hover:bg-primary/90 text-white">
                    Create Your First Game
                  </Button>
                </div>
              )}
            </TabsContent>

            {/* Submitted Prompts Tab */}
            <TabsContent value="prompts" className="space-y-6">
              <h2 className="text-2xl font-bold text-white">Submitted Prompts</h2>
              
              <div className="bg-gray-800/50 rounded-lg border border-gray-700 p-4 space-y-4">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="p-4 bg-gray-800 border border-gray-700 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-sm text-gray-400">Submitted on {new Date().toLocaleDateString()}</div>
                        <div className="text-white font-medium my-2">
                          {index === 0 ? "A cyberpunk RPG where players control AI robots in a dystopian future" : 
                           index === 1 ? "A farming simulator with magical creatures and fantasy elements" :
                           "A puzzle game with time manipulation mechanics and neon visuals"}
                        </div>
                        <div className="flex space-x-2">
                          <Badge className="bg-primary/20 text-primary">RPG</Badge>
                          <Badge className="bg-blue-500/20 text-blue-500">Mini App</Badge>
                        </div>
                      </div>
                      <Badge 
                        className={
                          index === 0 ? "bg-green-500" : 
                          index === 1 ? "bg-yellow-500" : 
                          "bg-gray-500"
                        }
                      >
                        {index === 0 ? "Approved" : index === 1 ? "Pending" : "Processing"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Earned Chips Tab */}
            <TabsContent value="earnings" className="space-y-6">
              <h2 className="text-2xl font-bold text-white">Earned Chips</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-4">
                    <h3 className="text-lg font-medium text-white mb-2">Total Earned</h3>
                    <div className="text-3xl font-bold text-[#FFCF44]">{(user?.chips || 0).toLocaleString()}</div>
                    <Progress value={65} className="h-1.5 mt-4" />
                    <div className="mt-2 text-sm text-gray-400">
                      {Math.round(((user?.chips || 0) / 10000) * 100)}% to next rank
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-4">
                    <h3 className="text-lg font-medium text-white mb-2">This Month</h3>
                    <div className="text-3xl font-bold text-[#FFCF44]">
                      {Math.floor(Math.random() * 5000).toLocaleString()}
                    </div>
                    <div className="flex items-center mt-4 text-green-500">
                      <span className="mr-1">↑</span>
                      <span>23% from last month</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-4">
                    <h3 className="text-lg font-medium text-white mb-2">Available to Claim</h3>
                    <div className="text-3xl font-bold text-[#FFCF44]">
                      {Math.floor(Math.random() * 2000).toLocaleString()}
                    </div>
                    <Button className="w-full mt-4 bg-primary/90 hover:bg-primary text-white">
                      Claim Rewards
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <h3 className="text-xl font-medium text-white mt-8 mb-4">Earnings History</h3>
              <div className="bg-gray-800/50 rounded-lg border border-gray-700 overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-gray-800">
                    <tr>
                      <th className="px-4 py-3 text-sm text-gray-400">Date</th>
                      <th className="px-4 py-3 text-sm text-gray-400">Source</th>
                      <th className="px-4 py-3 text-sm text-gray-400">Amount</th>
                      <th className="px-4 py-3 text-sm text-gray-400">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <tr key={index} className="hover:bg-gray-800/50">
                        <td className="px-4 py-3 text-sm text-white">
                          {new Date(Date.now() - index * 3 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3 text-sm text-white">
                          {index % 3 === 0 ? "Game Plays" : index % 3 === 1 ? "Referral Bonus" : "Badge Reward"}
                        </td>
                        <td className="px-4 py-3 text-sm text-[#FFCF44]">
                          {(Math.floor(Math.random() * 500) + 100).toLocaleString()}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <Badge className="bg-green-500/20 text-green-500">Credited</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>

            {/* Badges & Ranks Tab */}
            <TabsContent value="badges" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Badges & Ranks</h2>
                <div>
                  <span className="text-gray-400 mr-2">Current Rank:</span>
                  <Badge className="bg-blue-500/90 text-white">{userRank}</Badge>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {getBadges().map((badge) => {
                  const hasBadge = userBadges?.some(b => b.badgeType === badge.id);
                  
                  return (
                    <Card key={badge.id} className={`bg-gray-800 border-gray-700 ${hasBadge ? 'ring-2 ring-primary' : 'opacity-70'}`}>
                      <CardContent className="p-4 flex items-center">
                        <div className={`p-3 mr-4 rounded-full ${badge.bgColor}`}>
                          {badge.icon}
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-white">{badge.name}</h3>
                          <p className="text-sm text-gray-400">{badge.description}</p>
                          {hasBadge ? (
                            <Badge className="mt-2 bg-green-500/20 text-green-500">Earned</Badge>
                          ) : (
                            <div className="mt-2">
                              <Progress value={badge.progress} className="h-1.5" />
                              <div className="mt-1 text-xs text-gray-400">
                                {badge.progress}% complete
                              </div>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6">
              <h2 className="text-2xl font-bold text-white">Analytics</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-4">
                    <h3 className="text-gray-400 text-sm">Total Views</h3>
                    <div className="text-2xl font-bold text-white mt-1">24,867</div>
                    <div className="flex items-center mt-4 text-green-500 text-sm">
                      <span className="mr-1">↑</span>
                      <span>12% from last month</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-4">
                    <h3 className="text-gray-400 text-sm">Game Plays</h3>
                    <div className="text-2xl font-bold text-white mt-1">9,732</div>
                    <div className="flex items-center mt-4 text-green-500 text-sm">
                      <span className="mr-1">↑</span>
                      <span>18% from last month</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-4">
                    <h3 className="text-gray-400 text-sm">Total Earnings</h3>
                    <div className="text-2xl font-bold text-[#FFCF44] mt-1">
                      {(user?.chips || 0).toLocaleString()}
                    </div>
                    <div className="flex items-center mt-4 text-green-500 text-sm">
                      <span className="mr-1">↑</span>
                      <span>8% from last month</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-4">
                    <h3 className="text-lg font-medium text-white mb-4">Performance by Game</h3>
                    <div className="space-y-4">
                      {(userGames || []).slice(0, 3).map((game, index) => (
                        <div key={game.id || index} className="flex items-center">
                          <div className="w-10 h-10 rounded overflow-hidden mr-3 flex-shrink-0">
                            <img 
                              src={game.thumbnail || "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=800&q=60"} 
                              alt={game.title} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-white font-medium truncate">{game.title}</span>
                              <span className="text-[#FFCF44]">{(game.chipsEarned || 0).toLocaleString()}</span>
                            </div>
                            <Progress value={80 - index * 20} className="h-1.5" />
                          </div>
                        </div>
                      ))}

                      {(!userGames || userGames.length === 0) && (
                        <div className="text-center py-8 text-gray-400">
                          No games to analyze
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-4">
                    <h3 className="text-lg font-medium text-white mb-4">Audience Demographics</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm text-gray-400 mb-2">Age Groups</h4>
                        <div className="space-y-2">
                          {[
                            { label: "18-24", value: 35 },
                            { label: "25-34", value: 42 },
                            { label: "35-44", value: 15 },
                            { label: "45+", value: 8 }
                          ].map((item, i) => (
                            <div key={i}>
                              <div className="flex justify-between text-xs mb-1">
                                <span className="text-white">{item.label}</span>
                                <span className="text-white">{item.value}%</span>
                              </div>
                              <Progress value={item.value} className="h-1.5" />
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm text-gray-400 mb-2">Platforms</h4>
                        <div className="space-y-2">
                          {[
                            { label: "Telegram", value: 68 },
                            { label: "Web", value: 25 },
                            { label: "Mobile", value: 7 }
                          ].map((item, i) => (
                            <div key={i}>
                              <div className="flex justify-between text-xs mb-1">
                                <span className="text-white">{item.label}</span>
                                <span className="text-white">{item.value}%</span>
                              </div>
                              <Progress value={item.value} className="h-1.5" />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Claim Rewards Tab */}
            <TabsContent value="rewards" className="space-y-6">
              <h2 className="text-2xl font-bold text-white">Claim Rewards</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="bg-gray-800 border-gray-700 overflow-hidden">
                  <div className="h-32 bg-gradient-to-r from-primary to-blue-600 p-4 flex flex-col justify-end">
                    <h3 className="text-xl font-bold text-white">Partner Deals</h3>
                    <p className="text-white/80 text-sm">Special offers from our partners</p>
                  </div>
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      <div className="p-3 bg-gray-700/50 rounded-lg flex justify-between items-center">
                        <div>
                          <div className="text-white font-medium">50% off Game Assets</div>
                          <div className="text-sm text-gray-400">Unity Asset Store</div>
                        </div>
                        <Button size="sm" variant="outline">Claim</Button>
                      </div>
                      <div className="p-3 bg-gray-700/50 rounded-lg flex justify-between items-center">
                        <div>
                          <div className="text-white font-medium">Free Premium Hosting</div>
                          <div className="text-sm text-gray-400">For 3 months</div>
                        </div>
                        <Button size="sm" variant="outline">Claim</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-gray-800 border-gray-700 overflow-hidden">
                  <div className="h-32 bg-gradient-to-r from-amber-500 to-orange-600 p-4 flex flex-col justify-end">
                    <h3 className="text-xl font-bold text-white">Chip Rewards</h3>
                    <p className="text-white/80 text-sm">Convert your chips to rewards</p>
                  </div>
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      <div className="p-3 bg-gray-700/50 rounded-lg flex justify-between items-center">
                        <div>
                          <div className="text-white font-medium">10,000 Chips</div>
                          <div className="text-sm text-gray-400">$50 Amazon Gift Card</div>
                        </div>
                        <Button size="sm" variant="outline" disabled={!user?.chips || user.chips < 10000}>
                          {!user?.chips || user.chips < 10000 ? "Not Enough" : "Redeem"}
                        </Button>
                      </div>
                      <div className="p-3 bg-gray-700/50 rounded-lg flex justify-between items-center">
                        <div>
                          <div className="text-white font-medium">20,000 Chips</div>
                          <div className="text-sm text-gray-400">$100 PayPal Transfer</div>
                        </div>
                        <Button size="sm" variant="outline" disabled={!user?.chips || user.chips < 20000}>
                          {!user?.chips || user.chips < 20000 ? "Not Enough" : "Redeem"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-gray-800 border-gray-700 overflow-hidden">
                  <div className="h-32 bg-gradient-to-r from-green-500 to-emerald-600 p-4 flex flex-col justify-end">
                    <h3 className="text-xl font-bold text-white">Promo Tools</h3>
                    <p className="text-white/80 text-sm">Resources to promote your games</p>
                  </div>
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      <div className="p-3 bg-gray-700/50 rounded-lg flex justify-between items-center">
                        <div>
                          <div className="text-white font-medium">Custom Affiliate Links</div>
                          <div className="text-sm text-gray-400">Track & earn from referrals</div>
                        </div>
                        <Button size="sm" variant="outline">Generate</Button>
                      </div>
                      <div className="p-3 bg-gray-700/50 rounded-lg flex justify-between items-center">
                        <div>
                          <div className="text-white font-medium">Social Media Kit</div>
                          <div className="text-sm text-gray-400">Graphics & templates</div>
                        </div>
                        <Button size="sm" variant="outline">Download</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </>
  );
}

// Helper function to determine user rank based on chips and badges
function getRankFromChipsAndBadges(chips: number, badgeCount: number): string {
  if (chips >= 50000 && badgeCount >= 6) return "Master Creator";
  if (chips >= 25000 && badgeCount >= 4) return "Expert Creator";
  if (chips >= 10000 && badgeCount >= 2) return "Adept Creator";
  if (chips >= 5000) return "Skilled Creator";
  if (chips >= 1000) return "Novice Creator";
  return "Beginner";
}

// Helper function for badge data
function getBadges() {
  return [
    {
      id: "beginner",
      name: "Beginner Badge",
      description: "Created your first game",
      icon: <FaGamepad className="text-xl text-white" />,
      bgColor: "bg-green-500/20 text-green-500",
      progress: 100
    },
    {
      id: "tester",
      name: "Game Tester",
      description: "Tested 10+ games",
      icon: <FaGamepad className="text-xl text-white" />,
      bgColor: "bg-blue-500/20 text-blue-500",
      progress: 80
    },
    {
      id: "developer",
      name: "Game Developer",
      description: "Created 5 successful games",
      icon: <FaGamepad className="text-xl text-white" />,
      bgColor: "bg-purple-500/20 text-purple-500",
      progress: 40
    },
    {
      id: "growthHacker",
      name: "Growth Hacker",
      description: "Brought 100+ users to the platform",
      icon: <FaGamepad className="text-xl text-white" />,
      bgColor: "bg-orange-500/20 text-orange-500",
      progress: 30
    },
    {
      id: "moderator",
      name: "Community Moderator",
      description: "Helped moderate the community",
      icon: <FaGamepad className="text-xl text-white" />,
      bgColor: "bg-red-500/20 text-red-500",
      progress: 10
    },
    {
      id: "earlyAdopter",
      name: "Early Adopter",
      description: "Joined during platform launch",
      icon: <FaGamepad className="text-xl text-white" />,
      bgColor: "bg-amber-500/20 text-amber-500",
      progress: 100
    }
  ];
}