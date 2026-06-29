"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { Eye, EyeOff, Loader2, Check } from "lucide-react";
import type { ExamType } from "@/lib/types";

const EXAM_TYPES: { value: ExamType; label: string }[] = [
  { value: "DTM", label: "DTM" },
  { value: "Milliy Sertifikat", label: "Milliy Sertifikat" },
  { value: "Maktab", label: "Maktab" },
];

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [examType, setExamType] = useState<ExamType>("DTM");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !email || !password) return;
    if (password.length < 6) { setError("Parol kamida 6 ta belgidan iborat bo'lishi kerak."); return; }
    setLoading(true); setError("");
    const { error: err } = await supabase.auth.signUp({
      email, password,
      options: { data: { name, exam_type: examType, exam_date: "2026-08-22", streak: 0, coins: 0 } },
    });
    if (err) {
      setError(err.message.includes("already") ? "Bu email allaqachon ro'yxatdan o'tgan." : err.message);
      setLoading(false);
    } else {
      setSuccess(true);
      setTimeout(() => router.push("/dashboard"), 1500);
    }
  }

  const inp = "w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 bg-white placeholder-gray-400 focus:outline-none focus:border-brand/60 focus:ring-2 focus:ring-brand/10 transition-all";

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#f5f5f7" }}>
        <div className="text-center">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "#f5f3ff" }}>
            <Check size={28} style={{ color: "#7c3aed" }} />
          </div>
          <h2 className="font-bold text-xl mb-2" style={{ color: "#0f0f0f" }}>Muvaffaqiyatli ro&apos;yxatdan o&apos;tdingiz!</h2>
          <p style={{ color: "#9ca3af" }} className="text-sm">Dashboard ga o&apos;tmoqda...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex" style={{ background: "#f5f5f7" }}>
      {/* Left */}
      <div className="hidden lg:flex flex-1 items-center justify-center p-12 relative" style={{ background: "#7c3aed" }}>
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-10" style={{ background: "#fff", transform: "translate(40%,-40%)" }} />
        <div className="relative text-center z-10">
          <img src="/cat.png" alt="MathUz mascot" className="w-44 h-44 mx-auto object-contain mb-6"
            style={{ filter: "drop-shadow(0 16px 32px rgba(0,0,0,0.3))" }} />
          <h2 className="text-white font-black text-3xl mb-2">MathUz</h2>
          <p className="text-purple-200 text-sm">Math · Practice · Achieve</p>
          <div className="mt-8 space-y-3 text-left">
            {["1000+ DTM va MS savollari", "AI o'qituvchi — o'zbek tilida", "Musobaqa va reyting tizimi"].map(f => (
              <div key={f} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(255,255,255,.2)" }}>
                  <Check size={11} className="text-white" />
                </div>
                <span className="text-purple-100 text-sm">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <div className="flex items-center gap-2.5 mb-8 lg:hidden justify-center">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-lg" style={{ background: "#7c3aed" }}>M</div>
            <span className="font-black text-2xl" style={{ color: "#0f0f0f" }}>MathUz</span>
          </div>

          <h1 className="font-black text-2xl mb-1" style={{ color: "#0f0f0f" }}>Hisob yarating</h1>
          <p className="text-sm mb-7" style={{ color: "#9ca3af" }}>Matematikani o&apos;rganishni boshlang.</p>

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="text-xs font-semibold mb-1.5 block" style={{ color: "#6b7280" }}>Ism</label>
              <input value={name} onChange={e => setName(e.target.value)} placeholder="Ismingiz" required className={inp} />
            </div>
            <div>
              <label className="text-xs font-semibold mb-1.5 block" style={{ color: "#6b7280" }}>Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="email@example.com" required className={inp} />
            </div>
            <div>
              <label className="text-xs font-semibold mb-1.5 block" style={{ color: "#6b7280" }}>Parol</label>
              <div className="relative">
                <input type={show ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="Kamida 6 ta belgi" required className={`${inp} pr-11`} />
                <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: "#9ca3af" }}>
                  {show ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold mb-2 block" style={{ color: "#6b7280" }}>Imtihon turi</label>
              <div className="grid grid-cols-3 gap-2">
                {EXAM_TYPES.map(et => (
                  <button key={et.value} type="button" onClick={() => setExamType(et.value)}
                    className="py-2.5 rounded-xl border text-xs font-semibold transition-all"
                    style={{
                      borderColor: examType === et.value ? "#7c3aed" : "#e5e5e7",
                      background: examType === et.value ? "#f5f3ff" : "#fff",
                      color: examType === et.value ? "#7c3aed" : "#6b7280"
                    }}>
                    {et.label}
                  </button>
                ))}
              </div>
            </div>
            {error && <p className="text-red-600 text-xs bg-red-50 border border-red-100 rounded-xl px-3 py-2">{error}</p>}
            <button type="submit" disabled={loading}
              className="w-full text-white font-bold py-3 rounded-xl text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-60"
              style={{ background: "#7c3aed" }}>
              {loading && <Loader2 size={15} className="animate-spin" />}
              Ro&apos;yxatdan o&apos;tish
            </button>
          </form>

          <p className="text-center text-sm mt-6" style={{ color: "#9ca3af" }}>
            Hisob bormi?{" "}
            <Link href="/login" className="font-semibold hover:underline" style={{ color: "#7c3aed" }}>Kirish</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
