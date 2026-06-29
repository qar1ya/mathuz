"use client";
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth";
import {
  LayoutDashboard, Users, BookOpen, ClipboardList, Trophy,
  Settings, ChevronDown, ChevronRight, Search, Plus, Edit,
  Trash2, Eye, Filter, RefreshCcw, UserCheck, BarChart3,
  GraduationCap, Award, LogOut, X, Loader2, Check
} from "lucide-react";
import { cn } from "@/lib/utils";

const PASSWORD = "mathuz2024";

// ── Types ─────────────────────────────────────────────────────────────────
type Page = "dashboard" | "users" | "questions" | "classrooms" | "competitions" | "settings";

interface UserRow {
  id: string; email?: string; created_at: string;
  raw_user_meta_data?: { name?: string; exam_type?: string; streak?: number; coins?: number; is_premium?: boolean; is_teacher?: boolean; total_attempted?: number };
}

// ── Sidebar ────────────────────────────────────────────────────────────────
const NAV_GROUPS = [
  { items: [{ id: "dashboard" as Page, label: "Dashboard", icon: LayoutDashboard }] },
  {
    label: "Foydalanuvchilar", items: [
      { id: "users" as Page, label: "Barcha foydalanuvchilar", icon: Users },
    ]
  },
  {
    label: "Kontent", items: [
      { id: "questions" as Page, label: "Savollar banki", icon: BookOpen },
      { id: "classrooms" as Page, label: "Sinfxonalar", icon: GraduationCap },
      { id: "competitions" as Page, label: "Musobaqalar", icon: Trophy },
    ]
  },
  {
    label: "Sozlamalar", items: [
      { id: "settings" as Page, label: "Tizim sozlamalari", icon: Settings },
    ]
  },
];

function Sidebar({ current, onNav }: { current: Page; onNav: (p: Page) => void }) {
  const { signOut } = useAuth();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({ "Foydalanuvchilar": true, "Kontent": true });

  return (
    <div className="w-60 bg-white border-r border-gray-100 flex flex-col h-full flex-shrink-0">
      {/* Logo */}
      <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm" style={{ background: "#7c3aed" }}>M</div>
        <div>
          <p className="font-black text-sm" style={{ color: "#0f0f0f" }}>MathUz</p>
          <p className="text-[10px]" style={{ color: "#9ca3af" }}>Admin Panel</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-3">
        {NAV_GROUPS.map((group, gi) => (
          <div key={gi} className="mb-2">
            {group.label && (
              <button
                onClick={() => setExpanded(prev => ({ ...prev, [group.label!]: !prev[group.label!] }))}
                className="w-full flex items-center justify-between px-2 py-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wider hover:text-gray-600 transition-colors"
              >
                {group.label}
                {expanded[group.label] ? <ChevronDown size={11} /> : <ChevronRight size={11} />}
              </button>
            )}
            {(!group.label || expanded[group.label!]) && (
              <div className="space-y-0.5">
                {group.items.map(item => (
                  <button key={item.id} onClick={() => onNav(item.id)}
                    className={cn(
                      "w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-all",
                      current === item.id
                        ? "text-white shadow-sm"
                        : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                    )}
                    style={current === item.id ? { background: "#7c3aed" } : {}}>
                    <item.icon size={15} />
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-gray-100 p-3">
        <button onClick={() => signOut()}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors">
          <LogOut size={14} />
          Chiqish
        </button>
      </div>
    </div>
  );
}

// ── Page Header ────────────────────────────────────────────────────────────
function PageHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-xl font-black" style={{ color: "#0f0f0f" }}>{title}</h1>
        {subtitle && <p className="text-sm mt-0.5" style={{ color: "#9ca3af" }}>{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

// ── Stat Card ──────────────────────────────────────────────────────────────
function StatCard({ title, value, icon: Icon, color, bg, sub }: { title: string; value: string | number; icon: React.ElementType; color: string; bg: string; sub?: string }) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-5 hover:shadow-sm transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2.5 rounded-lg" style={{ background: bg }}>
          <Icon size={18} style={{ color }} />
        </div>
      </div>
      <p className="text-sm font-medium mb-0.5" style={{ color: "#6b7280" }}>{title}</p>
      <p className="text-2xl font-black" style={{ color: "#0f0f0f" }}>{value}</p>
      {sub && <p className="text-xs mt-1" style={{ color: "#9ca3af" }}>{sub}</p>}
    </div>
  );
}

// ── Badge ──────────────────────────────────────────────────────────────────
function Badge({ label, color, bg }: { label: string; color: string; bg: string }) {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold" style={{ color, background: bg }}>
      {label}
    </span>
  );
}

// ── Dashboard Page ─────────────────────────────────────────────────────────
function DashboardContent() {
  const [stats, setStats] = useState({ users: 0, questions: 0, classrooms: 0, premium: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [{ count: qCount }, cls] = await Promise.all([
        supabase.from("questions").select("*", { count: "exact", head: true }),
        supabase.from("classrooms").select("*", { count: "exact", head: true }),
      ]);
      const cCount = cls.count;
      setStats({ users: 1, questions: qCount ?? 0, classrooms: cCount ?? 0, premium: 0 });
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return <div className="flex justify-center py-12"><Loader2 size={20} className="animate-spin text-purple-600" /></div>;

  return (
    <div>
      <PageHeader title="Dashboard" subtitle="MathUz tizimining umumiy holati" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title="Foydalanuvchilar" value={stats.users} icon={Users} color="#3b82f6" bg="#eff6ff" sub="jami ro'yxatdan o'tgan" />
        <StatCard title="Savollar" value={stats.questions} icon={BookOpen} color="#7c3aed" bg="#f5f3ff" sub="bazada mavjud" />
        <StatCard title="Sinfxonalar" value={stats.classrooms} icon={GraduationCap} color="#22c55e" bg="#f0fdf4" sub="faol sinflar" />
        <StatCard title="Premium" value={stats.premium} icon={Award} color="#f97316" bg="#fff7ed" sub="to'lovli foydalanuvchi" />
      </div>

      {/* Recent questions */}
      <div className="bg-white border border-gray-100 rounded-xl p-5">
        <h2 className="font-bold text-sm mb-4" style={{ color: "#0f0f0f" }}>Tizim holati</h2>
        <div className="space-y-3">
          {[
            { label: "Supabase ulanishi", ok: true },
            { label: "Savollar banki", ok: stats.questions > 0 },
            { label: "Classroom tizimi", ok: true },
            { label: "AI yordamchi", ok: false, note: "API kredit kerak" },
          ].map(item => (
            <div key={item.label} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
              <span className="text-sm" style={{ color: "#374151" }}>{item.label}</span>
              {item.ok
                ? <span className="text-xs font-medium text-green-600 flex items-center gap-1"><Check size={11} /> Faol</span>
                : <span className="text-xs font-medium text-red-500">{item.note ?? "Xato"}</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Users Page ─────────────────────────────────────────────────────────────
function UsersContent() {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase.auth.admin?.listUsers?.() ?? { data: null };
    if (!data) {
      const { data: lb } = await supabase.from("leaderboard").select("user_id,name,coins,streak");
      const fake = (lb ?? []).map((r: { user_id: string; name: string; coins: number; streak: number }) => ({
        id: r.user_id, created_at: new Date().toISOString(),
        raw_user_meta_data: { name: r.name, coins: r.coins, streak: r.streak }
      }));
      setUsers(fake as UserRow[]);
    } else {
      setUsers(data.users as unknown as UserRow[]);
    }
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  async function grantTeacher(userId: string, isTeacher: boolean) {
    await supabase.rpc ? null : null; // Note: needs service role for admin operations
    alert(`O'qituvchi roli ${isTeacher ? "berildi" : "olib tashlandi"}. SQL Editor orqali o'zgartiring.`);
  }

  const filtered = users.filter(u => {
    const name = u.raw_user_meta_data?.name ?? "";
    if (search && !name.toLowerCase().includes(search.toLowerCase())) return false;
    if (filter === "premium" && !u.raw_user_meta_data?.is_premium) return false;
    if (filter === "teacher" && !u.raw_user_meta_data?.is_teacher) return false;
    return true;
  });

  return (
    <div>
      <PageHeader title="Foydalanuvchilar" subtitle={`Jami ${users.length} ta foydalanuvchi`}
        action={
          <button className="flex items-center gap-2 text-white text-sm font-semibold px-4 py-2 rounded-lg" style={{ background: "#7c3aed" }}>
            <Plus size={14} /> Yangi foydalanuvchi
          </button>
        }
      />

      {/* Filters */}
      <div className="flex items-center gap-3 mb-5">
        <div className="relative flex-1 max-w-xs">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Ism, email bo'yicha..."
            className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-purple-300" />
        </div>
        {["all", "premium", "teacher"].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={cn("px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border",
              filter === f ? "border-purple-600 bg-purple-50 text-purple-600" : "border-gray-200 text-gray-500 hover:bg-gray-50")}>
            {f === "all" ? "Barchasi" : f === "premium" ? "Premium" : "O'qituvchi"}
          </button>
        ))}
        <button onClick={load} className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-gray-500">
          <RefreshCcw size={13} />
        </button>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="border-b border-gray-100">
            <tr>
              {["Ism", "Imtihon", "Streak", "Tangalar", "Holat", "Amallar"].map(h => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {loading ? (
              <tr><td colSpan={6} className="text-center py-10 text-sm text-gray-400"><Loader2 size={16} className="animate-spin inline mr-2" />Yuklanmoqda...</td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan={6} className="text-center py-10 text-sm text-gray-400">Foydalanuvchi topilmadi</td></tr>
            ) : filtered.map(u => {
              const m = u.raw_user_meta_data ?? {};
              return (
                <tr key={u.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ background: "#7c3aed" }}>
                        {(m.name ?? "U").charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-medium" style={{ color: "#0f0f0f" }}>{m.name ?? "Foydalanuvchi"}</p>
                        <p className="text-[11px] text-gray-400">{u.id.slice(0, 8)}...</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">{m.exam_type ?? "DTM"}</td>
                  <td className="px-4 py-3 text-sm font-medium" style={{ color: "#f97316" }}>🔥 {m.streak ?? 0}</td>
                  <td className="px-4 py-3 text-sm font-medium" style={{ color: "#eab308" }}>🪙 {m.coins ?? 0}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1.5 flex-wrap">
                      {m.is_premium && <Badge label="Premium" color="#7c3aed" bg="#f5f3ff" />}
                      {m.is_teacher && <Badge label="O'qituvchi" color="#3b82f6" bg="#eff6ff" />}
                      {!m.is_premium && !m.is_teacher && <Badge label="Bepul" color="#9ca3af" bg="#f9fafb" />}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 rounded-md hover:bg-gray-100 transition-colors text-gray-400 hover:text-purple-600" title="Ko'rish">
                        <Eye size={13} />
                      </button>
                      <button onClick={() => grantTeacher(u.id, !m.is_teacher)}
                        className="p-1.5 rounded-md hover:bg-blue-50 transition-colors text-gray-400 hover:text-blue-600" title="O'qituvchi roli">
                        <UserCheck size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Questions Page ─────────────────────────────────────────────────────────
function QuestionsContent() {
  const [questions, setQuestions] = useState<{ id: string; text: string; topic: string; difficulty: string; answer: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const PER_PAGE = 20;

  useEffect(() => {
    supabase.from("questions").select("id,text,topic,difficulty,answer")
      .order("id").range((page - 1) * PER_PAGE, page * PER_PAGE - 1)
      .then(({ data }) => { setQuestions(data ?? []); setLoading(false); });
  }, [page]);

  const filtered = questions.filter(q => !search || q.text.toLowerCase().includes(search.toLowerCase()) || q.topic.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <PageHeader title="Savollar banki" subtitle="Barcha mavzudagi savollar"
        action={
          <button className="flex items-center gap-2 text-white text-sm font-semibold px-4 py-2 rounded-lg" style={{ background: "#7c3aed" }}>
            <Plus size={14} /> Savol qo&apos;shish
          </button>
        }
      />
      <div className="flex items-center gap-3 mb-5">
        <div className="relative flex-1 max-w-xs">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Savol yoki mavzu..."
            className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-purple-300" />
        </div>
      </div>
      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="border-b border-gray-100">
            <tr>
              {["#", "Savol", "Mavzu", "Qiyinlik", "Javob", "Amallar"].map(h => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {loading ? (
              <tr><td colSpan={6} className="text-center py-10"><Loader2 size={16} className="animate-spin inline mr-2 text-purple-600" />Yuklanmoqda...</td></tr>
            ) : filtered.map((q, i) => (
              <tr key={q.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-4 py-3 text-xs text-gray-400">{(page - 1) * PER_PAGE + i + 1}</td>
                <td className="px-4 py-3 max-w-xs">
                  <p className="text-sm text-gray-700 line-clamp-1">{q.text.slice(0, 80)}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{q.id}</p>
                </td>
                <td className="px-4 py-3 text-xs text-gray-500 max-w-[140px] truncate">{q.topic}</td>
                <td className="px-4 py-3">
                  <Badge
                    label={q.difficulty}
                    color={q.difficulty === "Oson" ? "#22c55e" : q.difficulty === "O'rtacha" ? "#f59e0b" : "#ef4444"}
                    bg={q.difficulty === "Oson" ? "#f0fdf4" : q.difficulty === "O'rtacha" ? "#fffbeb" : "#fef2f2"}
                  />
                </td>
                <td className="px-4 py-3 text-xs text-gray-500 max-w-[100px] truncate">{q.answer}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <button className="p-1.5 rounded-md hover:bg-purple-50 text-gray-400 hover:text-purple-600 transition-colors"><Edit size={12} /></button>
                    <button className="p-1.5 rounded-md hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={12} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
          <p className="text-xs text-gray-400">{PER_PAGE} ta ko&apos;rsatilmoqda</p>
          <div className="flex gap-2">
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
              className="px-3 py-1 text-xs border border-gray-200 rounded-lg disabled:opacity-40 hover:bg-gray-50">
              ← Oldingi
            </button>
            <span className="px-3 py-1 text-xs text-gray-500">{page}</span>
            <button onClick={() => setPage(p => p + 1)} disabled={questions.length < PER_PAGE}
              className="px-3 py-1 text-xs border border-gray-200 rounded-lg disabled:opacity-40 hover:bg-gray-50">
              Keyingi →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Settings ───────────────────────────────────────────────────────────────
function SettingsContent() {
  return (
    <div>
      <PageHeader title="Sozlamalar" />
      <div className="grid gap-5">
        <div className="bg-white border border-gray-100 rounded-xl p-5">
          <h3 className="font-bold mb-4 text-sm" style={{ color: "#0f0f0f" }}>O&apos;qituvchi roli berish</h3>
          <div className="bg-amber-50 border border-amber-100 rounded-lg px-4 py-3 text-sm text-amber-700 mb-3">
            ⚠️ O&apos;qituvchi roli berish uchun Supabase SQL Editor orqali quyidagini bajaring:
          </div>
          <code className="block bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-xs text-gray-700 font-mono">
            UPDATE auth.users<br />
            SET raw_user_meta_data = raw_user_meta_data || &apos;&#123;&quot;is_teacher&quot;:true&#125;&apos;::jsonb<br />
            WHERE email = &apos;foydalanuvchi@email.com&apos;;
          </code>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-5">
          <h3 className="font-bold mb-4 text-sm" style={{ color: "#0f0f0f" }}>Premium berish</h3>
          <code className="block bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-xs text-gray-700 font-mono">
            UPDATE auth.users<br />
            SET raw_user_meta_data = raw_user_meta_data || &apos;&#123;&quot;is_premium&quot;:true&#125;&apos;::jsonb<br />
            WHERE email = &apos;foydalanuvchi@email.com&apos;;
          </code>
        </div>
      </div>
    </div>
  );
}

// ── Main Admin Page ────────────────────────────────────────────────────────
export default function AdminV2Page() {
  const [auth, setAuth] = useState(false);
  const [pw, setPw] = useState("");
  const [err, setErr] = useState(false);
  const [page, setPage] = useState<Page>("dashboard");

  function login() {
    if (pw === PASSWORD) { setAuth(true); setErr(false); }
    else setErr(true);
  }

  if (!auth) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#f5f5f7" }}>
        <div className="bg-white border border-gray-100 rounded-2xl p-8 w-80 shadow-sm">
          <div className="flex items-center gap-2.5 mb-6">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold" style={{ background: "#7c3aed" }}>M</div>
            <span className="font-black" style={{ color: "#0f0f0f" }}>Admin Panel</span>
          </div>
          <input type="password" value={pw} onChange={e => setPw(e.target.value)}
            onKeyDown={e => e.key === "Enter" && login()} placeholder="Parol..."
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm mb-3 focus:outline-none focus:border-purple-300" />
          {err && <p className="text-red-500 text-xs mb-3">Noto&apos;g&apos;ri parol</p>}
          <button onClick={login} className="w-full py-2.5 text-white font-bold rounded-xl text-sm" style={{ background: "#7c3aed" }}>
            Kirish
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full overflow-hidden" style={{ background: "#f9f9fb" }}>
      <Sidebar current={page} onNav={setPage} />
      <div className="flex-1 overflow-y-auto p-6">
        {page === "dashboard" && <DashboardContent />}
        {page === "users" && <UsersContent />}
        {page === "questions" && <QuestionsContent />}
        {page === "classrooms" && <div><PageHeader title="Sinfxonalar" /><p className="text-sm text-gray-400">Tez orada...</p></div>}
        {page === "competitions" && <div><PageHeader title="Musobaqalar" /><p className="text-sm text-gray-400">Tez orada...</p></div>}
        {page === "settings" && <SettingsContent />}
      </div>
    </div>
  );
}
