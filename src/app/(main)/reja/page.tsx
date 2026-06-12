"use client";
import { useState } from "react";
import { Calendar, CheckCircle2, Circle, Plus, Trash2, Target } from "lucide-react";
import { cn } from "@/lib/utils";

interface Task {
  id: string;
  title: string;
  topic: string;
  target: number;
  done: number;
  date: string;
}

const INITIAL_TASKS: Task[] = [
  { id: "1", title: "Logarifm masalalarini yechish", topic: "Logarifm", target: 20, done: 14, date: "2026-06-12" },
  { id: "2", title: "Trigonometriya formulalarini takrorlash", topic: "Trigonometriya", target: 15, done: 15, date: "2026-06-13" },
  { id: "3", title: "Integral bo'yicha 10 ta masala", topic: "Integral", target: 10, done: 3, date: "2026-06-14" },
];

const TOPICS = ["Algebra","Geometriya","Trigonometriya","Logarifm","Integral","Hosila","Ehtimollik","Kombinatorika","Ketma-ketlik","Tengsizlik"];

export default function RejaPage() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("Algebra");
  const [target, setTarget] = useState(10);
  const [date, setDate] = useState("");

  function addTask() {
    if (!title || !date) return;
    setTasks((prev) => [...prev, { id: Date.now().toString(), title, topic, target, done: 0, date }]);
    setTitle(""); setTopic("Algebra"); setTarget(10); setDate("");
    setShowForm(false);
  }

  function deleteTask(id: string) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  function increment(id: string) {
    setTasks((prev) => prev.map((t) => t.id === id && t.done < t.target ? { ...t, done: t.done + 1 } : t));
  }

  const todayTasks = tasks.filter((t) => t.date === new Date().toISOString().slice(0, 10));
  const futureTasks = tasks.filter((t) => t.date > new Date().toISOString().slice(0, 10));
  const pastTasks = tasks.filter((t) => t.date < new Date().toISOString().slice(0, 10));

  const inputCls = "w-full bg-dark-hover border border-dark-border rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-brand/50";

  function TaskCard({ task }: { task: Task }) {
    const pct = Math.round((task.done / task.target) * 100);
    const done = task.done >= task.target;
    return (
      <div className={cn("bg-dark-card border rounded-xl p-4 transition-colors",
        done ? "border-green-500/20" : "border-dark-border")}>
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-start gap-2.5 flex-1">
            <button onClick={() => increment(task.id)} className="mt-0.5 shrink-0">
              {done
                ? <CheckCircle2 size={16} className="text-green-400" />
                : <Circle size={16} className="text-gray-600 hover:text-brand transition-colors" />}
            </button>
            <div className="flex-1 min-w-0">
              <p className={cn("text-sm font-medium", done ? "text-gray-500 line-through" : "text-white")}>
                {task.title}
              </p>
              <p className="text-xs text-gray-600 mt-0.5">{task.topic} · {task.date}</p>
            </div>
          </div>
          <button onClick={() => deleteTask(task.id)} className="text-gray-700 hover:text-red-400 transition-colors shrink-0">
            <Trash2 size={13} />
          </button>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex-1 h-1.5 bg-dark-hover rounded-full overflow-hidden">
            <div className={cn("h-full rounded-full transition-all", done ? "bg-green-500" : "bg-brand")}
              style={{ width: `${pct}%` }} />
          </div>
          <span className="text-xs text-gray-500 shrink-0">{task.done}/{task.target}</span>
        </div>
      </div>
    );
  }

  const totalDone = tasks.reduce((s, t) => s + t.done, 0);
  const totalTarget = tasks.reduce((s, t) => s + t.target, 0);

  return (
    <div className="p-6 max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-white mb-1">O&apos;quv Rejasi</h1>
          <p className="text-gray-500 text-sm">Kunlik va haftalik maqsadlaringiz</p>
        </div>
        <button onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-brand text-black font-semibold px-4 py-2 rounded-lg hover:bg-brand-dark transition-colors text-sm">
          <Plus size={15} /> Vazifa qo&apos;shish
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-dark-card border border-dark-border rounded-xl p-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-brand/10 flex items-center justify-center">
            <Target size={18} className="text-brand" />
          </div>
          <div>
            <p className="text-gray-500 text-xs">Umumiy progress</p>
            <p className="text-white font-bold">{totalDone} / {totalTarget}</p>
          </div>
        </div>
        <div className="bg-dark-card border border-dark-border rounded-xl p-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-green-500/10 flex items-center justify-center">
            <CheckCircle2 size={18} className="text-green-400" />
          </div>
          <div>
            <p className="text-gray-500 text-xs">Bajarildi</p>
            <p className="text-white font-bold">{tasks.filter((t) => t.done >= t.target).length} / {tasks.length} vazifa</p>
          </div>
        </div>
      </div>

      {showForm && (
        <div className="bg-dark-card border border-brand/30 rounded-xl p-5 mb-6 space-y-3">
          <h3 className="text-white font-semibold text-sm">Yangi vazifa</h3>
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Vazifa nomi" className={inputCls} />
          <div className="grid grid-cols-2 gap-3">
            <select value={topic} onChange={(e) => setTopic(e.target.value)}
              className="bg-dark-hover border border-dark-border rounded-lg px-3 py-2 text-sm text-white focus:outline-none">
              {TOPICS.map((t) => <option key={t}>{t}</option>)}
            </select>
            <input type="number" value={target} onChange={(e) => setTarget(Number(e.target.value))}
              placeholder="Maqsad (masalalar soni)" min={1} className={inputCls} />
          </div>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className={inputCls} />
          <div className="flex gap-2">
            <button onClick={addTask}
              className="flex-1 bg-brand text-black font-semibold py-2 rounded-lg text-sm hover:bg-brand-dark transition-colors">
              Qo&apos;shish
            </button>
            <button onClick={() => setShowForm(false)}
              className="flex-1 bg-dark-hover text-gray-400 py-2 rounded-lg text-sm hover:text-white transition-colors">
              Bekor
            </button>
          </div>
        </div>
      )}

      <div className="space-y-5">
        {todayTasks.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Calendar size={14} className="text-brand" />
              <h2 className="text-white text-sm font-semibold">Bugun</h2>
            </div>
            <div className="space-y-2">{todayTasks.map((t) => <TaskCard key={t.id} task={t} />)}</div>
          </div>
        )}
        {futureTasks.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Calendar size={14} className="text-gray-500" />
              <h2 className="text-gray-400 text-sm font-semibold">Rejalashtirilgan</h2>
            </div>
            <div className="space-y-2">{futureTasks.map((t) => <TaskCard key={t.id} task={t} />)}</div>
          </div>
        )}
        {pastTasks.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Calendar size={14} className="text-gray-700" />
              <h2 className="text-gray-600 text-sm font-semibold">O&apos;tgan</h2>
            </div>
            <div className="space-y-2">{pastTasks.map((t) => <TaskCard key={t.id} task={t} />)}</div>
          </div>
        )}
      </div>
    </div>
  );
}
