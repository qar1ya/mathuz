import { createClient } from '@supabase/supabase-js';
const supabase = createClient(
  'https://cngkzlkreddsdpjqflsb.supabase.co',
  'sb_publishable_XBtykx-ZbWc1326el4G5SA_JEgpuDOo'
);

// Triangle ABC: A(120,18), B(22,145), C(230,145)
// Extended lines at B (to left) and C (to right) for exterior angles
const svg = `<svg viewBox="0 0 290 175" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:320px">
  <rect width="290" height="175" fill="white"/>

  <!-- Triangle sides -->
  <polyline points="120,18 22,145 230,145 120,18" stroke="#111" stroke-width="1.7" fill="none"/>

  <!-- Extension of CB beyond B (to the left) -->
  <line x1="22" y1="145" x2="-15" y2="145" stroke="#111" stroke-width="1.3" stroke-dasharray="4,3"/>

  <!-- Extension of BC beyond C (to the right) -->
  <line x1="230" y1="145" x2="275" y2="145" stroke="#111" stroke-width="1.3" stroke-dasharray="4,3"/>

  <!-- Arc at B for 100° exterior angle -->
  <path d="M 2,145 A 20,20 0 0,0 22,125" stroke="#555" stroke-width="1.2" fill="none"/>

  <!-- Arc at C for 140° exterior angle -->
  <path d="M 250,145 A 22,22 0 0,0 230,123" stroke="#555" stroke-width="1.2" fill="none"/>

  <!-- Angle α arc at A -->
  <path d="M 110,36 A 20,20 0 0,1 132,32" stroke="#555" stroke-width="1.2" fill="none"/>

  <!-- Vertex labels -->
  <text x="113" y="13" font-size="13" font-weight="bold" fill="#111">A</text>
  <text x="5"   y="143" font-size="13" font-weight="bold" fill="#111">B</text>
  <text x="234" y="143" font-size="13" font-weight="bold" fill="#111">C</text>

  <!-- Angle labels -->
  <text x="109" y="48" font-size="13" font-style="italic" fill="#111">&#945;</text>
  <text x="-2"  y="135" font-size="12" fill="#444">100°</text>
  <text x="244" y="135" font-size="12" fill="#444">140°</text>
</svg>`;

const q = {
  id: 'tri-ext-001',
  text: "Rasmda uchburchak ABC tasvirlangan. B va C uchlarida tashqi burchaklar ko'rsatilgan: B dagi tashqi burchak 100°, C dagi tashqi burchak 140°. \\alpha burchakni toping.",
  options: [],
  answer: "\\alpha = 60°",
  solution: "\\text{Tashqi burchak teoremasi: tashqi burchak = qolgan 2 ta ichki burchak yig'indisi.}\\\\\\text{Tashqi}_B = \\alpha + \\angle C = 100°\\\\\\text{Tashqi}_C = \\alpha + \\angle B = 140°\\\\\\text{Yig'indisi: } 2\\alpha + (\\angle B + \\angle C) = 240°\\\\\\alpha + 180° - \\alpha + \\alpha = 240° \\Rightarrow \\alpha = 60°",
  topic: "Uchburchakning tashqi burchaqlari",
  difficulty: "O'rtacha",
  exam_type: ["DTM", "Milliy Sertifikat", "Maktab"],
  diagram_svg: svg,
};

const { error } = await supabase.from('questions').insert([q]);
if (error) { console.error('Xato:', error.message); process.exit(1); }
console.log('✅ Savol qo\'shildi: tri-ext-001');
