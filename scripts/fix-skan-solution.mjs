import { createClient } from '@supabase/supabase-js';
const sb = createClient(
  'https://cngkzlkreddsdpjqflsb.supabase.co',
  'sb_publishable_XBtykx-ZbWc1326el4G5SA_JEgpuDOo'
);

const { data: q } = await sb.from('questions').select('*').eq('id', 'skan-1-001').single();

// Oddiy vergul bilan - {,} o'rniga faqat ,
const solution =
  'Surat: (7−6,35):6,5+9,9 = 0,65:6,5+9,9 = 0,1+9,9 = 10.' +
  '  Maxraj ichki: ' +
  '\\dfrac{1}{30}+\\dfrac{24}{5}-\\dfrac{21}{16}=\\dfrac{169}{48}.' +
  '  Maxraj: ' +
  '\\dfrac{169}{48}:\\dfrac{169}{24}=\\dfrac{1}{2}.' +
  '  Natija: 10:\\dfrac{1}{2}=20.';

await sb.from('questions').delete().eq('id', 'skan-1-001');
const { error } = await sb.from('questions').insert({ ...q, solution });

if (error) { console.error(error.message); process.exit(1); }
console.log('✅ Yechim to\'g\'irlandi!');
