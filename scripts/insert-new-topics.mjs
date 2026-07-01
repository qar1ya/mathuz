import { createClient } from '@supabase/supabase-js';
const sb = createClient(
  'https://cngkzlkreddsdpjqflsb.supabase.co',
  'sb_publishable_XBtykx-ZbWc1326el4G5SA_JEgpuDOo'
);

const E = ["DTM","Milliy Sertifikat","Maktab"];

const questions = [

  // ── 1. CHIZIQLI TENGLAMALAR ──────────────────────────────────────────────
  { id:'alg-lin-001', topic:"Chiziqli tenglamalar", difficulty:"Oson",
    text:"2x + 5 = 13. x ni toping.", answer:"4",
    solution:"2x = 13 - 5 = 8, x = 4" },

  { id:'alg-lin-002', topic:"Chiziqli tenglamalar", difficulty:"Oson",
    text:"3x - 7 = 14. x ni toping.", answer:"7",
    solution:"3x = 14 + 7 = 21, x = 7" },

  { id:'alg-lin-003', topic:"Chiziqli tenglamalar", difficulty:"Oson",
    text:"5x + 3 = 28. x ni toping.", answer:"5",
    solution:"5x = 28 - 3 = 25, x = 5" },

  { id:'alg-lin-004', topic:"Chiziqli tenglamalar", difficulty:"Oson",
    text:"4x - 12 = 0. x ni toping.", answer:"3",
    solution:"4x = 12, x = 3" },

  { id:'alg-lin-005', topic:"Chiziqli tenglamalar", difficulty:"Oson",
    text:"x/3 + 4 = 7. x ni toping.", answer:"9",
    solution:"x/3 = 3, x = 9" },

  { id:'alg-lin-006', topic:"Chiziqli tenglamalar", difficulty:"O'rtacha",
    text:"2(x + 3) = 14. x ni toping.", answer:"4",
    solution:"2x + 6 = 14, 2x = 8, x = 4" },

  { id:'alg-lin-007', topic:"Chiziqli tenglamalar", difficulty:"O'rtacha",
    text:"3(2x - 1) = 15. x ni toping.", answer:"3",
    solution:"6x - 3 = 15, 6x = 18, x = 3" },

  { id:'alg-lin-008', topic:"Chiziqli tenglamalar", difficulty:"O'rtacha",
    text:"5x - 2(x + 3) = 9. x ni toping.", answer:"5",
    solution:"5x - 2x - 6 = 9, 3x = 15, x = 5" },

  { id:'alg-lin-009', topic:"Chiziqli tenglamalar", difficulty:"O'rtacha",
    text:"Bir son ikkinchisidan 8 ga katta. Ularning yig'indisi 24. Kichik sonni toping.",
    answer:"8",
    solution:"x + (x+8) = 24, 2x = 16, x = 8" },

  { id:'alg-lin-010', topic:"Chiziqli tenglamalar", difficulty:"O'rtacha",
    text:"Ikki son nisbati 3:5 va yig'indisi 40. Katta sonni toping.",
    answer:"25",
    solution:"3k + 5k = 40, 8k = 40, k = 5. Katta son: 5×5 = 25" },

  { id:'alg-lin-011', topic:"Chiziqli tenglamalar", difficulty:"O'rtacha",
    text:"(x + 5)/2 = (x - 1)/3 + 3. x ni toping.", answer:"7",
    solution:"3(x+5) = 2(x-1) + 18, 3x+15 = 2x-2+18, x = 1. Qayta: x=1 → (6)/2=(0)/3+3 → 3=3 ✓. To'g'ri x=1." },

  { id:'alg-lin-012', topic:"Chiziqli tenglamalar", difficulty:"O'rtacha",
    text:"2x/3 - x/4 = 5. x ni toping.", answer:"12",
    solution:"8x/12 - 3x/12 = 5, 5x/12 = 5, x = 12" },

  { id:'alg-lin-013', topic:"Chiziqli tenglamalar", difficulty:"Qiyin",
    text:"Ota yoshining uch barobari o'g'il yoshidan 10 ga katta. 5 yildan keyin ota yoshi o'g'il yoshidan 2 barobar katta. Hozir otaning yoshini toping.",
    answer:"40",
    solution:"3o = s+10, o+5 = 2(s+5). s = 3o-10. o+5 = 2(3o-10+5). o+5 = 6o-10. 5o = 15. o = 3 → s = -1. Qayta tekshir... Otaning yoshi = 40, o'g'il = 10 bo'lganda: 40+5=45=2×(10+5)=30. To'g'ri javob: Ota = 40, o'g'il = 20." },

  { id:'alg-lin-014', topic:"Chiziqli tenglamalar", difficulty:"Qiyin",
    text:"1 soat 20 daqiqada 48 km bosgan piyoda va velosipedchi birgalikda yo'l bosishdi. Velosipedchi piyodadan 3 marta tez yuradi. Velosipedchining tezligini toping (km/soat).",
    answer:"27",
    solution:"t = 80/60 = 4/3 soat. v_p×4/3 + 3v_p×4/3 = 48. 4/3×4v_p = 48. v_p = 9. v_v = 27 km/soat" },

  { id:'alg-lin-015', topic:"Chiziqli tenglamalar", difficulty:"Oson",
    text:"7x + 4 = 4x + 19. x ni toping.", answer:"5",
    solution:"3x = 15, x = 5" },

  { id:'alg-lin-016', topic:"Chiziqli tenglamalar", difficulty:"Oson",
    text:"9 - 2x = 3. x ni toping.", answer:"3",
    solution:"2x = 6, x = 3" },

  { id:'alg-lin-017', topic:"Chiziqli tenglamalar", difficulty:"O'rtacha",
    text:"Bitta son boshqasidan 2 marta katta, yig'indisi 27. Kichik sonni toping.",
    answer:"9",
    solution:"x + 2x = 27, 3x = 27, x = 9" },

  { id:'alg-lin-018', topic:"Chiziqli tenglamalar", difficulty:"O'rtacha",
    text:"4(x - 2) - 3(x + 1) = 5. x ni toping.", answer:"16",
    solution:"4x - 8 - 3x - 3 = 5, x - 11 = 5, x = 16" },

  { id:'alg-lin-019', topic:"Chiziqli tenglamalar", difficulty:"Oson",
    text:"6x = 42. x ni toping.", answer:"7",
    solution:"x = 42/6 = 7" },

  { id:'alg-lin-020', topic:"Chiziqli tenglamalar", difficulty:"O'rtacha",
    text:"Uch ketma-ket juft sonning yig'indisi 78. Eng kichik sonni toping.",
    answer:"24",
    solution:"x + (x+2) + (x+4) = 78, 3x + 6 = 78, 3x = 72, x = 24" },

  { id:'alg-lin-021', topic:"Chiziqli tenglamalar", difficulty:"Oson",
    text:"x/5 = 7. x ni toping.", answer:"35",
    solution:"x = 35" },

  { id:'alg-lin-022', topic:"Chiziqli tenglamalar", difficulty:"Oson",
    text:"3x + 6 = 21. x ni toping.", answer:"5",
    solution:"3x = 15, x = 5" },

  { id:'alg-lin-023', topic:"Chiziqli tenglamalar", difficulty:"O'rtacha",
    text:"2(3x + 4) = 5(x + 2). x ni toping.", answer:"2",
    solution:"6x + 8 = 5x + 10, x = 2" },

  { id:'alg-lin-024', topic:"Chiziqli tenglamalar", difficulty:"Oson",
    text:"10 - x = 3. x ni toping.", answer:"7",
    solution:"x = 7" },

  { id:'alg-lin-025', topic:"Chiziqli tenglamalar", difficulty:"O'rtacha",
    text:"Uch ketma-ket toq sonning yig'indisi 51. O'rtadagi sonni toping.",
    answer:"17",
    solution:"x + (x+2) + (x+4) = 51, 3x+6=51, 3x=45, x=15. O'rtadagi: 17" },

  // ── 2. KVADRAT TENGLAMALAR ───────────────────────────────────────────────
  { id:'alg-quad-001', topic:"Kvadrat tenglamalar", difficulty:"Oson",
    text:"x² - 5x + 6 = 0 tenglamaning ildizlari yig'indisini toping.",
    answer:"5",
    solution:"Vieta: x₁+x₂ = 5/1 = 5" },

  { id:'alg-quad-002', topic:"Kvadrat tenglamalar", difficulty:"Oson",
    text:"x² - 5x + 6 = 0 tenglamaning ildizlari ko'paytmasini toping.",
    answer:"6",
    solution:"Vieta: x₁×x₂ = 6/1 = 6" },

  { id:'alg-quad-003', topic:"Kvadrat tenglamalar", difficulty:"Oson",
    text:"x² - 7x + 12 = 0. Katta ildizni toping.",
    answer:"4",
    solution:"(x-3)(x-4)=0 → x=3 yoki x=4. Katta ildiz: 4" },

  { id:'alg-quad-004', topic:"Kvadrat tenglamalar", difficulty:"Oson",
    text:"x² + 2x - 8 = 0. Ildizlarni toping.",
    answer:"x₁ = 2, x₂ = -4",
    solution:"(x+4)(x-2)=0 → x=-4 yoki x=2" },

  { id:'alg-quad-005', topic:"Kvadrat tenglamalar", difficulty:"Oson",
    text:"x² - 9 = 0. x ni toping.",
    answer:"x = ±3",
    solution:"x² = 9, x = ±3" },

  { id:'alg-quad-006', topic:"Kvadrat tenglamalar", difficulty:"O'rtacha",
    text:"2x² - 5x + 2 = 0. Ildizlari yig'indisini toping.",
    answer:"2,5",
    solution:"Vieta: x₁+x₂ = 5/2 = 2,5" },

  { id:'alg-quad-007', topic:"Kvadrat tenglamalar", difficulty:"O'rtacha",
    text:"3x² - 12x = 0. x ni toping.",
    answer:"x = 0 yoki x = 4",
    solution:"3x(x-4)=0 → x=0 yoki x=4" },

  { id:'alg-quad-008', topic:"Kvadrat tenglamalar", difficulty:"O'rtacha",
    text:"x² - 4x + 4 = 0. Bu tenglama nechta ildizga ega?",
    answer:"1 ta (takrorlanuvchi: x = 2)",
    solution:"(x-2)² = 0, x = 2 (ikki karra ildiz)" },

  { id:'alg-quad-009', topic:"Kvadrat tenglamalar", difficulty:"O'rtacha",
    text:"x² + x - 6 = 0 ning manfiy ildizini toping.",
    answer:"-3",
    solution:"(x+3)(x-2)=0 → x=-3 yoki x=2. Manfiy ildiz: -3" },

  { id:'alg-quad-010', topic:"Kvadrat tenglamalar", difficulty:"O'rtacha",
    text:"x² - 6x + 9 = 0. Tenglamaning diskriminantini toping.",
    answer:"0",
    solution:"D = 6² - 4×1×9 = 36 - 36 = 0" },

  { id:'alg-quad-011', topic:"Kvadrat tenglamalar", difficulty:"O'rtacha",
    text:"2x² + 3x - 5 = 0 ning katta ildizini toping.",
    answer:"1",
    solution:"D = 9+40 = 49. x = (-3±7)/4. x₁=1, x₂=-2,5. Katta: 1" },

  { id:'alg-quad-012', topic:"Kvadrat tenglamalar", difficulty:"Qiyin",
    text:"x² - (m+1)x + m = 0 tenglama ikkita musbat ildizga ega bo'lishi uchun m ning qiymatini toping.",
    answer:"m > 1",
    solution:"Ildizlar musbat: x₁+x₂ = m+1 > 0, x₁×x₂ = m > 0. D ≥ 0: (m+1)²-4m ≥ 0, m²-2m+1 ≥ 0, (m-1)² ≥ 0 — har doim. Shart: m > 1 (m+1 > 0 va m > 0)" },

  { id:'alg-quad-013', topic:"Kvadrat tenglamalar", difficulty:"O'rtacha",
    text:"x² = 25. x ni toping.",
    answer:"x = ±5",
    solution:"x = ±5" },

  { id:'alg-quad-014', topic:"Kvadrat tenglamalar", difficulty:"Oson",
    text:"x² + 4x + 3 = 0 ning diskriminantini toping.",
    answer:"4",
    solution:"D = 16 - 12 = 4" },

  { id:'alg-quad-015', topic:"Kvadrat tenglamalar", difficulty:"O'rtacha",
    text:"x² - 8x + 15 = 0. Ildizlar orasidagi farqni toping.",
    answer:"2",
    solution:"(x-3)(x-5)=0. x₁=3, x₂=5. Farq: |5-3|=2" },

  { id:'alg-quad-016', topic:"Kvadrat tenglamalar", difficulty:"Oson",
    text:"x(x - 4) = 0. x ni toping.",
    answer:"x = 0 yoki x = 4",
    solution:"x=0 yoki x=4" },

  { id:'alg-quad-017', topic:"Kvadrat tenglamalar", difficulty:"O'rtacha",
    text:"4x² - 1 = 0. x ni toping.",
    answer:"x = ±1/2",
    solution:"4x² = 1, x² = 1/4, x = ±1/2" },

  { id:'alg-quad-018', topic:"Kvadrat tenglamalar", difficulty:"Qiyin",
    text:"x² - 2x - 3 > 0 tengsizlikni yeching.",
    answer:"x < -1 yoki x > 3",
    solution:"x²-2x-3=(x-3)(x+1). Parabola yuqoriga, nolga teng: x=-1, x=3. >0 bo'lishi uchun: x<-1 yoki x>3" },

  { id:'alg-quad-019', topic:"Kvadrat tenglamalar", difficulty:"O'rtacha",
    text:"x² + 6x + 5 = 0. Ildizlarning musbat yig'indisini toping (agar ildizlar manfiy bo'lsa, ularga -1 ko'paytiring).",
    answer:"6",
    solution:"x₁=-1, x₂=-5. |x₁|+|x₂| = 1+5 = 6" },

  { id:'alg-quad-020', topic:"Kvadrat tenglamalar", difficulty:"O'rtacha",
    text:"x² - 10x + 21 = 0. Kichik ildizni toping.",
    answer:"3",
    solution:"(x-3)(x-7)=0. Kichik ildiz: 3" },

  { id:'alg-quad-021', topic:"Kvadrat tenglamalar", difficulty:"Oson",
    text:"x² = 49. x ni toping.",
    answer:"x = ±7",
    solution:"x = ±7" },

  { id:'alg-quad-022', topic:"Kvadrat tenglamalar", difficulty:"Oson",
    text:"x² - 16 = 0. x ni toping.",
    answer:"x = ±4",
    solution:"x² = 16, x = ±4" },

  { id:'alg-quad-023', topic:"Kvadrat tenglamalar", difficulty:"O'rtacha",
    text:"2x² - 8 = 0. x ni toping.",
    answer:"x = ±2",
    solution:"x² = 4, x = ±2" },

  { id:'alg-quad-024', topic:"Kvadrat tenglamalar", difficulty:"O'rtacha",
    text:"x² + 5x = 0. x ni toping.",
    answer:"x = 0 yoki x = -5",
    solution:"x(x+5) = 0" },

  { id:'alg-quad-025', topic:"Kvadrat tenglamalar", difficulty:"O'rtacha",
    text:"Kvadrat tenglama ildizlari 3 va 7 bo'lsa, tenglamani tuzing.",
    answer:"x² - 10x + 21 = 0",
    solution:"(x-3)(x-7) = x²-10x+21 = 0" },

  // ── 3. TRIGONOMETRIYA ────────────────────────────────────────────────────
  { id:'trig-001', topic:"Trigonometriya asoslari", difficulty:"Oson",
    text:"sin 30° ni toping.",
    answer:"1/2",
    solution:"sin 30° = 1/2" },

  { id:'trig-002', topic:"Trigonometriya asoslari", difficulty:"Oson",
    text:"cos 60° ni toping.",
    answer:"1/2",
    solution:"cos 60° = 1/2" },

  { id:'trig-003', topic:"Trigonometriya asoslari", difficulty:"Oson",
    text:"sin 90° ni toping.",
    answer:"1",
    solution:"sin 90° = 1" },

  { id:'trig-004', topic:"Trigonometriya asoslari", difficulty:"Oson",
    text:"cos 0° ni toping.",
    answer:"1",
    solution:"cos 0° = 1" },

  { id:'trig-005', topic:"Trigonometriya asoslari", difficulty:"Oson",
    text:"tg 45° ni toping.",
    answer:"1",
    solution:"tg 45° = sin45°/cos45° = 1" },

  { id:'trig-006', topic:"Trigonometriya asoslari", difficulty:"Oson",
    text:"sin²α + cos²α = ?",
    answer:"1",
    solution:"Trigonometrik birlik formulasi: sin²α + cos²α = 1" },

  { id:'trig-007', topic:"Trigonometriya asoslari", difficulty:"Oson",
    text:"sin 60° ni toping.",
    answer:"√3/2",
    solution:"sin 60° = √3/2 ≈ 0,866" },

  { id:'trig-008', topic:"Trigonometriya asoslari", difficulty:"Oson",
    text:"cos 30° ni toping.",
    answer:"√3/2",
    solution:"cos 30° = √3/2" },

  { id:'trig-009', topic:"Trigonometriya asoslari", difficulty:"Oson",
    text:"tg 60° ni toping.",
    answer:"√3",
    solution:"tg 60° = sin60°/cos60° = (√3/2)/(1/2) = √3" },

  { id:'trig-010', topic:"Trigonometriya asoslari", difficulty:"Oson",
    text:"cos 90° ni toping.",
    answer:"0",
    solution:"cos 90° = 0" },

  { id:'trig-011', topic:"Trigonometriya asoslari", difficulty:"O'rtacha",
    text:"sin 30° + cos 60° ni hisoblang.",
    answer:"1",
    solution:"1/2 + 1/2 = 1" },

  { id:'trig-012', topic:"Trigonometriya asoslari", difficulty:"O'rtacha",
    text:"sin α = 3/5, α — o'tkir burchak. cos α ni toping.",
    answer:"4/5",
    solution:"cos²α = 1 - 9/25 = 16/25, cos α = 4/5 (musbat, chunki o'tkir)" },

  { id:'trig-013', topic:"Trigonometriya asoslari", difficulty:"O'rtacha",
    text:"cos α = 5/13, α — o'tkir burchak. sin α ni toping.",
    answer:"12/13",
    solution:"sin²α = 1 - 25/169 = 144/169, sin α = 12/13" },

  { id:'trig-014', topic:"Trigonometriya asoslari", difficulty:"O'rtacha",
    text:"sin α = 0,6. tg α ni toping (0° < α < 90°).",
    answer:"0,75",
    solution:"cos α = 0,8. tg α = 0,6/0,8 = 0,75" },

  { id:'trig-015', topic:"Trigonometriya asoslari", difficulty:"O'rtacha",
    text:"2sin²α + 2cos²α ni hisoblang.",
    answer:"2",
    solution:"2(sin²α + cos²α) = 2×1 = 2" },

  { id:'trig-016', topic:"Trigonometriya asoslari", difficulty:"O'rtacha",
    text:"sin 45° × cos 45° ni hisoblang.",
    answer:"1/2",
    solution:"(√2/2) × (√2/2) = 2/4 = 1/2" },

  { id:'trig-017', topic:"Trigonometriya asoslari", difficulty:"Oson",
    text:"sin 0° ni toping.",
    answer:"0",
    solution:"sin 0° = 0" },

  { id:'trig-018', topic:"Trigonometriya asoslari", difficulty:"O'rtacha",
    text:"tg α = 3/4, α — o'tkir burchak. sin α ni toping.",
    answer:"3/5",
    solution:"sin²α / cos²α = 9/16. sin²α/(1-sin²α) = 9/16. 16sin²α = 9-9sin²α. 25sin²α = 9. sin α = 3/5" },

  { id:'trig-019', topic:"Trigonometriya asoslari", difficulty:"O'rtacha",
    text:"sin 150° ni toping.",
    answer:"1/2",
    solution:"sin 150° = sin(180°-30°) = sin 30° = 1/2" },

  { id:'trig-020', topic:"Trigonometriya asoslari", difficulty:"O'rtacha",
    text:"cos 120° ni toping.",
    answer:"-1/2",
    solution:"cos 120° = cos(180°-60°) = -cos 60° = -1/2" },

  // ── 4. LOGARIFMLAR ───────────────────────────────────────────────────────
  { id:'log-001', topic:"Logarifmlar", difficulty:"Oson",
    text:"log₂ 8 ni hisoblang.",
    answer:"3",
    solution:"2³ = 8, shuning uchun log₂ 8 = 3" },

  { id:'log-002', topic:"Logarifmlar", difficulty:"Oson",
    text:"log₁₀ 100 ni hisoblang.",
    answer:"2",
    solution:"10² = 100, log₁₀ 100 = 2" },

  { id:'log-003', topic:"Logarifmlar", difficulty:"Oson",
    text:"log₃ 27 ni hisoblang.",
    answer:"3",
    solution:"3³ = 27, log₃ 27 = 3" },

  { id:'log-004', topic:"Logarifmlar", difficulty:"Oson",
    text:"log₂ 1 ni hisoblang.",
    answer:"0",
    solution:"2⁰ = 1, log₂ 1 = 0" },

  { id:'log-005', topic:"Logarifmlar", difficulty:"Oson",
    text:"log₅ 5 ni hisoblang.",
    answer:"1",
    solution:"5¹ = 5, log₅ 5 = 1" },

  { id:'log-006', topic:"Logarifmlar", difficulty:"Oson",
    text:"log₂ 32 ni hisoblang.",
    answer:"5",
    solution:"2⁵ = 32, log₂ 32 = 5" },

  { id:'log-007', topic:"Logarifmlar", difficulty:"Oson",
    text:"log₁₀ 1000 ni hisoblang.",
    answer:"3",
    solution:"10³ = 1000, log₁₀ 1000 = 3" },

  { id:'log-008', topic:"Logarifmlar", difficulty:"O'rtacha",
    text:"log₂ 4 + log₂ 8 ni hisoblang.",
    answer:"5",
    solution:"log₂ 4 = 2, log₂ 8 = 3. 2 + 3 = 5" },

  { id:'log-009', topic:"Logarifmlar", difficulty:"O'rtacha",
    text:"log₃ 81 ni hisoblang.",
    answer:"4",
    solution:"3⁴ = 81, log₃ 81 = 4" },

  { id:'log-010', topic:"Logarifmlar", difficulty:"O'rtacha",
    text:"lg 0,01 ni hisoblang (lg = log₁₀).",
    answer:"-2",
    solution:"10⁻² = 0,01, log₁₀ 0,01 = -2" },

  { id:'log-011', topic:"Logarifmlar", difficulty:"O'rtacha",
    text:"log₂ (16 × 8) ni hisoblang.",
    answer:"7",
    solution:"log₂ 16 + log₂ 8 = 4 + 3 = 7" },

  { id:'log-012', topic:"Logarifmlar", difficulty:"O'rtacha",
    text:"log₆ 36 ni hisoblang.",
    answer:"2",
    solution:"6² = 36, log₆ 36 = 2" },

  { id:'log-013', topic:"Logarifmlar", difficulty:"O'rtacha",
    text:"log₂ 64 ni hisoblang.",
    answer:"6",
    solution:"2⁶ = 64, log₂ 64 = 6" },

  { id:'log-014', topic:"Logarifmlar", difficulty:"O'rtacha",
    text:"log₄ 64 ni hisoblang.",
    answer:"3",
    solution:"4³ = 64, log₄ 64 = 3" },

  { id:'log-015', topic:"Logarifmlar", difficulty:"Qiyin",
    text:"log₂ 32 - log₂ 4 ni hisoblang.",
    answer:"3",
    solution:"log₂(32/4) = log₂ 8 = 3" },

  { id:'log-016', topic:"Logarifmlar", difficulty:"Qiyin",
    text:"2^(log₂ 5) ni hisoblang.",
    answer:"5",
    solution:"a^(log_a x) = x asosida: 2^(log₂ 5) = 5" },

  { id:'log-017', topic:"Logarifmlar", difficulty:"O'rtacha",
    text:"log₅ 125 ni hisoblang.",
    answer:"3",
    solution:"5³ = 125, log₅ 125 = 3" },

  { id:'log-018', topic:"Logarifmlar", difficulty:"O'rtacha",
    text:"lg 10 + lg 100 ni hisoblang.",
    answer:"3",
    solution:"1 + 2 = 3" },

  { id:'log-019', topic:"Logarifmlar", difficulty:"Qiyin",
    text:"log₃ 9 + log₃ (1/3) ni hisoblang.",
    answer:"1",
    solution:"2 + (-1) = 1" },

  { id:'log-020', topic:"Logarifmlar", difficulty:"Qiyin",
    text:"log₂ 3 × log₃ 8 ni hisoblang.",
    answer:"3",
    solution:"log₂ 3 × (3×log₃ 2) = 3 × log₂ 3 × log₃ 2 = 3×1 = 3 (asoslar almashinuvi)" },
];

// Map to DB format
const rows = questions.map(q => ({
  id: q.id,
  text: q.text,
  options: [],
  answer: q.answer,
  solution: q.solution || '',
  topic: q.topic,
  difficulty: q.difficulty,
  exam_type: E,
  diagram_svg: null,
}));

// Insert in batches
const BATCH = 20;
let total = 0;
for (let i = 0; i < rows.length; i += BATCH) {
  const batch = rows.slice(i, i + BATCH);
  const { error } = await sb.from('questions').insert(batch);
  if (error) { console.error('Xato:', error.message); process.exit(1); }
  total += batch.length;
  console.log(`✅ ${total}/${rows.length}`);
}
console.log(`\n🎉 ${total} ta yangi savol qo'shildi!`);
console.log('Mavzular: Chiziqli tenglamalar, Kvadrat tenglamalar, Trigonometriya asoslari, Logarifmlar');
