"use client";
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import MathRenderer from "@/components/math/MathRenderer";
import { Trash2, Search, CheckCircle2, Circle, ChevronDown, ChevronUp } from "lucide-react";

const PASSWORD = "mathuz2024";
const EXAM_TYPES = ["DTM", "Milliy Sertifikat", "Maktab"];
const inp = "w-full px-3 py-2.5 bg-dark-hover border border-dark-border rounded-xl text-white placeholder-gray-600 text-sm focus:outline-none focus:border-brand font-mono";

const emptyForm = () => ({
  text: "", answer: "", solution: "", diagram_svg: "",
  topic: "Natural sonlar va ular ustida amallar", difficulty: "O'rtacha",
  exam_type: ["DTM", "Milliy Sertifikat", "Maktab"] as string[],
});

// ── Yechim tab ─────────────────────────────────────────────────────────────
interface QRow {
  id: string; text: string; answer: string; solution: string;
  topic: string; difficulty: string; options: string[];
  exam_type: string[]; diagram_svg: string | null;
}

function YechimTab() {
  const [questions, setQuestions] = useState<QRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterTopic, setFilterTopic] = useState("Barchasi");
  const [onlyEmpty, setOnlyEmpty] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ id: string; text: string } | null>(null);
  const [topics, setTopics] = useState<string[]>([]);

  const load = useCallback(async () => {
    setLoading(true);
    const all: QRow[] = [];
    let from = 0;
    while (true) {
      const { data } = await supabase.from("questions")
        .select("id,text,answer,solution,topic,difficulty,options,exam_type,diagram_svg")
        .range(from, from + 999);
      if (!data || data.length === 0) break;
      all.push(...(data as QRow[]));
      if (data.length < 1000) break;
      from += 1000;
    }
    setQuestions(all);
    setTopics(["Barchasi", ...Array.from(new Set(all.map(q => q.topic))).sort()]);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const filtered = questions.filter(q => {
    if (onlyEmpty && q.solution?.trim()) return false;
    if (filterTopic !== "Barchasi" && q.topic !== filterTopic) return false;
    if (search && !q.text.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const empty = questions.filter(q => !q.solution?.trim()).length;

  async function saveSolution(q: QRow) {
    setSaving(true);
    // DELETE + INSERT (UPDATE blocked by RLS)
    const { error: delErr } = await supabase.from("questions").delete().eq("id", q.id);
    if (delErr) { setMsg({ id: q.id, text: "O'chirishda xato: " + delErr.message }); setSaving(false); return; }

    const { error: insErr } = await supabase.from("questions").insert({
      id: q.id, text: q.text, answer: q.answer,
      solution: draft.trim() || null,
      topic: q.topic, difficulty: q.difficulty,
      options: q.options ?? [], exam_type: q.exam_type ?? ["DTM"],
      diagram_svg: q.diagram_svg ?? null,
    });

    if (insErr) {
      setMsg({ id: q.id, text: "Saqlashda xato: " + insErr.message });
      // Try to restore original
      await supabase.from("questions").insert({ ...q });
    } else {
      setQuestions(prev => prev.map(p => p.id === q.id ? { ...p, solution: draft.trim() } : p));
      setMsg({ id: q.id, text: "✅ Saqlandi!" });
      setTimeout(() => { setMsg(null); setExpanded(null); }, 1500);
    }
    setSaving(false);
  }

  return (
    <div className="max-w-3xl mx-auto p-5">
      {/* Stats */}
      <div className="flex items-center gap-4 mb-5">
        <div className="bg-dark-card border border-dark-border rounded-xl px-4 py-2.5 text-center">
          <div className="text-2xl font-black text-white">{questions.length}</div>
          <div className="text-xs text-gray-500">Jami savol</div>
        </div>
        <div className="bg-dark-card border border-red-500/20 rounded-xl px-4 py-2.5 text-center">
          <div className="text-2xl font-black text-red-400">{empty}</div>
          <div className="text-xs text-gray-500">Yechim yo'q</div>
        </div>
        <div className="bg-dark-card border border-green-500/20 rounded-xl px-4 py-2.5 text-center">
          <div className="text-2xl font-black text-green-400">{questions.length - empty}</div>
          <div className="text-xs text-gray-500">Yechim bor</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-4 flex-wrap">
        <div className="relative flex-1 min-w-[180px]">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Savol qidirish..."
            className="w-full pl-8 pr-3 py-2 bg-dark-card border border-dark-border rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none focus:border-brand/50" />
        </div>
        <select value={filterTopic} onChange={e => setFilterTopic(e.target.value)}
          className="bg-dark-card border border-dark-border rounded-xl px-3 py-2 text-sm text-gray-300 focus:outline-none max-w-[220px]">
          {topics.map(t => <option key={t} value={t}>{t.slice(0, 40)}</option>)}
        </select>
        <button onClick={() => setOnlyEmpty(v => !v)}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-medium transition-colors ${
            onlyEmpty ? "border-red-500/40 bg-red-500/10 text-red-400" : "border-dark-border text-gray-500"
          }`}>
          {onlyEmpty ? <Circle size={12} /> : <CheckCircle2 size={12} />}
          Faqat yechim yo&apos;qlar
        </button>
      </div>

      <p className="text-gray-600 text-xs mb-3">{filtered.length} ta savol ko&apos;rinmoqda</p>

      {loading ? (
        <div className="text-center py-10 text-gray-500 text-sm">Yuklanmoqda...</div>
      ) : (
        <div className="space-y-2">
          {filtered.map(q => {
            const isOpen = expanded === q.id;
            const hasSol = !!q.solution?.trim();
            return (
              <div key={q.id} className={`bg-dark-card border rounded-xl overflow-hidden transition-colors ${
                isOpen ? "border-brand/40" : "border-dark-border"
              }`}>
                {/* Header */}
                <button className="w-full flex items-start gap-3 px-4 py-3 text-left"
                  onClick={() => {
                    if (isOpen) { setExpanded(null); }
                    else { setExpanded(q.id); setDraft(q.solution || ""); }
                  }}>
                  <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${hasSol ? "bg-green-400" : "bg-red-400"}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] text-brand mb-0.5">{q.topic}</p>
                    <p className="text-gray-200 text-sm line-clamp-2">{q.text.slice(0, 150)}</p>
                    <p className="text-gray-600 text-xs mt-0.5">Javob: {q.answer.slice(0, 60)}</p>
                  </div>
                  {isOpen ? <ChevronUp size={14} className="text-gray-500 shrink-0 mt-1" /> : <ChevronDown size={14} className="text-gray-500 shrink-0 mt-1" />}
                </button>

                {/* Editor */}
                {isOpen && (
                  <div className="px-4 pb-4 border-t border-dark-border pt-3">
                    <label className="text-[10px] text-gray-500 uppercase tracking-widest mb-2 block">
                      Yechim matni (LaTeX ishlatsa bo&apos;ladi)
                    </label>
                    <textarea
                      rows={4}
                      value={draft}
                      onChange={e => setDraft(e.target.value)}
                      placeholder="Masalan: 3x = 15, x = 5&#10;Yoki: \frac{a+b}{2} = 10..."
                      className="w-full px-3 py-2.5 bg-dark-bg border border-dark-border rounded-xl text-white text-sm focus:outline-none focus:border-brand font-mono resize-none mb-3"
                    />
                    {draft.trim() && (
                      <div className="bg-dark-bg border border-dark-border rounded-xl px-4 py-3 mb-3 text-sm text-gray-300">
                        <p className="text-[10px] text-gray-600 uppercase tracking-widest mb-2">Ko&apos;rinish:</p>
                        <MathRenderer formula={draft} displayMode />
                      </div>
                    )}
                    {msg?.id === q.id && (
                      <p className={`text-xs mb-2 ${msg.text.startsWith("✅") ? "text-green-400" : "text-red-400"}`}>
                        {msg.text}
                      </p>
                    )}
                    <div className="flex gap-2">
                      <button onClick={() => saveSolution(q)} disabled={saving || !draft.trim()}
                        className="flex-1 py-2 bg-brand text-black font-bold rounded-xl text-sm hover:bg-brand/90 transition-colors disabled:opacity-40">
                        {saving ? "Saqlanmoqda..." : "✓ Saqlash"}
                      </button>
                      <button onClick={() => setExpanded(null)}
                        className="px-4 py-2 border border-dark-border text-gray-400 rounded-xl text-sm hover:border-gray-600 transition-colors">
                        Bekor
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
          {filtered.length === 0 && (
            <p className="text-center text-gray-600 text-sm py-8">Hech narsa topilmadi</p>
          )}
        </div>
      )}
    </div>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────
export default function AdminPage() {
  const [auth, setAuth] = useState(false);
  const [pw, setPw] = useState("");
  const [pwErr, setPwErr] = useState(false);
  const [form, setForm] = useState(emptyForm());
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [tab, setTab] = useState<"add" | "list" | "yechim" | "teacher">("yechim");
  const [teacherEmail, setTeacherEmail] = useState("");
  const [teacherMsg, setTeacherMsg] = useState("");
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
      text: form.text.trim(), options: [],
      answer: form.answer.trim(),
      solution: form.solution.trim() || null,
      topic: form.topic, difficulty: form.difficulty,
      exam_type: form.exam_type,
      diagram_svg: form.diagram_svg.trim() || null,
    }]);
    setSaving(false);
    if (error) { setMsg("Xato: " + error.message); return; }
    setMsg("✅ Saqlandi!"); setForm(emptyForm());
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
      <div className="bg-dark-card border-b border-dark-border px-6 py-3 flex items-center justify-between">
        <h1 className="text-brand font-bold text-base">MathUz — Admin</h1>
        <div className="flex gap-2">
          {([
            { key: "yechim", label: "✏️ Yechim yozish" },
            { key: "teacher", label: "👩‍🏫 O'qituvchi" },
            { key: "add", label: "+ Savol qo'shish" },
            { key: "list", label: `Ro'yxat` },
          ] as const).map(t => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                tab === t.key ? "bg-brand text-black" : "bg-dark-hover text-gray-400 hover:text-white"
              }`}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {tab === "yechim" && <YechimTab />}

      {tab === "teacher" && (
        <div className="max-w-md mx-auto p-6">
          <h2 className="text-white font-semibold mb-2">O&apos;qituvchi roli berish</h2>
          <p className="text-gray-500 text-sm mb-5">
            Foydalanuvchi emailini kiriting — ular classroom yarata oladi.
          </p>
          <div className="space-y-4">
            <div>
              <label className="text-gray-400 text-xs mb-1.5 block">Foydalanuvchi emaili</label>
              <input value={teacherEmail} onChange={e => setTeacherEmail(e.target.value)}
                placeholder="user@example.com"
                className={inp} />
            </div>
            {teacherMsg && (
              <p className={`text-sm ${teacherMsg.startsWith("✅") ? "text-green-400" : "text-red-400"}`}>
                {teacherMsg}
              </p>
            )}
            <p className="text-gray-600 text-xs bg-dark-hover rounded-xl p-3">
              💡 O&apos;qituvchi roli berish uchun Supabase SQL Editor da quyidagini ishlating:<br/>
              <code className="text-brand text-[10px]">
                UPDATE auth.users SET raw_user_meta_data = raw_user_meta_data || {`'{"is_teacher":true}'`}::jsonb WHERE email = &apos;EMAIL&apos;;
              </code>
            </p>
          </div>
        </div>
      )}

      {tab === "add" && (
        <div className="max-w-2xl mx-auto p-6 space-y-4">
          <div>
            <label className="text-xs text-gray-500 uppercase tracking-widest mb-1 block">Savol matni *</label>
            <textarea rows={4} value={form.text} onChange={e => setForm(f => ({ ...f, text: e.target.value }))}
              placeholder="Masala matni..." className={`${inp} resize-none`} />
            {form.text && (
              <button onClick={() => setPreview(p => !p)} className="text-xs text-gray-500 hover:text-brand mt-1 transition-colors">
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
              placeholder="Javob..." className={inp} />
          </div>
          <div>
            <label className="text-xs text-gray-500 uppercase tracking-widest mb-1 block">Yechim (ixtiyoriy)</label>
            <textarea rows={3} value={form.solution} onChange={e => setForm(f => ({ ...f, solution: e.target.value }))}
              placeholder="Batafsil yechim..." className={`${inp} resize-none`} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-widest mb-1 block">Mavzu *</label>
              <input value={form.topic} onChange={e => setForm(f => ({ ...f, topic: e.target.value }))}
                placeholder="Mavzu nomi..." className={`${inp} font-sans`} />
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
          <div className="flex gap-2">
            {EXAM_TYPES.map(e => (
              <button key={e} onClick={() => toggleExam(e)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                  form.exam_type.includes(e) ? "bg-brand/15 border-brand text-brand" : "border-dark-border text-gray-500 hover:text-white"
                }`}>
                {e}
              </button>
            ))}
          </div>
          {msg && <p className={`text-sm font-medium ${msg.startsWith("✅") ? "text-brand" : "text-red-400"}`}>{msg}</p>}
          <button onClick={handleSave} disabled={saving}
            className="w-full py-3 bg-brand text-black font-bold rounded-xl text-sm hover:bg-brand/90 transition-colors disabled:opacity-50">
            {saving ? "Saqlanmoqda..." : "✓ Saqlash"}
          </button>
        </div>
      )}

      {tab === "list" && (
        <div className="max-w-3xl mx-auto p-6">
          {loadingQ ? <p className="text-gray-500 text-sm">Yuklanmoqda...</p> : (
            <div className="space-y-2">
              {questions.map(q => (
                <div key={q.id} className="bg-dark-card border border-dark-border rounded-xl px-4 py-3 flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-brand mb-0.5">{q.topic} · <span className="text-gray-500">{q.difficulty}</span></p>
                    <p className="text-gray-300 text-sm line-clamp-2">{q.text.slice(0, 120)}</p>
                    <p className="text-gray-700 text-xs mt-0.5">{q.id}</p>
                  </div>
                  <button onClick={() => handleDelete(q.id)} className="shrink-0 p-1.5 text-red-500/60 hover:text-red-400 transition-colors">
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
