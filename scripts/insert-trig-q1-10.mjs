import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://cngkzlkreddsdpjqflsb.supabase.co',
  'sb_publishable_XBtykx-ZbWc1326el4G5SA_JEgpuDOo'
);

// Acute angle (right triangle) diagram
const svgAcute = `<svg viewBox="0 0 130 100" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:260px">
  <rect width="130" height="100" fill="white"/>
  <polyline points="15,80 100,80 100,15 15,80" stroke="#111" stroke-width="1.5" fill="none"/>
  <polyline points="91,80 91,71 100,71" stroke="#111" stroke-width="1.2" fill="none"/>
  <text x="30" y="75" font-size="13" font-style="italic" fill="#111">&#945;</text>
</svg>`;

// Obtuse angle diagram (90° < α < 180°)
const svgObtuse = `<svg viewBox="0 0 140 90" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:260px">
  <rect width="140" height="90" fill="white"/>
  <line x1="30" y1="55" x2="120" y2="55" stroke="#111" stroke-width="1.5"/>
  <line x1="30" y1="55" x2="70" y2="15" stroke="#111" stroke-width="1.5"/>
  <path d="M 65,55 A 35,35 0 0,1 47,32" stroke="#111" stroke-width="1.2" fill="none"/>
  <text x="55" y="50" font-size="13" font-style="italic" fill="#111">&#945;</text>
</svg>`;

const questions = [
  {
    id: 'trig-q01',
    text: "O'tkir burchakning sinusi \\frac{3}{5} ga teng. Shu burchakning kosinusini toping.",
    options: [],
    answer: "\\cos\\alpha = \\frac{4}{5}",
    solution: "\\sin^2\\alpha + \\cos^2\\alpha = 1 \\Rightarrow \\left(\\frac{3}{5}\\right)^2 + \\cos^2\\alpha = 1 \\Rightarrow \\cos^2\\alpha = 1 - \\frac{9}{25} = \\frac{16}{25}.\\quad \\alpha \\text{ o'tkir bo'lgani uchun } \\cos\\alpha > 0 \\Rightarrow \\cos\\alpha = \\frac{4}{5}.",
    topic: "O'tkir va o'tmas burchaklar",
    difficulty: "Oson",
    exam_type: ["DTM", "Milliy Sertifikat", "Maktab"],
    diagram_svg: null,
  },
  {
    id: 'trig-q02',
    text: "O'tkir burchakning kosinusi \\frac{5}{13} ga teng. Shu burchakning sinusini toping.",
    options: [],
    answer: "\\sin\\alpha = \\frac{12}{13}",
    solution: "\\sin^2\\alpha = 1 - \\cos^2\\alpha = 1 - \\left(\\frac{5}{13}\\right)^2 = 1 - \\frac{25}{169} = \\frac{144}{169}.\\quad \\alpha \\text{ o'tkir bo'lgani uchun } \\sin\\alpha > 0 \\Rightarrow \\sin\\alpha = \\frac{12}{13}.",
    topic: "O'tkir va o'tmas burchaklar",
    difficulty: "Oson",
    exam_type: ["DTM", "Milliy Sertifikat", "Maktab"],
    diagram_svg: null,
  },
  {
    id: 'trig-q03',
    text: "O'tkir burchakning sinusi \\frac{7}{25} ga teng. Shu burchakning tangensini toping.",
    options: [],
    answer: "tg\\,\\alpha = \\frac{7}{24}",
    solution: "\\cos^2\\alpha = 1 - \\left(\\frac{7}{25}\\right)^2 = 1 - \\frac{49}{625} = \\frac{576}{625} \\Rightarrow \\cos\\alpha = \\frac{24}{25}.\\quad tg\\,\\alpha = \\frac{\\sin\\alpha}{\\cos\\alpha} = \\frac{7/25}{24/25} = \\frac{7}{24}.",
    topic: "O'tkir va o'tmas burchaklar",
    difficulty: "Oson",
    exam_type: ["DTM", "Milliy Sertifikat", "Maktab"],
    diagram_svg: null,
  },
  {
    id: 'trig-q04',
    text: "O'tkir burchakning kosinusi \\frac{15}{17} ga teng. Shu burchakning tangensini toping.",
    options: [],
    answer: "tg\\,\\alpha = \\frac{8}{15}",
    solution: "\\sin^2\\alpha = 1 - \\left(\\frac{15}{17}\\right)^2 = 1 - \\frac{225}{289} = \\frac{64}{289} \\Rightarrow \\sin\\alpha = \\frac{8}{17}.\\quad tg\\,\\alpha = \\frac{\\sin\\alpha}{\\cos\\alpha} = \\frac{8/17}{15/17} = \\frac{8}{15}.",
    topic: "O'tkir va o'tmas burchaklar",
    difficulty: "Oson",
    exam_type: ["DTM", "Milliy Sertifikat", "Maktab"],
    diagram_svg: null,
  },
  {
    id: 'trig-q05',
    text: "0° < \\alpha < 90°, \\quad \\sin\\alpha = \\frac{7}{25}. \\quad \\cos\\alpha = ?",
    options: [],
    answer: "\\cos\\alpha = \\frac{24}{25}",
    solution: "\\cos^2\\alpha = 1 - \\sin^2\\alpha = 1 - \\frac{49}{625} = \\frac{576}{625}.\\quad 0° < \\alpha < 90° \\Rightarrow \\cos\\alpha > 0 \\Rightarrow \\cos\\alpha = \\frac{24}{25}.",
    topic: "O'tkir va o'tmas burchaklar",
    difficulty: "Oson",
    exam_type: ["DTM", "Milliy Sertifikat", "Maktab"],
    diagram_svg: svgAcute,
  },
  {
    id: 'trig-q06',
    text: "O'tmas burchakning sinusi 0{,}6 ga teng. Shu burchakning kosinusini toping.",
    options: [],
    answer: "\\cos\\alpha = -0{,}8",
    solution: "\\cos^2\\alpha = 1 - (0{,}6)^2 = 1 - 0{,}36 = 0{,}64 \\Rightarrow \\cos\\alpha = \\pm 0{,}8.\\quad \\alpha \\text{ o'tmas bo'lgani uchun } \\cos\\alpha < 0 \\Rightarrow \\cos\\alpha = -0{,}8.",
    topic: "O'tkir va o'tmas burchaklar",
    difficulty: "O'rtacha",
    exam_type: ["DTM", "Milliy Sertifikat", "Maktab"],
    diagram_svg: null,
  },
  {
    id: 'trig-q07',
    text: "O'tmas burchakning kosinusi -\\frac{24}{25} ga teng. Shu burchakning sinusini toping.",
    options: [],
    answer: "\\sin\\alpha = \\frac{7}{25}",
    solution: "\\sin^2\\alpha = 1 - \\left(-\\frac{24}{25}\\right)^2 = 1 - \\frac{576}{625} = \\frac{49}{625}.\\quad \\alpha \\text{ o'tmas (90°<\\alpha<180°) bo'lgani uchun } \\sin\\alpha > 0 \\Rightarrow \\sin\\alpha = \\frac{7}{25}.",
    topic: "O'tkir va o'tmas burchaklar",
    difficulty: "O'rtacha",
    exam_type: ["DTM", "Milliy Sertifikat", "Maktab"],
    diagram_svg: null,
  },
  {
    id: 'trig-q08',
    text: "O'tmas burchakning kosinusi -\\frac{5}{13} ga teng. Shu burchakning tangensini toping.",
    options: [],
    answer: "tg\\,\\alpha = -\\frac{12}{5}",
    solution: "\\sin^2\\alpha = 1 - \\frac{25}{169} = \\frac{144}{169} \\Rightarrow \\sin\\alpha = \\frac{12}{13} \\text{ (o'tmas burchakda sin > 0)}.\\quad tg\\,\\alpha = \\frac{\\sin\\alpha}{\\cos\\alpha} = \\frac{12/13}{-5/13} = -\\frac{12}{5}.",
    topic: "O'tkir va o'tmas burchaklar",
    difficulty: "O'rtacha",
    exam_type: ["DTM", "Milliy Sertifikat", "Maktab"],
    diagram_svg: null,
  },
  {
    id: 'trig-q09',
    text: "90° < \\alpha < 180°, \\quad \\sin\\alpha = \\frac{12}{13}. \\quad \\cos\\alpha = ?",
    options: [],
    answer: "\\cos\\alpha = -\\frac{5}{13}",
    solution: "\\cos^2\\alpha = 1 - \\frac{144}{169} = \\frac{25}{169}.\\quad 90° < \\alpha < 180° \\Rightarrow \\cos\\alpha < 0 \\Rightarrow \\cos\\alpha = -\\frac{5}{13}.",
    topic: "O'tkir va o'tmas burchaklar",
    difficulty: "O'rtacha",
    exam_type: ["DTM", "Milliy Sertifikat", "Maktab"],
    diagram_svg: svgObtuse,
  },
  {
    id: 'trig-q10',
    text: "90° < \\alpha < 180°, \\quad \\cos\\alpha = -\\frac{8}{17}. \\quad tg\\,\\alpha = ?",
    options: [],
    answer: "tg\\,\\alpha = -\\frac{15}{8}",
    solution: "\\sin^2\\alpha = 1 - \\frac{64}{289} = \\frac{225}{289} \\Rightarrow \\sin\\alpha = \\frac{15}{17} \\text{ (sin > 0 chunki } 90°<\\alpha<180°\\text{)}.\\quad tg\\,\\alpha = \\frac{15/17}{-8/17} = -\\frac{15}{8}.",
    topic: "O'tkir va o'tmas burchaklar",
    difficulty: "O'rtacha",
    exam_type: ["DTM", "Milliy Sertifikat", "Maktab"],
    diagram_svg: svgObtuse,
  },
];

const { error } = await supabase.from('questions').insert(questions);
if (error) { console.error('Xato:', error.message); process.exit(1); }
console.log(`✅ ${questions.length} ta savol qo'shildi (trig-q01 dan trig-q10 gacha)`);
