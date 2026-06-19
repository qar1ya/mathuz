"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { Eye, EyeOff, Loader2, Check } from "lucide-react";
import type { ExamType } from "@/lib/types";

const EXAM_TYPES: { value: ExamType; label: string; desc: string }[] = [
  { value: "DTM", label: "DTM", desc: "Davlat Test Markazi" },
  { value: "Milliy Sertifikat", label: "Milliy Sertifikat", desc: "Milliy sertifikat imtihoni" },
  { value: "Maktab", label: "Maktab", desc: "Maktab olimpiadasi" },
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
    if (password.length < 6) {
      setError("Parol kamida 6 ta belgidan iborat bo'lishi kerak.");
      return;
    }
    setLoading(true);
    setError("");

    const { error: err } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          exam_type: examType,
          exam_date: "2026-08-22",
          streak: 0,
          coins: 0,
        },
      },
    });

    if (err) {
      setError(err.message.includes("already") ? "Bu email allaqachon ro'yxatdan o'tgan." : "Xatolik yuz berdi. Qaytadan urinib ko'ring.");
      setLoading(false);
    } else {
      setSuccess(true);
      setTimeout(() => router.push("/dashboard"), 1500);
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-brand/15 border border-brand/30 flex items-center justify-center mx-auto mb-4">
            <Check size={28} className="text-brand" />
          </div>
          <h2 className="text-white font-bold text-xl mb-2">Muvaffaqiyatli ro&apos;yxatdan o&apos;tdingiz!</h2>
          <p className="text-gray-500 text-sm">Dashboard ga o&apos;tmoqda...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex items-center gap-2.5 mb-8 justify-center">
          <div className="w-9 h-9 rounded-xl bg-brand flex items-center justify-center text-black font-bold text-lg">M</div>
          <span className="text-white font-bold text-2xl tracking-tight">MathUz</span>
        </div>

        <div className="bg-dark-card border border-dark-border rounded-2xl p-6">
          <h1 className="text-white font-bold text-xl mb-1">Ro&apos;yxatdan o&apos;tish</h1>
          <p className="text-gray-500 text-sm mb-6">Hisob yarating va matematikani o&apos;rganishni boshlang.</p>

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="text-gray-400 text-xs font-medium mb-1.5 block">Ism</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Ismingiz"
                required
                className="w-full bg-dark-bg border border-dark-border rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-brand/50 transition-colors"
              />
            </div>

            <div>
              <label className="text-gray-400 text-xs font-medium mb-1.5 block">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="email@example.com"
                required
                className="w-full bg-dark-bg border border-dark-border rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-brand/50 transition-colors"
              />
            </div>

            <div>
              <label className="text-gray-400 text-xs font-medium mb-1.5 block">Parol</label>
              <div className="relative">
                <input
                  type={show ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Kamida 6 ta belgi"
                  required
                  className="w-full bg-dark-bg border border-dark-border rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-brand/50 transition-colors pr-11"
                />
                <button type="button" onClick={() => setShow(!show)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors">
                  {show ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <div>
              <label className="text-gray-400 text-xs font-medium mb-1.5 block">Imtihon turi</label>
              <div className="grid grid-cols-3 gap-2">
                {EXAM_TYPES.map(et => (
                  <button key={et.value} type="button"
                    onClick={() => setExamType(et.value)}
                    className={`p-2.5 rounded-xl border text-xs font-medium transition-colors text-center ${
                      examType === et.value
                        ? "border-brand/50 bg-brand/10 text-brand"
                        : "border-dark-border text-gray-500 hover:border-gray-600"
                    }`}>
                    {et.label}
                  </button>
                ))}
              </div>
            </div>

            {error && (
              <p className="text-red-400 text-xs bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <button type="submit" disabled={loading}
              className="w-full bg-brand hover:bg-brand/90 text-black font-semibold py-2.5 rounded-xl text-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed">
              {loading && <Loader2 size={15} className="animate-spin" />}
              Ro&apos;yxatdan o&apos;tish
            </button>
          </form>

          <p className="text-center text-gray-500 text-xs mt-5">
            Hisob bormi?{" "}
            <Link href="/login" className="text-brand hover:underline font-medium">
              Kirish
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
