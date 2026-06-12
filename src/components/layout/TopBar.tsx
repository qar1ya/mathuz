"use client";
import { useAuth } from "@/lib/auth";
import { Flame, Coins } from "lucide-react";

export default function TopBar() {
  const { user } = useAuth();

  return (
    <div className="h-12 border-b border-dark-border bg-dark-bg flex items-center justify-end px-6 gap-4 shrink-0">
      <div className="flex items-center gap-1.5 text-sm">
        <Flame size={16} className="text-orange-400" />
        <span className="text-white font-semibold">{user?.streak ?? 0}</span>
        <span className="text-gray-500">kun</span>
      </div>
      <div className="flex items-center gap-1.5 text-sm">
        <Coins size={16} className="text-yellow-400" />
        <span className="text-white font-semibold">{user?.coins ?? 0}</span>
      </div>
    </div>
  );
}