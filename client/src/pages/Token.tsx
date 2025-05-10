import { Helmet } from "react-helmet";
import ChipsEconomy from "@/components/token/ChipsEconomy";
import GagstyToken from "@/components/token/GagstyToken";
import Roadmap from "@/components/token/Roadmap";

const Token = () => {
  return (
    <>
      <Helmet>
        <title>Token Economy - Gagsty</title>
        <meta name="description" content="Learn about Gagsty's dual-token economy with Gagsty Chips and GAGSTY Token. Explore tokenomics, use cases, and our platform roadmap." />
      </Helmet>
      
      <section id="token" className="py-20 bg-darkBase">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-3xl font-bold font-poppins text-white mb-4">Gagsty <span className="text-primary">Economy</span></h1>
            <p className="max-w-2xl mx-auto text-gray-400">A dual-token system that powers the entire ecosystem</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Gagsty Chips */}
            <ChipsEconomy />
            
            {/* GAGSTY Token */}
            <GagstyToken />
          </div>
          
          {/* Roadmap */}
          <Roadmap />
        </div>
      </section>
    </>
  );
};

export default Token;
