import { createClient } from '@supabase/supabase-js';
const sb = createClient(
  'https://cngkzlkreddsdpjqflsb.supabase.co',
  'sb_publishable_XBtykx-ZbWc1326el4G5SA_JEgpuDOo'
);

// 1 backslash JS string = bazada 1 backslash (KaTeX uchun to'g'ri)
// JS source da \\ = JS string da \ (bir ta)

await sb.from('questions').delete().eq('id', 'skan-1-001');

const { error } = await sb.from('questions').insert({
  id: 'skan-1-001',
  // \\ in source = \ in string = 1 backslash stored
  text: '\\dfrac{(7-6{,}35):6{,}5+9{,}9}{\\left(1{,}2:36+1{,}2:0{,}25-1\\dfrac{5}{16}\\right):\\dfrac{169}{24}}',
  options: [],
  answer: '20',
  solution: '\\text{Surat: }(7{-}6{,}35):6{,}5+9{,}9=0{,}1+9{,}9=10. \\quad \\text{Maxraj ichki: }\\dfrac{1}{30}+\\dfrac{24}{5}-\\dfrac{21}{16}=\\dfrac{169}{48}. \\quad \\text{Maxraj: }\\dfrac{169}{48}:\\dfrac{169}{24}=\\dfrac{1}{2}. \\quad \\text{Natija: }10:\\dfrac{1}{2}=20',
  topic: 'Skanaviy: Algebraik ifodalar',
  difficulty: 'Oson',
  exam_type: ['DTM', 'Milliy Sertifikat', 'Maktab'],
  diagram_svg: null,
});

if (error) { console.error('Xato:', error.message); process.exit(1); }

const { data } = await sb.from('questions').select('text').eq('id', 'skan-1-001').single();
const backslashes = data.text.split('').filter(c => c === '\\').length;
console.log('Bazadagi backslash soni:', backslashes, '(kerak: 5)');
console.log('Bazadagi matn:', data.text.slice(0, 50));

if (backslashes === 5) {
  console.log('✅ To\'g\'ri! KaTeX render qiladi.');
} else {
  console.log('❌ Hali ham xato. Backslash soni mos kelmadi.');
}
