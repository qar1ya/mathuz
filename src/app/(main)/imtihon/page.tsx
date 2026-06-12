"use client";
import { useState, useEffect, useRef } from "react";
import { getAllQuestions } from "@/lib/store";
import type { Question } from "@/lib/types";
import MathRenderer from "@/components/math/MathRenderer";
import { FileText, Clock, CheckCircle, XCircle, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

type Phase = "setup" | "exam" | "result";

export default function ImtihonPage() {
  const [phase, setPhase] = useState<Phase>("setup");
  const [allQuestions, setAllQuestions] = useState<Question[]>([]);
  const [examQuestions, setExamQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [current, setCurrent] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [count, setCount] = useState(30);
  const [minutes, setMinutes] = useState(60);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    getAllQuestions().then(setAllQuestions);
  }, []);

  useEffect(() => {
    if (phase === "exam" && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) { finish(); return 0; }
          return t - 1;
        });
      }, 1000);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [phase]);

  function start() {
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5).slice(0, count);
    setExamQuestions(shuffled);
    setAnswers({});
    setCurrent(0);
    setTimeLeft(minutes * 60);
    setPhase("exam");
  }

  function finish() {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setPhase("result");
  }

  function pick(opt: string) {
    setAnswers((prev) => ({ ...prev, [current]: opt }));
  }

  const mm = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const ss = String(timeLeft % 60).padStart(2, "0");

  if (phase === "setup") {
    return (
      <div className="p-6 max-w-lg mx-auto">
        <div className="mb-6">
          <h1 className="text-xl font-bold text-white mb-1">Imtihon Simulyatsiyasi</h1>
          <p className="text-gray-500 text-sm">Haqiqiy DTM sharoitida mashq qiling</p>
        </div>
        <div className="bg-dark-card border border-dark-border rounded-xl p-6 space-y-5">
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Savollar soni</label>
            <div className="flex gap-2">
              {[10, 20, 30, 50].map((n) => (
                <button key={n} onClick={() => setCount(n)}
                  className={cn("flex-1 py-2 rounded-lg text-sm font-medium transition-colors",
                    count === n ? "bg-brand text-black" : "bg-dark-hover text-gray-400 hover:text-white")}>
                  {n}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Vaqt (daqiqa)</label>
            <div className="flex gap-2">
              {[30, 60, 90, 120].map((m) => (
                <button key={m} onClick={() => setMinutes(m)}
                  className={cn("flex-1 py-2 rounded-lg text-sm font-medium transition-colors",
                    minutes === m ? "bg-brand text-black" : "bg-dark-hover text-gray-400 hover:text-white")}>
                  {m}
                </button>
              ))}
            </div>
          </div>
          <button onClick={start}
            className="w-full bg-brand text-black font-semibold py-3 rounded-lg hover:bg-brand-dark transition-colors flex items-center justify-center gap-2">
            <FileText size={16} /> Imtihonni boshlash
          </button>
        </div>
      </div>
    );
  }

  if (phase === "result") {
    const correct = examQuestions.filter((q, i) => answers[i] === q.answer).length;
    const pct = Math.round((correct / examQuestions.length) * 100);
    return (
      <div className="p-6 max-w-lg mx-auto">
        <div className="bg-dark-card border border-dark-border rounded-xl p-8 text-center">
          <div className={cn("w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold",
            pct >= 70 ? "bg-green-500/15 text-green-400" : "bg-red-500/15 text-red-400")}>
            {pct}%
          </div>
          <h2 className="text-white text-xl font-bold mb-1">
            {pct >= 70 ? "Ajoyib natija!" : "Davom eting!"}
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            {correct} / {examQuestions.length} to&apos;g&apos;ri javob
          </p>
          <div className="grid grid-cols-2 gap-3 mb-6">
            {examQuestions.map((q, i) => (
              <div key={i} className={cn("flex items-center gap-2 p-2 rounded-lg text-xs",
                answers[i] === q.answer ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400")}>
                {answers[i] === q.answer
                  ? <CheckCircle size={12} />
                  : <XCircle size={12} />}
                <span className="truncate">Savol {i + 1}</span>
              </div>
            ))}
          </div>
          <button onClick={() => setPhase("setup")}
            className="flex items-center gap-2 mx-auto bg-brand text-black font-semibold px-6 py-2.5 rounded-lg hover:bg-brand-dark transition-colors text-sm">
            <RotateCcw size={15} /> Qaytadan
          </button>
        </div>
      </div>
    );
  }

  const q = examQuestions[current];
  const answered = Object.keys(answers).length;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-400">{current + 1} / {examQuestions.length}</span>
          <span className="text-xs text-gray-600">({answered} javoblangan)</span>
        </div>
        <div className={cn("flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-mono font-bold",
          timeLeft < 300 ? "bg-red-500/15 text-red-400" : "bg-dark-card text-white border border-dark-border")}>
          <Clock size={14} />
          {mm}:{ss}
        </div>
      </div>

      <div className="w-full h-1 bg-dark-hover rounded-full mb-5 overflow-hidden">
        <div className="h-full bg-brand rounded-full transition-all"
          style={{ width: `${((current + 1) / examQuestions.length) * 100}%` }} />
      </div>

      <div className="bg-dark-card border border-dark-border rounded-xl p-6 mb-4">
        <MathRenderer formula={q.text} displayMode />
      </div>

      <div className="grid grid-cols-2 gap-3 mb-5">
        {q.options.map((opt, i) => (
          <button key={i} onClick={() => pick(opt)}
            className={cn("flex items-center gap-3 p-4 rounded-xl border text-left transition-all text-sm",
              answers[current] === opt
                ? "bg-brand/10 border-brand/50 text-brand"
                : "bg-dark-card border-dark-border hover:border-brand/30 text-white")}>
            <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-xs font-bold shrink-0">
              {String.fromCharCode(65 + i)}
            </span>
            <span className="flex-1"><MathRenderer formula={opt} /></span>
          </button>
        ))}
      </div>

      <div className="flex gap-3">
        <button onClick={() => setCurrent((c) => Math.max(0, c - 1))} disabled={current === 0}
          className="flex-1 py-2.5 rounded-lg border border-dark-border text-gray-400 text-sm hover:text-white disabled:opacity-30 transition-colors">
          Oldingi
        </button>
        {current < examQuestions.length - 1 ? (
          <button onClick={() => setCurrent((c) => c + 1)}
            className="flex-1 py-2.5 rounded-lg bg-brand text-black font-semibold text-sm hover:bg-brand-dark transition-colors">
            Keyingi
          </button>
        ) : (
          <button onClick={finish}
            className="flex-1 py-2.5 rounded-lg bg-green-500 text-white font-semibold text-sm hover:bg-green-600 transition-colors">
            Tugatish
          </button>
        )}
      </div>
    </div>
  );
}
