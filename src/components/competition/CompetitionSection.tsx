"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth";
import { Trophy, Clock, Coins, Flame, Crown } from "lucide-react";
import { cn } from "@/lib/utils";

interface Competition {
  id: string;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  prize_coins: number;
  status: string;
}

interface LeaderEntry {
  user_id: string;
  name: string;
  coins: number;
  streak: number;
}

function useCountdown(endDate: string) {
  const calc = () => {
    const diff = new Date(endDate).getTime() - Date.now();
    if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0 };
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    return { d, h, m, s };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const t = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(t);
  });
  return time;
}

function pad(n: number) { return String(n).padStart(2, "0"); }

function CompetitionCard({ comp }: { comp: Competition }) {
  const { user } = useAuth();
  const time = useCountdown(comp.end_date);
  const isActive = comp.status === "active";
  const daysTotal = Math.ceil(
    (new Date(comp.end_date).getTime() - new Date(comp.start_date).getTime()) / 86400000
  );
  const daysPassed = Math.ceil((Date.now() - new Date(comp.start_date).getTime()) / 86400000);
  const pct = Math.min(100, Math.round((daysPassed / daysTotal) * 100));

  return (
    <div className="relative overflow-hidden bg-dark-card border border-dark-border rounded-2xl p-5">
      {/* Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ background: isActive ? "#00d4aa" : "#6b7280" }} />

      <div className="flex items-start justify-between mb-4">
        <div>
          <span className={cn(
            "text-[10px] font-bold px-2.5 py-1 rounded-full border",
            isActive
              ? "text-brand border-brand/30 bg-brand/10"
              : "text-gray-400 border-gray-600 bg-dark-hover"
          )}>
            {isActive ? "● FAOL" : "⏳ YAQINLASHMOQDA"}
          </span>
          <h3 className="text-white font-bold text-base mt-2">{comp.title}</h3>
          <p className="text-gray-500 text-xs mt-0.5">{comp.description}</p>
        </div>
        <div className="shrink-0 w-12 h-12 rounded-xl bg-yellow-500/10 border border-yellow-500/20
          flex items-center justify-center ml-3">
          <Trophy size={22} className="text-yellow-400" />
        </div>
      </div>

      {/* Prize */}
      <div className="flex items-center gap-2 mb-4">
        <Coins size={14} className="text-yellow-400" />
        <span className="text-yellow-400 font-black text-xl">
          {comp.prize_coins.toLocaleString()}
        </span>
        <span className="text-gray-500 text-xs">tanga — g&apos;olib</span>
      </div>

      {/* Countdown */}
      {isActive && (
        <div className="bg-dark-bg rounded-xl p-3 mb-4">
          <p className="text-gray-600 text-[10px] mb-2 uppercase tracking-widest">Tugashiga</p>
          <div className="grid grid-cols-4 gap-1.5">
            {[
              { v: time.d, label: "kun" },
              { v: time.h, label: "soat" },
              { v: time.m, label: "daqiqa" },
              { v: time.s, label: "soniya" },
            ].map(({ v, label }) => (
              <div key={label} className="text-center bg-dark-card border border-dark-border rounded-lg py-2">
                <div className="text-white font-black text-xl leading-none font-mono">{pad(v)}</div>
                <div className="text-gray-600 text-[9px] mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Progress bar */}
      {isActive && (
        <div className="mb-3">
          <div className="flex justify-between text-[10px] text-gray-600 mb-1">
            <span>{new Date(comp.start_date).toLocaleDateString("uz-UZ")}</span>
            <span>{pct}% o&apos;tdi</span>
            <span>{new Date(comp.end_date).toLocaleDateString("uz-UZ")}</span>
          </div>
          <div className="h-1.5 bg-dark-hover rounded-full overflow-hidden">
            <div className="h-full bg-brand rounded-full" style={{ width: `${pct}%` }} />
          </div>
        </div>
      )}

      {/* User coins */}
      {user && (
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Coins size={11} className="text-yellow-400" />
          Sizda: <span className="text-yellow-400 font-bold">{user.coins}</span> tanga
        </div>
      )}
    </div>
  );
}

export default function CompetitionSection() {
  const { user } = useAuth();
  const [comp, setComp] = useState<Competition | null>(null);
  const [leaders, setLeaders] = useState<LeaderEntry[]>([]);
  const [myRank, setMyRank] = useState<number | null>(null);

  useEffect(() => {
    async function load() {
      // Active or upcoming competition
      const { data: comps } = await supabase
        .from("competitions")
        .select("*")
        .in("status", ["active", "upcoming"])
        .order("start_date")
        .limit(1);
      if (comps?.[0]) setComp(comps[0]);

      // Top 10 leaderboard
      const { data: lb } = await supabase
        .from("leaderboard")
        .select("user_id, name, coins, streak")
        .order("coins", { ascending: false })
        .limit(10);
      if (lb) {
        setLeaders(lb);
        if (user) {
          const rank = lb.findIndex((e) => e.user_id === user.id);
          setMyRank(rank >= 0 ? rank + 1 : null);
        }
      }
    }
    load();
  }, [user]);

  const medals = ["🥇", "🥈", "🥉"];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
      {/* Competition */}
      <div className="lg:col-span-2">
        {comp ? (
          <CompetitionCard comp={comp} />
        ) : (
          <div className="bg-dark-card border border-dark-border rounded-2xl p-5 flex flex-col
            items-center justify-center text-center h-full min-h-[200px]">
            <Trophy size={28} className="text-gray-600 mb-3" />
            <p className="text-gray-500 text-sm">Hozircha musobaqa yo&apos;q</p>
            <p className="text-gray-700 text-xs mt-1">Tez orada yangi musobaqa!</p>
          </div>
        )}
      </div>

      {/* Leaderboard */}
      <div className="lg:col-span-3 bg-dark-card border border-dark-border rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Crown size={16} className="text-yellow-400" />
            <h3 className="text-white font-bold">Reyting jadvali</h3>
          </div>
          <span className="text-gray-600 text-xs">Tangalar bo&apos;yicha</span>
        </div>

        {leaders.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600 text-sm">Hali hech kim yo&apos;q</p>
            <p className="text-gray-700 text-xs mt-1">Test ishlang — reytingga chiqing!</p>
          </div>
        ) : (
          <div className="space-y-2">
            {leaders.map((entry, i) => {
              const isMe = user?.id === entry.user_id;
              return (
                <div key={entry.user_id}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors",
                    isMe ? "bg-brand/10 border border-brand/20" : "bg-dark-hover"
                  )}>
                  {/* Rank */}
                  <span className="text-base w-6 text-center shrink-0">
                    {i < 3 ? medals[i] : <span className="text-gray-600 text-sm">{i + 1}</span>}
                  </span>

                  {/* Avatar */}
                  <div className={cn(
                    "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0",
                    isMe ? "bg-brand/20 text-brand" : "bg-dark-card text-gray-400"
                  )}>
                    {entry.name.charAt(0).toUpperCase()}
                  </div>

                  {/* Name */}
                  <span className={cn("flex-1 text-sm font-medium truncate",
                    isMe ? "text-brand" : "text-gray-200")}>
                    {entry.name} {isMe && <span className="text-[10px] opacity-70">(siz)</span>}
                  </span>

                  {/* Streak */}
                  {entry.streak > 0 && (
                    <span className="text-orange-400 text-xs flex items-center gap-0.5 shrink-0">
                      <Flame size={11} /> {entry.streak}
                    </span>
                  )}

                  {/* Coins */}
                  <span className="text-yellow-400 font-bold text-sm shrink-0">
                    {entry.coins} 🪙
                  </span>
                </div>
              );
            })}
          </div>
        )}

        {/* My rank footer */}
        {myRank && myRank > 10 && (
          <div className="mt-3 pt-3 border-t border-dark-border flex items-center justify-between text-xs">
            <span className="text-gray-500">Sizning o&apos;rningiz</span>
            <span className="text-brand font-bold">#{myRank}</span>
          </div>
        )}

        {leaders.length > 0 && (
          <p className="text-center text-gray-700 text-[10px] mt-4">
            Test ishlang, tanga to&apos;plang — reytingda yuksaling! 🚀
          </p>
        )}
      </div>
    </div>
  );
}
