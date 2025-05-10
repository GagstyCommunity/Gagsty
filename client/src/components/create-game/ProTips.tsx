import { FaLightbulb, FaCheckCircle } from "react-icons/fa";
import { PRO_TIPS } from "@/config/constants";

const ProTips = () => {
  return (
    <div className="gradient-card rounded-xl p-6 border border-gray-800">
      <h3 className="text-xl font-medium text-white mb-4 flex items-center">
        <FaLightbulb className="text-[#FFCF44] mr-3" />
        Pro Tips
      </h3>
      <ul className="space-y-4">
        {PRO_TIPS.map((tip, index) => (
          <li key={index} className="flex">
            <FaCheckCircle className="text-secondary mt-1 mr-3" />
            <div>
              <p className="text-gray-300">{tip.tip}</p>
              <p className="text-sm text-gray-500">{tip.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProTips;
