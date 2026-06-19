import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://cngkzlkreddsdpjqflsb.supabase.co",
  "sb_publishable_XBtykx-ZbWc1326el4G5SA_JEgpuDOo"
);

const { error, count } = await supabase
  .from("questions")
  .delete()
  .neq("id", "___never___");

if (error) console.error("Xato:", error.message);
else console.log("✓ Barcha masalalar o'chirildi.");
