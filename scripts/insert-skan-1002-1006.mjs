import { createClient } from '@supabase/supabase-js';
const sb = createClient(
  'https://cngkzlkreddsdpjqflsb.supabase.co',
  'sb_publishable_XBtykx-ZbWc1326el4G5SA_JEgpuDOo'
);

// Rule: in JS source \\ → stored as \  (one backslash for LaTeX)
const questions = [
  {
    id: 'skan-1-002',
    text: '\\left[\\left(\\dfrac{7}{9}-\\dfrac{47}{72}\\right):1{,}25+\\dfrac{7}{40}\\right]:(0{,}358-0{,}108)\\cdot1{,}6-\\dfrac{19}{25}',
    answer: '1',
    solution:
      '\\dfrac{7}{9}-\\dfrac{47}{72}=\\dfrac{56}{72}-\\dfrac{47}{72}=\\dfrac{1}{8}. ' +
      '\\dfrac{1}{8}:1{,}25=\\dfrac{1}{10}. ' +
      '\\dfrac{1}{10}+\\dfrac{7}{40}=\\dfrac{11}{40}. ' +
      '(0{,}358-0{,}108)=0{,}25. ' +
      '\\dfrac{11}{40}:0{,}25\\cdot1{,}6=\\dfrac{11}{10}\\cdot\\dfrac{8}{5}=\\dfrac{44}{25}. ' +
      '\\dfrac{44}{25}-\\dfrac{19}{25}=\\dfrac{25}{25}=1.',
  },
  {
    id: 'skan-1-003',
    text: '\\dfrac{\\left(0{,}5:1{,}25+\\dfrac{7}{5}:1\\dfrac{4}{7}-3\\right)\\cdot3}{\\left(1{,}5+\\dfrac{1}{4}\\right):18\\dfrac{1}{3}}',
    answer: '?',
    solution: 'Yechim tekshirilmoqda.',
  },
  {
    id: 'skan-1-004',
    text: '\\left(\\dfrac{(2{,}7-0{,}8)\\cdot2\\dfrac{1}{3}}{(5{,}2-1{,}4):\\dfrac{3}{70}}+0{,}125\\right):2\\dfrac{1}{2}+0{,}43',
    answer: '0,5',
    solution:
      '2{,}7-0{,}8=1{,}9; \\quad 1{,}9\\cdot\\dfrac{7}{3}=\\dfrac{133}{30}. ' +
      '5{,}2-1{,}4=3{,}8; \\quad 3{,}8:\\dfrac{3}{70}=\\dfrac{19}{5}\\cdot\\dfrac{70}{3}=\\dfrac{266}{3}. ' +
      '\\dfrac{133}{30}:\\dfrac{266}{3}=\\dfrac{1}{20}. ' +
      '\\dfrac{1}{20}+0{,}125=\\dfrac{7}{40}. ' +
      '\\dfrac{7}{40}:2{,}5=\\dfrac{7}{100}. ' +
      '\\dfrac{7}{100}+0{,}43=0{,}50=0{,}5.',
  },
  {
    id: 'skan-1-005',
    text: '\\dfrac{2\\dfrac{3}{4}:1{,}1+3\\dfrac{1}{3}:\\dfrac{5}{7}}{2{,}5-0{,}4\\cdot3\\dfrac{1}{3}}-\\dfrac{\\left(2\\dfrac{1}{6}+4{,}5\\right)\\cdot0{,}375}{2{,}75-1\\dfrac{1}{2}}',
    answer: '\\dfrac{29}{7}',
    solution:
      '\\text{Chap kasr, surat: }\\dfrac{11}{4}:\\dfrac{11}{10}+\\dfrac{10}{3}:\\dfrac{5}{7}=\\dfrac{5}{2}+\\dfrac{14}{3}=\\dfrac{43}{6}. ' +
      '\\text{Maxraj: }2{,}5-0{,}4\\cdot\\dfrac{10}{3}=\\dfrac{5}{2}-\\dfrac{4}{3}=\\dfrac{7}{6}. ' +
      '\\dfrac{43/6}{7/6}=\\dfrac{43}{7}. ' +
      '\\text{O\'ng kasr: }\\left(\\dfrac{13}{6}+\\dfrac{27}{6}\\right)\\cdot\\dfrac{3}{8}=\\dfrac{5}{2}; \\quad \\dfrac{5}{2}:\\dfrac{5}{4}=2. ' +
      '\\dfrac{43}{7}-2=\\dfrac{29}{7}.',
  },
  {
    id: 'skan-1-006',
    text: '\\dfrac{\\left(13{,}75+9\\dfrac{1}{6}\\right)\\cdot1{,}2}{\\left(10{,}3-8\\dfrac{1}{2}\\right)\\cdot\\dfrac{5}{9}}+\\dfrac{\\left(6{,}8-3\\dfrac{3}{5}\\right)\\cdot5\\dfrac{5}{6}}{\\left(3\\dfrac{2}{3}-3\\dfrac{1}{6}\\right)\\cdot56}-27\\dfrac{1}{6}',
    answer: '1',
    solution:
      '\\text{Chap kasr: }\\left(\\dfrac{55}{4}+\\dfrac{55}{6}\\right)\\cdot1{,}2=\\dfrac{275}{12}\\cdot\\dfrac{6}{5}=\\dfrac{55}{2}; \\quad \\left(\\dfrac{9}{5}\\right)\\cdot\\dfrac{5}{9}=1. \\quad \\dfrac{55}{2}:1=\\dfrac{55}{2}. ' +
      '\\text{O\'ng kasr: }\\dfrac{16}{5}\\cdot\\dfrac{35}{6}=\\dfrac{56}{3}; \\quad \\dfrac{1}{2}\\cdot56=28. \\quad \\dfrac{56}{3}:28=\\dfrac{2}{3}. ' +
      '\\dfrac{55}{2}+\\dfrac{2}{3}-27\\dfrac{1}{6}=\\dfrac{165}{6}+\\dfrac{4}{6}-\\dfrac{163}{6}=\\dfrac{6}{6}=1.',
  },
];

const common = {
  options: [],
  topic: 'Skanaviy: Algebraik ifodalar',
  difficulty: 'Oson',
  exam_type: ['DTM', 'Milliy Sertifikat', 'Maktab'],
  diagram_svg: null,
};

let ok = 0;
for (const q of questions) {
  await sb.from('questions').delete().eq('id', q.id);
  const { error } = await sb.from('questions').insert({ ...common, ...q });
  if (error) { console.error(`❌ ${q.id}: ${error.message}`); }
  else { console.log(`✅ ${q.id} — javob: ${q.answer}`); ok++; }
}
console.log(`\n🎉 ${ok}/${questions.length} ta masala qo'shildi!`);
