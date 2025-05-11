import { FaPencilAlt, FaRobot, FaTelegram, FaCoins } from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      icon: FaPencilAlt,
      title: "Write a Game Prompt",
      description: "Describe your idea, genre, and characters"
    },
    {
      icon: FaRobot,
      title: "AI Builds Game",
      description: "Our engine converts your prompt into game logic"
    },
    {
      icon: FaTelegram,
      title: "Instant Deploy",
      description: "Auto-deployed as Telegram Mini App / Web Version"
    },
    {
      icon: FaCoins,
      title: "Earn & Upgrade",
      description: "Share, earn, and upgrade with Gagsty Chips"
    }
  ];

  return (
    <section className="py-20 bg-darkBase">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">How It Works</h2>
          <p className="text-gray-400">From Prompt to Playable Game in Minutes</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 right-0 w-full h-0.5 bg-gray-800 transform translate-y-full"></div>
              )}
              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800 relative z-10">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <step.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;