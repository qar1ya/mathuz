"use client";
import { useAuth } from "@/lib/auth";
import { Flame, Coins, Bell, Search } from "lucide-react";

export default function TopBar() {
  const { user } = useAuth();

  return (
    <div className="h-12 border-b border-dark-border bg-dark-bg flex items-center px-5 gap-4 shrink-0">
      <div className="flex-1" />

      <div className="flex-1 max-w-xs">
        <div className="relative">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />
          <input
            placeholder="Qidirish..."
            className="w-full bg-dark-card border border-dark-border rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-brand/40 transition-colors"
          />
        </div>
      </div>

      <div className="flex-1 flex items-center justify-end gap-3">
        <button className="relative text-gray-500 hover:text-white transition-colors">
          <Bell size={17} />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-brand rounded-full text-[8px] font-bold text-black flex items-center justify-center">
            2
          </span>
        </button>

        <div className="flex items-center gap-1.5 bg-dark-card border border-dark-border rounded-lg px-2.5 py-1.5">
          <Flame size={14} className="text-orange-400" />
          <span className="text-white text-xs font-semibold">{user?.streak ?? 0}</span>
          <span className="text-gray-600 text-xs">kun</span>
        </div>

        <div className="flex items-center gap-1.5 bg-dark-card border border-dark-border rounded-lg px-2.5 py-1.5">
          <Coins size={14} className="text-yellow-400" />
          <span className="text-white text-xs font-semibold">{user?.coins ?? 0}</span>
        </div>
      </div>
    </div>
  );
}
