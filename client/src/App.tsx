import React from 'react';
import { Route, Switch } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StickyCreateGameCTA from "@/components/StickyCreateGameCTA";
import Home from "@/pages/Home";
import CreateGame from "@/pages/CreateGame";
import Games from "@/pages/Games";
import GameView from "@/pages/GameView";
import Dashboard from "@/pages/Dashboard";
import Earn from "@/pages/Earn";
import Token from "@/pages/Token";
import TelegramIntegration from "@/pages/TelegramIntegration";
import LearnHub from "@/pages/LearnHub";
import Search from "@/pages/Search";
import NotFound from "@/pages/not-found";

const App = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-darkBase">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/create-game" component={CreateGame} />
          <Route path="/games" component={Games} />
          <Route path="/game/:id" component={GameView} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/earn" component={Earn} />
          <Route path="/token" component={Token} />
          <Route path="/telegram-integration" component={TelegramIntegration} />
          <Route path="/learn" component={LearnHub} />
          <Route path="/search" component={Search} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
      <StickyCreateGameCTA />
      <Toaster />
    </>
  );
};

export default App;