import { Helmet } from "react-helmet";
import Tasks from "@/components/earn/Tasks";
import BadgeSystem from "@/components/earn/BadgeSystem";
import RevenueSplit from "@/components/earn/RevenueSplit";

const Earn = () => {
  return (
    <>
      <Helmet>
        <title>Earn & Badges - Gagsty</title>
        <meta name="description" content="Complete tasks, earn Gagsty Chips, and unlock prestigious badges. Learn about our revenue split system and how you can earn through the platform." />
      </Helmet>
      
      <section id="earn" className="py-20 bg-darkBase">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-3xl font-bold font-poppins text-white mb-4">Earn & <span className="text-primary">Badges</span></h1>
            <p className="max-w-2xl mx-auto text-gray-400">Complete tasks, earn Gagsty Chips, and unlock prestigious badges</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Tasks */}
            <Tasks />
            
            {/* Badge System */}
            <BadgeSystem />
            
            {/* Revenue Split */}
            <RevenueSplit />
          </div>
        </div>
      </section>
    </>
  );
};

export default Earn;
