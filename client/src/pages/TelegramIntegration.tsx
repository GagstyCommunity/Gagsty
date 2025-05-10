import { Helmet } from "react-helmet";
import IntegrationFeatures from "@/components/telegram/IntegrationFeatures";

interface TelegramIntegrationProps {
  isHomepage?: boolean;
}

const TelegramIntegration = ({ isHomepage = false }: TelegramIntegrationProps) => {
  return (
    <>
      {!isHomepage && (
        <Helmet>
          <title>Telegram Integration - Gagsty</title>
          <meta name="description" content="Seamlessly integrate your game as a Telegram Mini App and reach millions of users. Learn about our instant deployment, viral growth features, and auto-generated code." />
        </Helmet>
      )}
      
      <section className="py-20 bg-gradient-to-b from-darkBase to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <IntegrationFeatures />
            
            <div className="relative">
              {/* A mock of a mobile device showing a Telegram Mini App */}
              <div className="bg-gray-800 rounded-3xl overflow-hidden border-8 border-gray-700 shadow-2xl mx-auto max-w-xs">
                {/* A screenshot of a Telegram Mini App interface with game controls */}
                <img 
                  src="https://images.unsplash.com/photo-1560253023-3ec5d502959f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=800" 
                  alt="Telegram Mini App interface" 
                  className="w-full h-auto" 
                />
                
                {/* Overlay to make it look more like a Telegram interface */}
                <div className="absolute top-0 left-0 w-full h-16 bg-[#229ED9] flex items-center px-4">
                  <i className="fas fa-arrow-left text-white mr-4"></i>
                  <div>
                    <div className="text-white font-medium">Neon Space Blaster</div>
                    <div className="text-blue-200 text-xs">Mini App by Gagsty</div>
                  </div>
                </div>
                
                {/* Game controls overlay at bottom */}
                <div className="absolute bottom-0 left-0 w-full p-4 bg-black/70 backdrop-blur-sm flex justify-between">
                  <div className="flex gap-3">
                    <button className="w-12 h-12 bg-gray-800/80 rounded-full flex items-center justify-center border border-accent/50">
                      <i className="fas fa-arrow-left text-accent"></i>
                    </button>
                    <button className="w-12 h-12 bg-gray-800/80 rounded-full flex items-center justify-center border border-accent/50">
                      <i className="fas fa-arrow-right text-accent"></i>
                    </button>
                  </div>
                  <button className="w-12 h-12 bg-primary/80 rounded-full flex items-center justify-center border border-primary/50">
                    <i className="fas fa-bolt text-white"></i>
                  </button>
                </div>
              </div>
              
              {/* Floating elements for decoration */}
              <div className="absolute -top-10 -right-10 bg-[#229ED9]/10 backdrop-blur-md p-4 rounded-xl border border-[#229ED9]/30 w-48 hidden lg:block">
                <div className="text-xs text-gray-300 flex items-center mb-2">
                  <i className="fas fa-user-plus text-[#229ED9] mr-2"></i>
                  Viral Growth
                </div>
                <p className="text-sm text-white">Invite friends to earn 2x Chips</p>
              </div>
              
              <div className="absolute -bottom-6 -left-6 bg-[#FFCF44]/10 backdrop-blur-md p-4 rounded-xl border border-[#FFCF44]/30 w-48 hidden lg:block">
                <div className="text-xs text-gray-300 flex items-center mb-2">
                  <i className="fas fa-coins text-[#FFCF44] mr-2"></i>
                  Earnings
                </div>
                <p className="text-sm text-white">+150 Chips earned today</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TelegramIntegration;
