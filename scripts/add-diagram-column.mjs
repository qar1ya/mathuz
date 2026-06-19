// Supabase Dashboard'da quyidagi SQL ni ishga tushiring:
// ALTER TABLE questions ADD COLUMN IF NOT EXISTS diagram_svg TEXT;
//
// Yoki ushbu script orqali tekshirish mumkin:

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://cngkzlkreddsdpjqflsb.supabase.co",
  "sb_publishable_XBtykx-ZbWc1326el4G5SA_JEgpuDOo"
);

// Test: diagram_svg ustuni mavjudmi?
const { data, error } = await supabase
  .from("questions")
  .select("id, diagram_svg")
  .limit(1);

if (error) {
  console.log("diagram_svg ustuni yo'q. Supabase Dashboard'dan qo'shing:");
  console.log("ALTER TABLE questions ADD COLUMN IF NOT EXISTS diagram_svg TEXT;");
} else {
  console.log("✓ diagram_svg ustuni mavjud!", data);
}
