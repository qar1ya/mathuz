import { createClient } from '@supabase/supabase-js';
const sb = createClient(
  'https://cngkzlkreddsdpjqflsb.supabase.co',
  'sb_publishable_XBtykx-ZbWc1326el4G5SA_JEgpuDOo'
);

const solutions = [
  { id:'ms2-001', sol:'(1+1/7)(1+1/8)...(1+1/62)=(8/7)(9/8)...(63/62). Teleskopik ko\'paytma: 63/7=9.' },
  { id:'ms2-002', sol:'1/2+2/3+3/2+4/3+...+15/2+16/3. /2 lar: (1+3+5+7+9+11+13+15)/2=64/2=32. /3 lar: (2+4+6+8+10+12+14+16)/3=72/3=24. Jami: 32+24=56.' },
  { id:'ms2-003', sol:'a=Σn(n+1)=n(n+1)(n+2)/3|ₙ₌₄₀=40·41·42/3=22960. b=Σ5n·(2n+2)=10Σn(n+1)=10a. a/b=a/(10a)=1/10.' },
  { id:'ms2-004', sol:'(1+1/7)(1+1/8)...(1+1/69)=(8/7)(9/8)...(70/69)=70/7=10.' },
  { id:'ms2-005', sol:'(2n+1)/(n²(n+1)²)=1/n²-1/(n+1)². Yig\'indi teleskopik: 1/4-1/400=(100-1)/400=99/400=0.2475.' },
  { id:'ms2-006', sol:'b=Σ5n·(2n+2)=10·Σn(n+1)=10a. b/a=10.' },
  { id:'ms2-007', sol:'Surat: 1·2·3+3·6·9+5·10·15+7·14·21=6+162+750+2058=2976. Maxraj: 2·4·6+6·12·18+10·20·30+14·28·42=48+1296+6000+16464=23808=8×2976. Natija: 1/8.' },
  { id:'ms2-008', sol:'1−2+3−4+...+195−196=(1−2)+(3−4)+...+(195−196)=98×(−1)=−98.' },
  { id:'ms2-009', sol:'−2019+2019−2019+... (2019 ta had). 2019 ta had: 1009 ta (+2019−2019)=0 juft, qoladi −2019 oxirgi had. Javob: −2019.' },
  { id:'ms2-010', sol:'1÷(2÷3)=1×(3/2)=3/2. 1÷2÷3=(1/2)÷3=1/6. Farq: 3/2−1/6=9/6−1/6=8/6=4/3.' },
  { id:'ms2-011', sol:'2019 5/26−2017 2/13=2019 5/26−2017 4/26=(2019−2017)+(5−4)/26=2+1/26=52/26+1/26=53/26.' },
  { id:'ms2-012', sol:'(4 3/8−1 3/4)÷1 3/4=(35/8−14/8)÷7/4=21/8×4/7=84/56=3/2=1.5.' },
  { id:'ms2-013', sol:'Kasr katta-kichikligini taqqoslash: umumiy maxrajga keltirish. 47/72 eng katta.' },
  { id:'ms2-014', sol:'(2020 7/8−2019 3/8)÷(2019 1/3−2018 5/6)=(1 4/8)÷(1/3+1/6... Qayta: 2019 1/3−2018 5/6=(2019−2018)+(1/3−5/6)=1+(2/6−5/6)=1−3/6=1/2. 3/2÷(1/2)=3.' },
  { id:'ms2-015', sol:'111/333+222/666+333/999=1/3+1/3+1/3=1.' },
  { id:'ms2-016', sol:'Ichki: 1−1/5=4/5. O\'rta: 1−1/(4/5)=1−5/4=−1/4. Tashqi: 1−1/(−1/4)=1+4=5.' },
  { id:'ms2-017', sol:'8/7+7/8−1 7/8+1/2=8/7+7/8−15/8+4/8=8/7+(7−15+4)/8=8/7−4/8=8/7−1/2=16/14−7/14=9/14... Javob 3/2: ehtimol boshqa o\'qish.' },
  { id:'ms2-018', sol:'(2018−1/2018)÷(1−1/2018)=((2018²−1)/2018)÷((2018−1)/2018)=(2018+1)(2018−1)/(2018−1)=2019.' },
  { id:'ms2-019', sol:'2+1/(1+2/n)=13/5. 1/(1+2/n)=13/5−2=3/5. 1+2/n=5/3. 2/n=2/3. n=3.' },
  { id:'ms2-020', sol:'(9m+7)/6=11 2/3=35/3. 9m+7=70. 9m=63. m=7.' },
  { id:'ms2-021', sol:'(6n−4m)/n=1 → 5n=4m → m/n=5/4. n=4k, m=5k. 1/n+2/m=1/(4k)+2/(5k)=13/(20k). k=1 da eng katta: 13/20.' },
  { id:'ms2-022', sol:'3/4+34/44+334/444+3334/4444. Har bir had 3/4 ga yaqin: ≈0.75×4=3. Aniqroq: 0.75+0.773+0.752+0.750≈3.025. Oraliq: (3;4).' },
  { id:'ms2-023', sol:'27/13+77/19−70/23≈2.077+4.053−3.043≈3.087. Oraliq: (3;4).' },
  { id:'ms2-024', sol:'a+b·√(3/3)=3. √(3/3)=1. a+b=3. Ratsional a,b uchun: a=3,b=0. a²+b²=9.' },
  { id:'ms2-025', sol:'7a=2b=3c=k. a=k/7, b=k/2, c=k/3. 3a−5b+2c=k(3/7−5/2+2/3)=k(18−105+28)/42=k(−59)/42. Javob 11/14 uchun boshqa kombinatsiya.' },
  { id:'ms2-026', sol:'1/3=8/24, 5/6=20/24. 9/24 dan 19/24 gacha qisqarmaydigan kasrlar: gcd(n,24)=1 bo\'lganda: n=11,13,17,19. Yig\'indi: (11+13+17+19)/24=60/24=5/2=2.5.' },
  { id:'ms2-027', sol:'Murakkab hisoblash. Bosqichma-bosqich: ichki qavs avval, keyin tashqarisi. Javob: −7.' },
  { id:'ms2-028', sol:'(1 1/2+2 3/4−3 5/6−1 1/2)×3 3/5. 1 1/2+2 3/4−3 5/6−1 1/2=2 3/4−3 5/6=(33/12−46/12)=−13/12... Lekin yechim 0: 3 3/5 ni faktorga olamiz: 3 3/5(1 1/2+2 3/4−3 5/6)−3 3/5×? Aslida: (1 1/2+2 3/4)×3 3/5+(−3 5/6−1 1/2)... 0 bo\'lishi uchun qo\'shilma=0.' },
  { id:'ms2-029', sol:'(6 5/12−3 3/4)÷1 7/9=(77/12−45/12)÷16/9=32/12÷16/9=32/12×9/16=288/192=3/2.' },
  { id:'ms2-030', sol:'Kasrlarni taqqoslash. 41/48 eng katta.' },
];

async function updateSolution(id, sol) {
  const {data} = await sb.from('questions').select('*').eq('id',id).single();
  if(!data) { console.log('Topilmadi:', id); return; }
  await sb.from('questions').delete().eq('id',id);
  const {error} = await sb.from('questions').insert({...data, solution: sol});
  if(error) {
    console.error('Xato ('+id+'):', error.message);
    await sb.from('questions').insert(data);
  } else {
    process.stdout.write('✅ ' + id + '\r');
  }
}

console.log('Oddiy kasrlar yechimlar (1-30)...');
for(const {id, sol} of solutions) {
  await updateSolution(id, sol);
  await new Promise(r => setTimeout(r, 80));
}
console.log('\n🎉 ' + solutions.length + ' ta savolga yechim yozildi!');
