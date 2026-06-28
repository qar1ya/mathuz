"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import type { Assignment, Question } from "@/lib/types";
import { ArrowLeft, Plus, Trash2, Check, Loader2, BookOpen, BarChart2 } from "lucide-react";
import MathRenderer from "@/components/math/MathRenderer";
import { cn } from "@/lib/utils";

interface SubmissionRow { user_id: string; score: number; submitted_at: string; answers: Record<string, string>; }

export default function AssignmentPage() {
  const { id, aid } = useParams<{ id: string; aid: string }>();
  const { user } = useAuth();
  const router = useRouter();

  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [submissions, setSubmissions] = useState<SubmissionRow[]>([]);
  const [mySubmission, setMySubmission] = useState<SubmissionRow | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isTeacher, setIsTeacher] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [tab, setTab] = useState<"solve" | "results">("solve");

  // For adding questions (teacher)
  const [showAddQ, setShowAddQ] = useState(false);
  const [allQuestions, setAllQuestions] = useState<Question[]>([]);
  const [qSearch, setQSearch] = useState("");
  const [addingQ, setAddingQ] = useState(false);

  async function load() {
    setLoading(true);
    const { data: assign } = await supabase.from("assignments").select("*").eq("id", aid).single();
    if (!assign) { router.push(`/classroom/${id}`); return; }
    setAssignment(assign);

    // Check teacher
    const { data: cls } = await supabase.from("classrooms").select("teacher_id").eq("id", id).single();
    const teacher = cls?.teacher_id === user?.id;
    setIsTeacher(teacher);

    // Load questions
    if (assign.question_ids?.length) {
      const { data: qs } = await supabase.from("questions").select("*").in("id", assign.question_ids);
      setQuestions((qs ?? []).map(q => ({ id: q.id, text: q.text, options: q.options ?? [], answer: q.answer, solution: q.solution, topic: q.topic, difficulty: q.difficulty, examType: q.exam_type ?? [], diagramSvg: q.diagram_svg })));
    }

    // My submission
    if (user) {
      const { data: sub } = await supabase.from("assignment_submissions")
        .select("*").eq("assignment_id", aid).eq("user_id", user.id).single();
      setMySubmission(sub);
    }

    // All submissions (teacher)
    if (teacher) {
      const { data: subs } = await supabase.from("assignment_submissions").select("*").eq("assignment_id", aid);
      setSubmissions(subs ?? []);
    }

    setLoading(false);
  }

  useEffect(() => { if (aid && user) load(); }, [aid, user]);

  async function submit() {
    if (!user || !assignment) return;
    setSubmitting(true);
    let score = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.answer) score++;
    });
    const { error } = await supabase.from("assignment_submissions").insert({
      assignment_id: aid, user_id: user.id, answers, score,
    });
    if (!error) { await load(); setTab("results"); }
    setSubmitting(false);
  }

  async function addQuestion(qId: string) {
    if (!assignment) return;
    const newIds = [...(assignment.question_ids ?? []), qId];
    await supabase.from("assignments").delete().eq("id", aid);
    await supabase.from("assignments").insert({ ...assignment, question_ids: newIds });
    await load();
  }

  async function removeQuestion(qId: string) {
    if (!assignment) return;
    const newIds = (assignment.question_ids ?? []).filter(x => x !== qId);
    await supabase.from("assignments").delete().eq("id", aid);
    await supabase.from("assignments").insert({ ...assignment, question_ids: newIds });
    await load();
  }

  async function loadAllQuestions() {
    const { data } = await supabase.from("questions").select("id,text,topic,answer").limit(100);
    setAllQuestions((data ?? []).map(q => ({ id: q.id, text: q.text, options: [], answer: q.answer, solution: "", topic: q.topic, difficulty: "Oson", examType: [], diagramSvg: null })));
  }

  if (loading) return (
    <div className="flex items-center justify-center h-full">
      <Loader2 size={24} className="animate-spin text-brand" />
    </div>
  );
  if (!assignment) return null;

  const pct = questions.length > 0 ? Math.round((Object.keys(answers).length / questions.length) * 100) : 0;
  const scorePct = mySubmission && questions.length > 0
    ? Math.round((mySubmission.score / questions.length) * 100) : 0;

  return (
    <div className="flex flex-col h-full">
      {/* Top bar */}
      <div className="shrink-0 px-5 py-3 border-b border-dark-border flex items-center gap-4">
        <button onClick={() => router.push(`/classroom/${id}`)}
          className="flex items-center gap-1.5 text-gray-400 hover:text-white text-sm transition-colors">
          <ArrowLeft size={14} /> Sinf
        </button>
        <div className="flex-1">
          <h1 className="text-white font-bold text-sm">{assignment.title}</h1>
        </div>
        {isTeacher && (
          <button onClick={() => { setShowAddQ(true); loadAllQuestions(); }}
            className="flex items-center gap-1.5 text-xs bg-brand/10 border border-brand/30 text-brand px-3 py-1.5 rounded-lg hover:bg-brand/20">
            <Plus size={12} /> Savol qo&apos;shish
          </button>
        )}
        {!isTeacher && !mySubmission && questions.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-gray-500 text-xs">{Object.keys(answers).length}/{questions.length}</span>
            <button onClick={submit} disabled={submitting}
              className="flex items-center gap-1.5 text-xs bg-brand text-black font-bold px-4 py-1.5 rounded-lg disabled:opacity-40">
              {submitting && <Loader2 size={11} className="animate-spin" />}
              Topshirish
            </button>
          </div>
        )}
      </div>

      {/* Tabs (teacher sees results too) */}
      {isTeacher && (
        <div className="shrink-0 flex gap-1 px-5 py-2 border-b border-dark-border">
          {([["solve", "Savollar"], ["results", "Natijalar"]] as const).map(([t, l]) => (
            <button key={t} onClick={() => setTab(t)}
              className={cn("px-3 py-1 rounded-lg text-xs font-medium transition-colors",
                tab === t ? "bg-brand text-black" : "text-gray-400 hover:text-white")}>
              {l}
            </button>
          ))}
        </div>
      )}

      {/* Submitted banner */}
      {mySubmission && !isTeacher && (
        <div className="shrink-0 mx-5 mt-4 bg-green-400/10 border border-green-400/30 rounded-xl px-4 py-3 flex items-center gap-3">
          <Check size={16} className="text-green-400 shrink-0" />
          <div>
            <p className="text-green-400 text-sm font-semibold">Topshirildi!</p>
            <p className="text-gray-500 text-xs">Natija: {mySubmission.score}/{questions.length} ({scorePct}%)</p>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-5">
        {/* Questions */}
        {tab === "solve" && (
          <div className="max-w-2xl mx-auto space-y-4">
            {questions.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen size={28} className="text-gray-600 mx-auto mb-3" />
                <p className="text-gray-500 text-sm">
                  {isTeacher ? "Savollar qo'shing" : "Savollar hali qo'shilmagan"}
                </p>
              </div>
            ) : questions.map((q, i) => {
              const answered = answers[q.id];
              const submitted = !!mySubmission;
              const correct = submitted && mySubmission.answers[q.id] === q.answer;
              const wrong = submitted && mySubmission.answers[q.id] && mySubmission.answers[q.id] !== q.answer;

              return (
                <div key={q.id} className={cn(
                  "bg-dark-card border rounded-2xl p-5",
                  submitted && correct ? "border-green-400/30" : submitted && wrong ? "border-red-400/30" : "border-dark-border"
                )}>
                  <div className="flex items-start gap-3 mb-4">
                    <span className="w-6 h-6 rounded-full bg-dark-hover text-gray-400 text-xs font-bold flex items-center justify-center shrink-0">
                      {i + 1}
                    </span>
                    <div className="flex-1 text-white text-sm leading-relaxed">
                      <MathRenderer formula={q.text} displayMode />
                    </div>
                    {isTeacher && (
                      <button onClick={() => removeQuestion(q.id)} className="text-red-500/50 hover:text-red-400 shrink-0">
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                  {/* Answer input */}
                  {!submitted ? (
                    <input
                      value={answers[q.id] ?? ""}
                      onChange={e => setAnswers(prev => ({ ...prev, [q.id]: e.target.value }))}
                      placeholder="Javobingizni kiriting..."
                      className="w-full bg-dark-bg border border-dark-border rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand/50"
                    />
                  ) : (
                    <div className="space-y-2">
                      {mySubmission.answers[q.id] && (
                        <div className={cn("px-3 py-2 rounded-xl text-sm", correct ? "bg-green-400/10 text-green-400" : "bg-red-400/10 text-red-400")}>
                          Sizning javobingiz: {mySubmission.answers[q.id]}
                        </div>
                      )}
                      {wrong && (
                        <div className="px-3 py-2 rounded-xl text-sm bg-dark-hover text-gray-300">
                          To&apos;g&apos;ri javob: <MathRenderer formula={q.answer} />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Results (teacher) */}
        {tab === "results" && isTeacher && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-dark-card border border-dark-border rounded-2xl p-5 mb-5">
              <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                <BarChart2 size={16} className="text-brand" /> Umumiy natija
              </h3>
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center">
                  <div className="text-2xl font-black text-white">{submissions.length}</div>
                  <div className="text-xs text-gray-500">Topshirdi</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-black text-brand">
                    {submissions.length > 0
                      ? Math.round(submissions.reduce((s, x) => s + x.score, 0) / submissions.length)
                      : 0}
                  </div>
                  <div className="text-xs text-gray-500">O&apos;rta ball</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-black text-white">{questions.length}</div>
                  <div className="text-xs text-gray-500">Savol</div>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              {submissions.map((s, i) => (
                <div key={s.user_id} className="bg-dark-card border border-dark-border rounded-xl px-4 py-3 flex items-center gap-3">
                  <span className="text-gray-500 text-sm w-5">{i + 1}</span>
                  <div className="flex-1">
                    <p className="text-white text-sm">{s.user_id.slice(0, 12)}...</p>
                    <p className="text-gray-600 text-xs">{new Date(s.submitted_at).toLocaleString("uz-UZ")}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-bold">{s.score}/{questions.length}</div>
                    <div className="text-xs text-gray-500">
                      {questions.length > 0 ? Math.round(s.score / questions.length * 100) : 0}%
                    </div>
                  </div>
                </div>
              ))}
              {submissions.length === 0 && (
                <div className="text-center py-8 text-gray-600 text-sm">Hali hech kim topshirmadi</div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Add question modal */}
      {showAddQ && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.7)" }}>
          <div className="bg-dark-card border border-dark-border rounded-2xl w-full max-w-lg max-h-[80vh] flex flex-col">
            <div className="px-5 py-4 border-b border-dark-border flex items-center justify-between shrink-0">
              <h3 className="text-white font-bold">Savol qo&apos;shish</h3>
              <button onClick={() => setShowAddQ(false)} className="text-gray-500 hover:text-white">✕</button>
            </div>
            <div className="px-5 py-3 shrink-0">
              <input value={qSearch} onChange={e => setQSearch(e.target.value)}
                placeholder="Savol qidirish..."
                className="w-full bg-dark-bg border border-dark-border rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-brand/50" />
            </div>
            <div className="flex-1 overflow-y-auto px-5 pb-5 space-y-2">
              {allQuestions
                .filter(q => !assignment.question_ids?.includes(q.id))
                .filter(q => !qSearch || q.text.toLowerCase().includes(qSearch.toLowerCase()))
                .slice(0, 30)
                .map(q => (
                  <button key={q.id} onClick={() => addQuestion(q.id)}
                    className="w-full text-left bg-dark-hover border border-dark-border rounded-xl px-4 py-3 hover:border-brand/30 transition-colors">
                    <p className="text-xs text-brand mb-1">{q.topic}</p>
                    <p className="text-gray-300 text-sm line-clamp-2">{q.text.slice(0, 80)}</p>
                  </button>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
