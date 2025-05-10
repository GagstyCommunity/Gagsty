import { FaCoins, FaGamepad, FaShieldAlt, FaTasks, FaUserPlus, FaBolt, FaTshirt, FaArrowUp, FaBox, FaInfoCircle } from "react-icons/fa";
import { ECONOMY } from "@/config/constants";

const ChipsEconomy = () => {
  return (
    <div className="gradient-card rounded-xl p-8 border border-gray-800 relative overflow-hidden">
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#FFCF44]/10 rounded-full blur-3xl"></div>
      <div className="relative z-10">
        <div className="flex items-center mb-6">
          <div className="bg-[#FFCF44]/20 p-3 rounded-full mr-4">
            <FaCoins className="text-2xl text-[#FFCF44]" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">Gagsty Chips</h3>
            <p className="text-gray-400">In-game currency</p>
          </div>
        </div>
        
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-medium text-white mb-2">Total Supply</h4>
            <div className="bg-gray-800/80 p-4 rounded-lg">
              <span className="text-[#FFCF44] font-bold">{ECONOMY.chips.totalSupply}</span>
              <span className="text-gray-400 ml-2">(Fixed)</span>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-medium text-white mb-3">Earn Methods</h4>
            <div className="grid grid-cols-2 gap-3">
              {ECONOMY.chips.earnMethods.map((method, index) => (
                <div key={index} className="bg-gray-800/80 p-3 rounded-lg flex items-center">
                  {method.icon === 'gamepad' && <FaGamepad className="text-[#FFCF44] mr-2" />}
                  {method.icon === 'shield-alt' && <FaShieldAlt className="text-[#FFCF44] mr-2" />}
                  {method.icon === 'tasks' && <FaTasks className="text-[#FFCF44] mr-2" />}
                  {method.icon === 'user-plus' && <FaUserPlus className="text-[#FFCF44] mr-2" />}
                  <span className="text-sm text-gray-300">{method.name}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-medium text-white mb-3">Spending Methods</h4>
            <div className="grid grid-cols-2 gap-3">
              {ECONOMY.chips.spendingMethods.map((method, index) => (
                <div key={index} className="bg-gray-800/80 p-3 rounded-lg flex items-center">
                  {method.icon === 'bolt' && <FaBolt className="text-[#FFCF44] mr-2" />}
                  {method.icon === 'tshirt' && <FaTshirt className="text-[#FFCF44] mr-2" />}
                  {method.icon === 'arrow-up' && <FaArrowUp className="text-[#FFCF44] mr-2" />}
                  {method.icon === 'box' && <FaBox className="text-[#FFCF44] mr-2" />}
                  <span className="text-sm text-gray-300">{method.name}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-[#FFCF44]/10 p-4 rounded-lg border border-[#FFCF44]/30">
            <p className="text-gray-300 flex items-center">
              <FaInfoCircle className="text-[#FFCF44] mr-2" />
              Chips cannot be purchased — they can only be earned through gameplay and community contributions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChipsEconomy;
