import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://cngkzlkreddsdpjqflsb.supabase.co',
  'sb_publishable_XBtykx-ZbWc1326el4G5SA_JEgpuDOo'
);

const TOPIC = "Parallel to'g'ri chiziqlar va kesuvchi";

function mkSVG({ ul_a='', ur_a='', lr_a='', ll_a='', ul_b='', ur_b='', lr_b='', ll_b='' } = {}) {
  const W = 220, H = 165;
  return (
    `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">` +
    `<rect width="${W}" height="${H}" fill="#1a2332"/>` +
    `<line x1="20" y1="48" x2="200" y2="48" stroke="#9ca3af" stroke-width="1.5"/>` +
    `<text x="205" y="52" fill="#e5e7eb" font-size="11" font-style="italic">a</text>` +
    `<line x1="20" y1="118" x2="200" y2="118" stroke="#9ca3af" stroke-width="1.5"/>` +
    `<text x="205" y="122" fill="#e5e7eb" font-size="11" font-style="italic">b</text>` +
    `<line x1="52" y1="8" x2="165" y2="158" stroke="#9ca3af" stroke-width="1.5"/>` +
    (ul_a ? `<text x="52" y="44" fill="#e5e7eb" font-size="11">${ul_a}</text>` : '') +
    (ur_a ? `<text x="87" y="40" fill="#00d4aa" font-size="11">${ur_a}</text>` : '') +
    (lr_a ? `<text x="87" y="57" fill="#00d4aa" font-size="11">${lr_a}</text>` : '') +
    (ll_a ? `<text x="52" y="57" fill="#e5e7eb" font-size="11">${ll_a}</text>` : '') +
    (ul_b ? `<text x="104" y="112" fill="#e5e7eb" font-size="11">${ul_b}</text>` : '') +
    (ur_b ? `<text x="138" y="112" fill="#00d4aa" font-size="11">${ur_b}</text>` : '') +
    (lr_b ? `<text x="138" y="128" fill="#00d4aa" font-size="11">${lr_b}</text>` : '') +
    (ll_b ? `<text x="104" y="128" fill="#e5e7eb" font-size="11">${ll_b}</text>` : '') +
    `</svg>`
  );
}

function mkTri({ apex='', left='', right='', gLeft='', gRight='' } = {}) {
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
    `</svg>`
  );
}

function mkZig({ angA='', angB='', angP='' } = {}) {
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
    `<circle cx="130" cy="83" r="2.5" fill="#00d4aa"/>` +
    `<text x="134" y="80" fill="#e5e7eb" font-size="10">P</text>` +
    (angA ? `<text x="72" y="50"  fill="#e5e7eb" font-size="11">${angA}</text>` : '') +
    (angB ? `<text x="72" y="120" fill="#e5e7eb" font-size="11">${angB}</text>` : '') +
    (angP ? `<text x="143" y="86" fill="#00d4aa" font-size="11">${angP}</text>` : '') +
    `</svg>`
  );
}

const T = TOPIC;
const E = ["DTM","Milliy Sertifikat","Maktab"];

const questions = [
  { id:'parallel-21', difficulty:"Oson",
    text:"a∥b. Kesuvchi b bilan 100° mos burchak hosil qiladi. Unga qo'shni α burchakni toping.",
    options:['80°','100°','90°','70°'], answer:'80°',
    solution:'\\alpha=180°-100°=80°',
    diagramSvg: mkSVG({lr_b:'100°', ur_b:'α'}) },

  { id:'parallel-22', difficulty:"O'rtacha",
    text:"a∥b. P nuqtasi a va b orasida. PA nuri a bilan 20°, PB nuri b bilan 30° burchak hosil qiladi. P dagi α burchakni toping.",
    options:['50°','20°','30°','80°'], answer:'50°',
    solution:'\\alpha=20°+30°=50° (yordamchi parallel orqali)',
    diagramSvg: mkZig({angA:'20°', angB:'30°', angP:'α'}) },

  { id:'parallel-23', difficulty:"O'rtacha",
    text:"a∥b. Uchburchakning bir burchagi 90°. Qolgan ikki burchak 4:5 nisbatda. Shu burchaklarni toping.",
    options:['40° va 50°','36° va 45°','45° va 45°','30° va 60°'], answer:'40° va 50°',
    solution:'4k+5k=90° \\Rightarrow k=10°. Burchaklar: 40° va 50°',
    diagramSvg: mkTri({apex:'90°', left:'α', right:'β'}) },

  { id:'parallel-24', difficulty:"O'rtacha",
    text:"a∥b. Birinchi kesuvchi a bilan 46°, ikkinchi kesuvchi a bilan 52° mos burchak hosil qiladi. b bilan mos burchaklar α va β ni toping.",
    options:['46° va 52°','134° va 128°','46° va 128°','52° va 134°'], answer:'46° va 52°',
    solution:'Mos burchaklar teng: α=46°, β=52°',
    diagramSvg: mkSVG({lr_a:'46°', lr_b:'α'}) },

  { id:'parallel-25', difficulty:"Oson",
    text:"a∥b. Teng yonli uchburchakning asos burchaklari 70°. Tepa α burchakni toping.",
    options:['40°','70°','55°','35°'], answer:'40°',
    solution:'\\alpha+70°+70°=180° \\Rightarrow \\alpha=40°',
    diagramSvg: mkTri({apex:'α', gLeft:'70°', gRight:'70°'}) },

  { id:'parallel-26', difficulty:"Oson",
    text:"a∥b. Teng yonli uchburchakning asos burchaklari 55°. Tepa α burchakni toping.",
    options:['70°','55°','60°','80°'], answer:'70°',
    solution:'\\alpha+55°+55°=180° \\Rightarrow \\alpha=70°',
    diagramSvg: mkTri({apex:'α', gLeft:'55°', gRight:'55°'}) },

  { id:'parallel-27', difficulty:"O'rtacha",
    text:"a∥b. Kesuvchi a bilan α burchak hosil qiladi. b bilan mos burchak x ni toping.",
    options:['x=α','x=180°−α','x=90°','x=2α'], answer:'x=α',
    solution:'Mos burchaklar teng: x=α',
    diagramSvg: mkSVG({lr_a:'α', lr_b:'x'}) },

  { id:'parallel-28', difficulty:"O'rtacha",
    text:"a∥b. Kesuvchi a bilan β almashinuvchi ichki burchak hosil qiladi. b bilan almashinuvchi ichki burchak y ni toping.",
    options:['y=β','y=180°−β','y=90°','y=β/2'], answer:'y=β',
    solution:'Almashinuvchi ichki burchaklar teng: y=β',
    diagramSvg: mkSVG({ll_a:'β', lr_b:'y'}) },

  { id:'parallel-29', difficulty:"Oson",
    text:"Ixtiyoriy uchburchak ichki burchaklari yig'indisi necha gradusga teng?",
    options:['180°','360°','90°','270°'], answer:'180°',
    solution:'α+β+γ=180°',
    diagramSvg: mkTri({apex:'γ', left:'α', right:'β'}) },

  { id:'parallel-30', difficulty:"O'rtacha",
    text:"Ixtiyoriy uchburchakning bittadan olingan tashqi burchaklari yig'indisi necha gradusga teng?",
    options:['360°','180°','540°','270°'], answer:'360°',
    solution:"Har bir tashqi burchak o'z ichki burchagini to'ldiradi. Yig'indi=360°",
    diagramSvg: mkTri({apex:'γ', left:'α', right:'β'}) },

  { id:'parallel-31', difficulty:"Oson",
    text:"To'g'ri burchakli uchburchak o'tkir burchaqlari yig'indisi necha gradus?",
    options:['90°','180°','45°','60°'], answer:'90°',
    solution:'90°+α+β=180° \\Rightarrow α+β=90°',
    diagramSvg: mkTri({apex:'α', gLeft:'90°', right:'β'}) },

  { id:'parallel-32', difficulty:"Oson",
    text:"a∥b. Uchburchakning ikkita burchagi 70° va 50°. Uchinchi α burchakni toping.",
    options:['60°','70°','50°','80°'], answer:'60°',
    solution:'α+70°+50°=180° \\Rightarrow α=60°',
    diagramSvg: mkTri({apex:'α', gLeft:'70°', gRight:'50°'}) },

  { id:'parallel-33', difficulty:"Oson",
    text:"a∥b. Uchburchakning ikkita burchagi 90° va 50°. Uchinchi α burchakni toping.",
    options:['40°','60°','50°','30°'], answer:'40°',
    solution:'α+90°+50°=180° \\Rightarrow α=40°',
    diagramSvg: mkTri({apex:'α', gLeft:'90°', gRight:'50°'}) },

  { id:'parallel-34', difficulty:"Oson",
    text:"a∥b. Kesuvchi a bilan 150° ichki bir tomonli burchak hosil qiladi. α ni toping.",
    options:['30°','150°','60°','40°'], answer:'30°',
    solution:'α+150°=180° \\Rightarrow α=30°',
    diagramSvg: mkSVG({ll_a:'150°', ur_b:'α'}) },

  { id:'parallel-35', difficulty:"O'rtacha",
    text:"a∥b. Kesuvchi hosil qilgan ichki bir tomonli burchaklar 1:4 nisbatda. Kichik burchakni toping.",
    options:['36°','144°','45°','30°'], answer:'36°',
    solution:'k+4k=180° \\Rightarrow k=36°',
    diagramSvg: mkSVG({ll_a:'k', ur_b:'4k'}) },

  { id:'parallel-36', difficulty:"Oson",
    text:"a∥b. Kesuvchi a bilan 70° almashinuvchi ichki burchak hosil qiladi. Unga qo'shni α ni toping.",
    options:['110°','70°','100°','120°'], answer:'110°',
    solution:'180°-70°=110°',
    diagramSvg: mkSVG({ll_a:'70°', ul_b:'α'}) },

  { id:'parallel-37', difficulty:"Oson",
    text:"a∥b. Kesuvchi a bilan 80° almashinuvchi ichki burchak hosil qiladi. Unga qo'shni α ni toping.",
    options:['100°','80°','90°','110°'], answer:'100°',
    solution:'180°-80°=100°',
    diagramSvg: mkSVG({ll_a:'80°', ul_b:'α'}) },

  { id:'parallel-38', difficulty:"Oson",
    text:"a∥b. To'g'ri burchakli uchburchakning bir o'tkir burchagi 30°. Ikkinchi o'tkir α ni toping.",
    options:['60°','30°','45°','90°'], answer:'60°',
    solution:'90°+30°+α=180° \\Rightarrow α=60°',
    diagramSvg: mkTri({apex:'α', gLeft:'90°', gRight:'30°'}) },

  { id:'parallel-39', difficulty:"O'rtacha",
    text:"a∥b. Kesuvchi a bilan 38° va b bilan 48° burchak hosil qiladi. Bu burchaklarning qo'shnilarini α₁ va α₂ toping.",
    options:['α₁=142°, α₂=132°','α₁=38°, α₂=48°','α₁=132°, α₂=142°','α₁=142°, α₂=48°'],
    answer:'α₁=142°, α₂=132°',
    solution:'α₁=180°-38°=142°; α₂=180°-48°=132°',
    diagramSvg: mkSVG({ur_a:'38°', ll_a:'α₁', ur_b:'48°', ll_b:'α₂'}) },

  { id:'parallel-40', difficulty:"O'rtacha",
    text:"a∥b. Uchburchakning ikkita ichki burchagi 30° va 20°. Uchinchi α ni toping.",
    options:['130°','50°','150°','80°'], answer:'130°',
    solution:'α=180°-30°-20°=130°',
    diagramSvg: mkTri({apex:'α', gLeft:'30°', gRight:'20°'}) },

  { id:'parallel-41', difficulty:"Oson",
    text:"a∥b. Uchburchakning ikkita burchagi 60° va 40°. Uchinchi α ni toping.",
    options:['80°','60°','100°','40°'], answer:'80°',
    solution:'α+60°+40°=180° \\Rightarrow α=80°',
    diagramSvg: mkTri({apex:'α', gLeft:'60°', gRight:'40°'}) },

  { id:'parallel-42', difficulty:"Oson",
    text:"a∥b. Uchburchakning ikkita burchagi 70° va 70°. Uchinchi α ni toping.",
    options:['40°','70°','110°','60°'], answer:'40°',
    solution:'α+70°+70°=180° \\Rightarrow α=40°',
    diagramSvg: mkTri({apex:'α', gLeft:'70°', gRight:'70°'}) },

  { id:'parallel-43', difficulty:"Oson",
    text:"a∥b. Kesuvchi a bilan 45° ichki bir tomonli burchak hosil qiladi. α ni toping.",
    options:['135°','45°','145°','55°'], answer:'135°',
    solution:'α+45°=180° \\Rightarrow α=135°',
    diagramSvg: mkSVG({lr_a:'45°', ul_b:'α'}) },

  { id:'parallel-44', difficulty:"Oson",
    text:"a∥b. Kesuvchi a bilan 60° almashinuvchi tashqi burchak hosil qiladi. Unga qo'shni α ni toping.",
    options:['120°','60°','130°','90°'], answer:'120°',
    solution:'180°-60°=120°',
    diagramSvg: mkSVG({ul_a:'60°', lr_a:'α'}) },

  { id:'parallel-45', difficulty:"Oson",
    text:"a∥b. Kesuvchi hosil qilgan ichki bir tomonli burchaklar teng. α ni toping.",
    options:['90°','45°','60°','180°'], answer:'90°',
    solution:'α+α=180° \\Rightarrow α=90°',
    diagramSvg: mkSVG({ll_a:'α', ur_b:'α'}) },

  { id:'parallel-46', difficulty:"Oson",
    text:"a∥b. Kesuvchi a bilan 35° ichki bir tomonli burchak hosil qiladi. α ni toping.",
    options:['145°','35°','155°','55°'], answer:'145°',
    solution:'α+35°=180° \\Rightarrow α=145°',
    diagramSvg: mkSVG({lr_a:'35°', ul_b:'α'}) },

  { id:'parallel-47', difficulty:"Oson",
    text:"a∥b. Kesuvchi a bilan 30° ichki bir tomonli burchak hosil qiladi. α ni toping.",
    options:['150°','30°','160°','140°'], answer:'150°',
    solution:'α+30°=180° \\Rightarrow α=150°',
    diagramSvg: mkSVG({lr_a:'30°', ul_b:'α'}) },

  { id:'parallel-48', difficulty:"Oson",
    text:"a∥b. Kesuvchi a bilan 40° mos burchak hosil qiladi. Unga qo'shni α ni toping.",
    options:['140°','40°','130°','50°'], answer:'140°',
    solution:'180°-40°=140°',
    diagramSvg: mkSVG({lr_a:'40°', ll_a:'α'}) },

  { id:'parallel-49', difficulty:"Oson",
    text:"a∥b. Kesuvchi a bilan 100° almashinuvchi ichki burchak hosil qiladi. Unga qo'shni α ni toping.",
    options:['80°','100°','70°','90°'], answer:'80°',
    solution:'180°-100°=80°',
    diagramSvg: mkSVG({ll_a:'100°', lr_a:'α'}) },

  { id:'parallel-50', difficulty:"Oson",
    text:"a∥b. Kesuvchi a bilan 110° almashinuvchi tashqi burchak hosil qiladi. Unga qo'shni α ni toping.",
    options:['70°','110°','80°','60°'], answer:'70°',
    solution:'180°-110°=70°',
    diagramSvg: mkSVG({ul_a:'110°', lr_a:'α'}) },

  { id:'parallel-51', difficulty:"O'rtacha",
    text:"a∥b. Uchburchakning bir burchagi a bilan 35°, boshqasi b bilan 45° almashinuvchi burchak hosil qiladi. Uchinchi α ni toping.",
    options:['100°','35°','45°','80°'], answer:'100°',
    solution:'35°+45°+α=180° \\Rightarrow α=100°',
    diagramSvg: mkTri({apex:'α', gLeft:'35°', gRight:'45°'}) },

  { id:'parallel-52', difficulty:"Oson",
    text:"a∥b. Kesuvchi a bilan 95° ichki bir tomonli burchak hosil qiladi. α ni toping.",
    options:['85°','95°','75°','105°'], answer:'85°',
    solution:'α+95°=180° \\Rightarrow α=85°',
    diagramSvg: mkSVG({ll_a:'95°', ur_b:'α'}) },

  { id:'parallel-53', difficulty:"Oson",
    text:"a∥b. Kesuvchi a bilan 89° ichki bir tomonli burchak hosil qiladi. α ni toping.",
    options:['91°','89°','81°','99°'], answer:'91°',
    solution:'α+89°=180° \\Rightarrow α=91°',
    diagramSvg: mkSVG({ll_a:'89°', ur_b:'α'}) },

  { id:'parallel-54', difficulty:"Qiyin",
    text:"a∥b. P nuqtasi parallel chiziqlar orasida. PA nuri a bilan α va PB nuri b bilan β burchak hosil qiladi. P dagi α₁ ni toping.",
    options:['α₁=α+β','α₁=α-β','α₁=180°-(α+β)','α₁=αβ'],
    answer:'α₁=α+β',
    solution:'P orqali yordamchi parallel chiziq: α₁=α+β (almashinuvchi burchaklar teoremasi)',
    diagramSvg: mkZig({angA:'α', angB:'β', angP:'α₁'}) },

  { id:'parallel-55', difficulty:"O'rtacha",
    text:"a∥b. P nuqtasi a va b orasida. PA nuri a bilan 30° va PB nuri b bilan 34° burchak hosil qiladi. P dagi α ni toping.",
    options:['64°','30°','34°','94°'], answer:'64°',
    solution:'α=30°+34°=64°',
    diagramSvg: mkZig({angA:'30°', angB:'34°', angP:'α'}) },

  { id:'parallel-56', difficulty:"O'rtacha",
    text:"a∥b. P nuqtasi a va b orasida. PA nuri a bilan 80° va PB nuri b bilan 70° burchak hosil qiladi. P dagi α ni toping.",
    options:['150°','80°','70°','160°'], answer:'150°',
    solution:'α=80°+70°=150°',
    diagramSvg: mkZig({angA:'80°', angB:'70°', angP:'α'}) },

  { id:'parallel-57', difficulty:"Oson",
    text:"a∥b. Uchburchakning ikkita burchagi 80° va 50°. Uchinchi α ni toping.",
    options:['50°','80°','60°','40°'], answer:'50°',
    solution:'α+80°+50°=180° \\Rightarrow α=50°',
    diagramSvg: mkTri({apex:'α', gLeft:'80°', gRight:'50°'}) },

  { id:'parallel-58', difficulty:"O'rtacha",
    text:"a∥b. P nuqtasi a va b orasida. PA nuri a bilan 65° va PB nuri b bilan 60° burchak hosil qiladi. P dagi α ni toping.",
    options:['125°','65°','60°','115°'], answer:'125°',
    solution:'α=65°+60°=125°',
    diagramSvg: mkZig({angA:'65°', angB:'60°', angP:'α'}) },

  { id:'parallel-59', difficulty:"Oson",
    text:"a∥b. Kesuvchi a bilan 60° ichki bir tomonli burchak hosil qiladi. α ni toping.",
    options:['120°','60°','130°','90°'], answer:'120°',
    solution:'α+60°=180° \\Rightarrow α=120°',
    diagramSvg: mkSVG({lr_a:'60°', ul_b:'α'}) },

  { id:'parallel-60', difficulty:"O'rtacha",
    text:"a∥b. P nuqtasi a va b orasida. PA nuri a bilan 85° va PB nuri b bilan 90° burchak hosil qiladi. P dagi α ni toping.",
    options:['175°','85°','90°','165°'], answer:'175°',
    solution:'α=85°+90°=175°',
    diagramSvg: mkZig({angA:'85°', angB:'90°', angP:'α'}) },

  { id:'parallel-61', difficulty:"O'rtacha",
    text:"a∥b. Kesuvchi a bilan 110° ichki bir tomonli burchak hosil qiladi. b bilan almashinuvchi ichki α ni toping.",
    options:['70°','110°','80°','60°'], answer:'70°',
    solution:'180°-110°=70° (almashinuvchi ichki)',
    diagramSvg: mkSVG({ll_a:'110°', lr_b:'α'}) },

  { id:'parallel-62', difficulty:"Oson",
    text:"a∥b. Teng yonli uchburchakning asos burchaklari 60°. Tepa α burchakni toping.",
    options:['60°','70°','80°','50°'], answer:'60°',
    solution:'α+60°+60°=180° \\Rightarrow α=60° (teng tomonli uchburchak)',
    diagramSvg: mkTri({apex:'α', gLeft:'60°', gRight:'60°'}) },

  { id:'parallel-63', difficulty:"O'rtacha",
    text:"a∥b. Kesuvchi a bilan 120° ichki bir tomonli burchak hosil qiladi. b bilan almashinuvchi ichki α ni toping.",
    options:['60°','120°','50°','70°'], answer:'60°',
    solution:'180°-120°=60°',
    diagramSvg: mkSVG({ll_a:'120°', lr_b:'α'}) },

  { id:'parallel-64', difficulty:"O'rtacha",
    text:"a∥b. Kesuvchi a bilan 110° almashinuvchi tashqi burchak hosil qiladi. b bilan almashinuvchi tashqi α ni toping.",
    options:['70°','110°','80°','60°'], answer:'70°',
    solution:'180°-110°=70°',
    diagramSvg: mkSVG({ul_a:'110°', ur_b:'α'}) },

  { id:'parallel-65', difficulty:"Oson",
    text:"a∥b. Kesuvchi a bilan 80° mos burchak hosil qiladi. b bilan mos α ni toping.",
    options:['80°','100°','70°','90°'], answer:'80°',
    solution:'Mos burchaklar teng: α=80°',
    diagramSvg: mkSVG({lr_a:'80°', lr_b:'α'}) },

  { id:'parallel-66', difficulty:"Oson",
    text:"a∥b. Kesuvchi a bilan 70° ichki bir tomonli burchak hosil qiladi. α ni toping.",
    options:['110°','70°','100°','120°'], answer:'110°',
    solution:'α+70°=180° \\Rightarrow α=110°',
    diagramSvg: mkSVG({lr_a:'70°', ul_b:'α'}) },

  { id:'parallel-67', difficulty:"Oson",
    text:"a∥b. Uchburchakning ikkita burchagi 60° va 40°. Uchinchi α ni toping.",
    options:['80°','120°','100°','60°'], answer:'80°',
    solution:'α=180°-60°-40°=80°',
    diagramSvg: mkTri({apex:'α', gLeft:'60°', gRight:'40°'}) },

  { id:'parallel-68', difficulty:"Oson",
    text:"a∥b. Kesuvchi a bilan 75° ichki bir tomonli burchak hosil qiladi. α ni toping.",
    options:['105°','75°','115°','95°'], answer:'105°',
    solution:'α+75°=180° \\Rightarrow α=105°',
    diagramSvg: mkSVG({ll_a:'75°', ur_b:'α'}) },

  { id:'parallel-69', difficulty:"Oson",
    text:"a∥b. Kesuvchi a bilan 50° almashinuvchi ichki burchak hosil qiladi. b bilan almashinuvchi ichki α ni toping.",
    options:['50°','130°','40°','60°'], answer:'50°',
    solution:'Almashinuvchi ichki burchaklar teng: α=50°',
    diagramSvg: mkSVG({ll_a:'50°', lr_b:'α'}) },

  { id:'parallel-70', difficulty:"O'rtacha",
    text:"a∥b. P nuqtasi a va b orasida. PA nuri a bilan 40° va PB nuri b bilan 30° burchak hosil qiladi. P dagi α ni toping.",
    options:['70°','40°','30°','80°'], answer:'70°',
    solution:'α=40°+30°=70°',
    diagramSvg: mkZig({angA:'40°', angB:'30°', angP:'α'}) },
];

async function main() {
  const rows = questions.map(q => ({
    id: q.id,
    text: q.text,
    options: q.options,
    answer: q.answer,
    solution: q.solution,
    topic: T,
    difficulty: q.difficulty,
    exam_type: E,
    diagram_svg: q.diagramSvg ?? null,
  }));

  const { error } = await supabase.from('questions').insert(rows);
  if (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
  console.log(`✅ ${rows.length} ta yangi savol qo'shildi! (parallel-21 dan parallel-70 gacha)`);
}

main();
