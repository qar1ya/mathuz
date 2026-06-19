import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://cngkzlkreddsdpjqflsb.supabase.co',
  'sb_publishable_XBtykx-ZbWc1326el4G5SA_JEgpuDOo'
);

const { data, error } = await supabase.storage.listBuckets();
if (error) { console.error('Xato:', error.message); process.exit(1); }
console.log('Mavjud bucketlar:', data.length ? data.map(b => b.name) : '(yo\'q)');
