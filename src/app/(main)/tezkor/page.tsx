"use client";
import { useState, useEffect } from "react";
import { getAllQuestions } from "@/lib/store";
import type { Question } from "@/lib/types";
import MathRenderer from "@/components/math/MathRenderer";
import { Zap, CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth";

export default function TezkorPage() {
  const { user } = useAuth();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    getAllQuestions().then((qs) => setQuestions(qs.sort(() => Math.random() - 0.5)));
  }, []);

  const q = questions[index];

  function pick(opt: string) {
    if (picked !== null) return;
    setPicked(opt);
    if (opt === q.answer) {
      setScore((s) => s + 1);
      // coins update will be implemented with real user data
    }
    setTimeout(() => {
      setIndex((i) => i + 1);
      setPicked(null);
    }, 1200);
  }

  if (!q) return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <p className="text-white text-xl font-bold">Tugadi! 🎉</p>
      <p className="text-gray-400">To&apos;g&apos;ri javoblar: <span className="text-brand font-bold">{score}</span></p>
      <button onClick={() => { setIndex(0); setScore(0); }} className="bg-brand text-black font-semibold px-6 py-2.5 rounded-lg">
        Qaytadan
      </button>
    </div>
  );

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Zap size={18} className="text-brand" />
          <span className="text-white font-bold text-lg">Tezkor Yechim</span>
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-400">
          <span>{index + 1} / {questions.length}</span>
          <span className="text-brand font-semibold">+{score * 2} tanga</span>
        </div>
      </div>

      <div className="bg-dark-card border border-dark-border rounded-xl p-6 mb-5">
        <MathRenderer formula={q.text} displayMode />
      </div>

      <div className="grid grid-cols-2 gap-3">
        {q.options.map((opt, i) => {
          const isCorrect = opt === q.answer;
          const isSelected = picked === opt;
          const revealed = picked !== null;
          return (
            <button key={i} onClick={() => pick(opt)}
              className={cn("flex items-center gap-3 p-4 rounded-xl border text-left transition-all",
                !revealed && "bg-dark-card border-dark-border hover:border-brand/40 text-white",
                revealed && isCorrect && "bg-green-500/10 border-green-500/40 text-green-300",
                revealed && isSelected && !isCorrect && "bg-red-500/10 border-red-500/40 text-red-400",
                revealed && !isSelected && !isCorrect && "bg-dark-card border-dark-border text-gray-600")}>
              <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-xs font-bold shrink-0">
                {String.fromCharCode(65 + i)}
              </span>
              <span className="flex-1 text-sm"><MathRenderer formula={opt} /></span>
              {revealed && isCorrect && <CheckCircle size={15} className="text-green-400 shrink-0" />}
              {revealed && isSelected && !isCorrect && <XCircle size={15} className="text-red-400 shrink-0" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}