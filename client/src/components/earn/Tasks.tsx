import { FaTasks } from "react-icons/fa";
import { TASKS } from "@/config/constants";

const Tasks = () => {
  return (
    <div className="gradient-card rounded-xl p-6 border border-gray-800">
      <h3 className="text-xl font-medium text-white mb-6 flex items-center">
        <FaTasks className="text-primary mr-3" />
        Tasks
      </h3>
      
      <div className="space-y-4">
        {TASKS.map((task, index) => (
          <div key={index} className="bg-gray-800/80 p-4 rounded-lg flex items-start">
            <div className={`bg-[${task.iconColor}]/20 rounded-full p-2 mr-3 mt-1`}>
              <i className={`fas fa-${task.icon} text-[${task.iconColor}]`}></i>
            </div>
            <div>
              <h4 className="text-white font-medium">{task.name}</h4>
              <p className="text-sm text-gray-400 mb-2">{task.description}</p>
              <div className="text-xs text-[#FFCF44] flex items-center">
                <i className="fas fa-coins mr-1"></i>
                {task.reward}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;
