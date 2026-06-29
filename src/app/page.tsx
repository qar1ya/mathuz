"use client";
import Link from "next/link";
import { useAuth } from "@/lib/auth";
import { ArrowRight, BookOpen, Bot, BarChart2, Target, Award, Zap, Check, Star, Users } from "lucide-react";
import { useState } from "react";

function Navbar() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-5 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white font-bold text-sm" style={{ background: "#7c3aed" }}>M</div>
          <span className="font-black text-base" style={{ color: "#0f0f0f" }}>MathUz</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm" style={{ color: "#6b7280" }}>
          <a href="#features" className="hover:text-gray-900 transition-colors">Imkoniyatlar</a>
          <a href="#how" className="hover:text-gray-900 transition-colors">Qanday ishlaydi</a>
          <a href="#pricing" className="hover:text-gray-900 transition-colors">Narxlar</a>
        </nav>
        <div className="hidden md:flex items-center gap-3">
          {!user ? (
            <>
              <Link href="/login" className="text-sm font-medium transition-colors" style={{ color: "#6b7280" }}>Kirish</Link>
              <Link href="/register" className="text-white text-sm font-bold px-4 py-1.5 rounded-lg transition-colors" style={{ background: "#7c3aed" }}>
                Boshlash
              </Link>
            </>
          ) : (
            <Link href="/dashboard" className="text-white text-sm font-bold px-4 py-1.5 rounded-lg flex items-center gap-1.5" style={{ background: "#7c3aed" }}>
              Dashboard <ArrowRight size={13} />
            </Link>
          )}
        </div>
        <button className="md:hidden" onClick={() => setOpen(!open)} style={{ color: "#6b7280" }}>☰</button>
      </div>
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-5 py-4 space-y-3">
          <Link href="/login" className="block text-sm py-1" style={{ color: "#6b7280" }}>Kirish</Link>
          <Link href="/register" className="block text-sm font-bold py-2 px-4 rounded-lg text-white text-center" style={{ background: "#7c3aed" }}>Boshlash</Link>
        </div>
      )}
    </header>
  );
}

export default function LandingPage() {
  const features = [
    { icon: BookOpen, color: "#7c3aed", bg: "#f5f3ff", title: "Masalalar Banki", desc: "1000+ DTM va Milliy Sertifikat masalalari. Algebra, geometriya, Skanaviy to'plami." },
    { icon: Bot,      color: "#f97316", bg: "#fff7ed", title: "AI Yordamchi",    desc: "Claude AI asosidagi o'qituvchi — o'zbek tilida bosqichma-bosqich tushuntiradi." },
    { icon: BarChart2,color: "#3b82f6", bg: "#eff6ff", title: "Tahlil",          desc: "Mavzu bo'yicha zaif tomonlar, streak, aniqlik — real-time statistika." },
    { icon: Target,   color: "#ec4899", bg: "#fdf2f8", title: "DTM uslubi",      desc: "Timer, 4 variant, natija ekrani — haqiqiy imtihon his-tuyg'usi." },
    { icon: Award,    color: "#eab308", bg: "#fefce8", title: "Gamifikatsiya",   desc: "Streak, tanga, reyting — o'rganish o'yinga aylanadi." },
    { icon: Users,    color: "#8b5cf6", bg: "#f5f3ff", title: "Classroom",       desc: "O'qituvchi sinf yaratadi, vazifa beradi, progressni kuzatadi." },
  ];

  const steps = [
    { n: "01", title: "Ro'yxatdan o'ting", desc: "30 soniyada hisob yarating. Imtihon turini tanlang." },
    { n: "02", title: "Mavzu tanlang", desc: "Algebra, geometriya yoki Skanaviy bo'limidan boshlang." },
    { n: "03", title: "Progressni kuzating", desc: "AI tahlili yordamida zaif joylarni toping." },
  ];

  const plans = [
    {
      name: "Bepul", price: "0", period: "/ oy", desc: "Boshlash uchun",
      features: ["50 ta masala / oy", "Testlar (kuniga 2 ta)", "AI (kuniga 5 ta savol)", "Asosiy tahlil"],
      cta: "Bepul boshlang", href: "/register", highlighted: false,
    },
    {
      name: "Premium", price: "49 000", period: " so'm / oy", desc: "To'liq imkoniyatlar",
      features: ["Cheksiz masalalar", "Cheksiz testlar", "Cheksiz AI yordamchi", "Batafsil tahlillar", "Classroom", "Skanaviy to'plami"],
      cta: "Premium olish", href: "/premium", highlighted: true,
    },
  ];

  const reviews = [
    { name: "Dilnoza T.", exam: "DTM 2025", text: "AI o'qituvchi har bir qadamni tushuntiradi. Geometriya ballarim keskin oshdi.", stars: 5 },
    { name: "Jasur M.", exam: "Milliy Sertifikat", text: "Streak tizimi juda motivatsiya beradi. 3 oyda 2 barobar oshirdim.", stars: 5 },
    { name: "Malika R.", exam: "DTM 2025", text: "Skanaviy masalalari bilan imtihonga juda yaxshi tayyorlandim.", stars: 5 },
  ];

  return (
    <div style={{ background: "#f5f5f7", color: "#0f0f0f" }}>
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden py-24 px-5">
        <div className="absolute inset-0 opacity-30" style={{ background: "radial-gradient(circle at 60% 40%, rgba(124,58,237,.08) 0%, transparent 70%)" }} />
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 text-xs font-semibold" style={{ background: "#f5f3ff", color: "#7c3aed", border: "1px solid rgba(124,58,237,.2)" }}>
              ✨ O&apos;zbekistoning matematik platformasi
            </div>
            <h1 className="font-black text-5xl md:text-6xl leading-tight mb-5" style={{ color: "#0f0f0f" }}>
              DTM uchun{" "}
              <span style={{ color: "#7c3aed" }}>matematikani</span>
              <br />o&apos;zlashtiring
            </h1>
            <p className="text-lg mb-8" style={{ color: "#6b7280" }}>
              AI yordamchi, 1000+ masala va shaxsiy progress tahlili bilan DTM, Milliy Sertifikat va olimpiadalarga tayyorlaning.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/register" className="inline-flex items-center justify-center gap-2 text-white font-bold px-7 py-3.5 rounded-xl text-base transition-colors" style={{ background: "#7c3aed" }}>
                Bepul boshlang <ArrowRight size={16} />
              </Link>
              <a href="#features" className="inline-flex items-center justify-center gap-2 font-medium px-7 py-3.5 rounded-xl text-base transition-colors border border-gray-200 hover:border-gray-300" style={{ color: "#374151" }}>
                Imkoniyatlarni ko&apos;rish
              </a>
            </div>
            <p className="text-xs mt-4" style={{ color: "#9ca3af" }}>Karta talab etilmaydi · Darhol boshlash mumkin</p>
          </div>
          {/* Cat hero */}
          <div className="relative flex justify-center">
            <div className="w-64 h-64 rounded-3xl flex items-center justify-center relative" style={{ background: "#f5f3ff" }}>
              <div className="absolute inset-0 rounded-3xl opacity-50" style={{ background: "radial-gradient(circle, rgba(124,58,237,.12) 0%, transparent 70%)" }} />
              <img src="/cat.png" alt="MathUz mascot"
                className="w-52 h-52 object-contain relative z-10"
                style={{ filter: "drop-shadow(0 16px 32px rgba(124,58,237,.25))" }} />
            </div>
            {/* Floating badges */}
            <div className="absolute top-4 right-0 bg-white rounded-2xl px-4 py-2 shadow-sm border border-gray-100">
              <p className="font-black text-2xl" style={{ color: "#7c3aed" }}>1000+</p>
              <p className="text-xs" style={{ color: "#9ca3af" }}>Masala</p>
            </div>
            <div className="absolute bottom-4 left-0 bg-white rounded-2xl px-4 py-2 shadow-sm border border-gray-100">
              <p className="font-black text-2xl" style={{ color: "#f97316" }}>AI</p>
              <p className="text-xs" style={{ color: "#9ca3af" }}>Yordamchi</p>
            </div>
          </div>
        </div>
        {/* Stats */}
        <div className="max-w-3xl mx-auto mt-16 grid grid-cols-3 gap-4">
          {[{ n: "1000+", l: "Masala" }, { n: "AI", l: "Yordamchi" }, { n: "95%+", l: "Aniqlik" }].map(({ n, l }) => (
            <div key={l} className="bg-white border border-gray-100 rounded-2xl py-4 px-3 text-center">
              <div className="text-2xl font-black" style={{ color: "#0f0f0f" }}>{n}</div>
              <div className="text-xs mt-0.5" style={{ color: "#9ca3af" }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-20 px-5 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#7c3aed" }}>Imkoniyatlar</div>
            <h2 className="text-4xl font-black" style={{ color: "#0f0f0f" }}>Hamma narsa bir joyda</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map(({ icon: Icon, color, bg, title, desc }) => (
              <div key={title} className="rounded-2xl p-6 border border-gray-100 hover:border-gray-200 transition-colors bg-white">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: bg }}>
                  <Icon size={18} style={{ color }} />
                </div>
                <h3 className="font-bold mb-2" style={{ color: "#0f0f0f" }}>{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#6b7280" }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="py-20 px-5" style={{ background: "#f5f5f7" }}>
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#7c3aed" }}>Qanday ishlaydi</div>
          <h2 className="text-4xl font-black mb-12" style={{ color: "#0f0f0f" }}>3 qadamda boshlang</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {steps.map(s => (
              <div key={s.n} className="text-center">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 border" style={{ background: "#f5f3ff", borderColor: "rgba(124,58,237,.2)" }}>
                  <span className="font-black text-lg" style={{ color: "#7c3aed" }}>{s.n}</span>
                </div>
                <h3 className="font-bold mb-2" style={{ color: "#0f0f0f" }}>{s.title}</h3>
                <p className="text-sm" style={{ color: "#6b7280" }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-20 px-5 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#7c3aed" }}>Narxlar</div>
          <h2 className="text-4xl font-black mb-12" style={{ color: "#0f0f0f" }}>Qulay narxlar</h2>
          <div className="grid md:grid-cols-2 gap-5 max-w-2xl mx-auto">
            {plans.map(p => (
              <div key={p.name} className="rounded-2xl p-7 relative overflow-hidden border" style={{ borderColor: p.highlighted ? "#7c3aed" : "#e5e5e7", background: p.highlighted ? "#faf5ff" : "#fff" }}>
                {p.highlighted && (
                  <div className="absolute top-4 right-4 text-white text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: "#7c3aed" }}>
                    TAVSIYA
                  </div>
                )}
                <div className="mb-5">
                  <div className="text-sm font-medium mb-1" style={{ color: "#6b7280" }}>{p.name}</div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black" style={{ color: "#0f0f0f" }}>{p.price}</span>
                    <span className="text-sm" style={{ color: "#9ca3af" }}>{p.period}</span>
                  </div>
                </div>
                <ul className="space-y-2.5 mb-7">
                  {p.features.map(f => (
                    <li key={f} className="flex items-center gap-2.5 text-sm" style={{ color: "#374151" }}>
                      <Check size={14} style={{ color: "#7c3aed", flexShrink: 0 }} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href={p.href} className="flex items-center justify-center gap-1.5 w-full py-3 rounded-xl font-bold text-sm transition-colors"
                  style={{ background: p.highlighted ? "#7c3aed" : "transparent", color: p.highlighted ? "#fff" : "#374151", border: p.highlighted ? "none" : "1px solid #e5e5e7" }}>
                  {p.cta} <ArrowRight size={13} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="py-20 px-5" style={{ background: "#f5f5f7" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex justify-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="#eab308" style={{ color: "#eab308" }} />)}
              <span className="text-sm ml-1" style={{ color: "#6b7280" }}>4.9/5 · 200+ foydalanuvchi</span>
            </div>
            <h2 className="text-4xl font-black" style={{ color: "#0f0f0f" }}>Foydalanuvchilar nima deydi</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {reviews.map(r => (
              <div key={r.name} className="bg-white border border-gray-100 rounded-2xl p-6">
                <div className="flex gap-0.5 mb-4">
                  {[...Array(r.stars)].map((_, i) => <Star key={i} size={12} fill="#eab308" style={{ color: "#eab308" }} />)}
                </div>
                <p className="text-sm leading-relaxed mb-5" style={{ color: "#374151" }}>&ldquo;{r.text}&rdquo;</p>
                <div>
                  <div className="text-sm font-semibold" style={{ color: "#0f0f0f" }}>{r.name}</div>
                  <div className="text-xs mt-0.5" style={{ color: "#9ca3af" }}>{r.exam}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-5 bg-white">
        <div className="max-w-xl mx-auto text-center">
          <div className="relative rounded-3xl px-8 py-14 border overflow-hidden" style={{ borderColor: "rgba(124,58,237,.2)", background: "#faf5ff" }}>
            <img src="/cat.png" alt="cat" className="w-20 h-20 mx-auto object-contain mb-5" style={{ filter: "drop-shadow(0 8px 16px rgba(124,58,237,.2))" }} />
            <h2 className="text-4xl font-black mb-4" style={{ color: "#0f0f0f" }}>Bugundan boshlang</h2>
            <p className="mb-8" style={{ color: "#6b7280" }}>Minglab o&apos;quvchilar bilan qo&apos;shiling.</p>
            <Link href="/register" className="inline-flex items-center gap-2 text-white font-bold px-8 py-4 rounded-xl text-base transition-colors" style={{ background: "#7c3aed" }}>
              Bepul ro&apos;yxatdan o&apos;ting <ArrowRight size={16} />
            </Link>
            <p className="text-xs mt-4" style={{ color: "#9ca3af" }}>Karta talab etilmaydi</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-100 py-8 px-5 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md flex items-center justify-center text-white font-bold text-xs" style={{ background: "#7c3aed" }}>M</div>
            <span className="font-bold text-sm" style={{ color: "#0f0f0f" }}>MathUz</span>
            <span className="text-xs ml-2" style={{ color: "#9ca3af" }}>© 2026. Barcha huquqlar himoyalangan.</span>
          </div>
          <div className="flex items-center gap-5 text-xs" style={{ color: "#9ca3af" }}>
            <Link href="/login" className="hover:text-gray-600 transition-colors">Kirish</Link>
            <Link href="/register" className="hover:text-gray-600 transition-colors">Ro&apos;yxat</Link>
            <Link href="/premium" className="hover:text-gray-600 transition-colors">Premium</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
