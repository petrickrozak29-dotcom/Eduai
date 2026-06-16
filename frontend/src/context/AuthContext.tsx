"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";

interface User {
  id: string;
  email: string;
  name: string;
  role: "SISWA" | "GURU" | "DEVELOPER";
  avatar?: string | null;
  nis?: string | null;
  nip?: string | null;
  kelas?: string | null;
  student?: { id: string; nis: string; kelas: string } | null;
  teacher?: { id: string; nip: string; mataPelajaran: string } | null;
  developer?: { id: string } | null;
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
  kelas?: string;
}

const AuthContext = createContext<AuthContextType | null>(null);

const MOCK_USERS: Record<string, { email: string; password: string; name: string; role: "SISWA" | "GURU" | "DEVELOPER" }> = {
  "edupathai@gmail.com": {
    email: "edupathai@gmail.com",
    password: "magelangeduai45#",
    name: "Developer EduPath",
    role: "DEVELOPER",
  },
  "guru@demo.com": {
    email: "guru@demo.com",
    password: "guru123",
    name: "Budi Guru",
    role: "GURU",
  },
  "siswa@demo.com": {
    email: "siswa@demo.com",
    password: "siswa123",
    name: "Ani Siswa",
    role: "SISWA",
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem("edupath_token");
    const savedUser = localStorage.getItem("edupath_user");
    if (savedToken && savedUser) {
      try {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem("edupath_token");
        localStorage.removeItem("edupath_user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    // Check mock users first (including developer)
    const mockUser = MOCK_USERS[email];
    if (mockUser && mockUser.password === password) {
      const userData: User = {
        id: email === "edupathai@gmail.com" ? "dev-1" : email.includes("guru") ? "guru-1" : "siswa-1",
        email: mockUser.email,
        name: mockUser.name,
        role: mockUser.role,
        ...(mockUser.role === "SISWA" ? { student: { id: "s-1", nis: "12345", kelas: "X IPA 1" } } : {}),
        ...(mockUser.role === "GURU" ? { teacher: { id: "t-1", nip: "19800101", mataPelajaran: "Biologi" } } : {}),
        ...(mockUser.role === "DEVELOPER" ? { developer: { id: "dev-1" } } : {}),
      };
      const newToken = `token-${Date.now()}`;
      setUser(userData);
      setToken(newToken);
      localStorage.setItem("edupath_token", newToken);
      localStorage.setItem("edupath_user", JSON.stringify(userData));
      return { success: true, role: userData.role };
    }

    // Fallback: any email/password works for demo
    const role: "SISWA" | "GURU" = email.includes("guru") ? "GURU" : "SISWA";
    const userData: User = {
      id: `${role.toLowerCase()}-${Date.now()}`,
      email,
      name: email.includes("guru") ? "Guru Demo" : "Siswa Demo",
      role,
      ...(role === "SISWA" ? { student: { id: "s-demo", nis: "99999", kelas: "X IPA 1" } } : {}),
      ...(role === "GURU" ? { teacher: { id: "t-demo", nip: "99999", mataPelajaran: "Demo" } } : {}),
    };
    const newToken = `token-${Date.now()}`;
    setUser(userData);
    setToken(newToken);
    localStorage.setItem("edupath_token", newToken);
    localStorage.setItem("edupath_user", JSON.stringify(userData));
    return { success: true, role: userData.role };
  }, []);

  const register = useCallback(async (data: RegisterData) => {
    const userData: User = {
      id: `siswa-${Date.now()}`,
      email: data.email,
      name: data.name,
      role: "SISWA",
      nis: data.nis || `NIS-${Date.now()}`,
      kelas: data.kelas || "X IPA 1",
      student: { id: `s-${Date.now()}`, nis: data.nis || `NIS-${Date.now()}`, kelas: data.kelas || "X IPA 1" },
    };
    const newToken = `token-${Date.now()}`;
    setUser(userData);
    setToken(newToken);
    localStorage.setItem("edupath_token", newToken);
    localStorage.setItem("edupath_user", JSON.stringify(userData));
    return { success: true, message: "Registrasi berhasil!" };
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
