import { FaMedal } from "react-icons/fa";
import { BADGES } from "@/config/constants";

const BadgeSystem = () => {
  const getBadgeIconComponent = (iconName: string) => {
    // This dynamically renders the appropriate icon based on the name
    return <i className={`fas fa-${iconName} text-white text-xl`}></i>;
  };

  return (
    <div className="gradient-card rounded-xl p-6 border border-gray-800">
      <h3 className="text-xl font-medium text-white mb-6 flex items-center">
        <FaMedal className="text-primary mr-3" />
        Badge System
      </h3>
      
      <div className="space-y-4">
        {BADGES.map((badge, index) => (
          <div key={index} className="bg-gray-800/80 p-4 rounded-lg flex items-center">
            <div className={`flex-shrink-0 w-12 h-12 bg-[${badge.color}] rounded-full flex items-center justify-center mr-4`}>
              {getBadgeIconComponent(badge.icon)}
            </div>
            <div>
              <h4 className="text-white font-medium">{badge.name}</h4>
              <p className="text-sm text-gray-400">{badge.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BadgeSystem;
