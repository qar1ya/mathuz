"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import MathRenderer from "@/components/math/MathRenderer";
import { Trash2 } from "lucide-react";

const PASSWORD = "mathuz2024";

const TOPICS = [
  "O'tkir va o'tmas burchaklar",
  "Kesishuvchi to'g'ri chiziqlar",
  "Parallel to'g'ri chiziqlar va kesuvchi",
  "Uchburchak burchaklari",
  "Uchburchakning tashqi burchaklari",
  "To'g'ri burchakli uchburchak. Pifagor teoremasi",
  "Teng yonli to'g'ri burchakli uchburchak",
  "Eng ko'p uchraydigan to'g'ri burchakli uchburchaklar",
  "To'g'ri burchakli uchburchakning yuzi va balandligi",
  "To'g'ri burchakli uchburchakning gipotenuzasiga tushirilgan medianasi",
  "To'g'ri burchakli uchburchak o'tkir burchagining sin, cos, tan, cot",
  "To'g'ri burchakli uchburchakda balandlik va burchaklar",
  "Katetlarning gipotenuzadagi proyeksiyalari",
  "To'g'ri burchakli uchburchakda o'xshashlik",
  "Uchburchak tomonlarini va burchaklarini taqqoslash",
  "Uchburchak tengsizligi",
  "Kosinuslar teoremasi",
  "Sinuslar teoremasi",
  "Uchburchakning to'g'ri burchakli, o'tkir burchakli va o'tmas burchakli turlari",
  "Uchburchakning yuzini hisoblash",
  "Uchburchak bissektrisasi",
  "Uchburchak medianasi",
  "Uchburchakning o'rta chizig'i",
  "Uchburchaklarning o'xshashligi",
  "Kvadrat",
  "To'g'ri to'rtburchak",
  "To'g'ri to'rtburchakda uchburchaklarning o'xshashligini qo'llash",
  "Parallelogramm",
  "Romb",
  "Trapetsiya",
  "Deltoid",
  "Ixtiyoriy to'rtburchaklar",
  "Aylana va doira",
  "Aylanada uzunlik",
  "Uchburchakka tashqi chizilgan aylana",
  "Uchburchakka ichki chizilgan aylana",
  "Muntazam oltiburchak va aylana",
  "Trapetsiyaga ichki chizilgan aylana",
  "Trapetsiyaga tashqi chizilgan aylana",
  "Qavariq ko'pburchaklar",
  "Muntazam n-burchakka tashqi va ichki chizilgan aylana",
  "Muntazam ko'pburchakning yuzi",
  "Ba'zi muntazam ko'pburchaklar",
  "Dekart koordinatalar sistemasi",
  "Koordinatalari bilan berilgan uchburchakning yuzi",
  "Koordinatalar sistemasida parallelogramm",
  "Aylana tenglamasi",
  "Doira tenglamasi",
  "Vektorlar",
  "To'g'ri chiziq",
  "To'g'ri chiziqqa doir masalalarda vektorlardan foydalanish",
  "Stereometriya",
  "Algebra",
  "Tengsizlik",
  "Logarifm",
  "Hosila",
  "Integral",
  "Ehtimollik",
  "Kombinatorika",
  "Ketma-ketlik",
];

const EXAM_TYPES = ["DTM", "Milliy Sertifikat", "Maktab"];

const emptyForm = () => ({
  text: "", answer: "", solution: "", diagram_svg: "",
  topic: TOPICS[0], difficulty: "O'rtacha",
  exam_type: ["DTM", "Milliy Sertifikat", "Maktab"] as string[],
});

export default function AdminPage() {
  const [auth, setAuth] = useState(false);
  const [pw, setPw] = useState("");
  const [pwErr, setPwErr] = useState(false);
  const [form, setForm] = useState(emptyForm());
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [tab, setTab] = useState<"add" | "list">("add");
  const [questions, setQuestions] = useState<{ id: string; text: string; topic: string; difficulty: string }[]>([]);
  const [loadingQ, setLoadingQ] = useState(false);
  const [preview, setPreview] = useState(false);

  async function loadQuestions() {
    setLoadingQ(true);
    const { data } = await supabase.from("questions").select("id,text,topic,difficulty").order("topic");
    setQuestions(data ?? []);
    setLoadingQ(false);
  }

  useEffect(() => { if (auth && tab === "list") loadQuestions(); }, [auth, tab]);

  function login() {
    if (pw === PASSWORD) { setAuth(true); setPwErr(false); }
    else setPwErr(true);
  }

  async function handleSave() {
    if (!form.text.trim() || !form.answer.trim()) { setMsg("Savol va javob majburiy!"); return; }
    setSaving(true); setMsg("");
    const { error } = await supabase.from("questions").insert([{
      id: `q-${Date.now()}`,
      text: form.text.trim(),
      options: [],
      answer: form.answer.trim(),
      solution: form.solution.trim() || null,
      topic: form.topic,
      difficulty: form.difficulty,
      exam_type: form.exam_type,
      diagram_svg: form.diagram_svg.trim() || null,
    }]);
    setSaving(false);
    if (error) { setMsg("Xato: " + error.message); return; }
    setMsg("✅ Saqlandi!");
    setForm(emptyForm());
    setTimeout(() => setMsg(""), 3000);
  }

  async function handleDelete(id: string) {
    if (!confirm("O'chirilsinmi?")) return;
    await supabase.from("questions").delete().eq("id", id);
    loadQuestions();
  }

  function toggleExam(e: string) {
    setForm(f => ({
      ...f,
      exam_type: f.exam_type.includes(e) ? f.exam_type.filter(x => x !== e) : [...f.exam_type, e],
    }));
  }

  const inp = "w-full px-3 py-2.5 bg-dark-hover border border-dark-border rounded-xl text-white placeholder-gray-600 text-sm focus:outline-none focus:border-brand font-mono";

  if (!auth) return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center">
      <div className="bg-dark-card border border-dark-border rounded-2xl p-8 w-80 space-y-4">
        <h1 className="text-white text-xl font-bold text-center">Admin Panel</h1>
        <input type="password" value={pw} onChange={e => setPw(e.target.value)}
          onKeyDown={e => e.key === "Enter" && login()}
          placeholder="Parol..." className={inp} />
        {pwErr && <p className="text-red-400 text-xs text-center">Noto&apos;g&apos;ri parol</p>}
        <button onClick={login}
          className="w-full py-2.5 bg-brand text-black font-bold rounded-xl text-sm hover:bg-brand/90 transition-colors">
          Kirish
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-dark-bg text-white">
      {/* Header */}
      <div className="bg-dark-card border-b border-dark-border px-6 py-3 flex items-center justify-between">
        <h1 className="text-brand font-bold text-base">MathUz — Admin</h1>
        <div className="flex gap-2">
          {(["add", "list"] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors ${tab === t ? "bg-brand text-black" : "bg-dark-hover text-gray-400 hover:text-white"}`}>
              {t === "add" ? "+ Savol qo'shish" : `Ro'yxat (${questions.length})`}
            </button>
          ))}
        </div>
      </div>

      {/* ADD TAB */}
      {tab === "add" && (
        <div className="max-w-2xl mx-auto p-6 space-y-4">

          <div>
            <label className="text-xs text-gray-500 uppercase tracking-widest mb-1 block">Savol matni *</label>
            <textarea rows={4} value={form.text} onChange={e => setForm(f => ({ ...f, text: e.target.value }))}
              placeholder="Masala matni... LaTeX: \frac{3}{5}, \sin\alpha, \sqrt{2}"
              className={`${inp} resize-none`} />
            {form.text && (
              <button onClick={() => setPreview(p => !p)}
                className="text-xs text-gray-500 hover:text-brand mt-1 transition-colors">
                {preview ? "▲ Yashirish" : "👁 Ko'rinishini tekshirish"}
              </button>
            )}
            {preview && form.text && (
              <div className="mt-2 bg-dark-hover border border-dark-border rounded-xl p-4 text-white text-sm">
                <MathRenderer formula={form.text} displayMode />
              </div>
            )}
          </div>

          <div>
            <label className="text-xs text-gray-500 uppercase tracking-widest mb-1 block">To&apos;g&apos;ri javob *</label>
            <input type="text" value={form.answer} onChange={e => setForm(f => ({ ...f, answer: e.target.value }))}
              placeholder="\cos\alpha = \frac{4}{5}  yoki  150  yoki  AD=8,\ DB=32"
              className={inp} />
          </div>

          <div>
            <label className="text-xs text-gray-500 uppercase tracking-widest mb-1 block">Yechim (ixtiyoriy)</label>
            <textarea rows={3} value={form.solution} onChange={e => setForm(f => ({ ...f, solution: e.target.value }))}
              placeholder="Batafsil yechim (LaTeX qo'llasa bo'ladi)..."
              className={`${inp} resize-none`} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-widest mb-1 block">Mavzu *</label>
              <select value={form.topic} onChange={e => setForm(f => ({ ...f, topic: e.target.value }))}
                className={`${inp} font-sans`}>
                {TOPICS.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-widest mb-1 block">Qiyinlik</label>
              <select value={form.difficulty} onChange={e => setForm(f => ({ ...f, difficulty: e.target.value }))}
                className={`${inp} font-sans`}>
                <option>Oson</option>
                <option>O&apos;rtacha</option>
                <option>Qiyin</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs text-gray-500 uppercase tracking-widest mb-1 block">Imtihon turi</label>
            <div className="flex gap-2">
              {EXAM_TYPES.map(e => (
                <button key={e} onClick={() => toggleExam(e)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                    form.exam_type.includes(e)
                      ? "bg-brand/15 border-brand text-brand"
                      : "border-dark-border text-gray-500 hover:text-white"
                  }`}>
                  {e}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs text-gray-500 uppercase tracking-widest mb-1 block">
              Chizma — rasm yo&apos;li yoki SVG (ixtiyoriy)
            </label>
            <textarea rows={2} value={form.diagram_svg} onChange={e => setForm(f => ({ ...f, diagram_svg: e.target.value }))}
              placeholder="/diagrams/rasm.png  yoki  <svg>...</svg>"
              className={`${inp} resize-none`} />
          </div>

          {msg && <p className={`text-sm font-medium ${msg.startsWith("✅") ? "text-brand" : "text-red-400"}`}>{msg}</p>}

          <button onClick={handleSave} disabled={saving}
            className="w-full py-3 bg-brand text-black font-bold rounded-xl text-sm hover:bg-brand/90 transition-colors disabled:opacity-50">
            {saving ? "Saqlanmoqda..." : "✓ Saqlash"}
          </button>
        </div>
      )}

      {/* LIST TAB */}
      {tab === "list" && (
        <div className="max-w-3xl mx-auto p-6">
          {loadingQ ? <p className="text-gray-500 text-sm">Yuklanmoqda...</p> : (
            <div className="space-y-2">
              {questions.map(q => (
                <div key={q.id} className="bg-dark-card border border-dark-border rounded-xl px-4 py-3 flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-brand mb-0.5">{q.topic} · <span className="text-gray-500">{q.difficulty}</span></p>
                    <p className="text-gray-300 text-sm line-clamp-2">{q.text.slice(0, 120)}{q.text.length > 120 ? "…" : ""}</p>
                    <p className="text-gray-700 text-xs mt-0.5">{q.id}</p>
                  </div>
                  <button onClick={() => handleDelete(q.id)}
                    className="shrink-0 p-1.5 text-red-500/60 hover:text-red-400 transition-colors">
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}
              {questions.length === 0 && <p className="text-gray-600 text-sm">Savollar yo&apos;q</p>}
            </div>
          )}
        </div>
      )}
    </div>
  );
}