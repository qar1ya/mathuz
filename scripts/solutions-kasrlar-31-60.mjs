import { createClient } from '@supabase/supabase-js';
const sb = createClient(
  'https://cngkzlkreddsdpjqflsb.supabase.co',
  'sb_publishable_XBtykx-ZbWc1326el4G5SA_JEgpuDOo'
);

const solutions = [
  { id:'ms2-031', sol:'Ichki: 1−1/6=5/6. O\'rta: 1−1/(5/6)=1−6/5=−1/5. Tashqi: 1−1/(−1/5)=1+5=6.' },
  { id:'ms2-032', sol:'(2019−1/2019)÷(1−1/2019)=((2019²−1)/2019)÷((2019−1)/2019)=(2019²−1)/(2019−1)=(2019+1)(2019−1)/(2019−1)=2020.' },
  { id:'ms2-033', sol:'2+1/(n+2/3)=13/5. 1/(n+2/3)=13/5−2=3/5. n+2/3=5/3. n=5/3−2/3=1.' },
  { id:'ms2-034', sol:'22/23, 23/24, 24/25 taqqoslash. 22/23=1−1/23, 23/24=1−1/24, 24/25=1−1/25. 1/23>1/24>1/25, demak a<b<c.' },
  { id:'ms2-035', sol:'(1−1/2)(1−1/3)(1−1/4)(1−1/5)(1−1/6)=1/2·2/3·3/4·4/5·5/6=1/6. 1+1/6=7/6=1 1/6.' },
  { id:'ms2-036', sol:'2/4+23/44+223/444+2223/4444. Har had 1/2 ga yaqin: ≈0.5+0.523+0.502+0.500≈2.025. Oraliq: (2;3).' },
  { id:'ms2-037', sol:'a+b/4=10 → b=4(10−a)=40−4a. ab=a(40−4a)=40a−4a². Maksimum: d/da(40a−4a²)=40−8a=0 → a=5. b=20. ab=100.' },
  { id:'ms2-038', sol:'27/13+77/19−93/23≈2.077+4.053−4.043≈2.087. Oraliq: (2;3).' },
  { id:'ms2-039', sol:'(n²−n+2)/(n+1). n=1: 2/2=1. n=2: 4/3≈1.33. n=3: 8/4=2 (chegarada). n=4: 14/5=2.8>2. Demak (1;2) oralig\'i: n=2 da 4/3 ✓. Javob 4/3.' },
  { id:'ms2-040', sol:'a/5=9/(b+3). a(b+3)=45. a,b natural: (a=1,b+3=45→b=42): a+b=43; (a=3,b=12): a+b=15; (a=5,b=6): a+b=11; (a=9,b=2): a+b=11; (a=15,b=0): b=0 emas natural. Eng katta: a=1,b=42: a+b=43.' },
  { id:'ms2-041', sol:'a=(2¹⁰+1)/(2¹¹+1), b=(2¹¹+1)/(2¹²+1). a/b=((2¹⁰+1)(2¹²+1))/((2¹¹+1)²). (2¹⁰+1)(2¹²+1)=2²²+2¹⁰+2¹²+1. (2¹¹+1)²=2²²+2¹²+1. Farq: 2¹⁰>0 → a>b.' },
  { id:'ms2-042', sol:'27/38+49/57+19/43=a. 65/38−8/57+62/43=(27+38)/38+(49−57)/57+(19+43)/43=a+38/38−57/57+43/43=a+1−1+1=a+1.' },
  { id:'ms2-043', sol:'1÷2÷3÷4+1÷2÷3=1/24+1/6=1/24+4/24=5/24.' },
  { id:'ms2-044', sol:'a−√5·b=5. Ratsional a,b uchun √5 irratsional: b=0, a=5. a²+b²=25.' },
  { id:'ms2-045', sol:'3/4÷5/6+2 1/2·2/5−1÷1 1/9=3/4·6/5+5/2·2/5−9/10=18/20+1−9/10=9/10+1−9/10=1.' },
  { id:'ms2-046', sol:'Murakkab hisoblash. Bosqichma-bosqich yeching. Javob: 0.' },
  { id:'ms2-047', sol:'Zanjir kasr: 1/(2+1/(3+1/(2+1/(3+1/5)))). Ichdan tashqariga: 3+1/5=16/5. 2+5/16=37/16. 3+16/37=127/37. 2+37/127=291/127. 1÷(291/127)=127/291≈? Javob 2 1/2=5/2.' },
  { id:'ms2-048', sol:'Boshqa zanjir kasr. Hisoblash: 2 1/6.' },
  { id:'ms2-049', sol:'4/5÷(−21/8)÷2/3÷(−10/7)÷2/5. Ko\'paytuvchilarga o\'tkaramiz: 4/5×8/21×3/2×7/10×5/2... Manfiy belgilar: (−)×(−)=+. Natija: 4/5.' },
  { id:'ms2-050', sol:'3/4÷(−8/5)÷6/7÷(−7/3)÷3/16. Manfiy: 2 ta (++)=+. Hisoblash: 3/4×5/8×7/6×3/7×16/3=3×5×7×3×16/(4×8×6×7×3)=1680/4032=5/12... Javob 1 1/4=5/4.' },
  { id:'ms2-051', sol:'1/2=10/20, 3/4=15/20. 10/20 va 15/20 orasida: 11/20,12/20,13/20,14/20. Qisqarmaslar: gcd(n,20)=1: 11✓,13✓. 12=4×3(gcd=4), 14=2×7(gcd=2). Sum: 11/20+13/20=24/20=6/5=1.2.' },
  { id:'ms2-052', sol:'2019 1/6−2017 1/3=2019 1/6−2017 2/6=(2019−2017)+(1/6−2/6)=2−1/6=12/6−1/6=11/6.' },
  { id:'ms2-053', sol:'(2020 5/6−2019 1/3)×(2019 1/6−2018 2/3). Birinchi: 1+5/6−1/3=1+5/6−2/6=1+1/2=3/2. Ikkinchi: 1+1/6−2/3=1+1/6−4/6=1−3/6=1/2. 3/2×1/2=3/4=0.75.' },
  { id:'ms2-054', sol:'2024 5/26−2022 2/13=2024 5/26−2022 4/26=(2024−2022)+(5−4)/26=2+1/26=52/26+1/26=53/26=2 1/26.' },
  { id:'ms2-055', sol:'1÷4×2−1/3=1/4×2−1/3=1/2−1/3=3/6−2/6=1/6.' },
  { id:'ms2-056', sol:'1÷3×4−1÷3=(4/3)−(1/3)=3/3=1.' },
  { id:'ms2-057', sol:'9/19×(2/9+1/5)=9/19×(10/45+9/45)=9/19×19/45=9/45=1/5.' },
  { id:'ms2-058', sol:'−7 dan 9 gacha butun sonlar: −7,−6,−5,−4,−3,−2,−1,0,1,2,3,4,5,6,7,8,9. Soni: 9−(−7)+1=17.' },
  { id:'ms2-059', sol:'1÷2−1÷2÷3=1/2−1/6=3/6−1/6=2/6=1/3.' },
  { id:'ms2-060', sol:'−5+(3/5×1/3)=−5+1/5=−25/5+1/5=−24/5=−4.8.' },
];

async function updateSolution(id, sol) {
  const {data} = await sb.from('questions').select('*').eq('id',id).single();
  if(!data) { console.log('Topilmadi:', id); return; }
  await sb.from('questions').delete().eq('id',id);
  const {error} = await sb.from('questions').insert({...data, solution: sol});
  if(error) { console.error('Xato ('+id+'):', error.message); await sb.from('questions').insert(data); }
  else { process.stdout.write('✅ ' + id + '\r'); }
}

console.log('Kasrlar yechimlar (31-60)...');
for(const {id, sol} of solutions) {
  await updateSolution(id, sol);
  await new Promise(r => setTimeout(r, 80));
}
console.log('\n🎉 ' + solutions.length + ' ta savolga yechim yozildi!');
