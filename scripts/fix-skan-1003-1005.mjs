import { createClient } from '@supabase/supabase-js';
const sb = createClient(
  'https://cngkzlkreddsdpjqflsb.supabase.co',
  'sb_publishable_XBtykx-ZbWc1326el4G5SA_JEgpuDOo'
);

const fixes = [
  {
    id: 'skan-1-003',
    // To'g'ri formula: 7/5 : 1(4/7) - 3/11 — bu yerda 1(4/7) = aralash son 1 to'rt yettinchi
    text: '\\dfrac{\\left(0{,}5:1{,}25+\\dfrac{7}{5}:1\\dfrac{4}{7}-\\dfrac{3}{11}\\right)\\cdot3}{\\left(1{,}5+\\dfrac{1}{4}\\right):18\\dfrac{1}{3}}',
    answer: '32',
    solution:
      '0{,}5:1{,}25=\\dfrac{2}{5}. \\quad ' +
      '\\dfrac{7}{5}:1\\dfrac{4}{7}=\\dfrac{7}{5}:\\dfrac{11}{7}=\\dfrac{49}{55}. \\quad ' +
      '\\dfrac{2}{5}+\\dfrac{49}{55}-\\dfrac{3}{11}=\\dfrac{22+49-15}{55}=\\dfrac{56}{55}. \\quad ' +
      '\\dfrac{56}{55}\\cdot3=\\dfrac{168}{55}. \\quad ' +
      '\\text{Maxraj: }\\left(\\dfrac{3}{2}+\\dfrac{1}{4}\\right):\\dfrac{55}{3}=\\dfrac{7}{4}\\cdot\\dfrac{3}{55}=\\dfrac{21}{220}. \\quad ' +
      '\\dfrac{168}{55}:\\dfrac{21}{220}=\\dfrac{168}{55}\\cdot\\dfrac{220}{21}=\\dfrac{168\\cdot4}{21}=32.',
  },
  {
    id: 'skan-1-005',
    // To'g'ri formula: (2¾:1,1 + 3⅓)/(2,5-0,4·3⅓) : 5/7  minus  (2⅙+4,5)·0,375/(2,75-1½)
    text: '\\dfrac{2\\dfrac{3}{4}:1{,}1+3\\dfrac{1}{3}}{2{,}5-0{,}4\\cdot3\\dfrac{1}{3}}:\\dfrac{5}{7}-\\dfrac{\\left(2\\dfrac{1}{6}+4{,}5\\right)\\cdot0{,}375}{2{,}75-1\\dfrac{1}{2}}',
    answer: '5',
    solution:
      '\\text{Sol kasr, surat: }\\dfrac{11}{4}:\\dfrac{11}{10}+\\dfrac{10}{3}=\\dfrac{5}{2}+\\dfrac{10}{3}=\\dfrac{35}{6}. \\quad ' +
      '\\text{Maxraj: }\\dfrac{5}{2}-\\dfrac{4}{3}=\\dfrac{7}{6}. \\quad ' +
      '\\dfrac{35}{6}:\\dfrac{7}{6}=5. \\quad 5:\\dfrac{5}{7}=7. \\quad ' +
      "\\text{O'ng kasr: }\\left(\\dfrac{13}{6}+\\dfrac{27}{6}\\right)\\cdot\\dfrac{3}{8}=\\dfrac{5}{2}. \\quad " +
      '\\dfrac{5}{2}:\\dfrac{5}{4}=2. \\quad 7-2=5.',
  },
];

for (const fix of fixes) {
  const { data: old } = await sb.from('questions').select('*').eq('id', fix.id).single();
  if (!old) { console.log('Topilmadi:', fix.id); continue; }

  await sb.from('questions').delete().eq('id', fix.id);
  const { error } = await sb.from('questions').insert({
    ...old,
    text: fix.text,
    answer: fix.answer,
    solution: fix.solution,
  });
  if (error) console.error(`❌ ${fix.id}: ${error.message}`);
  else console.log(`✅ ${fix.id} — javob: ${fix.answer}`);
}
console.log('\n🎉 To\'g\'irlandi!');
