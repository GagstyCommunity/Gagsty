
import { createClient } from '@supabase/supabase-js';

// Use environment variables or fallback to empty strings
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase credentials. Make sure environment variables are set.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
