"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import type { Classroom } from "@/lib/types";
import Link from "next/link";
import {
  Plus, Users, BookOpen, ChevronRight, Copy, Check,
  GraduationCap, LogIn, X, Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function ClassroomPage() {
  const { user } = useAuth();
  const [myClassrooms, setMyClassrooms] = useState<Classroom[]>([]);
  const [joinedClassrooms, setJoinedClassrooms] = useState<Classroom[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [showJoin, setShowJoin] = useState(false);
  const [createName, setCreateName] = useState("");
  const [createDesc, setCreateDesc] = useState("");
  const [joinCode, setJoinCode] = useState("");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  async function load() {
    if (!user) return;
    setLoading(true);

    if (user.isTeacher) {
      const { data } = await supabase.from("classrooms")
        .select("*").eq("teacher_id", user.id).order("created_at", { ascending: false });
      setMyClassrooms(data ?? []);
    }

    const { data: memberOf } = await supabase.from("classroom_members")
      .select("classroom_id").eq("user_id", user.id).eq("role", "student");
    if (memberOf?.length) {
      const ids = memberOf.map(m => m.classroom_id);
      const { data } = await supabase.from("classrooms").select("*").in("id", ids);
      setJoinedClassrooms(data ?? []);
    }
    setLoading(false);
  }

  useEffect(() => { load(); }, [user]);

  async function createClassroom() {
    if (!createName.trim() || !user) return;
    setSaving(true);
    const { error } = await supabase.from("classrooms").insert({
      name: createName.trim(),
      description: createDesc.trim(),
      teacher_id: user.id,
    });
    if (error) { setMsg("Xato: " + error.message); setSaving(false); return; }
    setCreateName(""); setCreateDesc(""); setShowCreate(false); setMsg("");
    await load();
    setSaving(false);
  }

  async function joinClassroom() {
    if (!joinCode.trim() || !user) return;
    setSaving(true);
    const { data: cls } = await supabase.from("classrooms")
      .select("id").eq("code", joinCode.trim().toLowerCase()).single();
    if (!cls) { setMsg("Sinf topilmadi."); setSaving(false); return; }
    const { error } = await supabase.from("classroom_members").insert({
      classroom_id: cls.id, user_id: user.id, role: "student",
    });
    if (error?.message?.includes("unique")) { setMsg("Allaqachon a'zosiz."); }
    else if (error) { setMsg("Xato: " + error.message); }
    else { setJoinCode(""); setShowJoin(false); setMsg(""); await load(); }
    setSaving(false);
  }

  function copyCode(code: string) {
    navigator.clipboard.writeText(code);
    setCopied(code);
    setTimeout(() => setCopied(null), 2000);
  }

  const ClassCard = ({ c, isOwner }: { c: Classroom; isOwner?: boolean }) => (
    <Link href={`/classroom/${c.id}`}
      className="bg-dark-card border border-dark-border rounded-2xl p-5 hover:border-brand/30 transition-all group block">
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: isOwner ? "#3b82f620" : "#22c55e20" }}>
          {isOwner
            ? <GraduationCap size={18} style={{ color: "#3b82f6" }} />
            : <Users size={18} style={{ color: "#22c55e" }} />}
        </div>
        {isOwner && (
          <button onClick={e => { e.preventDefault(); copyCode(c.code); }}
            className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-brand border border-dark-border px-2.5 py-1 rounded-lg transition-colors">
            {copied === c.code ? <Check size={11} className="text-brand" /> : <Copy size={11} />}
            {c.code.toUpperCase()}
          </button>
        )}
      </div>
      <h3 className="text-white font-bold text-base mb-1">{c.name}</h3>
      {c.description && <p className="text-gray-500 text-xs mb-3 line-clamp-2">{c.description}</p>}
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-600">
          {isOwner ? "O'qituvchi" : "O'quvchi"}
        </span>
        <ChevronRight size={14} className="text-gray-600 group-hover:text-brand transition-colors" />
      </div>
    </Link>
  );

  return (
    <div className="p-5 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-white font-bold text-2xl">Classroom</h1>
          <p className="text-gray-500 text-sm mt-0.5">Virtual sinfxona</p>
        </div>
        <div className="flex gap-2">
          {user?.isTeacher && (
            <button onClick={() => setShowCreate(true)}
              className="flex items-center gap-2 bg-brand text-black font-semibold px-4 py-2 rounded-xl text-sm hover:bg-brand/90 transition-colors">
              <Plus size={15} /> Sinf yaratish
            </button>
          )}
          <button onClick={() => setShowJoin(true)}
            className="flex items-center gap-2 border border-dark-border text-gray-300 px-4 py-2 rounded-xl text-sm hover:border-brand/40 hover:text-white transition-colors">
            <LogIn size={15} /> Qo&apos;shilish
          </button>
        </div>
      </div>

      {!user?.isTeacher && (
        <div className="bg-blue-500/8 border border-blue-500/20 rounded-xl px-4 py-3 mb-5 flex items-center gap-3">
          <GraduationCap size={16} className="text-blue-400 shrink-0" />
          <p className="text-gray-400 text-sm">
            O&apos;qituvchi sifatida sinf yaratmoqchimisiz?
            <span className="text-blue-400 ml-1">Admin panelda o&apos;qituvchi roli oling.</span>
          </p>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 size={24} className="animate-spin text-brand" />
        </div>
      ) : (
        <div className="space-y-8">
          {/* Teacher's classrooms */}
          {user?.isTeacher && (
            <div>
              <h2 className="text-white font-semibold mb-3 flex items-center gap-2">
                <GraduationCap size={16} className="text-blue-400" /> Mening sinflarim
              </h2>
              {myClassrooms.length === 0 ? (
                <div className="border-2 border-dashed border-dark-border rounded-2xl p-10 text-center">
                  <Plus size={28} className="text-gray-600 mx-auto mb-3" />
                  <p className="text-gray-500 text-sm">Hali sinf yaratmadingiz</p>
                  <button onClick={() => setShowCreate(true)}
                    className="mt-3 text-brand text-sm hover:underline">
                    Sinf yarating
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {myClassrooms.map(c => <ClassCard key={c.id} c={c} isOwner />)}
                </div>
              )}
            </div>
          )}

          {/* Joined classrooms */}
          <div>
            <h2 className="text-white font-semibold mb-3 flex items-center gap-2">
              <Users size={16} className="text-green-400" /> Qo&apos;shilgan sinflar
            </h2>
            {joinedClassrooms.length === 0 ? (
              <div className="border-2 border-dashed border-dark-border rounded-2xl p-10 text-center">
                <Users size={28} className="text-gray-600 mx-auto mb-3" />
                <p className="text-gray-500 text-sm">Hali hech qanday sinfga qo&apos;shilmadingiz</p>
                <button onClick={() => setShowJoin(true)}
                  className="mt-3 text-brand text-sm hover:underline">
                  Sinfga qo&apos;shiling
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {joinedClassrooms.map(c => <ClassCard key={c.id} c={c} />)}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Create modal */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.7)" }}
          onClick={e => e.target === e.currentTarget && setShowCreate(false)}>
          <div className="bg-dark-card border border-dark-border rounded-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-white font-bold">Sinf yaratish</h3>
              <button onClick={() => setShowCreate(false)} className="text-gray-500 hover:text-white">
                <X size={18} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-gray-400 text-xs mb-1.5 block">Sinf nomi *</label>
                <input value={createName} onChange={e => setCreateName(e.target.value)}
                  placeholder="Masalan: 10-A sinfi"
                  className="w-full bg-dark-bg border border-dark-border rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand/50" />
              </div>
              <div>
                <label className="text-gray-400 text-xs mb-1.5 block">Tavsif (ixtiyoriy)</label>
                <textarea value={createDesc} onChange={e => setCreateDesc(e.target.value)}
                  placeholder="Sinf haqida..."
                  rows={3}
                  className="w-full bg-dark-bg border border-dark-border rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand/50 resize-none" />
              </div>
              {msg && <p className="text-red-400 text-xs">{msg}</p>}
              <button onClick={createClassroom} disabled={saving || !createName.trim()}
                className="w-full py-2.5 bg-brand text-black font-bold rounded-xl text-sm disabled:opacity-40 flex items-center justify-center gap-2">
                {saving && <Loader2 size={14} className="animate-spin" />}
                Yaratish
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Join modal */}
      {showJoin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.7)" }}
          onClick={e => e.target === e.currentTarget && setShowJoin(false)}>
          <div className="bg-dark-card border border-dark-border rounded-2xl w-full max-w-sm p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-white font-bold">Sinfga qo&apos;shilish</h3>
              <button onClick={() => setShowJoin(false)} className="text-gray-500 hover:text-white">
                <X size={18} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-gray-400 text-xs mb-1.5 block">Sinf kodi</label>
                <input value={joinCode} onChange={e => setJoinCode(e.target.value.toUpperCase())}
                  placeholder="ABCDEF"
                  maxLength={6}
                  className="w-full bg-dark-bg border border-dark-border rounded-xl px-4 py-3 text-xl font-mono text-white text-center focus:outline-none focus:border-brand/50 tracking-widest uppercase" />
              </div>
              {msg && <p className="text-red-400 text-xs">{msg}</p>}
              <button onClick={joinClassroom} disabled={saving || joinCode.length < 6}
                className="w-full py-2.5 bg-brand text-black font-bold rounded-xl text-sm disabled:opacity-40 flex items-center justify-center gap-2">
                {saving && <Loader2 size={14} className="animate-spin" />}
                Qo&apos;shilish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
