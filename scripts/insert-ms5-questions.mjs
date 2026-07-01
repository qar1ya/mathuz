import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';

const sb = createClient(
  'https://cngkzlkreddsdpjqflsb.supabase.co',
  'sb_publishable_XBtykx-ZbWc1326el4G5SA_JEgpuDOo'
);

const raw = readFileSync('pdf5-extracted.txt', 'utf8');

function clean(s) {
  return s
    .replace(/[\u{1D400}-\u{1D7FF}]/gu, ch => {
      const code = ch.codePointAt(0);
      if(code >= 0x1D41A && code <= 0x1D433) return String.fromCharCode(code - 0x1D41A + 97);
      if(code >= 0x1D400 && code <= 0x1D419) return String.fromCharCode(code - 0x1D400 + 65);
      return ch;
    })
    .replace(/⋅/g,'·').replace(/̅/g,'').replace(/⏟/g,'')
    .replace(/\s{2,}/g,' ').trim();
}

// ── Javoblar kaliti (bet 57-58: 1-986) ────────────────────────────────────
const pages = raw.split('---PAGE---');
const keyText = (pages[56]||'') + (pages[57]||'');
const answerKey = {};
for(const [,num,letter] of keyText.matchAll(/(\d+)\.\s*([A-E])/g)) {
  answerKey[parseInt(num)] = letter;
}
console.log(`Javoblar kaliti: ${Object.keys(answerKey).length} ta`);

// ── Mavzu (bet asosida) ────────────────────────────────────────────────────
// Bet 1-3   (1-57):    Birhadlar va ko'phadlar
// Bet 4-6   (58-114):  Qisqa ko'paytirish formulalari
// Bet 7-8   (115-150): Ko'paytuvchilarga ajratish
// Bet 9-23  (151-418): Algebraik kasrlar
// Bet 24    (419-437): Sonning moduli
// Bet 25-40 (438-707): Kvadrat ildiz
// Bet 41-46 (708-811): Ildizli ifodalar
// Bet 47-56 (812-986): Ratsional daraja
function getTopic(n) {
  if(n <= 57)  return "Ko'phadlar va ular ustida amallar";
  if(n <= 114) return "Qisqa ko'paytirish formulalari (1-qism)";
  if(n <= 150) return "Ko'paytuvchilarga ajratish (1-qism)";
  if(n <= 418) return "Algebraik kasrlar (1-qism)";
  if(n <= 437) return "Ratsional sonlar va ular ustida amallar";
  if(n <= 707) return "Arifmetik kvadrat ildiz va uning xossalari";
  if(n <= 811) return "Ildizli ifodalar";
  return "Daraja va uning xossalari, darajali ifodalar (2-qism)";
}

// ── Parse ──────────────────────────────────────────────────────────────────
const fullText = raw.replace(/---PAGE---/g,' ');
const questions = [];
const qRegex = /(\d+)\.\s+((?:(?!(?:\d+)\.\s).)*?)\s+A\)\s+((?:(?!\s+B\)|\s+C\)|\s+D\)).)*?)\s+B\)\s+((?:(?!\s+C\)|\s+D\)).)*?)\s+C\)\s+((?:(?!\s+D\)).)*?)\s+D\)\s+((?:(?!\s+\d+\.\s).)*)/gs;

let m;
while((m = qRegex.exec(fullText)) !== null) {
  const num = parseInt(m[1]);
  if(num < 1 || num > 990) continue;

  const text = clean(m[2])
    .replace(/^(?:2018-2025-Baza DTM(?:\s+Savollari)?|MS-DTM\(Original[i]?\)|J\.Saidxonov(?:\s+Mocks)?|IDC-Mocks|Rustambek-Mocks|Sayxun-Mocks|Jaloliddin-Mocks)\s*/i,'')
    .replace(/^(?:BIRHADLAR[^.]*|QISQA KO'PAYTIRISH[^.]*|KO'PAYTUVCHILARGA[^.]*|ALGEBRAIK KASRLAR[^.]*|KVADRAT ILDIZ[^.]*|ILDIZLI[^.]*|RATSIONAL[^.]*)\s*/i,'')
    .trim();

  if(text.length < 5) continue;

  const optA = clean(m[3]);
  const optB = clean(m[4]);
  const optC = clean(m[5]);
  const optD = clean(m[6].split(/\d+\./)[0]);

  const ansLetter = answerKey[num];
  const ansMap = {A:optA,B:optB,C:optC,D:optD};

  questions.push({
    id: `ms5-${String(num).padStart(3,'0')}`,
    text,
    options: [optA,optB,optC,optD].filter(Boolean),
    answer: ansLetter ? (ansMap[ansLetter]||ansLetter) : '',
    solution: '',
    topic: getTopic(num),
    difficulty: num<=300 ? "Oson" : num<=650 ? "O'rtacha" : "Qiyin",
    exam_type: ["Milliy Sertifikat","DTM"],
    diagram_svg: null,
  });
}

const seen = new Set();
const unique = questions.filter(q=>{ if(seen.has(q.id)) return false; seen.add(q.id); return true; });
console.log(`Parse: ${questions.length} ta → Noyob: ${unique.length} ta`);

unique.slice(0,3).forEach(q=>{
  console.log(`#${q.id} [${q.topic.slice(0,25)}]: ${q.text.slice(0,50)}`);
  console.log(`  Javob: ${q.answer}`);
});

if(unique.length===0){ console.error('Savol topilmadi!'); process.exit(1); }

// ── O'chirish va qo'shish ──────────────────────────────────────────────────
const {error:delErr} = await sb.from('questions').delete().in('id', unique.map(q=>q.id));
if(delErr) console.warn('O\'chirish:', delErr.message);
else console.log('🗑 Eski ms5- savollar o\'chirildi');

const BATCH=20; let total=0;
for(let i=0; i<unique.length; i+=BATCH){
  const batch=unique.slice(i,i+BATCH);
  const {error}=await sb.from('questions').insert(batch);
  if(error){ console.error(`Batch ${i}:`,error.message); process.exit(1); }
  total+=batch.length;
  process.stdout.write(`✅ ${total}/${unique.length}\r`);
}
console.log(`\n🎉 ${total} ta savol qo'shildi!`);

// Yakuniy holat
const {data:all}=await sb.from('questions').select('topic');
const counts={};
all.forEach(r=>counts[r.topic]=(counts[r.topic]||0)+1);
console.log('\n--- Bazadagi holat ---');
Object.entries(counts).sort((a,b)=>b[1]-a[1]).forEach(([t,n])=>console.log(n+' ta |',t));
console.log('Jami:', all.length);
