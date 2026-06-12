"use client";
import { Sigma } from "lucide-react";

export default function FormulaPage() {
  return (
    <div className="p-6 flex flex-col items-center justify-center h-full text-center">
      <div className="w-16 h-16 rounded-2xl bg-brand/10 border border-brand/20 flex items-center justify-center mb-4">
        <Sigma size={28} className="text-brand" />
      </div>
      <h1 className="text-white font-bold text-xl mb-2">Formula & Qoidalar</h1>
      <p className="text-gray-500 text-sm max-w-xs">Tez orada! Barcha matematik formulalar va qoidalar to&apos;plami yaratilmoqda.</p>
    </div>
  );
}
