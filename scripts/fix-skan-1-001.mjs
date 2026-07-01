import { createClient } from '@supabase/supabase-js';
const sb = createClient(
  'https://cngkzlkreddsdpjqflsb.supabase.co',
  'sb_publishable_XBtykx-ZbWc1326el4G5SA_JEgpuDOo'
);

// Backslashni to'g'ri saqlash uchun: har bir \ uchun \\ yozamiz
// JS string da \\ = 1 ta backslash, lekin bazaga yuborilganda yana 1 ta qo'shiladi
// Shuning uchun 4 ta backslash kerak: \\\\ → JS string \\ → baza \
const bs = '\\\\'; // bu baza da bitta \ bo'ladi

const text =
  bs + 'dfrac{(7-6{,}35):6{,}5+9{,}9}{' +
  bs + 'left(1{,}2:36+1{,}2:0{,}25-1' +
  bs + 'dfrac{5}{16}' +
  bs + 'right):' +
  bs + 'dfrac{169}{24}}';

console.log('Yoziladigan matn:', text.slice(0, 60));

await sb.from('questions').delete().eq('id', 'skan-1-001');

const { error } = await sb.from('questions').insert({
  id: 'skan-1-001',
  text,
  options: [],
  answer: '20',
  solution:
    bs + 'text{Surat: }(7-6{,}35):6{,}5+9{,}9=0{,}1+9{,}9=10. ' +
    bs + 'quad' +
    bs + 'text{Maxraj: }' +
    bs + 'dfrac{169}{48}:' +
    bs + 'dfrac{169}{24}=' +
    bs + 'dfrac{1}{2}. ' +
    bs + 'quad' +
    bs + 'text{Natija: }10:' +
    bs + 'dfrac{1}{2}=20',
  topic: 'Skanaviy: Algebraik ifodalar',
  difficulty: 'Oson',
  exam_type: ['DTM', 'Milliy Sertifikat', 'Maktab'],
  diagram_svg: null,
});

if (error) { console.error('Xato:', error.message); process.exit(1); }

// Tekshirish
const { data } = await sb.from('questions').select('text').eq('id', 'skan-1-001').single();
console.log('Bazadagi qiymat:', JSON.stringify(data.text.slice(0, 40)));
console.log('✅ skan-1-001 to\'g\'irlandi!');
