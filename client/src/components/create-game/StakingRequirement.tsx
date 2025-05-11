import { FaCoins, FaUser } from "react-icons/fa";

const StakingRequirement = () => {
  return (
    <div className="gradient-card rounded-xl p-6 border border-gray-800">
      <h3 className="text-xl font-medium text-white mb-4 flex items-center justify-between">
        <span>Staking Requirement</span> 
        <span className="bg-primary/20 text-primary text-xs px-2 py-1 rounded-full ml-2">Important</span>
      </h3>
      <p className="text-gray-400 mb-4">To build advanced games, you need to either:</p>
      
      <div className="space-y-3">
        <div className="bg-gray-800/80 p-4 rounded-lg flex items-start">
          <div className="bg-[#FFCF44]/20 rounded-full p-2 mr-3">
            <FaCoins className="text-[#FFCF44]" />
          </div>
          <div>
            <p className="text-white">Stake Gagsty Chips</p>
            <p className="text-sm text-gray-500">Stake $1,000 worth of Gagsty Chips to unlock full game creation</p>
          </div>
        </div>
        
        <div className="bg-gray-800/80 p-4 rounded-lg flex items-start">
          <div className="bg-primary/20 rounded-full p-2 mr-3">
            <FaUser className="text-primary" />
          </div>
          <div>
            <p className="text-white">Under-18 Creators</p>
            <p className="text-sm text-gray-500">No staking required if you're under 18 years old</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StakingRequirement;
