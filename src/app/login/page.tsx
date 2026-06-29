"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { Eye, EyeOff, Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) return;
    setLoading(true);
    setError("");
    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    if (err) {
      if (err.message.includes("Email not confirmed")) {
        setError("Email tasdiqlanmagan. Supabase → Authentication → Email → 'Confirm email' ni o'chiring.");
      } else if (err.message.includes("Invalid login credentials")) {
        setError("Email yoki parol noto'g'ri.");
      } else {
        setError(err.message);
      }
      setLoading(false);
    } else {
      router.push("/dashboard");
    }
  }

  const inp = "w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 bg-white placeholder-gray-400 focus:outline-none focus:border-brand/60 focus:ring-2 focus:ring-brand/10 transition-all";

  return (
    <div className="min-h-screen flex" style={{ background: "#f5f5f7" }}>
      {/* Left side — decorative */}
      <div className="hidden lg:flex flex-1 items-center justify-center p-12 relative" style={{ background: "#7c3aed" }}>
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-10" style={{ background: "#fff", transform: "translate(40%, -40%)" }} />
        <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full opacity-8" style={{ background: "#fff", transform: "translate(-30%, 30%)" }} />
        <div className="relative text-center z-10">
          <img src="/cat.png" alt="MathUz mascot" className="w-48 h-48 mx-auto object-contain mb-6" style={{ filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.3))" }} />
          <h2 className="text-white font-black text-3xl mb-3">MathUz</h2>
          <p className="text-purple-200 text-base">Math · Practice · Achieve</p>
          <p className="text-purple-200/70 text-sm mt-3">Solve today. Understand forever.</p>
        </div>
      </div>

      {/* Right side — form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          {/* Logo mobile */}
          <div className="flex items-center gap-2.5 mb-8 lg:hidden justify-center">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-lg" style={{ background: "#7c3aed" }}>M</div>
            <span className="font-black text-2xl" style={{ color: "#0f0f0f" }}>MathUz</span>
          </div>

          <h1 className="font-black text-2xl mb-1" style={{ color: "#0f0f0f" }}>Xush kelibsiz!</h1>
          <p className="text-sm mb-8" style={{ color: "#9ca3af" }}>Hisobingizga kiring va o&apos;rganishni davom eting.</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-semibold mb-1.5 block" style={{ color: "#6b7280" }}>Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="email@example.com" required className={inp} />
            </div>
            <div>
              <label className="text-xs font-semibold mb-1.5 block" style={{ color: "#6b7280" }}>Parol</label>
              <div className="relative">
                <input type={show ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••" required className={`${inp} pr-11`} />
                <button type="button" onClick={() => setShow(!show)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors" style={{ color: "#9ca3af" }}>
                  {show ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>
            {error && (
              <p className="text-red-600 text-xs bg-red-50 border border-red-100 rounded-xl px-3 py-2">{error}</p>
            )}
            <button type="submit" disabled={loading}
              className="w-full text-white font-bold py-3 rounded-xl text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-60"
              style={{ background: "#7c3aed" }}>
              {loading && <Loader2 size={15} className="animate-spin" />}
              Kirish
            </button>
          </form>

          <p className="text-center text-sm mt-6" style={{ color: "#9ca3af" }}>
            Hisob yo&apos;qmi?{" "}
            <Link href="/register" className="font-semibold hover:underline" style={{ color: "#7c3aed" }}>
              Ro&apos;yxatdan o&apos;ting
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
