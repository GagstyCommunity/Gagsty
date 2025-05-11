
import { createClient } from '@supabase/supabase-js';

// Use environment variables or fallback to development values if not set
const supabaseUrl = process.env.SUPABASE_URL || 'https://example.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || 'mock-key-for-development';

// Only warn in development mode instead of throwing error
if (process.env.NODE_ENV === 'development') {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) {
    console.warn('⚠️ Using mock Supabase credentials for development. Set up actual credentials for database access.');
  }
} else if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(
  supabaseUrl,
  supabaseServiceKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

// Export commonly used tables
export const db = {
  users: () => supabase.from('users'),
  games: () => supabase.from('games'),
  badges: () => supabase.from('badges'),
}
