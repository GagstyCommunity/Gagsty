
import { supabase } from './db';
import { 
  insertUserSchema, 
  insertGameSchema, 
  insertBadgeSchema 
} from '../shared/schema';

// Seed 10 dummy users including an admin user
async function seedUsers() {
  console.log('Seeding users...');
  
  const users = [
    {
      username: 'admin',
      password: 'admin123', // In production, use proper password hashing
      email: 'admin@gagsty.com',
      telegramId: 'admin_telegram',
      chips: 50000,
      isUnder18: false,
      isAdmin: true
    },
    {
      username: 'spacegamer',
      password: 'password123',
      email: 'spacegamer@example.com',
      telegramId: '123456789',
      chips: 5000,
      isUnder18: false,
      isAdmin: false
    },
    {
      username: 'rpgmaster',
      password: 'password123',
      email: 'rpgmaster@example.com',
      telegramId: '987654321',
      chips: 8000,
      isUnder18: false,
      isAdmin: false
    },
    {
      username: 'puzzlemaster',
      password: 'password123',
      email: 'puzzlemaster@example.com',
      telegramId: '456789123',
      chips: 6500,
      isUnder18: true,
      isAdmin: false
    },
    {
      username: 'casualgamer',
      password: 'password123',
      email: 'casual@example.com',
      telegramId: 'casual_telegram',
      chips: 3200,
      isUnder18: false,
      isAdmin: false
    },
    {
      username: 'devmaster',
      password: 'password123',
      email: 'dev@example.com',
      telegramId: 'dev_telegram',
      chips: 7500,
      isUnder18: false,
      isAdmin: false
    },
    {
      username: 'gameartist',
      password: 'password123',
      email: 'artist@example.com',
      telegramId: 'artist_telegram',
      chips: 4200,
      isUnder18: false,
      isAdmin: false
    },
    {
      username: 'scriptwriter',
      password: 'password123',
      email: 'writer@example.com',
      telegramId: 'writer_telegram',
      chips: 5800,
      isUnder18: false,
      isAdmin: false
    },
    {
      username: 'youngcreator',
      password: 'password123',
      email: 'young@example.com',
      telegramId: 'young_telegram',
      chips: 2100,
      isUnder18: true,
      isAdmin: false
    },
    {
      username: 'mobilegamer',
      password: 'password123',
      email: 'mobile@example.com',
      telegramId: 'mobile_telegram',
      chips: 4700,
      isUnder18: false,
      isAdmin: false
    }
  ];

  for (const user of users) {
    const { data, error } = await supabase
      .from('users')
      .insert([user])
      .select();
    
    if (error) {
      console.error(`Error inserting user ${user.username}:`, error);
    } else {
      console.log(`Inserted user ${user.username} with ID ${data[0].id}`);
    }
  }
}

// Seed games for each user
async function seedGames() {
  console.log('Seeding games...');

  // First fetch all users
  const { data: users, error: userError } = await supabase
    .from('users')
    .select('id, username');
  
  if (userError) {
    console.error('Error fetching users:', userError);
    return;
  }

  const gameTypes = ['miniApp', 'webGame', 'mobile'];
  const monetizationOptions = ['inGameChips', 'ads', 'referral', 'upgrade'];
  const statuses = ['approved', 'pending', 'rejected'];
  
  // Create a couple of games for each user
  for (const user of users) {
    // Each user gets 2 games
    for (let i = 0; i < 2; i++) {
      const gameType = gameTypes[Math.floor(Math.random() * gameTypes.length)];
      const monetization = [monetizationOptions[Math.floor(Math.random() * monetizationOptions.length)]];
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      const chipsEarned = Math.floor(Math.random() * 5000);
      
      const game = {
        creatorId: user.id,
        title: `${user.username}'s Game ${i + 1}`,
        prompt: `A ${gameType} game with ${monetization[0]} monetization created by ${user.username}`,
        description: `This is a sample game created by ${user.username} for testing purposes.`,
        gameType,
        monetization,
        thumbnail: `https://picsum.photos/seed/${user.username}${i}/200/300`,
        status,
        telegramMiniAppData: { botUsername: `${user.username}Bot` },
        webGameUrl: `https://games.gagsty.com/${user.username}-game-${i + 1}`,
        chipsEarned,
        creator: user.username,
        createdAt: new Date()
      };

      const { data, error } = await supabase
        .from('games')
        .insert([game])
        .select();
      
      if (error) {
        console.error(`Error inserting game for ${user.username}:`, error);
      } else {
        console.log(`Inserted game "${game.title}" with ID ${data[0].id}`);
      }
    }
  }
}

// Seed badges for users
async function seedBadges() {
  console.log('Seeding badges...');

  // First fetch all users
  const { data: users, error: userError } = await supabase
    .from('users')
    .select('id');
  
  if (userError) {
    console.error('Error fetching users:', userError);
    return;
  }

  const badgeTypes = ['beginner', 'tester', 'developer', 'growthHacker', 'moderator'];
  
  // Assign random badges to users
  for (const user of users) {
    // Each user gets 1-3 badges
    const numBadges = Math.floor(Math.random() * 3) + 1;
    
    // Get random badge types without duplicates
    const shuffledBadges = [...badgeTypes].sort(() => 0.5 - Math.random());
    const userBadges = shuffledBadges.slice(0, numBadges);
    
    for (const badgeType of userBadges) {
      const badge = {
        userId: user.id,
        badgeType,
        earnedAt: new Date(Date.now() - Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000) // Random date in the last 90 days
      };

      const { data, error } = await supabase
        .from('badges')
        .insert([badge])
        .select();
      
      if (error) {
        console.error(`Error inserting badge for user ${user.id}:`, error);
      } else {
        console.log(`Inserted badge "${badgeType}" for user ${user.id}`);
      }
    }
  }
}

// Execute seed functions
export async function seedDatabase() {
  try {
    // Create tables if they don't exist
    const createTableQueries = [
      `CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        email TEXT,
        telegram_id TEXT,
        chips INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        is_under_18 BOOLEAN DEFAULT FALSE,
        is_admin BOOLEAN DEFAULT FALSE
      )`,
      `CREATE TABLE IF NOT EXISTS badges (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL,
        badge_type TEXT NOT NULL,
        earned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`,
      `CREATE TABLE IF NOT EXISTS games (
        id SERIAL PRIMARY KEY,
        creator_id INTEGER NOT NULL,
        title TEXT NOT NULL,
        prompt TEXT NOT NULL,
        description TEXT,
        game_type TEXT NOT NULL,
        monetization TEXT[],
        thumbnail TEXT,
        status TEXT DEFAULT 'pending',
        telegram_mini_app_data JSONB,
        web_game_url TEXT,
        chips_earned INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        creator TEXT
      )`
    ];

    for (const query of createTableQueries) {
      const { error } = await supabase.rpc('execute_sql', { query });
      if (error) {
        console.error('Error creating table:', error);
      }
    }

    // Check if users table is empty before seeding
    const { count, error } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true });
    
    if (error) {
      console.error('Error checking user count:', error);
      return;
    }

    if (count === 0) {
      await seedUsers();
      await seedGames();
      await seedBadges();
      console.log('Database seeding completed successfully!');
    } else {
      console.log('Database already contains data. Skipping seed.');
    }
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}
