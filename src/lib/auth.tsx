"use client";
import { createContext, useContext, useState, useEffect } from "react";
import type { User } from "./types";

const DEFAULT_USER: User = {
  id: "user_1",
  name: "Ulugbek",
  streak: 7,
  coins: 69,
  examType: "DTM",
  examDate: "2026-08-22",
  totalAttempted: 651,
  accuracy: 95,
};

interface AuthContextType {
  user: User | null;
  setUser: (u: User) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: DEFAULT_USER,
  setUser: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem("mathuz_user");
    if (raw) setUser(JSON.parse(raw));
    else setUser(DEFAULT_USER);
  }, []);

  function handleSetUser(u: User) {
    setUser(u);
    localStorage.setItem("mathuz_user", JSON.stringify(u));
  }

  return (
    <AuthContext.Provider value={{ user, setUser: handleSetUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}