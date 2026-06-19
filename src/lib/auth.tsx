"use client";
import { createContext, useContext, useState, useEffect } from "react";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import { supabase } from "./supabase";
import type { User, ExamType } from "./types";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signOut: async () => {},
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

  return (
    <AuthContext.Provider value={{ user, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
