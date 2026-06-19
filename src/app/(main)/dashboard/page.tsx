"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth";
import { CheckCircle2, Circle, Bot, ChevronRight, ChevronDown, PlayCircle, Clock, Eye } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import CompetitionSection from "@/components/competition/CompetitionSection";

function Sparkline({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 80, h = 28;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - 2 - ((v - min) / range) * (h - 4);
    return `${x},${y}`;
  }).join(" ");
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="opacity-80">
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TopicBar({ name, pct, color, icon }: { name: string; pct: number; color: string; icon: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm w-4 text-center shrink-0 text-gray-500">{icon}</span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-gray-400 truncate">{name}</span>
          <span className="text-xs text-gray-600 shrink-0 ml-1">{pct}%</span>
        </div>
        <div className="h-1.5 bg-dark-hover rounded-full overflow-hidden">
          <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: color }} />
        </div>
      </div>
    </div>
  );
}

function ActivityChart() {
  const raw = [30, 45, 25, 60, 50, 75, 65, 80, 55, 70, 85, 90, 75, 100];
  const w = 240, h = 72;
  const max = Math.max(...raw);
  const pts = raw.map((v, i) => {
    const x = (i / (raw.length - 1)) * w;
    const y = h - 4 - ((v / max) * (h - 8));
    return `${x},${y}`;
  }).join(" ");
  const lastY = h - 4 - ((raw[raw.length - 1] / max) * (h - 8));
  const gridLines = [0, 25, 50, 75, 100];
  const days = ["Pay", "Jum", "Shan", "Yak", "Dush", "Sesh", "Bugun"];
  return (
    <div>
      <svg width="100%" viewBox={`0 0 ${w} ${h}`} className="mb-1">
        {gridLines.map((v) => {
          const y = h - 4 - ((v / max) * (h - 8));
          return <line key={v} x1="0" y1={y} x2={w} y2={y} stroke="#2a2a2e" strokeWidth="0.5" />;
        })}
        <polyline points={pts} fill="none" stroke="#00d4aa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx={w} cy={lastY} r="3" fill="#00d4aa" />
      </svg>
      <div className="flex justify-between">
        {days.map((d) => (
          <span key={d} className="text-[10px] text-gray-700">{d}</span>
        ))}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { user, updateProfile } = useAuth();

  // Daily streak logic
  useEffect(() => {
    if (!user) return;
    const today = new Date().toISOString().split("T")[0];
    const lastKey = `mathuz_last_visit_${user.id}`;
    const last = localStorage.getItem(lastKey);
    if (last === today) return;

    localStorage.setItem(lastKey, today);
    const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
    const newStreak = last === yesterday ? (user.streak ?? 0) + 1 : 1;
    if (newStreak !== user.streak) {
      updateProfile({ streak: newStreak });
    }
  }, [user, updateProfile]);

  const [tasks] = useState([
    { id: "1", title: "Logarifm mashqlari", done: 16, total: 20, duration: "30 min", completed: false },
    { id: "2", title: "Integral takrorlash", done: 22, total: 30, duration: "45 min", completed: true },
    { id: "3", title: "DTM test ishlash", done: 0, total: 40, duration: "60 min", completed: false },
  ]);

  const days = user?.examDate
    ? Math.ceil((new Date(user.examDate).getTime() - Date.now()) / 86400000)
    : 71;
  const readyPct = Math.min(Math.max(Math.round((1 - days / 159) * 100), 0), 100);

  const lessons = [
    { title: "Logarifm va uning xossalari", topic: "Logarifm", duration: "45 min", views: "275", color: "#3b82f6" },
    { title: "Trigonometrik tenglamalar", topic: "Trigonometriya", duration: "38 min", views: "193", color: "#8b5cf6" },
    { title: "DTM 2023 Test yechimlari", topic: "DTM Test", duration: "60 min", views: "512", color: "#f97316" },
    { title: "Integral hisoblash usullari", topic: "Integral", duration: "50 min", views: "321", color: "#22c55e" },
  ];

  const statCards = [
    { label: "Masala yechildi", value: user?.totalAttempted ?? 651, sub: "+12 bugun", subColor: "#22c55e", data: [30,40,38,50,48,58,55,62,60,65], sparkColor: "#22c55e" },
    { label: "Aniqlik darajasi", value: `${user?.accuracy ?? 95}%`, sub: "+2% bu hafta", subColor: "#3b82f6", data: [88,90,89,91,90,92,93,92,94,95], sparkColor: "#3b82f6" },
    { label: "Joriy streak", value: `${user?.streak ?? 7} kun`, sub: "Eng yaxshi: 14 kun", subColor: "#f97316", data: [3,5,2,7,5,8,4,9,5,7], sparkColor: "#f97316" },
    { label: "Tanga", value: user?.coins ?? 69, sub: "+9 bugun", subColor: "#eab308", data: [20,28,34,38,42,48,53,57,61,69], sparkColor: "#eab308" },
  ];

  return (
    <div className="p-5 space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-white">
          Salom, {user?.name ?? "Foydalanuvchi"} 👋
        </h1>
        <p className="text-gray-500 text-sm mt-0.5">Bugun maqsadingizga yana 1 qadam yaqinlashing.</p>
      </div>

      {/* Row 1: DTM Banner + Level Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="rounded-xl p-5 relative overflow-hidden border border-brand/20"
          style={{ background: "linear-gradient(135deg, #0d2018 0%, #111113 65%)" }}>
          <div className="absolute right-28 top-3 text-brand/10 font-bold select-none pointer-events-none" style={{ fontSize: 72 }}>π</div>
          <div className="absolute right-10 bottom-3 text-brand/8 font-bold select-none pointer-events-none" style={{ fontSize: 40 }}>∫</div>

          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-brand text-sm font-semibold mb-1">DTM Imtihoniga</p>
              <p className="text-white font-bold mb-3" style={{ fontSize: 34, lineHeight: 1 }}>
                {days} <span className="text-xl font-normal text-gray-400">kun qoldi</span>
              </p>
              <div className="flex items-center gap-2 mb-1 max-w-52">
                <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-brand rounded-full" style={{ width: `${readyPct}%` }} />
                </div>
                <span className="text-brand text-xs font-bold shrink-0">{readyPct}%</span>
              </div>
              <p className="text-gray-500 text-xs mb-3">Tayyorgarlik darajasi</p>
              <p className="text-gray-400 text-xs">Siz zo&apos;r yo&apos;ldasiz! Davom eting! 🚀</p>
            </div>
            <div className="shrink-0 mr-6">
              <div className="w-20 h-20 bg-dark-hover/80 border border-dark-border rounded-xl flex flex-col items-center justify-center">
                <div className="text-brand text-[10px] font-semibold">2026</div>
                <div className="text-white font-bold leading-none" style={{ fontSize: 30 }}>{days}</div>
                <div className="text-gray-600 text-[10px]">kun</div>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <Link href="/reja"
              className="inline-flex items-center gap-1.5 bg-brand/15 hover:bg-brand/25 border border-brand/30 text-brand text-sm font-medium px-4 py-2 rounded-lg transition-colors">
              Reja bo&apos;yicha ishlash <ChevronRight size={14} />
            </Link>
          </div>
        </div>

        <div className="bg-dark-card border border-dark-border rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="bg-brand/15 border border-brand/30 text-brand text-xs font-bold px-3 py-1 rounded-full">
              Level 12
            </div>
            <span className="text-gray-500 text-sm">Matematika</span>
          </div>
          <div className="mb-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] text-gray-600">3450 / 4000 XP</span>
            </div>
            <div className="h-2 bg-dark-hover rounded-full overflow-hidden">
              <div className="h-full bg-brand rounded-full" style={{ width: "86%" }} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mb-3">
            <div className="bg-dark-hover rounded-lg p-2.5 text-center">
              <div className="text-orange-400 text-sm font-bold">🔥 {user?.streak ?? 7} kun</div>
              <div className="text-gray-600 text-[10px] mt-0.5">Streak</div>
            </div>
            <div className="bg-dark-hover rounded-lg p-2.5 text-center">
              <div className="text-yellow-400 text-sm font-bold">🏆 14 kun</div>
              <div className="text-gray-600 text-[10px] mt-0.5">Eng yaxshi</div>
            </div>
          </div>
          <div className="bg-dark-hover rounded-lg p-3 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-yellow-500/15 border border-yellow-500/20 flex items-center justify-center text-lg shrink-0">🛡️</div>
            <div>
              <p className="text-gray-300 text-xs font-medium">Keyingi badge</p>
              <p className="text-gray-600 text-[10px]">100 tanga to&apos;plang</p>
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {statCards.map(({ label, value, sub, subColor, data, sparkColor }) => (
          <div key={label} className="bg-dark-card border border-dark-border rounded-xl p-4">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <p className="text-gray-500 text-xs mb-1">{label}</p>
                <p className="text-white font-bold text-2xl leading-none">{value}</p>
                <p className="text-xs mt-1.5 font-medium" style={{ color: subColor }}>{sub}</p>
              </div>
              <Sparkline data={data} color={sparkColor} />
            </div>
          </div>
        ))}
      </div>

      {/* Row 3: Reja + AI + Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-dark-card border border-dark-border rounded-xl p-4 flex flex-col">
          <h2 className="text-white font-semibold mb-3">Bugungi reja</h2>
          <div className="space-y-3 flex-1">
            {tasks.map((task) => (
              <div key={task.id}>
                <div className="flex items-center gap-2 mb-1.5">
                  {task.completed
                    ? <CheckCircle2 size={14} className="text-brand shrink-0" />
                    : <Circle size={14} className="text-gray-600 shrink-0" />}
                  <span className={cn("flex-1 text-xs truncate", task.completed ? "text-gray-600 line-through" : "text-gray-200")}>
                    {task.title}
                  </span>
                  <span className="text-[10px] text-gray-600 shrink-0">{task.done}/{task.total}</span>
                  <span className="text-[10px] text-gray-700 shrink-0">{task.duration}</span>
                </div>
                <div className="ml-5 h-1 bg-dark-hover rounded-full overflow-hidden">
                  <div className={cn("h-full rounded-full", task.completed ? "bg-brand" : "bg-brand/40")}
                    style={{ width: `${Math.round((task.done / task.total) * 100)}%` }} />
                </div>
              </div>
            ))}
          </div>
          <Link href="/reja"
            className="mt-4 flex items-center justify-center py-2 border border-brand/30 text-brand text-xs font-medium rounded-lg hover:bg-brand/10 transition-colors">
            Rejani davom ettirish
          </Link>
        </div>

        <div className="bg-dark-card border border-dark-border rounded-xl p-4 flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <h2 className="text-white font-semibold">AI Yordamchi</h2>
            <span className="text-[10px] bg-brand/15 text-brand px-2 py-0.5 rounded-full font-medium">Beta</span>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center text-center py-2">
            <div className="w-12 h-12 rounded-full bg-brand/10 border border-brand/20 flex items-center justify-center mb-3">
              <Bot size={22} className="text-brand" />
            </div>
            <p className="text-white text-sm font-medium mb-1">Bugun nimani o&apos;rganamiz?</p>
            <p className="text-gray-600 text-xs">Men sizga mos reja tuzib beraman.</p>
          </div>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {["Logarifm", "Trigonometriya", "Geometriya", "DTM Test"].map((t) => (
              <button key={t}
                className="text-xs bg-dark-hover border border-dark-border text-gray-400 px-2.5 py-1 rounded-lg hover:border-brand/30 hover:text-brand transition-colors">
                {t}
              </button>
            ))}
          </div>
          <Link href="/ai"
            className="flex items-center justify-center gap-1.5 w-full py-2 bg-brand/10 border border-brand/20 text-brand text-xs font-medium rounded-lg hover:bg-brand/20 transition-colors">
            AI bilan suhbat <ChevronRight size={13} />
          </Link>
        </div>

        <div className="bg-dark-card border border-dark-border rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-white font-semibold">Mening progressim</h2>
            <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-white transition-colors">
              7 kunlik <ChevronDown size={12} />
            </button>
          </div>
          <p className="text-gray-700 text-[10px] mb-2 uppercase tracking-widest">Faoliyat grafigi</p>
          <ActivityChart />
          <p className="text-gray-700 text-[10px] mt-3 mb-2 uppercase tracking-widest">Mavzular bo&apos;yicha progress</p>
          <div className="space-y-2">
            {[
              { name: "Algebra", pct: 80, color: "#00d4aa", icon: "∑" },
              { name: "Geometriya", pct: 60, color: "#3b82f6", icon: "△" },
              { name: "Funksiya", pct: 40, color: "#8b5cf6", icon: "f" },
              { name: "Trigonometriya", pct: 70, color: "#f97316", icon: "∠" },
              { name: "Matematika analiz", pct: 30, color: "#eab308", icon: "∞" },
            ].map((t) => <TopicBar key={t.name} {...t} />)}
          </div>
        </div>
      </div>

      {/* Row 4: Musobaqa + Leaderboard */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-white font-semibold">🏆 Musobaqa & Reyting</h2>
        </div>
        <CompetitionSection />
      </div>

      {/* Row 5: Tavsiya etilgan darslar */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-white font-semibold">Tavsiya etilgan darslar</h2>
          <Link href="/darslar" className="text-xs text-brand hover:underline flex items-center gap-1">
            Tavsifini ko&apos;rish <ChevronRight size={13} />
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {lessons.map((l) => (
            <div key={l.title}
              className="bg-dark-card border border-dark-border rounded-xl overflow-hidden hover:border-brand/25 transition-colors group cursor-pointer">
              <div className="h-20 flex items-center justify-center relative"
                style={{ background: `linear-gradient(135deg, ${l.color}25, #1a1a1e)` }}>
                <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <PlayCircle size={18} className="text-white/60" />
                </div>
                <span className="absolute top-2 left-2 text-[10px] px-2 py-0.5 rounded font-medium"
                  style={{ background: `${l.color}30`, color: l.color }}>
                  {l.topic}
                </span>
              </div>
              <div className="p-3">
                <p className="text-white text-xs font-medium leading-snug mb-2 line-clamp-2">{l.title}</p>
                <div className="flex items-center justify-between text-[10px] text-gray-600">
                  <span className="flex items-center gap-1"><Clock size={10} />{l.duration}</span>
                  <span className="flex items-center gap-1"><Eye size={10} />{l.views} ta ko&apos;rish</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
