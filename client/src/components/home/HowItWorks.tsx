import { PLATFORM_FEATURES } from "@/config/constants";
import { 
  FaArrowRight, 
  FaCode, 
  FaBrain, 
  FaShareAlt, 
  FaUsers, 
  FaEquals, 
  FaPlus, 
  FaCoins,
  FaTelegram,
  FaGlobe,
  FaCubes
} from "react-icons/fa";
import { FaRocket } from "react-icons/fa6";

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-b from-darkBase to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold font-poppins text-white mb-4">How It <span className="text-primary">Works</span></h2>
          <p className="max-w-2xl mx-auto text-gray-400">From idea to playable game in just a few simple steps. No coding required.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Step 1 */}
          <div className="gradient-card rounded-xl p-6 border border-gray-800 hover:border-primary/50 transition-all primary-glow card-hover glass-effect">
            <div className="w-12 h-12 flex items-center justify-center bg-primary/20 rounded-full mb-6">
              <span className="text-xl font-bold font-poppins text-primary">1</span>
            </div>
            <h3 className="text-xl font-medium text-white mb-3">Write a Game Prompt</h3>
            <p className="text-gray-400 mb-4">Describe your game idea, genre, characters, and mechanics in simple language.</p>
            <div className="bg-gray-800/60 p-3 rounded-lg border border-gray-700">
              <p className="text-sm text-gray-300 italic">"Create a 2D platformer with a ninja character who can wall-jump and throw shurikens."</p>
            </div>
          </div>
          
          {/* Step 2 */}
          <div className="gradient-card rounded-xl p-6 border border-gray-800 hover:border-accent/50 transition-all accent-glow">
            <div className="w-12 h-12 flex items-center justify-center bg-accent/20 rounded-full mb-6">
              <span className="text-xl font-bold font-poppins text-accent">2</span>
            </div>
            <h3 className="text-xl font-medium text-white mb-3">AI + Gagsty Engine</h3>
            <p className="text-gray-400 mb-4">Our AI technology transforms your prompt into game logic, assets, and mechanics.</p>
            {/* An illustration of AI processing and game development process */}
            <div className="bg-gray-800/60 p-3 rounded-lg border border-gray-700 h-20 flex items-center justify-center">
              <div className="flex items-center">
                <div className="text-primary"><FaCode className="text-lg" /></div>
                <div className="mx-2 text-white"><FaArrowRight className="text-sm" /></div>
                <div className="text-accent"><FaBrain className="text-lg" /></div>
                <div className="mx-2 text-white"><FaArrowRight className="text-sm" /></div>
                <div className="text-secondary"><FaRocket className="text-lg" /></div>
              </div>
            </div>
          </div>
          
          {/* Step 3 */}
          <div className="gradient-card rounded-xl p-6 border border-gray-800 hover:border-[#229ED9]/50 transition-all telegram-glow">
            <div className="w-12 h-12 flex items-center justify-center bg-[#229ED9]/20 rounded-full mb-6">
              <span className="text-xl font-bold font-poppins text-[#229ED9]">3</span>
            </div>
            <h3 className="text-xl font-medium text-white mb-3">Auto-Deployment</h3>
            <p className="text-gray-400 mb-4">Your game is instantly deployed as a Telegram Mini App and web version.</p>
            <div className="flex gap-3">
              <div className="bg-[#229ED9]/20 p-3 rounded-lg border border-[#229ED9]/40 flex-1 flex items-center">
                <FaTelegram className="text-[#229ED9] mr-2" />
                <span className="text-sm text-gray-300">Mini App</span>
              </div>
              <div className="bg-gray-800/60 p-3 rounded-lg border border-gray-700 flex-1 flex items-center">
                <FaGlobe className="text-accent mr-2" />
                <span className="text-sm text-gray-300">Web Game</span>
              </div>
            </div>
          </div>
          
          {/* Step 4 */}
          <div className="gradient-card rounded-xl p-6 border border-gray-800 hover:border-secondary/50 transition-all accent-glow">
            <div className="w-12 h-12 flex items-center justify-center bg-secondary/20 rounded-full mb-6">
              <span className="text-xl font-bold font-poppins text-secondary">4</span>
            </div>
            <h3 className="text-xl font-medium text-white mb-3">Share & Earn</h3>
            <p className="text-gray-400 mb-4">Share your game and earn Gagsty Chips as players enjoy your creation.</p>
            <div className="bg-secondary/10 p-3 rounded-lg border border-secondary/30 flex items-center justify-center">
              <div className="flex items-center">
                <FaShareAlt className="text-secondary" />
                <FaPlus className="text-xs text-gray-500 mx-1" />
                <FaUsers className="text-[#FF8855] mx-2" />
                <FaEquals className="text-xs text-gray-500 mx-1" />
                <FaCoins className="text-[#FFCF44] ml-2" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <h3 className="text-xl font-medium text-white mb-6">Supported Game Types</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-gray-800/80 backdrop-blur-sm px-5 py-3 rounded-lg border border-gray-700 flex items-center">
              <FaTelegram className="text-[#229ED9] mr-2 text-xl" />
              <span>{PLATFORM_FEATURES.supportedGameTypes[0]}</span>
            </div>
            <div className="bg-gray-800/80 backdrop-blur-sm px-5 py-3 rounded-lg border border-gray-700 flex items-center">
              <FaGlobe className="text-accent mr-2 text-xl" />
              <span>{PLATFORM_FEATURES.supportedGameTypes[1]}</span>
            </div>
            <div className="bg-gray-800/80 backdrop-blur-sm px-5 py-3 rounded-lg border border-gray-700 flex items-center">
              <FaCubes className="text-[#FF8855] mr-2 text-xl" />
              <span>{PLATFORM_FEATURES.supportedGameTypes[2]}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
