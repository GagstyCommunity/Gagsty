import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { FaArrowRight, FaCoins, FaTelegram, FaMagic } from "react-icons/fa";
import { GAME_STATS } from "@/config/constants";

const Hero = () => {
  const [, setLocation] = useLocation();

  return (
    <section className="bg-darkBase hero-pattern pt-10 pb-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="font-poppins font-bold text-4xl md:text-5xl lg:text-6xl leading-tight">
              <span className="text-white">Turn Your Idea into a</span>
              <span className="text-primary block md:inline"> Game</span>
              <span className="text-white block mt-2">in Minutes.</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-lg">
              <span className="bg-secondary/20 px-2 py-1 rounded text-secondary font-medium">No Code.</span>
              <span className="bg-accent/20 px-2 py-1 rounded text-accent font-medium ml-2">AI Powered.</span>
              <span className="bg-[#FFCF44]/20 px-2 py-1 rounded text-[#FFCF44] font-medium ml-2">Play-to-Own.</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                onClick={() => setLocation("/create-game")}
                className="bg-primary hover:bg-primary/90 text-white primary-glow"
                size="lg"
              >
                Create Game Now
                <FaArrowRight className="ml-2" />
              </Button>
              <Button
                variant="default"
                className="bg-[#229ED9] hover:bg-[#229ED9]/90 text-white telegram-glow"
                size="lg"
              >
                <FaTelegram className="mr-2" />
                Join Community
              </Button>
              <Button
                variant="outline"
                className="border-secondary/70 text-secondary bg-transparent hover:bg-secondary/10 accent-glow"
                size="lg"
              >
                <FaCoins className="mr-2" />
                Earn Gagsty Chips
              </Button>
            </div>
            <div className="flex items-center justify-start space-x-10 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">{GAME_STATS.totalGames.toLocaleString()}+</div>
                <div className="text-sm text-gray-400">Games Created</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#FF8855]">{GAME_STATS.activeUsers.toLocaleString()}+</div>
                <div className="text-sm text-gray-400">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary">{(GAME_STATS.chipsEarned / 1000000).toLocaleString()}M+</div>
                <div className="text-sm text-gray-400">Chips Earned</div>
              </div>
            </div>
          </div>
          <div className="relative">
            {/* Game demo animation */}
            <div className="relative rounded-xl overflow-hidden gradient-card border border-gray-800">
              {/* Animated demo showing prompt to game conversion */}
              <div className="absolute top-4 left-4 z-10 bg-darkBase/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-gray-300 border border-gray-700">
                <FaMagic className="text-primary inline mr-1" /> Prompt → Game Demo
              </div>
              {/* A gaming interface with futuristic elements */}
              <img 
                src="https://images.unsplash.com/photo-1605379399642-870262d3d051?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=800" 
                alt="Futuristic gaming interface" 
                className="w-full h-auto object-cover" 
              />
            </div>
            
            {/* Prompt input box floating above */}
            <div className="absolute -top-10 -left-10 max-w-xs p-4 bg-gray-800/90 backdrop-blur-md rounded-lg border border-gray-700 shadow-xl animate-float hidden lg:block">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full bg-destructive"></div>
                <div className="w-3 h-3 rounded-full bg-[#FFCF44]"></div>
                <div className="w-3 h-3 rounded-full bg-secondary"></div>
                <div className="text-xs text-gray-400 ml-2">Prompt Input</div>
              </div>
              <p className="text-sm text-gray-300">Create a 2D space shooter with powerups and 3 enemy types. Retro pixel art style with neon effects.</p>
            </div>
            
            {/* Result box floating to the right */}
            <div className="absolute -bottom-8 -right-6 max-w-xs p-4 bg-gray-800/90 backdrop-blur-md rounded-lg border border-gray-700 shadow-xl animate-float animation-delay-1000 hidden lg:block">
              <div className="text-xs text-right text-gray-400 mb-2">Game Generated <span className="text-secondary">✓</span></div>
              <div className="flex justify-between items-center gap-4">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-lg gradient-card border border-accent/30 flex items-center justify-center">
                    <FaArrowRight className="text-2xl text-accent" />
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-medium">Neon Space Blaster</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs bg-[#229ED9]/20 text-[#229ED9] px-2 py-0.5 rounded">Telegram</span>
                    <span className="text-xs bg-secondary/20 text-secondary px-2 py-0.5 rounded">Web</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Decorative elements */}
      <div className="absolute top-1/3 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl"></div>
    </section>
  );
};

export default Hero;
