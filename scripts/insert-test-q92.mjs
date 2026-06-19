import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://cngkzlkreddsdpjqflsb.supabase.co',
  'sb_publishable_XBtykx-ZbWc1326el4G5SA_JEgpuDOo'
);

// SVG: oq fon, qora chiziqlar — textbook asl ko'rinishi
// a || b (parallel gorizontal), c (kesuvchi diagonal)
// Intersection B(62,110) — a bilan, A(127,38) — b bilan
const diagramSvg = `<svg viewBox="0 0 220 158" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:280px;border-radius:6px">
  <rect width="220" height="158" fill="white"/>

  <!-- line a (yuqori parallel) -->
  <line x1="10" y1="40" x2="210" y2="40" stroke="#111" stroke-width="1.5"/>
  <text x="4" y="37" font-size="12" font-style="italic" fill="#111">a</text>

  <!-- line b (pastki parallel) -->
  <line x1="10" y1="112" x2="210" y2="112" stroke="#111" stroke-width="1.5"/>
  <text x="4" y="109" font-size="12" font-style="italic" fill="#111">b</text>

  <!-- kesuvchi c: (33,145) → (175,12), kesishadi A(127,40) va B(62,112) da -->
  <line x1="33" y1="145" x2="175" y2="12" stroke="#111" stroke-width="1.5"/>
  <text x="20" y="152" font-size="12" font-style="italic" fill="#111">c</text>

  <!-- Burchak yorliqlari B(62,112) da -->
  <text x="34" y="129" font-size="10" fill="#111">&#945;<tspan dy="3" font-size="8">1</tspan></text>
  <text x="66" y="129" font-size="10" fill="#111">&#945;<tspan dy="3" font-size="8">2</tspan></text>
  <text x="66" y="105" font-size="10" fill="#111">&#945;<tspan dy="3" font-size="8">3</tspan></text>
  <text x="34" y="105" font-size="10" fill="#111">&#945;<tspan dy="3" font-size="8">4</tspan></text>

  <!-- Burchak yorliqlari A(127,40) da -->
  <text x="100" y="56" font-size="10" fill="#111">&#945;<tspan dy="3" font-size="8">5</tspan></text>
  <text x="133" y="56" font-size="10" fill="#111">&#945;<tspan dy="3" font-size="8">6</tspan></text>
  <text x="133" y="31" font-size="10" fill="#111">&#945;<tspan dy="3" font-size="8">7</tspan></text>
  <text x="100" y="31" font-size="10" fill="#111">&#945;<tspan dy="3" font-size="8">8</tspan></text>
</svg>`;

const question = {
  id: 'parallel-test-1',
  text: "Rasmda ikki parallel to'g'ri chiziq va kesuvchi hosil qilgan 8 ta burchaklar tasvirlangan. \\alpha_1 = 48° berilgan holda qolgan barcha burchaklarni toping.",
  options: [],
  answer: "\\alpha_2=132°,\\ \\alpha_3=48°,\\ \\alpha_4=132°,\\ \\alpha_5=48°,\\ \\alpha_6=132°,\\ \\alpha_7=48°,\\ \\alpha_8=132°",
  solution: "\\alpha_1=48° berilgan.\\quad \\alpha_2=180°-48°=132° \\text{ (qo'shni)}.\\quad \\alpha_3=48° \\text{ (vertikal)}.\\quad \\alpha_4=132° \\text{ (qo'shni)}.\\quad a\\parallel b \\Rightarrow \\alpha_5=\\alpha_1=48°,\\ \\alpha_6=132°,\\ \\alpha_7=48°,\\ \\alpha_8=132°.",
  topic: "Parallel to'g'ri chiziqlar va kesuvchi",
  difficulty: "O'rtacha",
  exam_type: ["DTM", "Milliy Sertifikat", "Maktab"],
  diagram_svg: diagramSvg,
};

const { error } = await supabase.from('questions').insert([question]);
if (error) { console.error('Xato:', error.message); process.exit(1); }
console.log("✅ 92-savol qo'shildi (parallel-test-1)");
