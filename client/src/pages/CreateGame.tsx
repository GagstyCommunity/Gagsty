import { Helmet } from "react-helmet";
import GameCreationForm from "@/components/create-game/GameCreationForm";
import ProTips from "@/components/create-game/ProTips";
import StakingRequirement from "@/components/create-game/StakingRequirement";
import SuccessRate from "@/components/create-game/SuccessRate";

const CreateGame = () => {
  return (
    <>
      <Helmet>
        <title>Create Game - Gagsty</title>
        <meta name="description" content="Turn your idea into a game in minutes with AI. No coding required." />
      </Helmet>
      
      <section className="py-20 bg-gradient-to-br from-darkBase via-darkBase to-black relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-1/3 h-1/3 bg-accent/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h1 className="text-3xl font-bold font-poppins text-white mb-4">Create Your <span className="text-primary">Game</span></h1>
            <p className="max-w-2xl mx-auto text-gray-400">Turn your game idea into reality with our AI-powered game creation engine. No coding required.</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="gradient-card rounded-xl p-8 border border-gray-800">
              <GameCreationForm />
            </div>
            
            <div className="space-y-8">
              <ProTips />
              <StakingRequirement />
              <SuccessRate />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CreateGame;
