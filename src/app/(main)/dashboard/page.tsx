"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth";
import { CheckCircle2, Circle, ChevronRight, Target, Calendar, Crown, Trophy } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";

// ── Leaderboard ────────────────────────────────────────────────────────────
interface LeaderEntry { user_id: string; name: string; coins: number; streak: number; }

function LeaderboardCard() {
  const { user } = useAuth();
  const [leaders, setLeaders] = useState<LeaderEntry[]>([]);
  const medals = ["🥇", "🥈", "🥉"];

  useEffect(() => {
    supabase.from("leaderboard").select("user_id,name,coins,streak")
      .order("coins", { ascending: false }).limit(8)
      .then(({ data }) => { if (data) setLeaders(data); });
  }, []);

  return (
    <div className="bg-dark-card border border-dark-border rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Crown size={16} className="text-yellow-400" />
          <h3 className="text-white font-semibold text-sm">Reyting jadvali</h3>
        </div>
        <span className="text-gray-600 text-xs">Tangalar bo&apos;yicha</span>
      </div>

      {leaders.length === 0 ? (
        <p className="text-gray-600 text-sm text-center py-4">Hali hech kim yo&apos;q</p>
      ) : (
        <div className="space-y-2">
          {leaders.map((entry, i) => {
            const isMe = user?.id === entry.user_id;
            return (
              <div key={entry.user_id}
                className={cn("flex items-center gap-3 px-3 py-2 rounded-xl",
                  isMe ? "bg-brand/10 border border-brand/20" : "bg-dark-hover")}>
                <span className="text-base w-5 text-center shrink-0">
                  {i < 3 ? medals[i] : <span className="text-gray-600 text-xs font-bold">{i + 1}</span>}
                </span>
                <div className="w-7 h-7 rounded-full bg-dark-card flex items-center justify-center text-xs font-bold shrink-0"
                  style={{ color: isMe ? "#00d4aa" : "#9ca3af" }}>
                  {entry.name.charAt(0).toUpperCase()}
                </div>
                <span className={cn("flex-1 text-sm truncate", isMe ? "text-brand font-medium" : "text-gray-200")}>
                  {entry.name} {isMe && <span className="text-[10px] opacity-60">(siz)</span>}
                </span>
                <span className="text-yellow-400 font-bold text-sm shrink-0">{entry.coins} 🪙</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ── Main Dashboard ─────────────────────────────────────────────────────────
export default function DashboardPage() {
  const { user, updateProfile } = useAuth();

  // Daily streak
  useEffect(() => {
    if (!user) return;
    const today = new Date().toISOString().split("T")[0];
    const lastKey = `mathuz_last_visit_${user.id}`;
    const last = localStorage.getItem(lastKey);
    if (last === today) return;
    localStorage.setItem(lastKey, today);
    const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
    const newStreak = last === yesterday ? (user.streak ?? 0) + 1 : 1;
    if (newStreak !== user.streak) updateProfile({ streak: newStreak });
  }, [user, updateProfile]);

  // Exam countdown
  const examDate = user?.examDate ? new Date(user.examDate) : new Date("2026-08-22");
  const daysLeft = Math.max(0, Math.ceil((examDate.getTime() - Date.now()) / 86400000));
  const examStr = examDate.toLocaleDateString("uz-UZ", { day: "numeric", month: "long", year: "numeric" });

  // Today's tasks
  const tasks = [
    { id: "1", title: "Logarifm mashqlari", done: 16, total: 20, done_: false },
    { id: "2", title: "Integral takrorlash",  done: 22, total: 30, done_: true  },
    { id: "3", title: "DTM test ishlash",     done:  0, total: 40, done_: false },
  ];

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto">
      {/* Greeting */}
      <div className="mb-6">
        <h1 className="text-white font-bold text-2xl">
          Salom, {user?.name ?? "Foydalanuvchi"} 👋
        </h1>
        <p className="text-gray-500 text-sm mt-0.5">Bugun ham maqsadingizga bir qadam yaqinlashing.</p>
      </div>

      {/* 2x2 grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* 1. Exam date */}
        <div className="bg-dark-card border border-dark-border rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <Calendar size={16} className="text-brand" />
            <h3 className="text-white font-semibold text-sm">Imtihon sanasi</h3>
          </div>
          <div className="text-center py-2">
            <p className="text-brand text-xs font-semibold uppercase tracking-widest mb-2">
              {user?.examType ?? "DTM"} imtihoni
            </p>
            <p className="text-white font-black text-6xl leading-none">{daysLeft}</p>
            <p className="text-gray-500 text-sm mt-2">kun qoldi</p>
            <p className="text-gray-600 text-xs mt-1">{examStr}</p>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-xs text-gray-500 mb-1.5">
              <span>Tayyorgarlik</span>
              <span className="text-brand font-semibold">
                {Math.min(100, Math.round((1 - daysLeft / 365) * 100))}%
              </span>
            </div>
            <div className="h-1.5 bg-dark-hover rounded-full overflow-hidden">
              <div className="h-full bg-brand rounded-full"
                style={{ width: `${Math.min(100, Math.round((1 - daysLeft / 365) * 100))}%` }} />
            </div>
          </div>
        </div>

        {/* 2. Bugungi reja */}
        <div className="bg-dark-card border border-dark-border rounded-2xl p-5 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-brand" />
              <h3 className="text-white font-semibold text-sm">Bugungi reja</h3>
            </div>
            <Link href="/reja" className="text-xs text-brand hover:underline flex items-center gap-1">
              Hammasi <ChevronRight size={12} />
            </Link>
          </div>
          <div className="flex-1 space-y-3">
            {tasks.map((task) => (
              <div key={task.id}>
                <div className="flex items-center gap-2 mb-1.5">
                  {task.done_
                    ? <CheckCircle2 size={14} className="text-brand shrink-0" />
                    : <Circle size={14} className="text-gray-600 shrink-0" />}
                  <span className={cn("flex-1 text-xs truncate",
                    task.done_ ? "text-gray-500 line-through" : "text-gray-200")}>
                    {task.title}
                  </span>
                  <span className="text-[10px] text-gray-600 shrink-0">{task.done}/{task.total}</span>
                </div>
                <div className="ml-5 h-1 bg-dark-hover rounded-full overflow-hidden">
                  <div className={cn("h-full rounded-full", task.done_ ? "bg-brand" : "bg-brand/40")}
                    style={{ width: `${Math.round((task.done / task.total) * 100)}%` }} />
                </div>
              </div>
            ))}
          </div>
          <Link href="/reja"
            className="mt-4 flex items-center justify-center py-2 border border-brand/30 text-brand text-xs font-medium rounded-xl hover:bg-brand/10 transition-colors">
            Rejani davom ettirish
          </Link>
        </div>

        {/* 3. Reyting jadvali */}
        <LeaderboardCard />

        {/* 4. My Goal */}
        <div className="bg-dark-card border border-dark-border rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <Target size={16} className="text-brand" />
            <h3 className="text-white font-semibold text-sm">Mening maqsadim</h3>
          </div>

          {/* Goal stats */}
          <div className="space-y-3 mb-4">
            {[
              { label: "Jami urinishlar",  value: user?.totalAttempted ?? 0,  color: "#00d4aa" },
              { label: "Aniqlik",          value: `${user?.accuracy ?? 0}%`,  color: "#3b82f6" },
              { label: "Streak",           value: `${user?.streak ?? 0} kun`, color: "#f97316" },
              { label: "Tangalar",         value: `${user?.coins ?? 0} 🪙`,   color: "#eab308" },
            ].map(({ label, value, color }) => (
              <div key={label} className="flex items-center justify-between">
                <span className="text-gray-500 text-xs">{label}</span>
                <span className="font-semibold text-sm" style={{ color }}>{value}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-dark-border pt-4">
            <p className="text-gray-600 text-xs mb-3">Tezkor havolalar</p>
            <div className="grid grid-cols-2 gap-2">
              <Link href="/masalalar"
                className="py-2 text-center text-xs font-medium rounded-xl bg-brand/10 text-brand hover:bg-brand/20 transition-colors border border-brand/20">
                Masalalar
              </Link>
              <Link href="/testlar"
                className="py-2 text-center text-xs font-medium rounded-xl bg-dark-hover text-gray-300 hover:text-white transition-colors border border-dark-border">
                Testlar
              </Link>
              <Link href="/tahlil"
                className="py-2 text-center text-xs font-medium rounded-xl bg-dark-hover text-gray-300 hover:text-white transition-colors border border-dark-border">
                Tahlil
              </Link>
              <Link href="/ai"
                className="py-2 text-center text-xs font-medium rounded-xl bg-dark-hover text-gray-300 hover:text-white transition-colors border border-dark-border">
                AI Yordam
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
