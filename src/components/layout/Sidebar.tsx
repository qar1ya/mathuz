"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Bot, Calendar, PlayCircle, BarChart2,
  BookOpen, Zap, FileText, Bookmark, Sun, Crown,
  Settings, ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth";

const mainItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Bosh sahifa" },
  { href: "/ai", icon: Bot, label: "AI Yordamchi" },
  { href: "/reja", icon: Calendar, label: "O'quv Rejasi", badge: "3" },
  { href: "/darslar", icon: PlayCircle, label: "Video Darslar", isNew: true },
  { href: "/tahlil", icon: BarChart2, label: "Tahlil" },
];

const practiceItems = [
  { href: "/masalalar", icon: BookOpen, label: "Masalalar Banki" },
  { href: "/tezkor", icon: Zap, label: "Tezkor Yechim" },
  { href: "/imtihon", icon: FileText, label: "Imtihon Simulyatsiyasi" },
];

interface NavItemProps {
  href: string;
  icon: React.ElementType;
  label: string;
  badge?: string;
  isNew?: boolean;
  isActive: boolean;
}

function NavItem({ href, icon: Icon, label, badge, isNew, isActive }: NavItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
        isActive ? "bg-brand/10 text-brand" : "text-gray-400 hover:bg-dark-hover hover:text-white"
      )}
    >
      <Icon size={16} />
      <span className="flex-1">{label}</span>
      {badge && (
        <span className="text-xs bg-brand/20 text-brand px-1.5 py-0.5 rounded-full font-medium">
          {badge}
        </span>
      )}
      {isNew && (
        <span className="text-xs bg-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded font-medium">
          Yangi
        </span>
      )}
    </Link>
  );
}

export default function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuth();

  return (
    <div className="w-56 h-screen bg-dark-sidebar border-r border-dark-border flex flex-col shrink-0">
      <div className="px-4 py-5 border-b border-dark-border">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center text-black font-bold text-base">
            M
          </div>
          <span className="text-white font-bold text-lg tracking-tight">MathUz</span>
        </div>
      </div>

      <div className="px-3 py-2.5 border-b border-dark-border">
        <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-dark-hover text-sm text-gray-300">
          <span>{user?.examType ?? "DTM"}</span>
          <ChevronDown size={13} />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto py-2 px-2 space-y-4">
        <div className="space-y-0.5">
          {mainItems.map((item) => (
            <NavItem key={item.href} {...item} isActive={pathname === item.href} />
          ))}
        </div>
        <div>
          <p className="px-3 py-1 text-[10px] font-semibold text-gray-600 uppercase tracking-widest">
            Amaliyot
          </p>
          <div className="space-y-0.5 mt-1">
            {practiceItems.map((item) => (
              <NavItem key={item.href} {...item} isActive={pathname === item.href} />
            ))}
          </div>
        </div>
        <div>
          <p className="px-3 py-1 text-[10px] font-semibold text-gray-600 uppercase tracking-widest">
            Progress
          </p>
          <div className="space-y-0.5 mt-1">
            <NavItem href="/saqlangan" icon={Bookmark} label="Saqlangan" isActive={pathname === "/saqlangan"} />
          </div>
        </div>
      </nav>

      <div className="p-2 border-t border-dark-border space-y-0.5">
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-400 hover:bg-dark-hover hover:text-white transition-colors">
          <Sun size={15} />
          <span>Yorug&apos; rejim</span>
        </button>

        <Link href="/premium" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-400 hover:bg-dark-hover hover:text-white transition-colors">
          <Crown size={15} />
          <span className="flex-1">Premium Olish</span>
          <span className="text-[10px] bg-yellow-500/20 text-yellow-400 px-1.5 py-0.5 rounded font-semibold">
            25%
          </span>
        </Link>
        <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-dark-hover cursor-pointer transition-colors mt-1">
          <div className="w-7 h-7 rounded-full bg-brand/15 border border-brand/30 flex items-center justify-center text-brand text-xs font-bold shrink-0">
            {user?.name?.charAt(0) ?? "U"}
          </div>
          <span className="text-sm text-white flex-1 truncate">{user?.name ?? "Foydalanuvchi"}</span>
          <Settings size={13} className="text-gray-600" />
        </div>
      </div>
    </div>
  );
}