"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import {
  BookOpen, Target, Flame, Coins, ChevronRight,
  Trophy, TrendingUp, Calendar, BarChart2, Users, Bot, Zap, Check
} from "lucide-react";

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

  useEffect(() => {
    supabase.from("leaderboard").select("user_id,name,coins")
      .order("coins", { ascending: false }).limit(5)
      .then(({ data }) => { if (data) setLeaders(data); });
  }, []);

  const examDate = user?.examDate ? new Date(user.examDate) : new Date("2026-08-22");
  const daysLeft = Math.max(0, Math.ceil((examDate.getTime() - Date.now()) / 86400000));
  const readyPct = Math.min(100, Math.round((1 - daysLeft / 365) * 100));
  const medals = ["🥇", "🥈", "🥉"];

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Xayrli tong" : hour < 18 ? "Xayrli kun" : "Xayrli kech";

  const quickLinks = [
    { href: "/masalalar", icon: BookOpen, label: "Masalalar", color: "#7c3aed", bg: "#f5f3ff" },
    { href: "/testlar",   icon: Target,   label: "Testlar",   color: "#3b82f6", bg: "#eff6ff" },
    { href: "/classroom", icon: Users,    label: "Classroom", color: "#8b5cf6", bg: "#f5f3ff" },
    { href: "/ai",        icon: Bot,      label: "AI Yordam", color: "#f97316", bg: "#fff7ed" },
    { href: "/tahlil",    icon: BarChart2,label: "Tahlil",    color: "#ec4899", bg: "#fdf2f8" },
    { href: "/tezkor",    icon: Zap,      label: "Tezkor",    color: "#eab308", bg: "#fefce8" },
  ];

  const tasks = [
    { title: "Kasrlar bo'limi", done: 16, total: 20, checked: false },
    { title: "DTM test ishlash", done: 0, total: 30, checked: false },
    { title: "Formulalar takrorlash", done: 10, total: 10, checked: true },
  ];

  return (
    <div className="min-h-full p-5 md:p-6" style={{ background: "#f5f5f7" }}>
      <div className="max-w-5xl mx-auto space-y-5">

        {/* Greeting */}
        <div className="flex items-start justify-between">
          <div>
            <p style={{ color: "#9ca3af", fontSize: 13, marginBottom: 3 }}>{greeting} 👋</p>
            <h1 style={{ color: "#0f0f0f", fontWeight: 800, fontSize: 22 }}>
              Hi, {user?.name ?? "Foydalanuvchi"}
            </h1>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, background: "#fff", border: "1px solid #ebebeb", borderRadius: 10, padding: "6px 12px" }}>
              <Flame size={14} style={{ color: "#f97316" }} />
              <span style={{ color: "#0f0f0f", fontWeight: 700, fontSize: 13 }}>{user?.streak ?? 0}</span>
              <span style={{ color: "#9ca3af", fontSize: 11 }}>kun</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, background: "#fff", border: "1px solid #ebebeb", borderRadius: 10, padding: "6px 12px" }}>
              <Coins size={14} style={{ color: "#eab308" }} />
              <span style={{ color: "#0f0f0f", fontWeight: 700, fontSize: 13 }}>{user?.coins ?? 0}</span>
            </div>
          </div>
        </div>

        {/* Quick links */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 10 }}>
          {quickLinks.map(({ href, icon: Icon, label, color, bg }) => (
            <Link key={href} href={href} style={{
              background: "#fff", border: "1px solid #ebebeb", borderRadius: 14,
              padding: "12px 8px", display: "flex", flexDirection: "column",
              alignItems: "center", gap: 8, textDecoration: "none",
              transition: "all .15s"
            }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon size={18} style={{ color }} />
              </div>
              <span style={{ color: "#6b7280", fontSize: 11, fontWeight: 500 }}>{label}</span>
            </Link>
          ))}
        </div>

        {/* Row 1: Hero (with cat) + Exam */}
        <div style={{ display: "grid", gridTemplateColumns: "1.3fr 0.7fr", gap: 14 }}>

          {/* Hero card */}
          <div style={{
            background: "#fff", border: "1px solid #ebebeb", borderRadius: 16,
            padding: "20px 24px", display: "flex", alignItems: "center",
            justifyContent: "space-between", position: "relative", overflow: "hidden", minHeight: 150
          }}>
            <div style={{ position: "absolute", top: -30, right: 90, width: 160, height: 160, background: "rgba(124,58,237,.04)", borderRadius: "50%" }} />
            <div>
              <p style={{ fontSize: 10, color: "#9ca3af", marginBottom: 4 }}>So&apos;nggi test natijasi</p>
              <p style={{ fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 8 }}>DTM · Matematika</p>
              <p style={{ fontSize: 48, fontWeight: 900, color: "#7c3aed", lineHeight: 1 }}>
                {user?.accuracy ?? 0}<span style={{ fontSize: 18, color: "#9ca3af" }}>%</span>
              </p>
              <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 4 }}>
                {user?.totalAttempted ?? 0} ta savol yechildi
              </p>
            </div>
            {/* MUSHUK RASMI */}
            <div style={{ position: "relative", width: 130, height: 130, flexShrink: 0 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/cat.png"
                alt="MathModul mascot"
                style={{
                  width: 130, height: 130, objectFit: "contain",
                  objectPosition: "center bottom",
                  filter: "drop-shadow(0 8px 20px rgba(124,58,237,.25))"
                }}
              />
              <div style={{
                position: "absolute", bottom: -6, left: "50%", transform: "translateX(-50%)",
                width: "70%", height: 10, background: "rgba(124,58,237,.1)",
                borderRadius: "50%", filter: "blur(5px)"
              }} />
            </div>
          </div>

          {/* Exam countdown */}
          <div style={{
            background: "#7c3aed", borderRadius: 16, padding: 20,
            color: "#fff", position: "relative", overflow: "hidden",
            display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: 150
          }}>
            <div style={{ position: "absolute", top: -25, right: -15, width: 100, height: 100, background: "rgba(255,255,255,.08)", borderRadius: "50%" }} />
            <div style={{ position: "absolute", bottom: -20, left: -10, width: 70, height: 70, background: "rgba(255,255,255,.05)", borderRadius: "50%" }} />
            <div style={{ display: "flex", alignItems: "center", gap: 8, position: "relative", zIndex: 1 }}>
              <div style={{ width: 26, height: 26, background: "rgba(255,255,255,.2)", borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13 }}>
                <Calendar size={13} />
              </div>
              <span style={{ fontSize: 11, opacity: .85 }}>{user?.examType ?? "DTM"} imtihoni</span>
            </div>
            <div style={{ position: "relative", zIndex: 1 }}>
              <p style={{ fontSize: 10, opacity: .7, marginBottom: 4 }}>Qolgan kunlar</p>
              <p style={{ fontSize: 40, fontWeight: 900, lineHeight: 1 }}>
                {daysLeft} <span style={{ fontSize: 16, opacity: .75 }}>kun</span>
              </p>
            </div>
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, opacity: .75, marginBottom: 5 }}>
                <span>Tayyorgarlik</span><span>{readyPct}%</span>
              </div>
              <div style={{ height: 4, background: "rgba(255,255,255,.2)", borderRadius: 2, overflow: "hidden" }}>
                <div style={{ height: "100%", background: "#fff", borderRadius: 2, width: `${readyPct}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* Row 2: Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
          {[
            { icon: BookOpen, label: "Jami savollar", value: user?.totalAttempted ?? 0, color: "#7c3aed", bg: "#f5f3ff", trend: "+12 bugun" },
            { icon: Flame,    label: "Streak",         value: `${user?.streak ?? 0} kun`, color: "#f97316", bg: "#fff7ed", trend: "Rekord: 14 kun" },
            { icon: TrendingUp, label: "Aniqlik",      value: `${user?.accuracy ?? 0}%`, color: "#22c55e", bg: "#f0fdf4", trend: "+3% bu hafta" },
          ].map(({ icon: Icon, label, value, color, bg, trend }) => (
            <div key={label} style={{ background: "#fff", border: "1px solid #ebebeb", borderRadius: 14, padding: "14px 16px" }}>
              <div style={{ width: 34, height: 34, borderRadius: 9, background: bg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10 }}>
                <Icon size={15} style={{ color }} />
              </div>
              <p style={{ fontSize: 26, fontWeight: 900, color: "#0f0f0f", lineHeight: 1 }}>{value}</p>
              <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 3 }}>{label}</p>
              <p style={{ fontSize: 11, fontWeight: 600, color, marginTop: 5 }}>↑ {trend}</p>
            </div>
          ))}
        </div>

        {/* Row 3: Reja + Maqsad (cat) */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>

          {/* Bugungi reja */}
          <div style={{ background: "#fff", border: "1px solid #ebebeb", borderRadius: 14, padding: "14px 16px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                <Target size={14} style={{ color: "#7c3aed" }} />
                <span style={{ fontSize: 12, fontWeight: 600, color: "#374151" }}>Bugungi reja</span>
              </div>
              <Link href="/reja" style={{ fontSize: 11, color: "#7c3aed", textDecoration: "none", display: "flex", alignItems: "center", gap: 3 }}>
                Hammasi <ChevronRight size={11} />
              </Link>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {tasks.map((t, i) => (
                <div key={i}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
                    <div style={{
                      width: 16, height: 16, borderRadius: "50%", flexShrink: 0,
                      border: t.checked ? "none" : "1.5px solid #e5e5e7",
                      background: t.checked ? "#7c3aed" : "transparent",
                      display: "flex", alignItems: "center", justifyContent: "center"
                    }}>
                      {t.checked && <Check size={9} style={{ color: "#fff" }} />}
                    </div>
                    <span style={{ flex: 1, fontSize: 12, color: t.checked ? "#9ca3af" : "#374151", textDecoration: t.checked ? "line-through" : "none" }}>{t.title}</span>
                    <span style={{ fontSize: 10, color: "#9ca3af" }}>{t.done}/{t.total}</span>
                  </div>
                  <div style={{ marginLeft: 24, height: 3, background: "#f5f3ff", borderRadius: 2, overflow: "hidden" }}>
                    <div style={{ height: "100%", background: t.checked ? "#7c3aed" : "rgba(124,58,237,.3)", borderRadius: 2, width: `${Math.round(t.done / t.total * 100)}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Maqsad + kichik mushuk */}
          <div style={{ background: "#fff", border: "1px solid #ebebeb", borderRadius: 14, padding: "14px 16px", display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ position: "relative", flexShrink: 0 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/cat.png"
                alt="cat"
                style={{ width: 90, height: 90, objectFit: "contain", filter: "drop-shadow(0 4px 12px rgba(124,58,237,.2))" }}
              />
            </div>
            <div>
              <p style={{ fontSize: 14, fontWeight: 700, color: "#0f0f0f", marginBottom: 4 }}>Mening maqsadim</p>
              <p style={{ fontSize: 11, color: "#9ca3af", marginBottom: 12, lineHeight: 1.6 }}>
                {user?.examType ?? "DTM"} 2026<br />
                Ball maqsadi: belgilanmagan
              </p>
              <Link href="/tahlil" style={{
                display: "inline-flex", alignItems: "center", gap: 4,
                fontSize: 11, fontWeight: 600, color: "#7c3aed", textDecoration: "none"
              }}>
                + Maqsad qo&apos;yish <ChevronRight size={11} />
              </Link>
            </div>
          </div>
        </div>

        {/* Reyting */}
        <div style={{ background: "#fff", border: "1px solid #ebebeb", borderRadius: 14, padding: "14px 16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 12 }}>
            <Trophy size={14} style={{ color: "#eab308" }} />
            <span style={{ fontSize: 12, fontWeight: 600, color: "#374151" }}>Reyting jadvali</span>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {leaders.length === 0 ? (
              <p style={{ fontSize: 12, color: "#9ca3af" }}>Hali hech kim yo&apos;q — test ishlang!</p>
            ) : leaders.map((entry, i) => {
              const isMe = user?.id === entry.user_id;
              return (
                <div key={entry.user_id} style={{
                  display: "flex", alignItems: "center", gap: 8, padding: "6px 12px",
                  borderRadius: 10, flex: "1 1 160px",
                  background: isMe ? "#f5f3ff" : "#f9fafb",
                  border: isMe ? "1px solid rgba(124,58,237,.2)" : "1px solid #f0f0f0"
                }}>
                  <span style={{ fontSize: 14, width: 20 }}>{i < 3 ? medals[i] : i + 1}</span>
                  <span style={{ flex: 1, fontSize: 12, fontWeight: isMe ? 600 : 400, color: isMe ? "#7c3aed" : "#374151", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {entry.name}{isMe ? " (siz)" : ""}
                  </span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "#eab308" }}>{entry.coins}🪙</span>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
