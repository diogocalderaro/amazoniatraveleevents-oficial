import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL and Anon Key are required in environment variables');
}

// Admin client: manages auth sessions for the admin panel
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storageKey: 'admin_panel_auth_token',
    persistSession: true,
    autoRefreshToken: true
  }
});

// Public client: never stores sessions, always uses anon key directly.
// Used for all public-facing pages so they never fail during admin token refresh.
export const supabasePublic = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false,
  },
});
