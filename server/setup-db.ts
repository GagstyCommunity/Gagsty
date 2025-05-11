
import { supabase } from './db';

async function setupDatabase() {
  try {
    // Create execute_sql function in Supabase
    const createFunctionQuery = `
      CREATE OR REPLACE FUNCTION execute_sql(query text)
      RETURNS void
      LANGUAGE plpgsql
      SECURITY DEFINER
      AS $$
      BEGIN
        EXECUTE query;
      END;
      $$;
    `;

    const { error } = await supabase.rpc('execute_sql', { query: createFunctionQuery });
    
    if (error) {
      // Function might not exist yet, try direct SQL execution
      const { error: createError } = await supabase
        .from('_temp_create_function')
        .insert({ sql: createFunctionQuery });
      
      if (createError) {
        console.error('Error creating execute_sql function:', createError);
        
        // Alternative approach: Create tables directly via REST API
        console.log('Setting up tables via direct SQL statements...');
        await setupTablesDirectly();
      } else {
        console.log('Created execute_sql function successfully');
      }
    } else {
      console.log('execute_sql function already exists or was created successfully');
    }
  } catch (error) {
    console.error('Error in database setup:', error);
  }
}

async function setupTablesDirectly() {
  // Create users table
  const createUsersTable = await supabase.from('users').insert({
    id: 0,
    username: 'temp_setup_user',
    password: 'temp',
    email: 'temp@example.com',
    chips: 0,
    is_under_18: false,
    is_admin: false
  }).select();

  if (createUsersTable.error && !createUsersTable.error.message.includes('already exists')) {
    console.error('Error creating users table:', createUsersTable.error);
  }

  // Create badges table
  const createBadgesTable = await supabase.from('badges').insert({
    id: 0,
    user_id: 0,
    badge_type: 'temp'
  }).select();

  if (createBadgesTable.error && !createBadgesTable.error.message.includes('already exists')) {
    console.error('Error creating badges table:', createBadgesTable.error);
  }

  // Create games table
  const createGamesTable = await supabase.from('games').insert({
    id: 0,
    creator_id: 0,
    title: 'temp',
    prompt: 'temp',
    game_type: 'temp',
    monetization: ['temp'],
    status: 'pending'
  }).select();

  if (createGamesTable.error && !createGamesTable.error.message.includes('already exists')) {
    console.error('Error creating games table:', createGamesTable.error);
  }

  // Clean up temp data
  await supabase.from('users').delete().eq('id', 0);
  await supabase.from('badges').delete().eq('id', 0);
  await supabase.from('games').delete().eq('id', 0);
}

setupDatabase().catch(console.error);
