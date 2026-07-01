"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard, Bot, Calendar, PlayCircle, BarChart2,
  BookOpen, Zap, FileText, Bookmark, Crown, Settings,
  ChevronDown, ClipboardList, Sigma, Check, LogOut, Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth";

const mainItems = [
  { href: "/dashboard",  icon: LayoutDashboard, label: "Bosh sahifa" },
  { href: "/masalalar",  icon: BookOpen,         label: "Masalalar Banki" },
  { href: "/testlar",    icon: ClipboardList,    label: "Testlar" },
  { href: "/classroom",  icon: Users,            label: "Classroom", isNew: true },
  { href: "/ai",         icon: Bot,              label: "AI Yordamchi" },
  { href: "/tahlil",     icon: BarChart2,        label: "Tahlil" },
  { href: "/darslar",    icon: PlayCircle,       label: "Video Darslar" },
];

const practiceItems = [
  { href: "/tezkor",  icon: Zap,       label: "Tezkor Yechim" },
  { href: "/imtihon", icon: FileText,  label: "Imtihon" },
  { href: "/formula", icon: Sigma,     label: "Formulalar" },
  { href: "/reja",    icon: Calendar,  label: "Reja" },
];

interface NavItemProps {
  href: string; icon: React.ElementType; label: string;
  badge?: string; isNew?: boolean; isActive: boolean;
}

function NavItem({ href, icon: Icon, label, badge, isNew, isActive, onClick }: NavItemProps & { onClick?: () => void }) {
  return (
    <Link href={href} onClick={onClick}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all duration-150",
        isActive
          ? "bg-brand text-black font-semibold shadow-sm"
          : "text-gray-400 hover:bg-dark-hover hover:text-white"
      )}>
      <Icon size={15} className={isActive ? "text-black" : ""} />
      <span className="flex-1 text-[13px]">{label}</span>
      {badge && (
        <span className={cn("text-[10px] px-1.5 py-0.5 rounded-full font-bold",
          isActive ? "bg-black/20 text-black" : "bg-brand/20 text-brand")}>
          {badge}
        </span>
      )}
      {isNew && !isActive && (
        <span className="text-[10px] bg-blue-500/15 text-blue-400 px-1.5 py-0.5 rounded-full font-medium">
          Yangi
        </span>
      )}
    </Link>
  );
}

export default function Sidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, signOut } = useAuth();

  async function handleSignOut() { await signOut(); router.push("/login"); }

  return (
    <div className="w-56 h-screen bg-dark-sidebar border-r border-dark-border flex flex-col shrink-0">
      {/* Logo */}
      <div className="px-4 py-4 border-b border-dark-border">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-brand flex items-center justify-center text-black font-black text-sm">
            M
          </div>
          <div>
            <p className="text-white font-bold text-base leading-none">MathModul</p>
            <p className="text-gray-600 text-[10px]">Ta&apos;lim platformasi</p>
          </div>
        </div>
      </div>

      {/* Exam type */}
      <div className="px-3 pt-3 pb-2">
        <button className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-dark-hover border border-dark-border text-sm text-gray-300 hover:border-brand/20 transition-colors">
          <span className="text-[12px] font-medium">{user?.examType ?? "DTM"}</span>
          <ChevronDown size={12} className="text-gray-500" />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-2 pb-2 space-y-4">
        <div className="space-y-0.5">
          {mainItems.map(item => (
            <NavItem key={item.href} {...item} isActive={pathname === item.href} onClick={onClose} />
          ))}
        </div>
        <div>
          <p className="px-3 py-1 text-[10px] font-semibold text-gray-600 uppercase tracking-widest mb-0.5">
            Amaliyot
          </p>
          {practiceItems.map(item => (
            <NavItem key={item.href} {...item} isActive={pathname === item.href} onClick={onClose} />
          ))}
        </div>
        <div>
          <p className="px-3 py-1 text-[10px] font-semibold text-gray-600 uppercase tracking-widest mb-0.5">
            Mening
          </p>
          <NavItem href="/saqlangan" icon={Bookmark} label="Saqlangan" isActive={pathname === "/saqlangan"} onClick={onClose} />
        </div>
      </nav>

      {/* Premium */}
      {user?.isPremium ? (
        <div className="mx-3 mb-3 bg-brand/8 border border-brand/20 rounded-xl p-3">
          <div className="flex items-center gap-2">
            <Crown size={13} className="text-brand" />
            <span className="text-brand text-xs font-semibold">Premium</span>
            <span className="ml-auto text-[10px] text-brand/60">Faol ✓</span>
          </div>
        </div>
      ) : (
        <div className="mx-3 mb-3 bg-yellow-500/5 border border-yellow-500/20 rounded-xl p-3">
          <div className="flex items-center gap-2 mb-2">
            <Crown size={13} className="text-yellow-400" />
            <span className="text-white text-xs font-semibold">Premium olish</span>
          </div>
          <div className="space-y-1 mb-2.5">
            {["Cheksiz AI", "Barcha savollar", "Tahlillar"].map(f => (
              <div key={f} className="flex items-center gap-1.5">
                <Check size={10} className="text-brand shrink-0" />
                <span className="text-gray-500 text-[11px]">{f}</span>
              </div>
            ))}
          </div>
          <Link href="/premium"
            className="block w-full text-center py-1.5 bg-yellow-500 hover:bg-yellow-400 text-black text-xs font-bold rounded-lg transition-colors">
            Premium olish
          </Link>
        </div>
      )}

      {/* Footer */}
      <div className="px-3 pb-3 border-t border-dark-border pt-2 space-y-1">
        <Link href="/admin"
          className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-dark-hover transition-colors">
          <Settings size={13} className="text-gray-600" />
          <span className="text-[12px] text-gray-600">Admin</span>
        </Link>
        <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-dark-hover transition-colors">
          <div className="w-7 h-7 rounded-full bg-brand/15 border border-brand/30 flex items-center justify-center text-brand text-xs font-bold shrink-0">
            {user?.name?.charAt(0)?.toUpperCase() ?? "U"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-[12px] font-medium truncate">{user?.name ?? "Foydalanuvchi"}</p>
            <p className="text-gray-600 text-[10px]">{user?.examType ?? "DTM"}</p>
          </div>
          <button onClick={handleSignOut} title="Chiqish" className="text-gray-600 hover:text-red-400 transition-colors">
            <LogOut size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}
