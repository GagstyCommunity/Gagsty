import { FaCertificate, FaExchangeAlt, FaUnlock, FaHandHoldingUsd, FaTools } from "react-icons/fa";
import { ECONOMY } from "@/config/constants";

const GagstyToken = () => {
  return (
    <div className="gradient-card rounded-xl p-8 border border-gray-800 relative overflow-hidden">
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="relative z-10">
        <div className="flex items-center mb-6">
          <div className="bg-primary/20 p-3 rounded-full mr-4">
            <FaCertificate className="text-2xl text-primary" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">GAGSTY Token</h3>
            <p className="text-gray-400">Governance & utility token</p>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-lg font-medium text-white mb-2">Token Symbol</h4>
              <div className="bg-gray-800/80 p-4 rounded-lg">
                <span className="text-primary font-bold">{ECONOMY.token.symbol}</span>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-medium text-white mb-2">Total Supply</h4>
              <div className="bg-gray-800/80 p-4 rounded-lg">
                <span className="text-primary font-bold">{ECONOMY.token.totalSupply}</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-medium text-white mb-2">Tokenomics</h4>
            <div className="bg-gray-800/80 p-4 rounded-lg">
              <div className="grid grid-cols-2 gap-y-2 text-sm">
                {ECONOMY.token.tokenomics.map((item, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                    <span className="text-gray-300">{item.name}: <span className="text-white">{item.percentage}%</span></span>
                  </div>
                ))}
              </div>
              
              <div className="w-full h-6 bg-gray-900 rounded-full mt-4 overflow-hidden">
                <div className="flex h-full">
                  {ECONOMY.token.tokenomics.map((item, index) => (
                    <div 
                      key={index} 
                      className="h-full" 
                      style={{ 
                        width: `${item.percentage}%`, 
                        backgroundColor: item.color 
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-medium text-white mb-3">Use Cases</h4>
            <div className="grid grid-cols-2 gap-3">
              {ECONOMY.token.useCases.map((useCase, index) => (
                <div key={index} className="bg-gray-800/80 p-3 rounded-lg flex items-center">
                  {useCase.icon === 'exchange-alt' && <FaExchangeAlt className="text-primary mr-2" />}
                  {useCase.icon === 'unlock' && <FaUnlock className="text-primary mr-2" />}
                  {useCase.icon === 'hand-holding-usd' && <FaHandHoldingUsd className="text-primary mr-2" />}
                  {useCase.icon === 'tools' && <FaTools className="text-primary mr-2" />}
                  <span className="text-sm text-gray-300">{useCase.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GagstyToken;
