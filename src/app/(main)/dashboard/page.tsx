"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth";
import {
  BookOpen, Target, Flame, Coins, ChevronRight,
  Trophy, TrendingUp, Calendar, BarChart2, Users, Bot, Zap
} from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

interface LeaderEntry { user_id: string; name: string; coins: number; }

export default function DashboardPage() {
  const { user, updateProfile } = useAuth();
  const [leaders, setLeaders] = useState<LeaderEntry[]>([]);

  // Daily streak
  useEffect(() => {
    if (!user) return;
    const today = new Date().toISOString().split("T")[0];
    const key = `mathuz_last_visit_${user.id}`;
    const last = localStorage.getItem(key);
    if (last === today) return;
    localStorage.setItem(key, today);
    const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
    const newStreak = last === yesterday ? (user.streak ?? 0) + 1 : 1;
    if (newStreak !== user.streak) updateProfile({ streak: newStreak });
  }, [user, updateProfile]);

  // Leaderboard
  useEffect(() => {
    supabase.from("leaderboard").select("user_id,name,coins")
      .order("coins", { ascending: false }).limit(5)
      .then(({ data }) => { if (data) setLeaders(data); });
  }, []);

  const examDate = user?.examDate ? new Date(user.examDate) : new Date("2026-08-22");
  const daysLeft = Math.max(0, Math.ceil((examDate.getTime() - Date.now()) / 86400000));
  const accuracy = user?.accuracy ?? 0;
  const total = user?.totalAttempted ?? 0;

  // Greeting
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Xayrli tong" : hour < 18 ? "Xayrli kun" : "Xayrli kech";

  const quickLinks = [
    { href: "/masalalar", icon: BookOpen, label: "Masalalar", color: "#00d4aa", bg: "rgba(0,212,170,0.1)" },
    { href: "/testlar",   icon: Target,   label: "Test",       color: "#3b82f6", bg: "rgba(59,130,246,0.1)" },
    { href: "/classroom", icon: Users,    label: "Classroom",  color: "#8b5cf6", bg: "rgba(139,92,246,0.1)" },
    { href: "/ai",        icon: Bot,      label: "AI Yordam",  color: "#f97316", bg: "rgba(249,115,22,0.1)" },
    { href: "/tahlil",    icon: BarChart2,label: "Tahlil",     color: "#ec4899", bg: "rgba(236,72,153,0.1)" },
    { href: "/tezkor",    icon: Zap,      label: "Tezkor",     color: "#eab308", bg: "rgba(234,179,8,0.1)" },
  ];

  const medals = ["🥇", "🥈", "🥉"];

  return (
    <div className="min-h-full bg-dark-bg p-5 md:p-6">
      <div className="max-w-5xl mx-auto space-y-5">

        {/* Header greeting */}
        <div className="flex items-start justify-between">
          <div>
            <p className="text-gray-500 text-sm">{greeting} 👋</p>
            <h1 className="text-white font-bold text-2xl mt-0.5">
              {user?.name ?? "Foydalanuvchi"}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-dark-card border border-dark-border rounded-xl px-3 py-2">
              <Flame size={14} className="text-orange-400" />
              <span className="text-white text-sm font-bold">{user?.streak ?? 0}</span>
              <span className="text-gray-500 text-xs">kun</span>
            </div>
            <div className="flex items-center gap-1.5 bg-dark-card border border-dark-border rounded-xl px-3 py-2">
              <Coins size={14} className="text-yellow-400" />
              <span className="text-white text-sm font-bold">{user?.coins ?? 0}</span>
            </div>
          </div>
        </div>

        {/* Quick links */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2.5">
          {quickLinks.map(({ href, icon: Icon, label, color, bg }) => (
            <Link key={href} href={href}
              className="bg-dark-card border border-dark-border rounded-2xl p-3 flex flex-col items-center gap-2 hover:border-dark-border/60 transition-all group hover:scale-[1.02]">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: bg }}>
                <Icon size={18} style={{ color }} />
              </div>
              <span className="text-gray-400 text-[11px] font-medium group-hover:text-white transition-colors">
                {label}
              </span>
            </Link>
          ))}
        </div>

        {/* Main grid: 3 columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

          {/* Imtihon sanasi */}
          <div className="bg-dark-card border border-dark-border rounded-2xl p-5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-28 h-28 rounded-full opacity-5 blur-2xl"
              style={{ background: "#00d4aa" }} />
            <div className="flex items-center gap-2 mb-4">
              <Calendar size={14} className="text-brand" />
              <span className="text-gray-400 text-xs font-medium">{user?.examType ?? "DTM"} imtihoni</span>
            </div>
            <div className="text-center py-2">
              <p className="text-white font-black text-6xl leading-none">{daysLeft}</p>
              <p className="text-gray-500 text-sm mt-1.5">kun qoldi</p>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-xs text-gray-600 mb-1.5">
                <span>Tayyorgarlik</span>
                <span className="text-brand">{Math.min(100, Math.round((1 - daysLeft / 365) * 100))}%</span>
              </div>
              <div className="h-1.5 bg-dark-hover rounded-full overflow-hidden">
                <div className="h-full bg-brand rounded-full"
                  style={{ width: `${Math.min(100, Math.round((1 - daysLeft / 365) * 100))}%` }} />
              </div>
            </div>
          </div>

          {/* Statistika */}
          <div className="bg-dark-card border border-dark-border rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp size={14} className="text-brand" />
              <span className="text-gray-400 text-xs font-medium">Mening statistikam</span>
            </div>
            <div className="space-y-3.5">
              {[
                { label: "Jami savollar", value: total, color: "#00d4aa", max: Math.max(total, 100) },
                { label: "Aniqlik", value: `${accuracy}%`, color: "#3b82f6", pct: accuracy },
                { label: "Tanga", value: user?.coins ?? 0, color: "#eab308", max: 1000 },
              ].map(({ label, value, color, pct, max }) => (
                <div key={label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-500">{label}</span>
                    <span className="font-semibold" style={{ color }}>{value}</span>
                  </div>
                  <div className="h-1 bg-dark-hover rounded-full overflow-hidden">
                    <div className="h-full rounded-full"
                      style={{
                        backgroundColor: color,
                        width: `${pct !== undefined ? pct : Math.min(100, ((typeof value === 'number' ? value : 0) / (max ?? 100)) * 100)}%`
                      }} />
                  </div>
                </div>
              ))}
            </div>
            <Link href="/tahlil"
              className="mt-4 flex items-center justify-center gap-1.5 py-2 border border-dark-border rounded-xl text-xs text-gray-400 hover:text-white hover:border-dark-border/60 transition-colors">
              Batafsil <ChevronRight size={12} />
            </Link>
          </div>

          {/* Reyting */}
          <div className="bg-dark-card border border-dark-border rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <Trophy size={14} className="text-yellow-400" />
              <span className="text-gray-400 text-xs font-medium">Reyting jadvali</span>
            </div>
            {leaders.length === 0 ? (
              <div className="text-center py-4">
                <p className="text-gray-600 text-xs">Hali hech kim yo&apos;q</p>
                <p className="text-gray-700 text-[11px]">Test ishlang!</p>
              </div>
            ) : (
              <div className="space-y-2">
                {leaders.map((entry, i) => {
                  const isMe = user?.id === entry.user_id;
                  return (
                    <div key={entry.user_id}
                      className={`flex items-center gap-2.5 px-2.5 py-2 rounded-xl ${isMe ? "bg-brand/10 border border-brand/20" : "bg-dark-hover"}`}>
                      <span className="text-sm w-5 text-center shrink-0">
                        {i < 3 ? medals[i] : <span className="text-gray-600 text-xs">{i + 1}</span>}
                      </span>
                      <span className={`flex-1 text-xs truncate ${isMe ? "text-brand font-medium" : "text-gray-300"}`}>
                        {entry.name} {isMe && "(siz)"}
                      </span>
                      <span className="text-yellow-400 text-xs font-bold shrink-0">{entry.coins}🪙</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Bottom: Reja + Maqsad */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Bugungi reja */}
          <div className="bg-dark-card border border-dark-border rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Target size={14} className="text-brand" />
                <span className="text-gray-400 text-xs font-medium">Bugungi reja</span>
              </div>
              <Link href="/reja" className="text-[11px] text-brand hover:underline">Hammasi</Link>
            </div>
            <div className="space-y-3">
              {[
                { title: "Kasrlar bo'limi", done: 16, total: 20, checked: false },
                { title: "DTM test ishlash", done: 0, total: 30, checked: false },
                { title: "Formulalar takrorlash", done: 10, total: 10, checked: true },
              ].map((t, i) => (
                <div key={i}>
                  <div className="flex items-center gap-2 mb-1">
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${t.checked ? "border-brand bg-brand" : "border-dark-border"}`}>
                      {t.checked && <span className="text-black text-[8px] font-black">✓</span>}
                    </div>
                    <span className={`flex-1 text-xs ${t.checked ? "text-gray-600 line-through" : "text-gray-300"}`}>
                      {t.title}
                    </span>
                    <span className="text-[11px] text-gray-600">{t.done}/{t.total}</span>
                  </div>
                  <div className="ml-6 h-1 bg-dark-hover rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${t.checked ? "bg-brand" : "bg-brand/40"}`}
                      style={{ width: `${Math.round(t.done / t.total * 100)}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Maqsad */}
          <div className="bg-dark-card border border-dark-border rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <Target size={14} className="text-brand" />
              <span className="text-gray-400 text-xs font-medium">Mening maqsadim</span>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-dark-hover rounded-xl">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-orange-400/10 flex items-center justify-center">
                    <Flame size={15} className="text-orange-400" />
                  </div>
                  <div>
                    <p className="text-white text-xs font-medium">Streak</p>
                    <p className="text-gray-500 text-[10px]">Ketma-ket kun</p>
                  </div>
                </div>
                <span className="text-orange-400 font-black text-xl">{user?.streak ?? 0}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-dark-hover rounded-xl">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-brand/10 flex items-center justify-center">
                    <BookOpen size={15} className="text-brand" />
                  </div>
                  <div>
                    <p className="text-white text-xs font-medium">Jami urinishlar</p>
                    <p className="text-gray-500 text-[10px]">Barcha savollar</p>
                  </div>
                </div>
                <span className="text-brand font-black text-xl">{total}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-dark-hover rounded-xl">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-400/10 flex items-center justify-center">
                    <TrendingUp size={15} className="text-blue-400" />
                  </div>
                  <div>
                    <p className="text-white text-xs font-medium">Aniqlik</p>
                    <p className="text-gray-500 text-[10px]">To'g'ri javoblar</p>
                  </div>
                </div>
                <span className="text-blue-400 font-black text-xl">{accuracy}%</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
