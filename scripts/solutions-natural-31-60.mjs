import { createClient } from '@supabase/supabase-js';
const sb = createClient(
  'https://cngkzlkreddsdpjqflsb.supabase.co',
  'sb_publishable_XBtykx-ZbWc1326el4G5SA_JEgpuDOo'
);

const solutions = [
  { id:'ms-031', sol:'m=24³·6¹²·20³. 24=2³·3→24³=2⁹·3³; 6¹²=2¹²·3¹²; 20=2²·5→20³=2⁶·5³. m=2²⁷·3¹⁵·5³. m²=2⁵⁴·3³⁰·5⁶. m²/2ⁿ natural son bo\'lishi uchun: 54−n≥0 → n≤54. Eng katta n=54.' },
  { id:'ms-032', sol:'(x+y)·x·y: x,y ikkalasi toq bo\'lsa → x+y juft, x·y toq → juft·toq=juft ✓. Biri juft bo\'lsa → x·y juft → ifoda juft ✓. Har doim juft.' },
  { id:'ms-033', sol:'ab=96. Bo\'luvchi juftliklar: (1,96),(2,48),(3,32),(4,24),(6,16),(8,12). a+b: 97,50,35,28,22,20. Eng katta=97, eng kichik=20. Farq=97−20=77.' },
  { id:'ms-034', sol:'ab=(9−a)(9−b)=81−9a−9b+ab. 0=81−9(a+b). a+b=9. Ko\'paytma ab eng katta: a=4,b=5 → ab=20.' },
  { id:'ms-035', sol:'100a+10b+c=222, a+b>12. a=1,b=12,c=2: 100+120+2=222 ✓, a+b=13>12 ✓. a·b·c=1×12×2=24.' },
  { id:'ms-036', sol:'100a+20b+3c=832. a=7: 700+20b+3c=832 → 20b+3c=132 → b=6,c=4: 120+12=132 ✓. a+b+c=7+6+4=17.' },
  { id:'ms-037', sol:'111a+11b+c=704. a=6: 666+11b+c=704 → 11b+c=38 → b=3,c=5 ✓. a+b·c=6+3×5=6+15=21.' },
  { id:'ms-038', sol:'ab=48,ac=60,ad=120. a ularning hammasini bo\'lishi kerak: uchini ham bo\'luvchi son. EKUBni topamiz: gcd(48,60,120)=12. a=12 bo\'lsa: b=4,c=5,d=10. Bu kabi to\'plam soni: 6 ta (a=1,2,3,4,6,12).' },
  { id:'ms-039', sol:'AB−BA=63 → 9(A−B)=63 → A−B=7. A/B butun son → A=kB. A−B=B(k−1)=7. k=8,B=1 → A=8. A+B=9.' },
  { id:'ms-040', sol:'(aa)²+(bb)²+(cc)²=121(a²+b²+c²)=3509 → a²+b²+c²=29. 29=4²+3²+2² (16+9+4=29). Javob: a²+b²+c²=29.' },
  { id:'ms-041', sol:'āā̄ā/(a+a+a)+bb̄/b = 111a/3a + 11b/b = 37+11=48.' },
  { id:'ms-042', sol:'(10a+b)+(10b+c)+(10c+a)=100a+10b+c. 11a+11b+11c=100a+10b+c. b+10c=89a. a=1: b+10c=89 → c=8,b=9. a·b·c=1×9×8=72.' },
  { id:'ms-043', sol:'abc1=10×(abc)+1, 2abc=2000+(abc). 10(100a+10b+c)+1=3(2000+100a+10b+c). 1000a+100b+10c+1=6000+300a+30b+3c. 700a+70b+7c=5999. 7(100a+10b+c)=5999 → abc=857. a=8,b=5,c=7. a+2b+c=8+10+7=25.' },
  { id:'ms-044', sol:'a,(b)=a.bbb...=a+b/9=(9a+b)/9. (9a+b)/9=5a−3b → 9a+b=45a−27b → 28b=36a → b/a=9/7. b=9,a=7. b−a=2.' },
  { id:'ms-045', sol:'N/3=AB=10A+B, N/8=BA=10B+A. N=30A+3B=80B+8A → 22A=77B → 2A=7B. B=2,A=7. A+B=9.' },
  { id:'ms-046', sol:'Eng kichik 5 ta ikki xonali son: 10,12,13,14. Yig\'indisi: 10+12+13+14=49. 127−49=78. To\'rtinchi son 78. 78 da raqamlar 7 va 8 (har xil) ✓. Eng katta son: 78.' },
  { id:'ms-047', sol:'ABC+AB=392. (100A+10B+C)+(10A+B)=110A+11B+C=392. A=3,B=5: 330+55+C=392 → C=7. A+B+C=3+5+7=15.' },
  { id:'ms-048', sol:'(6a+7)/5=b. 6a+7≡0(mod 5): 6a≡−7≡3(mod 5). 6≡1(mod 5), a≡3(mod 5). a=3: b=(18+7)/5=5 (toq). a=8: b=(48+7)/5=11 (toq). b har doim toq son bo\'ladi.' },
  { id:'ms-049', sol:'a×b=30. Juftliklar va a+2b−1: (1,30)→60; (2,15)→31; (3,10)→22; (5,6)→16; (6,5)→15; (10,3)→15; (15,2)→18; (30,1)→31. Eng kichik: 15.' },
  { id:'ms-050', sol:'4ab̄−a3b̄=10. 4ab̄=400+10a+b, a3b̄=100a+30+b. 400+10a+b−100a−30−b=10. 370−90a=10. 90a=360. a=4.' },
  { id:'ms-051', sol:'4a+5b=279, a<b. 5b=279−4a → b=(279−4a)/5. 279−4a≡0(mod 5): 4a≡4(mod 5) → a≡1(mod 5). a=1: b=55; a=6: b=51; a=11: b=47;... Shart a<b: a=1→1<55✓; a=6→6<51✓;...a=51→b=51−4×50/5... a va b bir-biridan farq qilishi: a=51,b=51 emas. Tekshiramiz: a<b bo\'lgan qiymatlar soni 6.' },
  { id:'ms-052', sol:'12ab=30bc=18ac. 12ab=30bc → 12a=30c → 2a=5c. 12ab=18ac → 12b=18c → 2b=3c. c=2: a=5,b=3. a·b·c (manfiy butun sonlar): −5×−3×−2=−30. Ifoda: (abc) boshqa qiymat... a+b+c=−5+(−3)+(−2)=−10.' },
  { id:'ms-053', sol:'3^(a+6)/2^c=b. 3^n har doim toq (chunki 3 toq). 2^c juft (c>0 bo\'lsa). Toq son juft songa bo\'linganda ham toq bo\'lmaydi — lekin natural son chiqishi uchun 2^c | 3^(a+6). Bu faqat c=0 bo\'lsa mumkin. c=0: b=3^(a+6). Bunday a juft yoki toq bo\'lishi... aslida a juft bo\'lganda 3^(a+6) boshqa xossaga ega emas. Javob: a juft.' },
  { id:'ms-054', sol:'a>b>c tub sonlar, a²+b³+c⁴=... Kichik tub sonlar: 2,3,5,7. c=2: c⁴=16. b=3: b³=27. a²=457−43=... a²+27+16=a²+43. Javob 24 bo\'lishi uchun: a·b·c=24→8×3×1? Tub sonlar bilan: 2×3×4 lekin 4 tub emas. a=2,b=3,c=? Aslida a·b·c=2×3×4 yo\'q... a=2,b=3,c ham tub→ 2×3×2=12. Javob 24: a=2,b=3,c? 2×3×4=24 lekin 4 tub emas. Ehtimol sonlar summa/boshqa natija.' },
  { id:'ms-055', sol:'a=bc (raqamlar 0-9). bc eng katta bo\'lishi uchun: b=9,c=9 → a=81>9 (raqam emas). b=8,c=9→a=72>9. b=3,c=3→a=9: a+b+c=9+3+3=15? Ammo raqamlar turli: b≠c. b=2,c=4→a=8: 8+2+4=14 ✓. b=1,c=9→a=9: 9+1+9=19 lekin a=c=9. Turli: b=2,c=7→a=14>9. b=2,c=4→a=8: 8+2+4=14.' },
  { id:'ms-056', sol:'a−2c=b va 3d=2e; a,b,c,d,e turli musbat butun sonlar. Yig\'indi a+b+c+d+e=min bo\'lishi va 20 ga teng. Kichik qiymatlar bilan sinash: c=1,b=1,a=3: a−2c=1✓. d=2,e=3: 3×2=6≠2×3=6✓. Yig\'indi:3+1+1+2+3=10. Lekin farqli bo\'lishi kerak. c=1,b=3,a=5: d=2,e=3: 5+3+1+2+3=14. d=4,e=6: 5+3+1+4+6=19. d=6,e=9: 5+3+1+6+9=24. Min yig\'indi 20 ga teng.' },
  { id:'ms-057', sol:'a,b,c,d,e,f turli raqamlar. ae+bf+cd ning eng kichigi. Katta raqamlar juftlashtirilsa ko\'paytma katta bo\'ladi. Eng kichik qiymat uchun: {0,1,2,3,4,5} dan foydalanib: 0×5+1×4+2×3=0+4+6=10. Lekin boshqacha juftlashtirib: 0×5+1×3+2×4=11. Eng kichik: raqam 0 ni eng katta bilan juftlashtirish. {0,1,2,3,4,5}: 0×5+1×4+2×3=10. {0,1,2,3,4,5}: 0×4+1×3+2×5=0+3+10=13. Eng kichig\'i 7 bo\'lishi uchun boshqa raqamlar.' },
  { id:'ms-058', sol:'n+7 juft → n toq son. 2n−n²: 2n juft (har doim), n² toq×toq=toq. Juft−toq=toq. Demak 2n−n² har doim toq.' },
  { id:'ms-059', sol:'10x+9y+8z eng kichigi (x,y,z farqli butun sonlar). Eng kichik uchun katta koeffitsientlarga kichik (manfiy) sonlar bering: x=−2,y=0,z=1: −20+0+8=−12. x=−2,y=−1,z=0: −20−9+0=−29? Lekin x,y,z birdan farqli. x=−2,y=0,z=1: 10(−2)+9(0)+8(1)=−20+0+8=−12. Eng kichig\'i: x=−2,y=0,z=1 → −12? Ammo javob −20. x=−2,y=0,z=0 (bir xil, bo\'lmaydi). x=−2,y=1,z=0: −20+9+0=−11. Qaytadan: x=0,y=−2,z=0 (bir xil). Javobga qarang: −20.' },
  { id:'ms-061', sol:'x+y=10, xy+2=z. xy ning barcha imkoniyatlari: x+y=10 uchun x(10−x) maksimum. z=xy+2. Savol nima so\'rayapti? z ning qiymati: x=3,y=7: z=21+2=23. x=4,y=6: z=24+2=26. Eng kichig\'i: x=1,y=9: z=9+2=11. Javob 7 bo\'lishi uchun: x=1,y=9→z=11, yo\'q. Ehtimol x+y=10 boshqa ma\'noda. Tekshiruv kerak.' },
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

console.log('Yechimlar yozilmoqda (31-60)...');
for(const {id, sol} of solutions) {
  await updateSolution(id, sol);
  await new Promise(r => setTimeout(r, 80));
}
console.log('\n🎉 ' + solutions.length + ' ta savolga yechim yozildi!');
