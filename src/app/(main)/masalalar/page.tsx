"use client";
import { useState, useEffect } from "react";
import { getAllQuestions } from "@/lib/store";
import type { Question, Difficulty, ExamType, Topic } from "@/lib/types";
import MathRenderer from "@/components/math/MathRenderer";
import { Bookmark, CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const TOPICS: (Topic | "Barchasi")[] = ["Barchasi","Algebra","Geometriya","Trigonometriya","Logarifm","Integral","Hosila","Ehtimollik","Kombinatorika","Ketma-ketlik","Tengsizlik"];
const DIFFICULTIES: (Difficulty | "Barchasi")[] = ["Barchasi","Oson","O'rtacha","Qiyin"];
const EXAM_TYPES: (ExamType | "Barchasi")[] = ["Barchasi","DTM","Milliy Sertifikat","Maktab"];

export default function MasalalarPage() {
  const [allQuestions, setAllQuestions] = useState<Question[]>([]);
  const [selectedExam, setSelectedExam] = useState<ExamType | "Barchasi">("Barchasi");
  const [selectedTopic, setSelectedTopic] = useState<Topic | "Barchasi">("Barchasi");
  const [selectedDiff, setSelectedDiff] = useState<Difficulty | "Barchasi">("Barchasi");
  const [activeId, setActiveId] = useState<string>("");
  const [showSolution, setShowSolution] = useState(false);
  const [picked, setPicked] = useState<string | null>(null);

  useEffect(() => {
    getAllQuestions().then((qs) => {
      setAllQuestions(qs);
      if (qs.length > 0) setActiveId(qs[0].id);
    });
  }, []);

  const filtered = allQuestions.filter((q) => {
    if (selectedExam !== "Barchasi" && !q.examType.includes(selectedExam)) return false;
    if (selectedTopic !== "Barchasi" && q.topic !== selectedTopic) return false;
    if (selectedDiff !== "Barchasi" && q.difficulty !== selectedDiff) return false;
    return true;
  });

  const active = filtered.find((q) => q.id === activeId) ?? filtered[0];

  function select(id: string) {
    setActiveId(id);
    setShowSolution(false);
    setPicked(null);
  }

  const diffColor = (d: Difficulty) =>
    d === "Oson" ? "bg-green-500/15 text-green-400"
    : d === "O'rtacha" ? "bg-yellow-500/15 text-yellow-400"
    : "bg-red-500/15 text-red-400";

  return (
    <div className="flex h-full">
      <aside className="w-48 shrink-0 border-r border-dark-border p-4 space-y-5 overflow-y-auto">
        {[
          { label: "Imtihon", items: EXAM_TYPES, value: selectedExam, set: setSelectedExam },
          { label: "Mavzu", items: TOPICS, value: selectedTopic, set: setSelectedTopic },
          { label: "Qiyinlik", items: DIFFICULTIES, value: selectedDiff, set: setSelectedDiff },
        ].map(({ label, items, value, set }) => (
          <div key={label}>
            <p className="text-[10px] font-semibold text-gray-600 uppercase tracking-widest mb-2">{label}</p>
            <div className="space-y-0.5">
              {items.map((item) => (
                <button key={item} onClick={() => (set as (v: string) => void)(item)}
                  className={cn("w-full text-left text-xs px-2.5 py-1.5 rounded-lg transition-colors",
                    value === item ? "bg-brand/10 text-brand" : "text-gray-400 hover:bg-dark-hover hover:text-white")}>
                  {item}
                </button>
              ))}
            </div>
          </div>
        ))}
      </aside>

      <div className="w-64 shrink-0 border-r border-dark-border overflow-y-auto">
        <div className="px-4 py-2.5 border-b border-dark-border">
          <p className="text-xs text-gray-500">{filtered.length} ta masala</p>
        </div>
        {filtered.map((q) => (
          <button key={q.id} onClick={() => select(q.id)}
            className={cn("w-full text-left p-4 border-b border-dark-border hover:bg-dark-hover transition-colors",
              q.id === active?.id ? "bg-dark-hover border-l-2 border-l-brand" : "")}>
            <div className="flex items-center justify-between mb-1.5">
              <span className={cn("text-[10px] font-medium px-2 py-0.5 rounded", diffColor(q.difficulty))}>{q.difficulty}</span>
              <span className="text-[10px] text-gray-600">{q.topic}</span>
            </div>
            <div className="text-xs text-gray-400 line-clamp-2">
              <MathRenderer formula={q.text} />
            </div>
          </button>
        ))}
        {filtered.length === 0 && <p className="text-center text-gray-600 text-sm py-8">Masala topilmadi</p>}
      </div>

      <div className="flex-1 p-6 overflow-y-auto">
        {active && (
          <>
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center flex-wrap gap-2">
                <span className={cn("text-xs font-medium px-2.5 py-1 rounded-full", diffColor(active.difficulty))}>{active.difficulty}</span>
                <span className="text-xs bg-dark-card border border-dark-border px-2.5 py-1 rounded-full text-gray-400">{active.topic}</span>
                {active.examType.map((e) => (
                  <span key={e} className="text-xs bg-brand/10 text-brand px-2.5 py-1 rounded-full">{e}</span>
                ))}
              </div>
              <button className="p-1.5 text-gray-500 hover:text-brand transition-colors"><Bookmark size={17} /></button>
            </div>

            <div className="bg-dark-card border border-dark-border rounded-xl p-6 mb-5">
              <p className="text-gray-500 text-xs mb-3">Masala:</p>
              <div className="text-white text-lg"><MathRenderer formula={active.text} displayMode /></div>
            </div>

            {active.options && (
              <div className="grid grid-cols-2 gap-3 mb-5">
                {active.options.map((opt, i) => {
                  const isCorrect = opt === active.answer;
                  const isSelected = picked === opt;
                  const revealed = showSolution || picked !== null;
                  return (
                    <button key={i} onClick={() => setPicked(opt)}
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
            )}

            <button onClick={() => setShowSolution(!showSolution)}
              className="bg-brand text-black font-semibold px-5 py-2.5 rounded-lg hover:bg-brand-dark transition-colors text-sm">
              {showSolution ? "Yechimni yashirish" : "Yechimni ko'rish"}
            </button>

            {showSolution && active.solution && (
              <div className="mt-5 bg-dark-card border border-brand/20 rounded-xl p-5">
                <p className="text-brand text-xs font-semibold mb-3">Yechim:</p>
                <div className="text-white"><MathRenderer formula={active.solution} displayMode /></div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}