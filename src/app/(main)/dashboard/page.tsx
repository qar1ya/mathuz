"use client";
import { useAuth } from "@/lib/auth";
import { SAMPLE_STUDY_TASKS } from "@/lib/sample-data";
import { CheckCircle, Circle, BookOpen, Target, Flame, Trophy } from "lucide-react";

function ExamCountdown({ examDate }: { examDate: string }) {
  const days = Math.ceil((new Date(examDate).getTime() - Date.now()) / 86400000);
  return (
    <div className="bg-brand/10 border border-brand/20 rounded-xl p-4 mb-6">
      <p className="text-brand text-sm font-semibold">DTM imtihoniga</p>
      <p className="text-white text-3xl font-bold mt-1">{days} kun qoldi</p>
    </div>
  );
}

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">
          Salom, {user?.name ?? "Foydalanuvchi"} 👋
        </h1>
        <p className="text-gray-500 text-sm mt-1">Bugun ham matematika bilan shug&apos;ullanamizmi?</p>
      </div>

      {user?.examDate && <ExamCountdown examDate={user.examDate} />}

      <div className="grid grid-cols-4 gap-4 mb-8">
        {[
          { icon: BookOpen, label: "Ishlangan", value: user?.totalAttempted ?? 0, color: "text-blue-400" },
          { icon: Target, label: "Aniqlik", value: `${user?.accuracy ?? 0}%`, color: "text-green-400" },
          { icon: Flame, label: "Streak", value: `${user?.streak ?? 0} kun`, color: "text-orange-400" },
          { icon: Trophy, label: "Tangalar", value: user?.coins ?? 0, color: "text-yellow-400" },
        ].map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="bg-dark-card border border-dark-border rounded-xl p-4">
            <Icon size={18} className={color} />
            <p className="text-gray-500 text-xs mt-2">{label}</p>
            <p className="text-white font-bold text-xl mt-0.5">{value}</p>
          </div>
        ))}
      </div>

      <div className="bg-dark-card border border-dark-border rounded-xl p-5">
        <h2 className="text-white font-semibold mb-4">Bugungi reja</h2>
        <div className="space-y-3">
          {SAMPLE_STUDY_TASKS.map((task) => (
            <div key={task.id} className="flex items-center gap-3">
              {task.done
                ? <CheckCircle size={16} className="text-brand shrink-0" />
                : <Circle size={16} className="text-gray-600 shrink-0" />}
              <div className="flex-1">
                <p className={task.done ? "text-gray-500 line-through text-sm" : "text-white text-sm"}>
                  {task.title}
                </p>
              </div>
              <span className="text-xs text-gray-600">{task.duration}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}