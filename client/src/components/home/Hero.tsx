
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { FaMagic, FaUsers, FaCoins } from "react-icons/fa";

const Hero = () => {
  const [, navigate] = useLocation();

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-darkBase via-darkBase to-black"></div>
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-1/3 h-1/3 bg-accent/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Turn Your Idea into a Game <span className="text-primary">in Minutes</span>
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            No Code. AI Powered. Play-to-Own.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              onClick={() => navigate("/create-game")}
              size="lg"
              className="bg-primary hover:bg-primary/90"
            >
              <FaMagic className="mr-2" /> Create Game Now
            </Button>
            <Button 
              onClick={() => navigate("/community")}
              variant="outline"
              size="lg"
              className="border-gray-700"
            >
              <FaUsers className="mr-2" /> Join Community
            </Button>
            <Button 
              onClick={() => navigate("/earn")}
              variant="outline"
              size="lg"
              className="border-gray-700"
            >
              <FaCoins className="mr-2" /> Earn Gagsty Chips
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: "Total Games", value: "1,240+" },
              { label: "Active Users", value: "24K+" },
              { label: "Creators Rewarded", value: "850+" },
              { label: "Chips Earned", value: "845M+" }
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
