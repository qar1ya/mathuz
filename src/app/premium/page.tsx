"use client";
import { useState } from "react";
import Link from "next/link";
import {
  CheckCircle, Crown, Zap, BookOpen, BarChart2, Bot,
  ArrowLeft, X, Copy, Check, MessageCircle, CreditCard,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth";

// ── Checkout Modal ──────────────────────────────────────────────────────────
const CARD_NUMBER = "8600 0000 0000 0000"; // admin karta raqami
const TELEGRAM   = "https://t.me/mathuz_admin"; // admin telegram

function CheckoutModal({
  plan, onClose,
}: {
  plan: { name: string; price: string; period: string };
  onClose: () => void;
}) {
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);
  const [step, setStep] = useState<"method" | "card" | "confirm">("method");
  const [phone, setPhone] = useState("");
  const [sent, setSent] = useState(false);

  function copyCard() {
    navigator.clipboard.writeText(CARD_NUMBER.replace(/\s/g, ""));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleConfirm() {
    // Telegram ga yo'naltirish
    const msg = encodeURIComponent(
      `MathModul Premium to'lov\n` +
      `Tarif: ${plan.name} (${plan.price} so'm)\n` +
      `Foydalanuvchi: ${user?.name ?? "?"} (${user?.id ?? "?"})\n` +
      `Telefon: ${phone}`
    );
    window.open(`${TELEGRAM}?start=${msg}`, "_blank");
    setSent(true);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.75)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="bg-dark-card border border-dark-border rounded-2xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-dark-border">
          <div className="flex items-center gap-2">
            <Crown size={16} className="text-yellow-400" />
            <span className="text-white font-bold">{plan.name} — {plan.price} so&apos;m{plan.period}</span>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
            <X size={18} />
          </button>
        </div>

        {sent ? (
          /* ── Tasdiqlandi ── */
          <div className="p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-green-400/15 border border-green-400/30
              flex items-center justify-center mx-auto mb-4">
              <Check size={28} className="text-green-400" />
            </div>
            <h3 className="text-white font-bold text-lg mb-2">So&apos;rov yuborildi!</h3>
            <p className="text-gray-400 text-sm mb-6">
              Admin 24 soat ichida hisobingizni aktivlashtiradi.
              Savol bo&apos;lsa Telegram orqali bog&apos;laning.
            </p>
            <a href={TELEGRAM} target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 bg-blue-500/15 border border-blue-500/30
              text-blue-400 text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-blue-500/25 transition-colors">
              <MessageCircle size={15} /> Telegram admin
            </a>
          </div>
        ) : step === "method" ? (
          /* ── To'lov usuli ── */
          <div className="p-5">
            <p className="text-gray-400 text-sm mb-4">To&apos;lov usulini tanlang:</p>
            <div className="space-y-3">
              <button onClick={() => setStep("card")}
                className="w-full flex items-center gap-4 p-4 bg-dark-bg border border-dark-border
                rounded-xl hover:border-brand/40 transition-colors group">
                <div className="w-10 h-10 bg-brand/10 rounded-xl flex items-center justify-center shrink-0">
                  <CreditCard size={18} className="text-brand" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-white text-sm font-medium">Bank kartasi</p>
                  <p className="text-gray-600 text-xs">Karta raqamiga o&apos;tkazma</p>
                </div>
                <ChevronRight size={15} className="text-gray-600 group-hover:text-brand transition-colors" />
              </button>

              <button className="w-full flex items-center gap-4 p-4 bg-dark-bg border border-dark-border
                rounded-xl opacity-50 cursor-not-allowed">
                <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center shrink-0">
                  <span className="text-blue-400 font-black text-sm">P</span>
                </div>
                <div className="flex-1 text-left">
                  <p className="text-white text-sm font-medium">Payme</p>
                  <p className="text-gray-600 text-xs">Tez orada ulanadi</p>
                </div>
                <span className="text-[10px] text-gray-600 border border-gray-700 px-2 py-0.5 rounded">Braqin</span>
              </button>

              <button className="w-full flex items-center gap-4 p-4 bg-dark-bg border border-dark-border
                rounded-xl opacity-50 cursor-not-allowed">
                <div className="w-10 h-10 bg-green-500/10 rounded-xl flex items-center justify-center shrink-0">
                  <span className="text-green-400 font-black text-sm">C</span>
                </div>
                <div className="flex-1 text-left">
                  <p className="text-white text-sm font-medium">Click</p>
                  <p className="text-gray-600 text-xs">Tez orada ulanadi</p>
                </div>
                <span className="text-[10px] text-gray-600 border border-gray-700 px-2 py-0.5 rounded">Braqin</span>
              </button>
            </div>
          </div>
        ) : step === "card" ? (
          /* ── Karta ma'lumoti ── */
          <div className="p-5">
            <button onClick={() => setStep("method")}
              className="flex items-center gap-1.5 text-gray-500 hover:text-white text-xs mb-4 transition-colors">
              <ArrowLeft size={13} /> Orqaga
            </button>

            <div className="bg-dark-bg border border-dark-border rounded-xl p-5 mb-4">
              <p className="text-gray-500 text-xs mb-1">Karta raqami</p>
              <div className="flex items-center justify-between">
                <span className="text-white font-mono text-lg font-bold tracking-wider">{CARD_NUMBER}</span>
                <button onClick={copyCard}
                  className="flex items-center gap-1.5 text-xs text-brand hover:text-brand/80 transition-colors">
                  {copied ? <><Check size={12} /> Nusxalandi</> : <><Copy size={12} /> Nusxa</>}
                </button>
              </div>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-dark-border">
                <span className="text-gray-500 text-xs">To&apos;lov miqdori</span>
                <span className="text-yellow-400 font-bold">{plan.price} so&apos;m</span>
              </div>
              <p className="text-gray-600 text-xs mt-2">
                Izohga telefon raqamingizni yozing
              </p>
            </div>

            <div className="bg-yellow-500/8 border border-yellow-500/20 rounded-xl p-3 mb-5">
              <p className="text-yellow-400 text-xs font-medium mb-1">⚠️ Muhim</p>
              <p className="text-gray-400 text-xs">
                O&apos;tkazmadan keyin quyidagi tugma orqali adminга xabar yuboring.
                Hisobingiz 24 soat ichida aktivlanadi.
              </p>
            </div>

            <div className="mb-4">
              <label className="text-gray-400 text-xs mb-1.5 block">Telefon raqamingiz</label>
              <input
                type="tel" value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+998 90 123 45 67"
                className="w-full bg-dark-bg border border-dark-border rounded-xl px-4 py-2.5 text-sm
                text-white placeholder-gray-600 focus:outline-none focus:border-brand/50"
              />
            </div>

            <button
              onClick={handleConfirm}
              disabled={!phone.trim()}
              className="w-full py-3 bg-brand hover:bg-brand/90 text-black font-bold rounded-xl
              text-sm transition-colors flex items-center justify-center gap-2
              disabled:opacity-40 disabled:cursor-not-allowed">
              <MessageCircle size={15} /> Adminга xabar yuborish
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

// ── Plans ───────────────────────────────────────────────────────────────────
const plans = [
  {
    name: "Bepul",
    price: "0",
    period: "/ oy",
    description: "Asosiy funksiyalar bilan boshlang",
    features: ["50 ta masala / oy", "Video darslar (bepul)", "Testlar (cheklangan)", "Asosiy tahlil"],
    missing: ["Barcha masalalar", "AI Yordamchi", "Imtihon simulyatsiyasi", "Batafsil tahlil"],
    cta: "Hozir foydalanmoqdasiz",
    isCurrent: true,
  },
  {
    name: "Premium",
    price: "49 000",
    period: "/ oy",
    description: "DTM va Milliy Sertifikatga to'liq tayyorlanish",
    features: [
      "Cheksiz masalalar",
      "Barcha video darslar",
      "AI Yordamchi (cheksiz)",
      "Imtihon simulyatsiyasi",
      "Batafsil tahlil va hisobot",
      "Saqlangan masalalar",
      "O'quv rejasi",
      "Ustoz bilan bog'lanish",
    ],
    missing: [],
    cta: "Premium olish",
    isCurrent: false,
    isPopular: true,
  },
  {
    name: "Yillik",
    price: "399 000",
    period: "/ yil",
    description: "Eng tejamli — 4 oy bepul",
    features: [
      "Premium imkoniyatlar hammasi",
      "4 oy bepul (33% chegirma)",
      "Imtihon kalendari",
      "Guruh darslar",
      "Sertifikat",
    ],
    missing: [],
    cta: "Yillik olish",
    isCurrent: false,
    badge: "-33%",
  },
];

const perks = [
  { icon: BookOpen, title: "Cheksiz masalalar",  desc: "DTM, Milliy Sertifikat uchun 1000+ masala" },
  { icon: Bot,      title: "AI Yordamchi",        desc: "Har qanday masalani tushuntiruvchi AI" },
  { icon: Zap,      title: "Tezkor yechim",       desc: "Vaqt chegarali mashqlar bilan tezlik" },
  { icon: BarChart2,title: "Batafsil tahlil",     desc: "Zaif tomonlarni aniqlang, maqsadli o'qing" },
];

// ── Page ────────────────────────────────────────────────────────────────────
export default function PremiumPage() {
  const [checkout, setCheckout] = useState<typeof plans[0] | null>(null);

  return (
    <div className="min-h-screen bg-dark-bg">
      {checkout && (
        <CheckoutModal plan={checkout} onClose={() => setCheckout(null)} />
      )}

      <div className="max-w-5xl mx-auto px-4 md:px-6 py-10">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-sm mb-6">
            <ArrowLeft size={15} /> Bosh sahifa
          </Link>
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/20
              px-4 py-1.5 rounded-full mb-4">
              <Crown size={14} className="text-yellow-400" />
              <span className="text-yellow-400 text-sm font-medium">MathModul Premium</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white mb-3">DTMga mukammal tayyorlan</h1>
            <p className="text-gray-500 max-w-xl mx-auto text-sm md:text-base">
              Cheksiz masalalar, AI yordamchi va professional tahlil bilan maqsadingizga erishing
            </p>
          </div>
        </div>

        {/* Perks */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
          {perks.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-dark-card border border-dark-border rounded-xl p-4 text-center">
              <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center mx-auto mb-3">
                <Icon size={18} className="text-brand" />
              </div>
              <h3 className="text-white text-sm font-semibold mb-1">{title}</h3>
              <p className="text-gray-600 text-xs leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {plans.map((plan) => (
            <div key={plan.name} className={cn(
              "bg-dark-card border rounded-2xl p-6 flex flex-col relative",
              plan.isPopular ? "border-brand/40 shadow-lg shadow-brand/5" : "border-dark-border"
            )}>
              {plan.isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand
                  text-black text-xs font-bold px-4 py-1 rounded-full">
                  Eng mashhur
                </div>
              )}
              {plan.badge && (
                <div className="absolute -top-3 right-4 bg-yellow-500
                  text-black text-xs font-bold px-3 py-1 rounded-full">
                  {plan.badge}
                </div>
              )}

              <div className="mb-5">
                <h2 className="text-white font-bold text-lg mb-1">{plan.name}</h2>
                <div className="flex items-end gap-1 mb-2">
                  <span className="text-3xl font-black text-white">{plan.price}</span>
                  <span className="text-gray-500 text-sm mb-1">{plan.period}</span>
                </div>
                <p className="text-gray-500 text-xs">{plan.description}</p>
              </div>

              <div className="flex-1 space-y-2 mb-6">
                {plan.features.map((f) => (
                  <div key={f} className="flex items-center gap-2">
                    <CheckCircle size={13} className="text-brand shrink-0" />
                    <span className="text-gray-300 text-sm">{f}</span>
                  </div>
                ))}
                {plan.missing.map((f) => (
                  <div key={f} className="flex items-center gap-2 opacity-40">
                    <div className="w-3 h-3 rounded-full border border-gray-700 shrink-0" />
                    <span className="text-gray-600 text-sm line-through">{f}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => !plan.isCurrent && setCheckout(plan)}
                className={cn(
                  "w-full py-3 rounded-xl text-sm font-semibold transition-colors",
                  plan.isCurrent
                    ? "bg-dark-hover text-gray-500 cursor-default"
                    : plan.isPopular
                    ? "bg-brand hover:bg-brand/90 text-black"
                    : "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 hover:bg-yellow-500/20"
                )}
                disabled={plan.isCurrent}>
                {plan.isPopular && !plan.isCurrent && <Crown size={14} className="inline mr-2" />}
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 space-y-2">
          <p className="text-gray-700 text-xs">
            To&apos;lov Payme va Click orqali qabul qilinadi · Istalgan vaqt bekor qilish mumkin
          </p>
          <p className="text-gray-700 text-xs">
            Savollar uchun:{" "}
            <a href={TELEGRAM} target="_blank" rel="noreferrer"
              className="text-brand hover:underline">
              Telegram admin
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
