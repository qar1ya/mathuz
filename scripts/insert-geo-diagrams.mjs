import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://cngkzlkreddsdpjqflsb.supabase.co",
  "sb_publishable_XBtykx-ZbWc1326el4G5SA_JEgpuDOo"
);

// Kesishuvchi to'g'ri chiziqlar SVG chizmasi
const intersectingSvg = `<svg viewBox="0 0 220 160" width="220" height="160" xmlns="http://www.w3.org/2000/svg">
  <line x1="20" y1="80" x2="200" y2="80" stroke="#00d4aa" stroke-width="2"/>
  <line x1="110" y1="15" x2="110" y2="145" stroke="#00d4aa" stroke-width="2"/>
  <path d="M110,80 L130,80 A20,20 0 0,0 110,60 Z" fill="#00d4aa" fill-opacity="0.2"/>
  <text x="118" y="72" fill="#00d4aa" font-size="15" font-family="serif" font-style="italic">α</text>
  <text x="78" y="72" fill="#9ca3af" font-size="15" font-family="serif" font-style="italic">β</text>
  <text x="116" y="108" fill="#9ca3af" font-size="15" font-family="serif" font-style="italic">α</text>
  <text x="74" y="108" fill="#9ca3af" font-size="15" font-family="serif" font-style="italic">β</text>
  <text x="195" y="76" fill="#9ca3af" font-size="11">a</text>
  <text x="106" y="12" fill="#9ca3af" font-size="11">b</text>
</svg>`;

// Qo'shni burchaklar SVG chizmasi
const adjacentSvg = `<svg viewBox="0 0 240 120" width="240" height="120" xmlns="http://www.w3.org/2000/svg">
  <line x1="20" y1="80" x2="220" y2="80" stroke="#9ca3af" stroke-width="1.5"/>
  <line x1="120" y1="80" x2="190" y2="20" stroke="#00d4aa" stroke-width="2"/>
  <path d="M120,80 L145,80 A25,25 0 0,0 136,57 Z" fill="#00d4aa" fill-opacity="0.2"/>
  <path d="M120,80 L95,80 A25,25 0 0,1 104,57 Z" fill="#3b82f6" fill-opacity="0.15"/>
  <text x="148" y="74" fill="#00d4aa" font-size="14" font-family="serif" font-style="italic">α</text>
  <text x="88" y="72" fill="#60a5fa" font-size="14" font-family="serif" font-style="italic">β</text>
</svg>`;

// Burchak bisektrissasi SVG
const bisectorSvg = `<svg viewBox="0 0 220 160" width="220" height="160" xmlns="http://www.w3.org/2000/svg">
  <line x1="30" y1="130" x2="190" y2="130" stroke="#9ca3af" stroke-width="1.5"/>
  <line x1="110" y1="130" x2="170" y2="30" stroke="#00d4aa" stroke-width="2"/>
  <line x1="110" y1="130" x2="50" y2="30" stroke="#9ca3af" stroke-width="1.5"/>
  <line x1="110" y1="130" x2="110" y2="30" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="5,3"/>
  <path d="M110,130 L130,130 A20,20 0 0,0 119,111 Z" fill="#00d4aa" fill-opacity="0.2"/>
  <path d="M110,130 L90,130 A20,20 0 0,1 101,111 Z" fill="#3b82f6" fill-opacity="0.15"/>
  <text x="133" y="120" fill="#00d4aa" font-size="13" font-family="serif" font-style="italic">α</text>
  <text x="80" y="120" fill="#60a5fa" font-size="13" font-family="serif" font-style="italic">β</text>
  <text x="113" y="95" fill="#f59e0b" font-size="11" font-family="sans-serif">bisektris</text>
</svg>`;

const questions = [
  {
    id: "geo_081",
    text: "Chizmadagi $\\alpha$ burchak $70°$ ga teng. $\\beta$ ni toping.",
    options: ["$110°$", "$70°$", "$20°$", "$140°$"],
    answer: "$110°$",
    solution: "Qo'shni burchaklar: $\\beta = 180° - 70° = 110°$",
    topic: "Geometriya",
    difficulty: "Oson",
    exam_type: ["DTM", "Milliy Sertifikat", "Maktab"],
    diagram_svg: adjacentSvg,
  },
  {
    id: "geo_082",
    text: "Chizmada ikki to'g'ri chiziq kesishmoqda. $\\alpha = 55°$ bo'lsa, teskari $\\alpha$ ni toping.",
    options: ["$55°$", "$125°$", "$35°$", "$145°$"],
    answer: "$55°$",
    solution: "Teskari (vertikal) burchaklar teng: $\\alpha' = 55°$",
    topic: "Geometriya",
    difficulty: "Oson",
    exam_type: ["DTM", "Milliy Sertifikat", "Maktab"],
    diagram_svg: intersectingSvg,
  },
  {
    id: "geo_083",
    text: "Chizmada $\\alpha$ burchakning bisektrissasi ko'rsatilgan. $\\alpha + \\beta = 180°$ va bisektris $\\dfrac{\\alpha}{2}$ hosil qiladi. Agar $\\alpha = 80°$ bo'lsa, bisektris $\\beta$ burchakni qanday qismlarga bo'ladi?",
    options: ["$40°$ va $100°$", "$40°$ va $140°$", "$80°$ va $20°$", "$90°$ va $90°$"],
    answer: "$40°$ va $100°$",
    solution: "$\\beta = 100°$. Bisektris ($\\alpha/2 = 40°$) $\\beta$ ni $40°$ va $60°$... \nTo'g'risi: bisektris ichida, $\\beta$ ga kirmaydi. Lekin uzaytirsa $\\alpha/2 + \\beta = 40°+100° = 140°$ va $\\beta - \\alpha/2 = 60°$.",
    topic: "Geometriya",
    difficulty: "Qiyin",
    exam_type: ["DTM", "Milliy Sertifikat", "Maktab"],
    diagram_svg: bisectorSvg,
  },
];

const { error } = await supabase.from("questions").upsert(questions);
if (error) console.error("Xato:", error.message);
else console.log(`✓ ${questions.length} ta chizmali masala yuklandi!`);
