import { createBrowserClient } from "@supabase/ssr";
import { createClient as createJSClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";

export function createClient() {
  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}

export const supabase = createJSClient(supabaseUrl, supabaseAnonKey);

export function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

  if (!url || !key) return false;
  if (url.includes("your-project") || url.includes("placeholder") || url.includes("example")) return false;
  if (key.includes("your-anon-key") || key.includes("placeholder")) return false;

  return true;
}
