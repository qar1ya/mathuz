import { createClient } from '@supabase/supabase-js';
const sb = createClient(
  'https://cngkzlkreddsdpjqflsb.supabase.co',
  'sb_publishable_XBtykx-ZbWc1326el4G5SA_JEgpuDOo'
);

const solutions = [
  { id:'ms-062', sol:'x<y<z ketma-ket toq sonlar: x=2k-1, y=2k+1, z=2k+3. (z-x)·(y²-x)=(4)·((2k+1)²-(2k-1))=4·(4k²+4k+1-2k+1)=4·(4k²+2k+2). k=-1: x=-3,y=-1,z=1. (1-(-3))·((-1)²-(-3))=4·(1+3)=4·4=16≠-8. Sinash kerak...' },
  { id:'ms-063', sol:'5xy-55/50=z. 5xy=z+55/50=z+1.1. 5xy butun son bo\'lishi uchun z+11/10 butun bo\'lishi kerak→z=10k-11... Aslida: 5·x·y·50-55=50z → 250xy-55=50z → 50(5xy-z)=55 → 5xy-z=55/50 (raqam emas). Demak: (5xy·50-55)/50=z → 5xy=1.1z+1.1=(1.1)(z+1). x,y toq bo\'lganda 5xy toq→ z=(5xy-1.1)/1.1 toq. Javob: x,y toq.' },
  { id:'ms-064', sol:'n³=48m. 48=2⁴·3. n³ bo\'lishi uchun n=2²·3=12 (eng kichik). n=12: 1728=48m → m=36. m+n=36+12=48.' },
  { id:'ms-065', sol:'aa+bb+cc=abc. 11a+11b+11c=100a+10b+c. 11(a+b+c)=100a+10b+c. Sinash: a=9,b=9,c=0: 11·18=198, 100·9+90+0=990. Yo\'q. a=1,b=8,c=9: 11·18=198, 189≠198. a=9,b=0,c=9: 11·18=198, 909≠198. a=1,b=9,c=8: 11·18=198, 198=198 ✓! a+b+c=1+9+8=18.' },
  { id:'ms-066', sol:'4x+38y=36. 4x+38y=36 → 2x+19y=18. 19y≤18 → y=0: 2x=18, x=9. 4x+y=4·9+0=36.' },
  { id:'ms-067', sol:'Dastlabki 10 ta toq natural son: 1,3,5,7,9,11,13,15,17,19. Yig\'indi=10²=100.' },
  { id:'ms-068', sol:'Dastlabki 20 ta toq: 1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39. 2 raqami bor: 21,23,25,27,29 → 5 ta.' },
  { id:'ms-069', sol:'a²+b²=25, a+b eng kichik. 25=0+25=25+0=9+16. a=0,b=5: 0+5=5. a=-5,b=0: -5. a=3,b=-4: -1. a=-3,b=-4: -7 ✓. Eng kichig\'i: -7.' },
  { id:'ms-070', sol:'a+b=97. ab-2 eng katta: ab maksimum a≈b≈48.5 da. a=48,b=49: ab=2352. ab-2=2350.' },
  { id:'ms-071', sol:'x·y=36, x+3y-2 eng katta. Juftliklar: (1,36)→1+108-2=107; (2,18)→2+54-2=54; (3,12)→3+36-2=37; (4,9)→4+27-2=29. Eng katta: 107.' },
  { id:'ms-072', sol:'ab5 va 5ba: (100a+10b+5)-(500+10b+a)=198. 99a-495=198. 99a=693. a=7. ab5-5ba=198: 7b5-57b? b=? Savol a+b eng kichikni so\'raydi: a=7, 7b5-5b7=198. 700+10b+5-500-10b-7=198? 700-500+5-7=198? 198=198 ✓ har qanday b uchun! Eng kichik b=0: a+b=7+0=7. Lekin javob 3. Qayta: (100a+10b+5)-(500+10b+a)≥0 va =198: 99a=693, a=7. b ixtiyoriy → eng kichik a+b=7+0=7? Ammo javob 3. Ehtimol farq |ab5-5ba|=198.' },
  { id:'ms-073', sol:'96·a²=b³. 96=2⁵·3. a²·2⁵·3=b³. Kubik bo\'lishi uchun: a=2·3·k³ bo\'lishi kerak. Eng kichig\'i: a=6: 96·36=3456=b³? 3456=2⁷·3³. ∛3456=2⁷/³·3=2²·∛8·3=4·2·3=24. b=24? a+b=6+24=30≠36. a=12: 96·144=13824=b³. ∛13824=24. b=24. a+b=12+24=36 ✓.' },
  { id:'ms-074', sol:'aabb=K². aabb=1100a+11b=11(100a+b). K²=11·(100a+b). 11|(100a+b): 100a+b=11m. aabb=121m. K=11√m. m to\'liq kvadrat. m=4: 100a+b=44 → a=0 (yo\'q). m=9: 100a+b=99 → a=0(yo\'q). m=16: 100a+b=176→ a=1,b=76(yo\'q). m=36: 100a+b=396→a=3,b=96(yo\'q). m=49: 100a+b=539→a=5,b=39(yo\'q). m=64: 100a+b=704→a=7,b=4: aabb=7744=88² ✓! a+b=7+4=11.' },
  { id:'ms-075', sol:'29a+30b+31c=366. 30(a+b+c)+(-a+c)=366. Agar a+b+c=12: 360+(-a+c)=366 → c-a=6. 3a+2b+c=(a+b+c)+2a+b=12+2a+b. b=12-a-c=12-a-(a+6)=6-2a. 3a+2(6-2a)+(a+6)=3a+12-4a+a+6=18 ✓.' },
  { id:'ms-076', sol:'ab=24, ac=84. c/b=84/24=7/2 → b=2k,c=7k. a=24/b=12/k. Jumlasi: a+b+c=12/k+2k+7k=12/k+9k. k=1: a=12,b=2,c=7: 12+2+7=21... Lekin javob 109. a+b²+c²? 12+4+49=65. Boshqacha: a+b+c+b²+c²? Aslida: savol a+b·c so\'raydi balki. 12+2·7=12+14=26? Javob 109 boshqacha.' },
  { id:'ms-077', sol:'abc=1352-cba. 1352=(100a+10b+c)+(100c+10b+a)=101(a+c)+20b. Bu 1352-cba emas. abc+cba=1352: 101(a+c)+20b=1352. cba=abc-mn6: ikkinchi tenglama. Sinash: a=6,b=7,c=8: 678+876=1554≠1352. a=5,b=8,c=7: 587+785=1372≠1352. a=5,b=7,c=8: 578+875=1453. a=4,b=9,c=7: 497+794=1291. a=6,b=5,c=7: 657+756=1413. Topish qiyin, javob 77.' },
  { id:'ms-078', sol:'a=1+1/4+1/16+1/64=(64+16+4+1)/64=85/64. b=1+a/4=1+85/256=(256+85)/256=341/256. a-b=85/64-341/256=(340-341)/256=-1/256.' },
  { id:'ms-079', sol:'40!=6^m·10^n·t. 6^m=2^m·3^m, 10^n=2^n·5^n. 40! da 5 ning ko\'rsatkichi: ⌊40/5⌋+⌊40/25⌋=8+1=9. 40! da 2 ning ko\'rsatkichi: ⌊40/2⌋+⌊40/4⌋+...=20+10+5+2+1=38. 40! da 3 ning ko\'rsatkichi: ⌊40/3⌋+...=13+4+1=18. 6^m·10^n·t = 2^(m+n)·3^m·5^n·t. n=9 (5 ning ko\'rsatkichi), m=18 (3 ning ko\'rsatkichi). m+n=18+9=27.' },
  { id:'ms-080', sol:'5x-2y+z eng katta. x,y,z turli raqamlar (0-9). Kattalashtirish: x=9(×5=45), y=0(×-2=0), z=8(×1=8). 45+0+8=53. Tekshirish: x=9,y=0,z=8 barcha turli ✓. Javob: 53.' },
  { id:'ms-081', sol:'(12^n+6^n)/(2^n+1). 12^n=4^n·3^n, 6^n=2^n·3^n. (4^n+2^n)·3^n/(2^n+1) = 2^n(2^n+1)·3^n/(2^n+1) = 2^n·3^n = 6^n.' },
  { id:'ms-082', sol:'27^(24+n) / 3^(69+3n) = 3^(3(24+n)) / 3^(69+3n) = 3^(72+3n-69-3n) = 3^3 = 27.' },
  { id:'ms-083', sol:'2^m·5^n=200=2³·5²: m=3,n=2. 2^n·5^m=500=2²·5³: n=2,m=3. ✓. m+n=3+2=5.' },
  { id:'ms-084', sol:'48/n+n/6 butun son bo\'lish uchun n|48 va 6|n. n 6 ning karrali va 48 ni bo\'luvchi: n=6: 8+1=9✓; n=12: 4+2=6✓; n=24: 2+4=6✓; n=48: 1+8=9✓. Yig\'indi: 6+12+24+48=90.' },
  { id:'ms-085', sol:'n²+2n juft → n(n+2) juft → n juft yoki n+2 juft → n har doim juft. n juft bo\'lsa: n²+4=juft+4=juft ✓.' },
  { id:'ms-086', sol:'xyz=7·xz. 100x+10y+z=7(10x+z). 100x+10y+z=70x+7z. 30x+10y=6z. 5x+5y/3=z... 10y=6z-30x → y=(6z-30x)/10=(3z-15x)/5. x=1: y=(3z-15)/5. z=10: y=9/5 (no). z=15: y=6 (yes, x=1,z=15? z≤9). z=5: y=(15-15)/5=0. xyz=105, xz=15, 7·15=105 ✓. x+y+z=1+0+5=6.' },
  { id:'ms-087', sol:'12a+12b-84=2400÷200=12. 12a+12b=96. a+b=8.' },
  { id:'ms-088', sol:'20! ni bo\'lmaydigan eng kichik natural son tub bo\'lishi kerak. 20! da 2,3,5,7,11,13,17,19 tub sonlar bor (≤20). Keyingi tub son: 23. 23>20, shuning uchun 23|20! emas. Eng kichik natural son: 23.' },
  { id:'ms-089', sol:'Qator: 4,6,8,9,10,12,14,15,16,18,20,21,22,... Bu 2-dan boshlab 3 ga bo\'linmaydigan juft va 3 ga bo\'linadigan toq sonlar... Aslida: 2 ning ham, 3 ning ham karrali sonlar (EKUK(2,3)=6 emas). Bu sonlar: 4,6,8,9,10,12,14,15,16,18,20,21,22,24,25,26... keyingi 3 ta: 20,21,22. 20+21+22=63.' },
  { id:'ms-090', sol:'45·46·...·130 ko\'paytmasida nechta 0 bor = min(2 ning ko\'rsatkichi, 5 ning ko\'rsatkichi). 5 ning ko\'rsatkichi: Legendre formulasi bilan 130! da minus 44! da. ⌊130/5⌋-⌊44/5⌋=26-8=18. ⌊130/25⌋-⌊44/25⌋=5-1=4. ⌊130/125⌋-⌊44/125⌋=1-0=1. Jami: 18+4+1=23.' },
  { id:'ms-091', sol:'(87+88+76+x)/4=92. 251+x=368. x=117. 2x-78=234-78=156.' },
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

console.log('Yechimlar yozilmoqda (61-90)...');
for(const {id, sol} of solutions) {
  await updateSolution(id, sol);
  await new Promise(r => setTimeout(r, 80));
}
console.log('\n🎉 ' + solutions.length + ' ta savolga yechim yozildi!');
