import { Button } from "@/components/ui/button"
import { useLocation } from "wouter"
import { motion } from "framer-motion"

export const Hero = () => {
  const [, navigate] = useLocation()

  const stats = [
    { label: "Games Built", value: "1,234+" },
    { label: "Creators Rewarded", value: "560+" },
    { label: "Chips Earned", value: "2.5M+" }
  ]

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      <div className="container px-4 py-16 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary mb-6">
            Turn Your Idea into a Game in Minutes
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            No Code. AI Powered. Play-to-Own.
          </p>

          <div className="flex flex-wrap gap-4 justify-center mb-16">
            <Button size="lg" onClick={() => navigate("/create")}>
              Create Game Now
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate("/earn")}>
              Earn Gagsty Chips
            </Button>
            <Button size="lg" variant="secondary" onClick={() => navigate("/community")}>
              Join Community
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, i) => (
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
            ))}
          </div>
        </motion.div>
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-900 via-gray-900 to-black"></div>
      <div className="absolute top-1/3 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl"></div>
    </section>
  )
}

export default Hero