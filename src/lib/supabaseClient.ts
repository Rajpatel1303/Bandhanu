import { createClient } from '@supabase/supabase-js';

// Try to get credentials from localStorage override (set via Admin Settings), or from Vite environment variables
const getStoredUrl = (): string | null => {
  try {
    const val = localStorage.getItem('bandhanu_supabase_url');
    return val && val.trim() ? val.trim() : null;
  } catch {
    return null;
  }
};

const getStoredKey = (): string | null => {
  try {
    const val = localStorage.getItem('bandhanu_supabase_anon_key');
    return val && val.trim() ? val.trim() : null;
  } catch {
    return null;
  }
};

const rawUrl = getStoredUrl() || import.meta.env?.VITE_SUPABASE_URL || '';
const rawKey = getStoredKey() || import.meta.env?.VITE_SUPABASE_ANON_KEY || '';

// The old demo project 'hsxfnoqcwzwmksecrwep' has expired in DNS.
// We only consider Supabase configured if a valid, active user project is provided.
export const isSupabaseConfigured = Boolean(
  rawUrl &&
  rawKey &&
  rawUrl !== 'https://hsxfnoqcwzwmksecrwep.supabase.co' &&
  !rawUrl.includes('hsxfnoqcwzwmksecrwep') &&
  rawUrl.startsWith('https://')
);

export const SUPABASE_URL = isSupabaseConfigured ? rawUrl : '';
export const SUPABASE_ANON_KEY = isSupabaseConfigured ? rawKey : '';
export const SUPABASE_PUBLISHABLE_KEY = import.meta.env?.VITE_SUPABASE_PUBLISHABLE_KEY || '';

// Safe mock client for when Supabase is not connected or in local-database mode.
// Prevents ERR_NAME_NOT_RESOLVED / Failed to fetch console exceptions while allowing seamless local storage operation.
const createSafeNoopClient = () => {
  const handler: ProxyHandler<any> = {
    get(_target, prop) {
      if (prop === 'then') {
        return (resolve: (val: any) => void) => resolve({ data: null, error: null });
      }
      if (prop === 'catch') {
        return () => Promise.resolve({ data: null, error: null });
      }
      return (..._args: any[]) => new Proxy({}, handler);
    }
  };

  return {
    from: (_table: string) => new Proxy({}, handler),
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      getSession: async () => ({ data: { session: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } })
    }
  } as any;
};

export const supabase = isSupabaseConfigured
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        persistSession: true,
        autoRefreshToken: true
      }
    })
  : createSafeNoopClient();
