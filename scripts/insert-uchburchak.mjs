import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://cngkzlkreddsdpjqflsb.supabase.co',
  'sb_publishable_XBtykx-ZbWc1326el4G5SA_JEgpuDOo'
);

const T1 = "Uchburchak burchaklari";
const T2 = "Uchburchakning tashqi burchaklari";
const E  = ["DTM","Milliy Sertifikat","Maktab"];

// ── SVG helpers ──────────────────────────────────────────────────────────────

// Plain triangle: A(20,130), B(180,130), C(100,22)
function mkTri({ a='', b='', c='', ga='', gb='', gc='' } = {}) {
  return (
    `<svg viewBox="0 0 200 155" xmlns="http://www.w3.org/2000/svg">` +
    `<rect width="200" height="155" fill="#1a2332"/>` +
    `<polygon points="100,22 20,132 180,132" fill="none" stroke="#9ca3af" stroke-width="1.5"/>` +
    (gc ? `<text x="96" y="18" fill="${ga||gb?'#e5e7eb':'#00d4aa'}" font-size="12" text-anchor="middle">${gc}</text>` : '') +
    (ga ? `<text x="2"  y="148" fill="#e5e7eb" font-size="12">${ga}</text>` : '') +
    (gb ? `<text x="164" y="148" fill="#e5e7eb" font-size="12">${gb}</text>` : '') +
    (a  ? `<text x="2"  y="148" fill="#00d4aa" font-size="12">${a}</text>` : '') +
    (b  ? `<text x="164" y="148" fill="#00d4aa" font-size="12">${b}</text>` : '') +
    (c  ? `<text x="96" y="18" fill="#00d4aa" font-size="12" text-anchor="middle">${c}</text>` : '') +
    `</svg>`
  );
}

// Right triangle: right angle at A(20,132)
function mkRight({ alpha='', beta='', ga='', gb='' } = {}) {
  return (
    `<svg viewBox="0 0 200 155" xmlns="http://www.w3.org/2000/svg">` +
    `<rect width="200" height="155" fill="#1a2332"/>` +
    `<polygon points="20,132 20,22 180,132" fill="none" stroke="#9ca3af" stroke-width="1.5"/>` +
    `<rect x="20" y="112" width="14" height="14" fill="none" stroke="#9ca3af" stroke-width="1.2"/>` +
    `<text x="4"  y="18" fill="#e5e7eb" font-size="11">C</text>` +
    `<text x="164" y="148" fill="#e5e7eb" font-size="11">B</text>` +
    (ga ? `<text x="26"  y="148" fill="#e5e7eb" font-size="12">${ga}</text>` : '') +
    (gb ? `<text x="164" y="118" fill="#e5e7eb" font-size="12">${gb}</text>` : '') +
    (alpha ? `<text x="26" y="148" fill="#00d4aa" font-size="12">${alpha}</text>` : '') +
    (beta  ? `<text x="164" y="118" fill="#00d4aa" font-size="12">${beta}</text>` : '') +
    `<text x="2"  y="148" fill="#e5e7eb" font-size="11">A</text>` +
    `</svg>`
  );
}

// Isosceles triangle: equal sides from C at top
function mkIso({ apex='', base='', gApex='', gBase='' } = {}) {
  return (
    `<svg viewBox="0 0 200 155" xmlns="http://www.w3.org/2000/svg">` +
    `<rect width="200" height="155" fill="#1a2332"/>` +
    `<polygon points="100,22 20,132 180,132" fill="none" stroke="#9ca3af" stroke-width="1.5"/>` +
    `<line x1="52" y1="80" x2="60" y2="82" stroke="#9ca3af" stroke-width="1.2"/>` +
    `<line x1="52" y1="80" x2="54" y2="73" stroke="#9ca3af" stroke-width="1.2"/>` +
    `<line x1="148" y1="80" x2="140" y2="82" stroke="#9ca3af" stroke-width="1.2"/>` +
    `<line x1="148" y1="80" x2="146" y2="73" stroke="#9ca3af" stroke-width="1.2"/>` +
    (gApex ? `<text x="96" y="18" fill="#e5e7eb" font-size="12" text-anchor="middle">${gApex}</text>` : '') +
    (gBase ? `<text x="2"  y="148" fill="#e5e7eb" font-size="12">${gBase}</text>` : '') +
    (apex  ? `<text x="96" y="18" fill="#00d4aa" font-size="12" text-anchor="middle">${apex}</text>` : '') +
    (base  ? `<text x="2"  y="148" fill="#00d4aa" font-size="12">${base}</text>` : '') +
    (base  ? `<text x="164" y="148" fill="#00d4aa" font-size="12">${base}</text>` : '') +
    `</svg>`
  );
}

// ── Questions ────────────────────────────────────────────────────────────────

const questions = [

  // ══ UCHBURCHAK BURCHAKLARI (Q163–Q199) ═══════════════════════════════════

  // Q163a–d  (fill-in table: find missing angle)
  { id:'uchburchak-1', difficulty:"Oson", topic:T1,
    text:"Uchburchakning ikki burchagi 60° va 40° ga teng. Uchinchi burchakni toping.",
    options:['80°','100°','70°','60°'], answer:'80°',
    solution:'\\alpha=180°-60°-40°=80°',
    diagramSvg: mkTri({ ga:'60°', gb:'40°', c:'α' }) },

  { id:'uchburchak-2', difficulty:"Oson", topic:T1,
    text:"Uchburchakning ikki burchagi 90° va 50° ga teng. Uchinchi burchakni toping.",
    options:['40°','50°','90°','30°'], answer:'40°',
    solution:'\\alpha=180°-90°-50°=40°',
    diagramSvg: mkTri({ ga:'90°', gb:'50°', c:'α' }) },

  { id:'uchburchak-3', difficulty:"Oson", topic:T1,
    text:"Uchburchakning ikki burchagi 80° va 70° ga teng. Uchinchi burchakni toping.",
    options:['30°','40°','20°','50°'], answer:'30°',
    solution:'\\alpha=180°-80°-70°=30°',
    diagramSvg: mkTri({ ga:'80°', gb:'70°', c:'α' }) },

  { id:'uchburchak-4', difficulty:"Oson", topic:T1,
    text:"Uchburchakning ikki burchagi 55° va 40° ga teng. Uchinchi burchakni toping.",
    options:['85°','75°','95°','80°'], answer:'85°',
    solution:'\\alpha=180°-55°-40°=85°',
    diagramSvg: mkTri({ ga:'55°', gb:'40°', c:'α' }) },

  // Q164
  { id:'uchburchak-5', difficulty:"Oson", topic:T1,
    text:"Uchburchakning ichki burchaklaridan ikkitasining yig'indisi 96° ga teng bo'lsa, uchinchi ichki burchakni toping.",
    options:['84°','96°','90°','74°'], answer:'84°',
    solution:'\\alpha=180°-96°=84°',
    diagramSvg: mkTri({ a:'α', gc:'α₁+α₂=96°' }) },

  // Q165
  { id:'uchburchak-6', difficulty:"Oson", topic:T1,
    text:"Uchburchakning ichki burchaklaridan ikkitasining yig'indisi 102° ga teng bo'lsa, uchinchi ichki burchakni toping.",
    options:['78°','102°','80°','72°'], answer:'78°',
    solution:'\\alpha=180°-102°=78°',
    diagramSvg: mkTri({ a:'α', gc:'102°' }) },

  // Q166
  { id:'uchburchak-7', difficulty:"O'rtacha", topic:T1,
    text:"Uchburchakning ikki ichki burchagi yig'indisining sinusi 0,36 ga teng. Uchinchi ichki burchagining sinusini toping.",
    options:['0,36','0,64','0,5','0,72'], answer:'0,36',
    solution:'\\sin(A+B)=\\sin(180°-C)=\\sin C \\Rightarrow \\sin C=0{,}36',
    diagramSvg: mkTri({ a:'A', b:'B', c:'C' }) },

  // Q167
  { id:'uchburchak-8', difficulty:"O'rtacha", topic:T1,
    text:"Uchburchakning ikki ichki burchagi yig'indisining sinusi 0,48 ga teng. Uchinchi ichki burchagining sinusini toping.",
    options:['0,48','0,52','0,6','0,36'], answer:'0,48',
    solution:'\\sin(A+B)=\\sin C \\Rightarrow \\sin C=0{,}48',
    diagramSvg: mkTri({ a:'A', b:'B', c:'C' }) },

  // Q168
  { id:'uchburchak-9', difficulty:"O'rtacha", topic:T1,
    text:"Uchburchakning ikki ichki burchagi yig'indisining kosinusi 0,52 ga teng. Uchinchi ichki burchagining kosinusini toping.",
    options:['−0,52','0,52','−0,48','0,48'], answer:'−0,52',
    solution:'\\cos(A+B)=\\cos(180°-C)=-\\cos C \\Rightarrow \\cos C=-0{,}52',
    diagramSvg: mkTri({ a:'A', b:'B', c:'C' }) },

  // Q169
  { id:'uchburchak-10', difficulty:"O'rtacha", topic:T1,
    text:"Uchburchakning ikki ichki burchagi yig'indisining kosinusi -\\frac{8}{11} ga teng. Uchinchi ichki burchagining kosinusini toping.",
    options:['\\frac{8}{11}','-\\frac{8}{11}','\\frac{3}{11}','-\\frac{3}{11}'], answer:'\\frac{8}{11}',
    solution:'\\cos(A+B)=-\\cos C \\Rightarrow \\cos C=\\frac{8}{11}',
    diagramSvg: mkTri({ a:'A', b:'B', c:'C' }) },

  // Q170
  { id:'uchburchak-11', difficulty:"Qiyin", topic:T1,
    text:"Uchburchakning ikki ichki burchagi yig'indisining sinusi 0,6 ga teng. Uchinchi ichki burchak o'tkir bo'lsa, shu burchakning kosinusini toping.",
    options:['0,8','0,6','0,4','-0,8'], answer:'0,8',
    solution:'\\sin C=\\sin(A+B)=0{,}6. \\quad C\\text{ o\'tkir} \\Rightarrow \\cos C=\\sqrt{1-0{,}36}=0{,}8',
    diagramSvg: mkTri({ a:'A', b:'B', c:'C' }) },

  // Q171
  { id:'uchburchak-12', difficulty:"Qiyin", topic:T1,
    text:"Uchburchakning ikki ichki burchagi yig'indisining sinusi 0,8 ga teng. Uchinchi ichki burchak o'tmas bo'lsa, shu burchakning kosinusini toping.",
    options:['-0,6','0,6','-0,8','0,8'], answer:'-0,6',
    solution:'\\sin C=0{,}8. \\quad C>90° \\Rightarrow \\cos C=-\\sqrt{1-0{,}64}=-0{,}6',
    diagramSvg: mkTri({ a:'A', b:'B', c:'C' }) },

  // Q172
  { id:'uchburchak-13', difficulty:"Qiyin", topic:T1,
    text:"Uchburchakning ikki ichki burchagi yig'indisining kosinusi -\\frac{7}{25} ga teng. Uchinchi burchak o'tkir bo'lsa, uning sinusini toping.",
    options:['\\frac{24}{25}','\\frac{7}{25}','\\frac{25}{24}','\\frac{4}{5}'], answer:'\\frac{24}{25}',
    solution:'\\cos C=\\frac{7}{25}. \\quad \\sin C=\\sqrt{1-\\frac{49}{625}}=\\frac{24}{25}',
    diagramSvg: mkTri({ a:'A', b:'B', c:'C' }) },

  // Q173
  { id:'uchburchak-14', difficulty:"Qiyin", topic:T1,
    text:"Uchburchakning ikki ichki burchagi yig'indisining kosinusi -\\frac{5}{12} ga teng. Uchinchi burchagining sinusini toping.",
    options:['\\frac{\\sqrt{119}}{12}','\\frac{5}{12}','\\frac{\\sqrt{143}}{12}','\\frac{7}{12}'], answer:'\\frac{\\sqrt{119}}{12}',
    solution:'\\cos C=\\frac{5}{12}. \\quad \\sin C=\\sqrt{1-\\frac{25}{144}}=\\frac{\\sqrt{119}}{12}',
    diagramSvg: mkTri({ a:'A', b:'B', c:'C' }) },

  // Q174
  { id:'uchburchak-15', difficulty:"O'rtacha", topic:T1,
    text:"Uchburchakning ichki burchaklari 2:3:4 nisbatda. Shu burchaklarni toping.",
    options:['40°, 60°, 80°','36°, 54°, 90°','30°, 60°, 90°','45°, 60°, 75°'], answer:'40°, 60°, 80°',
    solution:'2k+3k+4k=180° \\Rightarrow k=20°. \\quad 40°,\\ 60°,\\ 80°',
    diagramSvg: mkTri({ a:'2k', b:'3k', c:'4k' }) },

  // Q175
  { id:'uchburchak-16', difficulty:"O'rtacha", topic:T1,
    text:"Uchburchakning ichki burchaklari 3:4:5 nisbatda. Shu burchaklarni toping.",
    options:['45°, 60°, 75°','30°, 60°, 90°','40°, 60°, 80°','36°, 48°, 96°'], answer:'45°, 60°, 75°',
    solution:'3k+4k+5k=180° \\Rightarrow k=15°. \\quad 45°,\\ 60°,\\ 75°',
    diagramSvg: mkTri({ a:'3k', b:'4k', c:'5k' }) },

  // Q176
  { id:'uchburchak-17', difficulty:"O'rtacha", topic:T1,
    text:"Uchburchak ichki burchaklaridan biri 40°. Qolgan ikkita burchak 2:5 nisbatda. Katta burchakni toping.",
    options:['100°','80°','120°','70°'], answer:'100°',
    solution:'40°+2k+5k=180° \\Rightarrow 7k=140° \\Rightarrow k=20°. \\text{ Katta }=5\\times20°=100°',
    diagramSvg: mkTri({ ga:'40°', a:'2k', b:'5k' }) },

  // Q177
  { id:'uchburchak-18', difficulty:"O'rtacha", topic:T1,
    text:"Uchburchak ichki burchaklaridan biri 50°. Qolgan ikkita burchak ayirmasi 10° ga teng. Kichik burchakni toping.",
    options:['60°','70°','65°','55°'], answer:'60°',
    solution:'50°+\\alpha+\\beta=180°,\\ \\alpha-\\beta=10° \\Rightarrow \\alpha=70°,\\ \\beta=60°',
    diagramSvg: mkTri({ ga:'50°', a:'β', b:'α' }) },

  // Q178 (diagram only → construct triangle problem)
  { id:'uchburchak-19', difficulty:"O'rtacha", topic:T1,
    text:"Rasmda ko'rsatilgan uchburchakda ikki burchak 70° va 70° ga teng. α burchakni toping.",
    options:['40°','70°','110°','50°'], answer:'40°',
    solution:'\\alpha=180°-70°-70°=40°',
    diagramSvg: mkTri({ ga:'70°', gb:'70°', c:'α' }) },

  // Q179 (diagram only)
  { id:'uchburchak-20', difficulty:"O'rtacha", topic:T1,
    text:"Uchburchakning ikki burchagi 100° va 40° ga teng. Uchinchi α burchakni toping.",
    options:['40°','60°','50°','80°'], answer:'40°',
    solution:'\\alpha=180°-100°-40°=40°',
    diagramSvg: mkTri({ ga:'100°', gb:'40°', c:'α' }) },

  // Q180 (diagram only)
  { id:'uchburchak-21', difficulty:"O'rtacha", topic:T1,
    text:"Uchburchakning ikki burchagi 75° va 50° ga teng. Uchinchi α burchakni toping.",
    options:['55°','75°','50°','65°'], answer:'55°',
    solution:'\\alpha=180°-75°-50°=55°',
    diagramSvg: mkTri({ ga:'75°', gb:'50°', c:'α' }) },

  // Q181
  { id:'uchburchak-22', difficulty:"Oson", topic:T1,
    text:"To'g'ri burchakli uchburchakning o'tkir burchaklaridan biri 25° ga teng. Ikkinchi o'tkir burchakni toping.",
    options:['65°','25°','75°','55°'], answer:'65°',
    solution:'90°+25°+\\alpha=180° \\Rightarrow \\alpha=65°',
    diagramSvg: mkRight({ ga:'90°', gb:'25°', alpha:'α' }) },

  // Q182
  { id:'uchburchak-23', difficulty:"Oson", topic:T1,
    text:"To'g'ri burchakli uchburchakning o'tkir burchaklaridan biri 63° ga teng. Ikkinchi o'tkir burchakni toping.",
    options:['27°','63°','37°','57°'], answer:'27°',
    solution:'90°+63°+\\alpha=180° \\Rightarrow \\alpha=27°',
    diagramSvg: mkRight({ ga:'90°', gb:'63°', alpha:'α' }) },

  // Q183
  { id:'uchburchak-24', difficulty:"O'rtacha", topic:T1,
    text:"To'g'ri burchakli uchburchakning o'tkir burchaklari 4:5 nisbatda. Shu burchaklarni toping.",
    options:['40° va 50°','36° va 45°','30° va 60°','45° va 45°'], answer:'40° va 50°',
    solution:'4k+5k=90° \\Rightarrow k=10°. \\quad 40°\\text{ va }50°',
    diagramSvg: mkRight({ ga:'90°', gb:'4k', alpha:'5k' }) },

  // Q184
  { id:'uchburchak-25', difficulty:"O'rtacha", topic:T1,
    text:"To'g'ri burchakli uchburchakning o'tkir burchaklari 1:2 nisbatda. Shu burchaklarni toping.",
    options:['30° va 60°','45° va 45°','20° va 40°','36° va 54°'], answer:'30° va 60°',
    solution:'k+2k=90° \\Rightarrow k=30°. \\quad 30°\\text{ va }60°',
    diagramSvg: mkRight({ ga:'90°', gb:'k', alpha:'2k' }) },

  // Q185
  { id:'uchburchak-26', difficulty:"O'rtacha", topic:T1,
    text:"To'g'ri burchakli uchburchak birinchi o'tkir burchagining sinusi 0,7 ga teng. Ikkinchi o'tkir burchagining kosinusini toping.",
    options:['0,7','0,3','\\sqrt{0{,}51}','0,5'], answer:'0,7',
    solution:'\\alpha_1+\\alpha_2=90° \\Rightarrow \\sin\\alpha_1=\\cos\\alpha_2=0{,}7',
    diagramSvg: mkRight({ ga:'α₁', alpha:'α₂' }) },

  // Q186
  { id:'uchburchak-27', difficulty:"O'rtacha", topic:T1,
    text:"To'g'ri burchakli uchburchak birinchi o'tkir burchagining kosinusi 0,35 ga teng. Ikkinchi o'tkir burchagining sinusini toping.",
    options:['0,35','0,65','\\sqrt{0{,}88}','0,5'], answer:'0,35',
    solution:'\\cos\\alpha_1=\\sin\\alpha_2=0{,}35 \\text{ (qo\'shimcha burchaklar)}',
    diagramSvg: mkRight({ ga:'α₁', alpha:'α₂' }) },

  // Q187
  { id:'uchburchak-28', difficulty:"Oson", topic:T1,
    text:"Teng yonli uchburchakning uchidagi (tepa) burchagi 40° ga teng. Uning asosidagi burchaklarni toping.",
    options:['70°','40°','80°','65°'], answer:'70°',
    solution:'(180°-40°)/2=70°',
    diagramSvg: mkIso({ gApex:'40°', base:'α' }) },

  // Q188
  { id:'uchburchak-29', difficulty:"Oson", topic:T1,
    text:"Teng yonli uchburchak uchidagi (tepa) burchagi 100° ga teng. Uning asosidagi burchakni toping.",
    options:['40°','80°','50°','60°'], answer:'40°',
    solution:'(180°-100°)/2=40°',
    diagramSvg: mkIso({ gApex:'100°', base:'α' }) },

  // Q189
  { id:'uchburchak-30', difficulty:"Oson", topic:T1,
    text:"Teng yonli uchburchakning asosidagi burchaklari 50° dan teng. Uning uchidagi (tepa) burchakni toping.",
    options:['80°','50°','100°','60°'], answer:'80°',
    solution:'180°-50°-50°=80°',
    diagramSvg: mkIso({ gBase:'50°', apex:'α' }) },

  // Q190
  { id:'uchburchak-31', difficulty:"Oson", topic:T1,
    text:"Teng yonli uchburchakning asosidagi burchaklari 45° dan teng. Uning uchidagi (tepa) burchakni toping.",
    options:['90°','45°','70°','100°'], answer:'90°',
    solution:'180°-45°-45°=90°',
    diagramSvg: mkIso({ gBase:'45°', apex:'α' }) },

  // Q191–Q199  (aralash masalalar — construct equivalent triangle problems)
  { id:'uchburchak-32', difficulty:"O'rtacha", topic:T1,
    text:"Uchburchakning ikki burchagi 70° va 30° ga teng. α ni toping.",
    options:['80°','70°','100°','60°'], answer:'80°',
    solution:'\\alpha=180°-70°-30°=80°',
    diagramSvg: mkTri({ ga:'70°', gb:'30°', c:'α' }) },

  { id:'uchburchak-33', difficulty:"O'rtacha", topic:T1,
    text:"Uchburchakning ikki burchagi 100° va 40° ga teng. Uchinchi α burchakni toping.",
    options:['40°','60°','80°','20°'], answer:'40°',
    solution:'\\alpha=180°-100°-40°=40°',
    diagramSvg: mkTri({ ga:'100°', gb:'40°', c:'α' }) },

  { id:'uchburchak-34', difficulty:"Qiyin", topic:T1,
    text:"Uchburchakning ikki burchagi 112° va 40° ga teng. Uchinchi α burchakni toping.",
    options:['28°','40°','68°','52°'], answer:'28°',
    solution:'\\alpha=180°-112°-40°=28°',
    diagramSvg: mkTri({ ga:'112°', gb:'40°', c:'α' }) },

  { id:'uchburchak-35', difficulty:"O'rtacha", topic:T1,
    text:"Uchburchakning ikki burchagi 60° va 50° ga teng. Uchinchi α burchakni toping.",
    options:['70°','60°','50°','80°'], answer:'70°',
    solution:'\\alpha=180°-60°-50°=70°',
    diagramSvg: mkTri({ ga:'60°', gb:'50°', c:'α' }) },

  { id:'uchburchak-36', difficulty:"O'rtacha", topic:T1,
    text:"Teng yonli uchburchakning uchidagi burchagi 100°. Asosidagi α burchakni toping.",
    options:['40°','80°','50°','70°'], answer:'40°',
    solution:'\\alpha=(180°-100°)/2=40°',
    diagramSvg: mkIso({ gApex:'100°', base:'α' }) },

  { id:'uchburchak-37', difficulty:"O'rtacha", topic:T1,
    text:"Teng yonli uchburchakning uchidagi burchagi 80°. Asosidagi α burchakni toping.",
    options:['50°','40°','60°','80°'], answer:'50°',
    solution:'\\alpha=(180°-80°)/2=50°',
    diagramSvg: mkIso({ gApex:'80°', base:'α' }) },

  { id:'uchburchak-38', difficulty:"Qiyin", topic:T1,
    text:"Uchburchakning tashqi burchagi 140°. Bir ichki burchak 40°. Ikkinchi ichki α burchakni toping.",
    options:['100°','140°','80°','120°'], answer:'100°',
    solution:'\\text{Tashqi burchak}=\\alpha+40° \\Rightarrow 140°=\\alpha+40° \\Rightarrow \\alpha=100°',
    diagramSvg: mkTri({ ga:'40°', gb:'α', c:'40°' }) },

  { id:'uchburchak-39', difficulty:"Qiyin", topic:T1,
    text:"Uchburchakning tashqi burchagi 100°. Bir ichki burchak 80°. Ikkinchi ichki α burchakni toping.",
    options:['20°','80°','100°','60°'], answer:'20°',
    solution:'100°=80°+\\alpha \\Rightarrow \\alpha=20°',
    diagramSvg: mkTri({ ga:'80°', gb:'α', c:'20°' }) },

  { id:'uchburchak-40', difficulty:"Qiyin", topic:T1,
    text:"Uchburchakning ikki burchagi yig'indisi 170°. Uchinchi α burchakni toping.",
    options:['10°','20°','170°','90°'], answer:'10°',
    solution:'\\alpha=180°-170°=10°',
    diagramSvg: mkTri({ ga:'α₁', gb:'α₂', c:'α' }) },

  // ══ UCHBURCHAKNING TASHQI BURCHAKLARI (Q200–Q209) ════════════════════════

  // Q200 (simplified — find one exterior angle from given internals)
  { id:'tashqi-1', difficulty:"O'rtacha", topic:T2,
    text:"Uchburchakning barcha tashqi burchaklarining (ikki tomondan) yig'indisi necha gradus?",
    options:['720°','360°','540°','180°'], answer:'720°',
    solution:'Har bir uchda ikkita tashqi burchak bor: 2×360°=720°',
    diagramSvg: mkTri({ a:'α', b:'β', c:'γ' }) },

  // Q201
  { id:'tashqi-2', difficulty:"O'rtacha", topic:T2,
    text:"Uchburchakning bittadan olingan tashqi burchaklari yig'indisi necha gradus?",
    options:['360°','180°','720°','540°'], answer:'360°',
    solution:'\\text{Bittadan olingan tashqi burchaklar: }\\alpha\'+\\beta\'+\\gamma\'=360°',
    diagramSvg: mkTri({ a:'α', b:'β', c:'γ' }) },

  // Q202
  { id:'tashqi-3', difficulty:"Oson", topic:T2,
    text:"Ixtiyoriy uchburchakning barcha tashqi burchaklarining yig'indisi necha gradusga teng?",
    options:['720°','360°','540°','180°'], answer:'720°',
    solution:'\\text{Har bir uchda tashqi burchak juftligi: }2×360°=720°',
    diagramSvg: null },

  // Q203
  { id:'tashqi-4', difficulty:"Oson", topic:T2,
    text:"Ixtiyoriy uchburchakning bittadan olingan tashqi burchaklari yig'indisi necha gradusga teng?",
    options:['360°','720°','180°','540°'], answer:'360°',
    solution:'\\alpha\'+\\beta\'+\\gamma\'=360°',
    diagramSvg: null },

  // Q204 (diagram: exterior = 120°)
  { id:'tashqi-5', difficulty:"O'rtacha", topic:T2,
    text:"Uchburchakning ikkita ichki burchagi 70° va 50°. Bu ikki burchakga teskari uchning tashqi burchagini toping.",
    options:['120°','110°','130°','60°'], answer:'120°',
    solution:'\\text{Tashqi burchak }=70°+50°=120°',
    diagramSvg: mkTri({ ga:'70°', gb:'50°', c:'γ′=α' }) },

  // Q205 (exterior = 75°)
  { id:'tashqi-6', difficulty:"O'rtacha", topic:T2,
    text:"Uchburchakning ikkita ichki burchagi 40° va 35°. Bu ikki burchakka teskari uchning tashqi burchagini toping.",
    options:['75°','105°','145°','65°'], answer:'75°',
    solution:'\\text{Tashqi burchak }=40°+35°=75°',
    diagramSvg: mkTri({ ga:'40°', gb:'35°', c:'α' }) },

  // Q206 (exterior = 120°)
  { id:'tashqi-7', difficulty:"O'rtacha", topic:T2,
    text:"Uchburchakning ikkita ichki burchagi 80° va 40°. Teskari uchning tashqi burchagini toping.",
    options:['120°','140°','100°','80°'], answer:'120°',
    solution:'80°+40°=120°',
    diagramSvg: mkTri({ ga:'80°', gb:'40°', c:'α' }) },

  // Q207
  { id:'tashqi-8', difficulty:"O'rtacha", topic:T2,
    text:"Uchburchakning ikki ichki burchagi 80° va 80°. Uchinchi uchning tashqi burchagini toping.",
    options:['160°','20°','100°','120°'], answer:'160°',
    solution:'\\text{Tashqi burchak}=80°+80°=160°',
    diagramSvg: mkTri({ ga:'80°', gb:'80°', c:'α' }) },

  // Q208 (exterior = 110°)
  { id:'tashqi-9', difficulty:"O'rtacha", topic:T2,
    text:"Uchburchakning ikkita ichki burchagi 60° va 50°. Uchinchi uchning tashqi burchagini toping.",
    options:['110°','70°','120°','90°'], answer:'110°',
    solution:'60°+50°=110°',
    diagramSvg: mkTri({ ga:'60°', gb:'50°', c:'α' }) },

  // Q209 (exterior = 125°)
  { id:'tashqi-10', difficulty:"O'rtacha", topic:T2,
    text:"Uchburchakning ikkita ichki burchagi 65° va 60°. Uchinchi uchning tashqi burchagini toping.",
    options:['125°','115°','120°','55°'], answer:'125°',
    solution:'65°+60°=125°',
    diagramSvg: mkTri({ ga:'65°', gb:'60°', c:'α' }) },
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
    exam_type: E,
    diagram_svg: q.diagramSvg ?? null,
  }));

  const { error } = await supabase.from('questions').insert(rows);
  if (error) { console.error('Error:', error.message); process.exit(1); }
  console.log(`✅ ${rows.length} ta savol qo'shildi!`);
  const n1 = rows.filter(r=>r.topic===T1).length;
  const n2 = rows.filter(r=>r.topic===T2).length;
  console.log(`   ${T1}: ${n1} ta`);
  console.log(`   ${T2}: ${n2} ta`);
}

main();
