import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://cngkzlkreddsdpjqflsb.supabase.co',
  'sb_publishable_XBtykx-ZbWc1326el4G5SA_JEgpuDOo'
);

const questions = [
  {
    id: 'parallel-q84',
    text: "Rasmda to'g'ri chiziqlar kesishmasida hosil bo'lgan burchaklar berilgan. \\sin \\alpha_2 = \\frac{\\sqrt{3}}{2}, \\quad \\alpha_2 > 90°. Qolgan burchaklarni toping: \\alpha_1, \\alpha_3, \\alpha_4 — ?",
    options: [],
    answer: "\\alpha_1 = 60°,\\quad \\alpha_3 = 60°,\\quad \\alpha_4 = 120°",
    solution: "\\sin \\alpha_2 = \\frac{\\sqrt{3}}{2} \\Rightarrow \\alpha_2 = 60° \\text{ yoki } 120°. \\quad \\alpha_2 > 90° \\text{ sharti bo'yicha } \\alpha_2 = 120°.\\quad \\alpha_4 = \\alpha_2 = 120° \\text{ (vertikal burchaklar)}.\\quad \\alpha_1 = \\alpha_3 = 180° - 120° = 60° \\text{ (qo'shni burchaklar)}.",
    topic: "Parallel to'g'ri chiziqlar va kesuvchi",
    difficulty: "O'rtacha",
    exam_type: ["DTM", "Milliy Sertifikat", "Maktab"],
    diagram_svg: "/diagrams/q84.png",
  },
  {
    id: 'parallel-q85',
    text: "Rasmda to'g'ri chiziqlar kesishmasida hosil bo'lgan burchaklar berilgan. tg\\,\\alpha_4 = \\frac{\\sqrt{3}}{3}. Qolgan burchaklarni toping: \\alpha_1, \\alpha_2, \\alpha_3 — ?",
    options: [],
    answer: "\\alpha_1 = 30°,\\quad \\alpha_2 = 150°,\\quad \\alpha_3 = 30°",
    solution: "tg\\,\\alpha_4 = \\frac{\\sqrt{3}}{3} = tg\\,30° \\Rightarrow \\alpha_4 = 30°.\\quad \\alpha_1 = \\alpha_3 = 30° \\text{ (vertikal burchaklar)}.\\quad \\alpha_2 = 180° - 30° = 150° \\text{ (qo'shni burchak)}.",
    topic: "Parallel to'g'ri chiziqlar va kesuvchi",
    difficulty: "O'rtacha",
    exam_type: ["DTM", "Milliy Sertifikat", "Maktab"],
    diagram_svg: "/diagrams/q85.png",
  },
];

const { error } = await supabase.from('questions').insert(questions);
if (error) { console.error('Xato:', error.message); process.exit(1); }
console.log('✅ Q84 va Q85 qo\'shildi');
