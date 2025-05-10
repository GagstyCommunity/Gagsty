// Game types
export const GAME_TYPES = [
  {
    id: 'mini-app',
    name: 'Telegram Mini App',
    icon: 'telegram',
    iconColor: '#229ED9',
    description: 'Create a game that runs directly in Telegram',
  },
  {
    id: 'web-game',
    name: 'Web Game',
    icon: 'globe',
    iconColor: '#00E0FF',
    description: 'Build a browser-based game accessible on any device',
  },
  {
    id: 'mobile',
    name: 'Mobile Game',
    icon: 'mobile-alt',
    iconColor: '#FF8855',
    description: 'Develop a game for mobile devices and app stores',
  },
];

// Monetization options
export const MONETIZATION_OPTIONS = [
  {
    id: 'in-game-chips',
    name: 'In-game Chips',
    icon: 'coins',
    iconColor: '#FFCF44',
    description: 'Players can earn and spend Gagsty Chips',
  },
  {
    id: 'ads',
    name: 'Ads',
    icon: 'ad',
    iconColor: '#00E0FF',
    description: 'Generate revenue through non-intrusive advertisements',
  },
  {
    id: 'referral',
    name: 'Referral',
    icon: 'users',
    iconColor: '#5D2E8C',
    description: 'Reward players for inviting friends',
  },
  {
    id: 'upgrade',
    name: 'Upgrades',
    icon: 'arrow-up',
    iconColor: '#FF8855',
    description: 'Offer premium upgrades and boosts',
  },
];

// Game filters
export const GAME_FILTERS = [
  {
    id: 'trending',
    name: 'Trending',
    icon: 'fire',
    iconColor: '#FF8855'
  },
  {
    id: 'ai-powered',
    name: 'AI-Powered',
    icon: 'brain',
    iconColor: '#00E0FF'
  },
  {
    id: 'earnable',
    name: 'Earnable',
    icon: 'coins',
    iconColor: '#FFCF44'
  },
  {
    id: 'community',
    name: 'Community Built',
    icon: 'users',
    iconColor: '#5D2E8C'
  },
  {
    id: 'beta',
    name: 'Beta Tests',
    icon: 'flask',
    iconColor: '#2D9B4F'
  }
];

// Sample game data
export const SAMPLE_GAMES = [
  {
    id: 1,
    title: 'Neon Space Blaster',
    description: 'An arcade space shooter with powerups and three enemy types. Features neon visuals and retro sounds.',
    creator: 'spacegamer',
    chipsEarned: 2400,
    thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f',
    gameType: 'mini-app',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // 7 days ago
  },
  {
    id: 2,
    title: 'Medieval Quest',
    description: 'A fantasy RPG where you defeat monsters, collect treasure, and explore a vast medieval kingdom.',
    creator: 'rpgmaster',
    chipsEarned: 5100,
    thumbnail: 'https://images.unsplash.com/photo-1543622748-5ee7237e8565',
    gameType: 'web-game',
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000) // 14 days ago
  },
  {
    id: 3,
    title: 'Puzzle Flux',
    description: 'A mind-bending puzzle game with colorful shapes and patterns that challenge your spatial reasoning.',
    creator: 'puzzlemaster',
    chipsEarned: 3800,
    thumbnail: 'https://images.unsplash.com/photo-1633493702341-4d04841df53b',
    gameType: 'mobile',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) // 5 days ago
  }
];
