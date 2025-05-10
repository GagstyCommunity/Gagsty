import { useState } from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { 
  FaGamepad, 
  FaCheckCircle, 
  FaTimesCircle, 
  FaUserFriends, 
  FaCoins, 
  FaTrophy, 
  FaBullhorn, 
  FaHandshake 
} from "react-icons/fa";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { type Game, type User } from "@shared/schema";

export default function AdminDashboard() {
  const [, navigate] = useLocation();
  const [activeTab, setActiveTab] = useState("pending-games");
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [isGameDialogOpen, setIsGameDialogOpen] = useState(false);
  
  // Check if user is admin (this would typically be done via a proper authorization check)
  const [isAdmin, setIsAdmin] = useState(true); // For demo purposes, always true
  
  // Fetch pending games
  const { data: pendingGames, isLoading: isLoadingPending } = useQuery<Game[]>({
    queryKey: ["/api/games", { status: "pending" }],
  });

  // Fetch all users
  const { data: users, isLoading: isLoadingUsers } = useQuery<User[]>({
    queryKey: ["/api/admin/users"],
    enabled: isAdmin,
  });

  // Loading state for all queries
  const isLoading = isLoadingPending || isLoadingUsers;

  // If not admin, redirect to home
  if (!isAdmin) {
    navigate("/");
    return null;
  }

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - Gagsty</title>
        <meta name="description" content="Admin dashboard for Gagsty platform." />
      </Helmet>

      <section className="py-12 bg-gradient-to-b from-darkBase to-black min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Admin Dashboard Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-2">
              <Badge className="bg-red-500 text-white">Admin Only</Badge>
              <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-center">
                    <div className="rounded-full bg-amber-500/20 p-3 mr-3">
                      <FaGamepad className="text-amber-500" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Pending Games</div>
                      <div className="text-xl font-bold text-white">{pendingGames?.length || 0}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-center">
                    <div className="rounded-full bg-blue-500/20 p-3 mr-3">
                      <FaUserFriends className="text-blue-500" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Total Users</div>
                      <div className="text-xl font-bold text-white">{users?.length || 0}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-center">
                    <div className="rounded-full bg-green-500/20 p-3 mr-3">
                      <FaCoins className="text-green-500" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Chips Issued</div>
                      <div className="text-xl font-bold text-white">128,546</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-center">
                    <div className="rounded-full bg-purple-500/20 p-3 mr-3">
                      <FaTrophy className="text-purple-500" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Active Competitions</div>
                      <div className="text-xl font-bold text-white">3</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Admin Dashboard Tabs */}
          <Tabs defaultValue="pending-games" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid grid-cols-5 max-w-3xl bg-gray-800/50">
              <TabsTrigger value="pending-games" className="data-[state=active]:bg-primary">
                <FaGamepad className="mr-2" />
                <span className="hidden sm:inline">Pending Games</span>
              </TabsTrigger>
              <TabsTrigger value="moderation" className="data-[state=active]:bg-primary">
                <FaUserFriends className="mr-2" />
                <span className="hidden sm:inline">Moderation</span>
              </TabsTrigger>
              <TabsTrigger value="chips" className="data-[state=active]:bg-primary">
                <FaCoins className="mr-2" />
                <span className="hidden sm:inline">Chip Management</span>
              </TabsTrigger>
              <TabsTrigger value="competitions" className="data-[state=active]:bg-primary">
                <FaBullhorn className="mr-2" />
                <span className="hidden sm:inline">Competitions</span>
              </TabsTrigger>
              <TabsTrigger value="partners" className="data-[state=active]:bg-primary">
                <FaHandshake className="mr-2" />
                <span className="hidden sm:inline">Partners</span>
              </TabsTrigger>
            </TabsList>

            {/* Loading State */}
            {isLoading && (
              <div className="flex items-center justify-center py-20">
                <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
              </div>
            )}

            {/* Pending Games Tab */}
            <TabsContent value="pending-games" className="space-y-6">
              <h2 className="text-2xl font-bold text-white">Pending Game Approvals</h2>
              
              {pendingGames && pendingGames.length > 0 ? (
                <div className="space-y-4">
                  {pendingGames.map((game) => (
                    <Card key={game.id} className="bg-gray-800 border-gray-700">
                      <CardContent className="p-4">
                        <div className="flex flex-col lg:flex-row items-start lg:items-center">
                          <div className="w-full lg:w-20 h-20 rounded overflow-hidden flex-shrink-0 mb-4 lg:mb-0 lg:mr-4">
                            <img 
                              src={game.thumbnail || "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=800&q=60"} 
                              alt={game.title} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-2">
                              <h3 className="text-lg font-bold text-white">{game.title}</h3>
                              <div className="flex items-center mt-2 lg:mt-0">
                                <Badge className="mr-2 bg-yellow-500 text-white">
                                  {game.status}
                                </Badge>
                                <Badge className="bg-gray-700 text-white">
                                  {game.gameType}
                                </Badge>
                              </div>
                            </div>
                            
                            <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                              {game.description || game.prompt || "No description provided."}
                            </p>
                            
                            <div className="flex flex-wrap justify-end mt-4 space-x-2">
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="text-xs"
                                onClick={() => {
                                  setSelectedGame(game);
                                  setIsGameDialogOpen(true);
                                }}
                              >
                                Review Details
                              </Button>
                              <Button 
                                size="sm" 
                                className="bg-green-600 hover:bg-green-700 text-white text-xs"
                              >
                                <FaCheckCircle className="mr-1" />
                                Approve
                              </Button>
                              <Button 
                                size="sm" 
                                className="bg-red-600 hover:bg-red-700 text-white text-xs"
                              >
                                <FaTimesCircle className="mr-1" />
                                Reject
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-gray-800/50 rounded-lg border border-gray-700">
                  <FaGamepad className="text-4xl text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-white mb-2">No Pending Games</h3>
                  <p className="text-gray-400 max-w-md mx-auto">
                    There are no games waiting for approval. Check back later.
                  </p>
                </div>
              )}
              
              {/* Game Review Dialog */}
              <Dialog open={isGameDialogOpen} onOpenChange={setIsGameDialogOpen}>
                <DialogContent className="bg-gray-900 text-white border-gray-700 max-w-4xl">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-bold">
                      Review Game: {selectedGame?.title}
                    </DialogTitle>
                  </DialogHeader>
                  
                  {selectedGame && (
                    <div className="space-y-4 mt-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <div className="rounded-lg overflow-hidden mb-4">
                            <img 
                              src={selectedGame.thumbnail || "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=800&q=60"} 
                              alt={selectedGame.title} 
                              className="w-full h-48 object-cover"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <div>
                              <span className="text-gray-400 text-sm">Game Type:</span>
                              <span className="ml-2 text-white">{selectedGame.gameType}</span>
                            </div>
                            <div>
                              <span className="text-gray-400 text-sm">Creator ID:</span>
                              <span className="ml-2 text-white">{selectedGame.creatorId}</span>
                            </div>
                            <div>
                              <span className="text-gray-400 text-sm">Created At:</span>
                              <span className="ml-2 text-white">
                                {selectedGame.createdAt ? new Date(selectedGame.createdAt).toLocaleString() : "Unknown"}
                              </span>
                            </div>
                            <div>
                              <span className="text-gray-400 text-sm">Monetization:</span>
                              <div className="flex flex-wrap mt-1 space-x-2">
                                {selectedGame.monetization && selectedGame.monetization.map((type, i) => (
                                  <Badge key={i} className="bg-gray-700">{type}</Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <h3 className="text-white font-medium mb-2">Original Prompt</h3>
                            <div className="p-3 bg-gray-800 rounded-lg text-gray-300 text-sm">
                              {selectedGame.prompt}
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="text-white font-medium mb-2">Description</h3>
                            <div className="p-3 bg-gray-800 rounded-lg text-gray-300 text-sm">
                              {selectedGame.description || "No description provided."}
                            </div>
                          </div>
                          
                          {selectedGame.telegramMiniAppData && (
                            <div>
                              <h3 className="text-white font-medium mb-2">Telegram Mini App Data</h3>
                              <div className="p-3 bg-gray-800 rounded-lg text-gray-300 text-sm">
                                <pre className="whitespace-pre-wrap">
                                  {JSON.stringify(selectedGame.telegramMiniAppData || {}, null, 2)}
                                </pre>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex justify-end space-x-3 mt-6">
                        <Button 
                          variant="outline" 
                          onClick={() => setIsGameDialogOpen(false)}
                        >
                          Close
                        </Button>
                        <Button 
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          <FaCheckCircle className="mr-2" />
                          Approve Game
                        </Button>
                        <Button 
                          className="bg-red-600 hover:bg-red-700 text-white"
                        >
                          <FaTimesCircle className="mr-2" />
                          Reject Game
                        </Button>
                      </div>
                    </div>
                  )}
                </DialogContent>
              </Dialog>
            </TabsContent>

            {/* Moderation Tab */}
            <TabsContent value="moderation" className="space-y-6">
              <h2 className="text-2xl font-bold text-white">Community Moderation</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-4">
                    <h3 className="text-lg font-medium text-white mb-4">Reported Content</h3>
                    
                    <div className="space-y-3">
                      {Array.from({ length: 3 }).map((_, index) => (
                        <div key={index} className="p-3 bg-gray-700/50 rounded-lg">
                          <div className="flex justify-between">
                            <div>
                              <Badge className="bg-red-500/20 text-red-500 mb-2">
                                {index === 0 ? "Inappropriate Content" : 
                                 index === 1 ? "Spam" : "Copyright Violation"}
                              </Badge>
                              <p className="text-sm text-white mb-1">
                                {index === 0 ? "Comment contains offensive language" : 
                                 index === 1 ? "User posting repetitive promotional content" : 
                                 "Game uses copyrighted characters"}
                              </p>
                              <div className="text-xs text-gray-400">
                                Reported {index + 1} {index === 0 ? "hour" : "hours"} ago by User#{Math.floor(Math.random() * 1000) + 1}
                              </div>
                            </div>
                            <div className="flex space-x-1">
                              <Button size="sm" variant="ghost" className="text-xs h-7 px-2">
                                Ignore
                              </Button>
                              <Button size="sm" variant="destructive" className="text-xs h-7 px-2">
                                Take Action
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-4">
                    <h3 className="text-lg font-medium text-white mb-4">User Management</h3>
                    
                    <div className="space-y-3">
                      {Array.from({ length: 4 }).map((_, index) => (
                        <div key={index} className="p-3 bg-gray-700/50 rounded-lg flex justify-between items-center">
                          <div>
                            <div className="text-white font-medium">User#{Math.floor(Math.random() * 1000) + 1}</div>
                            <div className="text-xs text-gray-400">Joined {Math.floor(Math.random() * 12) + 1} months ago</div>
                          </div>
                          <div className="flex space-x-2">
                            <Badge className={
                              index === 0 ? "bg-green-500/20 text-green-500" : 
                              index === 1 ? "bg-amber-500/20 text-amber-500" :
                              index === 2 ? "bg-red-500/20 text-red-500" :
                              "bg-gray-500/20 text-gray-500"
                            }>
                              {index === 0 ? "Active" : 
                               index === 1 ? "Warning" :
                               index === 2 ? "Suspended" :
                               "Pending Review"}
                            </Badge>
                            <Button size="sm" variant="outline" className="h-7 px-2 text-xs">
                              View
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Chip Management Tab */}
            <TabsContent value="chips" className="space-y-6">
              <h2 className="text-2xl font-bold text-white">Chip & Badge Management</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-4">
                    <h3 className="text-lg font-medium text-white mb-3">Chip Economy Overview</h3>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Total Chips Issued</span>
                        <span className="text-[#FFCF44] font-bold">128,546</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Chips in Circulation</span>
                        <span className="text-[#FFCF44] font-bold">98,372</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Burned/Redeemed</span>
                        <span className="text-[#FFCF44] font-bold">30,174</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Average per User</span>
                        <span className="text-[#FFCF44] font-bold">384</span>
                      </div>
                    </div>
                    
                    <Button className="w-full mt-4" variant="outline">
                      Generate Detailed Report
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-4">
                    <h3 className="text-lg font-medium text-white mb-3">Issue Chips</h3>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm text-gray-400">Recipient User ID</label>
                        <input 
                          type="text" 
                          className="w-full p-2 rounded border border-gray-700 bg-gray-900 text-white"
                          placeholder="Enter user ID"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm text-gray-400">Chips Amount</label>
                        <input 
                          type="number" 
                          className="w-full p-2 rounded border border-gray-700 bg-gray-900 text-white"
                          placeholder="Enter amount"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm text-gray-400">Reason</label>
                        <select className="w-full p-2 rounded border border-gray-700 bg-gray-900 text-white">
                          <option>Contest Winner</option>
                          <option>Game Creation Bonus</option>
                          <option>Platform Contribution</option>
                          <option>Bug Bounty</option>
                          <option>Other</option>
                        </select>
                      </div>
                      
                      <Button className="w-full bg-primary">
                        Issue Chips
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-4">
                    <h3 className="text-lg font-medium text-white mb-3">Badge Management</h3>
                    
                    <div className="space-y-3">
                      {["Beginner", "Game Tester", "Game Developer", "Growth Hacker", "Community Moderator"].map((badge, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
                              index === 0 ? "bg-green-500/20" : 
                              index === 1 ? "bg-blue-500/20" :
                              index === 2 ? "bg-purple-500/20" :
                              index === 3 ? "bg-amber-500/20" :
                              "bg-red-500/20"
                            }`}>
                              <FaTrophy className={
                                index === 0 ? "text-green-500" : 
                                index === 1 ? "text-blue-500" :
                                index === 2 ? "text-purple-500" :
                                index === 3 ? "text-amber-500" :
                                "text-red-500"
                              } />
                            </div>
                            <span className="text-white">{badge}</span>
                          </div>
                          <Button size="sm" variant="outline" className="text-xs">
                            Edit
                          </Button>
                        </div>
                      ))}
                      
                      <Button className="w-full mt-2" variant="outline">
                        Create New Badge
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-4">
                  <h3 className="text-lg font-medium text-white mb-3">Recent Chip Transactions</h3>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead className="bg-gray-900">
                        <tr>
                          <th className="p-3 text-xs text-gray-400">Timestamp</th>
                          <th className="p-3 text-xs text-gray-400">User ID</th>
                          <th className="p-3 text-xs text-gray-400">Amount</th>
                          <th className="p-3 text-xs text-gray-400">Type</th>
                          <th className="p-3 text-xs text-gray-400">Source</th>
                          <th className="p-3 text-xs text-gray-400">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-800">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <tr key={index} className="hover:bg-gray-800/50">
                            <td className="p-3 text-xs text-white">
                              {new Date(Date.now() - index * 3600000).toLocaleString()}
                            </td>
                            <td className="p-3 text-xs text-white">
                              User#{Math.floor(Math.random() * 1000) + 1}
                            </td>
                            <td className="p-3 text-xs">
                              <span className={index % 3 === 0 ? "text-red-400" : "text-green-400"}>
                                {index % 3 === 0 ? "-" : "+"}{Math.floor(Math.random() * 500) + 50}
                              </span>
                            </td>
                            <td className="p-3 text-xs text-white">
                              {index % 4 === 0 ? "Reward" : 
                               index % 4 === 1 ? "Game Creation" : 
                               index % 4 === 2 ? "Redemption" : 
                               "Referral"}
                            </td>
                            <td className="p-3 text-xs text-white">
                              {index % 3 === 0 ? "Admin" : 
                               index % 3 === 1 ? "Automatic" : 
                               "Game Plays"}
                            </td>
                            <td className="p-3 text-xs">
                              <Badge className="bg-green-500/20 text-green-500">
                                Completed
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Competitions Tab */}
            <TabsContent value="competitions" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Prompt Competitions</h2>
                <Button className="bg-primary text-white">Create New Competition</Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {Array.from({ length: 3 }).map((_, index) => (
                  <Card key={index} className={`bg-gray-800 border-gray-700 ${
                    index === 0 ? "border-l-4 border-l-green-500" : 
                    index === 1 ? "border-l-4 border-l-amber-500" : 
                    "border-l-4 border-l-blue-500"
                  }`}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-medium text-white">
                          {index === 0 ? "Cyberpunk Game Contest" : 
                           index === 1 ? "Fantasy RPG Challenge" : 
                           "Educational Game Jam"}
                        </h3>
                        <Badge className={
                          index === 0 ? "bg-green-500/20 text-green-500" : 
                          index === 1 ? "bg-amber-500/20 text-amber-500" : 
                          "bg-blue-500/20 text-blue-500"
                        }>
                          {index === 0 ? "Active" : 
                           index === 1 ? "Ending Soon" : 
                           "Upcoming"}
                        </Badge>
                      </div>
                      
                      <p className="text-gray-400 text-sm my-3">
                        {index === 0 ? "Create a cyberpunk-themed game with futuristic elements and dystopian storyline." : 
                         index === 1 ? "Design a fantasy RPG with unique character classes and magic system." : 
                         "Develop educational games that teach coding concepts to beginners."}
                      </p>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">Submissions</span>
                          <span className="text-white">{10 + index * 8}/50</span>
                        </div>
                        <Progress value={(10 + index * 8) * 2} className="h-1" />
                      </div>
                      
                      <div className="flex items-center justify-between mt-4">
                        <div>
                          <div className="text-xs text-gray-400">Prize Pool</div>
                          <div className="text-[#FFCF44] font-bold">{5000 - index * 1000} Chips</div>
                        </div>
                        
                        <div>
                          <div className="text-xs text-gray-400">Ends In</div>
                          <div className="text-white">
                            {index === 0 ? "3 days" : 
                             index === 1 ? "12 hours" : 
                             "Starts in 2 days"}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-end mt-4 space-x-2">
                        <Button variant="outline" size="sm" className="text-xs">View Details</Button>
                        <Button className="bg-primary text-white text-xs" size="sm">Manage</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Partners Tab */}
            <TabsContent value="partners" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Partner & Investor Management</h2>
                <Button className="bg-primary text-white">Add New Partner</Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {Array.from({ length: 3 }).map((_, index) => (
                  <Card key={index} className="bg-gray-800 border-gray-700">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div className="w-12 h-12 rounded bg-gray-700 flex items-center justify-center">
                          <FaHandshake className="text-gray-400" />
                        </div>
                        <Badge className={
                          index === 0 ? "bg-blue-500" : 
                          index === 1 ? "bg-purple-500" : 
                          "bg-amber-500"
                        }>
                          {index === 0 ? "Integration Partner" : 
                           index === 1 ? "Investor" : 
                           "Marketing Partner"}
                        </Badge>
                      </div>
                      
                      <h3 className="text-lg font-medium text-white mb-1">
                        {index === 0 ? "TechCorp Solutions" : 
                         index === 1 ? "Venture Capital Fund" : 
                         "Digital Marketing Agency"}
                      </h3>
                      
                      <p className="text-sm text-gray-400 mb-3">
                        {index === 0 ? "API integration and development support" : 
                         index === 1 ? "Series A investor with gaming focus" : 
                         "Cross-promotion and user acquisition partner"}
                      </p>
                      
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Partnership Start</span>
                          <span className="text-white">
                            {new Date(Date.now() - (index + 1) * 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Contact Person</span>
                          <span className="text-white">
                            {index === 0 ? "John Smith" : 
                             index === 1 ? "Sarah Johnson" : 
                             "Mike Thompson"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Current Status</span>
                          <span className="text-green-400">Active</span>
                        </div>
                      </div>
                      
                      <div className="flex justify-end mt-4 space-x-2">
                        <Button variant="outline" size="sm" className="text-xs">View Details</Button>
                        <Button variant="outline" size="sm" className="text-xs">Edit</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-4">
                  <h3 className="text-lg font-medium text-white mb-3">Partnership Requests</h3>
                  
                  <div className="divide-y divide-gray-700">
                    {Array.from({ length: 3 }).map((_, index) => (
                      <div key={index} className="py-3 flex justify-between items-center">
                        <div>
                          <div className="text-white font-medium">
                            {index === 0 ? "Game Studio Inc." : 
                             index === 1 ? "Angel Investor Group" : 
                             "Educational Platform"}
                          </div>
                          <div className="text-xs text-gray-400">
                            Requested {index + 1} {index === 0 ? "day" : "days"} ago • 
                            {index === 0 ? " Integration" : 
                             index === 1 ? " Investment" : 
                             " Content"}
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" className="text-xs">
                            View
                          </Button>
                          <Button size="sm" className="bg-primary text-white text-xs">
                            Respond
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </>
  );
}