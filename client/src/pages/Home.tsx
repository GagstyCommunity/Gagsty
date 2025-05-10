import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import FeaturedGames from "@/components/home/FeaturedGames";
import TelegramIntegration from "@/pages/TelegramIntegration";
import { useEffect } from "react";
import { useLocation } from "wouter";

const Home = () => {
  const [location] = useLocation();
  
  // Smooth scrolling for anchor links on load
  useEffect(() => {
    // Wait for components to render
    const timeoutId = setTimeout(() => {
      if (location.includes('#')) {
        const id = location.split('#')[1];
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }, 100);
    
    return () => clearTimeout(timeoutId);
  }, [location]);

  return (
    <div>
      {/* Hero Section */}
      <Hero />
      
      {/* How It Works Section */}
      <HowItWorks />
      
      {/* Featured Games Section */}
      <FeaturedGames />
      
      {/* Telegram Integration Section */}
      <TelegramIntegration isHomepage={true} />
    </div>
  );
};

export default Home;
