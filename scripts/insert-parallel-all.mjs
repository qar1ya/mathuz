import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://cngkzlkreddsdpjqflsb.supabase.co',
  'sb_publishable_XBtykx-ZbWc1326el4G5SA_JEgpuDOo'
);

const TOPIC = "Parallel to'g'ri chiziqlar va kesuvchi";

// ── SVG helpers ──────────────────────────────────────────────────────────────

// Type 1: Two horizontal parallel lines + diagonal transversal
// Upper intersection ~(80,48), lower ~(132,118)
// ul_a=upper-left of a, ur_a=upper-right of a, lr_a=lower-right of a, ll_a=lower-left of a
// Same naming for b intersection
function mkSVG({ ul_a='', ur_a='', lr_a='', ll_a='', ul_b='', ur_b='', lr_b='', ll_b='' } = {}) {
  const W = 220, H = 165;
  const clr = (s) => s ? '#00d4aa' : '#e5e7eb';
  return (
    `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">` +
    `<rect width="${W}" height="${H}" fill="#1a2332"/>` +
    `<line x1="20" y1="48" x2="200" y2="48" stroke="#9ca3af" stroke-width="1.5"/>` +
    `<text x="205" y="52" fill="#e5e7eb" font-size="11" font-style="italic">a</text>` +
    `<line x1="20" y1="118" x2="200" y2="118" stroke="#9ca3af" stroke-width="1.5"/>` +
    `<text x="205" y="122" fill="#e5e7eb" font-size="11" font-style="italic">b</text>` +
    `<line x1="52" y1="8" x2="165" y2="158" stroke="#9ca3af" stroke-width="1.5"/>` +
    (ul_a ? `<text x="52" y="44" fill="${clr(ul_a)}" font-size="11">${ul_a}</text>` : '') +
    (ur_a ? `<text x="87" y="40" fill="${clr(ur_a)}" font-size="11">${ur_a}</text>` : '') +
    (lr_a ? `<text x="87" y="57" fill="${clr(lr_a)}" font-size="11">${lr_a}</text>` : '') +
    (ll_a ? `<text x="52" y="57" fill="${clr(ll_a)}" font-size="11">${ll_a}</text>` : '') +
    (ul_b ? `<text x="104" y="112" fill="${clr(ul_b)}" font-size="11">${ul_b}</text>` : '') +
    (ur_b ? `<text x="138" y="112" fill="${clr(ur_b)}" font-size="11">${ur_b}</text>` : '') +
    (lr_b ? `<text x="138" y="128" fill="${clr(lr_b)}" font-size="11">${lr_b}</text>` : '') +
    (ll_b ? `<text x="104" y="128" fill="${clr(ll_b)}" font-size="11">${ll_b}</text>` : '') +
    `</svg>`
  );
}

// Type 2: Triangle — apex C on line a (top), base A and B on line b (bottom)
// C at (110,38), A at (62,128), B at (158,128)
// Angle labels: apex, left, right, extra
function mkTri({ apex='', left='', right='', extra='', gLeft='', gRight='' } = {}) {
  const W = 220, H = 165;
  return (
    `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">` +
    `<rect width="${W}" height="${H}" fill="#1a2332"/>` +
    `<line x1="20" y1="38" x2="200" y2="38" stroke="#9ca3af" stroke-width="1.5"/>` +
    `<text x="205" y="42" fill="#e5e7eb" font-size="11" font-style="italic">a</text>` +
    `<line x1="20" y1="128" x2="200" y2="128" stroke="#9ca3af" stroke-width="1.5"/>` +
    `<text x="205" y="132" fill="#e5e7eb" font-size="11" font-style="italic">b</text>` +
    `<line x1="110" y1="38" x2="62" y2="128" stroke="#9ca3af" stroke-width="1.5"/>` +
    `<line x1="110" y1="38" x2="158" y2="128" stroke="#9ca3af" stroke-width="1.5"/>` +
    `<line x1="62" y1="128" x2="158" y2="128" stroke="#9ca3af" stroke-width="1.5"/>` +
    (apex  ? `<text x="103" y="34" fill="#00d4aa" font-size="11">${apex}</text>`  : '') +
    (left  ? `<text x="38"  y="124" fill="#00d4aa" font-size="11">${left}</text>` : '') +
    (right ? `<text x="160" y="124" fill="#00d4aa" font-size="11">${right}</text>` : '') +
    (gLeft  ? `<text x="55"  y="110" fill="#e5e7eb" font-size="11">${gLeft}</text>`  : '') +
    (gRight ? `<text x="148" y="110" fill="#e5e7eb" font-size="11">${gRight}</text>` : '') +
    extra +
    `</svg>`
  );
}

// Type 3: Zigzag — point P between parallel lines, two rays
// Line a y=38, line b y=128
// A at (68,38) on a, P at (130,83) between, B at (80,128) on b
// This creates the Z-shape. Angle at P = angle_a + angle_b
function mkZig({ angA='', angB='', angP='', extraLabel='' } = {}) {
  const W = 220, H = 165;
  return (
    `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">` +
    `<rect width="${W}" height="${H}" fill="#1a2332"/>` +
    `<line x1="20" y1="38" x2="200" y2="38" stroke="#9ca3af" stroke-width="1.5"/>` +
    `<text x="205" y="42" fill="#e5e7eb" font-size="11" font-style="italic">a</text>` +
    `<line x1="20" y1="128" x2="200" y2="128" stroke="#9ca3af" stroke-width="1.5"/>` +
    `<text x="205" y="132" fill="#e5e7eb" font-size="11" font-style="italic">b</text>` +
    `<line x1="68" y1="38" x2="130" y2="83" stroke="#9ca3af" stroke-width="1.5"/>` +
    `<line x1="130" y1="83" x2="80" y2="128" stroke="#9ca3af" stroke-width="1.5"/>` +
    `<circle cx="130" cy="83" r="2" fill="#00d4aa"/>` +
    `<text x="134" y="80" fill="#e5e7eb" font-size="10">P</text>` +
    (angA ? `<text x="72" y="50"  fill="#e5e7eb" font-size="11">${angA}</text>` : '') +
    (angB ? `<text x="72" y="120" fill="#e5e7eb" font-size="11">${angB}</text>` : '') +
    (angP ? `<text x="143" y="86" fill="#00d4aa" font-size="11">${angP}</text>` : '') +
    extraLabel +
    `</svg>`
  );
}

// ── Questions ────────────────────────────────────────────────────────────────

const questions = [

  // ── P-1 (Q92) ─────────────────────────────────────────────────────────────
  {
    id: 'parallel-1',
    text: "a∥b va kesuvchi berilgan. Rasmda 48° burchak ko'rsatilgan. \\alpha burchakni toping (unga qo'shni burchak).",
    options: ['132°', '48°', '142°', '138°'],
    answer: '132°',
    solution: '\\alpha = 180° - 48° = 132°',
    topic: TOPIC, difficulty: "Oson", examType: ["DTM","Milliy Sertifikat","Maktab"],
    diagramSvg: mkSVG({ ul_a:'48°', lr_a:'α' }),
  },

  // ── P-2 (Q93) ─────────────────────────────────────────────────────────────
  {
    id: 'parallel-2',
    text: "a∥b va kesuvchi berilgan. Rasmda 62° burchak ko'rsatilgan. \\alpha burchakni (unga qo'shni) toping.",
    options: ['118°', '62°', '128°', '108°'],
    answer: '118°',
    solution: '\\alpha = 180° - 62° = 118°',
    topic: TOPIC, difficulty: "Oson", examType: ["DTM","Milliy Sertifikat","Maktab"],
    diagramSvg: mkSVG({ ur_a:'62°', ll_a:'α' }),
  },

  // ── P-3 (Q94) ─────────────────────────────────────────────────────────────
  {
    id: 'parallel-3',
    text: "a∥b. Kesuvchi a bilan 142° ichki bir tomonli burchak hosil qiladi. b bilan hosil bo'lgan ichki bir tomonli burchak \\alpha ni toping.",
    options: ['38°', '142°', '42°', '48°'],
    answer: '38°',
    solution: '\\text{Ichki bir tomonli: }\\alpha+142°=180° \\Rightarrow \\alpha=38°',
    topic: TOPIC, difficulty: "Oson", examType: ["DTM","Milliy Sertifikat","Maktab"],
    diagramSvg: mkSVG({ ll_a:'142°', ur_b:'α' }),
  },

  // ── P-4 (Q95) ─────────────────────────────────────────────────────────────
  {
    id: 'parallel-4',
    text: "a∥b. Kesuvchi a bilan 141° ichki bir tomonli burchak hosil qiladi. \\alpha ni toping.",
    options: ['39°', '141°', '49°', '41°'],
    answer: '39°',
    solution: '\\alpha+141°=180° \\Rightarrow \\alpha=39°',
    topic: TOPIC, difficulty: "Oson", examType: ["DTM","Milliy Sertifikat","Maktab"],
    diagramSvg: mkSVG({ ll_a:'141°', ur_b:'α' }),
  },

  // ── P-5 (Q96) ─────────────────────────────────────────────────────────────
  {
    id: 'parallel-5',
    text: "a∥b. Kesuvchi a bilan 125° ichki bir tomonli burchak hosil qiladi. \\alpha ni toping.",
    options: ['55°', '125°', '65°', '45°'],
    answer: '55°',
    solution: '\\alpha+125°=180° \\Rightarrow \\alpha=55°',
    topic: TOPIC, difficulty: "Oson", examType: ["DTM","Milliy Sertifikat","Maktab"],
    diagramSvg: mkSVG({ ll_a:'125°', ur_b:'α' }),
  },

  // ── P-6 (Q97) ─────────────────────────────────────────────────────────────
  {
    id: 'parallel-6',
    text: "a∥b. Kesuvchi a bilan 136° almashinuvchi ichki burchak hosil qiladi. b bilan hosil bo'lgan almashinuvchi ichki burchak \\alpha ni toping.",
    options: ['136°', '44°', '54°', '46°'],
    answer: '136°',
    solution: '\\text{Almashinuvchi ichki burchaklar teng: }\\alpha=136°',
    topic: TOPIC, difficulty: "Oson", examType: ["DTM","Milliy Sertifikat","Maktab"],
    diagramSvg: mkSVG({ ll_a:'136°', lr_b:'α' }),
  },

  // ── P-7 (Q98) ─────────────────────────────────────────────────────────────
  {
    id: 'parallel-7',
    text: "a∥b. Kesuvchi a bilan 43° burchak hosil qiladi. Ichki bir tomonli burchak \\alpha ni toping.",
    options: ['137°', '43°', '47°', '127°'],
    answer: '137°',
    solution: '\\alpha+43°=180° \\Rightarrow \\alpha=137°',
    topic: TOPIC, difficulty: "Oson", examType: ["DTM","Milliy Sertifikat","Maktab"],
    diagramSvg: mkSVG({ lr_a:'43°', ul_b:'α' }),
  },

  // ── P-8 (Q99) ─────────────────────────────────────────────────────────────
  {
    id: 'parallel-8',
    text: "a∥b. Kesuvchi a bilan 55° mos (corresponding) burchak hosil qiladi. b bilan hosil bo'lgan mos burchak \\alpha ni toping.",
    options: ['55°', '125°', '45°', '65°'],
    answer: '55°',
    solution: '\\text{Mos burchaklar teng: }\\alpha=55°',
    topic: TOPIC, difficulty: "Oson", examType: ["DTM","Milliy Sertifikat","Maktab"],
    diagramSvg: mkSVG({ lr_a:'55°', lr_b:'α' }),
  },

  // ── P-9 (Q100) ────────────────────────────────────────────────────────────
  {
    id: 'parallel-9',
    text: "a∥b. Kesuvchi hosil qilgan ichki bir tomonli burchaklar 7:11 nisbatda. Kichik burchakni toping.",
    options: ['70°', '110°', '63°', '77°'],
    answer: '70°',
    solution: '7k+11k=180° \\Rightarrow k=10°. \\text{ Kichik burchak }=7\\times10°=70°',
    topic: TOPIC, difficulty: "O'rtacha", examType: ["DTM","Milliy Sertifikat","Maktab"],
    diagramSvg: mkSVG({ ll_a:'7k', ur_b:'11k' }),
  },

  // ── P-10 (Q101) ───────────────────────────────────────────────────────────
  {
    id: 'parallel-10',
    text: "a∥b. Kesuvchi hosil qilgan ichki bir tomonli burchaklar 5:7 nisbatda. Kichik burchakni toping.",
    options: ['75°', '105°', '60°', '80°'],
    answer: '75°',
    solution: '5k+7k=180° \\Rightarrow k=15°. \\text{ Kichik }=5\\times15°=75°',
    topic: TOPIC, difficulty: "O'rtacha", examType: ["DTM","Milliy Sertifikat","Maktab"],
    diagramSvg: mkSVG({ ll_a:'5k', ur_b:'7k' }),
  },

  // ── P-11 (Q102) ───────────────────────────────────────────────────────────
  {
    id: 'parallel-11',
    text: "a∥b. Kesuvchi a bilan 37° ichki bir tomonli burchak hosil qiladi. b bilan hosil bo'lgan qo'shni burchak \\alpha ni toping.",
    options: ['143°', '37°', '47°', '133°'],
    answer: '143°',
    solution: 'b \\text{ dagi ichki bir tomonli }=180°-37°=143°. \\text{ Qo\'shni}=143°',
    topic: TOPIC, difficulty: "O'rtacha", examType: ["DTM","Milliy Sertifikat","Maktab"],
    diagramSvg: mkSVG({ lr_a:'37°', ul_b:'α' }),
  },

  // ── P-12 (Q103) ───────────────────────────────────────────────────────────
  {
    id: 'parallel-12',
    text: "a∥b. Kesuvchi a bilan 52° ichki bir tomonli burchak hosil qiladi. b bilan hosil bo'lgan ichki bir tomonli burchak \\alpha ni toping.",
    options: ['128°', '52°', '138°', '42°'],
    answer: '128°',
    solution: '\\alpha+52°=180° \\Rightarrow \\alpha=128°',
    topic: TOPIC, difficulty: "Oson", examType: ["DTM","Milliy Sertifikat","Maktab"],
    diagramSvg: mkSVG({ lr_a:'52°', ul_b:'α' }),
  },

  // ── P-13 (Q104) ───────────────────────────────────────────────────────────
  {
    id: 'parallel-13',
    text: "a∥b. Kesuvchi a bilan 117° ichki bir tomonli burchak hosil qiladi. \\alpha ni toping.",
    options: ['63°', '117°', '73°', '53°'],
    answer: '63°',
    solution: '\\alpha+117°=180° \\Rightarrow \\alpha=63°',
    topic: TOPIC, difficulty: "Oson", examType: ["DTM","Milliy Sertifikat","Maktab"],
    diagramSvg: mkSVG({ ll_a:'117°', ur_b:'α' }),
  },

  // ── P-14 (Q105) ───────────────────────────────────────────────────────────
  {
    id: 'parallel-14',
    text: "a∥b. Kesuvchi a bilan 122° ichki bir tomonli burchak hosil qiladi. \\alpha ni toping.",
    options: ['58°', '122°', '68°', '48°'],
    answer: '58°',
    solution: '\\alpha+122°=180° \\Rightarrow \\alpha=58°',
    topic: TOPIC, difficulty: "Oson", examType: ["DTM","Milliy Sertifikat","Maktab"],
    diagramSvg: mkSVG({ ll_a:'122°', ur_b:'α' }),
  },

  // ── P-15 (Q107) ───────────────────────────────────────────────────────────
  {
    id: 'parallel-15',
    text: "a∥b. Kesuvchi a bilan (5x+20)° mos burchak hosil qiladi. Agar x=25 bo'lsa, \\alpha (unga qo'shni burchak) ni toping.",
    options: ['145°', '35°', '155°', '25°'],
    answer: '145°',
    solution: '5(25)+20=145°. \\text{ Qo\'shni}=180°-145°=35°.\\text{ Mos burchak}=145°',
    topic: TOPIC, difficulty: "O'rtacha", examType: ["DTM","Milliy Sertifikat","Maktab"],
    diagramSvg: mkSVG({ lr_a:'5x+20°', lr_b:'α' }),
  },

  // ── P-16 (Q108) ───────────────────────────────────────────────────────────
  {
    id: 'parallel-16',
    text: "a∥b. Kesuvchi a bilan 124° ichki bir tomonli burchak hosil qiladi. \\alpha ni toping.",
    options: ['56°', '124°', '66°', '46°'],
    answer: '56°',
    solution: '\\alpha+124°=180° \\Rightarrow \\alpha=56°',
    topic: TOPIC, difficulty: "Oson", examType: ["DTM","Milliy Sertifikat","Maktab"],
    diagramSvg: mkSVG({ ll_a:'124°', ur_b:'α' }),
  },

  // ── P-17 (Q109) ───────────────────────────────────────────────────────────
  {
    id: 'parallel-17',
    text: "a∥b. Kesuvchi a bilan 130° almashinuvchi tashqi burchak hosil qiladi. b bilan hosil bo'lgan almashinuvchi tashqi burchak \\alpha ni toping.",
    options: ['130°', '50°', '140°', '40°'],
    answer: '130°',
    solution: '\\text{Almashinuvchi tashqi burchaklar teng: }\\alpha=130°',
    topic: TOPIC, difficulty: "Oson", examType: ["DTM","Milliy Sertifikat","Maktab"],
    diagramSvg: mkSVG({ ul_a:'130°', ul_b:'α' }),
  },

  // ── P-18 (Q110) ───────────────────────────────────────────────────────────
  {
    id: 'parallel-18',
    text: "a∥b. Kesuvchi a bilan 143° ichki bir tomonli burchak hosil qiladi. \\alpha ni toping.",
    options: ['37°', '143°', '47°', '27°'],
    answer: '37°',
    solution: '\\alpha+143°=180° \\Rightarrow \\alpha=37°',
    topic: TOPIC, difficulty: "Oson", examType: ["DTM","Milliy Sertifikat","Maktab"],
    diagramSvg: mkSVG({ ll_a:'143°', ur_b:'α' }),
  },

  // ── P-19 (Q111) ───────────────────────────────────────────────────────────
  {
    id: 'parallel-19',
    text: "a∥b. Kesuvchi a bilan 33° ichki bir tomonli burchak hosil qiladi. \\alpha ni toping.",
    options: ['147°', '33°', '57°', '137°'],
    answer: '147°',
    solution: '\\alpha+33°=180° \\Rightarrow \\alpha=147°',
    topic: TOPIC, difficulty: "Oson", examType: ["DTM","Milliy Sertifikat","Maktab"],
    diagramSvg: mkSVG({ lr_a:'33°', ul_b:'α' }),
  },

  // ── P-20 (Q122) ───────────────────────────────────────────────────────────
  {
    id: 'parallel-20',
    text: "To'g'ri burchakli uchburchakning o'tkir burchaklaridan biri 50° ga teng bo'lsa, ikkinchi o'tkir burchagini toping.",
    options: ['40°', '50°', '90°', '130°'],
    answer: '40°',
    solution: '90°+50°+\\alpha=180° \\Rightarrow \\alpha=40°',
    topic: TOPIC, difficulty: "Oson", examType: ["DTM","Milliy Sertifikat","Maktab"],
    diagramSvg: mkTri({ apex:'α', gLeft:'90°', gRight:'50°' }),
  },

  // ── P-21 (Q106) ───────────────────────────────────────────────────────────
  {
    id: 'parallel-21',
    text: "a∥b. Kesuvchi b bilan 100° mos burchak hosil qiladi. Unga qo'shni burchak \\alpha ni toping.",
    options: ['80°', '100°', '90°', '70°'],
    answer: '80°',
    solution: '\\alpha=180°-100°=80°',
    topic: TOPIC, difficulty: "Oson", examType: ["DTM","Milliy Sertifikat","Maktab"],
    diagramSvg: mkSVG({ lr_b:'100°', ur_b:'α' }),
  },

  // ── P-22 (Q112) ───────────────────────────────────────────────────────────
  {
    id: 'parallel-22',
    text: "a∥b. P nuqtasi a va b orasida joylashgan. PA nuri a bilan 20° burchak hosil qiladi, PB nuri b bilan 30° burchak hosil qiladi. P dagi \\alpha burchakni toping.",
    options: ['50°', '20°', '30°', '80°'],
    answer: '50°',
    solution: '\\text{Yordamchi parallel: }\\alpha=20°+30°=50°',
    topic: TOPIC, difficulty: "O'rtacha", examType: ["DTM","Milliy Sertifikat","Maktab"],
    diagramSvg: mkZig({ angA:'20°', angB:'30°', angP:'α' }),
  },

  // ── P-23 (Q113) ───────────────────────────────────────────────────────────
  {
    id: 'parallel-23',
    text: "a∥b. Uchburchakning bir burchagi 90°. Qolgan ikkita burchaklar 4:5 nisbatda. Shu burchaklarni toping.",
    options: ['40° va 50°', '36° va 45°', '45° va 45°', '30° va 60°'],
    answer: '40° va 50°',
    solution: '4k+5k=90° \\Rightarrow k=10°. \\text{ Burchaklar: }40°\\text{ va }50°',
    topic: TOPIC, difficulty: "O'rtacha", examType: ["DTM","Milliy Sertifikat","Maktab"],
    diagramSvg: mkTri({ apex:'90°', left:'α', right:'β' }),
  },

  // ── P-24 (Q114) ───────────────────────────────────────────────────────────
  {
    id: 'parallel-24',
    text: "a∥b. Birinchi kesuvchi a bilan 46° mos burchak hosil qiladi. Ikkinchi kesuvchi a bilan 52° mos burchak hosil qiladi. b bilan hosil bo'lgan mos burchaklar \\alpha va \\beta ni toping.",
    options: ['46° va 52°', '134° va 128°', '46° va 128°', '52° va 134°'],
    answer: '46° va 52°',
    solution: '\\text{Mos burchaklar teng: }\\alpha=46°,\\ \\beta=52°',
    topic: TOPIC, difficulty: "O'rtacha", examType: ["DTM","Milliy Sertifikat","Maktab"],
    diagramSvg: mkSVG({ lr_a:'46°', lr_b:'α' }),
  },

  // ── P-25 (Q115) ───────────────────────────────────────────────────────────
  {
    id: 'parallel-25',
    text: "a∥b. Teng yonli uchburchakning asos burchaklari 70° ga teng. Uchburchak tepasidagi \\alpha burchakni toping.",
    options: ['40°', '70°', '55°', '35°'],
    answer: '40°',
    solution: '\\alpha+70°+70°=180° \\Rightarrow \\alpha=40°',
    topic: TOPIC, difficulty: "Oson", examType: ["DTM","Milliy Sertifikat","Maktab"],
    diagramSvg: mkTri({ apex:'α', gLeft:'70°', gRight:'70°' }),
  },

  // ── P-26 (Q116) ───────────────────────────────────────────────────────────
  {
    id: 'parallel-26',
    text: "a∥b. Teng yonli uchburchakning asos burchaklari 55° ga teng. Tepasidagi \\alpha burchakni toping.",
    options: ['70°', '55°', '60°', '80°'],
    answer: '70°',
    solution: '\\alpha+55°+55°=180° \\Rightarrow \\alpha=70°',
    topic: TOPIC, difficulty: "Oson", examType: ["DTM","Milliy Sertifikat","Maktab"],
    diagramSvg: mkTri({ apex:'α', gLeft:'55°', gRight:'55°' }),
  },

  // ── P-27 (Q117) ───────────────────────────────────────────────────────────
  {
    id: 'parallel-27',
    text: "a∥b. Kesuvchi a bilan \\alpha burchak hosil qiladi. b bilan hosil bo'lgan mos burchak x ni toping.",
    options: ['x=α', 'x=180°−α', 'x=90°', 'x=2α'],
    answer: 'x=α',
    solution: '\\text{Mos burchaklar teng: }x=\\alpha',
    topic: TOPIC, difficulty: "O'rtacha", examType: ["DTM","Milliy Sertifikat","Maktab"],
    diagramSvg: mkSVG({ lr_a:'α', lr_b:'x' }),
  },

  // ── P-28 (Q118) ───────────────────────────────────────────────────────────
  {
    id: 'parallel-28',
    text: "a∥b. Kesuvchi a bilan \\beta almashinuvchi ichki burchak hosil qiladi. b bilan hosil bo'lgan almashinuvchi ichki burchak y ni toping.",
    options: ['y=β', 'y=180°−β', 'y=90°', 'y=β/2'],
    answer: 'y=β',
    solution: '\\text{Almashinuvchi ichki burchaklar teng: }y=\\beta',
    topic: TOPIC, difficulty: "O'rtacha", examType: ["DTM","Milliy Sertifikat","Maktab"],
    diagramSvg: mkSVG({ ll_a:'β', lr_b:'y' }),
  },

  // ── P-29 (Q119) ───────────────────────────────────────────────────────────
  {
    id: 'parallel-29',
    text: "Ixtiyoriy uchburchak ichki burchaklarining yig'indisi necha gradusga teng?",
    options: ['180°', '360°', '90°', '270°'],
    answer: '180°',
    solution: '\\text{Uchburchak burchaklari yig\'indisi: }\\alpha+\\beta+\\gamma=180°',
    topic: TOPIC, difficulty: "Oson", examType: ["DTM","Milliy Sertifikat","Maktab"],
    diagramSvg: mkTri({ apex:'γ', left:'α', right:'β' }),
  },

  // ── P-30 (Q120) ───────────────────────────────────────────────────────────
  {
    id: 'parallel-30',
    text: "Ixtiyoriy uchburchakning bittadan olingan tashqi burchaklari yig'indisi necha gradusga teng?",
    options: ['360°', '180°', '540°', '270°'],
    answer: '360°',
    solution: '\\text{Har bir tashqi burchak tegishli ichki burchakni to\'ldiradi: yig\'indi }=360°',
    topic: TOPIC, difficulty: "O'rtacha", examType: ["DTM","Milliy Sertifikat","Maktab"],
    diagramSvg: mkTri({ apex:'γ', left:'α', right:'β' }),
  },

  // ── P-31 (Q121) ───────────────────────────────────────────────────────────
  {
    id: 'parallel-31',
    text: "To'g'ri burchakli uchburchak o'tkir burchaklarining yig'indisi necha gradus?",
    options: ['90°', '180°', '45°', '60°'],
    answer: '90°',
    solution: '90°+\\alpha+\\beta=180° \\Rightarrow \\alpha+\\beta=90°',
    topic: TOPIC, difficulty: "Oson", examType: ["DTM","Milliy Sertifikat","Maktab"],
    diagramSvg: mkTri({ apex:'α', gLeft:'90°', right:'β' }),
  },

  // ── P-32 (Q123) ───────────────────────────────────────────────────────────
  {
    id: 'parallel-32',
    text: "a∥b. Uchburchakning ikkita burchagi 70° va 50°. Uchinchi \\alpha burchakni toping.",
    options: ['60°', '70°', '50°', '80°'],
    answer: '60°',
    solution: '\\alpha+70°+50°=180° \\Rightarrow \\alpha=60°',
    topic: TOPIC, difficulty: "Oson", examType: ["DTM","Milliy Sertifikat","Maktab"],
    diagramSvg: mkTri({ apex:'α', gLeft:'70°', gRight:'50°' }),
  },

  // ── P-33 (Q124) ───────────────────────────────────────────────────────────
  {
    id: 'parallel-33',
    text: "a∥b. Uchburchakning ikkita burchagi 90° va 50°. Uchinchi \\alpha burchakni toping.",
    options: ['40°', '60°', '50°', '30°'],
    answer: '40°',
    solution: '\\alpha+90°+50°=180° \\Rightarrow \\alpha=40°',
    topic: TOPIC, difficulty: "Oson", examType: ["DTM","Milliy Sertifikat","Maktab"],
    diagramSvg: mkTri({ apex:'α', gLeft:'90°', gRight:'50°' }),
  },

  // ── P-34 (Q125) ───────────────────────────────────────────────────────────
  {
    id: 'parallel-34',
    text: "a∥b. Kesuvchi a bilan 150° ichki bir tomonli burchak hosil qiladi. \\alpha ni toping.",
    options: ['30°', '150°', '60°', '40°'],
    answer: '30°',
    solution: '\\alpha+150°=180° \\Rightarrow \\alpha=30°',
    topic: TOPIC, difficulty: "Oson", examType: ["DTM","Milliy Sertifikat","Maktab"],
    diagramSvg: mkSVG({ ll_a:'150°', ur_b:'α' }),
  },

  // ── P-35 (Q126) ───────────────────────────────────────────────────────────
  {
    id: 'parallel-35',
    text: "a∥b. Kesuvchi hosil qilgan ichki bir tomonli burchaklar 1:4 nisbatda. Kichik burchakni toping.",
    options: ['36°', '144°', '45°', '30°'],
    answer: '36°',
    solution: 'k+4k=180° \\Rightarrow k=36°. \\text{ Kichik }=36°',
    topic: TOPIC, difficulty: "O'rtacha", examType: ["DTM","Milliy Sertifikat","Maktab"],
    diagramSvg: mkSVG({ ll_a:'k', ur_b:'4k' }),
  },

  // ── P-36 (Q127) ───────────────────────────────────────────────────────────
  {
    id: 'parallel-36',
    text: "a∥b. Kesuvchi a bilan 70° almashinuvchi ichki burchak hosil qiladi. Unga qo'shni burchak \\alpha ni toping.",
    options: ['110°', '70°', '100°', '120°'],
    answer: '110°',
    solution: '\\text{Almashinuvchi ichki }=70°. \\text{ Qo\'shni: }180°-70°=110°',
    topic: TOPIC, difficulty: "Oson", examType: ["DTM","Milliy Sertifikat","Maktab"],
    diagramSvg: mkSVG({ ll_a:'70°', ul_b:'α' }),
  },

  // ── P-37 (Q128) ───────────────────────────────────────────────────────────
  {
    id: 'parallel-37',
    text: "a∥b. Kesuvchi a bilan 80° almashinuvchi ichki burchak hosil qiladi. Unga qo'shni burchak \\alpha ni toping.",
    options: ['100°', '80°', '90°', '110°'],
    answer: '100°',
    solution: '180°-80°=100°',
    topic: TOPIC, difficulty: "Oson", examType: ["DTM","Milliy Sertifikat","Maktab"],
    diagramSvg: mkSVG({ ll_a:'80°', ul_b:'α' }),
  },

  // ── P-38 (Q129) ───────────────────────────────────────────────────────────
  {
    id: 'parallel-38',
    text: "a∥b. To'g'ri burchakli uchburchakning bir o'tkir burchagi 30°. Ikkinchi o'tkir \\alpha burchakni toping.",
    options: ['60°', '30°', '45°', '90°'],
    answer: '60°',
    solution: '90°+30°+\\alpha=180° \\Rightarrow \\alpha=60°',
    topic: TOPIC, difficulty: "Oson", examType: ["DTM","Milliy Sertifikat","Maktab"],
    diagramSvg: mkTri({ apex:'α', gLeft:'90°', gRight:'30°' }),
  },

  // ── P-39 (Q130) ───────────────────────────────────────────────────────────
  {
    id: 'parallel-39',
    text: "a∥b. Birinchi kesuvchi a bilan 38° va b bilan 48° burchak hosil qiladi. Ushbu burchaklarning qo'shnilari \\alpha_1 va \\alpha_2 ni toping.",
    options: ['α₁=142°, α₂=132°', 'α₁=38°, α₂=48°', 'α₁=132°, α₂=142°', 'α₁=142°, α₂=48°'],
    answer: 'α₁=142°, α₂=132°',
    solution: '\\alpha_1=180°-38°=142°;\\ \\alpha_2=180°-48°=132°',
    topic: TOPIC, difficulty: "O'rtacha", examType: ["DTM","Milliy Sertifikat","Maktab"],
    diagramSvg: mkSVG({ ur_a:'38°', ll_a:'α₁', ur_b:'48°', ll_b:'α₂' }),
  },

  // ── P-40 (Q131) ───────────────────────────────────────────────────────────
  {
    id: 'parallel-40',
    text: "a∥b. Uchburchakning ikkita ichki burchagi 30° va 20°. Katta tashqi \\alpha burchakni toping.",
    options: ['130°', '50°', '150°', '80°'],
    answer: '130°',
    solution: '\\text{Tashqi burchak }=30°+20°+... \\text{ Uchburchak: }30°+20°+\\gamma=180°,\\ \\gamma=130°. \\text{ Tashqi }\\alpha=130°',
    topic: TOPIC, difficulty: "O'rtacha", examType: ["DTM","Milliy Sertifikat","Maktab"],
    diagramSvg: mkTri({ apex:'α', gLeft:'30°', gRight:'20°' }),
  },

  // ── P-41 (Q132) ───────────────────────────────────────────────────────────
  {
    id: 'parallel-41',
    text: "a∥b. Uchburchakning ikkita burchagi 60° va 40°. Uchinchi \\alpha burchakni toping.",
    options: ['80°', '60°', '100°', '40°'],
    answer: '80°',
    solution: '\\alpha+60°+40°=180° \\Rightarrow \\alpha=80°',
    topic: TOPIC, difficulty: "Oson", examType: ["DTM","Milliy Sertifikat","Maktab"],
    diagramSvg: mkTri({ apex:'α', gLeft:'60°', gRight:'40°' }),
  },

  // ── P-42 (Q134) ───────────────────────────────────────────────────────────
  {
    id: 'parallel-42',
    text: "a∥b. Uchburchakning ikkita burchagi 70° va 70°. Uchinchi \\alpha burchakni toping.",
    options: ['40°', '70°', '110°', '60°'],
    answer: '40°',
    solution: '\\alpha+70°+70°=180° \\Rightarrow \\alpha=40°',
    topic: TOPIC, difficulty: "Oson", examType: ["DTM","Milliy Sertifikat","Maktab"],
    diagramSvg: mkTri({ apex:'α', gLeft:'70°', gRight:'70°' }),
  },

  // ── P-43 (Q135) ───────────────────────────────────────────────────────────
  {
    id: 'parallel-43',
    text: "a∥b. Kesuvchi a bilan 45° ichki bir tomonli burchak hosil qiladi. \\alpha ni toping.",
    options: ['135°', '45°', '145°', '55°'],
    answer: '135°',
    solution: '\\alpha+45°=180° \\Rightarrow \\alpha=135°',
    topic: TOPIC, difficulty: "Oson", examType: ["DTM","Milliy Sertifikat","Maktab"],
    diagramSvg: mkSVG({ lr_a:'45°', ul_b:'α' }),
  },

  // ── P-44 (Q136) ───────────────────────────────────────────────────────────
  {
    id: 'parallel-44',
    text: "a∥b. Kesuvchi a bilan 60° almashinuvchi tashqi burchak hosil qiladi. Unga qo'shni burchak \\alpha ni toping.",
    options: ['120°', '60°', '130°', '90°'],
    answer: '120°',
    solution: '180°-60°=120°',
    topic: TOPIC, difficulty: "Oson", examType: ["DTM","Milliy Sertifikat","Maktab"],
    diagramSvg: mkSVG({ ul_a:'60°', lr_a:'α' }),
  },

  // ── P-45 (Q137) ───────────────────────────────────────────────────────────
  {
    id: 'parallel-45',
    text: "a∥b. Kesuvchi hosil qilgan ichki bir tomonli burchaklar teng. \\alpha ni toping.",
    options: ['90°', '45°', '60°', '180°'],
    answer: '90°',
    solution: '\\alpha+\\alpha=180° \\Rightarrow \\alpha=90°',
    topic: TOPIC, difficulty: "Oson", examType: ["DTM","Milliy Sertifikat","Maktab"],
    diagramSvg: mkSVG({ ll_a:'α', ur_b:'α' }),
  },

  // ── P-46 (Q138) ───────────────────────────────────────────────────────────
  {
    id: 'parallel-46',
    text: "a∥b. Kesuvchi a bilan 35° ichki bir tomonli burchak hosil qiladi. \\alpha ni toping.",
    options: ['145°', '35°', '155°', '55°'],
    answer: '145°',
    solution: '\\alpha+35°=180° \\Rightarrow \\alpha=145°',
    topic: TOPIC, difficulty: "Oson", examType: ["DTM","Milliy Sertifikat","Maktab"],
    diagramSvg: mkSVG({ lr_a:'35°', ul_b:'α' }),
  },

  // ── P-47 (Q139) ───────────────────────────────────────────────────────────
  {
    id: 'parallel-47',
    text: "a∥b. Kesuvchi a bilan 30° ichki bir tomonli burchak hosil qiladi. \\alpha ni toping.",
    options: ['150°', '30°', '160°', '140°'],
    answer: '150°',
    solution: '\\alpha+30°=180° \\Rightarrow \\alpha=150°',
    topic: TOPIC, difficulty: "Oson", examType: ["DTM","Milliy Sertifikat","Maktab"],
    diagramSvg: mkSVG({ lr_a:'30°', ul_b:'α' }),
  },

  // ── P-48 (Q140) ───────────────────────────────────────────────────────────
  {
    id: 'parallel-48',
    text: "a∥b. Kesuvchi a bilan 40° mos burchak hosil qiladi. Unga qo'shni burchak \\alpha ni toping.",
    options: ['140°', '40°', '130°', '50°'],
    answer: '140°',
    solution: '\\alpha=180°-40°=140°',
    topic: TOPIC, difficulty: "Oson", examType: ["DTM","Milliy Sertifikat","Maktab"],
    diagramSvg: mkSVG({ lr_a:'40°', ll_a:'α' }),
  },

  // ── P-49 (Q141) ───────────────────────────────────────────────────────────
  {
    id: 'parallel-49',
    text: "a∥b. Kesuvchi a bilan 100° almashinuvchi ichki burchak hosil qiladi. Unga qo'shni burchak \\alpha ni toping.",
    options: ['80°', '100°', '70°', '90°'],
    answer: '80°',
    solution: '180°-100°=80°',
    topic: TOPIC, difficulty: "Oson", examType: ["DTM","Milliy Sertifikat","Maktab"],
    diagramSvg: mkSVG({ ll_a:'100°', lr_a:'α' }),
  },

  // ── P-50 (Q142) ───────────────────────────────────────────────────────────
  {
    id: 'parallel-50',
    text: "a∥b. Kesuvchi a bilan 110° almashinuvchi tashqi burchak hosil qiladi. Unga qo'shni burchak \\alpha ni toping.",
    options: ['70°', '110°', '80°', '60°'],
    answer: '70°',
    solution: '180°-110°=70°',
    topic: TOPIC, difficulty: "Oson", examType: ["DTM","Milliy Sertifikat","Maktab"],
    diagramSvg: mkSVG({ ul_a:'110°', lr_a:'α' }),
  },

  // ── P-51 (Q143) ───────────────────────────────────────────────────────────
  {
    id: 'parallel-51',
    text: "a∥b. Uchburchakning bitta burchagi a chiziq bilan almashinuvchi burchak (35°) va boshqa burchak b bilan almashinuvchi (45°). Uchinchi \\alpha burchakni toping.",
    options: ['100°', '35°', '45°', '80°'],
    answer: '100°',
    solution: '35°+45°+\\alpha=180° \\Rightarrow \\alpha=100°.\\text{ }\\alpha_1=35°,\\ \\alpha_2=45°\\text{ (almashinuvchi)}',
    topic: TOPIC, difficulty: "O'rtacha", examType: ["DTM","Milliy Sertifikat","Maktab"],
    diagramSvg: mkTri({ apex:'α', gLeft:'35°', gRight:'45°' }),
  },

  // ── P-52 (Q144) ───────────────────────────────────────────────────────────
  {
    id: 'parallel-52',
    text: "a∥b. Kesuvchi a bilan 95° ichki bir tomonli burchak hosil qiladi. \\alpha ni toping.",
    options: ['85°', '95°', '75°', '105°'],
    answer: '85°',
    solution: '\\alpha+95°=180° \\Rightarrow \\alpha=85°',
    topic: TOPIC, difficulty: "Oson", examType: ["DTM","Milliy Sertifikat","Maktab"],
    diagramSvg: mkSVG({ ll_a:'95°', ur_b:'α' }),
  },

  // ── P-53 (Q145) ───────────────────────────────────────────────────────────
  {
    id: 'parallel-53',
    text: "a∥b. Kesuvchi a bilan 89° ichki bir tomonli burchak hosil qiladi. \\alpha ni toping.",
    options: ['91°', '89°', '81°', '99°'],
    answer: '91°',
    solution: '\\alpha+89°=180° \\Rightarrow \\alpha=91°',
    topic: TOPIC, difficulty: "Oson", examType: ["DTM","Milliy Sertifikat","Maktab"],
    diagramSvg: mkSVG({ ll_a:'89°', ur_b:'α' }),
  },

  // ── P-54 (Q146) ───────────────────────────────────────────────────────────
  {
    id: 'parallel-54',
    text: "a∥b. P nuqtasi parallel chiziqlar orasida. PA nuri a bilan \\alpha burchak, PB nuri b bilan \\beta burchak hosil qiladi. P dagi \\alpha_1 burchakni toping.",
    options: ['α₁=α+β', 'α₁=α−β', 'α₁=180°−(α+β)', 'α₁=α·β'],
    answer: 'α₁=α+β',
    solution: '\\text{P orqali a∥b ga parallel chiziq o\'tkaz: }\\alpha_1=\\alpha+\\beta\\text{ (almashinuvchi burchaklar)}',
    topic: TOPIC, difficulty: "Qiyin", examType: ["DTM","Milliy Sertifikat","Maktab"],
    diagramSvg: mkZig({ angA:'α', angB:'β', angP:'α₁' }),
  },

  // ── P-55 (Q147) ───────────────────────────────────────────────────────────
  {
    id: 'parallel-55',
    text: "a∥b. P nuqtasi a va b orasida. PA nuri a bilan 30° va PB nuri b bilan 34° burchak hosil qiladi. P dagi \\alpha burchakni toping.",
    options: ['64°', '30°', '34°', '94°'],
    answer: '64°',
    solution: '\\alpha=30°+34°=64°',
    topic: TOPIC, difficulty: "O'rtacha", examType: ["DTM","Milliy Sertifikat","Maktab"],
    diagramSvg: mkZig({ angA:'30°', angB:'34°', angP:'α' }),
  },

  // ── P-56 (Q148) ───────────────────────────────────────────────────────────
  {
    id: 'parallel-56',
    text: "a∥b. P nuqtasi a va b orasida. PA nuri a bilan 80° va PB nuri b bilan 70° burchak hosil qiladi. P dagi \\alpha burchakni toping.",
    options: ['150°', '80°', '70°', '160°'],
    answer: '150°',
    solution: '\\alpha=80°+70°=150°',
    topic: TOPIC, difficulty: "O'rtacha", examType: ["DTM","Milliy Sertifikat","Maktab"],
    diagramSvg: mkZig({ angA:'80°', angB:'70°', angP:'α' }),
  },

  // ── P-57 (Q149) ───────────────────────────────────────────────────────────
  {
    id: 'parallel-57',
    text: "a∥b. Uchburchakning ikkita burchagi 80° va 50°. Uchinchi \\alpha burchakni toping.",
    options: ['50°', '80°', '60°', '40°'],
    answer: '50°',
    solution: '\\alpha+80°+50°=180° \\Rightarrow \\alpha=50°',
    topic: TOPIC, difficulty: "Oson", examType: ["DTM","Milliy Sertifikat","Maktab"],
    diagramSvg: mkTri({ apex:'α', gLeft:'80°', gRight:'50°' }),
  },

  // ── P-58 (Q150) ───────────────────────────────────────────────────────────
  {
    id: 'parallel-58',
    text: "a∥b. P nuqtasi a va b orasida. PA nuri a bilan 65° va PB nuri b bilan 60° burchak hosil qiladi. P dagi \\alpha burchakni toping.",
    options: ['125°', '65°', '60°', '115°'],
    answer: '125°',
    solution: '\\alpha=65°+60°=125°',
    topic: TOPIC, difficulty: "O'rtacha", examType: ["DTM","Milliy Sertifikat","Maktab"],
    diagramSvg: mkZig({ angA:'65°', angB:'60°', angP:'α' }),
  },

  // ── P-59 (Q151) ───────────────────────────────────────────────────────────
  {
    id: 'parallel-59',
    text: "a∥b. Kesuvchi a bilan 60° ichki bir tomonli burchak hosil qiladi. \\alpha ni toping.",
    options: ['120°', '60°', '130°', '90°'],
    answer: '120°',
    solution: '\\alpha+60°=180° \\Rightarrow \\alpha=120°',
    topic: TOPIC, difficulty: "Oson", examType: ["DTM","Milliy Sertifikat","Maktab"],
    diagramSvg: mkSVG({ lr_a:'60°', ul_b:'α' }),
  },

  // ── P-60 (Q152) ───────────────────────────────────────────────────────────
  {
    id: 'parallel-60',
    text: "a∥b. P nuqtasi a va b orasida. PA nuri a bilan 85° va PB nuri b bilan 90° burchak hosil qiladi. P dagi \\alpha burchakni toping.",
    options: ['175°', '85°', '90°', '165°'],
    answer: '175°',
    solution: '\\alpha=85°+90°=175°',
    topic: TOPIC, difficulty: "O'rtacha", examType: ["DTM","Milliy Sertifikat","Maktab"],
    diagramSvg: mkZig({ angA:'85°', angB:'90°', angP:'α' }),
  },

  // ── P-61 (Q153) ───────────────────────────────────────────────────────────
  {
    id: 'parallel-61',
    text: "a∥b. Kesuvchi a bilan 110° ichki bir tomonli burchak hosil qiladi. b bilan hosil bo'lgan almashinuvchi ichki burchak \\alpha ni toping.",
    options: ['70°', '110°', '80°', '60°'],
    answer: '70°',
    solution: '\\text{Almashinuvchi ichki }=180°-110°=70°',
    topic: TOPIC, difficulty: "O'rtacha", examType: ["DTM","Milliy Sertifikat","Maktab"],
    diagramSvg: mkSVG({ ll_a:'110°', lr_b:'α' }),
  },

  // ── P-62 (Q154) ───────────────────────────────────────────────────────────
  {
    id: 'parallel-62',
    text: "a∥b. Teng yonli uchburchakning asos burchaklari 60° ga teng. Tepasidagi \\alpha burchakni toping.",
    options: ['60°', '70°', '80°', '50°'],
    answer: '60°',
    solution: '\\alpha+60°+60°=180° \\Rightarrow \\alpha=60°\\text{ (teng tomonli)}',
    topic: TOPIC, difficulty: "Oson", examType: ["DTM","Milliy Sertifikat","Maktab"],
    diagramSvg: mkTri({ apex:'α', gLeft:'60°', gRight:'60°' }),
  },

  // ── P-63 (Q155) ───────────────────────────────────────────────────────────
  {
    id: 'parallel-63',
    text: "a∥b. Kesuvchi a bilan 120° ichki bir tomonli burchak hosil qiladi. b bilan hosil bo'lgan almashinuvchi ichki burchak \\alpha ni toping.",
    options: ['60°', '120°', '50°', '70°'],
    answer: '60°',
    solution: '\\text{Ichki bir tomonli: }180°-120°=60°. \\text{ Almashinuvchi ichki }=60°',
    topic: TOPIC, difficulty: "O'rtacha", examType: ["DTM","Milliy Sertifikat","Maktab"],
    diagramSvg: mkSVG({ ll_a:'120°', lr_b:'α' }),
  },

  // ── P-64 (Q156) ───────────────────────────────────────────────────────────
  {
    id: 'parallel-64',
    text: "a∥b. Kesuvchi a bilan 110° almashinuvchi tashqi burchak hosil qiladi. b bilan hosil bo'lgan almashinuvchi tashqi burchak \\alpha ni toping.",
    options: ['70°', '110°', '80°', '60°'],
    answer: '70°',
    solution: '\\text{Almashinuvchi tashqi: }180°-110°=70°. \\alpha=70°',
    topic: TOPIC, difficulty: "O'rtacha", examType: ["DTM","Milliy Sertifikat","Maktab"],
    diagramSvg: mkSVG({ ul_a:'110°', ur_b:'α' }),
  },

  // ── P-65 (Q157) ───────────────────────────────────────────────────────────
  {
    id: 'parallel-65',
    text: "a∥b. Kesuvchi a bilan 80° mos burchak hosil qiladi. b bilan hosil bo'lgan mos burchak \\alpha ni toping.",
    options: ['80°', '100°', '70°', '90°'],
    answer: '80°',
    solution: '\\text{Mos burchaklar teng: }\\alpha=80°',
    topic: TOPIC, difficulty: "Oson", examType: ["DTM","Milliy Sertifikat","Maktab"],
    diagramSvg: mkSVG({ lr_a:'80°', lr_b:'α' }),
  },

  // ── P-66 (Q158) ───────────────────────────────────────────────────────────
  {
    id: 'parallel-66',
    text: "a∥b. Kesuvchi a bilan 70° ichki bir tomonli burchak hosil qiladi. \\alpha ni toping.",
    options: ['110°', '70°', '100°', '120°'],
    answer: '110°',
    solution: '\\alpha+70°=180° \\Rightarrow \\alpha=110°',
    topic: TOPIC, difficulty: "Oson", examType: ["DTM","Milliy Sertifikat","Maktab"],
    diagramSvg: mkSVG({ lr_a:'70°', ul_b:'α' }),
  },

  // ── P-67 (Q159) ───────────────────────────────────────────────────────────
  {
    id: 'parallel-67',
    text: "a∥b. Uchburchakning ikkita burchagi 60° va 40°. Tashqi \\alpha burchakni (60° qo'shni) toping.",
    options: ['80°', '120°', '100°', '60°'],
    answer: '80°',
    solution: '\\alpha+(180°-60°)+(180°-40°) = ...\\ \\text{Yoki: }\\gamma=180°-60°-40°=80°.\\ \\text{Tashqi }=80°',
    topic: TOPIC, difficulty: "O'rtacha", examType: ["DTM","Milliy Sertifikat","Maktab"],
    diagramSvg: mkTri({ apex:'α', gLeft:'60°', gRight:'40°' }),
  },

  // ── P-68 (Q160) ───────────────────────────────────────────────────────────
  {
    id: 'parallel-68',
    text: "a∥b. Kesuvchi a bilan 75° ichki bir tomonli burchak hosil qiladi. \\alpha ni toping.",
    options: ['105°', '75°', '115°', '95°'],
    answer: '105°',
    solution: '\\alpha+75°=180° \\Rightarrow \\alpha=105°',
    topic: TOPIC, difficulty: "Oson", examType: ["DTM","Milliy Sertifikat","Maktab"],
    diagramSvg: mkSVG({ ll_a:'75°', ur_b:'α' }),
  },

  // ── P-69 (Q161) ───────────────────────────────────────────────────────────
  {
    id: 'parallel-69',
    text: "a∥b. Kesuvchi a bilan 50° almashinuvchi ichki burchak hosil qiladi. b bilan hosil bo'lgan almashinuvchi ichki burchak \\alpha ni toping.",
    options: ['50°', '130°', '40°', '60°'],
    answer: '50°',
    solution: '\\text{Almashinuvchi ichki burchaklar teng: }\\alpha=50°',
    topic: TOPIC, difficulty: "Oson", examType: ["DTM","Milliy Sertifikat","Maktab"],
    diagramSvg: mkSVG({ ll_a:'50°', lr_b:'α' }),
  },

  // ── P-70 (Q162) ───────────────────────────────────────────────────────────
  {
    id: 'parallel-70',
    text: "a∥b. P nuqtasi a va b orasida. PA nuri a bilan 40° va PB nuri b bilan 30° burchak hosil qiladi. P dagi \\alpha burchakni toping.",
    options: ['70°', '40°', '30°', '80°'],
    answer: '70°',
    solution: '\\alpha=40°+30°=70°',
    topic: TOPIC, difficulty: "O'rtacha", examType: ["DTM","Milliy Sertifikat","Maktab"],
    diagramSvg: mkZig({ angA:'40°', angB:'30°', angP:'α' }),
  },

];

// ── Insert ───────────────────────────────────────────────────────────────────

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
  console.log(`✅ ${rows.length} ta savol muvaffaqiyatli qo'shildi! (parallel-1 dan parallel-70 gacha)`);
}

main();
