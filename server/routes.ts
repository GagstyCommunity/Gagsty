import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { createGameSchema, insertGameSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // API Routes
  const apiRouter = express.Router();
  
  // Games endpoints
  apiRouter.get('/games', getGames);
  apiRouter.get('/games/featured', getFeaturedGames);
  apiRouter.get('/games/:id', getGame);
  apiRouter.post('/games', createGame);
  
  // Users endpoints
  apiRouter.get('/users/:id', getUser);
  apiRouter.get('/users/:id/badges', getUserBadges);
  
  // Use apiRouter
  app.use('/api', apiRouter);
  
  const httpServer = createServer(app);
  return httpServer;
  
  // Handler functions
  
  // Get all games with optional filters
  async function getGames(req: Request, res: Response) {
    try {
      const { status, gameType, creatorId } = req.query;
      const filter: any = {};
      
      if (status) filter.status = status as string;
      if (gameType) filter.gameType = gameType as string;
      if (creatorId) filter.creatorId = parseInt(creatorId as string);
      
      const games = await storage.getGames(filter);
      res.json(games);
    } catch (error) {
      res.status(500).json({ message: "Error fetching games" });
    }
  }
  
  // Get featured games 
  async function getFeaturedGames(req: Request, res: Response) {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 6;
      const games = await storage.getFeaturedGames(limit);
      res.json(games);
    } catch (error) {
      res.status(500).json({ message: "Error fetching featured games" });
    }
  }
  
  // Get single game
  async function getGame(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const game = await storage.getGame(id);
      
      if (!game) {
        return res.status(404).json({ message: "Game not found" });
      }
      
      res.json(game);
    } catch (error) {
      res.status(500).json({ message: "Error fetching game" });
    }
  }
  
  // Create a new game
  async function createGame(req: Request, res: Response) {
    try {
      // Validate request body
      const validationResult = createGameSchema.safeParse(req.body);
      if (!validationResult.success) {
        return res.status(400).json({ 
          message: "Invalid game data", 
          errors: validationResult.error.errors 
        });
      }
      
      // Normally we'd get this from the authenticated user
      // For demo purposes, we're using a hardcoded creatorId
      const creatorId = req.body.creatorId || 1;
      
      // Transform the validated data to match our schema
      const gameData = {
        creatorId,
        title: req.body.title,
        prompt: req.body.prompt,
        gameType: req.body.gameType === 'mini-app' ? 'miniApp' : 
                 req.body.gameType === 'web-game' ? 'webGame' : 'mobile',
        monetization: req.body.monetization.map((item: string) => 
          item === 'in-game-chips' ? 'inGameChips' : 
          item === 'ads' ? 'ads' : 
          item === 'referral' ? 'referral' : 'upgrade'
        ),
        thumbnail: `${req.body.title.toLowerCase().replace(/\s+/g, '-')}-thumbnail.jpg`,
      };
      
      // Validate against the insertGameSchema
      const insertValidation = insertGameSchema.safeParse(gameData);
      if (!insertValidation.success) {
        return res.status(400).json({ 
          message: "Error transforming game data", 
          errors: insertValidation.error.errors 
        });
      }
      
      // Create the game
      const newGame = await storage.createGame(gameData);
      
      // For demo purposes, we automatically approve the game
      // In a real system, this would go through moderation
      await storage.updateGameStatus(newGame.id, 'approved');
      
      res.status(201).json(newGame);
    } catch (error) {
      res.status(500).json({ message: "Error creating game" });
    }
  }
  
  // Get user by id
  async function getUser(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const user = await storage.getUser(id);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      // Don't send the password
      const { password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ message: "Error fetching user" });
    }
  }
  
  // Get user badges
  async function getUserBadges(req: Request, res: Response) {
    try {
      const userId = parseInt(req.params.id);
      const user = await storage.getUser(userId);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      const badges = await storage.getBadges(userId);
      res.json(badges);
    } catch (error) {
      res.status(500).json({ message: "Error fetching badges" });
    }
  }
}

import express from "express";
