"use client";
import { createContext, useContext, useState, useEffect } from "react";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import { supabase } from "./supabase";
import type { User, ExamType } from "./types";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
  updateProfile: (patch: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signOut: async () => {},
  updateProfile: async () => {},
});

function toAppUser(sbUser: SupabaseUser): User {
  const m = sbUser.user_metadata ?? {};
  return {
    id: sbUser.id,
    name: m.name || sbUser.email?.split("@")[0] || "Foydalanuvchi",
    streak: m.streak ?? 0,
    coins: m.coins ?? 0,
    examType: (m.exam_type as ExamType) ?? "DTM",
    examDate: m.exam_date ?? "2026-08-22",
    totalAttempted: m.total_attempted ?? 0,
    accuracy: m.accuracy ?? 0,
    isPremium: m.is_premium === true,
    isTeacher: m.is_teacher === true,
  };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ? toAppUser(session.user) : null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_evt, session) => {
      setUser(session?.user ? toAppUser(session.user) : null);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function signOut() {
    await supabase.auth.signOut();
    setUser(null);
  }

  async function updateProfile(patch: Partial<User>) {
    // Map User fields → Supabase metadata keys
    const meta: Record<string, unknown> = {};
    if (patch.name !== undefined)           meta.name = patch.name;
    if (patch.streak !== undefined)         meta.streak = patch.streak;
    if (patch.coins !== undefined)          meta.coins = patch.coins;
    if (patch.examType !== undefined)       meta.exam_type = patch.examType;
    if (patch.examDate !== undefined)       meta.exam_date = patch.examDate;
    if (patch.totalAttempted !== undefined) meta.total_attempted = patch.totalAttempted;
    if (patch.accuracy !== undefined)       meta.accuracy = patch.accuracy;
    if (patch.isPremium !== undefined)      meta.is_premium = patch.isPremium;
    if (patch.isTeacher !== undefined)      meta.is_teacher = patch.isTeacher;

    const { data, error } = await supabase.auth.updateUser({ data: meta });
    if (!error && data.user) {
      const updated = toAppUser(data.user);
      setUser(updated);
      // Sync to public leaderboard
      await supabase.from("leaderboard").upsert({
        user_id: data.user.id,
        name: updated.name,
        coins: updated.coins,
        streak: updated.streak,
        total_attempted: updated.totalAttempted,
        updated_at: new Date().toISOString(),
      }, { onConflict: "user_id" });
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, signOut, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
