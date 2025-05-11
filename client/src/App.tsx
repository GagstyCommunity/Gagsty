import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StickyCreateGameCTA from "@/components/StickyCreateGameCTA";
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

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/create-game" component={CreateGame} />
          <Route path="/games" component={Games} />
          <Route path="/game/:slug" component={GameView} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/admin" component={AdminDashboard} />
          <Route path="/search" component={Search} />
          <Route path="/earn" component={Earn} />
          <Route path="/learn-hub" component={LearnHub} />
          <Route path="/learn-hub/article/:id" component={LearnHub} />
          <Route path="/learn-hub/interview/:id" component={LearnHub} />
          <Route path="/learn-hub/tech/:id" component={LearnHub} />
          <Route path="/chips" component={Token} />
          <Route path="/token" component={Token} />
          <Route path="/jobs" component={NotFound} />
          <Route path="/partners" component={NotFound} />
          <Route path="/about" component={NotFound} />
          <Route path="/help" component={NotFound} />
          <Route path="/telegram-integration" component={TelegramIntegration} />
          {/* Fallback to 404 */}
          <Route component={NotFound} />
        </Switch>
      </main>
      <StickyCreateGameCTA />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/create-game" component={CreateGame} />
          <Route path="/games" component={Games} />
          <Route path="/game/:id" component={GameView} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/admin" component={AdminDashboard} />
          <Route path="/search" component={Search} />
          <Route path="/learn" component={LearnHub} />
          <Route path="/earn" component={Earn} />
          <Route path="/token" component={Token} />
          <Route path="/telegram-integration" component={TelegramIntegration} />
          <Route component={NotFound} />
        </Switch>
        <StickyCreateGameCTA />
        <Footer />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
