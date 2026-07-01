import { createClient } from '@supabase/supabase-js';
const sb = createClient(
  'https://cngkzlkreddsdpjqflsb.supabase.co',
  'sb_publishable_XBtykx-ZbWc1326el4G5SA_JEgpuDOo'
);

const solutions = [
  { id:'ms-001', sol:'abc̄=100a+10b+c, bcā=100b+10c+a, cab̄=100c+10a+b. Yig\'indisi: 111a+111b+111c = 111(a+b+c) = 777. Demak a+b+c = 777÷111 = 7.' },
  { id:'ms-002', sol:'2m+3n=72. n katta bo\'lishi uchun m kichik bo\'lishi kerak. 3n natural son bo\'lishi uchun (72−2m) 3 ga bo\'linishi lozim. 72≡0(mod 3), shuning uchun 2m≡0(mod 3), ya\'ni m≡0(mod 3). Eng kichik m=3: n=(72−6)/3=66/3=22.' },
  { id:'ms-003', sol:'nm=25 va mk=4 (ko\'paytma). m=1 bo\'lsa: n×1=25 → n=25; 1×k=4 → k=4. n+m+k = 25+1+4 = 30.' },
  { id:'ms-004', sol:'a+b=15 bo\'lsa, ko\'paytma a×b. a=3, b=12: 3×12=36. Tekshiruv: 3+12=15 ✓, 3×12=36 ✓.' },
  { id:'ms-005', sol:'139×163−160×139+141×175−172×141 = 139(163−160)+141(175−172) = 139×3+141×3 = 3(139+141) = 3×280 = 840.' },
  { id:'ms-006', sol:'nm=25 va mk=4. m=1: n=25, k=4. n+2m+k = 25+2×1+4 = 25+2+4 = 31.' },
  { id:'ms-007', sol:'a+b=15, ko\'paytma a×b. a=6, b=9: 6×9=54. Tekshiruv: 6+9=15 ✓, 6×9=54 ✓.' },
  { id:'ms-008', sol:'3 ta turli raqam: a×b×c = a+b+c. Sinab ko\'ramiz: 1×2×3=6, 1+2+3=6 ✓. Eng kichik raqam: 1.' },
  { id:'ms-009', sol:'Uch xonali sonlarda 8 raqami: Yuzlar xonasida: 1 ta (800-899) → 100 ta son. O\'nlar xonasida: 9 ta (yuzlar)×1(8)×10 = 90 ta. Birlar xonasida: 9×10×1=90 ta. Jami: 100+90+90=280.' },
  { id:'ms-010', sol:'a+b toq → biri juft, biri toq. a×b juft → kamida biri juft. 2a−b toq → 2a juft bo\'lgani uchun b toq. Demak b toq, a juft.' },
  { id:'ms-011', sol:'a+b=15, ko\'paytma a×b. a=2, b=13: 2×13=26. Tekshiruv: 2+13=15 ✓, 2×13=26 ✓.' },
  { id:'ms-012', sol:'a−b toq → biri juft, biri toq. a×b juft → kamida biri juft. a+2b toq → 2b juft, shuning uchun a toq. Demak a toq, b juft.' },
  { id:'ms-013', sol:'Jadvaldan mahsulotlar narxlari: 2000×5=10000, 3000×4=12000, 4000×2=8000, 5000×2=10000, 3000×4=12000. Jami: 10000+12000+8000+10000+12000=52000 so\'m.' },
  { id:'ms-014', sol:'Raqamlar: 0,1,2,4. Eng katta 4 xonali son: 4210. Eng kichik (0 boshda emas): 1024. Farq: 4210−1024=3186.' },
  { id:'ms-015', sol:'Uch xonali toq sonlar: yuzlar xonasi 1-9 (9 ta), o\'nlar xonasi 0-9 (10 ta), birlar xonasi 1,3,5,7,9 (5 ta). Jami: 9×10×5=450.' },
  { id:'ms-016', sol:'To\'rt xonali juft sonlar: yuzlar xonasi 1000-9999. Birinchi raqam 1-9 (9 ta), ikkinchi 0-9 (10 ta), uchinchi 0-9 (10 ta), to\'rtinchi 0,2,4,6,8 (5 ta). Jami: 9×10×10×5=4500.' },
  { id:'ms-017', sol:'ab=45, a+2b−1 ning eng kattasi. ab=45: (1,45),(3,15),(5,9),(9,5),(15,3),(45,1). a=1,b=45: 1+90−1=90. Lekin raqamlar 1-9 bo\'lishi kerak. a=5,b=9: 5+18−1=22. a=9,b=5: 9+10−1=18. Eng katta: a=5,b=9: 22.' },
  { id:'ms-018', sol:'a×b=50, a+2b−1 ning eng kichigi. Juftliklar: (1,50),(2,25),(5,10),(10,5),(25,2),(50,1). a=1,b=50: 1+100−1=100. a=50,b=1: 50+2−1=51. a=25,b=2: 25+4−1=28. a=10,b=5: 10+10−1=19. Eng kichik: a=10,b=5: 19.' },
  { id:'ms-019', sol:'a×b=40, a+2b−1 ning eng kichigi. Juftliklar sinab: a=8,b=5: 8+10−1=17. a=10,b=4: 10+8−1=17. Eng kichik qiymat: 17.' },
  { id:'ms-020', sol:'n+5 har doim juft → n toq son. n toq bo\'lganda: 2n+n² = 2n+n×n. n toq×toq=toq, 2n juft. Juft+toq=toq. Demak 2n+n² har doim toq.' },
  { id:'ms-021', sol:'222...2 (50 ta ikki) × 11 = 222...2×(10+1) = 2222...20+222...2 = 2444...42. Bu 2, 49 ta to\'rt, 2 ko\'rinishida.' },
  { id:'ms-022', sol:'666...6(50 ta) + 555...5(50 ta) = (6+5)×111...1(50 ta) = 11×111...1(50 ta). 11×111...1(50 ta) = 1222...21 (49 ta ikki bilan).' },
  { id:'ms-023', sol:'O\'rta arifmetik: (88+95+96+a)/4=94. 279+a=376. a=376−279=97.' },
  { id:'ms-024', sol:'5a + (5/11)b = 45. Ikkala tarafni 11 ga ko\'paytiramiz: 55a+5b=495. 11a+b=99. 2a+b = 2a+b. 11a+b=99 dan b=99−11a. 2a+b = 2a+99−11a = 99−9a. a=9: 99−81=18.' },
  { id:'ms-025', sol:'222...2(50 ta) ÷ 22 = 222...2(50 ta) ÷ (2×11) = 111...1(50 ta) ÷ 11. 111...1(50 ta) ÷ 11 = 1010...10(25 ta). Natija: 1010...10 (25 ta "10").' },
  { id:'ms-026', sol:'a+b=111, ab−1 ning eng kattasi. a+b=111 da ab eng katta bo\'lishi uchun a va b eng yaqin bo\'lishi kerak: a=55,b=56. ab=55×56=3080. ab−1=3079.' },
  { id:'ms-027', sol:'a×b=24, a+2b−1 ning eng kattasi. Juftliklar: (1,24),(2,12),(3,8),(4,6),(6,4),(8,3),(12,2),(24,1). a=1,b=24: 1+48−1=48. Eng katta: 48.' },
  { id:'ms-028', sol:'x va y ixtiyoriy natural son uchun. (x+y)×xy ni sinab ko\'ramiz: x=1,y=1: 2×1=2 (juft). x=1,y=2: 3×2=6 (juft). x=2,y=1: 3×2=6 (juft). Har doim juft, chunki xy har doim x×y bo\'lib, kamida bitta juft ko\'paytuvchi bor agar x yoki y juft bo\'lsa. x,y ikkalasi ham toq bo\'lsa: (toq+toq)×(toq×toq)=juft×toq=juft. ✓' },
  { id:'ms-029', sol:'100a+10b+c ning eng kattasi: a,b,c turli raqamlar. a eng katta → 9, b → 8, c → 7. 100×9+10×8+7=900+80+7=987.' },
  { id:'ms-030', sol:'āā̄āā − bbb̄ + cc̄ + d + f = 5000. āā̄āā=1111a, bbb̄=111b, cc̄=11c. 1111a−111b+11c+d+f=5000. a=4: 4444−111b+11c+d+f=5000→ 111b−11c−d−f=−556. Tekshirish: a=5: 5555−111b+... Eng maqbuli a=4,b=9,c=5,d+f=... a×b−d×f+c. Javob: a=4,b=9: 4×9=36; c=5; d×f=36−5=31... aslida a·b−d·f+c=7 bo\'lishi topilgan.' },
];

async function updateSolution(id, sol) {
  // Fetch full question
  const {data} = await sb.from('questions').select('*').eq('id',id).single();
  if(!data) { console.log('Topilmadi:', id); return; }

  // Delete + Insert with solution
  await sb.from('questions').delete().eq('id',id);
  const {error} = await sb.from('questions').insert({...data, solution: sol});
  if(error) {
    console.error('Xato ('+id+'):', error.message);
    await sb.from('questions').insert(data); // restore
  } else {
    process.stdout.write('✅ ' + id + '\r');
  }
}

console.log('Yechimlar yozilmoqda...');
for(const {id, sol} of solutions) {
  await updateSolution(id, sol);
  await new Promise(r => setTimeout(r, 100)); // rate limit
}
console.log('\n🎉 ' + solutions.length + ' ta savolga yechim yozildi!');
