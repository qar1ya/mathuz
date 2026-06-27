"use client";
import { useState, useEffect, useCallback } from "react";
import { getAllQuestions } from "@/lib/store";
import type { Question, Difficulty } from "@/lib/types";
import MathRenderer from "@/components/math/MathRenderer";
import {
  ArrowLeft, Filter, MoreHorizontal, Play, ChevronRight, ChevronLeft,
  ChevronDown, Pause, Bookmark, BookmarkCheck, Flag, RotateCcw,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Category = "Algebra" | "Geometriya" | "Skanaviy";
type View = "landing" | "category" | "geocat" | "questions";
type SubGroup = { label: string; topics: string[] };
type GeoGroup = { label: string; topics: string[]; gradient: string; icon: string; subGroups: SubGroup[] };

const ALGEBRA_GROUPS: SubGroup[] = [
  {
    label: "Sonlar (1–5)",
    topics: [
      "Natural sonlar va ular ustida amallar",
      "Bo'linish belgilari, tub va murakkab sonlar",
      "Sonlarni tub ko'paytuvchilarga ajratish, EKUB va EKUK",
      "Bo'linuvchanlik. Sonning natural bo'luvchilar soni va yig'indisi",
      "Qoldiqli bo'lish. Oxirgi raqam",
    ],
  },
  {
    label: "Kasrlar va sonlar (6–10)",
    topics: [
      "Oddiy kasrlar va ular ustida amallar",
      "O'nli kasrlar, davriy o'nli kasrlar. Haqiqiy sonlar ustida amallar",
      "Ratsional sonlar va ular ustida amallar",
      "Nisbat, proporsiya, qism va foiz",
      "Geometrik shakllar",
    ],
  },
  {
    label: "Daraja va algebraik ifodalar (11–20)",
    topics: [
      "Daraja va uning xossalari, darajali ifodalar (1-qism)",
      "Daraja va uning xossalari, darajali ifodalar (2-qism)",
      "O'lchov birliklar. Birhadlar va algebraik ifodalar",
      "Ko'phadlar va ular ustida amallar",
      "Qisqa ko'paytirish formulalari (1-qism)",
      "Qisqa ko'paytirish formulalari (2-qism)",
      "Ko'paytuvchilarga ajratish (1-qism)",
      "Ko'paytuvchilarga ajratish (2-qism)",
      "Algebraik kasrlar (1-qism)",
      "Algebraik kasrlar (2-qism)",
    ],
  },
  {
    label: "Tenglamalar va funksiyalar (21–25)",
    topics: [
      "Chiziqli tenglamalar",
      "Chiziqli tenglamalar sistemasi",
      "Tenglama va tenglamalar sistemasi orqali yechiladigan matnli masalalar",
      "Chiziqli tengsizlik va tengsizliklar sistemasi",
      "Chiziqli funksiya, uning grafigi va xossalari",
    ],
  },
  {
    label: "Ildiz va kvadrat tenglama (26–29)",
    topics: [
      "Arifmetik kvadrat ildiz va uning xossalari",
      "Ildizli ifodalar",
      "Kvadrat tenglama va uning ildizlari",
      "Viyet teoremasi",
    ],
  },
];
const ALGEBRA_TOPICS: string[] = ALGEBRA_GROUPS.flatMap(g => g.topics);

const PLANIMETRIYA_SUBGROUPS: SubGroup[] = [
  {
    label: "Burchaklar",
    topics: [
      "O'tkir va o'tmas burchaklar",
      "Kesishuvchi to'g'ri chiziqlar",
      "Parallel to'g'ri chiziqlar va kesuvchi",
      "Uchburchak burchaqlari",
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
      "To'g'ri chiziqqa doid masalalarda vektorlardan foydalanish",
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

// ── SKANAVIY GROUPS ──────────────────────────────────────────────────────────
const SKANAVIY_GROUPS: SubGroup[] = [
  {
    label: "Algebraik ifodalar (1–4 bob)",
    topics: [
      "Skanaviy: Algebraik ifodalar",
      "Skanaviy: Darajali va ildizli ifodalar",
      "Skanaviy: Logarifmik ifodalar",
      "Skanaviy: Trigonometrik ifodalar",
    ],
  },
  {
    label: "Tenglamalar (5–9 bob)",
    topics: [
      "Skanaviy: Algebraik tenglamalar",
      "Skanaviy: Irratsional tenglamalar",
      "Skanaviy: Logarifmik tenglamalar",
      "Skanaviy: Trigonometrik tenglamalar",
      "Skanaviy: Tenglamalar sistemasi",
    ],
  },
  {
    label: "Tengsizliklar (10–13 bob)",
    topics: [
      "Skanaviy: Algebraik tengsizliklar",
      "Skanaviy: Irratsional tengsizliklar",
      "Skanaviy: Logarifmik tengsizliklar",
      "Skanaviy: Trigonometrik tengsizliklar",
    ],
  },
  {
    label: "Funksiyalar va grafiklar (14–16 bob)",
    topics: [
      "Skanaviy: Funksiyalar va ularning xossalari",
      "Skanaviy: Funksiya grafiklari",
      "Skanaviy: Trigonometrik funksiyalar",
    ],
  },
  {
    label: "Kombinatorika va ehtimollik (17–18 bob)",
    topics: [
      "Skanaviy: Kombinatorika",
      "Skanaviy: Ehtimollik nazariyasi",
    ],
  },
  {
    label: "Analiz elementlari (19–20 bob)",
    topics: [
      "Skanaviy: Hosila va qo'llanilishi",
      "Skanaviy: Integral va qo'llanilishi",
    ],
  },
];
const SKANAVIY_TOPICS: string[] = SKANAVIY_GROUPS.flatMap(g => g.topics);
const DIFFICULTIES: (Difficulty | "Barchasi")[] = ["Barchasi", "Oson", "O'rtacha", "Qiyin"];
const isImageUrl = (s: string) => s.startsWith("/") || s.startsWith("http");

function formatTime(s: number) {
  const m = Math.floor(s / 60);
  return `${String(m).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
}

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

  // question-view state
  const [userAnswer, setUserAnswer] = useState("");
  const [showSol, setShowSol] = useState(false);
  const [selectedOpt, setSelectedOpt] = useState<string | null>(null);
  const [checkedOpt, setCheckedOpt] = useState<string | null>(null);
  const [crossedOut, setCrossedOut] = useState<Set<string>>(new Set());
  const [markedSet, setMarkedSet] = useState<Set<string>>(new Set());
  const [seconds, setSeconds] = useState(0);
  const [timerPaused, setTimerPaused] = useState(false);
  const [timerHidden, setTimerHidden] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => { getAllQuestions().then(setAll); }, []);

  useEffect(() => {
    if (view !== "questions" || timerPaused) return;
    const t = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(t);
  }, [view, timerPaused]);

  const resetQuestion = useCallback(() => {
    setUserAnswer(""); setShowSol(false);
    setSelectedOpt(null); setCheckedOpt(null);
    setCrossedOut(new Set()); setShowExplanation(false); setSeconds(0);
  }, []);

  const catCount = (c: Category) => {
    const topics = c === "Algebra" ? ALGEBRA_TOPICS : c === "Geometriya" ? GEO_TOPICS : SKANAVIY_TOPICS;
    return all.filter(q => topics.includes(q.topic)).length;
  };
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
    setDiff("Barchasi"); setIdx(0); resetQuestion();
  }
  function backToLanding() { setView("landing"); setCat(null); setActiveGeoGroup(null); }
  function backToCategory() { setView("category"); setActiveGeoGroup(null); setActiveTopic(null); }
  function backToGeoCat() { setView("geocat"); setActiveTopic(null); }

  function goNext() {
    if (idx < filtered.length - 1) { setIdx(idx + 1); resetQuestion(); }
  }
  function goPrev() {
    if (idx > 0) { setIdx(idx - 1); resetQuestion(); }
  }

  // ── LANDING ───────────────────────────────────────────────────────────────
  if (view === "landing") {
    return (
      <div className="p-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center text-brand font-bold text-lg">?</div>
          <h1 className="text-white text-2xl font-bold">Masalalar Banki</h1>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 max-w-3xl">
          {([
            { c: "Algebra" as Category,   gradient: "linear-gradient(135deg,#7c3aed 0%,#2563eb 100%)", icon: "∑" },
            { c: "Geometriya" as Category, gradient: "linear-gradient(135deg,#059669 0%,#0d9488 100%)", icon: "△" },
            { c: "Skanaviy" as Category,  gradient: "linear-gradient(135deg,#b45309 0%,#dc2626 100%)", icon: "S" },
          ]).map(({ c, gradient, icon }) => (
            <div key={c} onClick={() => openCat(c)}
              className="relative rounded-2xl overflow-hidden p-6 min-h-[200px] flex flex-col justify-between cursor-pointer hover:opacity-90 transition-opacity"
              style={{ background: gradient }}>
              <span className="absolute right-4 top-2 text-white/10 font-bold select-none pointer-events-none" style={{ fontSize: 110, lineHeight: 1 }}>{icon}</span>
              <div>
                <h2 className="text-white text-xl font-bold mb-1">{c}</h2>
                {c === "Skanaviy" && <p className="text-white/60 text-xs mb-1">M.I. Skanavi to&apos;plami</p>}
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

  // ── SKANAVIY CATEGORY ────────────────────────────────────────────────────
  if (view === "category" && cat === "Skanaviy") {
    return (
      <div className="flex-1 overflow-y-auto p-8">
        <button onClick={backToLanding} className="flex items-center gap-1.5 text-gray-400 hover:text-white text-sm transition-colors mb-6">
          <ArrowLeft size={15} /> Masalalar Bankiga qaytish
        </button>
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-white text-3xl font-bold">Skanaviy</h1>
            <p className="text-gray-500 text-sm mt-1">M.I. Skanavi — Matematika masalalari to&apos;plami</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#b45309]/30 bg-[#b45309]/10">
            <span className="text-[#f97316] text-sm font-bold">S</span>
            <span className="text-[#f97316] text-xs">Skanaviy</span>
          </div>
        </div>
        <div className="bg-dark-card border border-dark-border rounded-2xl p-5 flex items-center justify-between mb-8">
          <div>
            <p className="text-white font-bold text-base mb-0.5">Barcha boblarni o&apos;rganing</p>
            <p className="text-gray-500 text-sm">Skanaviy to&apos;plamida {catCount("Skanaviy")} ta masala</p>
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-dark-hover border border-dark-border rounded-xl text-white text-sm font-medium hover:bg-dark-border transition-colors">
            <Play size={14} className="text-brand" /> Boshlash
          </button>
        </div>
        <TableHeader />
        {SKANAVIY_GROUPS.map(group => (
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

  // ── GEOMETRIYA CATEGORY ───────────────────────────────────────────────────
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

  // ── QUESTIONS VIEW (Preppy/SAT style) ─────────────────────────────────────
  const goBack = cat === "Geometriya" ? backToGeoCat : backToCategory;
  const toggleMark = () => {
    if (!active) return;
    setMarkedSet(prev => {
      const s = new Set(prev);
      s.has(active.id) ? s.delete(active.id) : s.add(active.id);
      return s;
    });
  };
  const isMarked = active ? markedSet.has(active.id) : false;

  const svgFill = (s: string) =>
    s.replace(/(<svg\b[^>]*?)style="[^"]*"/i, '$1style="display:block;width:100%;"');

  const mainContent = active ? (
    active.diagramSvg ? (
      <div className="flex-1 flex overflow-hidden">
        <div className="w-1/2 border-r border-[#222] flex items-center justify-center bg-[#0a0f18] overflow-auto">
          {isImageUrl(active.diagramSvg) ? (
            <img src={active.diagramSvg} alt="diagram" className="w-full object-contain" />
          ) : (
            <div className="w-full p-5"
              dangerouslySetInnerHTML={{ __html: svgFill(active.diagramSvg) }} />
          )}
        </div>
        <div className="w-1/2 overflow-y-auto">
          <QuestionBody
            active={active} idx={idx}
            isMarked={isMarked} onToggleMark={toggleMark}
            selectedOpt={selectedOpt} setSelectedOpt={setSelectedOpt}
            checkedOpt={checkedOpt} setCheckedOpt={setCheckedOpt}
            crossedOut={crossedOut} setCrossedOut={setCrossedOut}
            userAnswer={userAnswer} setUserAnswer={setUserAnswer}
            showSol={showSol} setShowSol={setShowSol}
            showExplanation={showExplanation}
            resetQuestion={resetQuestion}
          />
        </div>
      </div>
    ) : (
      <div className="flex-1 overflow-y-auto flex justify-center">
        <div className="w-full max-w-2xl">
          <QuestionBody
            active={active} idx={idx}
            isMarked={isMarked} onToggleMark={toggleMark}
            selectedOpt={selectedOpt} setSelectedOpt={setSelectedOpt}
            checkedOpt={checkedOpt} setCheckedOpt={setCheckedOpt}
            crossedOut={crossedOut} setCrossedOut={setCrossedOut}
            userAnswer={userAnswer} setUserAnswer={setUserAnswer}
            showSol={showSol} setShowSol={setShowSol}
            showExplanation={showExplanation}
            resetQuestion={resetQuestion}
          />
        </div>
      </div>
    )
  ) : (
    <div className="flex-1 flex items-center justify-center">
      <p className="text-gray-600 text-sm">Bu mavzuda hali masala yo&apos;q</p>
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-[#0c0c0c]">

      {/* ── TOP BAR ─────────────────────────────────────────────────── */}
      <div className="shrink-0 flex items-center justify-between px-5 py-2 border-b border-[#1e1e1e]">
        {/* Left */}
        <div className="flex items-center gap-3 min-w-[220px]">
          <button onClick={goBack}
            className="flex items-center gap-1 text-gray-300 hover:text-white text-sm font-medium transition-colors">
            <ChevronLeft size={16} /> Go back
          </button>
          <div className="w-px h-4 bg-[#333]" />
          <button className="flex items-center gap-1.5 text-gray-400 hover:text-white text-xs border border-[#2a2a2a] hover:border-[#444] rounded-md px-2.5 py-1.5 transition-colors max-w-[130px]">
            <span className="truncate">{activeTopic}</span>
            <ChevronDown size={12} className="shrink-0" />
          </button>
        </div>

        {/* Center — timer */}
        <div className="flex flex-col items-center gap-0.5">
          <span className="text-white font-mono font-bold text-xl tracking-widest leading-none">
            {timerHidden ? "••:••" : formatTime(seconds)}
          </span>
          <div className="flex items-center gap-3">
            <button onClick={() => setTimerPaused(p => !p)}
              className="text-gray-500 hover:text-white transition-colors">
              {timerPaused ? <Play size={10} /> : <Pause size={10} />}
            </button>
            <button onClick={() => setTimerHidden(h => !h)}
              className="text-gray-500 hover:text-white text-[10px] transition-colors">
              {timerHidden ? "Show" : "Hide"}
            </button>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4 min-w-[220px] justify-end">
          <button className="flex flex-col items-center gap-0.5 text-gray-500 hover:text-white transition-colors">
            <span className="text-base leading-none">🖩</span>
            <span className="text-[10px]">Calculator</span>
          </button>
          <button className="flex flex-col items-center gap-0.5 text-gray-500 hover:text-white transition-colors">
            <span className="text-base leading-none">📄</span>
            <span className="text-[10px]">Reference</span>
          </button>
          <button className="flex flex-col items-center gap-0.5 text-gray-500 hover:text-white transition-colors">
            <MoreHorizontal size={16} />
            <span className="text-[10px]">More</span>
          </button>
          <div className="w-px h-5 bg-[#333]" />
          <span className="text-orange-400 font-bold text-sm">🔥 {idx + 1}</span>
          <span className="text-brand font-bold text-lg leading-none">∞</span>
        </div>
      </div>

      {/* ── DIFFICULTY FILTER ───────────────────────────────────────── */}
      <div className="shrink-0 flex items-center gap-2 px-5 py-2 border-b border-[#181818]">
        {DIFFICULTIES.map(d => (
          <button key={d}
            onClick={() => { setDiff(d); setIdx(0); resetQuestion(); }}
            className={cn("text-xs px-3 py-1 rounded-full transition-colors",
              diff === d
                ? "bg-brand text-black font-semibold"
                : "text-gray-600 hover:text-white bg-[#1a1a1a] border border-[#2a2a2a]")}>
            {d}
          </button>
        ))}
        <span className="ml-auto text-gray-600 text-xs">{filtered.length} ta masala</span>
      </div>

      {/* ── MAIN ────────────────────────────────────────────────────── */}
      {mainContent}

      {/* ── BOTTOM BAR ──────────────────────────────────────────────── */}
      <div className="shrink-0 flex items-center justify-between px-5 py-3 border-t border-[#1e1e1e] bg-[#0c0c0c]">
        {/* Left: question picker */}
        <div className="flex items-center gap-2">
          <button
            onClick={goPrev}
            disabled={idx === 0}
            className={cn("w-8 h-8 rounded-lg border flex items-center justify-center transition-colors",
              idx === 0 ? "border-[#1e1e1e] text-gray-700 cursor-not-allowed" : "border-[#333] text-gray-400 hover:border-[#555] hover:text-white"
            )}>
            <ChevronLeft size={14} />
          </button>
          <button className="flex items-center gap-2 border border-[#333] hover:border-[#555] rounded-lg px-3 py-2 text-white text-sm transition-colors font-medium">
            {filtered.length > 0 ? idx + 1 : 0} of {filtered.length}
            <ChevronDown size={13} className="text-gray-500" />
          </button>
        </div>

        {/* Center: actions */}
        <div className="flex items-center gap-2">
          <span className="text-gray-600 hover:text-gray-400 text-base cursor-default select-none">ⓘ</span>
          <button className="flex items-center gap-2 bg-purple-700 hover:bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors">
            🤖 AI Yordam
          </button>
          {(checkedOpt !== null || showSol) && (
            <button
              onClick={resetQuestion}
              className="flex items-center gap-1.5 bg-[#2a1a2a] hover:bg-[#3a2a3a] text-pink-300 px-4 py-2 rounded-full text-sm font-medium transition-colors border border-pink-900/40">
              <RotateCcw size={13} /> Qayta urinish
            </button>
          )}
          <button
            onClick={() => setShowExplanation(e => !e)}
            className={cn(
              "flex items-center gap-1.5 text-sm px-3 py-2 rounded-lg transition-colors",
              showExplanation ? "text-brand bg-brand/10" : "text-gray-500 hover:text-white"
            )}>
            ≡ Yechim
          </button>
        </div>

        {/* Right: next */}
        <button
          onClick={goNext}
          disabled={idx >= filtered.length - 1}
          className={cn(
            "flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-lg transition-all",
            idx >= filtered.length - 1
              ? "text-gray-700 cursor-not-allowed"
              : "text-white hover:text-brand"
          )}>
          Keyingi <ChevronRight size={15} />
        </button>
      </div>
    </div>
  );
}

// ── QUESTION BODY ────────────────────────────────────────────────────────────
function QuestionBody({
  active, idx, isMarked, onToggleMark,
  selectedOpt, setSelectedOpt, checkedOpt, setCheckedOpt,
  crossedOut, setCrossedOut,
  userAnswer, setUserAnswer, showSol, setShowSol,
  showExplanation, resetQuestion,
}: {
  active: Question; idx: number;
  isMarked: boolean; onToggleMark: () => void;
  selectedOpt: string | null; setSelectedOpt: (v: string | null) => void;
  checkedOpt: string | null; setCheckedOpt: (v: string | null) => void;
  crossedOut: Set<string>; setCrossedOut: (v: Set<string>) => void;
  userAnswer: string; setUserAnswer: (v: string) => void;
  showSol: boolean; setShowSol: (v: boolean) => void;
  showExplanation: boolean; resetQuestion: () => void;
}) {
  const letters = ["A", "B", "C", "D"];
  const isChecked = checkedOpt !== null;

  const isOptCorrect = (letter: string, opt: string) =>
    active.answer === letter ||
    active.answer === opt ||
    active.answer.startsWith(letter + ".");

  return (
    <div className="p-6 pb-8">
      {/* Question header bar */}
      <div className="flex items-center bg-[#161616] border border-[#262626] rounded-xl px-4 py-2.5 mb-5 gap-3">
        <div className="w-7 h-7 rounded-md bg-[#202020] border border-[#383838] flex items-center justify-center text-white text-sm font-bold shrink-0">
          {idx + 1}
        </div>
        <button onClick={onToggleMark}
          className={cn(
            "flex items-center gap-1.5 text-[13px] font-medium transition-colors",
            isMarked ? "text-yellow-400" : "text-gray-500 hover:text-gray-300"
          )}>
          {isMarked
            ? <BookmarkCheck size={14} className="text-yellow-400" />
            : <Bookmark size={14} />}
          Mark for Review
        </button>
        <div className="ml-auto flex items-center gap-3">
          <button className="text-gray-600 hover:text-white text-[12px] flex items-center gap-1 transition-colors">
            <Flag size={12} /> Report
          </button>
          <div className="w-6 h-6 rounded-full border border-[#444] flex items-center justify-center text-gray-500 text-[10px] font-bold select-none">
            ©
          </div>
        </div>
      </div>

      {/* Question text */}
      <div className="text-white text-[15px] leading-[1.75] mb-7">
        <MathRenderer formula={active.text} displayMode />
      </div>

      {/* ── MCQ ──────────────────────────────────────────────────────── */}
      {active.options.length > 0 ? (
        <div className="space-y-2.5">
          {active.options.map((opt, i) => {
            const letter = letters[i];
            const isSel = selectedOpt === letter;
            const isCrossed = crossedOut.has(letter);
            const correct = isOptCorrect(letter, opt);
            const wrong = isChecked && checkedOpt === letter && !correct;
            const revealCorrect = isChecked && correct;
            const neutral = isChecked && !correct && checkedOpt !== letter;

            return (
              <div key={letter} className="flex items-center gap-2">
                <button
                  disabled={isChecked || isCrossed}
                  onClick={() => !isChecked && setSelectedOpt(isSel ? null : letter)}
                  className={cn(
                    "flex-1 flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-left transition-all",
                    isCrossed && "opacity-25 cursor-not-allowed",
                    !isChecked && isSel && "border-brand bg-brand/5",
                    !isChecked && !isSel && !isCrossed && "border-[#252525] bg-[#141414] hover:border-[#3a3a3a]",
                    wrong && "border-red-600 bg-red-950/50",
                    revealCorrect && "border-green-500 bg-green-950/40",
                    neutral && "border-[#252525] bg-[#141414] opacity-50",
                  )}>
                  {/* Letter / icon */}
                  <div className={cn(
                    "w-7 h-7 rounded-full border-2 flex items-center justify-center text-[13px] font-bold shrink-0 transition-all",
                    wrong ? "bg-red-500 border-red-500 text-white" :
                    revealCorrect ? "bg-green-500 border-green-500 text-white" :
                    isSel ? "border-brand text-brand" :
                    "border-[#444] text-gray-500"
                  )}>
                    {wrong ? "✕" : revealCorrect ? "✓" : letter}
                  </div>

                  {/* Option text */}
                  <span className={cn(
                    "flex-1 text-[14px] leading-snug",
                    isCrossed ? "line-through text-gray-700" :
                    wrong ? "text-red-200" :
                    revealCorrect ? "text-green-200" :
                    "text-gray-100"
                  )}>
                    <MathRenderer formula={opt} />
                  </span>

                  {/* Check button (selected, not yet submitted) */}
                  {isSel && !isChecked && (
                    <button
                      onClick={e => { e.stopPropagation(); setCheckedOpt(letter); }}
                      className="shrink-0 text-[12px] bg-brand text-black font-bold px-3 py-1 rounded-full hover:opacity-85 transition-opacity">
                      Check
                    </button>
                  )}

                  {/* Explain button (wrong answer revealed) */}
                  {wrong && (
                    <button className="shrink-0 text-[12px] border border-[#444] text-gray-400 px-3 py-1 rounded-full hover:bg-[#222] transition-colors">
                      Explain
                    </button>
                  )}
                </button>

                {/* Cross-out circle */}
                <button
                  disabled={isChecked}
                  onClick={() => {
                    const s = new Set(crossedOut);
                    s.has(letter) ? s.delete(letter) : s.add(letter);
                    setCrossedOut(s);
                  }}
                  className={cn(
                    "w-8 h-8 rounded-full border-2 flex items-center justify-center text-[11px] font-bold shrink-0 transition-colors",
                    isCrossed
                      ? "border-gray-400 text-gray-400"
                      : "border-[#333] text-[#333] hover:border-[#666] hover:text-[#666]",
                    isChecked && "opacity-20 cursor-not-allowed"
                  )}>
                  {letter}
                </button>
              </div>
            );
          })}

          {/* Explanation panel for MCQ */}
          {showExplanation && isChecked && (
            <div className="mt-4 border border-[#2a2a2a] rounded-xl overflow-hidden">
              <div className="px-5 py-4 bg-[#111] space-y-3">
                {/* Always show correct answer */}
                <div>
                  <p className="text-[10px] text-gray-600 uppercase tracking-widest mb-2">To&apos;g&apos;ri javob</p>
                  <div className="flex flex-col gap-1">
                    {active.options.map((opt, i) => {
                      const letter = letters[i];
                      if (!isOptCorrect(letter, opt)) return null;
                      return (
                        <div key={letter} className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                            {letter}
                          </span>
                          <span className="text-green-300 text-sm">
                            <MathRenderer formula={opt} />
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                {/* Show solution text if available */}
                {active.solution && (
                  <div>
                    <p className="text-[10px] text-gray-600 uppercase tracking-widest mb-2">Yechim</p>
                    <div className="text-gray-300 text-sm leading-relaxed">
                      <MathRenderer formula={active.solution} displayMode />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* ── FREE TEXT ─────────────────────────────────────────────── */
        <div className="space-y-3">
          {!showSol ? (
            <>
              <input
                type="text"
                value={userAnswer}
                onChange={e => setUserAnswer(e.target.value)}
                onKeyDown={e => e.key === "Enter" && userAnswer.trim() && setShowSol(true)}
                placeholder="Javobingizni kiriting..."
                className="w-full px-4 py-3 bg-[#141414] border-2 border-[#252525] focus:border-brand rounded-xl text-white placeholder-gray-700 text-sm outline-none transition-colors"
              />
              <button
                onClick={() => userAnswer.trim() && setShowSol(true)}
                disabled={!userAnswer.trim()}
                className={cn(
                  "px-6 py-2.5 rounded-full text-sm font-bold transition-all",
                  userAnswer.trim()
                    ? "bg-brand text-black hover:opacity-85"
                    : "bg-[#1a1a1a] text-gray-700 cursor-not-allowed"
                )}>
                Check
              </button>
            </>
          ) : (
            <div className="border-2 border-[#2a2a2a] rounded-2xl overflow-hidden">
              {userAnswer.trim() && (
                <div className="px-5 py-4 border-b border-[#222]">
                  <p className="text-[10px] text-gray-600 uppercase tracking-widest mb-1.5">Sizning javobingiz</p>
                  <p className="text-gray-300 text-sm">{userAnswer}</p>
                </div>
              )}
              <div className="px-5 py-4 bg-[#0c1a0c]">
                <p className="text-[10px] text-gray-600 uppercase tracking-widest mb-1.5">To&apos;g&apos;ri javob</p>
                <div className="text-green-400 text-2xl font-bold">
                  <MathRenderer formula={active.answer} />
                </div>
              </div>
              {active.solution && (
                <div className="px-5 py-4 border-t border-[#222] bg-[#111]">
                  <p className="text-[10px] text-gray-600 uppercase tracking-widest mb-2">Yechim</p>
                  <div className="text-gray-300 text-sm leading-relaxed">
                    <MathRenderer formula={active.solution} displayMode />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
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
