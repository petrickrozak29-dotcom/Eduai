"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { LogoMark } from "@/components/ui/LogoMark";
import { useState, type SVGProps, type FormEvent } from "react";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const roleLinks = [
    { name: "Siswa", detail: "Belajar adaptif, XP, kuis, Learning Index", color: "bg-red-600 text-white" },
    { name: "Guru", detail: "Generate materi, review, publish, monitoring", color: "bg-white text-slate-800" },
  ];

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const result = await login(email, password);
      if (result.success && result.role) {
        const route = result.role === "DEVELOPER" ? "/dashboard/developer" : result.role === "GURU" ? "/dashboard/guru" : "/dashboard/siswa";
        router.push(route);
      } else {
        setError(result.message || "Login gagal. Cek email dan password.");
      }
    } catch {
      setError("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="edupath-shell relative min-h-screen overflow-hidden px-4 py-6 sm:px-6 lg:px-8">
      <LoginBackdrop />

      <div className="relative z-10 mx-auto flex max-w-7xl items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <LogoMark />
          <span className="text-xl font-black text-slate-950">
            EduPath <span className="text-red-600">AI</span>
          </span>
        </Link>
        <Link href="/register" className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-black text-emerald-700 shadow-sm transition hover:-translate-y-0.5">
          Daftar Siswa
        </Link>
      </div>

      <section className="relative z-10 mx-auto grid min-h-[calc(100vh-96px)] max-w-7xl items-center gap-8 py-10 lg:grid-cols-[0.94fr_1.06fr]">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
          <p className="text-sm font-black uppercase text-red-600">Masuk</p>
          <h1 className="mt-3 max-w-2xl text-5xl font-black leading-tight text-slate-950 sm:text-6xl">
            Masuk ke ruang belajar yang sesuai peranmu.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-8 text-slate-600">
            Siswa masuk ke learning hub, guru ke AI teaching workspace. Pilih peran untuk langsung menuju dashboard.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {roleLinks.map((role) => (
              <button
                key={role.name}
                onClick={() => {
                  if (role.name === "Siswa") { setEmail("siswa@demo.com"); setPassword("siswa123"); }
                  else { setEmail("guru@demo.com"); setPassword("guru123"); }
                }}
                className={`rounded-lg border border-white/70 p-4 text-left shadow-sm transition hover:-translate-y-1 ${role.color}`}
              >
                <p className="font-black">{role.name}</p>
                <p className="mt-2 text-xs leading-5 opacity-80">{role.detail}</p>
              </button>
            ))}
          </div>

          <div className="mt-6 rounded-lg border border-blue-200 bg-blue-50 p-4">
            <p className="text-sm font-black text-blue-700">Demo Akun</p>
            <div className="mt-2 space-y-1 text-sm text-blue-700/80">
              <p><strong>Siswa:</strong> siswa@demo.com / siswa123</p>
              <p><strong>Guru:</strong> guru@demo.com / guru123</p>
              <p className="mt-2 text-xs">Klik kartu di atas untuk auto-fill</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="rounded-lg border border-white/70 bg-white/75 p-5 shadow-[0_35px_90px_rgba(15,23,42,0.13)] backdrop-blur-2xl sm:p-7"
        >
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase text-blue-600">Welcome Back</p>
              <h2 className="mt-1 text-3xl font-black text-slate-950">Login EduPath AI</h2>
            </div>
            <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-blue-600 text-white shadow-lg shadow-blue-600/20">
              <LockIcon className="h-6 w-6" />
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <label className="block">
              <span className="text-sm font-black text-slate-700">Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@sekolah.sch.id"
                required
                className="mt-2 h-14 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </label>
            <label className="block">
              <span className="text-sm font-black text-slate-700">Password</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password"
                required
                className="mt-2 h-14 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </label>

            {error && (
              <div className="rounded-lg bg-red-50 p-3 text-sm font-bold text-red-600">{error}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-lg bg-red-600 text-base font-black text-white shadow-[0_18px_45px_rgba(239,68,68,0.28)] transition hover:-translate-y-0.5 hover:bg-red-700 disabled:opacity-50 disabled:hover:translate-y-0"
            >
              {loading ? "Memproses..." : "Masuk ke Dashboard"}
              <ArrowRightIcon className="h-5 w-5" />
            </button>
          </form>

          <div className="mt-5 text-center">
            <p className="text-sm font-bold text-slate-600">
              Belum punya akun?{" "}
              <Link href="/register" className="text-red-600 hover:underline">Daftar sebagai Siswa</Link>
            </p>
          </div>

          <div className="mt-6 rounded-lg border border-emerald-200 bg-emerald-50 p-4">
            <p className="text-sm font-black text-emerald-700">Demo Frontend</p>
            <p className="mt-1 text-sm leading-6 text-emerald-700/80">
              Login sudah fungsional dengan data demo. Integrasi backend menyusul.
            </p>
          </div>
        </motion.div>
      </section>
    </main>
  );
}

function LoginBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <span className="learning-band learning-band-one" />
      <span className="learning-band learning-band-two" />
      <span className="grid-sheen" />
      {Array.from({ length: 10 }).map((_, index) => (
        <span key={index} className={`learning-particle particle-${index + 1}`} />
      ))}
    </div>
  );
}

function LockIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

function ArrowRightIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}
