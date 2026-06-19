import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://cngkzlkreddsdpjqflsb.supabase.co',
  'sb_publishable_XBtykx-ZbWc1326el4G5SA_JEgpuDOo'
);

const TOPIC = "To'g'ri burchakli uchburchakning yuzi va balandligi";

// Standard right triangle: C(top), A(bottom-left), B(bottom-right), D(foot of altitude)
function makeTriSvg({ adLabel = '', dbLabel = '', s1Label = 'S₁', s2Label = 'S₂', extraRight = '' } = {}) {
  return `<svg viewBox="0 0 220 160" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:300px">
  <rect width="220" height="160" fill="white"/>
  <!-- Triangle: C(60,18) A(15,138) B(200,138) -->
  <polyline points="15,138 200,138 60,18 15,138" stroke="#111" stroke-width="1.5" fill="none"/>
  <!-- Right angle at C -->
  <polyline points="51,26 43,34 52,40" stroke="#111" stroke-width="1.1" fill="none"/>
  <!-- Altitude h: C(60,18) → D(60,138) -->
  <line x1="60" y1="18" x2="60" y2="138" stroke="#111" stroke-width="1.2"/>
  <!-- Right angle at D -->
  <polyline points="60,128 70,128 70,138" stroke="#111" stroke-width="1.1" fill="none"/>
  <!-- Vertex labels -->
  <text x="52" y="13" font-size="12" font-style="italic" fill="#111">C</text>
  <text x="4"  y="143" font-size="12" font-style="italic" fill="#111">A</text>
  <text x="203" y="143" font-size="12" font-style="italic" fill="#111">B</text>
  <text x="55" y="152" font-size="12" font-style="italic" fill="#111">D</text>
  <!-- h label -->
  <text x="64" y="82" font-size="11" font-style="italic" fill="#111">h</text>
  <!-- S₁ and S₂ -->
  <text x="25" y="105" font-size="11" fill="#444">${s1Label}</text>
  <text x="118" y="105" font-size="11" fill="#444">${s2Label}</text>
  <!-- AD and DB labels below baseline -->
  ${adLabel ? `<text x="28" y="154" font-size="10" fill="#111">${adLabel}</text>` : ''}
  ${dbLabel ? `<text x="118" y="154" font-size="10" fill="#111">${dbLabel}</text>` : ''}
  ${extraRight}
</svg>`;
}

// Q111 & Q114 use different orientation: A(top), C(bottom-left, right angle), B(bottom-right)
function makeTriSvg2({ adLabel = '', dbLabel = '', s1Label = 'S₁', s2Label = 'S₂', extraRight = '' } = {}) {
  return `<svg viewBox="0 0 220 165" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:300px">
  <rect width="220" height="165" fill="white"/>
  <!-- Triangle: A(55,15) C(15,145) B(195,145) -->
  <polyline points="55,15 15,145 195,145 55,15" stroke="#111" stroke-width="1.5" fill="none"/>
  <!-- Right angle at C (bottom-left) approximated by the layout -->
  <!-- Altitude from A to D on CB: D(55,145) -->
  <line x1="55" y1="15" x2="55" y2="145" stroke="#111" stroke-width="1.2"/>
  <!-- Right angle at D -->
  <polyline points="55,135 65,135 65,145" stroke="#111" stroke-width="1.1" fill="none"/>
  <!-- Vertex labels -->
  <text x="48" y="11" font-size="12" font-style="italic" fill="#111">A</text>
  <text x="3"  y="150" font-size="12" font-style="italic" fill="#111">C</text>
  <text x="198" y="150" font-size="12" font-style="italic" fill="#111">B</text>
  <text x="50" y="158" font-size="12" font-style="italic" fill="#111">D</text>
  <!-- h label -->
  <text x="59" y="85" font-size="11" font-style="italic" fill="#111">h</text>
  <!-- S₁ S₂ -->
  <text x="22" y="110" font-size="11" fill="#444">${s1Label}</text>
  <text x="115" y="110" font-size="11" fill="#444">${s2Label}</text>
  <!-- Segment labels -->
  ${adLabel ? `<text x="22" y="160" font-size="10" fill="#111">${adLabel}</text>` : ''}
  ${dbLabel ? `<text x="115" y="160" font-size="10" fill="#111">${dbLabel}</text>` : ''}
  ${extraRight}
</svg>`;
}

const questions = [
  {
    id: 'geo-109',
    text: "To'g'ri burchakli uchburchakning balandligi gipotenuzani uzunliklari 9:16 kabi nisbatda bo'lgan kesmalarga, yuzini esa ayirmasi 42 ga teng bo'lgan ikki qismga ajratadi. To'g'ri burchakli uchburchakning yuzini toping.",
    options: [],
    answer: "S_{ABC} = 150",
    solution: "\\text{Xususiyat: } S_1:S_2 = AD:DB.\\quad AD:DB = 9:16 \\Rightarrow S_1=9y,\\ S_2=16y.\\quad S_2-S_1=42 \\Rightarrow 7y=42 \\Rightarrow y=6.\\quad S_{ABC}=S_1+S_2=25y=150.",
    topic: TOPIC,
    difficulty: "O'rtacha",
    exam_type: ["DTM", "Milliy Sertifikat", "Maktab"],
    diagram_svg: makeTriSvg({ adLabel: '9x', dbLabel: '16x', s1Label: '9y', s2Label: '16y' }),
  },
  {
    id: 'geo-110',
    text: "To'g'ri burchakli uchburchakning balandligi gipotenuzani uzunliklari 1:9 kabi nisbatda bo'lgan kesmalarga, yuzini esa ayirmasi 48 ga teng bo'lgan ikki qismga ajratadi. To'g'ri burchakli uchburchakning yuzini toping.",
    options: [],
    answer: "S_{ABC} = 60",
    solution: "AD:DB=1:9 \\Rightarrow S_1=y,\\ S_2=9y.\\quad S_2-S_1=48 \\Rightarrow 8y=48 \\Rightarrow y=6.\\quad S_{ABC}=10y=60.",
    topic: TOPIC,
    difficulty: "O'rtacha",
    exam_type: ["DTM", "Milliy Sertifikat", "Maktab"],
    diagram_svg: makeTriSvg({ adLabel: 'x', dbLabel: '9x', s1Label: 'y', s2Label: '9y' }),
  },
  {
    id: 'geo-111',
    text: "To'g'ri burchakli uchburchakda balandlik gipotenuzani AD:DB = 9:4 nisbatda ajratadi va hosil bo'lgan ikkala uchburchakning yuzlari ayirmasi 15 ga teng. Uchburchakning to'liq yuzini toping.",
    options: [],
    answer: "S_{ABC} = 39",
    solution: "AD:DB=9:4 \\Rightarrow S_1:S_2=9:4 \\Rightarrow S_1=9t,\\ S_2=4t.\\quad S_1-S_2=15 \\Rightarrow 5t=15 \\Rightarrow t=3.\\quad S_{ABC}=13t=39.",
    topic: TOPIC,
    difficulty: "O'rtacha",
    exam_type: ["DTM", "Milliy Sertifikat", "Maktab"],
    diagram_svg: makeTriSvg2({ adLabel: '9x', dbLabel: '4x', s1Label: 'S₁', s2Label: 'S₂' }),
  },
  {
    id: 'geo-112',
    text: "To'g'ri burchakli uchburchakning balandligi uning yuzini 1:4 kabi nisbatda bo'lgan ikki qismga ajratadi. Agar uchburchak gipotenuzasining uzunligi 40 ga teng bo'lsa, balandlik uni qanday uzunlikdagi kesmalarga ajratadi?",
    options: [],
    answer: "AD = 8,\\quad DB = 32",
    solution: "S_1:S_2=1:4 \\Rightarrow AD:DB=1:4.\\quad AB=40.\\quad AD=40\\cdot\\frac{1}{5}=8,\\quad DB=40\\cdot\\frac{4}{5}=32.",
    topic: TOPIC,
    difficulty: "O'rtacha",
    exam_type: ["DTM", "Milliy Sertifikat", "Maktab"],
    diagram_svg: makeTriSvg({ adLabel: 'y', dbLabel: '4y', s1Label: 'S₁', s2Label: 'S₂',
      extraRight: '<text x="92" y="152" font-size="10" fill="#111">AB=40</text>' }),
  },
  {
    id: 'geo-113',
    text: "To'g'ri burchakli uchburchakda balandlik gipotenuzani AD:DB = 4:9 nisbatda ajratadi. Katta qismning yuzi S₂ = 243 ga teng. Kichik qismning yuzini toping.",
    options: [],
    answer: "S_1 = 108",
    solution: "S_1:S_2=AD:DB=4:9.\\quad S_2=243 \\Rightarrow S_1=243\\cdot\\frac{4}{9}=108.",
    topic: TOPIC,
    difficulty: "Oson",
    exam_type: ["DTM", "Milliy Sertifikat", "Maktab"],
    diagram_svg: makeTriSvg({ adLabel: '4x', dbLabel: '9x', s1Label: 'S₁', s2Label: 'S₂=243' }),
  },
  {
    id: 'geo-114',
    text: "To'g'ri burchakli uchburchakda balandlik gipotenuzani AD = 14 va DB = 28 bo'lgan kesmalarga ajratadi. Kichik qismning yuzi S₁ = 98\\sqrt{2} ga teng bo'lsa, katta qismning yuzini toping.",
    options: [],
    answer: "S_2 = 196\\sqrt{2}",
    solution: "AD:DB=14:28=1:2 \\Rightarrow S_1:S_2=1:2.\\quad S_1=98\\sqrt{2} \\Rightarrow S_2=2\\cdot S_1=196\\sqrt{2}.",
    topic: TOPIC,
    difficulty: "Oson",
    exam_type: ["DTM", "Milliy Sertifikat", "Maktab"],
    diagram_svg: makeTriSvg2({ adLabel: '14', dbLabel: '28', s1Label: 'S₁', s2Label: 'S₂' }),
  },
];

const { error } = await supabase.from('questions').insert(questions);
if (error) { console.error('Xato:', error.message); process.exit(1); }
console.log(`✅ ${questions.length} ta savol qo'shildi (geo-109 dan geo-114 gacha)`);
