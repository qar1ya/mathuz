"use client";
import { useState, useEffect } from "react";
import { getAllQuestions, saveQuestion, deleteQuestion, getAllLessons, saveLesson, deleteLesson } from "@/lib/store";
import type { Question, Lesson, Topic, Difficulty, ExamType } from "@/lib/types";
import MathRenderer from "@/components/math/MathRenderer";
import { Trash2, Plus, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const TOPICS: Topic[] = ["Algebra","Geometriya","Trigonometriya","Logarifm","Integral","Hosila","Ehtimollik","Kombinatorika","Ketma-ketlik","Tengsizlik"];
const DIFFICULTIES: Difficulty[] = ["Oson","O'rtacha","Qiyin"];
const EXAM_TYPES: ExamType[] = ["DTM","Milliy Sertifikat","Maktab"];

export default function AdminPage() {
  const [tab, setTab] = useState<"masalalar"|"darslar">("masalalar");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [toast, setToast] = useState("");

  const [qText, setQText] = useState("");
  const [qOpts, setQOpts] = useState(["","","",""]);
  const [qAnswer, setQAnswer] = useState(0);
  const [qTopic, setQTopic] = useState<Topic>("Algebra");
  const [qDiff, setQDiff] = useState<Difficulty>("Oson");
  const [qExams, setQExams] = useState<ExamType[]>(["DTM"]);
  const [qSolution, setQSolution] = useState("");

  const [lTitle, setLTitle] = useState("");
  const [lTopic, setLTopic] = useState<Topic>("Algebra");
  const [lDuration, setLDuration] = useState("");
  const [lDesc, setLDesc] = useState("");
  const [lPremium, setLPremium] = useState(false);

  useEffect(() => {
    setQuestions(getAllQuestions());
    setLessons(getAllLessons());
  }, []);

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  }

  function addQuestion() {
    if (!qText || qOpts.some((o) => !o)) return;
    const q: Question = {
      id: `custom_${Date.now()}`,
      text: qText,
      options: qOpts,
      answer: qOpts[qAnswer],
      solution: qSolution || undefined,
      topic: qTopic,
      difficulty: qDiff,
      examType: qExams,
    };
    saveQuestion(q);
    setQuestions(getAllQuestions());
    setQText(""); setQOpts(["","","",""]); setQSolution("");
    showToast("Masala qo'shildi!");
  }

  function removeQuestion(id: string) {
    deleteQuestion(id);
    setQuestions(getAllQuestions());
    showToast("O'chirildi");
  }

  function addLesson() {
    if (!lTitle || !lDuration) return;
    const l: Lesson = {
      id: `custom_${Date.now()}`,
      title: lTitle,
      topic: lTopic,
      duration: lDuration,
      description: lDesc,
      isPremium: lPremium,
    };
    saveLesson(l);
    setLessons(getAllLessons());
    setLTitle(""); setLDuration(""); setLDesc(""); setLPremium(false);
    showToast("Dars qo'shildi!");
  }

  function removeLesson(id: string) {
    deleteLesson(id);
    setLessons(getAllLessons());
    showToast("O'chirildi");
  }

  const inputCls = "w-full bg-dark-hover border border-dark-border rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-brand/50";
  const selectCls = "w-full bg-dark-hover border border-dark-border rounded-lg px-3 py-2 text-sm text-white focus:outline-none";

  return (
    <div className="min-h-screen bg-dark-bg p-6">
      {toast && (
        <div className="fixed top-4 right-4 bg-brand text-black font-semibold px-4 py-2 rounded-lg text-sm z-50">
          {toast}
        </div>
      )}

      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/dashboard" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm">
            <ArrowLeft size={16} /> Orqaga
          </Link>
          <h1 className="text-white font-bold text-xl">Admin Panel</h1>
        </div>

        <div className="flex gap-2 mb-6">
          {(["masalalar","darslar"] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={cn("px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize",
                tab === t ? "bg-brand text-black" : "bg-dark-card text-gray-400 hover:text-white")}>
              {t === "masalalar" ? "Masalalar" : "Darslar"}
            </button>
          ))}
        </div>

        {tab === "masalalar" && (
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-dark-card border border-dark-border rounded-xl p-5 space-y-3">
              <h2 className="text-white font-semibold">Yangi masala</h2>
              <textarea value={qText} onChange={(e) => setQText(e.target.value)}
                placeholder="Masala matni (LaTeX: \frac{1}{2})"
                className={cn(inputCls, "h-20 resize-none")} />
              {qText && (
                <div className="bg-dark-hover border border-dark-border rounded-lg p-3">
                  <p className="text-[10px] text-gray-600 mb-1">Ko&apos;rinish:</p>
                  <MathRenderer formula={qText} displayMode />
                </div>
              )}
              {qOpts.map((opt, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <button onClick={() => setQAnswer(i)}
                    className={cn("w-7 h-7 rounded-full border text-xs font-bold shrink-0 transition-colors",
                      qAnswer === i ? "bg-brand border-brand text-black" : "border-dark-border text-gray-500")}>
                    {String.fromCharCode(65+i)}
                  </button>
                  <input value={opt} onChange={(e) => { const o=[...qOpts]; o[i]=e.target.value; setQOpts(o); }}
                    placeholder={`${String.fromCharCode(65+i)} variant`} className={inputCls} />
                </div>
              ))}
              <div className="grid grid-cols-2 gap-2">
                <select value={qTopic} onChange={(e) => setQTopic(e.target.value as Topic)} className={selectCls}>
                  {TOPICS.map((t) => <option key={t}>{t}</option>)}
                </select>
                <select value={qDiff} onChange={(e) => setQDiff(e.target.value as Difficulty)} className={selectCls}>
                  {DIFFICULTIES.map((d) => <option key={d}>{d}</option>)}
                </select>
              </div>
              <div className="flex gap-3">
                {EXAM_TYPES.map((e) => (
                  <label key={e} className="flex items-center gap-1.5 text-xs text-gray-400 cursor-pointer">
                    <input type="checkbox" checked={qExams.includes(e)}
                      onChange={() => setQExams((prev) => prev.includes(e) ? prev.filter((x)=>x!==e) : [...prev,e])}
                      className="accent-brand" />
                    {e}
                  </label>
                ))}
              </div>
              <input value={qSolution} onChange={(e) => setQSolution(e.target.value)}
                placeholder="Yechim (ixtiyoriy, LaTeX)" className={inputCls} />
              <button onClick={addQuestion}
                className="w-full flex items-center justify-center gap-2 bg-brand text-black font-semibold py-2 rounded-lg hover:bg-brand-dark transition-colors text-sm">
                <Plus size={16} /> Qo&apos;shish
              </button>
            </div>

            <div className="bg-dark-card border border-dark-border rounded-xl p-5">
              <h2 className="text-white font-semibold mb-3">Barcha masalalar ({questions.length})</h2>
              <div className="space-y-2 max-h-[600px] overflow-y-auto">
                {questions.map((q) => (
                  <div key={q.id} className="flex items-center justify-between p-3 bg-dark-hover rounded-lg">
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-gray-400 truncate"><MathRenderer formula={q.text} /></div>
                      <span className="text-[10px] text-gray-600">{q.topic} · {q.difficulty}</span>
                    </div>
                    {q.id.startsWith("custom_") && (
                      <button onClick={() => removeQuestion(q.id)} className="ml-2 text-red-500 hover:text-red-400 shrink-0">
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === "darslar" && (
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-dark-card border border-dark-border rounded-xl p-5 space-y-3">
              <h2 className="text-white font-semibold">Yangi dars</h2>
              <input value={lTitle} onChange={(e) => setLTitle(e.target.value)} placeholder="Dars nomi" className={inputCls} />
              <select value={lTopic} onChange={(e) => setLTopic(e.target.value as Topic)} className={selectCls}>
                {TOPICS.map((t) => <option key={t}>{t}</option>)}
              </select>
              <input value={lDuration} onChange={(e) => setLDuration(e.target.value)} placeholder="Davomiyligi (45 min)" className={inputCls} />
              <textarea value={lDesc} onChange={(e) => setLDesc(e.target.value)}
                placeholder="Tavsif" className={cn(inputCls, "h-20 resize-none")} />
              <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
                <input type="checkbox" checked={lPremium} onChange={(e) => setLPremium(e.target.checked)} className="accent-brand" />
                Premium dars
              </label>
              <button onClick={addLesson}
                className="w-full flex items-center justify-center gap-2 bg-brand text-black font-semibold py-2 rounded-lg hover:bg-brand-dark transition-colors text-sm">
                <Plus size={16} /> Qo&apos;shish
              </button>
            </div>

            <div className="bg-dark-card border border-dark-border rounded-xl p-5">
              <h2 className="text-white font-semibold mb-3">Barcha darslar ({lessons.length})</h2>
              <div className="space-y-2 max-h-[600px] overflow-y-auto">
                {lessons.map((l) => (
                  <div key={l.id} className="flex items-center justify-between p-3 bg-dark-hover rounded-lg">
                    <div>
                      <p className="text-sm text-white">{l.title}</p>
                      <span className="text-[10px] text-gray-600">{l.topic} · {l.duration}</span>
                    </div>
                    {l.id.startsWith("custom_") && (
                      <button onClick={() => removeLesson(l.id)} className="text-red-500 hover:text-red-400">
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}