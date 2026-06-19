"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import {
  Target, Flame, Coins, Trophy, BookOpen,
  TrendingUp, CheckCircle2, XCircle, Calendar,
  BarChart2, Zap
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TopicStat {
  topic: string;
  total: number;
  color: string;
  icon: string;
}

function WeekBar({ day, pct, active }: { day: string; pct: number; active?: boolean }) {
  return (
    <div className="flex flex-col items-center gap-1.5 flex-1">
      <div className="w-full flex flex-col justify-end h-16">
        <div className={cn("w-full rounded-t-md", active ? "bg-brand" : "bg-dark-hover")}
          style={{ height: `${Math.max(pct, 4)}%` }} />
      </div>
      <span className="text-[10px] text-gray-600">{day}</span>
    </div>
  );
}

function RadialProgress({ pct, size = 96, stroke = 8, color = "#00d4aa" }: {
  pct: number; size?: number; stroke?: number; color?: string;
}) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#1f2937" strokeWidth={stroke} />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color}
        strokeWidth={stroke} strokeLinecap="round"
        strokeDasharray={`${dash} ${circ - dash}`} />
    </svg>
  );
}

function TopicRow({ topic, total, color, icon }: TopicStat) {
  const pct = Math.min(Math.round((total / 175) * 100), 100);
  return (
    <div className="flex items-center gap-3">
      <span className="w-5 text-center text-sm shrink-0">{icon}</span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-gray-300 truncate">{topic}</span>
          <span className="text-xs text-gray-600 shrink-0 ml-2">{total} savol</span>
        </div>
        <div className="h-1.5 bg-dark-hover rounded-full overflow-hidden">
          <div className="h-full rounded-full transition-all duration-700"
            style={{ width: `${pct}%`, backgroundColor: color }} />
        </div>
      </div>
    </div>
  );
}

export default function TahlilPage() {
  const { user } = useAuth();
  const [topics, setTopics] = useState<TopicStat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from("questions").select("topic");
      if (data) {
        const counts: Record<string, number> = {};
        data.forEach((r) => { counts[r.topic] = (counts[r.topic] ?? 0) + 1; });

        const colors: Record<string, string> = {
          "O'tkir va o'tmas burchaklar": "#00d4aa",
          "Kesishuvchi to'g'ri chiziqlar": "#3b82f6",
          "Uchburchakning tashqi burchaklari": "#8b5cf6",
          "Natural sonlar va ular ustida amallar": "#f97316",
        };
        const icons: Record<string, string> = {
          "O'tkir va o'tmas burchaklar": "∠",
          "Kesishuvchi to'g'ri chiziqlar": "✕",
          "Uchburchakning tashqi burchaklari": "△",
          "Natural sonlar va ular ustida amallar": "123",
        };

        setTopics(
          Object.entries(counts)
            .map(([topic, total]) => ({
              topic, total,
              color: colors[topic] ?? "#6b7280",
              icon: icons[topic] ?? "•",
            }))
            .sort((a, b) => b.total - a.total)
        );
      }
      setLoading(false);
    }
    load();
  }, []);

  const accuracy = user?.accuracy ?? 0;
  const total = user?.totalAttempted ?? 0;
  const correct = Math.round(total * accuracy / 100);
  const wrong = total - correct;
  const streak = user?.streak ?? 0;
  const coins = user?.coins ?? 0;

  const examDate = user?.examDate ? new Date(user.examDate) : new Date("2026-08-22");
  const daysLeft = Math.max(0, Math.ceil((examDate.getTime() - Date.now()) / 86400000));
  const readyPct = Math.min(100, Math.max(0, Math.round((1 - daysLeft / 365) * 100)));

  const weekData = [40, 65, 30, 80, 55, 90, streak > 0 ? 100 : 20];
  const weekDays = ["Du", "Se", "Ch", "Pa", "Ju", "Sh", "Ya"];

  return (
    <div className="p-4 md:p-6 space-y-5 max-w-4xl mx-auto">
      <div>
        <h1 className="text-white font-bold text-xl mb-0.5">Tahlil</h1>
        <p className="text-gray-500 text-sm">Sizning o&apos;quv progressingiz</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { icon: BookOpen, color: "#00d4aa", label: "Jami urinish",  value: total,            sub: "savol" },
          { icon: Target,   color: "#22c55e", label: "Aniqlik",       value: `${accuracy}%`,   sub: "to'g'ri" },
          { icon: Flame,    color: "#f97316", label: "Streak",        value: `${streak} kun`,  sub: "ketma-ket" },
          { icon: Coins,    color: "#eab308", label: "Tangalar",      value: coins,            sub: "yig'ilgan" },
        ].map(({ icon: Icon, color, label, value, sub }) => (
          <div key={label} className="bg-dark-card border border-dark-border rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{ background: `${color}20` }}>
                <Icon size={14} style={{ color }} />
              </div>
              <span className="text-gray-500 text-xs">{label}</span>
            </div>
            <p className="text-white font-black text-2xl leading-none">{value}</p>
            <p className="text-gray-600 text-xs mt-1">{sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Accuracy radial */}
        <div className="bg-dark-card border border-dark-border rounded-xl p-5 flex flex-col items-center">
          <p className="text-gray-500 text-xs font-semibold uppercase tracking-widest mb-4">Umumiy aniqlik</p>
          <div className="relative">
            <RadialProgress pct={accuracy} size={100} stroke={9}
              color={accuracy >= 70 ? "#22c55e" : accuracy >= 40 ? "#f97316" : "#ef4444"} />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white font-black text-xl">{accuracy}%</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-5 w-full">
            <div className="text-center bg-green-400/8 border border-green-400/15 rounded-lg py-2.5">
              <CheckCircle2 size={14} className="text-green-400 mx-auto mb-1" />
              <p className="text-green-400 font-bold text-xl leading-none">{correct}</p>
              <p className="text-gray-600 text-[10px] mt-0.5">To&apos;g&apos;ri</p>
            </div>
            <div className="text-center bg-red-400/8 border border-red-400/15 rounded-lg py-2.5">
              <XCircle size={14} className="text-red-400 mx-auto mb-1" />
              <p className="text-red-400 font-bold text-xl leading-none">{wrong}</p>
              <p className="text-gray-600 text-[10px] mt-0.5">Noto&apos;g&apos;ri</p>
            </div>
          </div>
        </div>

        {/* Weekly chart */}
        <div className="bg-dark-card border border-dark-border rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="text-white font-semibold text-sm">Haftalik faollik</p>
            <span className="text-xs text-brand flex items-center gap-1">
              <Flame size={11} /> {streak} kun
            </span>
          </div>
          <div className="flex items-end gap-1.5 h-20">
            {weekData.map((pct, i) => (
              <WeekBar key={i} day={weekDays[i]} pct={pct} active={i === 6 && streak > 0} />
            ))}
          </div>
          <p className="text-gray-700 text-[10px] mt-3 text-center">Har kuni kirganingizda streak oshadi</p>
        </div>

        {/* Exam countdown */}
        <div className="bg-dark-card border border-dark-border rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <Calendar size={14} className="text-brand" />
            <p className="text-white font-semibold text-sm">Imtihonga tayyorlik</p>
          </div>
          <div className="text-center mb-5">
            <p className="text-brand text-xs font-semibold mb-1">{user?.examType ?? "DTM"}</p>
            <p className="text-white font-black text-5xl leading-none">{daysLeft}</p>
            <p className="text-gray-500 text-xs mt-1">kun qoldi</p>
          </div>
          <div>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-gray-500">Tayyorgarlik</span>
              <span className="text-brand font-semibold">{readyPct}%</span>
            </div>
            <div className="h-2 bg-dark-hover rounded-full overflow-hidden">
              <div className="h-full bg-brand rounded-full" style={{ width: `${readyPct}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Topics */}
      <div className="bg-dark-card border border-dark-border rounded-xl p-5">
        <div className="flex items-center gap-2 mb-5">
          <BarChart2 size={16} className="text-brand" />
          <h2 className="text-white font-semibold">Mavzular bo&apos;yicha savollar</h2>
          <span className="text-gray-600 text-xs ml-auto">{topics.reduce((s, t) => s + t.total, 0)} jami</span>
        </div>
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-8 bg-dark-hover rounded animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {topics.map((t) => <TopicRow key={t.topic} {...t} />)}
          </div>
        )}
      </div>

      {/* Recommendations */}
      <div className="bg-dark-card border border-dark-border rounded-xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <Zap size={15} className="text-brand" />
          <h2 className="text-white font-semibold">Tavsiyalar</h2>
        </div>
        <div className="space-y-3">
          {total === 0 && (
            <Tip icon={<Trophy size={15} className="text-brand" />} color="brand"
              title="Birinchi qadamni tashlang!"
              desc="Masalalar bankidan biror mavzuni ishlang va bu yerda progressingiz ko'rinadi." />
          )}
          {total > 0 && accuracy < 60 && (
            <Tip icon={<Target size={15} className="text-orange-400" />} color="orange"
              title="Aniqlikni oshiring"
              desc="Tezlik o'rniga tushunishga e'tibor bering. AI Yordamchidan foydalaning." />
          )}
          {total > 0 && accuracy >= 60 && (
            <Tip icon={<CheckCircle2 size={15} className="text-green-400" />} color="green"
              title={`${accuracy}% aniqlik — zo'r!`}
              desc="Qiyin darajadagi masalalarga o'ting va natijangizni yanada oshiring." />
          )}
          {streak === 0 && (
            <Tip icon={<Flame size={15} className="text-red-400" />} color="red"
              title="Streakni boshlang"
              desc="Har kuni kirish odatini hosil qiling. Hatto 10 daqiqa ham yetarli!" />
          )}
          {streak >= 3 && (
            <Tip icon={<Flame size={15} className="text-orange-400" />} color="orange"
              title={`${streak} kunlik streak! 🔥`}
              desc="Ajoyib davomiylik! Rekordi yangilang va motivatsiyangizni saqlang." />
          )}
        </div>
      </div>
    </div>
  );
}

function Tip({ icon, color, title, desc }: {
  icon: React.ReactNode; color: string; title: string; desc: string;
}) {
  const cls: Record<string, string> = {
    brand:  "bg-[#00d4aa]/8 border-[#00d4aa]/20",
    green:  "bg-green-400/8 border-green-400/20",
    orange: "bg-orange-400/8 border-orange-400/20",
    red:    "bg-red-400/8 border-red-400/20",
  };
  return (
    <div className={`flex items-start gap-3 p-3.5 border rounded-xl ${cls[color] ?? cls.brand}`}>
      <div className="shrink-0 mt-0.5">{icon}</div>
      <div>
        <p className="text-white text-sm font-medium">{title}</p>
        <p className="text-gray-500 text-xs mt-0.5">{desc}</p>
      </div>
    </div>
  );
}
