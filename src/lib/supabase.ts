import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL || '').trim();
const supabasePublicKey = (
  import.meta.env.VITE_SUPABASE_PUBLIC_KEY ||
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  ''
).trim();

if (!supabaseUrl || !supabasePublicKey) {
  console.warn(
    '⚠️ Supabase credentials missing in .env! Please set VITE_SUPABASE_URL and VITE_SUPABASE_PUBLIC_KEY.'
  );
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabasePublicKey || 'placeholder-key'
);
