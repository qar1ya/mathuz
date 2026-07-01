import { createClient } from '@supabase/supabase-js';
const sb = createClient(
  'https://cngkzlkreddsdpjqflsb.supabase.co',
  'sb_publishable_XBtykx-ZbWc1326el4G5SA_JEgpuDOo'
);

const fixes = [
  {
    id: 'skan-1-002',
    // Formula to'g'rilandi: (6/7-17/28) qo'shildi
    text: '\\left[\\left(\\dfrac{7}{9}-\\dfrac{47}{72}\\right):1{,}25+\\left(\\dfrac{6}{7}-\\dfrac{17}{28}\\right):(0{,}358-0{,}108)\\right]\\cdot1{,}6-\\dfrac{19}{25}',
    answer: '1',
    solution:
      '1)\\ \\dfrac{7}{9}-\\dfrac{47}{72}=\\dfrac{56-47}{72}=\\dfrac{9}{72}=\\dfrac{1}{8}' +
      '\\ \\ 2)\\ \\dfrac{1}{8}:1{,}25=\\dfrac{1}{8}\\cdot\\dfrac{4}{5}=\\dfrac{1}{10}' +
      '\\ \\ 3)\\ \\dfrac{6}{7}-\\dfrac{17}{28}=\\dfrac{24-17}{28}=\\dfrac{7}{28}=\\dfrac{1}{4}' +
      '\\ \\ 4)\\ 0{,}358-0{,}108=0{,}25=\\dfrac{1}{4}' +
      '\\ \\ 5)\\ \\dfrac{1}{4}:\\dfrac{1}{4}=1' +
      '\\ \\ 6)\\ \\dfrac{1}{10}+1=\\dfrac{11}{10}' +
      '\\ \\ 7)\\ \\dfrac{11}{10}\\cdot1{,}6=\\dfrac{11}{10}\\cdot\\dfrac{8}{5}=\\dfrac{44}{25}' +
      '\\ \\ 8)\\ \\dfrac{44}{25}-\\dfrac{19}{25}=\\dfrac{25}{25}=1',
  },
  {
    id: 'skan-1-003',
    text: '\\dfrac{\\left(0{,}5:1{,}25+\\dfrac{7}{5}:1\\dfrac{4}{7}-\\dfrac{3}{11}\\right)\\cdot3}{\\left(1{,}5+\\dfrac{1}{4}\\right):18\\dfrac{1}{3}}',
    answer: '32',
    solution:
      '1)\\ 0{,}5:1{,}25=\\dfrac{5}{10}:\\dfrac{125}{100}=\\dfrac{5}{10}\\cdot\\dfrac{100}{125}=\\dfrac{2}{5}' +
      '\\ \\ 2)\\ \\dfrac{7}{5}:1\\dfrac{4}{7}=\\dfrac{7}{5}:\\dfrac{11}{7}=\\dfrac{7}{5}\\cdot\\dfrac{7}{11}=\\dfrac{49}{55}' +
      '\\ \\ 3)\\ \\dfrac{2}{5}+\\dfrac{49}{55}=\\dfrac{22+49}{55}=\\dfrac{71}{55}' +
      '\\ \\ 4)\\ \\dfrac{71}{55}-\\dfrac{3}{11}=\\dfrac{71-15}{55}=\\dfrac{56}{55}' +
      '\\ \\ 5)\\ \\dfrac{56}{55}\\cdot3=\\dfrac{168}{55}' +
      '\\ \\ 6)\\ 1{,}5+\\dfrac{1}{4}=\\dfrac{3}{2}+\\dfrac{1}{4}=\\dfrac{7}{4}' +
      '\\ \\ 7)\\ \\dfrac{7}{4}:18\\dfrac{1}{3}=\\dfrac{7}{4}:\\dfrac{55}{3}=\\dfrac{7}{4}\\cdot\\dfrac{3}{55}=\\dfrac{21}{220}' +
      '\\ \\ 8)\\ \\dfrac{168}{55}:\\dfrac{21}{220}=\\dfrac{168}{55}\\cdot\\dfrac{220}{21}=8\\cdot4=32',
  },
  {
    id: 'skan-1-004',
    text: '\\left[\\dfrac{(2{,}7-0{,}8)\\cdot2\\dfrac{1}{3}}{(5{,}2-1{,}4):\\dfrac{3}{70}}+0{,}125\\right]:2\\dfrac{1}{2}+0{,}43',
    answer: '0,5',
    solution:
      '1)\\ 2{,}7-0{,}8=1{,}9' +
      '\\ \\ 2)\\ 1{,}9\\cdot2\\dfrac{1}{3}=\\dfrac{19}{10}\\cdot\\dfrac{7}{3}=\\dfrac{133}{30}' +
      '\\ \\ 3)\\ 5{,}2-1{,}4=3{,}8' +
      '\\ \\ 4)\\ 3{,}8:\\dfrac{3}{70}=\\dfrac{38}{10}\\cdot\\dfrac{70}{3}=\\dfrac{266}{3}' +
      '\\ \\ 5)\\ \\dfrac{133}{30}:\\dfrac{266}{3}=\\dfrac{133}{30}\\cdot\\dfrac{3}{266}=\\dfrac{1}{20}' +
      '\\ \\ 6)\\ \\dfrac{1}{20}+0{,}125=\\dfrac{1}{20}+\\dfrac{1}{8}=\\dfrac{2+5}{40}=\\dfrac{7}{40}' +
      '\\ \\ 7)\\ \\dfrac{7}{40}:2\\dfrac{1}{2}=\\dfrac{7}{40}:\\dfrac{5}{2}=\\dfrac{7}{40}\\cdot\\dfrac{2}{5}=\\dfrac{7}{100}' +
      '\\ \\ 8)\\ \\dfrac{7}{100}+0{,}43=\\dfrac{7}{100}+\\dfrac{43}{100}=\\dfrac{50}{100}=\\dfrac{1}{2}=0{,}5',
  },
  {
    id: 'skan-1-005',
    text: '\\dfrac{2\\dfrac{3}{4}:1{,}1+3\\dfrac{1}{3}}{2{,}5-0{,}4\\cdot3\\dfrac{1}{3}}:\\dfrac{5}{7}-\\dfrac{\\left(2\\dfrac{1}{6}+4{,}5\\right)\\cdot0{,}375}{2{,}75-1\\dfrac{1}{2}}',
    answer: '5',
    solution:
      '1)\\ 2\\dfrac{3}{4}:1{,}1=\\dfrac{11}{4}\\cdot\\dfrac{10}{11}=\\dfrac{5}{2}' +
      '\\ \\ 2)\\ \\dfrac{5}{2}+3\\dfrac{1}{3}=\\dfrac{5}{2}+\\dfrac{10}{3}=\\dfrac{15+20}{6}=\\dfrac{35}{6}' +
      '\\ \\ 3)\\ 0{,}4\\cdot3\\dfrac{1}{3}=\\dfrac{4}{10}\\cdot\\dfrac{10}{3}=\\dfrac{4}{3}' +
      '\\ \\ 4)\\ 2{,}5-\\dfrac{4}{3}=\\dfrac{5}{2}-\\dfrac{4}{3}=\\dfrac{15-8}{6}=\\dfrac{7}{6}' +
      '\\ \\ 5)\\ \\dfrac{35}{6}:\\dfrac{7}{6}=\\dfrac{35}{6}\\cdot\\dfrac{6}{7}=5' +
      '\\ \\ 6)\\ 5:\\dfrac{5}{7}=5\\cdot\\dfrac{7}{5}=7' +
      '\\ \\ 7)\\ 2\\dfrac{1}{6}+4{,}5=\\dfrac{13}{6}+\\dfrac{9}{2}=\\dfrac{13+27}{6}=\\dfrac{40}{6}=\\dfrac{20}{3}' +
      '\\ \\ 8)\\ \\dfrac{20}{3}\\cdot0{,}375=\\dfrac{20}{3}\\cdot\\dfrac{3}{8}=\\dfrac{5}{2}' +
      '\\ \\ 9)\\ 2{,}75-1\\dfrac{1}{2}=\\dfrac{11}{4}-\\dfrac{3}{2}=\\dfrac{11-6}{4}=\\dfrac{5}{4}' +
      '\\ \\ 10)\\ \\dfrac{5}{2}:\\dfrac{5}{4}=\\dfrac{5}{2}\\cdot\\dfrac{4}{5}=2' +
      '\\ \\ 11)\\ 7-2=5',
  },
  {
    id: 'skan-1-006',
    text: '\\dfrac{\\left(13{,}75+9\\dfrac{1}{6}\\right)\\cdot1{,}2}{\\left(10{,}3-8\\dfrac{1}{2}\\right)\\cdot\\dfrac{5}{9}}+\\dfrac{\\left(6{,}8-3\\dfrac{3}{5}\\right)\\cdot5\\dfrac{5}{6}}{\\left(3\\dfrac{2}{3}-3\\dfrac{1}{6}\\right)\\cdot56}-27\\dfrac{1}{6}',
    answer: '1',
    solution:
      '1)\\ 13{,}75+9\\dfrac{1}{6}=13\\dfrac{3}{4}+9\\dfrac{1}{6}=\\dfrac{55}{4}+\\dfrac{55}{6}=\\dfrac{165+110}{12}=\\dfrac{275}{12}' +
      '\\ \\ 2)\\ \\dfrac{275}{12}\\cdot1{,}2=\\dfrac{275}{12}\\cdot\\dfrac{12}{10}=\\dfrac{55}{2}' +
      '\\ \\ 3)\\ 10{,}3-8\\dfrac{1}{2}=10{,}3-8{,}5=1{,}8' +
      '\\ \\ 4)\\ 1{,}8\\cdot\\dfrac{5}{9}=\\dfrac{18}{10}\\cdot\\dfrac{5}{9}=\\dfrac{2}{2}=1' +
      '\\ \\ 5)\\ \\dfrac{55}{2}:1=\\dfrac{55}{2}' +
      '\\ \\ 6)\\ 6{,}8-3\\dfrac{3}{5}=6{,}8-3{,}6=3{,}2' +
      '\\ \\ 7)\\ 3{,}2\\cdot5\\dfrac{5}{6}=\\dfrac{32}{10}\\cdot\\dfrac{35}{6}=\\dfrac{16\\cdot7}{2\\cdot3}=\\dfrac{56}{3}' +
      '\\ \\ 8)\\ 3\\dfrac{2}{3}-3\\dfrac{1}{6}=\\dfrac{2}{3}-\\dfrac{1}{6}=\\dfrac{4-1}{6}=\\dfrac{3}{6}=\\dfrac{1}{2}' +
      '\\ \\ 9)\\ \\dfrac{1}{2}\\cdot56=28' +
      '\\ \\ 10)\\ \\dfrac{56}{3}:28=\\dfrac{56}{3}\\cdot\\dfrac{1}{28}=\\dfrac{2}{3}' +
      '\\ \\ 11)\\ \\dfrac{55}{2}+\\dfrac{2}{3}=\\dfrac{165+4}{6}=\\dfrac{169}{6}' +
      '\\ \\ 12)\\ \\dfrac{169}{6}-27\\dfrac{1}{6}=\\dfrac{169}{6}-\\dfrac{163}{6}=\\dfrac{6}{6}=1',
  },
];

for (const fix of fixes) {
  const { data: old } = await sb.from('questions').select('*').eq('id', fix.id).single();
  if (!old) { console.log('Topilmadi:', fix.id); continue; }
  await sb.from('questions').delete().eq('id', fix.id);
  const { error } = await sb.from('questions').insert({ ...old, ...fix });
  if (error) console.error(`❌ ${fix.id}: ${error.message}`);
  else console.log(`✅ ${fix.id} — javob: ${fix.answer}`);
}
console.log('\n🎉 Barcha yechimlar yangilandi!');
