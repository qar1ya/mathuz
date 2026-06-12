"use client";
import { useState, useEffect } from "react";
import { getAllQuestions } from "@/lib/store";
import type { Question } from "@/lib/types";
import MathRenderer from "@/components/math/MathRenderer";
import { Bookmark, BookmarkX, Search } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SaqlananPage() {
  const [allQuestions, setAllQuestions] = useState<Question[]>([]);
  const [saved, setSaved] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Question | null>(null);

  useEffect(() => {
    getAllQuestions().then((qs) => {
      setAllQuestions(qs);
      const ids = new Set(qs.slice(0, 3).map((q) => q.id));
      setSaved(ids);
    });
  }, []);

  function unsave(id: string) {
    setSaved((prev) => { const n = new Set(prev); n.delete(id); return n; });
    if (selected?.id === id) setSelected(null);
  }

  const savedQuestions = allQuestions.filter(
    (q) => saved.has(q.id) && (!search || q.topic.toLowerCase().includes(search.toLowerCase()) || q.text.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-white mb-1">Saqlangan</h1>
        <p className="text-gray-500 text-sm">Keyinroq ko&apos;rib chiqish uchun saqlangan masalalar</p>
      </div>

      {saved.size === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <Bookmark size={40} className="text-gray-700 mb-3" />
          <p className="text-gray-500 text-sm">Hali saqlangan masalalar yo&apos;q</p>
          <p className="text-gray-700 text-xs mt-1">Masalalar bankidan masala saqlang</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-5">
          <div>
            <div className="relative mb-3">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Mavzu yoki matn bo'yicha qidirish..."
                className="w-full bg-dark-card border border-dark-border rounded-lg pl-9 pr-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-brand/50"
              />
            </div>

            <div className="space-y-2">
              {savedQuestions.map((q) => (
                <div
                  key={q.id}
                  onClick={() => setSelected(q)}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors",
                    selected?.id === q.id
                      ? "bg-brand/5 border-brand/30"
                      : "bg-dark-card border-dark-border hover:border-dark-hover"
                  )}
                >
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-gray-400 truncate">
                      <MathRenderer formula={q.text.slice(0, 60)} />
                    </div>
                    <div className="flex gap-2 mt-1">
                      <span className="text-[10px] text-gray-600">{q.topic}</span>
                      <span className="text-[10px] text-gray-700">·</span>
                      <span className={cn("text-[10px]",
                        q.difficulty === "Oson" ? "text-green-500" :
                        q.difficulty === "O'rtacha" ? "text-yellow-500" : "text-red-500")}>
                        {q.difficulty}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); unsave(q.id); }}
                    className="text-gray-600 hover:text-red-400 transition-colors shrink-0"
                  >
                    <BookmarkX size={15} />
                  </button>
                </div>
              ))}
              {savedQuestions.length === 0 && (
                <p className="text-gray-600 text-sm text-center py-8">Natija topilmadi</p>
              )}
            </div>
          </div>

          <div className="bg-dark-card border border-dark-border rounded-xl p-5 h-fit sticky top-6">
            {selected ? (
              <>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs text-gray-500 bg-dark-hover px-2 py-0.5 rounded">{selected.topic}</span>
                  <span className={cn("text-xs px-2 py-0.5 rounded",
                    selected.difficulty === "Oson" ? "bg-green-500/10 text-green-400" :
                    selected.difficulty === "O'rtacha" ? "bg-yellow-500/10 text-yellow-400" : "bg-red-500/10 text-red-400")}>
                    {selected.difficulty}
                  </span>
                </div>
                <div className="mb-5">
                  <MathRenderer formula={selected.text} displayMode />
                </div>
                <div className="space-y-2 mb-4">
                  {selected.options.map((opt, i) => (
                    <div key={i} className={cn("flex items-center gap-2 p-2.5 rounded-lg text-sm border",
                      opt === selected.answer
                        ? "bg-green-500/10 border-green-500/30 text-green-300"
                        : "bg-dark-hover border-transparent text-gray-400")}>
                      <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px] font-bold shrink-0">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <MathRenderer formula={opt} />
                    </div>
                  ))}
                </div>
                {selected.solution && (
                  <div className="bg-dark-hover rounded-lg p-3 border border-dark-border">
                    <p className="text-[10px] text-gray-600 mb-1 uppercase tracking-wide">Yechim</p>
                    <div className="text-sm text-gray-300">
                      <MathRenderer formula={selected.solution} displayMode />
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-48 text-center">
                <Bookmark size={30} className="text-gray-700 mb-2" />
                <p className="text-gray-600 text-sm">Masalani tanlang</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
