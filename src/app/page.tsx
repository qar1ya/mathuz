"use client";
import Link from "next/link";
import { useAuth } from "@/lib/auth";
import {
  ArrowRight, BookOpen, Bot, BarChart2, Check, ChevronRight,
  Zap, Target, Award, Users, Star, Sparkles, Menu, X
} from "lucide-react";
import { useState } from "react";

/* ── decorative math symbols ─────────────────────────────────────────── */
const SYMBOLS = [
  { ch: "π", top: "8%",  left: "7%",  size: 48, op: 0.06, rot: -15 },
  { ch: "∫", top: "20%", left: "90%", size: 56, op: 0.07, rot: 10  },
  { ch: "√", top: "55%", left: "5%",  size: 40, op: 0.05, rot: 5   },
  { ch: "Σ", top: "70%", left: "92%", size: 44, op: 0.06, rot: -8  },
  { ch: "∞", top: "88%", left: "15%", size: 38, op: 0.05, rot: 0   },
  { ch: "∠", top: "40%", left: "88%", size: 36, op: 0.05, rot: 12  },
  { ch: "α", top: "35%", left: "3%",  size: 34, op: 0.05, rot: -6  },
  { ch: "β", top: "75%", left: "80%", size: 36, op: 0.05, rot: 8   },
  { ch: "△", top: "15%", left: "50%", size: 30, op: 0.04, rot: 0   },
  { ch: "²", top: "60%", left: "60%", size: 28, op: 0.04, rot: 0   },
];

function FloatingSymbols() {
  return (
    <div className="pointer-events-none select-none fixed inset-0 overflow-hidden z-0" aria-hidden>
      {SYMBOLS.map((s, i) => (
        <span key={i} className="absolute font-bold text-[#00d4aa]"
          style={{
            top: s.top, left: s.left,
            fontSize: s.size,
            opacity: s.op,
            transform: `rotate(${s.rot}deg)`,
          }}>
          {s.ch}
        </span>
      ))}
    </div>
  );
}

/* ── Navbar ───────────────────────────────────────────────────────────── */
function Navbar() {
  const { user, loading } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 backdrop-blur-md"
      style={{ background: "rgba(13,13,15,0.85)" }}>
      <div className="max-w-6xl mx-auto px-5 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#00d4aa] flex items-center justify-center text-black font-bold text-sm">M</div>
          <span className="text-white font-bold text-base tracking-tight">MathUz</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-400">
          <a href="#imkoniyatlar" className="hover:text-white transition-colors">Imkoniyatlar</a>
          <a href="#qanday" className="hover:text-white transition-colors">Qanday ishlaydi</a>
          <a href="#narxlar" className="hover:text-white transition-colors">Narxlar</a>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {!loading && (
            user ? (
              <Link href="/dashboard"
                className="flex items-center gap-1.5 bg-[#00d4aa] hover:bg-[#00bfa0] text-black text-sm font-semibold px-4 py-1.5 rounded-lg transition-colors">
                Dashboard <ArrowRight size={14} />
              </Link>
            ) : (
              <>
                <Link href="/login" className="text-gray-400 hover:text-white text-sm transition-colors">Kirish</Link>
                <Link href="/register"
                  className="bg-[#00d4aa] hover:bg-[#00bfa0] text-black text-sm font-semibold px-4 py-1.5 rounded-lg transition-colors">
                  Boshlash
                </Link>
              </>
            )
          )}
        </div>

        {/* Mobile burger */}
        <button className="md:hidden text-gray-400" onClick={() => setOpen(!open)}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-white/5 px-5 py-4 space-y-3"
          style={{ background: "rgba(13,13,15,0.97)" }}>
          <a href="#imkoniyatlar" className="block text-gray-400 text-sm py-1" onClick={() => setOpen(false)}>Imkoniyatlar</a>
          <a href="#qanday" className="block text-gray-400 text-sm py-1" onClick={() => setOpen(false)}>Qanday ishlaydi</a>
          <a href="#narxlar" className="block text-gray-400 text-sm py-1" onClick={() => setOpen(false)}>Narxlar</a>
          <div className="flex gap-3 pt-2">
            <Link href="/login" className="flex-1 text-center border border-white/10 text-gray-300 text-sm py-2 rounded-lg">Kirish</Link>
            <Link href="/register" className="flex-1 text-center bg-[#00d4aa] text-black text-sm font-semibold py-2 rounded-lg">Boshlash</Link>
          </div>
        </div>
      )}
    </header>
  );
}

/* ── Hero ─────────────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="relative pt-24 pb-20 px-5 text-center">
      {/* glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #00d4aa 0%, transparent 70%)" }} />

      <div className="relative max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-[#00d4aa]/10 border border-[#00d4aa]/20 text-[#00d4aa] text-xs font-medium px-3 py-1.5 rounded-full mb-6">
          <Sparkles size={12} />
          O&apos;zbekistoning matematik platformasi
        </div>

        <h1 className="text-5xl md:text-6xl font-black text-white leading-tight mb-5 tracking-tight">
          DTM uchun{" "}
          <span style={{
            background: "linear-gradient(135deg, #00d4aa, #00a882)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            matematikani
          </span>
          <br />o&apos;zlashtiring
        </h1>

        <p className="text-gray-400 text-lg md:text-xl mb-8 max-w-xl mx-auto leading-relaxed">
          AI yordamchi, 1000+ masala va shaxsiy progress tahlili bilan
          DTM, Milliy Sertifikat va olimpiadalarga tayyorlaning.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/register"
            className="inline-flex items-center justify-center gap-2 bg-[#00d4aa] hover:bg-[#00bfa0] text-black font-bold px-7 py-3.5 rounded-xl text-base transition-colors">
            Bepul boshlang <ArrowRight size={16} />
          </Link>
          <a href="#imkoniyatlar"
            className="inline-flex items-center justify-center gap-2 border border-white/10 hover:border-white/20 text-gray-300 font-medium px-7 py-3.5 rounded-xl text-base transition-colors">
            Imkoniyatlarni ko&apos;rish
          </a>
        </div>

        <p className="text-gray-600 text-xs mt-4">Karta talab etilmaydi · Darhol boshlash mumkin</p>
      </div>

      {/* Stats cards */}
      <div className="relative max-w-2xl mx-auto mt-16 grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { n: "1000+", label: "Masala" },
          { n: "AI", label: "Yordamchi" },
          { n: "3", label: "Imtihon turi" },
          { n: "95%+", label: "Aniqlik" },
        ].map(({ n, label }) => (
          <div key={label} className="bg-white/3 border border-white/6 rounded-xl py-4 px-3 text-center backdrop-blur-sm">
            <div className="text-2xl font-black text-white mb-0.5">{n}</div>
            <div className="text-gray-500 text-xs">{label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── Features ─────────────────────────────────────────────────────────── */
function Features() {
  const items = [
    {
      icon: BookOpen,
      color: "#3b82f6",
      title: "Masalalar Banki",
      desc: "DTM va Milliy Sertifikat uchun maxsus tuzilgan 1000+ masala. Geometriya, algebra, trigonometriya va boshqa mavzular bo'yicha.",
      badge: "1000+ masala",
    },
    {
      icon: Bot,
      color: "#00d4aa",
      title: "AI Yordamchi",
      desc: "Claude AI asosidagi o'qituvchi har qanday matematik savolingizga o'zbek tilida bosqichma-bosqich tushuntiradi.",
      badge: "Claude AI",
    },
    {
      icon: BarChart2,
      color: "#8b5cf6",
      title: "Progress Tahlil",
      desc: "Mavzular bo'yicha zaif tomonlarni aniqlang, streak saqlab boring va imtihonga qancha tayyorligingizni kuzating.",
      badge: "Real-time",
    },
    {
      icon: Target,
      color: "#f97316",
      title: "DTM Uslubi",
      desc: "Haqiqiy DTM imtihon formatidagi savollar: vaqt hisoblagich, variantlar va aniq javoblar bilan.",
      badge: "DTM formati",
    },
    {
      icon: Award,
      color: "#eab308",
      title: "Gamifikatsiya",
      desc: "Streak, tanga va level tizimi orqali har kuni o'qishga motivation oling. O'rganish — o'yinga aylanadi.",
      badge: "XP & Streak",
    },
    {
      icon: Zap,
      color: "#ec4899",
      title: "Tezkor Yechim",
      desc: "Istalgan masalani tez yechib, AI bilan tekshiring. Qisqa bo'sh vaqtingizda ham samarali mashq qiling.",
      badge: "Flash cards",
    },
  ];

  return (
    <section id="imkoniyatlar" className="py-20 px-5 max-w-6xl mx-auto">
      <div className="text-center mb-14">
        <div className="text-[#00d4aa] text-sm font-semibold uppercase tracking-widest mb-3">Imkoniyatlar</div>
        <h2 className="text-4xl font-black text-white mb-4">Hamma narsa bir joyda</h2>
        <p className="text-gray-400 max-w-md mx-auto">
          Tayyorgarlik uchun kerak bo'lgan barcha vosita: savollar, AI tutor va progress tahlili.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map(({ icon: Icon, color, title, desc, badge }) => (
          <div key={title}
            className="group bg-white/2 border border-white/6 rounded-2xl p-6 hover:border-white/12 transition-all duration-300 hover:-translate-y-0.5">
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: `${color}20` }}>
                <Icon size={18} style={{ color }} />
              </div>
              <span className="text-xs font-medium px-2 py-0.5 rounded-full border"
                style={{ color, borderColor: `${color}30`, background: `${color}10` }}>
                {badge}
              </span>
            </div>
            <h3 className="text-white font-bold mb-2">{title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── How it works ─────────────────────────────────────────────────────── */
function HowItWorks() {
  const steps = [
    {
      n: "01",
      title: "Ro'yxatdan o'ting",
      desc: "30 soniyada hisob yarating. Imtihon turini tanlang (DTM, Milliy Sertifikat yoki Maktab).",
    },
    {
      n: "02",
      title: "Mavzu tanlang",
      desc: "Geometriya, algebra, trigonometriya va boshqa mavzular bo'yicha masalalar ishlang.",
    },
    {
      n: "03",
      title: "Progressni kuzating",
      desc: "AI tahlili yordamida zaif joylarni toping va imtihonga to'liq tayyor bo'ling.",
    },
  ];

  return (
    <section id="qanday" className="py-20 px-5">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <div className="text-[#00d4aa] text-sm font-semibold uppercase tracking-widest mb-3">Qanday ishlaydi</div>
          <h2 className="text-4xl font-black text-white mb-4">3 qadamda boshlang</h2>
          <p className="text-gray-400">Ro'yxatdan o'tishdan birinchi masala yechishgacha — 5 daqiqa.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <div key={s.n} className="relative text-center">
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[calc(50%+48px)] right-0 h-px"
                  style={{ background: "linear-gradient(to right, #00d4aa30, transparent)" }} />
              )}
              <div className="w-16 h-16 rounded-2xl border border-[#00d4aa]/20 bg-[#00d4aa]/8 flex items-center justify-center mx-auto mb-4">
                <span className="text-[#00d4aa] font-black text-lg">{s.n}</span>
              </div>
              <h3 className="text-white font-bold text-lg mb-2">{s.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Pricing ──────────────────────────────────────────────────────────── */
function Pricing() {
  const plans = [
    {
      name: "Bepul",
      price: "0",
      period: "/ oy",
      desc: "Boshlash uchun",
      features: [
        "Kuniga 20 ta masala",
        "Asosiy mavzular",
        "Progress tahlili",
        "AI bilan 5 ta suhbat",
      ],
      cta: "Bepul boshlang",
      href: "/register",
      highlighted: false,
    },
    {
      name: "Premium",
      price: "49 000",
      period: " so'm / oy",
      desc: "To'liq imkoniyatlar",
      features: [
        "Cheksiz masalalar",
        "Barcha mavzular",
        "Batafsil tahlillar",
        "Cheksiz AI yordamchi",
        "DTM simulyatsiyasi",
        "Ekskluziv darslar",
      ],
      cta: "Premium olish",
      href: "/premium",
      highlighted: true,
    },
  ];

  return (
    <section id="narxlar" className="py-20 px-5 max-w-4xl mx-auto">
      <div className="text-center mb-14">
        <div className="text-[#00d4aa] text-sm font-semibold uppercase tracking-widest mb-3">Narxlar</div>
        <h2 className="text-4xl font-black text-white mb-4">Qulay narxlar</h2>
        <p className="text-gray-400">Boshlang'ich rejadan professional darajagacha.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-5 max-w-2xl mx-auto">
        {plans.map((p) => (
          <div key={p.name}
            className={`rounded-2xl p-7 border relative overflow-hidden ${
              p.highlighted
                ? "border-[#00d4aa]/40 bg-[#00d4aa]/5"
                : "border-white/8 bg-white/2"
            }`}>
            {p.highlighted && (
              <>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-24 blur-3xl rounded-full opacity-15 pointer-events-none"
                  style={{ background: "#00d4aa" }} />
                <div className="absolute top-4 right-4 bg-[#00d4aa] text-black text-[10px] font-bold px-2 py-0.5 rounded-full">
                  TAVSIYA ETILADI
                </div>
              </>
            )}

            <div className="mb-5">
              <div className="text-gray-400 text-sm font-medium mb-1">{p.name}</div>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-white">{p.price}</span>
                <span className="text-gray-500 text-sm">{p.period}</span>
              </div>
              <p className="text-gray-500 text-xs mt-1">{p.desc}</p>
            </div>

            <ul className="space-y-2.5 mb-7">
              {p.features.map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-sm text-gray-300">
                  <Check size={14} className="text-[#00d4aa] shrink-0" />
                  {f}
                </li>
              ))}
            </ul>

            <Link href={p.href}
              className={`flex items-center justify-center gap-1.5 w-full py-3 rounded-xl font-semibold text-sm transition-colors ${
                p.highlighted
                  ? "bg-[#00d4aa] hover:bg-[#00bfa0] text-black"
                  : "border border-white/10 hover:border-white/20 text-gray-300"
              }`}>
              {p.cta} <ChevronRight size={14} />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── Social proof ─────────────────────────────────────────────────────── */
function SocialProof() {
  const reviews = [
    { name: "Dilnoza T.", exam: "DTM 2025", text: "MathUz bilan geometriya bo'yicha ballarim keskin oshdi. AI o'qituvchi har bir qadamni tushuntiradi.", stars: 5 },
    { name: "Jasur M.", exam: "Milliy Sertifikat", text: "Har kuni 30 daqiqa mashq qilib, 3 oyda ballarimni 2 baravar oshirdim. Streak tizimi juda motivatsiya beradi!", stars: 5 },
    { name: "Malika R.", exam: "DTM 2025", text: "Qiyin masalalarni AI yordamida bosqichma-bosqich tushunib oldim. Boshqa platformalarda bunday yo'q.", stars: 5 },
  ];

  return (
    <section className="py-20 px-5 max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-1.5 text-yellow-400 text-sm font-medium mb-3">
          <Star size={14} fill="currentColor" />
          <Star size={14} fill="currentColor" />
          <Star size={14} fill="currentColor" />
          <Star size={14} fill="currentColor" />
          <Star size={14} fill="currentColor" />
          <span className="text-gray-400 ml-1">4.9/5 · 200+ foydalanuvchi</span>
        </div>
        <h2 className="text-4xl font-black text-white">Foydalanuvchilar nima deydi</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        {reviews.map((r) => (
          <div key={r.name} className="bg-white/2 border border-white/6 rounded-2xl p-6">
            <div className="flex gap-0.5 mb-4">
              {Array(r.stars).fill(0).map((_, i) => (
                <Star key={i} size={13} className="text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-5">&ldquo;{r.text}&rdquo;</p>
            <div>
              <div className="text-white text-sm font-semibold">{r.name}</div>
              <div className="text-gray-600 text-xs mt-0.5">{r.exam}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── CTA ──────────────────────────────────────────────────────────────── */
function CTA() {
  return (
    <section className="py-20 px-5">
      <div className="max-w-2xl mx-auto text-center relative">
        <div className="absolute inset-0 rounded-3xl opacity-10 blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle, #00d4aa, transparent)" }} />
        <div className="relative bg-white/3 border border-[#00d4aa]/20 rounded-3xl px-8 py-14">
          <div className="w-14 h-14 rounded-2xl bg-[#00d4aa]/15 border border-[#00d4aa]/30 flex items-center justify-center mx-auto mb-5">
            <Users size={24} className="text-[#00d4aa]" />
          </div>
          <h2 className="text-4xl font-black text-white mb-4">Bugundan boshlang</h2>
          <p className="text-gray-400 mb-8 max-w-sm mx-auto">
            Minglab o&apos;quvchilar bilan qo&apos;shiling va DTM uchun eng yaxshi platformadan foydalaning.
          </p>
          <Link href="/register"
            className="inline-flex items-center gap-2 bg-[#00d4aa] hover:bg-[#00bfa0] text-black font-bold px-8 py-4 rounded-xl text-base transition-colors">
            Bepul ro&apos;yxatdan o&apos;ting <ArrowRight size={16} />
          </Link>
          <p className="text-gray-700 text-xs mt-4">Karta talab etilmaydi</p>
        </div>
      </div>
    </section>
  );
}

/* ── Footer ───────────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="border-t border-white/5 py-10 px-5">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-[#00d4aa] flex items-center justify-center text-black font-bold text-xs">M</div>
          <span className="text-white font-bold text-sm">MathUz</span>
          <span className="text-gray-700 text-xs ml-2">© 2026. Barcha huquqlar himoyalangan.</span>
        </div>
        <div className="flex items-center gap-5 text-xs text-gray-600">
          <Link href="/login" className="hover:text-gray-400 transition-colors">Kirish</Link>
          <Link href="/register" className="hover:text-gray-400 transition-colors">Ro&apos;yxat</Link>
          <Link href="/premium" className="hover:text-gray-400 transition-colors">Premium</Link>
        </div>
      </div>
    </footer>
  );
}

/* ── Page ─────────────────────────────────────────────────────────────── */
export default function LandingPage() {
  return (
    <div className="min-h-screen" style={{ background: "#0d0d0f" }}>
      <FloatingSymbols />
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <Features />
        <HowItWorks />
        <Pricing />
        <SocialProof />
        <CTA />
        <Footer />
      </div>
    </div>
  );
}
