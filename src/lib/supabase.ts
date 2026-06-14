import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://cngkzlkreddsdpjqflsb.supabase.co";

const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "sb_publishable_XBtykx-ZbWc1326el4G5SA_JEgpuDOo";

export const supabase = createClient(supabaseUrl, supabaseKey);
