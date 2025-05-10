// Game related stats
export const GAME_STATS = {
  totalGames: 1240,
  activeUsers: 24000,
  chipsEarned: 845000000,
  successRate: 92
};

// Platform stats
export const PLATFORM_FEATURES = {
  supportedGameTypes: ['Telegram Mini Apps', '2D Web Games', '3D Godot Builds']
};

// Chips and token information
export const ECONOMY = {
  chips: {
    totalSupply: '100 Billion',
    earnMethods: [
      { name: 'Playing Games', icon: 'gamepad' },
      { name: 'Moderation', icon: 'shield-alt' },
      { name: 'Quests', icon: 'tasks' },
      { name: 'Referrals', icon: 'user-plus' }
    ],
    spendingMethods: [
      { name: 'Game Boosts', icon: 'bolt' },
      { name: 'Skins', icon: 'tshirt' },
      { name: 'Upgrades', icon: 'arrow-up' },
      { name: 'Lootboxes', icon: 'box' }
    ]
  },
  token: {
    symbol: 'GAGSTY',
    totalSupply: '1 Billion',
    tokenomics: [
      { name: 'Community', percentage: 40, color: '#5D2E8C' },
      { name: 'Team', percentage: 20, color: '#00E0FF' },
      { name: 'Ecosystem', percentage: 15, color: '#2D9B4F' },
      { name: 'Advisors', percentage: 5, color: '#229ED9' },
      { name: 'Reserve', percentage: 10, color: '#FFCF44' },
      { name: 'Public', percentage: 10, color: '#FF8855' }
    ],
    useCases: [
      { name: 'Chips Conversion', icon: 'exchange-alt' },
      { name: 'Pro Builder Access', icon: 'unlock' },
      { name: 'Payouts & Redeem', icon: 'hand-holding-usd' },
      { name: 'Partner Tools', icon: 'tools' }
    ]
  },
  roadmap: [
    { phase: 'Phase 1', name: 'MVP Launch', description: 'Game creation engine, Telegram Mini App integration', status: 'completed' },
    { phase: 'Phase 2', name: 'Community + Badges', description: 'Badge system, reward tiers, quest infrastructure', status: 'completed' },
    { phase: 'Phase 3', name: 'Token Launch', description: 'GAGSTY token launch, DEX listings, token utility', status: 'active' },
    { phase: 'Phase 4', name: 'Game Marketplace', description: 'Buy, sell, and trade games and game assets', status: 'upcoming' },
    { phase: 'Phase 5', name: 'Multiplayer Arena', description: 'Cross-game tournaments, leagues, and championships', status: 'upcoming' }
  ]
};

// Tasks and rewards
export const TASKS = [
  { 
    name: 'Submit Prompts', 
    description: 'Create game ideas that others can build upon', 
    reward: 'Earn 50-200 Chips per approved prompt',
    icon: 'lightbulb',
    iconColor: '#5D2E8C'
  },
  { 
    name: 'Moderate Games', 
    description: 'Review and approve community submissions', 
    reward: 'Earn 20-100 Chips per moderation',
    icon: 'shield-alt',
    iconColor: '#2D9B4F'
  },
  { 
    name: 'Test Bugs', 
    description: 'Find and report issues in games', 
    reward: 'Earn 10-50 Chips per verified bug',
    icon: 'bug',
    iconColor: '#00E0FF'
  },
  { 
    name: 'Refer Users', 
    description: 'Bring new creators and players to the platform', 
    reward: 'Earn 100 Chips per active referral',
    icon: 'user-plus',
    iconColor: '#FF8855'
  },
  { 
    name: 'Complete Quests', 
    description: 'Daily and weekly platform challenges', 
    reward: 'Earn 25-500 Chips per quest',
    icon: 'trophy',
    iconColor: '#229ED9'
  }
];

// Badge system
export const BADGES = [
  {
    name: 'Beginner',
    description: 'First steps in the Gagsty ecosystem',
    icon: 'seedling',
    color: '#F4F4F4'
  },
  {
    name: 'Tester',
    description: 'Quality assurance and bug hunting',
    icon: 'vial',
    color: '#2D9B4F'
  },
  {
    name: 'Developer',
    description: 'Building and improving games',
    icon: 'code',
    color: '#00E0FF'
  },
  {
    name: 'Growth Hacker',
    description: 'Promoting and growing the platform',
    icon: 'chart-line',
    color: '#FF8855'
  },
  {
    name: 'Moderator',
    description: 'Maintaining community standards',
    icon: 'shield-alt',
    color: '#FF4B4B'
  }
];

// Revenue split
export const REVENUE_SPLIT = {
  creator: 60,
  referral: 10,
  platform: 30
};

// Telegram integration features
export const TELEGRAM_FEATURES = [
  {
    name: 'Instant Deployment',
    description: 'Your game is automatically deployed as a Telegram Mini App with just one click. No technical knowledge required.',
    icon: 'rocket',
    color: '#229ED9'
  },
  {
    name: 'Viral Growth Features',
    description: 'Built-in sharing and viral growth features to help your game reach more players.',
    icon: 'users',
    color: '#229ED9',
    subFeatures: [
      { name: 'Invite-to-Play', icon: 'user-plus' },
      { name: 'Daily Rewards', icon: 'calendar-check' },
      { name: 'Leaderboards', icon: 'trophy' },
      { name: 'Game Challenges', icon: 'tasks' }
    ]
  },
  {
    name: 'Auto-Generated Code',
    description: 'We automatically generate all the necessary code for your Telegram Mini App.',
    icon: 'code',
    color: '#229ED9',
    codeExample: `{
  "name": "Neon Space Blaster",
  "description": "Retro space shooter with powerups",
  "botUsername": "NeonSpaceBlasterBot",
  "startParam": "play_game_12345",
  "payload": "play_game_12345",
  "features": ["dailyRewards", "inviteFriends", "leaderboard"]
}`
  }
];

// Pro Tips for game creation
export const PRO_TIPS = [
  {
    tip: 'Be specific about game mechanics and goals',
    description: 'The more details you provide, the better your game will be.'
  },
  {
    tip: 'Mention visual style and theme',
    description: 'E.g., "pixel art", "cyberpunk", "cartoon", "realistic"'
  },
  {
    tip: 'Include character details and abilities',
    description: 'What makes your main character unique and interesting?'
  },
  {
    tip: 'Describe progression and rewards',
    description: 'How do players advance and what do they earn?'
  }
];
