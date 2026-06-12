"use client";
import { useAuth } from "@/lib/auth";
import { BookOpen, Target, Flame, Trophy, TrendingUp, Clock } from "lucide-react";

export default function TahlilPage() {
  const { user } = useAuth();

  const stats = [
    { icon: BookOpen, label: "Ishlangan masalalar", value: user?.totalAttempted ?? 0, color: "text-blue-400", bg: "bg-blue-500/10" },
    { icon: Target, label: "Aniqlik", value: `${user?.accuracy ?? 0}%`, color: "text-green-400", bg: "bg-green-500/10" },
    { icon: Flame, label: "Streak", value: `${user?.streak ?? 0} kun`, color: "text-orange-400", bg: "bg-orange-500/10" },
    { icon: Trophy, label: "Tangalar", value: user?.coins ?? 0, color: "text-yellow-400", bg: "bg-yellow-500/10" },
  ];

  const topicStats = [
    { topic: "Algebra", correct: 45, total: 50 },
    { topic: "Logarifm", correct: 32, total: 40 },
    { topic: "Integral", correct: 18, total: 30 },
    { topic: "Trigonometriya", correct: 28, total: 35 },
    { topic: "Hosila", correct: 22, total: 25 },
    { topic: "Geometriya", correct: 15, total: 20 },
  ];

  return (
    <div className="p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-white mb-1">Tahlil</h1>
        <p className="text-gray-500 text-sm">Sizning o&apos;quv jarayoningiz statistikasi</p>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-8">
        {stats.map(({ icon: Icon, label, value, color, bg }) => (
          <div key={label} className="bg-dark-card border border-dark-border rounded-xl p-4">
            <div className={`w-9 h-9 rounded-lg ${bg} flex items-center justify-center mb-3`}>
              <Icon size={18} className={color} />
            </div>
            <p className="text-gray-500 text-xs mb-1">{label}</p>
            <p className="text-white font-bold text-2xl">{value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-dark-card border border-dark-border rounded-xl p-5">
          <div className="flex items-center gap-2 mb-5">
            <TrendingUp size={16} className="text-brand" />
            <h2 className="text-white font-semibold">Mavzular bo&apos;yicha</h2>
          </div>
          <div className="space-y-3">
            {topicStats.map(({ topic, correct, total }) => {
              const pct = Math.round((correct / total) * 100);
              return (
                <div key={topic}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-300">{topic}</span>
                    <span className="text-xs text-gray-500">{correct}/{total}</span>
                  </div>
                  <div className="h-1.5 bg-dark-hover rounded-full overflow-hidden">
                    <div
                      className="h-full bg-brand rounded-full transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-dark-card border border-dark-border rounded-xl p-5">
          <div className="flex items-center gap-2 mb-5">
            <Clock size={16} className="text-brand" />
            <h2 className="text-white font-semibold">Haftalik faollik</h2>
          </div>
          <div className="flex items-end gap-2 h-32">
            {["Du", "Se", "Ch", "Pa", "Ju", "Sh", "Ya"].map((day, i) => {
              const heights = [60, 80, 45, 90, 70, 30, 55];
              return (
                <div key={day} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className="w-full bg-brand/20 rounded-t-sm transition-all hover:bg-brand/40"
                    style={{ height: `${heights[i]}%` }}
                  />
                  <span className="text-[10px] text-gray-600">{day}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
