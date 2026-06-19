import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://cngkzlkreddsdpjqflsb.supabase.co",
  "sb_publishable_XBtykx-ZbWc1326el4G5SA_JEgpuDOo"
);

// geo_072: 7x-20 + 3x+40 = 180 => x=16 => 92° va 88°. Kichik=88°
// geo_073: 4x+10 + 6x-10 = 180 => x=18 => 82° va 98°. Kichik=82°

const fixes = [
  {
    id: "geo_072",
    options: ["$88°$", "$92°$", "$80°$", "$78°$"],
    answer: "$88°$",
    solution: "$10x + 20° = 180° \\Rightarrow x = 16°$; kichik: $3(16°) + 40° = 88°$",
  },
  {
    id: "geo_073",
    options: ["$82°$", "$98°$", "$80°$", "$90°$"],
    answer: "$82°$",
    solution: "$10x = 180° \\Rightarrow x = 18°$; kichik: $4(18°) + 10° = 82°$",
  },
];

for (const fix of fixes) {
  const { error } = await supabase
    .from("questions")
    .update({ options: fix.options, answer: fix.answer, solution: fix.solution })
    .eq("id", fix.id);
  if (error) console.error(`${fix.id} xato:`, error.message);
  else console.log(`✓ ${fix.id} tuzatildi`);
}
