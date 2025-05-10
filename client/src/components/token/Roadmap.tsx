import { ECONOMY } from "@/config/constants";

const Roadmap = () => {
  return (
    <div className="mt-20">
      <h3 className="text-2xl font-bold text-white text-center mb-10">Roadmap</h3>
      <div className="relative">
        {/* Horizontal line */}
        <div className="absolute top-16 left-0 w-full h-0.5 bg-gray-800"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative">
          {ECONOMY.roadmap.map((phase, index) => (
            <div key={index} className="relative">
              <div
                className={`absolute top-0 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full ${
                  phase.status === 'completed' ? 'bg-primary' : 
                  phase.status === 'active' ? 'bg-secondary' : 'bg-gray-700'
                } border-4 border-darkBase z-10`}
              ></div>
              <div className="pt-20 text-center">
                <div className="gradient-card rounded-xl p-4 border border-gray-800 h-full">
                  <h4 className="text-lg font-medium text-white mb-2">{phase.phase}</h4>
                  <p
                    className={`${
                      phase.status === 'completed' ? 'text-primary' : 
                      phase.status === 'active' ? 'text-secondary' : 'text-gray-400'
                    } font-medium mb-2`}
                  >
                    {phase.name}
                  </p>
                  <p className="text-sm text-gray-400">{phase.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
