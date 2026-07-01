import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';

const sb = createClient(
  'https://cngkzlkreddsdpjqflsb.supabase.co',
  'sb_publishable_XBtykx-ZbWc1326el4G5SA_JEgpuDOo'
);

const raw = readFileSync('pdf3-extracted.txt', 'utf8');

function clean(s) {
  return s
    .replace(/[\u{1D400}-\u{1D7FF}]/gu, ch => {
      const code = ch.codePointAt(0);
      if(code >= 0x1D41A && code <= 0x1D433) return String.fromCharCode(code - 0x1D41A + 97);
      if(code >= 0x1D400 && code <= 0x1D419) return String.fromCharCode(code - 0x1D400 + 65);
      return ch;
    })
    .replace(/⋅/g, '·').replace(/̅/g, '').replace(/⏟/g, '')
    .replace(/\s{2,}/g, ' ').trim();
}

// ── Javoblar kaliti (KITOB 4: 1-552) ──────────────────────────────────────
const answerKey = {};
const keyMatch = raw.match(/1\.C\s+2\.B[\s\S]+/);
if(keyMatch) {
  for(const [, num, letter] of keyMatch[0].matchAll(/(\d+)\.\s*([A-E])/g)) {
    answerKey[parseInt(num)] = letter;
  }
}
console.log(`Javoblar kaliti: ${Object.keys(answerKey).length} ta`);

// ── Mavzu xaritalash (KITOB 4 raqam asosida) ──────────────────────────────
// Pages 11-13  (1-45):   Sodda mushohada
// Pages 14-16  (46-107): O'rta qiymatlar, nisbat, proporsiya
// Pages 17-20  (108-176):Tenglamalar sistemasi masalalar
// Pages 21-30  (177-359):Foizga doir masalalar
// Pages 31-33  (360-410):Aralashmaga doir masalalar
// Pages 34-38  (411-485):Ishga doir masalalar
// Pages 39-43  (486-552):Harakatga doir masalalar
function getTopic(n) {
  if(n <= 45)  return "Tenglama va tenglamalar sistemasi orqali yechiladigan matnli masalalar";
  if(n <= 107) return "Nisbat, proporsiya, qism va foiz";
  if(n <= 176) return "Tenglama va tenglamalar sistemasi orqali yechiladigan matnli masalalar";
  if(n <= 359) return "Nisbat, proporsiya, qism va foiz";
  if(n <= 410) return "Tenglama va tenglamalar sistemasi orqali yechiladigan matnli masalalar";
  if(n <= 485) return "Tenglama va tenglamalar sistemasi orqali yechiladigan matnli masalalar";
  return "Tenglama va tenglamalar sistemasi orqali yechiladigan matnli masalalar";
}

// ── Parse (keng regex — manba belgisi bo'lmasligi ham mumkin) ──────────────
const fullText = raw.replace(/---PAGE---/g, ' ');

// KITOB 4 content starts from page 11 (after "JAVOBLAR" header for kitob 3)
// Find the start of KITOB 4
const kitob4Start = fullText.indexOf('SODDA MUSHOHADA');
const kitob4Text = kitob4Start > 0 ? fullText.slice(kitob4Start) : fullText;

const questions = [];
const qRegex = /(\d+)\.\s+((?:(?!(?:\d+)\.\s).)*?)\s+A\)\s+((?:(?!\s+B\)|\s+C\)|\s+D\)).)*?)\s+B\)\s+((?:(?!\s+C\)|\s+D\)).)*?)\s+C\)\s+((?:(?!\s+D\)).)*?)\s+D\)\s+((?:(?!\s+\d+\.\s).)*)/gs;

let m;
while((m = qRegex.exec(kitob4Text)) !== null) {
  const num = parseInt(m[1]);
  if(num < 1 || num > 560) continue;

  const rawText = clean(m[2]);
  // Remove source labels
  const text = rawText
    .replace(/^(?:2018-2025-Baza DTM(?:\s+Savollari)?|MS-DTM\(Original[i]?\)|J\.Saidxonov(?:\s+Mocks)?|IDC-Mocks|Rustambek-Mocks|Sayxun-Mocks|Jaloliddin-Mocks|SODDA MUSHOHADA|O'RTA QIYMATLAR[^.]*|FOIZGA DOIR[^.]*|ARALASHMAGA[^.]*|ISHGA DOIR[^.]*|HARAKATGA DOIR[^.]*)\s*/i, '')
    .trim();

  if(text.length < 8) continue;

  const optA = clean(m[3]);
  const optB = clean(m[4]);
  const optC = clean(m[5]);
  const optD = clean(m[6].split(/\d+\./)[0]);

  const ansLetter = answerKey[num];
  const ansMap = { A: optA, B: optB, C: optC, D: optD };
  const answer = ansLetter ? (ansMap[ansLetter] || ansLetter) : '';

  questions.push({
    id: `ms3-${String(num).padStart(3,'0')}`,
    text,
    options: [optA, optB, optC, optD].filter(Boolean),
    answer,
    solution: '',
    topic: getTopic(num),
    difficulty: num <= 180 ? "Oson" : num <= 380 ? "O'rtacha" : "Qiyin",
    exam_type: ["Milliy Sertifikat", "DTM"],
    diagram_svg: null,
  });
}

console.log(`Parse qilindi: ${questions.length} ta savol`);

// Deduplicate
const seen = new Set();
const unique = questions.filter(q => {
  if(seen.has(q.id)) return false;
  seen.add(q.id); return true;
});
console.log(`Noyob: ${unique.length} ta`);

// Sample check
unique.slice(0,3).forEach(q => {
  console.log(`#${q.id} [${q.topic.slice(0,30)}]: ${q.text.slice(0,55)}`);
  console.log(`  Javob: ${q.answer}`);
});

if(unique.length === 0) { console.error('Hech qanday savol topilmadi!'); process.exit(1); }

// ── O'chirish va qo'shish ──────────────────────────────────────────────────
const { error: delErr } = await sb.from('questions').delete().in('id', unique.map(q=>q.id));
if(delErr) console.warn('O\'chirish:', delErr.message);
else console.log('🗑 Eski ms3- savollar o\'chirildi');

const BATCH = 20;
let total = 0;
for(let i = 0; i < unique.length; i += BATCH) {
  const batch = unique.slice(i, i + BATCH);
  const { error } = await sb.from('questions').insert(batch);
  if(error) { console.error(`Batch ${i}:`, error.message); process.exit(1); }
  total += batch.length;
  process.stdout.write(`✅ ${total}/${unique.length}\r`);
}
console.log(`\n🎉 ${total} ta savol qo'shildi!`);

// Yakuniy holat
const { data: all } = await sb.from('questions').select('topic');
const counts = {};
all.forEach(r => counts[r.topic] = (counts[r.topic]||0)+1);
console.log('\n--- Bazadagi holat ---');
Object.entries(counts).sort((a,b)=>b[1]-a[1]).forEach(([t,n])=>console.log(n+' ta |', t));
console.log('Jami:', all.length);
