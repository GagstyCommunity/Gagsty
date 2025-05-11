import { BrowserRouter, Routes, Route } from "react-router-dom";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import CreateGame from "@/pages/CreateGame";
import Games from "@/pages/Games";
import GameView from "@/pages/GameView";
import Dashboard from "@/pages/Dashboard";
import AdminDashboard from "@/pages/AdminDashboard";
import Search from "@/pages/Search";
import LearnHub from "@/pages/LearnHub";
import Earn from "@/pages/Earn";
import Token from "@/pages/Token";
import TelegramIntegration from "@/pages/TelegramIntegration";
import StickyCreateGameCTA from "@/components/StickyCreateGameCTA";
import Footer from "@/components/Footer";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-game" element={<CreateGame />} />
            <Route path="/games" element={<Games />} />
            <Route path="/game/:id" element={<GameView />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/search" element={<Search />} />
            <Route path="/learn" element={<LearnHub />} />
            <Route path="/earn" element={<Earn />} />
            <Route path="/token" element={<Token />} />
            <Route path="/telegram-integration" element={<TelegramIntegration />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <StickyCreateGameCTA />
          <Footer />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;