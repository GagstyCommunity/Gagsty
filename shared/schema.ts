import { pgTable, text, serial, integer, timestamp, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email"),
  telegramId: text("telegram_id"),
  chips: integer("chips").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  isUnder18: boolean("is_under_18").default(false),
});

export const badges = pgTable("badges", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  badgeType: text("badge_type").notNull(), // beginner, tester, developer, growthHacker, moderator
  earnedAt: timestamp("earned_at").defaultNow(),
});

export const games = pgTable("games", {
  id: serial("id").primaryKey(),
  creatorId: integer("creator_id").notNull(),
  title: text("title").notNull(),
  prompt: text("prompt").notNull(),
  description: text("description"), // Added for storing game description
  gameType: text("game_type").notNull(), // miniApp, webGame, mobile
  monetization: text("monetization").array(), // inGameChips, ads, referral, upgrade
  thumbnail: text("thumbnail"),
  status: text("status").default("pending"), // pending, approved, rejected
  telegramMiniAppData: jsonb("telegram_mini_app_data"),
  webGameUrl: text("web_game_url"),
  chipsEarned: integer("chips_earned").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  creator: text("creator"), // Creator name for display purpose
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  telegramId: true,
  isUnder18: true,
});

export const insertBadgeSchema = createInsertSchema(badges).pick({
  userId: true,
  badgeType: true,
});

export const insertGameSchema = createInsertSchema(games).pick({
  creatorId: true,
  title: true,
  prompt: true,
  description: true,
  gameType: true,
  monetization: true,
  thumbnail: true,
  creator: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertBadge = z.infer<typeof insertBadgeSchema>;
export type Badge = typeof badges.$inferSelect;

export type InsertGame = z.infer<typeof insertGameSchema>;
export type Game = typeof games.$inferSelect;

// Form schema for game creation
export const createGameSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  prompt: z.string().min(10, "Prompt must be at least 10 characters").max(1000, "Prompt must be less than 1000 characters"),
  description: z.string().optional(),
  gameType: z.enum(["mini-app", "web-game", "mobile"]),
  monetization: z.array(z.enum(["in-game-chips", "ads", "referral", "upgrade"])).min(1, "Select at least one monetization option"),
  thumbnail: z.string().optional(),
  creator: z.string().optional(),
});

export type CreateGameFormData = z.infer<typeof createGameSchema>;
