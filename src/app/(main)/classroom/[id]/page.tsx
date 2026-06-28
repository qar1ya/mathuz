"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import type { Classroom, Assignment } from "@/lib/types";
import Link from "next/link";
import {
  ArrowLeft, Users, BookOpen, Plus, Calendar,
  ChevronRight, Loader2, X, Trash2, GraduationCap,
  Play, Clock
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Member { user_id: string; role: string; joined_at: string; profiles?: { name: string } }

export default function ClassroomDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const router = useRouter();

  const [cls, setCls] = useState<Classroom | null>(null);
  const [members, setMembers] = useState<Member[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"assignments" | "members">("assignments");
  const [showAddAssign, setShowAddAssign] = useState(false);
  const [assignTitle, setAssignTitle] = useState("");
  const [assignDue, setAssignDue] = useState("");
  const [saving, setSaving] = useState(false);

  const isTeacher = user?.id === cls?.teacher_id;

  async function load() {
    setLoading(true);
    const { data: classroom } = await supabase.from("classrooms").select("*").eq("id", id).single();
    if (!classroom) { router.push("/classroom"); return; }
    setCls(classroom);

    const { data: mems } = await supabase.from("classroom_members").select("*").eq("classroom_id", id);
    setMembers(mems ?? []);

    const { data: assigns } = await supabase.from("assignments")
      .select("*").eq("classroom_id", id).order("created_at", { ascending: false });
    setAssignments(assigns ?? []);
    setLoading(false);
  }

  useEffect(() => { if (id) load(); }, [id]);

  async function createAssignment() {
    if (!assignTitle.trim()) return;
    setSaving(true);
    const { error } = await supabase.from("assignments").insert({
      classroom_id: id,
      title: assignTitle.trim(),
      due_date: assignDue || null,
      question_ids: [],
    });
    if (!error) { setAssignTitle(""); setAssignDue(""); setShowAddAssign(false); await load(); }
    setSaving(false);
  }

  async function deleteAssignment(aid: string) {
    if (!confirm("O'chirilsinmi?")) return;
    await supabase.from("assignments").delete().eq("id", aid);
    setAssignments(prev => prev.filter(a => a.id !== aid));
  }

  if (loading) return (
    <div className="flex items-center justify-center h-full">
      <Loader2 size={24} className="animate-spin text-brand" />
    </div>
  );

  if (!cls) return null;

  return (
    <div className="p-5 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <button onClick={() => router.push("/classroom")}
          className="flex items-center gap-1.5 text-gray-400 hover:text-white text-sm mb-4 transition-colors">
          <ArrowLeft size={14} /> Classroom
        </button>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-white font-bold text-2xl">{cls.name}</h1>
            {cls.description && <p className="text-gray-500 text-sm mt-1">{cls.description}</p>}
          </div>
          {isTeacher && (
            <div className="flex items-center gap-2 bg-dark-card border border-dark-border rounded-xl px-3 py-2">
              <span className="text-gray-500 text-xs">Sinf kodi:</span>
              <span className="text-white font-mono font-bold tracking-widest text-sm">
                {cls.code.toUpperCase()}
              </span>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mt-4">
          {[
            { icon: Users, label: "O'quvchilar", value: members.filter(m => m.role === "student").length, color: "#22c55e" },
            { icon: BookOpen, label: "Vazifalar", value: assignments.length, color: "#3b82f6" },
            { icon: GraduationCap, label: "Rol", value: isTeacher ? "O'qituvchi" : "O'quvchi", color: "#f97316" },
          ].map(({ icon: Icon, label, value, color }) => (
            <div key={label} className="bg-dark-card border border-dark-border rounded-xl p-3 text-center">
              <Icon size={16} className="mx-auto mb-1.5" style={{ color }} />
              <div className="text-white font-bold">{value}</div>
              <div className="text-gray-600 text-xs">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-dark-card border border-dark-border rounded-xl p-1 mb-5 w-fit">
        {(["assignments", "members"] as const).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={cn("px-4 py-1.5 rounded-lg text-sm font-medium transition-colors",
              tab === t ? "bg-brand text-black" : "text-gray-400 hover:text-white")}>
            {t === "assignments" ? "Vazifalar" : "A'zolar"}
          </button>
        ))}
      </div>

      {/* Assignments tab */}
      {tab === "assignments" && (
        <div>
          {isTeacher && (
            <button onClick={() => setShowAddAssign(true)}
              className="flex items-center gap-2 mb-4 bg-brand/10 border border-brand/30 text-brand px-4 py-2 rounded-xl text-sm hover:bg-brand/20 transition-colors">
              <Plus size={15} /> Yangi vazifa
            </button>
          )}

          {assignments.length === 0 ? (
            <div className="border-2 border-dashed border-dark-border rounded-2xl p-10 text-center">
              <BookOpen size={28} className="text-gray-600 mx-auto mb-3" />
              <p className="text-gray-500 text-sm">Hali vazifa yo&apos;q</p>
            </div>
          ) : (
            <div className="space-y-3">
              {assignments.map(a => (
                <div key={a.id} className="bg-dark-card border border-dark-border rounded-2xl p-4 hover:border-brand/20 transition-colors group">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-semibold">{a.title}</h3>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-gray-600 text-xs flex items-center gap-1">
                          <BookOpen size={10} /> {a.question_ids?.length ?? 0} ta savol
                        </span>
                        {a.due_date && (
                          <span className="text-gray-600 text-xs flex items-center gap-1">
                            <Clock size={10} />
                            {new Date(a.due_date).toLocaleDateString("uz-UZ")}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Link href={`/classroom/${id}/assignment/${a.id}`}
                        className="flex items-center gap-1.5 text-xs bg-brand text-black font-semibold px-3 py-1.5 rounded-lg hover:bg-brand/90 transition-colors">
                        {isTeacher ? "Boshqarish" : "Yechish"}
                        <ChevronRight size={12} />
                      </Link>
                      {isTeacher && (
                        <button onClick={() => deleteAssignment(a.id)}
                          className="p-1.5 text-red-500/50 hover:text-red-400 transition-colors">
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Members tab */}
      {tab === "members" && (
        <div className="space-y-2">
          {members.length === 0 ? (
            <div className="border-2 border-dashed border-dark-border rounded-2xl p-10 text-center">
              <Users size={28} className="text-gray-600 mx-auto mb-3" />
              <p className="text-gray-500 text-sm">Hali a&apos;zo yo&apos;q</p>
            </div>
          ) : (
            members.map((m, i) => (
              <div key={m.user_id} className="bg-dark-card border border-dark-border rounded-xl px-4 py-3 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-brand/15 border border-brand/30 flex items-center justify-center text-brand text-xs font-bold">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <p className="text-white text-sm font-medium">{m.user_id.slice(0, 8)}...</p>
                  <p className="text-gray-600 text-xs">{new Date(m.joined_at).toLocaleDateString("uz-UZ")} ga qo&apos;shildi</p>
                </div>
                <span className={cn("text-xs px-2 py-0.5 rounded-full border",
                  m.role === "teacher"
                    ? "text-blue-400 border-blue-400/20 bg-blue-400/8"
                    : "text-green-400 border-green-400/20 bg-green-400/8")}>
                  {m.role === "teacher" ? "O'qituvchi" : "O'quvchi"}
                </span>
              </div>
            ))
          )}
        </div>
      )}

      {/* Add assignment modal */}
      {showAddAssign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.7)" }}
          onClick={e => e.target === e.currentTarget && setShowAddAssign(false)}>
          <div className="bg-dark-card border border-dark-border rounded-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-white font-bold">Yangi vazifa</h3>
              <button onClick={() => setShowAddAssign(false)} className="text-gray-500 hover:text-white">
                <X size={18} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-gray-400 text-xs mb-1.5 block">Vazifa nomi *</label>
                <input value={assignTitle} onChange={e => setAssignTitle(e.target.value)}
                  placeholder="Masalan: 1-bob — Kasrlar"
                  className="w-full bg-dark-bg border border-dark-border rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand/50" />
              </div>
              <div>
                <label className="text-gray-400 text-xs mb-1.5 block">Muddat (ixtiyoriy)</label>
                <input type="datetime-local" value={assignDue} onChange={e => setAssignDue(e.target.value)}
                  className="w-full bg-dark-bg border border-dark-border rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand/50" />
              </div>
              <button onClick={createAssignment} disabled={saving || !assignTitle.trim()}
                className="w-full py-2.5 bg-brand text-black font-bold rounded-xl text-sm disabled:opacity-40 flex items-center justify-center gap-2">
                {saving && <Loader2 size={14} className="animate-spin" />}
                Yaratish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
