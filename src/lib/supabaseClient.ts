import { createClient } from '@supabase/supabase-js';

export const SUPABASE_URL = 'https://hsxfnoqcwzwmksecrwep.supabase.co';
export const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhzeGZub3Fjd3p3bWtzZWNyd2VwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE2MTU2MjcsImV4cCI6MjEwNzE5MTYyN30.OKxZuHCFhYj21H4W4KwuFDmkP0ctVzn4ToDWAOamFaY';
export const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_gRu_33BT05D8s2WsW-UBMQ_lv5vqTH_';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true
  }
});
