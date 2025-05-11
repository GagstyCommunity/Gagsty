import { Button } from "@/components/ui/button"
import { useLocation } from "wouter"
import { motion } from "framer-motion"
import { useIsMobile } from "@/hooks/use-mobile";

const Hero = () => {
  const isMobile = useIsMobile();

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      <div className="container px-4 py-16 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className={`tracking-tight font-extrabold text-white ${isMobile ? 'text-3xl' : 'text-4xl sm:text-5xl md:text-6xl'}`}>
            <span className="block">Turn Your Idea into a</span>
            <span className="block gradient-text">Game in Minutes</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            No Code. AI Powered. Play-to-Own.
          </p>

          <div className={`mt-5 max-w-md mx-auto ${isMobile ? 'flex flex-col space-y-3' : 'sm:flex sm:justify-center sm:space-x-4'} md:mt-8`}>
            <div className="rounded-md shadow">
              <Button size="lg" onClick={() => navigate("/create")}>
                Create Game Now
              </Button>
            </div>
            <div className={`rounded-md shadow ${isMobile ? '' : 'sm:mt-0'}`}>
              <Button size="lg" variant="outline" onClick={() => navigate("/earn")}>
                Earn Gagsty Chips
              </Button>
            </div>
            <div className={`rounded-md shadow ${isMobile ? '' : 'sm:mt-0'}`}>
              <Button size="lg" variant="secondary" onClick={() => navigate("/community")}>
                Join Community
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/*stats.map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.2 }}
                className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6"
              >
                <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))*/}
          </div>
        </motion.div>
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-900 via-gray-900 to-black"></div>
      <div className="absolute top-1/3 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl"></div>
    </section>
  );
};

export default Hero