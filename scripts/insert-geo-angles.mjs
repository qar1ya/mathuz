import { createClient } from '@supabase/supabase-js';
const supabase = createClient(
  'https://cngkzlkreddsdpjqflsb.supabase.co',
  'sb_publishable_XBtykx-ZbWc1326el4G5SA_JEgpuDOo'
);

// ── SVG helpers (same math as AngleProblemsSitegeo1.jsx) ─────────────────────
const TWO_PI = 2 * Math.PI;
function sd(a1,a2){return(((a2-a1+Math.PI)%TWO_PI)+TWO_PI)%TWO_PI-Math.PI;}
function arc(C,r,a1,a2,n=20){const d=sd(a1,a2),pts=[];for(let i=0;i<=n;i++){const a=a1+(d*i)/n;pts.push(`${(C[0]+r*Math.cos(a)).toFixed(1)},${(C[1]+r*Math.sin(a)).toFixed(1)}`);}return`M ${pts.join(' L ')}`;}
function bp(C,r,a1,a2){const d=sd(a1,a2),a=a1+d/2;return[C[0]+r*Math.cos(a),C[1]+r*Math.sin(a)];}
function xy(O,deg,r){const a=(deg*Math.PI)/180;return[O[0]+r*Math.cos(a),O[1]-r*Math.sin(a)];}
function sa(deg){return-((deg*Math.PI)/180);}

// ── Renderers ────────────────────────────────────────────────────────────────
function rayFan(segs){
  const W=320,H=160,O=[W/2,H-18],R=108;
  let c=0;const b=[0];segs.forEach(s=>{c+=s.deg;b.push(c);});
  const rays=b.slice(1,-1).map(v=>{const[x,y]=xy(O,v,R);return`<line x1="${O[0]}" y1="${O[1]}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" stroke="#1f2937" stroke-width="1.7"/>`;}).join('');
  const arcs=segs.map((s,i)=>{if(!s.label)return'';const a1=sa(b[i]),a2=sa(b[i+1]),rr=26+i*5;const[mx,my]=bp(O,rr+14,a1,a2);return`<path d="${arc(O,rr,a1,a2)}" fill="none" stroke="#2563eb" stroke-width="1.5"/><text x="${mx.toFixed(1)}" y="${my.toFixed(1)}" font-size="13.5" fill="#2563eb" text-anchor="middle">${s.label}</text>`;}).join('');
  return`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:340px"><rect width="${W}" height="${H}" fill="white"/><line x1="18" y1="${H-18}" x2="${W-18}" y2="${H-18}" stroke="#9ca3af" stroke-width="1.3"/>${rays}${arcs}<circle cx="${O[0]}" cy="${O[1]}" r="2.2" fill="#1f2937"/></svg>`;
}

function bisector(half){
  const vis=Math.min(half,75),W=280,H=150,O=[50,H-18],R=100;
  const[px,py]=xy(O,vis*2,R),[bx,by]=xy(O,vis,R*0.85);
  const a0=sa(0),a1=sa(vis),a2=sa(vis*2);
  const[m1x,m1y]=bp(O,42,a0,a1),[m2x,m2y]=bp(O,44,a1,a2);
  return`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:300px"><rect width="${W}" height="${H}" fill="white"/><line x1="18" y1="${H-18}" x2="${W-18}" y2="${H-18}" stroke="#9ca3af" stroke-width="1.3"/><line x1="${O[0]}" y1="${O[1]}" x2="${px.toFixed(1)}" y2="${py.toFixed(1)}" stroke="#1f2937" stroke-width="1.7"/><line x1="${O[0]}" y1="${O[1]}" x2="${bx.toFixed(1)}" y2="${by.toFixed(1)}" stroke="#16a34a" stroke-width="1.5" stroke-dasharray="4,3"/><path d="${arc(O,26,a0,a1)}" fill="none" stroke="#2563eb" stroke-width="1.4"/><path d="${arc(O,28,a1,a2)}" fill="none" stroke="#2563eb" stroke-width="1.4"/><text x="${m1x.toFixed(1)}" y="${m1y.toFixed(1)}" font-size="13" fill="#2563eb" text-anchor="middle">${half}°</text><text x="${m2x.toFixed(1)}" y="${m2y.toFixed(1)}" font-size="13" fill="#2563eb" text-anchor="middle">${half}°</text><circle cx="${O[0]}" cy="${O[1]}" r="2.2" fill="#1f2937"/></svg>`;
}

function adjBis(right,half,on){
  const left=180-right,W=320,H=150,O=[W/2,H-18],R=105;
  const bd=on==='right'?half:right+half;
  const[pmx,pmy]=xy(O,right,R),[pbx,pby]=xy(O,bd,R*0.85);
  const a0=sa(0),aM=sa(right),aE=sa(180);
  const[r1x,r1y]=bp(O,30,a0,aM),[l1x,l1y]=bp(O,32,aM,aE),[lbx,lby]=xy(O,bd,R*0.85+14);
  return`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:340px"><rect width="${W}" height="${H}" fill="white"/><line x1="18" y1="${H-18}" x2="${W-18}" y2="${H-18}" stroke="#9ca3af" stroke-width="1.3"/><line x1="${O[0]}" y1="${O[1]}" x2="${pmx.toFixed(1)}" y2="${pmy.toFixed(1)}" stroke="#1f2937" stroke-width="1.7"/><line x1="${O[0]}" y1="${O[1]}" x2="${pbx.toFixed(1)}" y2="${pby.toFixed(1)}" stroke="#16a34a" stroke-width="1.5" stroke-dasharray="4,3"/><path d="${arc(O,24,a0,aM)}" fill="none" stroke="#2563eb" stroke-width="1.4"/><path d="${arc(O,26,aM,aE)}" fill="none" stroke="#2563eb" stroke-width="1.4"/><text x="${r1x.toFixed(1)}" y="${r1y.toFixed(1)}" font-size="13" fill="#2563eb" text-anchor="middle">${right}°</text><text x="${l1x.toFixed(1)}" y="${l1y.toFixed(1)}" font-size="13" fill="#2563eb" text-anchor="middle">${left}°</text><text x="${lbx.toFixed(1)}" y="${lby.toFixed(1)}" font-size="12" fill="#16a34a" text-anchor="middle">${half}°+${half}°</text><circle cx="${O[0]}" cy="${O[1]}" r="2.2" fill="#1f2937"/></svg>`;
}

function doubleBis(right){
  const left=180-right,b1=right/2,b2=right+left/2,W=320,H=150,O=[W/2,H-18],R=105;
  const[pmx,pmy]=xy(O,right,R),[p1x,p1y]=xy(O,b1,R*0.9),[p2x,p2y]=xy(O,b2,R*0.9);
  const a0=sa(0),aM=sa(right),aE=sa(180),ab1=sa(b1),ab2=sa(b2);
  const[r1x,r1y]=bp(O,28,a0,aM),[l1x,l1y]=bp(O,30,aM,aE),[mx,my]=bp(O,46,ab1,ab2);
  return`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:340px"><rect width="${W}" height="${H}" fill="white"/><line x1="18" y1="${H-18}" x2="${W-18}" y2="${H-18}" stroke="#9ca3af" stroke-width="1.3"/><line x1="${O[0]}" y1="${O[1]}" x2="${pmx.toFixed(1)}" y2="${pmy.toFixed(1)}" stroke="#1f2937" stroke-width="1.7"/><line x1="${O[0]}" y1="${O[1]}" x2="${p1x.toFixed(1)}" y2="${p1y.toFixed(1)}" stroke="#16a34a" stroke-width="1.4" stroke-dasharray="4,3"/><line x1="${O[0]}" y1="${O[1]}" x2="${p2x.toFixed(1)}" y2="${p2y.toFixed(1)}" stroke="#16a34a" stroke-width="1.4" stroke-dasharray="4,3"/><path d="${arc(O,22,a0,aM)}" fill="none" stroke="#9ca3af" stroke-width="1.2"/><path d="${arc(O,24,aM,aE)}" fill="none" stroke="#9ca3af" stroke-width="1.2"/><path d="${arc(O,36,ab1,ab2)}" fill="none" stroke="#dc2626" stroke-width="1.6"/><text x="${r1x.toFixed(1)}" y="${r1y.toFixed(1)}" font-size="12" fill="#6b7280" text-anchor="middle">${right}°</text><text x="${l1x.toFixed(1)}" y="${l1y.toFixed(1)}" font-size="12" fill="#6b7280" text-anchor="middle">${left}°</text><text x="${mx.toFixed(1)}" y="${my.toFixed(1)}" font-size="14" fill="#dc2626" font-weight="600" text-anchor="middle">90°</text><circle cx="${O[0]}" cy="${O[1]}" r="2.2" fill="#1f2937"/></svg>`;
}

function rightPlus(bot,bl,tl){
  const W=260,H=160,O=[50,H-18],R=110;
  const[pvx,pvy]=xy(O,90,R),[prx,pry]=xy(O,bot,R*0.92);
  const a0=sa(0),aR=sa(bot),a90=sa(90);
  const[mbx,mby]=bp(O,32,a0,aR),[mtx,mty]=bp(O,34,aR,a90);
  return`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:280px"><rect width="${W}" height="${H}" fill="white"/><line x1="18" y1="${H-18}" x2="${W-18}" y2="${H-18}" stroke="#9ca3af" stroke-width="1.3"/><line x1="${O[0]}" y1="${O[1]}" x2="${pvx.toFixed(1)}" y2="${pvy.toFixed(1)}" stroke="#1f2937" stroke-width="1.7"/><line x1="${O[0]}" y1="${O[1]}" x2="${prx.toFixed(1)}" y2="${pry.toFixed(1)}" stroke="#1f2937" stroke-width="1.7"/><rect x="${O[0]}" y="${O[1]-12}" width="12" height="12" fill="none" stroke="#9ca3af" stroke-width="1"/><path d="${arc(O,26,a0,aR)}" fill="none" stroke="#2563eb" stroke-width="1.4"/><path d="${arc(O,40,aR,a90)}" fill="none" stroke="#dc2626" stroke-width="1.4"/><text x="${mbx.toFixed(1)}" y="${mby.toFixed(1)}" font-size="13" fill="#2563eb" text-anchor="middle">${bl}</text><text x="${mtx.toFixed(1)}" y="${mty.toFixed(1)}" font-size="13" fill="#dc2626" text-anchor="middle">${tl}</text><circle cx="${O[0]}" cy="${O[1]}" r="2.2" fill="#1f2937"/></svg>`;
}

function intersect(small){
  const big=180-small,W=240,H=200,O=[W/2,H/2],R=88;
  const degs=[90-small/2,90+small/2,270-small/2,270+small/2];
  const ends=degs.map(d=>xy(O,d,R));
  const regions=[[degs[0],degs[1],small],[degs[1],degs[2],big],[degs[2],degs[3],small],[degs[3],degs[0]+360,big]];
  const arcs=regions.map(([d1,d2,val])=>{const sa1=sa(d1),sa2=sa(d2);const[mx,my]=bp(O,40,sa1,sa2);return`<path d="${arc(O,26,sa1,sa2)}" fill="none" stroke="#2563eb" stroke-width="1.4"/><text x="${mx.toFixed(1)}" y="${my.toFixed(1)}" font-size="12.5" fill="#2563eb" text-anchor="middle">${val}°</text>`;}).join('');
  return`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:260px"><rect width="${W}" height="${H}" fill="white"/><line x1="${ends[0][0].toFixed(1)}" y1="${ends[0][1].toFixed(1)}" x2="${ends[2][0].toFixed(1)}" y2="${ends[2][1].toFixed(1)}" stroke="#1f2937" stroke-width="1.7"/><line x1="${ends[1][0].toFixed(1)}" y1="${ends[1][1].toFixed(1)}" x2="${ends[3][0].toFixed(1)}" y2="${ends[3][1].toFixed(1)}" stroke="#1f2937" stroke-width="1.7"/>${arcs}<circle cx="${O[0]}" cy="${O[1]}" r="2.2" fill="#1f2937"/></svg>`;
}

function makeSvg(d){
  if(!d)return null;
  switch(d.type){
    case'rayfan':return rayFan(d.segments);
    case'bisector':return bisector(d.half);
    case'adjbisector':return adjBis(d.right,d.half,d.on);
    case'doublebis':return doubleBis(d.right);
    case'rightplus':return rightPlus(d.bottom,d.bl,d.tl);
    case'intersect':return intersect(d.small);
    default:return null;
  }
}

// ── Diagram presets ──────────────────────────────────────────────────────────
const acute1={type:'rayfan',segments:[{deg:130,label:null},{deg:50,label:'α'}]};
const obtuse1={type:'rayfan',segments:[{deg:50,label:null},{deg:130,label:'α'}]};
const acuteAdj={type:'rayfan',segments:[{deg:125,label:'β'},{deg:55,label:'α'}]};
const obtuseAdj={type:'rayfan',segments:[{deg:55,label:'β'},{deg:125,label:'α'}]};
const adj=(right,left)=>({type:'rayfan',segments:[{deg:left,label:'β'},{deg:right,label:'α'}]});
const fan3=(a,b,c,la='γ',lb='β',lc='α')=>({type:'rayfan',segments:[{deg:a,label:la},{deg:b,label:lb},{deg:c,label:lc}]});

// ── All 91 problems ──────────────────────────────────────────────────────────
const P=[
  {n:1,cat:1,q:"O'tkir burchakning sinusi 3/5 ga teng. Shu burchakning kosinusini toping.",a:'cos α = 4/5',d:acute1},
  {n:2,cat:1,q:"O'tkir burchakning kosinusi 5/13 ga teng. Shu burchakning sinusini toping.",a:'sin α = 12/13',d:acute1},
  {n:3,cat:1,q:"O'tkir burchakning sinusi 7/25 ga teng. Shu burchakning tangensini toping.",a:'tg α = 7/24',d:acute1},
  {n:4,cat:1,q:"O'tkir burchakning kosinusi 15/17 ga teng. Shu burchakning tangensini toping.",a:'tg α = 8/15',d:acute1},
  {n:5,cat:1,q:'sin α = 7/25 (0° < α < 90°). cos α ni toping.',a:'cos α = 24/25',d:acute1},
  {n:6,cat:2,q:"O'tmas burchakning sinusi 0,6 ga teng. Shu burchakning kosinusini toping.",a:'cos α = −0,8',d:obtuse1},
  {n:7,cat:2,q:"O'tmas burchakning kosinusi −24/25 ga teng. Shu burchakning sinusini toping.",a:'sin α = 7/25',d:obtuse1},
  {n:8,cat:2,q:"O'tmas burchakning kosinusi −5/13 ga teng. Shu burchakning tangensini toping.",a:'tg α = −12/5',d:obtuse1},
  {n:9,cat:2,q:'sin α = 12/13 (90° < α < 180°). cos α ni toping.',a:'cos α = −5/13',d:obtuse1},
  {n:10,cat:2,q:'cos α = −8/17 (90° < α < 180°). tg α ni toping.',a:'tg α = −15/8',d:obtuse1},
  {n:11,cat:3,q:"Qo'shni burchaklardan biri 47° ga teng. Ikkinchi burchakni toping.",a:'133°',d:adj(47,133)},
  {n:12,cat:3,q:"Qo'shni burchaklardan biri 50° ga teng bo'lsa, ikkinchi burchakni toping.",a:'130°',d:adj(50,130)},
  {n:13,cat:3,q:"O'tkir burchak 56° ga teng bo'lsa, unga qo'shni burchak necha gradusga teng bo'ladi?",a:'124°',d:adj(56,124)},
  {n:14,cat:3,q:"Kattaligi 130° ga teng bo'lgan o'tmas burchakka qo'shni bo'lgan burchak necha gradusga teng bo'ladi?",a:'50°',d:adj(130,50)},
  {n:15,cat:3,q:"Kattaligi 142° ga teng bo'lgan o'tmas burchakning qo'shni burchagi necha gradus?",a:'38°',d:adj(142,38)},
  {n:16,cat:3,q:"Kattaligi 135° bo'lgan o'tmas burchakning qo'shni burchagini toping.",a:'45°',d:adj(135,45)},
  {n:17,cat:3,q:"Qo'shni burchaklardan biri ikkinchisidan 60° ga katta bo'lsa, shu burchaklardan o'tkir burchakni toping.",a:'60°',d:adj(60,120)},
  {n:18,cat:3,q:"Qo'shni burchaklardan biri ikkinchisidan 72° ga katta. Shu burchaklardan o'tkirini toping.",a:'54°',d:adj(54,126)},
  {n:19,cat:3,q:"Qo'shni burchaklardan biri ikkinchisidan 49° ga katta. Shu burchaklardan kichigini toping.",a:'65,5°',d:adj(65.5,114.5)},
  {n:20,cat:3,q:"Qo'shni burchaklardan biri ikkinchisidan 98° ga katta. Shu burchaklardan kattasini toping.",a:'139°',d:adj(139,41)},
  {n:21,cat:3,q:"Qo'shni burchaklardan biri ikkinchisidan 67° ga katta. Shu burchaklardan o'tmasini toping.",a:'123,5°',d:adj(123.5,56.5)},
  {n:22,cat:3,q:"Qo'shni burchaklardan biri ikkinchisidan 75° katta bo'lsa, shu burchaklardan o'tmasini toping.",a:'127,5°',d:adj(127.5,52.5)},
  {n:23,cat:3,q:"Qo'shni burchaklardan biri ikkinchisidan 106° katta bo'lsa, shu burchaklarni toping.",a:'143° va 37°',d:adj(143,37)},
  {n:24,cat:3,q:"Qo'shni burchaklardan biri ikkinchisidan 100° kichik. Shu burchaklardan kattasini toping.",a:'140°',d:adj(140,40)},
  {n:25,cat:3,q:"Qo'shni burchaklardan biri ikkinchisidan 80° kichik bo'lsa, shu burchaklardan o'tmasini toping.",a:'130°',d:adj(130,50)},
  {n:26,cat:3,q:"Qo'shni burchaklardan biri ikkinchisidan 90° kichik bo'lsa, shu burchaklardan kichigini toping.",a:'45°',d:adj(45,135)},
  {n:27,cat:3,q:"Qo'shni burchaklardan biri ikkinchisidan 102° kichik bo'lsa, shu burchaklardan o'tkirini toping.",a:'39°',d:adj(39,141)},
  {n:28,cat:3,q:"Qo'shni burchaklardan biri ikkinchisidan 3 marta katta bo'lsa, shu burchaklarni toping.",a:"45° va 135°",d:adj(45,135)},
  {n:29,cat:3,q:"Qo'shni burchaklardan biri ikkinchisidan 5 marta katta. Shu burchaklarning kichigini toping.",a:'30°',d:adj(30,150)},
  {n:30,cat:3,q:"Qo'shni burchaklarning o'tmasi o'tkiridan 11 marta katta bo'lsa, shu burchaklarning o'tmasini toping.",a:'165°',d:adj(165,15)},
  {n:31,cat:3,q:"Qo'shni burchaklar o'zaro 2:7 nisbatda bo'lsa, shu burchaklarni toping.",a:'40° va 140°',d:adj(40,140)},
  {n:32,cat:3,q:"Qo'shni burchaklar o'zaro 4:5 nisbatda bo'lsa, shu burchaklarni toping.",a:'80° va 100°',d:adj(80,100)},
  {n:33,cat:3,q:"Qo'shni burchaklar o'zaro 1:4 nisbatda bo'lsa, shu burchaklardan kichigini toping.",a:'36°',d:adj(36,144)},
  {n:34,cat:3,q:"Qo'shni burchaklar o'zaro 1:5 nisbatda bo'lsa, shu burchaklardan kattasini toping.",a:'150°',d:adj(150,30)},
  {n:35,cat:3,q:"Qo'shni burchaklar o'zaro 7:5 nisbatda bo'lsa, shu burchaklardan kichigini toping.",a:'75°',d:adj(75,105)},
  {n:36,cat:3,q:"Qo'shni burchaklar o'zaro 8:7 nisbatda bo'lsa, shu burchaklardan o'tmasini toping.",a:'96°',d:adj(96,84)},
  {n:37,cat:3,q:"Qo'shni burchaklardan biri ikkinchisining 4/5 qismiga teng. Shu burchaklarni toping.",a:'80° va 100°',d:adj(80,100)},
  {n:38,cat:3,q:"Qo'shni burchaklardan biri ikkinchisining 1/4 qismiga teng. Shu burchaklardan kichigini toping.",a:'36°',d:adj(36,144)},
  {n:39,cat:3,q:"Qo'shni burchaklardan biri ikkinchisining 80% ga teng bo'lsa, shu burchaklarni toping.",a:'80° va 100°',d:adj(80,100)},
  {n:40,cat:3,q:"Qo'shni burchaklarning o'tkiri o'tmasining 20% ini tashkil qiladi. Shu burchaklardan o'tmasini toping.",a:'150°',d:adj(150,30)},
  {n:41,cat:3,q:"O'tkir burchakning sinusi 0,36 ga teng. Shu burchakka qo'shni bo'lgan o'tmas burchakning sinusini toping.",a:'0,36',d:acuteAdj},
  {n:42,cat:3,q:"O'tmas burchakning sinusi 0,65 ga teng. Shu burchakka qo'shni burchakning sinusini toping.",a:'0,65',d:obtuseAdj},
  {n:43,cat:3,q:"O'tkir burchakning kosinusi 0,42 ga teng bo'lsa, shu burchakka qo'shni bo'lgan o'tmas burchakning kosinusini toping.",a:'−0,42',d:acuteAdj},
  {n:44,cat:3,q:"O'tmas burchakning kosinusi −0,72 ga teng. Shu burchakka qo'shni burchakning kosinusini toping.",a:'0,72',d:obtuseAdj},
  {n:45,cat:3,q:"O'tkir burchakning sinusi 0,6 ga teng. Shu burchakka qo'shni burchakning kosinusini toping.",a:'−0,8',d:acuteAdj},
  {n:46,cat:3,q:"O'tmas burchakning sinusi 0,6 ga teng. Shu burchakka qo'shni burchakning kosinusini toping.",a:'0,8',d:obtuseAdj},
  {n:47,cat:3,q:"O'tkir burchakning kosinusi 7/25 ga teng. Shu burchakka qo'shni burchakning sinusini toping.",a:'24/25',d:acuteAdj},
  {n:48,cat:3,q:"O'tmas burchakning kosinusi −7/25 ga teng. Shu burchakka qo'shni burchakning sinusini toping.",a:'24/25',d:obtuseAdj},
  {n:49,cat:3,q:"O'tkir burchakning sinusi 5/13 ga teng. Shu burchakka qo'shni burchakning tangensini toping.",a:'−5/12',d:acuteAdj},
  {n:50,cat:3,q:"O'tkir burchakning kosinusi 8/17 ga teng. Shu burchakka qo'shni burchakning tangensini toping.",a:'−15/8',d:acuteAdj},
  {n:51,cat:3,q:"O'tmas burchakning kosinusi −5/8 ga teng. Shu burchakka qo'shni burchakning tangensini toping.",a:'√39/5',d:obtuseAdj},
  {n:52,cat:3,q:"O'tmas burchakning kosinusi −2/3 ga teng. Shu burchakka qo'shni burchakning kotangensini toping.",a:'2√5/5',d:obtuseAdj},
  {n:53,cat:3,q:'Burchak bissektrisasi shu burchakning bir tomoni bilan 32° burchak tashkil qiladi. Burchakning o\'zini toping.',a:'64°',d:{type:'bisector',half:32}},
  {n:54,cat:3,q:'Burchak bissektrisasi shu burchakning bir tomoni bilan 35° burchak tashkil qilsa, burchakning o\'zi necha gradusga teng?',a:'70°',d:{type:'bisector',half:35}},
  {n:55,cat:3,q:'Burchak bissektrisasi uning tomoni bilan 37° burchak tashkil qilsa, shu burchakning o\'zini toping.',a:'74°',d:{type:'bisector',half:37}},
  {n:56,cat:3,q:'Burchak bissektrisasi uning tomoni bilan 75° burchak hosil qilsa, burchakning o\'zi necha gradusga teng bo\'ladi?',a:'150°',d:{type:'bisector',half:75}},
  {n:57,cat:3,q:'Burchak bissektrisasi shu burchak tomonlarining biri bilan 87° burchak hosil qilsa, burchakning o\'zi necha gradusga teng bo\'ladi?',a:'174°',d:{type:'bisector',half:87}},
  {n:58,cat:3,q:'Burchak bissektrisasi shu burchak tomonlarining biri bilan 117° burchak hosil qilsa, shu burchakning o\'zi necha gradus bo\'ladi?',a:'234°',d:{type:'bisector',half:117}},
  {n:59,cat:3,q:"O'zaro qo'shni bo'lgan burchaklardan o'tkir burchagining bissektrisasi o'tkir burchak tomonlarining biri bilan 28° burchak tashkil qiladi. Shu qo'shni burchaklarni toping.",a:'56° va 124°',d:{type:'adjbisector',right:56,half:28,on:'right'}},
  {n:60,cat:3,q:"O'zaro qo'shni bo'lgan burchaklardan o'tkir burchagining bissektrisasi o'tkir burchak tomonlarining biri bilan 33° burchak tashkil qiladi. Shu qo'shni burchaklarni toping.",a:'66° va 114°',d:{type:'adjbisector',right:66,half:33,on:'right'}},
  {n:61,cat:3,q:"O'zaro qo'shni bo'lgan burchaklardan o'tmas burchagining bissektrisasi o'tmas burchak tomonlarining biri bilan 59° burchak tashkil qiladi. Shu qo'shni burchaklarni toping.",a:'118° va 62°',d:{type:'adjbisector',right:62,half:59,on:'left'}},
  {n:62,cat:3,q:"O'zaro qo'shni bo'lgan burchaklardan o'tmas burchagining bissektrisasi o'tmas burchak tomonlarining biri bilan 62° burchak tashkil qiladi. Shu qo'shni burchaklarni toping.",a:'124° va 56°',d:{type:'adjbisector',right:56,half:62,on:'left'}},
  {n:63,cat:3,q:"Qo'shni burchaklardan birining bissektrisasi shu burchak tomonlarining biri bilan 37° burchak hosil qiladi. Qo'shni burchaklarni toping.",a:'74° va 106°',d:{type:'adjbisector',right:74,half:37,on:'right'}},
  {n:64,cat:3,q:"Qo'shni burchaklardan birining bissektrisasi shu burchak tomonlarining biri bilan 77° burchak hosil qiladi. Qo'shni burchaklarni toping.",a:'154° va 26°',d:{type:'adjbisector',right:26,half:77,on:'left'}},
  {n:65,cat:3,q:"Tasvirdagi qo'shni burchaklar (120° va 60°) bissektrisalari orasidagi burchakni toping.",a:'90°',d:{type:'doublebis',right:60}},
  {n:66,cat:3,q:"Tasvirdagi qo'shni burchaklar (135° va 45°) bissektrisalari orasidagi burchakni toping.",a:'90°',d:{type:'doublebis',right:45}},
  {n:67,cat:3,q:"67° va 113° o'zaro qo'shni burchaklar berilgan. Shu qo'shni burchaklarning bissektrisalari orasidagi burchakni toping.",a:'90°',d:{type:'doublebis',right:67}},
  {n:68,cat:3,q:"O'zaro qo'shni α va β burchaklarning bissektrisalari orasidagi burchakni toping.",a:'90°',d:{type:'doublebis',right:70}},
  {n:69,cat:4,q:"Rasmda berilgan ma'lumotlardan (53°) foydalanib α burchakni toping.",a:'37°',d:{type:'rightplus',bottom:53,bl:'53°',tl:'α'}},
  {n:70,cat:4,q:"Rasmda berilgan ma'lumotlardan (47°) foydalanib α burchakni toping.",a:'43°',d:{type:'rightplus',bottom:47,bl:'47°',tl:'α'}},
  {n:71,cat:4,q:"Rasmda berilgan ma'lumotlardan (60°) foydalanib α burchakning sinusini toping.",a:'1/2',d:{type:'rightplus',bottom:60,bl:'60°',tl:'α'}},
  {n:72,cat:4,q:"Rasmda berilgan ma'lumotlardan (30°) foydalanib α burchakning tangensini toping.",a:'√3',d:{type:'rightplus',bottom:30,bl:'30°',tl:'α'}},
  {n:73,cat:4,q:"sin α = 0,34 bo'lsa, cos β ni hisoblang (α va β — to'g'ri burchak hosil qiluvchi qo'shni burchaklar).",a:'0,34',d:{type:'rightplus',bottom:35,bl:'β',tl:'α'}},
  {n:74,cat:4,q:"cos α = 0,61 bo'lsa, sin β ni toping.",a:'0,61',d:{type:'rightplus',bottom:40,bl:'β',tl:'α'}},
  {n:75,cat:4,q:"α : β = 1 : 2 (qo'shni burchaklar). cos α ni toping.",a:'1/2',d:adj(60,120)},
  {n:76,cat:4,q:"Rasmda 5α va 7α berilgan (qo'shni burchaklar). cos 8α ni toping.",a:'−1/2',d:{type:'rayfan',segments:[{deg:75,label:'5α'},{deg:105,label:'7α'}]}},
  {n:77,cat:4,q:"α : β : γ = 3 : 4 : 5 (uchta ketma-ket burchak). sin β ni toping.",a:'√3/2',d:fan3(75,60,45)},
  {n:78,cat:4,q:"α : β : γ = 3 : 5 : 7 (uchta ketma-ket burchak). tg β ni toping.",a:'√3',d:fan3(84,60,36)},
  {n:79,cat:4,q:"Bir nuqtadan chiqqan nurlar (α+20°), (α+10°), (α−30°) burchaklarini hosil qiladi. ctg 2α ni toping.",a:'−1/√3',d:fan3(80,70,30,'α+20°','α+10°','α−30°')},
  {n:80,cat:4,q:"α : β = 2 : 3, γ − β = 20°. cos 2β ni toping.",a:'−1/2',d:fan3(80,60,40)},
  {n:81,cat:5,q:"Kesishgan ikki to'g'ri chiziqdan hosil bo'lgan burchaklardan biri 135°. α1, α2, α3 ni toping.",a:'α1 = 45°, α2 = 135°, α3 = 45°',d:{type:'intersect',small:45}},
  {n:82,cat:5,q:"Kesishgan ikki to'g'ri chiziqdan hosil bo'lgan burchaklardan biri 60°. α + β yig'indisini toping.",a:'240°',d:{type:'intersect',small:60}},
  {n:83,cat:5,q:'(140° − α) va (2α − 40°) — qarama-qarshi (vertikal) burchaklar. α ni toping.',a:'60° (burchaklar — 80° va 100°)',d:{type:'intersect',small:80}},
  {n:84,cat:5,q:'sin α2 = √3/2, α2 > 90°. α1, α3, α4 ni toping.',a:'α1 = 60°, α3 = 60°, α4 = 120°',d:{type:'intersect',small:60}},
  {n:85,cat:5,q:'tg α4 = −√3/3. α1, α2, α3 ni toping.',a:'α1 = 30°, α2 = 150°, α3 = 30°',d:{type:'intersect',small:30}},
  {n:86,cat:5,q:"Kesishishdan hosil bo'lgan burchaklardan uchtasining yig'indisi 300° (α + 2β = 300°). α, β ni toping.",a:'60° va 120°',d:{type:'intersect',small:60}},
  {n:87,cat:5,q:"O'tkir burchak va unga qo'shni ikki o'tmas burchakning yig'indisi 340° ga teng. Shu burchaklarni toping.",a:'20° va 160°',d:{type:'intersect',small:20}},
  {n:88,cat:5,q:"O'tkir burchak va unga qo'shni ikki o'tmas burchakning yig'indisi 320° ga teng. Shu burchaklarni toping.",a:'40° va 140°',d:{type:'intersect',small:40}},
  {n:89,cat:5,q:"O'tmas burchak va unga qo'shni ikki o'tkir burchakning yig'indisi 210° ga teng. Shu burchaklarni toping.",a:'150° va 30°',d:{type:'intersect',small:30}},
  {n:90,cat:5,q:"Rasmda α va (α+65°) burchaklar ikki marta takrorlanadi. α ni toping.",a:'57,5°',d:{type:'intersect',small:57.5}},
  {n:91,cat:5,q:"Kesishishdan hosil bo'lgan burchaklar o'zaro 2:3:2:3 nisbatda. Shu to'g'ri chiziqlar orasidagi o'tkir burchakni toping.",a:'72°',d:{type:'intersect',small:72}},
];

// ── Topic / difficulty ───────────────────────────────────────────────────────
const T1="O'tkir va o'tmas burchaklar";
const T5="Kesishuvchi to'g'ri chiziqlar";
const E=["DTM","Milliy Sertifikat","Maktab"];
const topic=cat=>cat===5?T5:T1;
const diff=n=>n<=52?"Oson":"O'rtacha";

const questions=P.map(p=>({
  id:`geo-a-${String(p.n).padStart(3,'0')}`,
  text:p.q,
  options:[],
  answer:p.a,
  solution:'',
  topic:topic(p.cat),
  difficulty:diff(p.n),
  exam_type:E,
  diagram_svg:makeSvg(p.d),
}));

// ── Batch insert ─────────────────────────────────────────────────────────────
const BATCH=20;
let total=0;
for(let i=0;i<questions.length;i+=BATCH){
  const batch=questions.slice(i,i+BATCH);
  const{error}=await supabase.from('questions').insert(batch);
  if(error){console.error(`Batch ${i}: ${error.message}`);process.exit(1);}
  total+=batch.length;
  console.log(`✅ ${total}/${questions.length}`);
}
console.log("🎉 Barcha 91 ta savol qo'shildi!");
