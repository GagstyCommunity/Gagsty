import { useState } from "react";
import { useLocation } from "wouter";
import { Helmet } from "react-helmet";
import { 
  FaGraduationCap, 
  FaSearch, 
  FaBook, 
  FaUserAlt, 
  FaCode, 
  FaTrophy, 
  FaArrowRight, 
  FaCalendarAlt,
  FaComment,
  FaStar
} from "react-icons/fa";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default function LearnHub() {
  const [, navigate] = useLocation();
  const [activeTab, setActiveTab] = useState("guides");
  const [searchQuery, setSearchQuery] = useState("");
  const [featuredArticle, setFeaturedArticle] = useState(guides[0]);
  
  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would filter the articles based on the search query
    console.log("Searching for:", searchQuery);
  };
  
  return (
    <>
      <Helmet>
        <title>Learn Hub - Gagsty</title>
        <meta name="description" content="Learn how to create winning game prompts, earn through Telegram Mini Apps, and stay updated with the latest gaming tech trends." />
      </Helmet>

      <section className="py-12 bg-gradient-to-b from-darkBase to-black min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Learn Hub Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <FaGraduationCap className="text-primary text-2xl" />
              <h1 className="text-3xl font-bold text-white">Learn Hub</h1>
            </div>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Master the art of game creation with guides, tutorials, and insights from top creators. Stay ahead with the latest news and trends.
            </p>
            
            {/* Search Form */}
            <form onSubmit={handleSearch} className="flex items-center relative mt-6 max-w-md mx-auto">
              <div className="absolute left-3 text-gray-400">
                <FaSearch />
              </div>
              <Input
                type="search"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-800 border-gray-700 text-white w-full"
              />
              <Button 
                type="submit" 
                className="absolute right-1 bg-primary hover:bg-primary/90 text-white h-8 px-3"
              >
                Search
              </Button>
            </form>
          </div>
          
          {/* Featured Article */}
          <div className="mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              <div className="lg:col-span-3 order-2 lg:order-1">
                <div className="space-y-4">
                  <Badge className="bg-primary text-white">Featured Article</Badge>
                  <h2 className="text-2xl font-bold text-white">{featuredArticle.title}</h2>
                  <div className="flex items-center text-sm text-gray-400 space-x-4">
                    <div className="flex items-center">
                      <FaUserAlt className="mr-1" />
                      <span>{featuredArticle.author}</span>
                    </div>
                    <div className="flex items-center">
                      <FaCalendarAlt className="mr-1" />
                      <span>{featuredArticle.date}</span>
                    </div>
                    <div className="flex items-center">
                      <FaComment className="mr-1" />
                      <span>{featuredArticle.comments} comments</span>
                    </div>
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                    {featuredArticle.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {featuredArticle.tags.map((tag, i) => (
                      <Badge key={i} className="bg-gray-700 text-white hover:bg-gray-600 cursor-pointer">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button 
                    className="bg-primary hover:bg-primary/90 text-white"
                    onClick={() => navigate(`/learn-hub/article/${featuredArticle.id}`)}
                  >
                    Read Full Article
                    <FaArrowRight className="ml-2" />
                  </Button>
                </div>
              </div>
              <div className="lg:col-span-2 order-1 lg:order-2">
                <div className="h-64 lg:h-full rounded-lg overflow-hidden">
                  <img 
                    src={featuredArticle.image} 
                    alt={featuredArticle.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Content Tabs */}
          <Tabs 
            defaultValue={activeTab} 
            value={activeTab} 
            onValueChange={setActiveTab} 
            className="space-y-8"
          >
            <div className="border-b border-gray-800 mb-4">
              <TabsList className="bg-transparent w-full max-w-3xl mx-auto justify-center">
                <TabsTrigger 
                  value="guides" 
                  className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent"
                >
                  <FaBook className="mr-2" />
                  Guides & Tutorials
                </TabsTrigger>
                <TabsTrigger 
                  value="interviews" 
                  className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent"
                >
                  <FaUserAlt className="mr-2" />
                  Creator Interviews
                </TabsTrigger>
                <TabsTrigger 
                  value="tech" 
                  className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent"
                >
                  <FaCode className="mr-2" />
                  Tech Updates
                </TabsTrigger>
                <TabsTrigger 
                  value="challenges" 
                  className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent"
                >
                  <FaTrophy className="mr-2" />
                  Challenges
                </TabsTrigger>
              </TabsList>
            </div>
            
            {/* Guides & Tutorials Tab */}
            <TabsContent value="guides" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Guides & Tutorials</h2>
                <Button variant="outline">View All</Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {guides.map((guide) => (
                  <Card 
                    key={guide.id} 
                    className="bg-gray-800 border-gray-700 hover:border-primary transition-all cursor-pointer"
                    onClick={() => navigate(`/learn-hub/article/${guide.id}`)}
                  >
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={guide.image} 
                        alt={guide.title} 
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-4">
                      <Badge className="mb-2 bg-green-500/20 text-green-500">
                        {guide.category}
                      </Badge>
                      <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">{guide.title}</h3>
                      <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                        {guide.excerpt}
                      </p>
                      <div className="flex justify-between items-center text-xs text-gray-400">
                        <div className="flex items-center">
                          <FaUserAlt className="mr-1" />
                          <span>{guide.author}</span>
                        </div>
                        <div className="flex items-center">
                          <FaCalendarAlt className="mr-1" />
                          <span>{guide.date}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            {/* Creator Interviews Tab */}
            <TabsContent value="interviews" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Creator Interviews</h2>
                <Button variant="outline">View All</Button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {interviews.map((interview) => (
                  <Card 
                    key={interview.id} 
                    className="bg-gray-800 border-gray-700 hover:border-primary transition-all cursor-pointer flex flex-col md:flex-row overflow-hidden"
                    onClick={() => navigate(`/learn-hub/interview/${interview.id}`)}
                  >
                    <div className="w-full md:w-1/3 h-48 md:h-auto flex-shrink-0">
                      <img 
                        src={interview.image} 
                        alt={interview.person} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-4 flex-1">
                      <Badge className="mb-2 bg-blue-500/20 text-blue-500">
                        Interview
                      </Badge>
                      <h3 className="text-lg font-bold text-white mb-1">
                        {interview.person}
                      </h3>
                      <div className="text-sm text-primary mb-2">
                        {interview.role}
                      </div>
                      <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                        {interview.excerpt}
                      </p>
                      <div className="flex justify-between items-center text-xs text-gray-400">
                        <div className="flex items-center">
                          <FaUserAlt className="mr-1" />
                          <span>By {interview.interviewer}</span>
                        </div>
                        <div className="flex items-center">
                          <FaCalendarAlt className="mr-1" />
                          <span>{interview.date}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            {/* Tech Updates Tab */}
            <TabsContent value="tech" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Tech Stack Updates</h2>
                <Button variant="outline">View All</Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {techUpdates.map((update) => (
                  <Card 
                    key={update.id} 
                    className="bg-gray-800 border-gray-700 hover:border-primary transition-all cursor-pointer"
                    onClick={() => navigate(`/learn-hub/tech/${update.id}`)}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <Badge className="bg-purple-500/20 text-purple-500">
                          {update.category}
                        </Badge>
                        <div className="text-xs text-gray-400 flex items-center">
                          <FaCalendarAlt className="mr-1" />
                          <span>{update.date}</span>
                        </div>
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">{update.title}</h3>
                      <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                        {update.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          {update.techIcons.map((icon, i) => (
                            <div key={i} className="bg-gray-700 w-6 h-6 rounded-full flex items-center justify-center mr-1">
                              {icon === "react" && <span className="text-blue-400 text-xs">R</span>}
                              {icon === "ai" && <span className="text-green-400 text-xs">AI</span>}
                              {icon === "tg" && <span className="text-blue-400 text-xs">TG</span>}
                            </div>
                          ))}
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-xs text-primary hover:text-primary/80"
                        >
                          Read More <FaArrowRight className="ml-1" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            {/* Challenges Tab */}
            <TabsContent value="challenges" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Challenges & Competitions</h2>
                <Button variant="outline">View All</Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {challenges.map((challenge) => (
                  <Card 
                    key={challenge.id} 
                    className={`bg-gray-800 border-gray-700 hover:border-primary transition-all cursor-pointer overflow-hidden ${
                      challenge.status === "active" ? "border-l-4 border-l-green-500" : 
                      challenge.status === "upcoming" ? "border-l-4 border-l-blue-500" : 
                      "border-l-4 border-l-gray-500"
                    }`}
                  >
                    <div className="relative h-48">
                      <img 
                        src={challenge.image} 
                        alt={challenge.title} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <Badge className={
                          challenge.status === "active" ? "bg-green-500" : 
                          challenge.status === "upcoming" ? "bg-blue-500" : 
                          "bg-gray-500"
                        }>
                          {challenge.status === "active" ? "Active Challenge" : 
                           challenge.status === "upcoming" ? "Coming Soon" : 
                           "Completed"}
                        </Badge>
                        <h3 className="text-xl font-bold text-white mt-2">{challenge.title}</h3>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center mb-3 text-sm">
                        <div className="text-gray-400">
                          {challenge.status === "active" ? 
                            `Ends on ${challenge.endDate}` : 
                            challenge.status === "upcoming" ? 
                            `Starts on ${challenge.startDate}` : 
                            `Completed on ${challenge.endDate}`
                          }
                        </div>
                        <div className="text-[#FFCF44] font-medium flex items-center">
                          <FaStar className="mr-1" /> 
                          {challenge.prize} Chips Prize
                        </div>
                      </div>
                      <p className="text-gray-400 text-sm mb-4">
                        {challenge.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <div className="text-xs text-gray-500">
                          {challenge.status === "active" ? 
                            `${challenge.participants} participants` : 
                            challenge.status === "upcoming" ? 
                            "Registration opens soon" : 
                            `Winner: ${challenge.winner}`
                          }
                        </div>
                        <Button 
                          className={
                            challenge.status === "active" ? "bg-primary text-white" : 
                            challenge.status === "upcoming" ? "bg-blue-500 text-white" : 
                            "bg-gray-700 text-white"
                          }
                          size="sm"
                        >
                          {challenge.status === "active" ? "Join Now" : 
                           challenge.status === "upcoming" ? "Get Notified" : 
                           "View Results"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
          
          {/* Newsletter Section */}
          <div className="mt-16 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-lg border border-gray-800 p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Stay Updated</h3>
                <p className="text-gray-300 mb-4">
                  Get the latest guides, creator interviews, and tech updates delivered directly to your inbox.
                </p>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center">
                    <span className="inline-block w-4 h-4 bg-primary rounded-full mr-2"></span>
                    Weekly game creation tips
                  </li>
                  <li className="flex items-center">
                    <span className="inline-block w-4 h-4 bg-primary rounded-full mr-2"></span>
                    Early access to new features
                  </li>
                  <li className="flex items-center">
                    <span className="inline-block w-4 h-4 bg-primary rounded-full mr-2"></span>
                    Exclusive interviews with top creators
                  </li>
                </ul>
              </div>
              <div>
                <form className="space-y-3">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="bg-gray-800/80 border-gray-700 text-white"
                  />
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                    Subscribe to Newsletter
                  </Button>
                  <div className="text-xs text-gray-400 text-center">
                    We respect your privacy. Unsubscribe at any time.
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// Sample data for the Learn Hub
const guides = [
  {
    id: 1,
    title: "How to Write a Winning Prompt for AI Game Creation",
    excerpt: "Learn the key components of crafting effective prompts that will translate into engaging, playable games. This comprehensive guide covers principles of clear instruction, thematic consistency, and mechanics specification.",
    author: "Prompt Master",
    date: "May 5, 2023",
    category: "Game Creation",
    comments: 48,
    image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&w=800&q=60",
    tags: ["Prompts", "AI", "Game Design", "Tutorial"]
  },
  {
    id: 2,
    title: "Earn $1000 from Your Telegram Mini App Game: A Complete Guide",
    excerpt: "A step-by-step tutorial on monetizing your Telegram Mini App games, from initial setup to implementing multiple revenue streams like ads, in-app purchases, and premium content.",
    author: "Monetization Expert",
    date: "June 12, 2023",
    category: "Monetization",
    comments: 32,
    image: "https://images.unsplash.com/photo-1579621970795-87facc2f976d?auto=format&fit=crop&w=800&q=60",
    tags: ["Telegram", "Mini App", "Monetization", "Revenue"]
  },
  {
    id: 3,
    title: "Game Marketing Hacks: How to Get 10,000+ Players in Week One",
    excerpt: "Discover proven marketing strategies specifically for indie game developers and AI game creators. Learn how to leverage social media, community building, and strategic partnerships.",
    author: "Growth Strategist",
    date: "July 24, 2023",
    category: "Marketing",
    comments: 56,
    image: "https://images.unsplash.com/photo-1569309338532-a0bce7f0b963?auto=format&fit=crop&w=800&q=60",
    tags: ["Marketing", "Growth", "Audience", "Promotion"]
  },
];

const interviews = [
  {
    id: 1,
    person: "Alex Chen",
    role: "Indie Game Developer & AI Enthusiast",
    excerpt: "In this exclusive interview, Alex shares his journey from traditional game development to embracing AI-powered tools, and how he created a viral game with over 500,000 plays.",
    interviewer: "Creator Spotlight Team",
    date: "August 2, 2023",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=60"
  },
  {
    id: 2,
    person: "Sarah Johnson",
    role: "Telegram Mini App Pioneer",
    excerpt: "Sarah discusses her strategy for creating mini apps that engage users and generate significant revenue. Learn about her approach to game mechanics that work specifically within the Telegram ecosystem.",
    interviewer: "Platform Success Team",
    date: "September 14, 2023",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=60"
  },
];

const techUpdates = [
  {
    id: 1,
    title: "Introducing Enhanced AI Image Generation for Game Assets",
    excerpt: "Our new AI system can now generate game-ready sprites, backgrounds, and UI elements that match your game's theme and style. Learn how to use these new features in your creation process.",
    category: "Platform Update",
    date: "October 10, 2023",
    techIcons: ["ai"]
  },
  {
    id: 2,
    title: "New Telegram Mini App Features You Should Be Using",
    excerpt: "Telegram has released new capabilities for Mini Apps that open up exciting gameplay possibilities. This technical update covers implementation details and best practices.",
    category: "Telegram Features",
    date: "November 5, 2023",
    techIcons: ["tg"]
  },
  {
    id: 3,
    title: "Performance Optimization Tips for Web-Based Games",
    excerpt: "Learn how to optimize your web games for maximum performance across devices. This technical guide covers asset loading, rendering techniques, and memory management.",
    category: "Web Development",
    date: "November 22, 2023",
    techIcons: ["react"]
  },
];

const challenges = [
  {
    id: 1,
    title: "Cyberpunk Game Challenge",
    description: "Create a cyberpunk-themed game with futuristic elements and a dystopian storyline. The best games will be featured on our platform and receive chip rewards.",
    status: "active",
    startDate: "December 1, 2023",
    endDate: "December 15, 2023",
    prize: "5,000",
    participants: 47,
    winner: null,
    image: "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?auto=format&fit=crop&w=800&q=60"
  },
  {
    id: 2,
    title: "Educational Games Jam",
    description: "Design games that teach coding concepts to beginners while being entertaining. A panel of educational experts will judge the entries based on learning value and engagement.",
    status: "upcoming",
    startDate: "January 5, 2024",
    endDate: "January 20, 2024",
    prize: "3,500",
    participants: 0,
    winner: null,
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=60"
  },
];