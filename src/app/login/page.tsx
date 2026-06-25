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
        setError("Email tasdiqlanmagan. Supabase → Authentication → Providers → Email → 'Confirm email' ni o'chiring.");
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

  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex items-center gap-2.5 mb-8 justify-center">
          <div className="w-9 h-9 rounded-xl bg-brand flex items-center justify-center text-black font-bold text-lg">M</div>
          <span className="text-white font-bold text-2xl tracking-tight">MathUz</span>
        </div>

        <div className="bg-dark-card border border-dark-border rounded-2xl p-6">
          <h1 className="text-white font-bold text-xl mb-1">Kirish</h1>
          <p className="text-gray-500 text-sm mb-6">Hisobingizga kiring va o'rganishni davom eting.</p>

          <form onSubmit={handleLogin} className="space-y-4">
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
                  placeholder="••••••••"
                  required
                  className="w-full bg-dark-bg border border-dark-border rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-brand/50 transition-colors pr-11"
                />
                <button type="button" onClick={() => setShow(!show)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors">
                  {show ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
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
              Kirish
            </button>
          </form>

          <p className="text-center text-gray-500 text-xs mt-5">
            Hisob yo&apos;qmi?{" "}
            <Link href="/register" className="text-brand hover:underline font-medium">
              Ro&apos;yxatdan o&apos;ting
            </Link>
          </p>
        </div>

        <p className="text-center text-gray-700 text-xs mt-6">
          © 2026 MathUz. Barcha huquqlar himoyalangan.
        </p>
      </div>
    </div>
  );
}
