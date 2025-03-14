import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY, USE_MOCK_DATA, log } from './config';

// Create a single supabase client for the entire app
let supabase = null;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  log('warn', 'Supabase credentials not found. Using mock mode.');
  
  // Create a mock supabase client if credentials aren't available
  supabase = {
    from: () => ({
      select: () => Promise.resolve({ data: [], error: null }),
      insert: () => Promise.resolve({ data: null, error: null }),
      update: () => Promise.resolve({ data: null, error: null }),
      delete: () => Promise.resolve({ data: null, error: null }),
    }),
    auth: {
      signIn: () => Promise.resolve({ user: null, session: null, error: null }),
      signOut: () => Promise.resolve({ error: null }),
      onAuthStateChange: () => ({ data: null, error: null }),
    },
  };
} else {
  try {
    supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    log('info', 'Supabase client initialized successfully');
  } catch (error) {
    log('error', 'Failed to initialize Supabase client', error);
    
    // Fallback to mock client
    supabase = {
      from: () => ({
        select: () => Promise.resolve({ data: [], error: null }),
        insert: () => Promise.resolve({ data: null, error: null }),
        update: () => Promise.resolve({ data: null, error: null }),
        delete: () => Promise.resolve({ data: null, error: null }),
      }),
      auth: {
        signIn: () => Promise.resolve({ user: null, session: null, error: null }),
        signOut: () => Promise.resolve({ error: null }),
        onAuthStateChange: () => ({ data: null, error: null }),
      },
    };
  }
}

export default supabase; 