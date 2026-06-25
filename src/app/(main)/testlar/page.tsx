"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth";
import type { Question } from "@/lib/types";
import { useDailyLimit } from "@/lib/useDailyLimit";
import PremiumGate from "@/components/premium/PremiumGate";
import {
  Timer, CheckCircle2, XCircle, ChevronRight, RotateCcw,
  Trophy, BookOpen, Play, ChevronLeft, Flag
} from "lucide-react";
import { cn } from "@/lib/utils";
import katex from "katex";
import "katex/dist/katex.min.css";

// ── helpers ────────────────────────────────────────────────────────────────

function svgInline(s: string) {
  return s.replace(
    /(<svg\b[^>]*?)style="[^"]*"/i,
    '$1style="display:block;width:100%;"'
  );
}

const ANGLE_POOL = [
  15, 20, 25, 30, 35, 36, 40, 45, 50, 54, 55, 60, 63, 65, 67.5,
  70, 72, 75, 80, 85, 90, 95, 100, 105, 108, 110, 112.5, 115, 120,
  125, 130, 135, 140, 144, 145, 150, 155, 157.5, 160, 165, 170, 175, 180,
];

function genOptions(answer: string): string[] {
  const m = answer.match(/(\d+(?:[.,]\d+)?)/);
  if (!m) return [];
  const correct = parseFloat(m[1].replace(",", "."));
  const hasDegree = answer.includes("°");

  let distractors: number[];
  if (hasDegree) {
    distractors = ANGLE_POOL.filter((n) => Math.abs(n - correct) >= 8 && n !== correct)
      .sort((a, b) => Math.abs(a - correct) - Math.abs(b - correct))
      .slice(0, 8).sort(() => Math.random() - 0.5).slice(0, 3);
  } else {
    const step = Math.max(1, Math.round(Math.abs(correct) * 0.15));
    const candidates = [-4, -3, -2, -1, 1, 2, 3, 4]
      .map((d) => Math.round(correct + d * step))
      .filter((n) => n > 0 && n !== correct);
    distractors = candidates.sort(() => Math.random() - 0.5).slice(0, 3);
  }

  const sfx = hasDegree ? "°" : "";
  const fmt = (n: number) => `${n % 1 === 0 ? n : n}${sfx}`;
  return [...distractors.map(fmt), fmt(correct)].sort(() => Math.random() - 0.5);
}

/* render question text: handles $...$ inline math */
function renderText(text: string): string {
  return text.replace(/\$([^$]+)\$/g, (_, math) => {
    try { return katex.renderToString(math, { throwOnError: false }); }
    catch { return math; }
  });
}

function fmt(sec: number) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

// ── types ──────────────────────────────────────────────────────────────────

interface TestQuestion extends Question {
  choices: string[];
  selected: string | null;
}

type Phase = "setup" | "test" | "result";

const COUNTS = [10, 20, 30];
const TOPICS = ["Barcha mavzular", "O'tkir va o'tmas burchaklar", "Kesishuvchi to'g'ri chiziqlar", "Uchburchakning tashqi burchaklari", "Natural sonlar va ular ustida amallar"];
const DIFFS = ["Barchasi", "Oson", "O'rtacha", "Qiyin"];

// ── Setup ──────────────────────────────────────────────────────────────────

function Setup({ onStart }: { onStart: (t: string, c: number, d: string) => void }) {
  const [topic, setTopic] = useState("Barcha mavzular");
  const [count, setCount] = useState(20);
  const [diff, setDiff] = useState("Barchasi");

  return (
    <div className="max-w-lg mx-auto px-4 py-10">
      <div className="text-center mb-10">
        <div className="w-14 h-14 rounded-2xl bg-brand/10 border border-brand/20 flex items-center justify-center mx-auto mb-4">
          <BookOpen size={24} className="text-brand" />
        </div>
        <h1 className="text-white font-bold text-2xl mb-1">Test boshlash</h1>
        <p className="text-gray-500 text-sm">Sozlamalarni tanlang va testni boshlang</p>
      </div>

      <div className="space-y-6">
        {/* Topic */}
        <div>
          <label className="text-gray-400 text-xs font-semibold uppercase tracking-widest mb-3 block">Mavzu</label>
          <div className="space-y-2">
            {TOPICS.map((t) => (
              <button key={t} onClick={() => setTopic(t)}
                className={cn("w-full text-left px-4 py-3 rounded-xl border text-sm transition-colors",
                  topic === t
                    ? "border-brand/40 bg-brand/8 text-brand"
                    : "border-dark-border bg-dark-card text-gray-400 hover:border-gray-600")}>
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Count */}
        <div>
          <label className="text-gray-400 text-xs font-semibold uppercase tracking-widest mb-3 block">Savollar soni</label>
          <div className="grid grid-cols-3 gap-3">
            {COUNTS.map((c) => (
              <button key={c} onClick={() => setCount(c)}
                className={cn("py-3 rounded-xl border text-sm font-semibold transition-colors",
                  count === c
                    ? "border-brand/40 bg-brand/8 text-brand"
                    : "border-dark-border bg-dark-card text-gray-400 hover:border-gray-600")}>
                {c} ta
              </button>
            ))}
          </div>
        </div>

        {/* Difficulty */}
        <div>
          <label className="text-gray-400 text-xs font-semibold uppercase tracking-widest mb-3 block">Qiyinlik</label>
          <div className="grid grid-cols-4 gap-2">
            {DIFFS.map((d) => (
              <button key={d} onClick={() => setDiff(d)}
                className={cn("py-2.5 rounded-xl border text-xs font-medium transition-colors",
                  diff === d
                    ? "border-brand/40 bg-brand/8 text-brand"
                    : "border-dark-border bg-dark-card text-gray-400 hover:border-gray-600")}>
                {d}
              </button>
            ))}
          </div>
        </div>

        <button onClick={() => onStart(topic, count, diff)}
          className="w-full bg-brand hover:bg-brand/90 text-black font-bold py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 transition-colors">
          <Play size={16} fill="currentColor" /> Testni boshlash
        </button>
      </div>
    </div>
  );
}

// ── Test ───────────────────────────────────────────────────────────────────

function TestScreen({
  questions, timeLeft, onAnswer, onFinish,
}: {
  questions: TestQuestion[];
  timeLeft: number;
  onAnswer: (idx: number, choice: string) => void;
  onFinish: () => void;
}) {
  const [idx, setIdx] = useState(0);
  const q = questions[idx];
  const answered = questions.filter((q) => q.selected !== null).length;
  const pct = Math.round((answered / questions.length) * 100);
  const urgent = timeLeft <= 60;

  const LABELS = ["A", "B", "C", "D"];

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-5 py-3 border-b border-dark-border flex items-center gap-4">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="text-gray-500 text-sm">Savol</span>
          <span className="text-white font-bold text-sm">{idx + 1}</span>
          <span className="text-gray-600 text-sm">/ {questions.length}</span>
        </div>

        {/* Progress bar */}
        <div className="flex-1 h-1.5 bg-dark-hover rounded-full overflow-hidden">
          <div className="h-full bg-brand rounded-full transition-all" style={{ width: `${pct}%` }} />
        </div>
        <span className="text-xs text-gray-500 shrink-0">{answered}/{questions.length}</span>

        {/* Timer */}
        <div className={cn("flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-sm font-mono font-semibold",
          urgent ? "border-red-500/40 bg-red-500/10 text-red-400" : "border-dark-border bg-dark-card text-gray-300")}>
          <Timer size={13} />
          {fmt(timeLeft)}
        </div>

        <button onClick={onFinish}
          className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-white border border-dark-border px-3 py-1.5 rounded-lg transition-colors">
          <Flag size={12} /> Tugatish
        </button>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-5 py-6">
          {/* Topic badge */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs bg-brand/10 text-brand border border-brand/20 px-2.5 py-1 rounded-full font-medium">
              {q.topic}
            </span>
            <span className={cn("text-xs px-2.5 py-1 rounded-full border font-medium",
              q.difficulty === "Oson" ? "text-green-400 border-green-400/20 bg-green-400/8"
                : q.difficulty === "O'rtacha" ? "text-yellow-400 border-yellow-400/20 bg-yellow-400/8"
                  : "text-red-400 border-red-400/20 bg-red-400/8")}>
              {q.difficulty}
            </span>
          </div>

          {/* Diagram */}
          {q.diagramSvg && !q.diagramSvg.startsWith("/") && !q.diagramSvg.startsWith("http") && (
            <div className="mb-4 bg-white rounded-xl overflow-hidden p-2 max-w-xs mx-auto">
              <div dangerouslySetInnerHTML={{ __html: svgInline(q.diagramSvg) }} />
            </div>
          )}

          {/* Question text */}
          <p className="text-white text-base leading-relaxed mb-6"
            dangerouslySetInnerHTML={{ __html: renderText(q.text) }} />

          {/* Options */}
          <div className="space-y-3">
            {q.choices.map((choice, ci) => {
              const isSelected = q.selected === choice;
              return (
                <button key={ci} onClick={() => !q.selected && onAnswer(idx, choice)}
                  disabled={!!q.selected}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border text-left transition-all",
                    q.selected
                      ? isSelected
                        ? "border-brand/50 bg-brand/10 text-brand cursor-default"
                        : "border-dark-border bg-dark-card text-gray-600 cursor-default opacity-50"
                      : "border-dark-border bg-dark-card text-gray-200 hover:border-brand/30 hover:bg-brand/5 cursor-pointer"
                  )}>
                  <span className={cn(
                    "w-7 h-7 rounded-lg border flex items-center justify-center text-xs font-bold shrink-0",
                    q.selected && isSelected ? "border-brand/50 bg-brand/20 text-brand"
                      : "border-dark-hover text-gray-500"
                  )}>
                    {LABELS[ci]}
                  </span>
                  <span className="text-sm">{choice}</span>
                </button>
              );
            })}
          </div>

          {/* After answer: show correct */}
          {q.selected && (
            <div className="mt-5 p-4 rounded-xl border border-dark-border bg-dark-card">
              <p className="text-xs text-gray-500 mb-1">To&apos;g&apos;ri javob:</p>
              <p className="text-white font-semibold text-sm">{q.answer}</p>
            </div>
          )}
        </div>
      </div>

      {/* Footer nav */}
      <div className="px-5 py-3 border-t border-dark-border flex items-center justify-between">
        <button onClick={() => setIdx(Math.max(0, idx - 1))} disabled={idx === 0}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-dark-border text-gray-400 text-sm hover:border-gray-600 disabled:opacity-30 transition-colors">
          <ChevronLeft size={15} /> Oldingi
        </button>

        {/* Question dots */}
        <div className="flex gap-1.5 overflow-hidden max-w-xs">
          {questions.slice(Math.max(0, idx - 4), Math.min(questions.length, idx + 5)).map((qq, i) => {
            const realIdx = Math.max(0, idx - 4) + i;
            return (
              <button key={realIdx} onClick={() => setIdx(realIdx)}
                className={cn("w-6 h-6 rounded-md text-[10px] font-bold transition-colors",
                  realIdx === idx ? "bg-brand text-black"
                    : qq.selected !== null ? "bg-brand/20 text-brand"
                      : "bg-dark-hover text-gray-500")}>
                {realIdx + 1}
              </button>
            );
          })}
        </div>

        {idx < questions.length - 1 ? (
          <button onClick={() => setIdx(idx + 1)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-brand text-black font-semibold text-sm hover:bg-brand/90 transition-colors">
            Keyingi <ChevronRight size={15} />
          </button>
        ) : (
          <button onClick={onFinish}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-brand text-black font-semibold text-sm hover:bg-brand/90 transition-colors">
            <Flag size={15} /> Yakunlash
          </button>
        )}
      </div>
    </div>
  );
}

// ── Results ────────────────────────────────────────────────────────────────

function Results({
  questions, elapsed, onRestart,
}: {
  questions: TestQuestion[];
  elapsed: number;
  onRestart: () => void;
}) {
  const correct = questions.filter((q) => {
    if (!q.selected) return false;
    const m = q.answer.match(/(\d+(?:[.,]\d+)?)/);
    if (!m) return false;
    const v = parseFloat(m[1].replace(",", "."));
    const sel = parseFloat(q.selected.replace("°", ""));
    return Math.abs(v - sel) < 0.1;
  }).length;

  const pct = Math.round((correct / questions.length) * 100);
  const grade = pct >= 80 ? { label: "A'lo", color: "#22c55e" }
    : pct >= 60 ? { label: "Yaxshi", color: "#3b82f6" }
      : pct >= 40 ? { label: "Qoniqarli", color: "#f97316" }
        : { label: "Qoniqarsiz", color: "#ef4444" };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Score card */}
      <div className="text-center mb-8">
        <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 border"
          style={{ background: `${grade.color}15`, borderColor: `${grade.color}30` }}>
          <Trophy size={32} style={{ color: grade.color }} />
        </div>
        <h2 className="text-white font-black text-4xl mb-1">{pct}%</h2>
        <p className="font-semibold text-lg mb-1" style={{ color: grade.color }}>{grade.label}</p>
        <p className="text-gray-500 text-sm">
          {correct} ta to&apos;g&apos;ri · {questions.length - correct} ta noto&apos;g&apos;ri · {fmt(elapsed)}
        </p>
      </div>

      {/* Stat row */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        {[
          { label: "To'g'ri", value: correct, color: "#22c55e" },
          { label: "Noto'g'ri", value: questions.length - correct, color: "#ef4444" },
          { label: "Vaqt", value: fmt(elapsed), color: "#3b82f6" },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-dark-card border border-dark-border rounded-xl p-4 text-center">
            <div className="text-xl font-black mb-0.5" style={{ color }}>{value}</div>
            <div className="text-gray-500 text-xs">{label}</div>
          </div>
        ))}
      </div>

      {/* Question review */}
      <h3 className="text-white font-semibold mb-4">Savollar sharhi</h3>
      <div className="space-y-2 mb-8">
        {questions.map((q, i) => {
          const m = q.answer.match(/(\d+(?:[.,]\d+)?)/);
          const v = m ? parseFloat(m[1].replace(",", ".")) : null;
          const sel = q.selected ? parseFloat(q.selected.replace("°", "")) : null;
          const isCorrect = v !== null && sel !== null && Math.abs(v - sel) < 0.1;
          const skipped = q.selected === null;

          return (
            <div key={i} className="flex items-start gap-3 bg-dark-card border border-dark-border rounded-xl px-4 py-3">
              <div className="shrink-0 mt-0.5">
                {skipped
                  ? <div className="w-5 h-5 rounded-full border border-gray-600 flex items-center justify-center">
                      <span className="text-[8px] text-gray-500">—</span>
                    </div>
                  : isCorrect
                    ? <CheckCircle2 size={18} className="text-green-400" />
                    : <XCircle size={18} className="text-red-400" />
                }
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-gray-300 text-xs leading-snug line-clamp-2">{i + 1}. {q.text}</p>
                <div className="flex gap-3 mt-1">
                  {q.selected && (
                    <span className={cn("text-[11px] font-medium",
                      isCorrect ? "text-green-400" : "text-red-400")}>
                      Siz: {q.selected}
                    </span>
                  )}
                  <span className="text-[11px] text-gray-500">Javob: {q.answer}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex gap-3">
        <button onClick={onRestart}
          className="flex-1 flex items-center justify-center gap-2 bg-brand hover:bg-brand/90 text-black font-bold py-3 rounded-xl text-sm transition-colors">
          <RotateCcw size={15} /> Qayta boshlash
        </button>
      </div>
    </div>
  );
}

// ── Main ───────────────────────────────────────────────────────────────────

export default function TestlarPage() {
  const { user, updateProfile } = useAuth();
  const { remaining, showGate, setShowGate, increment } = useDailyLimit(
    "tests", 2, user?.isPremium ?? false
  );
  const [phase, setPhase] = useState<Phase>("setup");
  const [questions, setQuestions] = useState<TestQuestion[]>([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [loading, setLoading] = useState(false);
  const startRef = useRef<number>(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  useEffect(() => () => stopTimer(), [stopTimer]);

  async function startTest(topic: string, count: number, diff: string) {
    setLoading(true);
    let query = supabase.from("questions").select("*").limit(count * 3);
    if (topic !== "Barcha mavzular") query = query.eq("topic", topic);
    if (diff !== "Barchasi") query = query.eq("difficulty", diff);

    const { data } = await query;
    if (!data || data.length === 0) { setLoading(false); return; }

    const shuffled = [...data].sort(() => Math.random() - 0.5).slice(0, count);
    const mapped: TestQuestion[] = shuffled.map((q) => ({
      id: q.id,
      text: q.text,
      options: q.options ?? [],
      answer: q.answer,
      solution: q.solution,
      topic: q.topic,
      difficulty: q.difficulty,
      examType: q.exam_type ?? [],
      diagramSvg: q.diagram_svg ?? null,
      choices: genOptions(q.answer),
      selected: null,
    }));

    const secs = count === 10 ? 900 : count === 20 ? 1800 : 2700;
    setQuestions(mapped);
    setTimeLeft(secs);
    startRef.current = Date.now();
    setPhase("test");
    setLoading(false);

    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          stopTimer();
          setElapsed(Math.round((Date.now() - startRef.current) / 1000));
          setPhase("result");
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  }

  function answer(idx: number, choice: string) {
    setQuestions((prev) => prev.map((q, i) => i === idx ? { ...q, selected: choice } : q));
  }

  function finish() {
    stopTimer();
    const secs = Math.round((Date.now() - startRef.current) / 1000);
    setElapsed(secs);
    setPhase("result");

    // Save stats to user profile
    if (user) {
      const correct = questions.filter((q) => {
        if (!q.selected) return false;
        const m = q.answer.match(/(\d+(?:[.,]\d+)?)/);
        if (!m) return false;
        return Math.abs(parseFloat(m[1].replace(",", ".")) - parseFloat(q.selected.replace("°", ""))) < 0.1;
      }).length;
      const attempted = questions.filter((q) => q.selected !== null).length;
      const newTotal = (user.totalAttempted ?? 0) + attempted;
      const newAcc = newTotal > 0
        ? Math.round(((user.accuracy / 100) * (user.totalAttempted ?? 0) + correct) / newTotal * 100)
        : 0;
      const coinsEarned = correct * 2;
      updateProfile({
        totalAttempted: newTotal,
        accuracy: newAcc,
        coins: (user.coins ?? 0) + coinsEarned,
      });
    }
  }

  function restart() {
    stopTimer();
    setQuestions([]);
    setPhase("setup");
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-brand border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-gray-500 text-sm">Savollar yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  if (phase === "setup") return (
    <>
      {showGate && (
        <PremiumGate
          title="Test limiti tugadi"
          desc="Bepul rejimda kuniga 2 ta test. Premium bilan cheksiz!"
          onClose={() => setShowGate(false)}
        />
      )}
      <Setup onStart={(t,c,d) => {
        if (!increment()) return;
        startTest(t,c,d);
      }} />
    </>
  );
  if (phase === "result") return <Results questions={questions} elapsed={elapsed} onRestart={restart} />;
  return (
    <TestScreen
      questions={questions}
      timeLeft={timeLeft}
      onAnswer={answer}
      onFinish={finish}
    />
  );
}
