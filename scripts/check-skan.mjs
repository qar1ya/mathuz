import { createClient } from '@supabase/supabase-js';
const sb = createClient(
  'https://cngkzlkreddsdpjqflsb.supabase.co',
  'sb_publishable_XBtykx-ZbWc1326el4G5SA_JEgpuDOo'
);

const { data } = await sb.from('questions').select('text').eq('id', 'skan-1-001').single();
const t = data.text;
const slashes = t.split('').filter(c => c === '\\').length;
console.log('Backslash soni:', slashes);
console.log('Birinchi 40 belgi:', t.slice(0, 40));

// KaTeX uchun kerakli qiymat: \dfrac{...}{...}
// Agar 2 ta backslash bo'lsa, bitta qoldirishimiz kerak
// Admin paneldan kiritganda qanday yoziladi?
console.log('\nAdmin paneldan yozish uchun (1 ta backslash):');
console.log('\\dfrac{a}{b} → bazada qanday saqlanadi?');

// Test: 1 backslash bilan nima bo'ladi
await sb.from('questions').delete().eq('id', 'test-1bs');
await sb.from('questions').insert({
  id: 'test-1bs',
  text: '\\dfrac{1}{2}',  // 1 backslash in JS string
  options: [], answer: 'test', solution: '',
  topic: 'test', difficulty: 'Oson', exam_type: ['DTM'], diagram_svg: null
});
const { data: d1 } = await sb.from('questions').select('text').eq('id', 'test-1bs').single();
console.log('\n1 backslash JS → bazada:', JSON.stringify(d1.text));

// Test: 2 backslash bilan
await sb.from('questions').delete().eq('id', 'test-2bs');
await sb.from('questions').insert({
  id: 'test-2bs',
  text: '\\\\dfrac{1}{2}',  // 2 backslashes in JS string
  options: [], answer: 'test', solution: '',
  topic: 'test', difficulty: 'Oson', exam_type: ['DTM'], diagram_svg: null
});
const { data: d2 } = await sb.from('questions').select('text').eq('id', 'test-2bs').single();
console.log('2 backslash JS → bazada:', JSON.stringify(d2.text));

// Cleanup
await sb.from('questions').delete().in('id', ['test-1bs', 'test-2bs']);
