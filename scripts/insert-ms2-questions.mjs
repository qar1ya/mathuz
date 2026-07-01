import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';

const sb = createClient(
  'https://cngkzlkreddsdpjqflsb.supabase.co',
  'sb_publishable_XBtykx-ZbWc1326el4G5SA_JEgpuDOo'
);

const raw = readFileSync('pdf2-extracted.txt', 'utf8');

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

// ── Javoblar kaliti ────────────────────────────────────────────────────────
const answerKey = {};
const keyMatch = raw.match(/1\.[A-E][\s\S]+/);
if(keyMatch) {
  for(const [, num, letter] of keyMatch[0].matchAll(/(\d+)\.\s*([A-E])/g)) {
    answerKey[parseInt(num)] = letter;
  }
}
console.log(`Javoblar kaliti: ${Object.keys(answerKey).length} ta`);

// ── Mavzu — savol raqami asosida ──────────────────────────────────────────
// Pages 1-7  (1-140):   Oddiy kasrlar
// Pages 8-11 (141-217): O'nli kasrlar
// Pages 12-14(218-274): Cheksiz davriy o'nli kasrlar
// Pages 15-20(275-371): Daraja xossalari
function getTopic(n) {
  if(n <= 140) return "Oddiy kasrlar va ular ustida amallar";
  if(n <= 217) return "O'nli kasrlar, davriy o'nli kasrlar. Haqiqiy sonlar ustida amallar";
  if(n <= 274) return "O'nli kasrlar, davriy o'nli kasrlar. Haqiqiy sonlar ustida amallar";
  return "Daraja va uning xossalari, darajali ifodalar (1-qism)";
}

// ── Parse ──────────────────────────────────────────────────────────────────
const fullText = raw.replace(/---PAGE---/g, ' ');
const questions = [];
const qRegex = /(\d+)\.\s+((?:(?!(?:\d+)\.\s).)*?)\s+A\)\s+((?:(?!\s+B\)|\s+C\)|\s+D\)).)*?)\s+B\)\s+((?:(?!\s+C\)|\s+D\)).)*?)\s+C\)\s+((?:(?!\s+D\)).)*?)\s+D\)\s+((?:(?!\s+\d+\.\s).)*)/gs;

let m;
while((m = qRegex.exec(fullText)) !== null) {
  const num = parseInt(m[1]);
  if(num < 1 || num > 400) continue;

  const text = clean(m[2])
    .replace(/^(?:2018-2025-Baza DTM(?:\s+Savollari)?|MS-DTM\(Original\)|MS-DTM\(Origina\)|J\.Saidxonov(?:\s+Mocks)?|IDC-Mocks|Rustambek-Mocks|Sayxun-Mocks|Jaloliddin-Mocks|Rustambek-Mock)\s*/i, '')
    .trim();
  if(text.length < 5) continue;

  const optA = clean(m[3]);
  const optB = clean(m[4]);
  const optC = clean(m[5]);
  const optD = clean(m[6].split(/\d+\./)[0]);

  const ansLetter = answerKey[num];
  const ansMap = { A: optA, B: optB, C: optC, D: optD };
  const answer = ansLetter ? (ansMap[ansLetter] || ansLetter) : '';

  questions.push({
    id: `ms2-${String(num).padStart(3,'0')}`,
    text,
    options: [optA, optB, optC, optD].filter(Boolean),
    answer,
    solution: '',
    topic: getTopic(num),
    difficulty: num <= 120 ? "Oson" : num <= 250 ? "O'rtacha" : "Qiyin",
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

// Namuna
unique.slice(0,2).forEach(q => {
  console.log(`#${q.id} [${q.topic.slice(0,30)}]: ${q.text.slice(0,50)}...`);
  console.log(`  Javob: ${q.answer}`);
});

// ── O'chirish va qo'shish ──────────────────────────────────────────────────
const oldIds = unique.map(q => q.id);
const { error: delErr } = await sb.from('questions').delete().in('id', oldIds);
if(delErr) console.warn('O\'chirish:', delErr.message);
else console.log('🗑 Eski ms2- savollar o\'chirildi');

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
