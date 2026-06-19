import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://cngkzlkreddsdpjqflsb.supabase.co',
  'sb_publishable_XBtykx-ZbWc1326el4G5SA_JEgpuDOo'
);

const TOPIC = "Kesishuvchi to'g'ri chiziqlar";

// Two lines crossing at (110, 83):
//   Line a: (20,130) → (200,35)   [goes upper-right, labeled "a"]
//   Line b: (20,35)  → (200,130)  [goes lower-right, labeled "b"]
// Sector label positions:
//   UPPER  ≈ (97, 50)   — obtuse sector on top
//   RIGHT  ≈ (150, 83)  — acute sector on right
//   LOWER  ≈ (97, 118)  — obtuse sector on bottom
//   LEFT   ≈ (52, 83)   — acute sector on left

function makeSVG({ ul = '', u = '', r = '', d = '', l = '', extra = '' } = {}) {
  const W = 220, H = 165;
  return (
    `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">` +
    `<rect width="${W}" height="${H}" fill="#1a2332"/>` +
    `<line x1="20" y1="130" x2="200" y2="35" stroke="#9ca3af" stroke-width="1.5"/>` +
    `<text x="202" y="34" fill="#e5e7eb" font-size="11" font-style="italic">a</text>` +
    `<line x1="20" y1="35" x2="200" y2="130" stroke="#9ca3af" stroke-width="1.5"/>` +
    `<text x="202" y="132" fill="#e5e7eb" font-size="11" font-style="italic">b</text>` +
    (ul ? `<text x="38" y="83" fill="#e5e7eb" font-size="12">${ul}</text>` : '') +
    (u  ? `<text x="95" y="50" fill="#00d4aa" font-size="12">${u}</text>`  : '') +
    (r  ? `<text x="148" y="83" fill="#00d4aa" font-size="12">${r}</text>` : '') +
    (d  ? `<text x="95" y="118" fill="#00d4aa" font-size="12">${d}</text>` : '') +
    (l  ? `<text x="50" y="83" fill="#00d4aa" font-size="12">${l}</text>`  : '') +
    extra +
    `</svg>`
  );
}

const questions = [
  // ── Q81 ──────────────────────────────────────────────────────────────────
  {
    id: 'kesishuvchi-1',
    text: "Ikkita to'g'ri chiziqning kesishishidan hosil bo'lgan burchaklardan biri 135° ga teng. \\alpha_1, \\alpha_2, \\alpha_3 burchaklarni toping.",
    options: [
      '\\alpha_1=45°,\\ \\alpha_2=135°,\\ \\alpha_3=45°',
      '\\alpha_1=135°,\\ \\alpha_2=45°,\\ \\alpha_3=135°',
      '\\alpha_1=45°,\\ \\alpha_2=45°,\\ \\alpha_3=135°',
      '\\alpha_1=135°,\\ \\alpha_2=135°,\\ \\alpha_3=45°',
    ],
    answer: '\\alpha_1=45°,\\ \\alpha_2=135°,\\ \\alpha_3=45°',
    solution:
      '\\alpha_1 = 180°-135°=45°; \\quad \\alpha_2=135° \\text{ (vertikal)}; \\quad \\alpha_3=45° \\text{ (vertikal)}',
    topic: TOPIC,
    difficulty: "Oson",
    examType: ["DTM", "Milliy Sertifikat", "Maktab"],
    diagramSvg: makeSVG({
      ul: '135°',
      u: 'α₁',
      r: 'α₃',
      d: 'α₂',
    }),
  },

  // ── Q82 ──────────────────────────────────────────────────────────────────
  {
    id: 'kesishuvchi-2',
    text: "Rasmda ko'rsatilganidek, ikkita to'g'ri chiziqning kesishishida 60° burchak hosil bo'lgan. \\alpha + \\beta ni toping.",
    options: ['240°', '120°', '180°', '300°'],
    answer: '240°',
    solution:
      '60° ga qo\'shni burchak = 120°. \\alpha=120°, \\beta=120° (vertikal burchaklar). \\alpha+\\beta=240°',
    topic: TOPIC,
    difficulty: "O'rtacha",
    examType: ["DTM", "Milliy Sertifikat", "Maktab"],
    diagramSvg: makeSVG({
      u: 'α',
      r: '60°',
      d: 'β',
      l: '',
    }),
  },

  // ── Q83 ──────────────────────────────────────────────────────────────────
  {
    id: 'kesishuvchi-3',
    text: "Ikkita to'g'ri chiziqning kesishishida hosil bo'lgan vertikal burchaklardan biri (140°-\\alpha), ikkinchisi (2\\alpha-40°) ga teng. \\alpha ni toping.",
    options: ['60°', '80°', '45°', '70°'],
    answer: '60°',
    solution:
      '\\text{Vertikal burchaklar teng}: 140°-\\alpha = 2\\alpha-40° \\Rightarrow 180°=3\\alpha \\Rightarrow \\alpha=60°',
    topic: TOPIC,
    difficulty: "O'rtacha",
    examType: ["DTM", "Milliy Sertifikat", "Maktab"],
    diagramSvg: makeSVG({
      ul: '140°−α',
      r: '2α−40°',
    }),
  },

  // ── Q84 ──────────────────────────────────────────────────────────────────
  {
    id: 'kesishuvchi-4',
    text: "\\sin\\alpha_2 = \\frac{\\sqrt{3}}{2} va \\alpha_2 > 90° bo'lsa, \\alpha_1, \\alpha_3, \\alpha_4 ni toping.",
    options: [
      '\\alpha_1=60°,\\ \\alpha_3=60°,\\ \\alpha_4=120°',
      '\\alpha_1=120°,\\ \\alpha_3=120°,\\ \\alpha_4=60°',
      '\\alpha_1=30°,\\ \\alpha_3=30°,\\ \\alpha_4=150°',
      '\\alpha_1=60°,\\ \\alpha_3=120°,\\ \\alpha_4=60°',
    ],
    answer: '\\alpha_1=60°,\\ \\alpha_3=60°,\\ \\alpha_4=120°',
    solution:
      '\\sin\\alpha_2=\\frac{\\sqrt{3}}{2},\\ \\alpha_2>90° \\Rightarrow \\alpha_2=120°. ' +
      '\\alpha_1=180°-120°=60°;\\ \\alpha_3=\\alpha_1=60°;\\ \\alpha_4=\\alpha_2=120°',
    topic: TOPIC,
    difficulty: "O'rtacha",
    examType: ["DTM", "Milliy Sertifikat", "Maktab"],
    diagramSvg: makeSVG({
      ul: 'α₁',
      u: 'α₄',
      r: 'α₃',
      d: 'α₂',
    }),
  },

  // ── Q85 ──────────────────────────────────────────────────────────────────
  {
    id: 'kesishuvchi-5',
    text: "\\tg\\alpha_4 = \\frac{\\sqrt{3}}{3} bo'lsa, \\alpha_1, \\alpha_2, \\alpha_3 ni toping.",
    options: [
      '\\alpha_1=30°,\\ \\alpha_2=150°,\\ \\alpha_3=30°',
      '\\alpha_1=60°,\\ \\alpha_2=120°,\\ \\alpha_3=60°',
      '\\alpha_1=30°,\\ \\alpha_2=30°,\\ \\alpha_3=150°',
      '\\alpha_1=150°,\\ \\alpha_2=30°,\\ \\alpha_3=150°',
    ],
    answer: '\\alpha_1=30°,\\ \\alpha_2=150°,\\ \\alpha_3=30°',
    solution:
      '\\tg\\alpha_4=\\frac{\\sqrt{3}}{3}=\\tg30° \\Rightarrow \\alpha_4=30°. ' +
      '\\alpha_1=\\alpha_3=30° \\text{ (vertikal)};\\ \\alpha_2=150° \\text{ (qo\'shni)}',
    topic: TOPIC,
    difficulty: "O'rtacha",
    examType: ["DTM", "Milliy Sertifikat", "Maktab"],
    diagramSvg: makeSVG({
      ul: 'α₁',
      u: 'α₄',
      r: 'α₃',
      d: 'α₂',
    }),
  },

  // ── Q86 ──────────────────────────────────────────────────────────────────
  {
    id: 'kesishuvchi-6',
    text: "Ikki to'g'ri chiziqning kesishishidan hosil bo'lgan burchaklardan uchtasining yig'indisi 300° ga teng bo'lsa, shu burchaklarni toping.",
    options: ['60° va 120°', '45° va 135°', '30° va 150°', '72° va 108°'],
    answer: '60° va 120°',
    solution:
      '\\text{Kesishuvchi to\'g\'ri chiziqlar } \\alpha \\text{ va } \\beta \\text{ hosil qiladi: } \\alpha+\\beta=180°.' +
      ' \\text{ Uchta burchak: } \\alpha+\\beta+\\beta=180°+\\beta=300° \\Rightarrow \\beta=120°,\\ \\alpha=60°',
    topic: TOPIC,
    difficulty: "O'rtacha",
    examType: ["DTM", "Milliy Sertifikat", "Maktab"],
    diagramSvg: makeSVG({ ul: 'β', r: 'α', d: 'β', l: 'α' }),
  },

  // ── Q87 ──────────────────────────────────────────────────────────────────
  {
    id: 'kesishuvchi-7',
    text: "Ikki to'g'ri chiziqning kesishishidan hosil bo'lgan o'tkir burchak va unga qo'shni ikki o'tmas burchaklarning yig'indisi 340° ga teng. Shu burchaklarni toping.",
    options: ['20° va 160°', '40° va 140°', '30° va 150°', '10° va 170°'],
    answer: '20° va 160°',
    solution:
      '\\alpha+2\\beta=340°,\\ \\alpha+\\beta=180° \\Rightarrow \\beta=160°,\\ \\alpha=20°',
    topic: TOPIC,
    difficulty: "O'rtacha",
    examType: ["DTM", "Milliy Sertifikat", "Maktab"],
    diagramSvg: null,
  },

  // ── Q88 ──────────────────────────────────────────────────────────────────
  {
    id: 'kesishuvchi-8',
    text: "Ikki to'g'ri chiziqning kesishishidan hosil bo'lgan o'tkir burchak va unga qo'shni ikki o'tmas burchakning yig'indisi 320° ga teng. Shu burchaklarni toping.",
    options: ['40° va 140°', '20° va 160°', '30° va 150°', '50° va 130°'],
    answer: '40° va 140°',
    solution:
      '\\alpha+2\\beta=320°,\\ \\alpha+\\beta=180° \\Rightarrow \\beta=140°,\\ \\alpha=40°',
    topic: TOPIC,
    difficulty: "O'rtacha",
    examType: ["DTM", "Milliy Sertifikat", "Maktab"],
    diagramSvg: makeSVG({ ul: 'β', r: 'α', d: 'β', l: 'α' }),
  },

  // ── Q89 ──────────────────────────────────────────────────────────────────
  {
    id: 'kesishuvchi-9',
    text: "Ikki to'g'ri chiziqning kesishishidan hosil bo'lgan o'tmas burchak va unga qo'shni ikki o'tkir burchakning yig'indisi 210° ga teng. Shu burchaklarni toping.",
    options: ['150° va 30°', '120° va 60°', '135° va 45°', '160° va 20°'],
    answer: '150° va 30°',
    solution:
      '\\beta+2\\alpha=210°,\\ \\alpha+\\beta=180° \\Rightarrow \\alpha=30°,\\ \\beta=150°',
    topic: TOPIC,
    difficulty: "O'rtacha",
    examType: ["DTM", "Milliy Sertifikat", "Maktab"],
    diagramSvg: null,
  },

  // ── Q90 ──────────────────────────────────────────────────────────────────
  {
    id: 'kesishuvchi-10',
    text: "Rasmda ko'rsatilganidek, ikkita to'g'ri chiziq kesishishida hosil bo'lgan qo'shni burchaklar (\\alpha+65°), \\alpha, (\\alpha+65°) ko'rinishida. \\alpha ni toping.",
    options: ['57.5°', '30°', '45°', '65°'],
    answer: '57.5°',
    solution:
      '\\text{Qo\'shni burchaklar: }(\\alpha+65°)+\\alpha=180° \\Rightarrow 2\\alpha=115° \\Rightarrow \\alpha=57.5°',
    topic: TOPIC,
    difficulty: "O'rtacha",
    examType: ["DTM", "Milliy Sertifikat", "Maktab"],
    diagramSvg: makeSVG({
      ul: 'α+65°',
      r: 'α',
      d: 'α+65°',
    }),
  },

  // ── Q91 ──────────────────────────────────────────────────────────────────
  {
    id: 'kesishuvchi-11',
    text: "Ikki to'g'ri chiziqning kesishishidan hosil bo'lgan burchaklar o'zaro 2:3:2:3 nisbatda bo'lsa, shu to'g'ri chiziqlar orasidagi o'tkir burchakni toping.",
    options: ['72°', '108°', '60°', '54°'],
    answer: '72°',
    solution:
      '2k+3k+2k+3k=360° \\Rightarrow 10k=360° \\Rightarrow k=36°. O\'tkir = 2\\times36°=72°',
    topic: TOPIC,
    difficulty: "O'rtacha",
    examType: ["DTM", "Milliy Sertifikat", "Maktab"],
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
  console.log(`✅ ${rows.length} ta savol muvaffaqiyatli qo'shildi! Mavzu: ${TOPIC}`);
}

main();
