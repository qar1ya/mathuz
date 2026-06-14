"use client";
import { useState, useEffect } from "react";
import { getAllQuestions } from "@/lib/store";
import type { Question, Difficulty } from "@/lib/types";
import MathRenderer from "@/components/math/MathRenderer";
import { Bookmark, CheckCircle, XCircle, ArrowLeft, Filter, MoreHorizontal, Play, ChevronRight, ChevronLeft, Flag } from "lucide-react";
import { cn } from "@/lib/utils";

type Category = "Algebra" | "Geometriya";
type View = "landing" | "category" | "geocat" | "questions";

type SubGroup = { label: string; topics: string[] };
type GeoGroup = { label: string; topics: string[]; gradient: string; icon: string; subGroups: SubGroup[] };

const ALGEBRA_TOPICS: string[] = [
  "Algebra", "Tengsizlik", "Logarifm",
  "Hosila", "Integral", "Ehtimollik",
  "Kombinatorika", "Ketma-ketlik",
];

const ALGEBRA_GROUPS: SubGroup[] = [
  { label: "Asosiy algebra", topics: ["Algebra", "Tengsizlik"] },
  { label: "Funksiyalar va analiz", topics: ["Hosila", "Integral"] },
  { label: "Ehtimollik va kombinatorika", topics: ["Ehtimollik", "Kombinatorika"] },
  { label: "Ketma-ketlik va logarifm", topics: ["Ketma-ketlik", "Logarifm"] },
];

const PLANIMETRIYA_SUBGROUPS: SubGroup[] = [
  {
    label: "Burchaklar",
    topics: [
      "O'tkir va o'tmas burchaklar",
      "Kesishuvchi to'g'ri chiziqlar",
      "Parallel to'g'ri chiziqlar va kesuvchi",
      "Uchburchak burchaklari",
      "Uchburchakning tashqi burchaklari",
    ],
  },
  {
    label: "To'g'ri burchakli uchburchak",
    topics: [
      "To'g'ri burchakli uchburchak. Pifagor teoremasi",
      "Teng yonli to'g'ri burchakli uchburchak",
      "Eng ko'p uchraydigan to'g'ri burchakli uchburchaklar",
      "To'g'ri burchakli uchburchakning yuzi va balandligi",
      "To'g'ri burchakli uchburchakning gipotenuzasiga tushirilgan medianasi",
      "To'g'ri burchakli uchburchak o'tkir burchagining sin, cos, tan, cot",
      "To'g'ri burchakli uchburchakda balandlik va burchaklar",
      "Katetlarning gipotenuzadagi proyeksiyalari",
      "To'g'ri burchakli uchburchakda o'xshashlik",
    ],
  },
  {
    label: "Uchburchak",
    topics: [
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
    ],
  },
  {
    label: "To'rtburchaklar",
    topics: [
      "Kvadrat",
      "To'g'ri to'rtburchak",
      "To'g'ri to'rtburchakda uchburchaklarning o'xshashligini qo'llash",
      "Parallelogramm",
      "Romb",
      "Trapetsiya",
      "Deltoid",
      "Ixtiyoriy to'rtburchaklar",
    ],
  },
  {
    label: "Aylana va ko'pburchaklar",
    topics: [
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
    ],
  },
  {
    label: "Koordinatalar va vektorlar",
    topics: [
      "Dekart koordinatalar sistemasi",
      "Koordinatalari bilan berilgan uchburchakning yuzi",
      "Koordinatalar sistemasida parallelogramm",
      "Aylana tenglamasi",
      "Doira tenglamasi",
      "Vektorlar",
      "To'g'ri chiziq",
      "To'g'ri chiziqqa doir masalalarda vektorlardan foydalanish",
    ],
  },
];

const GEO_GROUPS: GeoGroup[] = [
  {
    label: "Planimetriya",
    topics: PLANIMETRIYA_SUBGROUPS.flatMap(sg => sg.topics),
    gradient: "linear-gradient(135deg,#0369a1 0%,#06b6d4 100%)",
    icon: "△",
    subGroups: PLANIMETRIYA_SUBGROUPS,
  },
  {
    label: "Stereometriya",
    topics: ["Stereometriya"],
    gradient: "linear-gradient(135deg,#7c3aed 0%,#db2777 100%)",
    icon: "⬡",
    subGroups: [{ label: "Stereometriya", topics: ["Stereometriya"] }],
  },
];

const GEO_TOPICS: string[] = GEO_GROUPS.flatMap(g => g.topics);

const DIFFICULTIES: (Difficulty | "Barchasi")[] = ["Barchasi", "Oson", "O'rtacha", "Qiyin"];

const diffBadge = (d: string) =>
  d === "Oson" ? "bg-green-500/15 text-green-400"
  : d === "O'rtacha" ? "bg-yellow-500/15 text-yellow-400"
  : "bg-red-500/15 text-red-400";

export default function MasalalarPage() {
  const [all, setAll] = useState<Question[]>([]);
  const [view, setView] = useState<View>("landing");
  const [cat, setCat] = useState<Category | null>(null);
  const [activeGeoGroup, setActiveGeoGroup] = useState<GeoGroup | null>(null);
  const [activeTopic, setActiveTopic] = useState<string | null>(null);
  const [diff, setDiff] = useState<Difficulty | "Barchasi">("Barchasi");
  const [idx, setIdx] = useState(0);
  const [showSol, setShowSol] = useState(false);
  const [picked, setPicked] = useState<string | null>(null);

  useEffect(() => { getAllQuestions().then(setAll); }, []);

  const catCount = (c: Category) =>
    all.filter(q => (c === "Algebra" ? ALGEBRA_TOPICS : GEO_TOPICS).includes(q.topic)).length;
  const topicCount = (t: string) => all.filter(q => q.topic === t).length;
  const groupCount = (topics: string[]) => topics.reduce((s, t) => s + topicCount(t), 0);

  const filtered = activeTopic
    ? all.filter(q => q.topic === activeTopic && (diff === "Barchasi" || q.difficulty === diff))
    : [];
  const active = filtered[idx] ?? null;

  function openCat(c: Category) { setCat(c); setView("category"); setActiveTopic(null); setActiveGeoGroup(null); }
  function openGeoGroup(g: GeoGroup) { setActiveGeoGroup(g); setView("geocat"); setActiveTopic(null); }
  function openTopic(t: string) {
    setActiveTopic(t); setView("questions");
    setDiff("Barchasi"); setIdx(0); setShowSol(false); setPicked(null);
  }
  function backToLanding() { setView("landing"); setCat(null); setActiveGeoGroup(null); }
  function backToCategory() { setView("category"); setActiveGeoGroup(null); setActiveTopic(null); }
  function backToGeoCat() { setView("geocat"); setActiveTopic(null); }

  function pickAnswer(opt: string) {
    if (picked !== null) return;
    setPicked(opt);
  }

  function goNext() {
    if (idx < filtered.length - 1) { setIdx(idx + 1); setPicked(null); setShowSol(false); }
  }
  function goPrev() {
    if (idx > 0) { setIdx(idx - 1); setPicked(null); setShowSol(false); }
  }

  // ── LANDING ───────────────────────────────────────────────────────────────
  if (view === "landing") {
    return (
      <div className="p-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center text-brand font-bold text-lg">?</div>
          <h1 className="text-white text-2xl font-bold">Masalalar Banki</h1>
        </div>
        <div className="grid grid-cols-2 gap-5 max-w-2xl">
          {([
            { c: "Algebra" as Category, gradient: "linear-gradient(135deg,#7c3aed 0%,#2563eb 100%)", icon: "∑" },
            { c: "Geometriya" as Category, gradient: "linear-gradient(135deg,#059669 0%,#0d9488 100%)", icon: "△" },
          ]).map(({ c, gradient, icon }) => (
            <div key={c} onClick={() => openCat(c)}
              className="relative rounded-2xl overflow-hidden p-6 min-h-[200px] flex flex-col justify-between cursor-pointer hover:opacity-90 transition-opacity"
              style={{ background: gradient }}>
              <span className="absolute right-4 top-2 text-white/10 font-bold select-none pointer-events-none" style={{ fontSize: 110, lineHeight: 1 }}>{icon}</span>
              <div>
                <h2 className="text-white text-xl font-bold mb-1">{c}</h2>
                <p className="text-white/70 text-sm">{catCount(c)} ta masala</p>
              </div>
              <button className="flex items-center gap-1 bg-white text-black text-sm font-semibold px-4 py-2 rounded-full w-fit hover:bg-gray-100 transition-colors">
                Ochish <ChevronRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── ALGEBRA CATEGORY ──────────────────────────────────────────────────────
  if (view === "category" && cat === "Algebra") {
    return (
      <div className="flex-1 overflow-y-auto p-8">
        <button onClick={backToLanding} className="flex items-center gap-1.5 text-gray-400 hover:text-white text-sm transition-colors mb-6">
          <ArrowLeft size={15} /> Masalalar Bankiga qaytish
        </button>
        <div className="flex items-start justify-between mb-6">
          <h1 className="text-white text-3xl font-bold">Algebra</h1>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-dark-card border border-dark-border rounded-lg text-gray-300 text-sm hover:border-gray-500 transition-colors">
              <Filter size={14} /> Filtrlar
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-dark-card border border-dark-border rounded-lg text-gray-300 text-sm hover:border-gray-500 transition-colors">
              <MoreHorizontal size={14} /> Boshqa
            </button>
          </div>
        </div>
        <div className="bg-dark-card border border-dark-border rounded-2xl p-5 flex items-center justify-between mb-8">
          <div>
            <p className="text-white font-bold text-base mb-0.5">Barcha mavzularni mashq qiling</p>
            <p className="text-gray-500 text-sm">Algebra bo&apos;limida {catCount("Algebra")} ta masalani yechib ko&apos;ring</p>
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-dark-hover border border-dark-border rounded-xl text-white text-sm font-medium hover:bg-dark-border transition-colors">
            <Play size={14} className="text-brand" /> Boshlash
          </button>
        </div>
        <TableHeader />
        {ALGEBRA_GROUPS.map(group => (
          <div key={group.label} className="mb-6">
            <p className="text-white font-semibold text-base py-3 px-2">{group.label}</p>
            {group.topics.map(topic => (
              <TopicRow key={topic} topic={topic} count={topicCount(topic)} onClick={() => openTopic(topic)} />
            ))}
          </div>
        ))}
      </div>
    );
  }

  // ── GEOMETRIYA CATEGORY (2 cards) ─────────────────────────────────────────
  if (view === "category" && cat === "Geometriya") {
    return (
      <div className="p-8">
        <button onClick={backToLanding} className="flex items-center gap-1.5 text-gray-400 hover:text-white text-sm transition-colors mb-6">
          <ArrowLeft size={15} /> Masalalar Bankiga qaytish
        </button>
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center text-brand font-bold text-lg">△</div>
          <h1 className="text-white text-2xl font-bold">Geometriya</h1>
        </div>
        <div className="grid grid-cols-2 gap-5 max-w-2xl">
          {GEO_GROUPS.map(group => (
            <div key={group.label} onClick={() => openGeoGroup(group)}
              className="relative rounded-2xl overflow-hidden p-6 min-h-[200px] flex flex-col justify-between cursor-pointer hover:opacity-90 transition-opacity"
              style={{ background: group.gradient }}>
              <span className="absolute right-4 top-2 text-white/10 font-bold select-none pointer-events-none" style={{ fontSize: 110, lineHeight: 1 }}>{group.icon}</span>
              <div>
                <h2 className="text-white text-xl font-bold mb-1">{group.label}</h2>
                <p className="text-white/70 text-sm">{groupCount(group.topics)} ta masala</p>
              </div>
              <button className="flex items-center gap-1 bg-white text-black text-sm font-semibold px-4 py-2 rounded-full w-fit hover:bg-gray-100 transition-colors">
                Ochish <ChevronRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── GEO SUBCATEGORY ────────────────────────────────────────────────────────
  if (view === "geocat" && activeGeoGroup) {
    return (
      <div className="flex-1 overflow-y-auto p-8">
        <button onClick={backToCategory} className="flex items-center gap-1.5 text-gray-400 hover:text-white text-sm transition-colors mb-6">
          <ArrowLeft size={15} /> Geometriyaga qaytish
        </button>
        <div className="flex items-start justify-between mb-6">
          <h1 className="text-white text-3xl font-bold">{activeGeoGroup.label}</h1>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-dark-card border border-dark-border rounded-lg text-gray-300 text-sm hover:border-gray-500 transition-colors">
              <Filter size={14} /> Filtrlar
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-dark-card border border-dark-border rounded-lg text-gray-300 text-sm hover:border-gray-500 transition-colors">
              <MoreHorizontal size={14} /> Boshqa
            </button>
          </div>
        </div>
        <div className="bg-dark-card border border-dark-border rounded-2xl p-5 flex items-center justify-between mb-8">
          <div>
            <p className="text-white font-bold text-base mb-0.5">Barcha mavzularni mashq qiling</p>
            <p className="text-gray-500 text-sm">{activeGeoGroup.label} bo&apos;limida {groupCount(activeGeoGroup.topics)} ta masalani yechib ko&apos;ring</p>
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-dark-hover border border-dark-border rounded-xl text-white text-sm font-medium hover:bg-dark-border transition-colors">
            <Play size={14} className="text-brand" /> Boshlash
          </button>
        </div>
        <TableHeader />
        {activeGeoGroup.subGroups.map(subGroup => (
          <div key={subGroup.label} className="mb-6">
            <p className="text-white font-semibold text-base py-3 px-2">{subGroup.label}</p>
            {subGroup.topics.map(topic => (
              <TopicRow key={topic} topic={topic} count={topicCount(topic)} onClick={() => openTopic(topic)} />
            ))}
          </div>
        ))}
      </div>
    );
  }

  // ── QUESTIONS (full-screen single question) ───────────────────────────────
  const goBack = cat === "Geometriya" ? backToGeoCat : backToCategory;

  return (
    <div className="flex flex-col h-full bg-dark-bg">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-dark-border shrink-0">
        <button onClick={goBack} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm">
          <ArrowLeft size={16} /> Orqaga
        </button>
        <div className="flex items-center gap-3">
          <span className="text-gray-500 text-sm font-medium">{activeTopic}</span>
          <span className="text-xs bg-dark-card border border-dark-border px-2.5 py-1 rounded-full text-gray-500">
            {filtered.length} ta masala
          </span>
        </div>
        <div className="flex items-center gap-2">
          {DIFFICULTIES.map(d => (
            <button key={d} onClick={() => { setDiff(d); setIdx(0); setPicked(null); setShowSol(false); }}
              className={cn("text-xs px-3 py-1.5 rounded-full transition-colors",
                diff === d ? "bg-brand text-black font-semibold" : "text-gray-500 hover:text-white bg-dark-card border border-dark-border")}>
              {d === "Barchasi" ? "Barchasi" : d}
            </button>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto">
        {active ? (
          <div className="max-w-2xl mx-auto px-6 py-8">
            {/* Question number + badges */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-dark-card border border-dark-border flex items-center justify-center text-white text-sm font-bold">
                  {idx + 1}
                </div>
                <span className={cn("text-xs font-medium px-2.5 py-1 rounded-full", diffBadge(active.difficulty))}>
                  {active.difficulty}
                </span>
                {active.examType.map(e => (
                  <span key={e} className="text-xs bg-brand/10 text-brand px-2.5 py-1 rounded-full">{e}</span>
                ))}
              </div>
              <button className="flex items-center gap-1.5 text-gray-500 hover:text-yellow-400 transition-colors text-xs">
                <Flag size={13} /> Belgilash
              </button>
            </div>

            {/* Question */}
            <div className="bg-dark-card border border-dark-border rounded-2xl p-6 mb-6">
              <div className="text-white text-base leading-relaxed">
                <MathRenderer formula={active.text} displayMode />
              </div>
              {active.diagramSvg && (
                <div className="mt-5 flex justify-center" dangerouslySetInnerHTML={{ __html: active.diagramSvg }} />
              )}
            </div>

            {/* Answer options */}
            <div className="flex flex-col gap-3 mb-8">
              {active.options.map((opt, i) => {
                const letter = String.fromCharCode(65 + i);
                const isCorrect = opt === active.answer;
                const isSelected = picked === opt;
                const revealed = picked !== null || showSol;
                return (
                  <button key={i} onClick={() => pickAnswer(opt)}
                    disabled={picked !== null}
                    className={cn(
                      "w-full flex items-center gap-4 px-5 py-4 rounded-2xl border-2 text-left transition-all",
                      !revealed && "bg-dark-card border-dark-border hover:border-brand/50 hover:bg-dark-hover text-white",
                      revealed && isCorrect && "bg-green-500/10 border-green-500 text-green-300",
                      revealed && isSelected && !isCorrect && "bg-red-500/10 border-red-500 text-red-400",
                      revealed && !isSelected && !isCorrect && "bg-dark-card border-dark-border text-gray-600 opacity-60"
                    )}>
                    <span className={cn(
                      "w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-bold shrink-0 transition-all",
                      !revealed && "border-gray-600 text-gray-400",
                      revealed && isCorrect && "border-green-500 text-green-400 bg-green-500/20",
                      revealed && isSelected && !isCorrect && "border-red-500 text-red-400 bg-red-500/20",
                      revealed && !isSelected && !isCorrect && "border-gray-700 text-gray-600"
                    )}>
                      {letter}
                    </span>
                    <span className="flex-1 text-sm leading-relaxed">
                      <MathRenderer formula={opt} />
                    </span>
                    {revealed && isCorrect && <CheckCircle size={18} className="text-green-400 shrink-0" />}
                    {revealed && isSelected && !isCorrect && <XCircle size={18} className="text-red-400 shrink-0" />}
                  </button>
                );
              })}
            </div>

            {/* Explanation */}
            {(picked !== null || showSol) && active.solution && (
              <div className="bg-dark-card border border-brand/20 rounded-2xl p-5 mb-6">
                <p className="text-brand text-xs font-semibold uppercase tracking-widest mb-3">Yechim</p>
                <div className="text-white text-sm leading-relaxed">
                  <MathRenderer formula={active.solution} displayMode />
                </div>
              </div>
            )}

            {picked === null && (
              <button onClick={() => setShowSol(!showSol)}
                className="text-gray-500 hover:text-white text-sm transition-colors underline underline-offset-4">
                {showSol ? "Yechimni yashirish" : "Yechimni ko'rish"}
              </button>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-600 text-sm">Bu mavzuda hali masala yo&apos;q</p>
          </div>
        )}
      </div>

      {/* Bottom navigation bar */}
      <div className="shrink-0 border-t border-dark-border px-6 py-4 flex items-center justify-between bg-dark-sidebar">
        <button onClick={goPrev} disabled={idx === 0}
          className={cn("flex items-center gap-2 px-5 py-2.5 rounded-xl border text-sm font-medium transition-all",
            idx === 0
              ? "border-dark-border text-gray-700 cursor-not-allowed"
              : "border-dark-border text-gray-300 hover:border-gray-500 hover:text-white bg-dark-card")}>
          <ChevronLeft size={16} /> Oldingi
        </button>

        <div className="flex items-center gap-2">
          <span className="text-gray-400 text-sm font-medium">{filtered.length > 0 ? idx + 1 : 0}</span>
          <span className="text-gray-600 text-sm">/</span>
          <span className="text-gray-500 text-sm">{filtered.length}</span>
        </div>

        <button onClick={goNext} disabled={idx >= filtered.length - 1}
          className={cn("flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all",
            idx >= filtered.length - 1
              ? "bg-dark-card border border-dark-border text-gray-700 cursor-not-allowed"
              : "bg-brand text-black hover:bg-brand/90")}>
          Keyingi <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

function TableHeader() {
  return (
    <div className="grid grid-cols-[1fr_200px_100px] gap-4 px-2 pb-2 border-b border-dark-border mb-2">
      <span className="text-gray-500 text-xs font-semibold uppercase tracking-widest">Mavzu</span>
      <span className="text-gray-500 text-xs font-semibold uppercase tracking-widest">Progress</span>
      <span className="text-gray-500 text-xs font-semibold uppercase tracking-widest text-right">Aniqlik</span>
    </div>
  );
}

function TopicRow({ topic, count, onClick }: { topic: string; count: number; onClick: () => void }) {
  return (
    <button onClick={onClick}
      className="w-full grid grid-cols-[1fr_200px_100px] gap-4 items-center px-2 py-3.5 rounded-xl hover:bg-dark-hover transition-colors border border-transparent hover:border-dark-border group">
      <div className="flex items-center gap-3">
        <div className="w-5 h-5 rounded-full border border-gray-600 group-hover:border-brand transition-colors shrink-0" />
        <span className="text-gray-200 text-sm font-medium group-hover:text-white transition-colors text-left">{topic}</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex-1 h-1.5 bg-dark-border rounded-full overflow-hidden">
          <div className="h-full bg-brand rounded-full" style={{ width: "0%" }} />
        </div>
        <span className="text-gray-500 text-xs w-12 text-right">0/{count}</span>
      </div>
      <div className="text-right">
        <span className="text-gray-600 text-sm">—</span>
      </div>
    </button>
  );
}
