import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';

const sb = createClient(
  'https://cngkzlkreddsdpjqflsb.supabase.co',
  'sb_publishable_XBtykx-ZbWc1326el4G5SA_JEgpuDOo'
);

// ── 1. Matnni o'qish ───────────────────────────────────────────────────────
const raw = readFileSync('pdf-extracted.txt', 'utf8');

// ── 2. Unicode matematika harflarini normal harflarga aylantirish ──────────
function clean(s) {
  return s
    // Unicode italic harflar → oddiy harflar
    .replace(/[\u{1D400}-\u{1D7FF}]/gu, ch => {
      const code = ch.codePointAt(0);
      if(code >= 0x1D41A && code <= 0x1D433) return String.fromCharCode(code - 0x1D41A + 97); // a-z italic
      if(code >= 0x1D400 && code <= 0x1D419) return String.fromCharCode(code - 0x1D400 + 65); // A-Z italic
      return ch;
    })
    .replace(/⋅/g, '·')
    .replace(/̅/g, '')  // combining overline
    .replace(/⏟/g, '')
    .replace(/∈/g, '∈')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

// ── 3. Javoblar kalitini parse qilish ─────────────────────────────────────
const answerKey = {};
const keyMatch = raw.match(/1\.A[\s\S]+?(?=\n---PAGE---|$)/);
if(keyMatch) {
  const keyText = keyMatch[0];
  const pairs = keyText.matchAll(/(\d+)\.([A-E])/g);
  for(const [, num, letter] of pairs) {
    answerKey[parseInt(num)] = letter;
  }
}
console.log(`Javoblar kaliti: ${Object.keys(answerKey).length} ta`);

// ── 4. Mavzu aniqlovchi — savol raqami asosida ─────────────────────────────
function getTopic(questionNum) {
  if(questionNum <= 147) return "Natural sonlar va ular ustida amallar";
  if(questionNum <= 189) return "Bo'linish belgilari, tub va murakkab sonlar";
  if(questionNum <= 234) return "Sonlarni tub ko'paytuvchilarga ajratish, EKUB va EKUK";
  return "Qoldiqli bo'lish. Oxirgi raqam"; // 235–326
}

// ── 5. Savollarni parse qilish ─────────────────────────────────────────────
// Matnni page bo'yicha birlashtirish
const fullText = raw.replace(/---PAGE---/g, ' ');

const questions = [];

// Har bir savol "N. ... A) ... B) ... C) ... D) ..." formatida
// Regex: raqam + nuqta + matn + A) + B) + C) + D)
const qRegex = /(\d+)\.\s+((?:(?!(?:\d+)\.\s).)*?)\s+A\)\s+((?:(?!\s+B\)|\s+C\)|\s+D\)).)*?)\s+B\)\s+((?:(?!\s+C\)|\s+D\)).)*?)\s+C\)\s+((?:(?!\s+D\)).)*?)\s+D\)\s+((?:(?!\s+\d+\.\s).)*)/gs;

let m;
while((m = qRegex.exec(fullText)) !== null) {
  const num = parseInt(m[1]);
  if(num < 1 || num > 350) continue;

  const rawText = m[2];
  // Manba teglari (source labels) ni olib tashlash
  const text = clean(rawText)
    .replace(/^(?:2018-2025-Baza DTM|MS-DTM\(Original\)|MS-DTM\(Origina\)|J\.Saidxonov\(Mocks\)|IDC-Mocks|Rustambek-Mocks|Sayxun-Mocks|Jaloliddin-Mocks)\s*/i, '')
    .trim();

  if(text.length < 5) continue;

  const optA = clean(m[3]);
  const optB = clean(m[4]);
  const optC = clean(m[5]);
  const optD = clean(m[6].split(/\d+\./)[0]); // keyingi savoldan kesish

  const ansLetter = answerKey[num];
  const ansMap = { A: optA, B: optB, C: optC, D: optD };
  const answer = ansLetter ? ansMap[ansLetter] || ansLetter : '';

  // Pozitsiyadan mavzuni aniqlash
  const posInText = fullText.indexOf(m[0]);
  const textBefore = fullText.slice(Math.max(0, posInText - 500), posInText);
  const topic = getTopic(num);

  questions.push({
    id: `ms-${String(num).padStart(3,'0')}`,
    text,
    options: [optA, optB, optC, optD].filter(Boolean),
    answer,
    solution: '',
    topic,
    difficulty: num <= 100 ? "Oson" : num <= 200 ? "O'rtacha" : "Qiyin",
    exam_type: ["Milliy Sertifikat", "DTM"],
    diagram_svg: null,
  });
}

console.log(`Parse qilindi: ${questions.length} ta savol`);

// ── Eski ms- savollarni o'chirish ──────────────────────────────────────────
const oldIds = questions.map(q => q.id);
const { error: delErr } = await sb.from('questions').delete().in('id', oldIds);
if(delErr) console.warn('O\'chirish:', delErr.message);
else console.log('🗑 Eski ms- savollar o\'chirildi');

// Namuna ko'rish
if(questions.length > 0) {
  console.log('\n--- Birinchi 3 ta savol ---');
  questions.slice(0,3).forEach(q => {
    console.log(`#${q.id}: ${q.text.slice(0,60)}...`);
    console.log(`  Javob: ${q.answer} | Mavzu: ${q.topic}`);
  });
}

if(questions.length === 0) {
  console.error('Hech qanday savol topilmadi!');
  process.exit(1);
}

// ── 6. Dublikatlarni olib tashlash ─────────────────────────────────────────
const seen = new Set();
const unique = questions.filter(q => {
  if(seen.has(q.id)) return false;
  seen.add(q.id);
  return true;
});
console.log(`Noyob savollar: ${unique.length} ta (${questions.length - unique.length} ta dublikat olib tashlandi)`);
const finalQ = unique;

// ── 7. Bazaga joylashtirish ────────────────────────────────────────────────
const BATCH = 20;
let total = 0;
for(let i = 0; i < finalQ.length; i += BATCH) {
  const batch = finalQ.slice(i, i + BATCH);
  const { error } = await sb.from('questions').insert(batch);
  if(error) {
    console.error(`Batch ${i} xatosi:`, error.message);
    // Skip duplicates and continue
    if(error.message.includes('duplicate')) continue;
    process.exit(1);
  }
  total += batch.length;
  process.stdout.write(`✅ ${total}/${finalQ.length}\r`);
}
console.log(`\n🎉 ${total} ta Milliy Sertifikat savoli qo'shildi!`);
