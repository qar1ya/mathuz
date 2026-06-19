import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://cngkzlkreddsdpjqflsb.supabase.co',
  'sb_publishable_XBtykx-ZbWc1326el4G5SA_JEgpuDOo'
);

const TOPIC = "Parallel to'g'ri chiziqlar va kesuvchi";

// Two parallel horizontal lines with a diagonal transversal (\-style):
//   Line a: y=48,  x: 20→200
//   Line b: y=118, x: 20→200
//   Transversal: (52,8) → (165,158)
// Upper intersection ≈ (80, 48)
// Lower intersection ≈ (132, 118)
// Angle sectors at upper (80,48):
//   UL (above a, left of transversal) ≈ acute
//   UR (above a, right of transversal) ≈ obtuse
//   LR (below a, right of transversal) ≈ acute
//   LL (below a, left of transversal) ≈ obtuse
// At lower (132,118): mirror positions with parallel-line equalities

function mkSVG(labels = {}) {
  // labels: { ul_a, ur_a, lr_a, ll_a, ul_b, ur_b, lr_b, ll_b }
  // colors: given = #e5e7eb (white), unknown = #00d4aa
  const g = '#e5e7eb', u = '#00d4aa';
  const c = (val, color) =>
    val ? `<text fill="${color}" font-size="12">` + val + '</text>' : '';

  const pos = {
    ul_a: [52, 44], ur_a: [87, 40], lr_a: [87, 57], ll_a: [52, 57],
    ul_b: [104, 112], ur_b: [138, 112], lr_b: [138, 125], ll_b: [104, 125],
  };

  let texts = '';
  for (const [key, [x, y]] of Object.entries(pos)) {
    if (labels[key]) {
      const col = labels[key].startsWith('α') || labels[key].startsWith('β') || labels[key].startsWith('x') ? u : g;
      texts += `<text x="${x}" y="${y}" fill="${col}" font-size="11">${labels[key]}</text>`;
    }
  }

  return (
    `<svg viewBox="0 0 220 168" xmlns="http://www.w3.org/2000/svg">` +
    `<rect width="220" height="168" fill="#1a2332"/>` +
    `<line x1="20" y1="48" x2="200" y2="48" stroke="#9ca3af" stroke-width="1.5"/>` +
    `<text x="202" y="52" fill="#e5e7eb" font-size="11" font-style="italic">a</text>` +
    `<line x1="20" y1="118" x2="200" y2="118" stroke="#9ca3af" stroke-width="1.5"/>` +
    `<text x="202" y="122" fill="#e5e7eb" font-size="11" font-style="italic">b</text>` +
    `<line x1="52" y1="8" x2="165" y2="158" stroke="#9ca3af" stroke-width="1.5"/>` +
    texts +
    `</svg>`
  );
}

const questions = [

  // ── Q92 ─────────────────────────────────────────────────────────────────
  {
    id: 'parallel-1',
    text: "Ikki parallel to'g'ri chiziq va kesuvchi hosil qilgan 8 ta burchakdan biri 48° ga teng. Shu burchakka qo'shni burchak necha gradus?",
    options: ['132°', '48°', '90°', '142°'],
    answer: '132°',
    solution: 'Qo\'shni burchaklar qo\'shimchasi: 180° − 48° = 132°',
    topic: TOPIC, difficulty: "Oson", examType: ["DTM","Milliy Sertifikat","Maktab"],
    diagramSvg: mkSVG({ ur_a: '48°', ll_a: 'α' }),
  },

  // ── Q93 ─────────────────────────────────────────────────────────────────
  {
    id: 'parallel-2',
    text: "Ikki parallel to'g'ri chiziq va kesuvchi hosil qilgan burchaklardan biri 62° ga teng. Unga qo'shni bo'lgan burchak necha gradus?",
    options: ['118°', '62°', '90°', '128°'],
    answer: '118°',
    solution: '180° − 62° = 118°',
    topic: TOPIC, difficulty: "Oson", examType: ["DTM","Milliy Sertifikat","Maktab"],
    diagramSvg: mkSVG({ ul_a: '62°', ur_a: 'α' }),
  },

  // ── Q94  (co-interior = 142°) ────────────────────────────────────────────
  {
    id: 'parallel-3',
    text: "a ∥ b. Kesuvchi a bilan 142° ichki bir tomonli burchak hosil qiladi. α burchakni toping.",
    options: ['38°', '42°', '48°', '52°'],
    answer: '38°',
    solution: 'Ichki bir tomonli (co-interior) burchaklar yig\'indisi 180°: α = 180° − 142° = 38°',
    topic: TOPIC, difficulty: "Oson", examType: ["DTM","Milliy Sertifikat","Maktab"],
    diagramSvg: mkSVG({ ll_a: '142°', ur_b: 'α' }),
  },

  // ── Q95  (co-interior = 141°) ────────────────────────────────────────────
  {
    id: 'parallel-4',
    text: "a ∥ b. Ichki bir tomonli burchaklardan biri 141° ga teng. α ni toping.",
    options: ['39°', '41°', '49°', '31°'],
    answer: '39°',
    solution: 'α = 180° − 141° = 39°',
    topic: TOPIC, difficulty: "Oson", examType: ["DTM","Milliy Sertifikat","Maktab"],
    diagramSvg: mkSVG({ ll_a: '141°', ur_b: 'α' }),
  },

  // ── Q96  (co-interior = 125°) ────────────────────────────────────────────
  {
    id: 'parallel-5',
    text: "a ∥ b. Ichki bir tomonli burchaklardan biri 125° ga teng. α ni toping.",
    options: ['55°', '65°', '45°', '125°'],
    answer: '55°',
    solution: 'α = 180° − 125° = 55°',
    topic: TOPIC, difficulty: "Oson", examType: ["DTM","Milliy Sertifikat","Maktab"],
    diagramSvg: mkSVG({ ll_a: '125°', ur_b: 'α' }),
  },

  // ── Q97  (alternate interior = 136°) ─────────────────────────────────────
  {
    id: 'parallel-6',
    text: "a ∥ b. Almashinuvchi ichki burchaklardan biri 136° ga teng. α ni toping.",
    options: ['136°', '44°', '180°', '124°'],
    answer: '136°',
    solution: 'Almashinuvchi ichki burchaklar teng: α = 136°',
    topic: TOPIC, difficulty: "Oson", examType: ["DTM","Milliy Sertifikat","Maktab"],
    diagramSvg: mkSVG({ lr_a: '136°', ul_b: 'α' }),
  },

  // ── Q98  (co-interior = 43°) ─────────────────────────────────────────────
  {
    id: 'parallel-7',
    text: "a ∥ b. Ichki bir tomonli burchaklardan biri 43° ga teng. α ni toping.",
    options: ['137°', '47°', '133°', '143°'],
    answer: '137°',
    solution: 'α = 180° − 43° = 137°',
    topic: TOPIC, difficulty: "Oson", examType: ["DTM","Milliy Sertifikat","Maktab"],
    diagramSvg: mkSVG({ lr_a: '43°', ur_b: 'α' }),
  },

  // ── Q99  (corresponding = 55°) ───────────────────────────────────────────
  {
    id: 'parallel-8',
    text: "a ∥ b. Mos (corresponding) burchaklardan biri 55° ga teng. α ni toping.",
    options: ['55°', '125°', '90°', '35°'],
    answer: '55°',
    solution: 'Parallel to\'g\'ri chiziqlar va kesuvchida mos burchaklar teng: α = 55°',
    topic: TOPIC, difficulty: "Oson", examType: ["DTM","Milliy Sertifikat","Maktab"],
    diagramSvg: mkSVG({ ur_a: '55°', ur_b: 'α' }),
  },

  // ── Q100 ────────────────────────────────────────────────────────────────
  {
    id: 'parallel-9',
    text: "Ikki parallel to'g'ri chiziq va kesuvchi hosil qilgan ichki bir tomonli burchaklar o'zaro 7:11 nisbatda bo'lsa, shu burchaklarni toping.",
    options: ['70° va 110°', '63° va 99°', '77° va 121°', '60° va 120°'],
    answer: '70° va 110°',
    solution: '7x + 11x = 180° \\Rightarrow x = 10°; \\quad 7\\times10°=70°,\\ 11\\times10°=110°',
    topic: TOPIC, difficulty: "O'rtacha", examType: ["DTM","Milliy Sertifikat","Maktab"],
    diagramSvg: null,
  },

  // ── Q101 ────────────────────────────────────────────────────────────────
  {
    id: 'parallel-10',
    text: "Ikki parallel to'g'ri chiziq va kesuvchi hosil qilgan ichki bir tomonli burchaklar o'zaro 5:7 nisbatda. Shu burchaklarni toping.",
    options: ['75° va 105°', '60° va 84°', '50° va 70°', '70° va 98°'],
    answer: '75° va 105°',
    solution: '5x + 7x = 180° \\Rightarrow x = 15°; \\quad 75° va 105°',
    topic: TOPIC, difficulty: "O'rtacha", examType: ["DTM","Milliy Sertifikat","Maktab"],
    diagramSvg: null,
  },

  // ── Q102 ────────────────────────────────────────────────────────────────
  {
    id: 'parallel-11',
    text: "Ichki bir tomonli burchaklardan biri 37° bo'lsa, ikkinchi ichki burchakni toping.",
    options: ['143°', '37°', '153°', '127°'],
    answer: '143°',
    solution: '180° − 37° = 143°',
    topic: TOPIC, difficulty: "Oson", examType: ["DTM","Milliy Sertifikat","Maktab"],
    diagramSvg: null,
  },

  // ── Q103 ────────────────────────────────────────────────────────────────
  {
    id: 'parallel-12',
    text: "a ∥ b. Kesuvchi a bilan 52° burchak hosil qiladi. Kesuvchining b bilan hosil qilgan ichki bir tomonli burchagini toping.",
    options: ['128°', '52°', '38°', '118°'],
    answer: '128°',
    solution: 'Ichki bir tomonli burchaklar: 180° − 52° = 128°',
    topic: TOPIC, difficulty: "Oson", examType: ["DTM","Milliy Sertifikat","Maktab"],
    diagramSvg: mkSVG({ lr_a: '52°', ur_b: 'α' }),
  },

  // ── Q104 ────────────────────────────────────────────────────────────────
  {
    id: 'parallel-13',
    text: "a ∥ b. Ichki bir tomonli burchaklardan biri 117° ga teng bo'lsa, ikkinchisini toping.",
    options: ['63°', '117°', '73°', '53°'],
    answer: '63°',
    solution: '180° − 117° = 63°',
    topic: TOPIC, difficulty: "Oson", examType: ["DTM","Milliy Sertifikat","Maktab"],
    diagramSvg: mkSVG({ ll_a: '117°', ur_b: 'α' }),
  },

  // ── Q105 ────────────────────────────────────────────────────────────────
  {
    id: 'parallel-14',
    text: "a ∥ b. Ichki bir tomonli burchaklardan biri 122° ga teng. Ikkinchi ichki bir tomonli burchakni toping.",
    options: ['58°', '62°', '48°', '68°'],
    answer: '58°',
    solution: '180° − 122° = 58°',
    topic: TOPIC, difficulty: "Oson", examType: ["DTM","Milliy Sertifikat","Maktab"],
    diagramSvg: mkSVG({ ur_b: '122°', ll_a: 'α' }),
  },

  // ── Q107  (algebraic) ────────────────────────────────────────────────────
  {
    id: 'parallel-15',
    text: "a ∥ b. Ichki bir tomonli burchaklar (5x + 20)° va (x + 10)° ga teng. α = 5x + 20° ni toping.",
    options: ['145°', '125°', '35°', '155°'],
    answer: '145°',
    solution: '(5x+20) + (x+10) = 180° \\Rightarrow 6x + 30 = 180° \\Rightarrow x = 25°; \\quad \\alpha = 5(25)+20 = 145°',
    topic: TOPIC, difficulty: "O'rtacha", examType: ["DTM","Milliy Sertifikat","Maktab"],
    diagramSvg: mkSVG({ ll_a: '5x+20°', ur_b: 'x+10°' }),
  },

  // ── Q108 ────────────────────────────────────────────────────────────────
  {
    id: 'parallel-16',
    text: "a ∥ b. Ichki bir tomonli burchaklardan biri 124° ga teng. α ni toping.",
    options: ['56°', '66°', '46°', '124°'],
    answer: '56°',
    solution: '180° − 124° = 56°',
    topic: TOPIC, difficulty: "Oson", examType: ["DTM","Milliy Sertifikat","Maktab"],
    diagramSvg: mkSVG({ ur_b: '124°', ll_a: 'α' }),
  },

  // ── Q109 ────────────────────────────────────────────────────────────────
  {
    id: 'parallel-17',
    text: "a ∥ b. Almashinuvchi ichki burchaklardan biri 130° ga teng. α ni toping.",
    options: ['130°', '50°', '40°', '140°'],
    answer: '130°',
    solution: 'Almashinuvchi ichki burchaklar teng: α = 130°',
    topic: TOPIC, difficulty: "Oson", examType: ["DTM","Milliy Sertifikat","Maktab"],
    diagramSvg: mkSVG({ lr_a: '130°', ul_b: 'α' }),
  },

  // ── Q110 ────────────────────────────────────────────────────────────────
  {
    id: 'parallel-18',
    text: "a ∥ b. Ichki bir tomonli burchaklardan biri 143° ga teng. α ni toping.",
    options: ['37°', '47°', '27°', '143°'],
    answer: '37°',
    solution: '180° − 143° = 37°',
    topic: TOPIC, difficulty: "Oson", examType: ["DTM","Milliy Sertifikat","Maktab"],
    diagramSvg: mkSVG({ ll_a: '143°', ur_b: 'α' }),
  },

  // ── Q111 ────────────────────────────────────────────────────────────────
  {
    id: 'parallel-19',
    text: "a ∥ b. Ichki bir tomonli burchaklardan biri 33° ga teng. α ni toping.",
    options: ['147°', '57°', '137°', '157°'],
    answer: '147°',
    solution: '180° − 33° = 147°',
    topic: TOPIC, difficulty: "Oson", examType: ["DTM","Milliy Sertifikat","Maktab"],
    diagramSvg: mkSVG({ lr_a: '33°', ur_b: 'α' }),
  },

  // ── Q122 ────────────────────────────────────────────────────────────────
  {
    id: 'parallel-20',
    text: "To'g'ri burchakli uchburchakning o'tkir burchaklaridan biri 50° ga teng bo'lsa, uning ikkinchi o'tkir burchagini toping.",
    options: ['40°', '50°', '130°', '90°'],
    answer: '40°',
    solution: 'To\'g\'ri burchakli uchburchakda: 90° + 50° + \\alpha = 180° \\Rightarrow \\alpha = 40°',
    topic: TOPIC, difficulty: "Oson", examType: ["DTM","Milliy Sertifikat","Maktab"],
    diagramSvg: null,
  },
];

async function main() {
  const rows = questions.map(q => ({
    id: q.id,
    text: q.text,
    options: q.options,
    answer: q.answer,
    solution: q.solution ?? null,
    topic: q.topic,
    difficulty: q.difficulty,
    exam_type: q.examType,
    diagram_svg: q.diagramSvg ?? null,
  }));

  const { error } = await supabase.from('questions').upsert(rows, { onConflict: 'id' });
  if (error) {
    console.error('Insert error:', error.message);
    process.exit(1);
  }
  console.log(`✅ ${rows.length} ta savol qo'shildi! Mavzu: ${TOPIC}`);
}

main();
