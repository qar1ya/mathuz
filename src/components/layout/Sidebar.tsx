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
  { href: "/dashboard", icon: LayoutDashboard, label: "Bosh sahifa" },
  { href: "/ai", icon: Bot, label: "AI Yordamchi" },
  { href: "/reja", icon: Calendar, label: "O'quv Rejasi", badge: "3" },
  { href: "/darslar", icon: PlayCircle, label: "Video Darslar", isNew: true },
  { href: "/masalalar", icon: BookOpen, label: "Masalalar Banki" },
  { href: "/testlar", icon: ClipboardList, label: "Testlar" },
  { href: "/classroom", icon: Users, label: "Classroom", isNew: true },
  { href: "/tahlil", icon: BarChart2, label: "Tahlil" },
];

const practiceItems = [
  { href: "/tezkor", icon: Zap, label: "Tezkor Yechim" },
  { href: "/imtihon", icon: FileText, label: "Imtihon Simulyatsiyasi" },
  { href: "/formula", icon: Sigma, label: "Formula & Qoidalar" },
];

interface NavItemProps {
  href: string;
  icon: React.ElementType;
  label: string;
  badge?: string;
  isNew?: boolean;
  isActive: boolean;
}

function NavItem({ href, icon: Icon, label, badge, isNew, isActive, onClick }: NavItemProps & { onClick?: () => void }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
        isActive ? "bg-brand/10 text-brand" : "text-gray-400 hover:bg-dark-hover hover:text-white"
      )}
    >
      <Icon size={15} />
      <span className="flex-1 text-[13px]">{label}</span>
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

export default function Sidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, signOut } = useAuth();

  async function handleSignOut() {
    await signOut();
    router.push("/login");
  }

  return (
    <div className="w-56 h-screen bg-dark-sidebar border-r border-dark-border flex flex-col shrink-0">
      <div className="px-4 py-4 border-b border-dark-border">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center text-black font-bold text-base">
            M
          </div>
          <span className="text-white font-bold text-lg tracking-tight">MathUz</span>
        </div>
      </div>

      <div className="px-3 py-2.5 border-b border-dark-border">
        <button className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg bg-dark-hover text-sm text-gray-300">
          <span>{user?.examType ?? "DTM"}</span>
          <ChevronDown size={13} />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto py-2 px-2 space-y-3">
        <div className="space-y-0.5">
          {mainItems.map((item) => (
            <NavItem key={item.href} {...item} isActive={pathname === item.href} onClick={onClose} />
          ))}
        </div>
        <div>
          <p className="px-3 py-1 text-[10px] font-semibold text-gray-600 uppercase tracking-widest">
            Amaliyot
          </p>
          <div className="space-y-0.5 mt-1">
            {practiceItems.map((item) => (
              <NavItem key={item.href} {...item} isActive={pathname === item.href} onClick={onClose} />
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

      {/* Premium section */}
      {user?.isPremium ? (
        <div className="mx-2 mb-2 bg-brand/5 border border-brand/20 rounded-xl p-3">
          <div className="flex items-center gap-2">
            <Crown size={14} className="text-yellow-400" />
            <span className="text-brand text-xs font-semibold">Premium foydalanuvchi</span>
          </div>
          <p className="text-gray-500 text-[11px] mt-1">Barcha imkoniyatlar ochiq ✓</p>
        </div>
      ) : (
        <div className="mx-2 mb-2 bg-brand/5 border border-brand/20 rounded-xl p-3">
          <div className="flex items-center gap-2 mb-2">
            <Crown size={14} className="text-yellow-400" />
            <span className="text-white text-xs font-semibold">Premium ga o&apos;ting</span>
          </div>
          <div className="space-y-1.5 mb-3">
            {["Cheksiz AI yordamchi", "Batafsil tahlillar", "Ekskluziv kurslar"].map((f) => (
              <div key={f} className="flex items-center gap-1.5">
                <Check size={11} className="text-brand shrink-0" />
                <span className="text-gray-400 text-[11px]">{f}</span>
              </div>
            ))}
          </div>
          <Link href="/premium"
            className="block w-full text-center py-1.5 bg-yellow-500 hover:bg-yellow-400 text-black text-xs font-bold rounded-lg transition-colors">
            Premium olish
          </Link>
        </div>
      )}

      <div className="p-2 border-t border-dark-border">
        <Link href="/admin"
          className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-dark-hover cursor-pointer transition-colors mb-1">
          <Settings size={13} className="text-gray-600" />
          <span className="text-[12px] text-gray-600 hover:text-gray-400">Admin</span>
        </Link>
        <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-dark-hover transition-colors">
          <div className="w-7 h-7 rounded-full bg-brand/15 border border-brand/30 flex items-center justify-center text-brand text-xs font-bold shrink-0">
            {user?.name?.charAt(0)?.toUpperCase() ?? "U"}
          </div>
          <span className="text-[13px] text-white flex-1 truncate">{user?.name ?? "Foydalanuvchi"}</span>
          <button onClick={handleSignOut} title="Chiqish"
            className="text-gray-600 hover:text-red-400 transition-colors shrink-0">
            <LogOut size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}
