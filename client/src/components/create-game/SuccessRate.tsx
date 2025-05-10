import { FaRocket } from "react-icons/fa";
import { GAME_STATS } from "@/config/constants";

const SuccessRate = () => {
  return (
    <div className="bg-primary/10 backdrop-blur-sm rounded-xl p-6 border border-primary/30">
      <div className="flex items-center mb-4">
        <FaRocket className="text-primary text-2xl mr-3" />
        <h3 className="text-xl font-medium text-white">Success Rate</h3>
      </div>
      <p className="text-gray-300 mb-6">
        Our AI has successfully created <span className="text-primary font-semibold">{GAME_STATS.totalGames}+</span> games from user prompts.
      </p>
      <div className="w-full bg-gray-800 rounded-full h-4">
        <div 
          className="bg-gradient-to-r from-primary to-accent h-4 rounded-full" 
          style={{ width: `${GAME_STATS.successRate}%` }}
        ></div>
      </div>
      <div className="flex justify-between mt-2 text-sm">
        <span className="text-gray-500">Games Created</span>
        <span className="text-accent">{GAME_STATS.successRate}% Success Rate</span>
      </div>
    </div>
  );
};

export default SuccessRate;
