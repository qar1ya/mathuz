import { createClient } from '@supabase/supabase-js';
const sb = createClient(
  'https://cngkzlkreddsdpjqflsb.supabase.co',
  'sb_publishable_XBtykx-ZbWc1326el4G5SA_JEgpuDOo'
);
const T = "Natural sonlar va ular ustida amallar";
const E = ["DTM", "Milliy Sertifikat", "Maktab"];
const q = (id, text, answer, solution, difficulty = "O'rtacha") => ({
  id, text, options: [], answer, solution, topic: T, difficulty, exam_type: E, diagram_svg: null
});

const questions = [
  // ── 1–20: Hisoblang ──────────────────────────────────────────────────────
  q('idc1-q001', "Hisoblang: $18 - 3 \\cdot 2$", "12", "18 - 3 \\cdot 2 = 18 - 6 = 12", "Oson"),
  q('idc1-q002', "Hisoblang: $5 \\cdot 6 + 7 - 8$", "29", "5 \\cdot 6 + 7 - 8 = 30 + 7 - 8 = 29", "Oson"),
  q('idc1-q003', "Hisoblang: $3 \\cdot 2 + 7 - 13$", "0", "3 \\cdot 2 + 7 - 13 = 6 + 7 - 13 = 0", "Oson"),
  q('idc1-q004', "Hisoblang: $8 \\cdot 3 + 7 \\cdot 6 - 5 \\cdot 9$", "21", "8 \\cdot 3 + 7 \\cdot 6 - 5 \\cdot 9 = 24 + 42 - 45 = 21", "Oson"),
  q('idc1-q005', "Hisoblang: $27 \\div 3 + 4 \\cdot 7$", "37", "27 \\div 3 + 4 \\cdot 7 = 9 + 28 = 37", "Oson"),
  q('idc1-q006', "Hisoblang: $4 \\cdot 7 \\cdot 25 \\div 5 - 6 \\cdot 20$", "20", "4 \\cdot 7 \\cdot 25 \\div 5 - 6 \\cdot 20 = 4 \\cdot 7 \\cdot 5 - 120 = 140 - 120 = 20", "Oson"),
  q('idc1-q007', "Hisoblang: $20 \\div 5 \\cdot 4$", "16", "20 \\div 5 \\cdot 4 = 4 \\cdot 4 = 16", "Oson"),
  q('idc1-q008', "Hisoblang: $23 - (18 + 2)$", "3", "23 - (18 + 2) = 23 - 20 = 3", "Oson"),
  q('idc1-q009', "Hisoblang: $96 \\cdot (25 - 17)$", "768", "96 \\cdot (25 - 17) = 96 \\cdot 8 = 768", "Oson"),
  q('idc1-q010', "Hisoblang: $18 \\cdot 7 - 13 \\cdot (12 - 5)$", "35", "18 \\cdot 7 - 13 \\cdot (12 - 5) = 126 - 13 \\cdot 7 = 126 - 91 = 35", "Oson"),
  q('idc1-q011', "Hisoblang: $122 + (83 - (25 - 12))$", "192", "122 + (83 - 13) = 122 + 70 = 192", "Oson"),
  q('idc1-q012', "Hisoblang: $72 + 18 - 4 - 8 \\cdot 12 \\div 3$", "54", "72 + 18 - 4 - 8 \\cdot 12 \\div 3 = 72 + 18 - 4 - 32 = 54", "Oson"),
  q('idc1-q013', "Hisoblang: $48 \\div (12 - 4 - 2) + 24 \\div 6$", "12", "48 \\div (12 - 4 - 2) + 24 \\div 6 = 48 \\div 6 + 4 = 8 + 4 = 12", "O'rtacha"),
  q('idc1-q014', "Hisoblang: $(192 \\div 6 - 12) \\div (16 - 2 \\cdot 7)$", "10", "(192 \\div 6 - 12) \\div (16 - 14) = (32 - 12) \\div 2 = 20 \\div 2 = 10", "O'rtacha"),
  q('idc1-q015', "Hisoblang: $120 \\div 12 - (169 \\div 13 - 12)$", "9", "120 \\div 12 - (13 - 12) = 10 - 1 = 9", "O'rtacha"),
  q('idc1-q016', "Hisoblang: $64 \\div (4 + 2 \\cdot 8 - 144 \\div 12)$", "8", "64 \\div (4 + 16 - 12) = 64 \\div 8 = 8", "O'rtacha"),
  q('idc1-q017', "Hisoblang: $84 - 48 \\div 4 + 15 \\cdot (2 + 3 \\cdot 0)$", "102", "84 - 12 + 15 \\cdot 2 = 84 - 12 + 30 = 102", "O'rtacha"),
  q('idc1-q018', "Hisoblang: $2 \\cdot 15 + 3 \\cdot 10 + 6 \\cdot 5$", "90", "30 + 30 + 30 = 90", "Oson"),
  q('idc1-q019', "Hisoblang: $111 \\div 3 + 12 \\cdot (9 - 6 \\div 2)$", "109", "37 + 12 \\cdot (9 - 3) = 37 + 12 \\cdot 6 = 37 + 72 = 109", "O'rtacha"),
  q('idc1-q020', "Hisoblang: $(156 \\div 2 - 18) \\div 2 + 3 \\cdot (18 \\div 6 + 2)$", "45", "(78 - 18) \\div 2 + 3 \\cdot 5 = 30 + 15 = 45", "O'rtacha"),

  // ── 21–26: Yig'indini ko'paytmaga almashtirib hisoblang ───────────────────
  q('idc1-q021', "Yig'indini ko'paytmaga almashtirib hisoblang: $12+12+12+12+12$", "60", "12 \\cdot 5 = 60", "Oson"),
  q('idc1-q022', "Yig'indini ko'paytmaga almashtirib hisoblang: $3033+3033+3033+3033$", "12132", "3033 \\cdot 4 = 12132", "Oson"),
  q('idc1-q023', "Yig'indini ko'paytmaga almashtirib hisoblang: $\\underbrace{4+4+\\cdots+4}_{1019 \\text{ marta}}$", "4076", "4 \\cdot 1019 = 4076", "Oson"),
  q('idc1-q024', "Yig'indini ko'paytmaga almashtirib hisoblang: $\\underbrace{1035+1035+\\cdots+1035}_{10 \\text{ marta}}$", "10350", "1035 \\cdot 10 = 10350", "Oson"),
  q('idc1-q025', "Hisoblang: $\\underbrace{145-55+145-55+\\cdots+145-55}_{14 \\text{ ta son}}$", "630", "14 \\text{ ta son} = 7 \\text{ juft}. \\ 7 \\cdot (145-55) = 7 \\cdot 90 = 630", "O'rtacha"),
  q('idc1-q026', "Hisoblang: $\\underbrace{17-6+17-6+\\cdots+17-6}_{48 \\text{ ta son}}$", "264", "48 \\text{ ta son} = 24 \\text{ juft}. \\ 24 \\cdot (17-6) = 24 \\cdot 11 = 264", "O'rtacha"),

  // ── 27–30: Mantiqiy masalalar ─────────────────────────────────────────────
  q('idc1-q027', "Agar $47+47+\\cdots+47 = 4747$ bo'lsa, yig'indida nechta son qatnashgan?", "101", "4747 \\div 47 = 101", "O'rtacha"),
  q('idc1-q028', "Agar $60+60+\\cdots+60 = 2400$ bo'lsa, yig'indida nechta son qatnashgan?", "40", "2400 \\div 60 = 40", "Oson"),
  q('idc1-q029', "$60+60+\\cdots+60 = 3000$ yig'indidagi barcha 60 sonlari 70 ga o'zgartirilsa, yig'indining qiymati nechaga teng bo'ladi?", "3500", "3000 \\div 60 = 50 \\text{ ta son}. \\ 70 \\cdot 50 = 3500", "O'rtacha"),
  q('idc1-q030', "$30+30+\\cdots+30 = 6060$ yig'indidagi barcha 30 sonlari 80 ga o'zgartirilsa, yig'indining qiymati nechaga teng bo'ladi?", "16160", "6060 \\div 30 = 202 \\text{ ta son}. \\ 80 \\cdot 202 = 16160", "O'rtacha"),

  // ── 31–35: Qulay usulda hisoblang ─────────────────────────────────────────
  q('idc1-q031', "Qulay usulda hisoblang: $28+148+72+52$", "300", "(28+72)+(148+52) = 100+200 = 300", "Oson"),
  q('idc1-q032', "Qulay usulda hisoblang: $19+32+81+168$", "300", "(19+81)+(32+168) = 100+200 = 300", "Oson"),
  q('idc1-q033', "Qulay usulda hisoblang: $12+24+36+64+76+88$", "300", "(12+88)+(24+76)+(36+64) = 100+100+100 = 300", "Oson"),
  q('idc1-q034', "Qulay usulda hisoblang: $32+38+44+56+62+68$", "300", "(32+68)+(38+62)+(44+56) = 100+100+100 = 300", "Oson"),
  q('idc1-q035', "Qulay usulda hisoblang: $1248+1452+8752+2548$", "14000", "(1248+8752)+(1452+2548) = 10000+4000 = 14000", "Oson"),

  // ── 36–45: Qulay usulda hisoblang (ko'paytirish) ─────────────────────────
  q('idc1-q036', "Qulay usulda hisoblang: $47 \\cdot 52 + 47 \\cdot 48$", "4700", "47 \\cdot (52+48) = 47 \\cdot 100 = 4700", "Oson"),
  q('idc1-q037', "Qulay usulda hisoblang: $157 \\cdot 43 - 147 \\cdot 43$", "430", "(157-147) \\cdot 43 = 10 \\cdot 43 = 430", "Oson"),
  q('idc1-q038', "Qulay usulda hisoblang: $356 \\cdot 73 + 644 \\cdot 73$", "73000", "73 \\cdot (356+644) = 73 \\cdot 1000 = 73000", "Oson"),
  q('idc1-q039', "Qulay usulda hisoblang: $7 \\cdot 55 - 7 \\cdot 45 + 3 \\cdot 55 - 3 \\cdot 45$", "100", "(7+3) \\cdot (55-45) = 10 \\cdot 10 = 100", "O'rtacha"),
  q('idc1-q040', "Qulay usulda hisoblang: $37 \\cdot 59 + 37 \\cdot 41 + 63 \\cdot 59 + 63 \\cdot 41$", "10000", "(37+63) \\cdot (59+41) = 100 \\cdot 100 = 10000", "O'rtacha"),
  q('idc1-q041', "Qulay usulda hisoblang: $14 \\cdot 27 - 14 \\cdot 24 + 16 \\cdot 49 - 16 \\cdot 46$", "90", "14 \\cdot (27-24) + 16 \\cdot (49-46) = 14 \\cdot 3 + 16 \\cdot 3 = 3 \\cdot 30 = 90", "O'rtacha"),
  q('idc1-q042', "Qulay usulda hisoblang: $28 \\cdot 43 + 57 \\cdot 81 + 43 \\cdot 72 + 57 \\cdot 19$", "10000", "43 \\cdot (28+72) + 57 \\cdot (81+19) = 43 \\cdot 100 + 57 \\cdot 100 = 10000", "O'rtacha"),
  q('idc1-q043', "Qulay usulda hisoblang: $12 \\cdot 13 + 13 \\cdot 24 + 36 \\cdot 47 + 60 \\cdot 64$", "6000", "13 \\cdot (12+24) + 36 \\cdot 47 + 60 \\cdot 64 = 36 \\cdot 13 + 36 \\cdot 47 + 60 \\cdot 64 = 36 \\cdot 60 + 60 \\cdot 64 = 60 \\cdot (36+64) = 60 \\cdot 100 = 6000", "Qiyin"),
  q('idc1-q044', "Qulay usulda hisoblang: $67 \\cdot 43 - 43 \\cdot 37 - 30 \\cdot 23 - 20 \\cdot 10$", "400", "43 \\cdot (67-37) - 30 \\cdot 23 - 200 = 43 \\cdot 30 - 690 - 200 = 1290 - 890 = 400", "Qiyin"),
  q('idc1-q045', "Qulay usulda hisoblang: $128 \\cdot 247 + 247 \\cdot 172 + 300 \\cdot 253$", "150000", "247 \\cdot (128+172) + 300 \\cdot 253 = 247 \\cdot 300 + 300 \\cdot 253 = 300 \\cdot (247+253) = 300 \\cdot 500 = 150000", "Qiyin"),

  // ── 46–51: Narx va matn masalalari ───────────────────────────────────────
  q('idc1-q046', "Daftarning narxi 5000 so'm, ruchkaning narxi 3000 so'm. 4 ta daftar va 3 ta ruchka necha so'm turadi?", "29000 so'm", "4 \\cdot 5000 + 3 \\cdot 3000 = 20000 + 9000 = 29000 \\text{ so'm}", "Oson"),
  q('idc1-q047', "Bolaning yoshi onasining yoshidan 24 ga kam, otasining yoshi esa onasining yoshidan 5 ga ko'p. Agar bolaning yoshi 12 ga teng bo'lsa, otaning yoshini toping.", "41", "\\text{Ona} = 12 + 24 = 36, \\quad \\text{Ota} = 36 + 5 = 41", "Oson"),
  q('idc1-q048', "Fermer xo'jaligida iyul oyida 300 tonna sut mahsulotlari yetishtirildi. Bu miqdor iyun oyidagidan 17 tonnaga ko'p, lekin avgust oyidagidan 23 tonnaga kam. Yoz oylarida jami necha tonna sut mahsulotlari yetishtirilgan?", "906 tonna", "\\text{Iyun} = 300-17 = 283, \\ \\text{Avgust} = 300+23 = 323. \\ 283+300+323 = 906", "O'rtacha"),
  q('idc1-q049', "4 kg pomidor uchun 36000 so'm to'landi. 5 kg pomidor necha so'm turadi?", "45000 so'm", "1 \\text{ kg} = 36000 \\div 4 = 9000. \\ 5 \\cdot 9000 = 45000", "Oson"),
  q('idc1-q050', "12 ta daftar uchun 48000 so'm to'landi. 14 ta daftar necha so'm turadi?", "56000 so'm", "1 \\text{ ta} = 48000 \\div 12 = 4000. \\ 14 \\cdot 4000 = 56000", "Oson"),
  q('idc1-q051', "5 kg kartoshka 15000 so'm, 7 kg piyoz 28000 so'm bo'lsa, 3 kg kartoshka va 4 kg piyoz necha so'm bo'ladi?", "25000 so'm", "3 \\cdot (15000\\div5) + 4 \\cdot (28000\\div7) = 9000 + 16000 = 25000", "O'rtacha"),

  // ── 52–56: Masofa va ish masalalari ──────────────────────────────────────
  q('idc1-q052', "Ozod har kuni 36 km dan yo'l bosib manzilga 10 kunda yetib bordi. Agar u dastlabki manzilga 9 kunda qaytib kelmoqchi bo'lsa, kuniga o'rtacha necha km yo'l bosishi kerak?", "40 km", "\\text{Masofa} = 36 \\cdot 10 = 360 \\text{ km}. \\ 360 \\div 9 = 40 \\text{ km}", "O'rtacha"),
  q('idc1-q053', "Jasur har kuni 48 km dan yo'l bosib manzilga 6 kunda yetib bordi. Agar u dastlabki manzilga 8 kunda qaytib kelmoqchi bo'lsa, kuniga o'rtacha necha km yo'l bosishi kerak?", "36 km", "48 \\cdot 6 = 288 \\text{ km}. \\ 288 \\div 8 = 36 \\text{ km}", "O'rtacha"),
  q('idc1-q054', "Jasur har kuni 36 km, Ozod esa 48 km yo'l bosadi. Agar ular bir vaqtda, bir joydan yo'lga chiqsa, 288 km bo'lgan masofaga qaysi biri oldinroq yetib boradi? Necha kun oldinroq boradi?", "Ozod, 2 kun oldinroq", "\\text{Jasur}: 288\\div36=8 \\text{ kun}, \\ \\text{Ozod}: 288\\div48=6 \\text{ kun}. \\ 8-6=2", "O'rtacha"),
  q('idc1-q055', "Usta bir kunda 24 ta detal tayyorlaydi. Usta 6 kunda nechta detal tayyorlasa, shogirdi 8 kunda shuncha detal tayyorlaydi. Usta va shogird birgalikda 3 kunda nechta detal tayyorlashadi?", "126 ta", "\\text{Usta 6 kunda:} 24\\cdot6=144. \\ \\text{Shogird/kun:} 144\\div8=18. \\ 3\\cdot(24+18)=126", "Qiyin"),
  q('idc1-q056', "Barno bir soatda 36 ta misol yechadi. Malika 6 soatda nechta misol yechsa, Barno 8 soatda shuncha misol yechadi. Barno va Malika birgalikda 3 soatda nechta misol yechadi?", "252 ta", "\\text{Barno 8 soatda:} 36\\cdot8=288. \\ \\text{Malika/soat:} 288\\div6=48. \\ 3\\cdot(36+48)=252", "Qiyin"),

  // ── 57–60: Arifmetik masalalar ────────────────────────────────────────────
  q('idc1-q057', "40 soni dastlab 5 marta, keyin yana 80 ga orttirildi. Hosil bo'lgan son dastlabkisidan necha marta ortiq?", "7 marta", "40 \\cdot 5 = 200. \\ 200 + 80 = 280. \\ 280 \\div 40 = 7", "O'rtacha"),
  q('idc1-q058', "30 soni dastlab 5 marta, keyin yana 90 ga orttirildi. Hosil bo'lgan son dastlabkisidan necha marta ortiq?", "8 marta", "30 \\cdot 5 = 150. \\ 150 + 90 = 240. \\ 240 \\div 30 = 8", "O'rtacha"),
  q('idc1-q059', "24 va 8 sonlarining ko'paytmasiga teng bo'lishi uchun 120 ga qanday sonni qo'shish kerak?", "72", "24 \\cdot 8 = 192. \\ 120 + x = 192 \\Rightarrow x = 72", "O'rtacha"),
  q('idc1-q060', "3600 va 24 sonlarining bo'linmasini hosil qilish uchun 200 dan qanday sonni ayirish kerak?", "50", "3600 \\div 24 = 150. \\ 200 - x = 150 \\Rightarrow x = 50", "O'rtacha"),

  // ── 61–65: Qo'sh tengsizliklar ────────────────────────────────────────────
  q('idc1-q061', "Berilgan qo'sh tengsizlikni qanoatlantiruvchi barcha natural sonlarni yozing: $1 \\leq n \\leq 5$", "1, 2, 3, 4, 5", "1 \\leq n \\leq 5 \\Rightarrow n \\in \\{1, 2, 3, 4, 5\\}", "Oson"),
  q('idc1-q062', "Berilgan qo'sh tengsizlikni qanoatlantiruvchi barcha natural sonlarni yozing: $2 < n < 7$", "3, 4, 5, 6", "2 < n < 7 \\Rightarrow n \\in \\{3, 4, 5, 6\\}", "Oson"),
  q('idc1-q063', "Berilgan qo'sh tengsizlikni qanoatlantiruvchi barcha natural sonlarni yozing: $3 < n \\leq 8$", "4, 5, 6, 7, 8", "3 < n \\leq 8 \\Rightarrow n \\in \\{4, 5, 6, 7, 8\\}", "Oson"),
  q('idc1-q064', "Berilgan qo'sh tengsizlikni qanoatlantiruvchi barcha natural sonlarni yozing: $12 \\leq n < 15$", "12, 13, 14", "12 \\leq n < 15 \\Rightarrow n \\in \\{12, 13, 14\\}", "Oson"),
  q('idc1-q065', "Berilgan qo'sh tengsizlikni qanoatlantiruvchi barcha natural sonlarni yozing: $21 < n \\leq 25$", "22, 23, 24, 25", "21 < n \\leq 25 \\Rightarrow n \\in \\{22, 23, 24, 25\\}", "Oson"),

  // ── 66–70: Qatordagi sonlar soni ─────────────────────────────────────────
  q('idc1-q066', "Quyida berilgan qatorda nechta natural son qatnashgan? $1;\\ 2;\\ 3;\\ \\ldots;\\ 45;\\ 46$", "46 ta", "46 - 1 + 1 = 46", "Oson"),
  q('idc1-q067', "Quyida berilgan qatorda nechta natural son qatnashgan? $5;\\ 6;\\ 7;\\ \\ldots;\\ 100$", "96 ta", "100 - 5 + 1 = 96", "Oson"),
  q('idc1-q068', "Quyida berilgan qatorda nechta natural son qatnashgan? $6;\\ 7;\\ 8;\\ \\ldots;\\ 97;\\ 98$", "93 ta", "98 - 6 + 1 = 93", "Oson"),
  q('idc1-q069', "Quyida berilgan qatorda nechta natural son qatnashgan? $23;\\ 24;\\ 25;\\ \\ldots;\\ 123;\\ 124$", "102 ta", "124 - 23 + 1 = 102", "Oson"),
  q('idc1-q070', "Quyida berilgan qatorda nechta natural son qatnashgan? $11;\\ 12;\\ 13;\\ \\ldots;\\ 74;\\ 75$", "65 ta", "75 - 11 + 1 = 65", "Oson"),

  // ── 71–75: Xona birliklari yig'indisidan son ──────────────────────────────
  q('idc1-q071', "Hisoblang: $8 \\cdot 10000 + 5 \\cdot 1000 + 3 \\cdot 100 + 7 \\cdot 10 + 9$", "85379", "80000+5000+300+70+9 = 85379", "Oson"),
  q('idc1-q072', "Hisoblang: $6 \\cdot 10000 + 9 \\cdot 1000 + 100 + 5 \\cdot 10 + 7$", "69157", "60000+9000+100+50+7 = 69157", "Oson"),
  q('idc1-q073', "Hisoblang: $10000 + 5 \\cdot 1000 + 4 \\cdot 10 + 2$", "15042", "10000+5000+40+2 = 15042", "Oson"),
  q('idc1-q074', "Hisoblang: $3 \\cdot 10000 + 4 \\cdot 100 + 2 \\cdot 10 + 7$", "30427", "30000+400+20+7 = 30427", "Oson"),
  q('idc1-q075', "Hisoblang: $2 \\cdot 10000 + 4 \\cdot 10$", "20040", "20000+40 = 20040", "Oson"),

  // ── 76–80: Sonni xona birliklari yig'indisi ko'rinishida yozing ───────────
  q('idc1-q076', "Ko'p xonali sonni xona birliklari yig'indisi ko'rinishida yozing: 87032", "8\\cdot10000+7\\cdot1000+3\\cdot10+2", "87032 = 8\\cdot10000+7\\cdot1000+0\\cdot100+3\\cdot10+2", "Oson"),
  q('idc1-q077', "Ko'p xonali sonni xona birliklari yig'indisi ko'rinishida yozing: 221057", "2\\cdot100000+2\\cdot10000+1\\cdot1000+5\\cdot10+7", "221057 = 2\\cdot100000+2\\cdot10000+1\\cdot1000+0\\cdot100+5\\cdot10+7", "Oson"),
  q('idc1-q078', "Ko'p xonali sonni xona birliklari yig'indisi ko'rinishida yozing: 129807", "1\\cdot100000+2\\cdot10000+9\\cdot1000+8\\cdot100+7", "129807 = 1\\cdot100000+2\\cdot10000+9\\cdot1000+8\\cdot100+0\\cdot10+7", "Oson"),
  q('idc1-q079', "Ko'p xonali sonni xona birliklari yig'indisi ko'rinishida yozing: 65472", "6\\cdot10000+5\\cdot1000+4\\cdot100+7\\cdot10+2", "65472 = 6\\cdot10000+5\\cdot1000+4\\cdot100+7\\cdot10+2", "Oson"),
  q('idc1-q080', "Ko'p xonali sonni xona birliklari yig'indisi ko'rinishida yozing: 10007", "1\\cdot10000+7", "10007 = 1\\cdot10000+0\\cdot1000+0\\cdot100+0\\cdot10+7", "Oson"),

  // ── 81–83: Sonlar nazariyasi ───────────────────────────────────────────────
  q('idc1-q081', "Eng kichik uch xonali son bilan eng katta ikki xonali sonning yig'indisini toping.", "199", "\\text{Eng kichik 3 xonali son} = 100. \\ \\text{Eng katta 2 xonali son} = 99. \\ 100+99=199", "Oson"),
  q('idc1-q082', "Turli raqamlar bilan yozilgan eng katta ikki xonali sonni yozing.", "98", "\\text{Ikki xonali son: } \\overline{ab}, \\ a \\neq b. \\ \\text{Eng katta: } 98", "Oson"),
  q('idc1-q083', "Nechta ikki xonali son chapdan o'ngga va o'ngdan chapga bir xil o'qiladi?", "9 ta", "\\text{Palindrom 2 xonali sonlar: } 11, 22, 33, \\ldots, 99. \\ \\text{Jami } 9 \\text{ ta.}", "O'rtacha"),
];

const BATCH = 20;
for (let i = 0; i < questions.length; i += BATCH) {
  const batch = questions.slice(i, i + BATCH);
  const { error } = await sb.from('questions').insert(batch);
  if (error) { console.error(`Xato (${i}–${i+BATCH-1}):`, error.message); process.exit(1); }
  console.log(`✅ ${i+1}–${Math.min(i+BATCH, questions.length)} qo'shildi`);
}
console.log(`\n✅ Jami ${questions.length} ta savol qo'shildi`);
