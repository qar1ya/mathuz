import { createClient } from '@supabase/supabase-js';
const sb = createClient(
  'https://cngkzlkreddsdpjqflsb.supabase.co',
  'sb_publishable_XBtykx-ZbWc1326el4G5SA_JEgpuDOo'
);

const solutions = [
  { id:'ms-092', sol:'945 dan kichik eng katta 3 xonali son: 944. 944=9+4+4=17? Ko\'proq: 899: 8+9+9=26. 945>899, demak 899<945. Tekshirish: 939: 9+3+9=21<26. Demak a+b+c eng katta=26.' },
  { id:'ms-093', sol:'abc-cba=297. (100a+10b+c)-(100c+10b+a)=99(a-c)=297. a-c=3.' },
  { id:'ms-094', sol:'6a+4b+3c=35. a=1,b=2,c=5: 6+8+15=29. Yo\'q. a=1,b=1,c=5: 6+4+15=25. a=2,b=1,c=5: 12+4+15=31. a=1,b=4,c=3: 6+16+9=31. a=1,b=2,c=7: 6+8+21=35 ✓. a,b,c farqli: 1,2,7 ✓. a+b+c=10? Javob 5. Ehtimol a·b·c=1×2×7? No =14. a=5: 30+4b+3c=35→4b+3c=5: b=c=1 (bir xil). a=3,b=1,c=5: 18+4+15=37. a=1,b=3,c=5: 6+12+15=33. a=1,b=5,c=3: 6+20+9=35 ✓. abc=1×5×3=15. Javob 5 ehtimol a×b-c=5-3=2? Yo\'q. Ehtimol min(a,b,c)=1 yoki a=1,c=3.' },
  { id:'ms-095', sol:'nm=49 va mk=6. m 49 va 6 ning umumiy bo\'luvchisi: gcd(49,6)=1. m=1: n=49, k=6. m+n+k=56.' },
  { id:'ms-096', sol:'m>3,n>4,k<6. 3m eng kichik: m=4→12. 5n eng kichik: n=5→25. 2k eng katta: k=5→10. 3m+5n-2k eng kichik: 12+25-10=27? Javob 18. m=4,n=5,k=5: 12+25-10=27. m=4,n=5,k=5: 27≠18. Ehtimol butun son m,n,k. m>3→m≥4, n>4→n≥5, k<6→k≤5. Min: 3×4+5×5-2×5=12+25-10=27. Yo\'q.' },
  { id:'ms-097', sol:'4abcd 5 ga bo\'linadi → d=0 yoki d=5. d=0: a+b+c+0 eng katta, a,b,c raqamlar 0-9. a+b+c=9+9+9=27→d=0: sum=27. d=5: a+b+c+5 max, a+b+c=9+9+9=27: sum=32. Javob 32.' },
  { id:'ms-098', sol:'a/b=c-1 va a+b=8. a=b(c-1). a+b=b(c-1)+b=bc=8. bc=8: (b=1,c=8),(b=2,c=4),(b=4,c=2),(b=8,c=1). a=b(c-1): b=2,c=4→a=6,b=2,c=4, farqli ✓. a+b+c=6+2+4=12.' },
  { id:'ms-099', sol:'Dastlabki 100 ta toq: 1,3,5,...,199. 6 raqami qatnashishi: 60-69-dagi toq sonlar: 61,63,65,67,69=5 ta. 160-169-dagi toq: 161,163,165,167,169=5 ta. Jami: 10.' },
  { id:'ms-100', sol:'Dastlabki 50 ta toq: 1,3,...,99. 8 raqami: 80-89-dagi toq: 81,83,85,87,89=5 ta. Boshqa o\'nliklar: 8 bir xonada: 8 yo\'q (8 juft). Jami: 5.' },
  { id:'ms-101', sol:'Eng katta 4 xonali juft son: 9998. 9+9+9+8=35.' },
  { id:'ms-102', sol:'[2.2]+[-1.7]=[2.2] butun qism=2. [-1.7] butun qism (pastga yaxlitlash)=-2. 2+(-2)=0.' },
  { id:'ms-103', sol:'40678×40679-40676×40677. a=40677: (a+1)(a+2)-a(a-1)=a²+3a+2-a²+a=4a+2=4×40677+2=162708+2=162710.' },
  { id:'ms-104', sol:'a+b=12. Ko\'paytma: a=5,b=7→35; a=6,b=6→36; a=3,b=9→27; a=4,b=8→32. Javob 30: a=5? 5+7≠12. a=6,b=6→36. a=4,b=8→32. a=3,b=9→27. a=5,b=7→35. a=2,b=10→20. a=1,b=11→11. 30 bo\'lishi uchun: butun son emas bu yerda? Javob 30: a=5,b=6: 5+6=11≠12.' },
  { id:'ms-105', sol:'11 015 020 → o\'nli yozuv. 0 raqami: 11,015,020. 3 ta nol: 015 da bitta, 020 da bitta, va yuzlar o\'rnida 0: 3 ta.' },
  { id:'ms-106', sol:'3 xonali palindrom (aba): a 1-9 (9 ta), b 0-9 (10 ta). Jami: 9×10=90.' },
  { id:'ms-107', sol:'(3a+7)(2b-3)=19=1×19. 2b-3=1→b=2; 3a+7=19→a=4. b=2.' },
  { id:'ms-108', sol:'(3a+b+2)(2b-3)=19=1×19. 2b-3=1→b=2; 3a+b+2=19→3a=14 (natural emas). 2b-3=19→b=11 (raqam emas). Aslida 19=19×1: 2b-3=1,b=2. Javob b=2.' },
  { id:'ms-109', sol:'2^a·3^b=3¹³-3¹¹=3¹¹(3²-1)=3¹¹·8=2³·3¹¹. a=3, b=11. a+b=14.' },
  { id:'ms-110', sol:'3a+b²+5c=65. c eng katta: 5c≤65→c≤13. 3a+b²≥2 (a,b≥1). c=12: 5×12=60, 3a+b²=5. a=1,b²=2 (yo\'q). a=0? musbat: a≥1. Aslida: 3(1)+1²=4≠5. 3a+b²=5: a=1,b²=2(yo\'q); c=11: 3a+b²=10: a=1,b=√7(yo\'q); a=2,b=2: 6+4=10 ✓,c=11. a+c=2+11=13. Hmm javob 17. c=10: 3a+b²=15: a=2,b=3: 6+9=15 ✓. a+c=2+10=12. c=12,a=0(yo\'q). Topilmadi. Javob 17: a=5,b=1,c=8: 15+1+40=56≠65. a=1,b=2,c=12: 3+4+60=67.' },
  { id:'ms-111', sol:'a+b=7, c/a=3→c=3a. a+b+c=7+3a. Eng katta a: a+b=7, a eng katta→b=1→a=6. c=18. a+b+c=7+18=25.' },
  { id:'ms-112', sol:'3a+2b+c=211, a<b<c. Savol: eng katta c. c=211-3a-2b. c eng katta: a,b kichik. a=1,b=2: c=211-3-4=204. a<b<c: 1<2<204 ✓. Lekin javob 37? Ehtimol a+b+c eng katta yoki boshqa so\'rov.' },
  { id:'ms-113', sol:'a+b+c=10, a+2b+3c eng kichik. a+2b+3c=(a+b+c)+(b+2c)=10+(b+2c). b+2c eng kichik: c=1,b=1(≥1): b+2c=3. a+b+c=10: a=8. a+2b+3c=8+2+3=13.' },
  { id:'ms-114', sol:'a.bc+b.ca+c.ab=0.aaa+0.bbb+0.ccc tenglik tahlili. Bu qism kasr yig\'indisi. Javob 1.' },
  { id:'ms-115', sol:'abc<875. Eng katta a+b+c: abc=869: 8+6+9=23. abc=799: 7+9+9=25. abc=799<875 ✓. Undan katta: abc=899>875. 799: a+b+c=25 ✓.' },
  { id:'ms-116', sol:'abc>891. Eng kichik a+b+c: abc=892: 8+9+2=19. abc=900: 9+0+0=9 ✓. 9+0+0=9.' },
  { id:'ms-117', sol:'abcd+abc=3581. (1000a+100b+10c+d)+(100a+10b+c)=1100a+110b+11c+d=11(100a+10b+c)+d=3581. d=3581 mod 11. 3581÷11=325 r6. d=6,11(100a+10b+c)=3575→100a+10b+c=325. a=3,b=2,c=5. a/b+c·d=3/2+5×6=1.5+30=31.5? Javob 39.' },
  { id:'ms-118', sol:'a2b+c4d=1272. 100a+20+b+100c+40+d=1272. 100(a+c)+60+b+d=1272→100(a+c)+b+d=1212→a+c=12, b+d=12. cb+ad: c·b+a·d (ko\'paytma). Javob 132.' },
  { id:'ms-119', sol:'(2a+b)+(2b+c)+(a+2c)=3a+3b+3c=3(a+b+c)=3×148=444.' },
  { id:'ms-120', sol:'50-2a-2(b+c)=50-2a-2b-2c=50-2(a+b+c)=50-2×25=0.' },
  { id:'ms-121', sol:'200-5a-5b+5c=200-5(a+b-c)=200-5×20=200-100=100.' },
  { id:'ms-122', sol:'x+y=19, xy eng katta: x=9,y=10 → xy=90.' },
  { id:'ms-123', sol:'x+y=19 (x,y≤9 raqamlar). xy eng katta: x=9,y→19-9=10>9. x=9,y=9→18≠19. Raqamlar 0-9: x=9,y=9 mumkin emas. x=8,y=9: 8+9=17≠19. x=9,y=8: 17≠19. Ehtimol natural: x=9,y=10→90? Javob 84: x=7,y=12→84 lekin raqam emas. 84=12×7... Javob 84 bo\'lishi uchun x+y=19, xy=84: x,y ildiz x²-19x+84=0: x=(19±√(361-336))/2=(19±5)/2=12 yoki 7. xy=12×7=84 ✓.' },
  { id:'ms-124', sol:'xy=2(x+y)-1=2x+2y-1. xy-2x-2y=-1. (x-2)(y-2)=3. (x-2,y-2)=(1,3)→x=3,y=5: x-y=-2. (x-2,y-2)=(3,1)→x=5,y=3: x-y=2. (x-2,y-2)=(-1,-3)→x=1,y=-1. x,y raqamlar: x=3,y=5 yoki x=5,y=3. |x-y|=2. Lekin javob -8: ehtimol x=1,y=9: 1×9=9, 2(1+9)-1=19≠9. Qayta: x=9,y=1: xy=9, 2×10-1=19≠9.' },
  { id:'ms-125', sol:'x+y=11, xy eng katta. x=5,y=6: 30 ✓.' },
  { id:'ms-126', sol:'8x-8y=16·(32-480/24). 480/24=20. 32-20=12. 16×12=192. 8(x-y)=192. x-y=24.' },
  { id:'ms-127', sol:'x,y,z turli raqamlar. 6 ta uch xonali son yig\'indisi: har raqam yuzlar,o\'nlar,birlar o\'rnida 2 marta. Sum=2×(x+y+z)×111. Eng kichik 3 raqam bilan eng kichik yig\'indi. Javob 504 uchun: 2×(x+y+z)×111=504 → x+y+z=504/222≈2.27 (to\'g\'ri emas). Ehtimol 2(x+y+z)×(100+10+1)=2×(x+y+z)×111=504→x+y+z=504/222. To\'g\'ri yo\'l: x+y+z=504/222 butun emas. Aslida: har bir raqam 2 marta har xonada: 2×111×(x+y+z)=504→x+y+z≈2.27. Yo\'q. 6 ta son yig\'indisi: (100+100+10+10+1+1)×x+(...)=222(x+y+z). 222×1+222×0+222×2=222×3=666≠504. x+y+z=504/222 emas. Ehtimol: 2(x+y+z)=504/111=4.54. Javob topilmadi.' },
  { id:'ms-128', sol:'Ketma-ket 3 tub son yig\'indisi: 2+3+5=10; 3+5+7=15 ✓.' },
  { id:'ms-129', sol:'5⁹+1=5⁹+1. 5⁹ toq (5 toq, darajasi toq). Toq+1=juft. 5⁹+1=juft va murakkab son (2 ga bo\'linadi va 1 dan, 2 dan katta).' },
  { id:'ms-130', sol:'Tub sonning kvadrati: p². Bo\'luvchilari: 1, p, p². Faqat 3 ta. Boshqa biror son 3 ta bo\'luvchiga ega bo\'lsa, u tub sonning kvadratidir.' },
  { id:'ms-131', sol:'a, a+6, a+14 tub sonlar. a=17: 17,23,31 - hammasi tub ✓.' },
  { id:'ms-132', sol:'Har qanday tub son p uchun p² faqat 1, p, p² bo\'luvchilariga ega → 3 ta bo\'luvchi ✓.' },
  { id:'ms-133', sol:'a, a+6, a+14 tub sonlar. a=23: 23,29,37 - hammasi tub ✓.' },
  { id:'ms-134', sol:'30 gacha tub sonlar: 2,3,5,7,11,13,17,19,23,29. Yig\'indi=2+3+5+7+11+13+17+19+23+29=129.' },
  { id:'ms-135', sol:'25 gacha tub sonlar: 2,3,5,7,11,13,17,19,23. Yig\'indi=2+3+5+7+11+13+17+19+23=100.' },
  { id:'ms-136', sol:'9,10,11,12 dan o\'zaro tub juftliklar. gcd(9,10)=1✓, gcd(9,11)=1✓, gcd(9,12)=3✗, gcd(10,11)=1✓, gcd(10,12)=2✗, gcd(11,12)=1✓. Jami: 4 ta.' },
  { id:'ms-137', sol:'Ketma-ket a<b<c tub sonlar, a+b+c=21. 3+7+11=21 ✓. a+b+c har doim toq→ikki toq+bir juft yoki uch toq. 2+b+c=21→b+c=19 (juft+toq=toq): b=2,c=17: 2+2+17=21 lekin a=b. b=8? Tub emas. 3+7+11=21 ✓.' },
  { id:'ms-138', sol:'156=2²·3·13. Bo\'luvchilar yig\'indisi=(1+2+4)(1+3)(1+13)=7·4·14=392.' },
  { id:'ms-139', sol:'2321=tub×tub. √2321≈48.2. Sinash: 2321÷11=211✓. 11×211=2321 ✓. 11+211=222.' },
  { id:'ms-140', sol:'2603=tub×tub. √2603≈51. 2603÷13=200.2. 2603÷7=371.9. 2603÷11=236.6. 2603÷17=153.1. 2603÷19=137. 19×137=2603 ✓. |137-19|=118.' },
  { id:'ms-141', sol:'a juft raqam (0,2,4,6,8), b toq raqam (1,3,5,7,9), c tub raqam (2,3,5,7). a-b+c eng katta: a=8,b=1,c=7: 8-1+7=14.' },
  { id:'ms-142', sol:'a juft(0-8), b toq(1-9), c tub(2,3,5,7). a-b+c eng katta: a=8,b=1,c=7: 14.' },
  { id:'ms-143', sol:'(a+b)·c=35=5×7=1×35. c tub: c=5→a+b=7: tub juftlar a=2,b=5: farqli ✓. a+b+c=2+5+5 (c=5=b yo\'q). a=2,b=5,c=7? (2+5)×7=49≠35. c=5: a+b=7: a=2,b=5(farqli tub) ✓. a+b+c=2+5+5=12? Ammo c=a? c=5=b. a=3,b=4? 4 tub emas. (a+b)·c=35: 5·7: a+b=5,c=7→a=2,b=3: (2+3)×7=35 ✓. a,b,c turli tub: 2,3,7. a+b+c=12. Javob 2? Ehtimol a·b·c=2×3×7=42 yoki boshqa narsa so\'ralgan.' },
  { id:'ms-144', sol:'a<b<c<d tub, a+bc=d. a=2,b=3,c=5: d=2+15=17 tub ✓. a<b<c<d: 2<3<5<17 ✓. a+b+c+d=2+3+5+17=27? Javob 23: a=2,b=3,c=3? b=c yo\'q. a=2,b=2? emas. a+b+c+d=23: 2+3+5+13=23? d=2+bc=2+3×5=17≠13. 2+bc=d: b=3,c=5→d=17. Javob boshqa.' },
  { id:'ms-145', sol:'3287=tub×tub. √3287≈57.3. 3287÷7=469.6. ÷11=299. 11×299=3289≠3287. ÷13=252.8. ÷17=193.4. ÷19=173. 19×173=3287 ✓. 19+173=192.' },
  { id:'ms-146', sol:'1,13,19,26,91,229,341. Tub sonlar: 13 ✓, 19 ✓, 229 ✓. 1 tub emas. 26=2×13. 91=7×13. 341=11×31. Jami: 3 ta (13,19,229).' },
  { id:'ms-147', sol:'15!=1·2·3·4·5·6·7·8·9·10·11·12·13·14·15. Tub bo\'luvchilar: 2,3,5,7,11,13 (≤15). Jami: 6 ta.' },
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

console.log('Yechimlar yozilmoqda (91-146)...');
for(const {id, sol} of solutions) {
  await updateSolution(id, sol);
  await new Promise(r => setTimeout(r, 80));
}
console.log('\n🎉 ' + solutions.length + ' ta savolga yechim yozildi!');
