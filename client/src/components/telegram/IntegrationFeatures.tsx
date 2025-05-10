import { FaRocket, FaUsers, FaCode, FaTelegram, FaUserPlus, FaCalendarCheck, FaTrophy, FaTasks } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { TELEGRAM_FEATURES } from "@/config/constants";

const IntegrationFeatures = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold font-poppins text-white mb-6">Telegram Mini App <span className="text-[#229ED9]">Integration</span></h2>
      <p className="text-gray-400 mb-8">Seamlessly deploy your game as a Telegram Mini App and reach millions of users instantly.</p>
      
      <div className="space-y-6">
        {TELEGRAM_FEATURES.map((feature, index) => (
          <div key={index} className="bg-gray-800/80 rounded-xl p-5 border border-gray-700">
            <h3 className="text-lg font-medium text-white mb-3 flex items-center">
              {feature.icon === 'rocket' && <FaRocket className="text-[#229ED9] mr-3" />}
              {feature.icon === 'users' && <FaUsers className="text-[#229ED9] mr-3" />}
              {feature.icon === 'code' && <FaCode className="text-[#229ED9] mr-3" />}
              {feature.name}
            </h3>
            <p className="text-gray-400 mb-4">{feature.description}</p>
            
            {feature.subFeatures && (
              <div className="grid grid-cols-2 gap-3 mt-4">
                {feature.subFeatures.map((subFeature, idx) => (
                  <div key={idx} className="bg-gray-900/60 p-3 rounded-lg flex items-center">
                    {subFeature.icon === 'user-plus' && <FaUserPlus className="text-accent mr-2 text-sm" />}
                    {subFeature.icon === 'calendar-check' && <FaCalendarCheck className="text-accent mr-2 text-sm" />}
                    {subFeature.icon === 'trophy' && <FaTrophy className="text-accent mr-2 text-sm" />}
                    {subFeature.icon === 'tasks' && <FaTasks className="text-accent mr-2 text-sm" />}
                    <span className="text-sm text-gray-300">{subFeature.name}</span>
                  </div>
                ))}
              </div>
            )}
            
            {feature.codeExample && (
              <div className="bg-gray-900 p-3 rounded-lg border border-gray-700 overflow-x-auto mt-4">
                <pre className="text-xs text-gray-300 font-mono"><code>{feature.codeExample}</code></pre>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <Button 
        className="inline-flex items-center justify-center px-6 py-3 mt-8 border border-transparent text-base font-medium rounded-md text-white bg-[#229ED9] hover:bg-[#229ED9]/90 telegram-glow"
      >
        <FaTelegram className="mr-2" />
        Learn More About Mini Apps
      </Button>
    </div>
  );
};

export default IntegrationFeatures;
