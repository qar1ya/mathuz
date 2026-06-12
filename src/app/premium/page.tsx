"use client";
import Link from "next/link";
import { CheckCircle, Crown, Zap, BookOpen, BarChart2, Bot, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Bepul",
    price: "0",
    period: "/ oy",
    description: "Asosiy funksiyalar bilan boshlang",
    features: [
      "50 ta masala / oy",
      "Video darslar (bepul)",
      "Tezkor yechim (cheklangan)",
      "Asosiy tahlil",
    ],
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
    description: "Eng tejamli variant — 4 oy bepul",
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
  { icon: BookOpen, title: "Cheksiz masalalar", desc: "DTM, Milliy Sertifikat va maktab uchun 10 000+ masala" },
  { icon: Bot, title: "AI Yordamchi", desc: "Har qanday masalani tushuntiruvchi sun'iy intellekt" },
  { icon: Zap, title: "Tezkor yechim", desc: "Vaqt chegarali mashqlar bilan tezlikni oshiring" },
  { icon: BarChart2, title: "Batafsil tahlil", desc: "Zaif tomonlarni aniqlang va maqsadli o'qing" },
];

export default function PremiumPage() {
  return (
    <div className="min-h-screen bg-dark-bg">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="mb-8">
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-sm mb-6">
            <ArrowLeft size={15} /> Bosh sahifa
          </Link>
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/20 px-4 py-1.5 rounded-full mb-4">
              <Crown size={14} className="text-yellow-400" />
              <span className="text-yellow-400 text-sm font-medium">MathUz Premium</span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-3">DTMga mukammal tayyorlan</h1>
            <p className="text-gray-500 max-w-xl mx-auto">
              Cheksiz masalalar, AI yordamchi va professional tahlil bilan maqsadingizga erishing
            </p>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-10">
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

        <div className="grid grid-cols-3 gap-5">
          {plans.map((plan) => (
            <div key={plan.name} className={cn(
              "bg-dark-card border rounded-2xl p-6 flex flex-col relative",
              plan.isPopular ? "border-brand/40 shadow-lg shadow-brand/5" : "border-dark-border"
            )}>
              {plan.isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand text-black text-xs font-bold px-4 py-1 rounded-full">
                  Eng mashhur
                </div>
              )}
              {plan.badge && (
                <div className="absolute -top-3 right-4 bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full">
                  {plan.badge}
                </div>
              )}

              <div className="mb-5">
                <h2 className="text-white font-bold text-lg mb-1">{plan.name}</h2>
                <div className="flex items-end gap-1 mb-2">
                  <span className="text-3xl font-bold text-white">{plan.price}</span>
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
                className={cn(
                  "w-full py-3 rounded-xl text-sm font-semibold transition-colors",
                  plan.isCurrent
                    ? "bg-dark-hover text-gray-500 cursor-default"
                    : plan.isPopular
                    ? "bg-brand text-black hover:bg-brand-dark"
                    : "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 hover:bg-yellow-500/20"
                )}
                disabled={plan.isCurrent}
              >
                {plan.isPopular && !plan.isCurrent && <Crown size={14} className="inline mr-2" />}
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        <p className="text-center text-gray-700 text-xs mt-8">
          To&apos;lov Payme va Click orqali qabul qilinadi · Istalgan vaqt bekor qilish mumkin
        </p>
      </div>
    </div>
  );
}
