import { users, games, badges, type User, type InsertUser, type Game, type InsertGame, type Badge, type InsertBadge } from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserChips(userId: number, amount: number): Promise<User | undefined>;
  
  // Game operations
  getGame(id: number): Promise<Game | undefined>;
  getGames(filter?: { status?: string, gameType?: string, creatorId?: number }): Promise<Game[]>;
  getFeaturedGames(limit: number): Promise<Game[]>;
  createGame(game: InsertGame): Promise<Game>;
  updateGameStatus(gameId: number, status: string): Promise<Game | undefined>;
  updateGameChips(gameId: number, amount: number): Promise<Game | undefined>;
  
  // Badge operations
  getBadges(userId: number): Promise<Badge[]>;
  awardBadge(badge: InsertBadge): Promise<Badge>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private games: Map<number, Game>;
  private badges: Map<number, Badge[]>;
  private userId: number;
  private gameId: number;
  private badgeId: number;

  constructor() {
    this.users = new Map();
    this.games = new Map();
    this.badges = new Map();
    this.userId = 1;
    this.gameId = 1;
    this.badgeId = 1;
    
    // Add some initial data
    this.setupInitialData();
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const now = new Date();
    const user: User = { 
      ...insertUser, 
      id, 
      chips: 0,
      createdAt: now,
      isUnder18: insertUser.isUnder18 || false
    };
    this.users.set(id, user);
    this.badges.set(id, []);
    return user;
  }
  
  async updateUserChips(userId: number, amount: number): Promise<User | undefined> {
    const user = await this.getUser(userId);
    if (user) {
      user.chips = (user.chips || 0) + amount;
      this.users.set(userId, user);
      return user;
    }
    return undefined;
  }

  // Game methods
  async getGame(id: number): Promise<Game | undefined> {
    return this.games.get(id);
  }

  async getGames(filter?: { status?: string, gameType?: string, creatorId?: number }): Promise<Game[]> {
    let games = Array.from(this.games.values());
    
    if (filter) {
      if (filter.status) {
        games = games.filter(game => game.status === filter.status);
      }
      if (filter.gameType) {
        games = games.filter(game => game.gameType === filter.gameType);
      }
      if (filter.creatorId) {
        games = games.filter(game => game.creatorId === filter.creatorId);
      }
    }
    
    return games;
  }
  
  async getFeaturedGames(limit: number): Promise<Game[]> {
    const games = Array.from(this.games.values())
      .filter(game => game.status === 'approved')
      .sort((a, b) => (b.chipsEarned || 0) - (a.chipsEarned || 0))
      .slice(0, limit);
    return games;
  }

  async createGame(insertGame: InsertGame): Promise<Game> {
    const id = this.gameId++;
    const now = new Date();
    const game: Game = { 
      ...insertGame, 
      id, 
      status: 'pending',
      chipsEarned: 0,
      createdAt: now
    };
    this.games.set(id, game);
    return game;
  }
  
  async updateGameStatus(gameId: number, status: string): Promise<Game | undefined> {
    const game = await this.getGame(gameId);
    if (game) {
      game.status = status;
      this.games.set(gameId, game);
      return game;
    }
    return undefined;
  }
  
  async updateGameChips(gameId: number, amount: number): Promise<Game | undefined> {
    const game = await this.getGame(gameId);
    if (game) {
      game.chipsEarned = (game.chipsEarned || 0) + amount;
      this.games.set(gameId, game);
      return game;
    }
    return undefined;
  }

  // Badge methods
  async getBadges(userId: number): Promise<Badge[]> {
    return this.badges.get(userId) || [];
  }

  async awardBadge(insertBadge: InsertBadge): Promise<Badge> {
    const id = this.badgeId++;
    const now = new Date();
    const badge: Badge = { 
      ...insertBadge, 
      id, 
      earnedAt: now 
    };
    
    const userBadges = this.badges.get(insertBadge.userId) || [];
    userBadges.push(badge);
    this.badges.set(insertBadge.userId, userBadges);
    
    return badge;
  }
  
  // Sample data setup
  private setupInitialData() {
    // Sample users
    const user1: User = {
      id: this.userId++,
      username: 'spacegamer',
      password: 'hashed_password',
      email: 'spacegamer@example.com',
      telegramId: '123456789',
      chips: 5000,
      createdAt: new Date(),
      isUnder18: false
    };
    
    const user2: User = {
      id: this.userId++,
      username: 'rpgmaster',
      password: 'hashed_password',
      email: 'rpgmaster@example.com',
      telegramId: '987654321',
      chips: 8000,
      createdAt: new Date(),
      isUnder18: false
    };
    
    const user3: User = {
      id: this.userId++,
      username: 'puzzlemaster',
      password: 'hashed_password',
      email: 'puzzlemaster@example.com',
      telegramId: '456789123',
      chips: 6500,
      createdAt: new Date(),
      isUnder18: true
    };
    
    this.users.set(user1.id, user1);
    this.users.set(user2.id, user2);
    this.users.set(user3.id, user3);
    
    // Sample games
    const game1: Game = {
      id: this.gameId++,
      creatorId: user1.id,
      title: 'Neon Space Blaster',
      prompt: 'An arcade space shooter with powerups and three enemy types. Features neon visuals and retro sounds.',
      gameType: 'miniApp',
      monetization: ['inGameChips', 'ads'],
      thumbnail: 'space-shooter-thumbnail.jpg',
      status: 'approved',
      telegramMiniAppData: { botUsername: 'NeonSpaceBlasterBot' },
      webGameUrl: 'https://games.gagsty.com/neon-space-blaster',
      chipsEarned: 2400,
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // 7 days ago
    };
    
    const game2: Game = {
      id: this.gameId++,
      creatorId: user2.id,
      title: 'Medieval Quest',
      prompt: 'A fantasy RPG where you defeat monsters, collect treasure, and explore a vast medieval kingdom.',
      gameType: 'webGame',
      monetization: ['inGameChips', 'referral', 'upgrade'],
      thumbnail: 'medieval-quest-thumbnail.jpg',
      status: 'approved',
      telegramMiniAppData: { botUsername: 'MedievalQuestBot' },
      webGameUrl: 'https://games.gagsty.com/medieval-quest',
      chipsEarned: 5100,
      createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000) // 14 days ago
    };
    
    const game3: Game = {
      id: this.gameId++,
      creatorId: user3.id,
      title: 'Puzzle Flux',
      prompt: 'A mind-bending puzzle game with colorful shapes and patterns that challenge your spatial reasoning.',
      gameType: 'mobile',
      monetization: ['inGameChips', 'ads'],
      thumbnail: 'puzzle-flux-thumbnail.jpg',
      status: 'approved',
      telegramMiniAppData: { botUsername: 'PuzzleFluxBot' },
      webGameUrl: 'https://games.gagsty.com/puzzle-flux',
      chipsEarned: 3800,
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) // 5 days ago
    };
    
    this.games.set(game1.id, game1);
    this.games.set(game2.id, game2);
    this.games.set(game3.id, game3);
    
    // Sample badges
    this.badges.set(user1.id, [
      {
        id: this.badgeId++,
        userId: user1.id,
        badgeType: 'developer',
        earnedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      }
    ]);
    
    this.badges.set(user2.id, [
      {
        id: this.badgeId++,
        userId: user2.id,
        badgeType: 'tester',
        earnedAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000)
      },
      {
        id: this.badgeId++,
        userId: user2.id,
        badgeType: 'growthHacker',
        earnedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000)
      }
    ]);
    
    this.badges.set(user3.id, [
      {
        id: this.badgeId++,
        userId: user3.id,
        badgeType: 'beginner',
        earnedAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000)
      }
    ]);
  }
}

export const storage = new MemStorage();
