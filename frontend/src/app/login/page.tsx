"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { LogoMark } from "@/components/ui/LogoMark";
import { useState, type SVGProps, type FormEvent } from "react";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<"GURU" | "SISWA">("SISWA");

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Email dan password wajib diisi.");
      return;
    }
    setLoading(true);
    try {
      const result = await login(email, password);
      if (result.success && result.role) {
        const route =
          result.role === "DEVELOPER"
            ? "/dashboard/developer"
            : result.role === "GURU"
              ? "/dashboard/guru"
              : "/dashboard/siswa";
        router.push(route);
      } else {
        setError(result.message || "Login gagal. Periksa email dan password.");
      }
    } catch {
      setError("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-6">
          <Link href="/" className="flex items-center gap-3">
            <LogoMark />
            <span className="text-lg font-bold text-slate-900">
              EduPath <span className="text-red-600">AI</span>
            </span>
          </Link>
        </div>
      </header>

      <section className="flex flex-1 items-center justify-center px-4 py-10">
        <div className="w-full max-w-[420px]">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 text-center">
              <h1 className="text-xl font-bold text-slate-900">Masuk</h1>
              <p className="mt-1 text-sm text-slate-500">Silakan masuk ke akun Anda</p>
            </div>

            {/* Role tabs */}
            <div className="mb-6 grid grid-cols-2 gap-1 rounded-lg bg-slate-100 p-1">
              <button
                onClick={() => setSelectedRole("SISWA")}
                className={`rounded-md py-2.5 text-sm font-semibold transition ${
                  selectedRole === "SISWA" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
                }`}
              >
                Siswa
              </button>
              <button
                onClick={() => setSelectedRole("GURU")}
                className={`rounded-md py-2.5 text-sm font-semibold transition ${
                  selectedRole === "GURU" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
                }`}
              >
                Guru
              </button>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@sekolah.sch.id"
                  required
                  className="mt-1.5 h-11 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">Password</label>
                <div className="relative mt-1.5">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukkan password"
                    required
                    className="h-11 w-full rounded-lg border border-slate-300 bg-white px-4 pr-11 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                  >
                    {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="rounded-lg bg-red-50 p-3 text-sm font-medium text-red-600">{error}</div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="h-11 w-full rounded-lg bg-blue-600 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? "Memproses..." : "Masuk"}
              </button>
            </form>

            <div className="mt-6 text-center">
              {selectedRole === "SISWA" ? (
                <p className="text-sm text-slate-500">
                  Belum punya akun?{" "}
                  <Link href="/register" className="font-semibold text-blue-600 hover:text-blue-700">Daftar</Link>
                </p>
              ) : (
                <p className="text-sm text-slate-500">
                  Belum terdaftar sebagai guru?{" "}
                  <Link href="/register?role=guru" className="font-semibold text-blue-600 hover:text-blue-700">Daftar di sini</Link>
                </p>
              )}
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-slate-400">
            &copy; 2026 EduPath AI. All rights reserved.
          </p>
        </div>
      </section>
    </main>
  );
}

function EyeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19M14.12 14.12a3 3 0 1 1-4.24-4.24" />
      <path d="M1 1l22 22" />
    </svg>
  );
}
