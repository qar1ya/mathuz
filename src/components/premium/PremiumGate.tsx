"use client";
import Link from "next/link";
import { Crown, X, Zap, BookOpen, Bot, BarChart2 } from "lucide-react";

interface Props {
  title: string;
  desc: string;
  onClose?: () => void;
}

export default function PremiumGate({ title, desc, onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.75)" }}
      onClick={(e) => e.target === e.currentTarget && onClose?.()}>
      <div className="bg-dark-card border border-dark-border rounded-2xl w-full max-w-sm overflow-hidden">
        {/* Header */}
        <div className="relative px-6 py-5 text-center"
          style={{ background: "linear-gradient(135deg, #0d2018 0%, #111113 100%)" }}>
          {onClose && (
            <button onClick={onClose}
              className="absolute top-3 right-3 text-gray-500 hover:text-white transition-colors">
              <X size={16} />
            </button>
          )}
          <div className="w-14 h-14 rounded-2xl bg-yellow-500/15 border border-yellow-500/25
            flex items-center justify-center mx-auto mb-3">
            <Crown size={26} className="text-yellow-400" />
          </div>
          <h2 className="text-white font-bold text-lg mb-1">{title}</h2>
          <p className="text-gray-400 text-sm">{desc}</p>
        </div>

        {/* Features */}
        <div className="px-6 py-4 space-y-2.5">
          {[
            { icon: BookOpen, text: "Cheksiz masalalar va testlar" },
            { icon: Bot,      text: "AI Yordamchi — cheksiz" },
            { icon: BarChart2, text: "Batafsil tahlil va hisobotlar" },
            { icon: Zap,      text: "Barcha mavzular va darslar" },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-brand/10 flex items-center justify-center shrink-0">
                <Icon size={13} className="text-brand" />
              </div>
              <span className="text-gray-300 text-sm">{text}</span>
            </div>
          ))}
        </div>

        {/* Price + CTA */}
        <div className="px-6 pb-5">
          <div className="flex items-baseline gap-1 justify-center mb-3">
            <span className="text-white font-black text-3xl">49 000</span>
            <span className="text-gray-500 text-sm">so&apos;m / oy</span>
          </div>
          <Link href="/premium"
            className="flex items-center justify-center gap-2 w-full py-3 bg-brand
            hover:bg-brand/90 text-black font-bold rounded-xl text-sm transition-colors">
            <Crown size={15} /> Premium olish
          </Link>
          {onClose && (
            <button onClick={onClose}
              className="w-full py-2 mt-2 text-gray-600 text-xs hover:text-gray-400 transition-colors">
              Keyinroq
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
