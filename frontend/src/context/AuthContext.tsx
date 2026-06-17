"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

interface User {
  id: string;
  email: string;
  name: string;
  role: "SISWA" | "GURU" | "DEVELOPER";
  avatar?: string | null;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; role?: string; message?: string }>;
  register: (data: RegisterData) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  isAuthenticated: boolean;
}

interface RegisterData {
  email: string;
  password: string;
  name: string;
  role?: string;
  nis?: string;
  nip?: string;
  mataPelajaran?: string;
  kelas?: string;
  avatar?: string;
  tempatLahir?: string;
  tanggalLahir?: string;
  jenisKelamin?: string;
  agama?: string;
  alamat?: string;
  noHP?: string;
  pendidikanTerakhir?: string;
  perguruanTinggi?: string;
  programStudi?: string;
  tahunLulus?: string;
  nuptk?: string;
  statusKepegawaian?: string;
  instansi?: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("edupath_user");
      if (saved) {
        try { return JSON.parse(saved); } catch { localStorage.removeItem("edupath_user"); }
      }
    }
    return null;
  });
  const [token, setToken] = useState<string | null>(() => {
    if (typeof window !== "undefined") return localStorage.getItem("edupath_token");
    return null;
  });
  const [isLoading] = useState(false);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const result = await res.json();
      if (result.success && result.data) {
        const userData: User = {
          id: result.data.user.id,
          email: result.data.user.email,
          name: result.data.user.name,
          role: result.data.user.role,
          avatar: result.data.user.avatar || null,
        };
        const newToken = result.data.token;
        setUser(userData);
        setToken(newToken);
        localStorage.setItem("edupath_token", newToken);
        localStorage.setItem("edupath_user", JSON.stringify(userData));
        return { success: true, role: userData.role };
      }
      return { success: false, message: result.message || "Login gagal" };
    } catch {
      return { success: false, message: "Gagal terhubung ke server. Pastikan backend berjalan." };
    }
  }, []);

  const register = useCallback(async (data: RegisterData) => {
    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (result.success && result.data) {
        const userData: User = {
          id: result.data.user.id,
          email: result.data.user.email,
          name: result.data.user.name,
          role: result.data.user.role,
          avatar: result.data.user.avatar || null,
        };
        const newToken = result.data.token;
        setUser(userData);
        setToken(newToken);
        localStorage.setItem("edupath_token", newToken);
        localStorage.setItem("edupath_user", JSON.stringify(userData));
        return { success: true, message: "Registrasi berhasil!" };
      }
      return { success: false, message: result.message || "Registrasi gagal" };
    } catch {
      return { success: false, message: "Gagal terhubung ke server. Pastikan backend berjalan." };
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("edupath_token");
    localStorage.removeItem("edupath_user");
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
