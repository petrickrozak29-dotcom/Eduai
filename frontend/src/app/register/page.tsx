"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { LogoMark } from "@/components/ui/LogoMark";
import { useState, type SVGProps, type FormEvent } from "react";

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "", nis: "", kelas: "X IPA 1" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.name || !form.email || !form.password) {
      setError("Nama, email, dan password wajib diisi.");
      return;
    }
    setLoading(true);
    try {
      const result = await register({ ...form, role: "SISWA" });
      if (result.success) {
        router.push("/dashboard/siswa");
      } else {
        setError(result.message || "Registrasi gagal.");
      }
    } catch {
      setError("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="edupath-shell relative min-h-screen overflow-hidden px-4 py-6 sm:px-6 lg:px-8">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <span className="learning-band learning-band-one" />
        <span className="learning-band learning-band-two" />
        <span className="grid-sheen" />
        {Array.from({ length: 10 }).map((_, i) => (
          <span key={i} className={`learning-particle particle-${i + 1}`} />
        ))}
      </div>

      <div className="relative z-10 mx-auto flex max-w-7xl items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <LogoMark />
          <span className="text-xl font-black text-slate-950">
            EduPath <span className="text-red-600">AI</span>
          </span>
        </Link>
        <Link href="/login" className="rounded-lg border border-white/70 bg-white/75 px-4 py-2 text-sm font-black text-slate-700 shadow-sm backdrop-blur">
          Sudah punya akun?
        </Link>
      </div>

      <section className="relative z-10 mx-auto grid min-h-[calc(100vh-96px)] max-w-7xl items-center gap-8 py-10 lg:grid-cols-[0.94fr_1.06fr]">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
          <p className="text-sm font-black uppercase text-emerald-600">Daftar</p>
          <h1 className="mt-3 max-w-2xl text-5xl font-black leading-tight text-slate-950 sm:text-6xl">
            Mulai perjalanan belajar adaptifmu.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-8 text-slate-600">
            Daftar sebagai siswa untuk mendapatkan pengalaman belajar yang dipersonalisasi oleh AI. Gratis, tanpa biaya.
          </p>

          <div className="mt-8 grid gap-4">
            {[
              { icon: "🎯", title: "Pretest Awal", text: "Kenali tingkat pemahamanmu sebelum mulai belajar" },
              { icon: "🧠", title: "Profil Belajar Personal", text: "Visual, auditori, atau kinestetik — AI menyesuaikan" },
              { icon: "📈", title: "Learning Index & Analytics", text: "Pantau perkembangan belajarmu secara real-time" },
            ].map((item) => (
              <div key={item.title} className="flex gap-4 rounded-lg border border-white/70 bg-white/60 p-4 backdrop-blur">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-white text-2xl shadow-sm">
                  {item.icon}
                </span>
                <div>
                  <p className="font-black text-slate-950">{item.title}</p>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{item.text}</p>
                </div>
              </div>
            ))}
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
              <p className="text-xs font-black uppercase text-emerald-600">Daftar Akun</p>
              <h2 className="mt-1 text-3xl font-black text-slate-950">Registrasi Siswa</h2>
            </div>
            <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-emerald-600 text-white shadow-lg shadow-emerald-600/20">
              <UserPlusIcon className="h-6 w-6" />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-black text-slate-700">Nama Lengkap</span>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Nama lengkap"
                  required
                  className="mt-2 h-14 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                />
              </label>
              <label className="block">
                <span className="text-sm font-black text-slate-700">Email</span>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="nama@email.com"
                  required
                  className="mt-2 h-14 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                />
              </label>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-black text-slate-700">NIS</span>
                <input
                  type="text"
                  value={form.nis}
                  onChange={(e) => setForm({ ...form, nis: e.target.value })}
                  placeholder="Nomor Induk Siswa"
                  className="mt-2 h-14 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                />
              </label>
              <label className="block">
                <span className="text-sm font-black text-slate-700">Kelas</span>
                <select
                  value={form.kelas}
                  onChange={(e) => setForm({ ...form, kelas: e.target.value })}
                  className="mt-2 h-14 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                >
                  {["X IPA 1", "X IPA 2", "X IPS 1", "X IPS 2", "XI IPA 1", "XI IPA 2", "XI IPS 1", "XI IPS 2", "XII IPA 1", "XII IPA 2", "XII IPS 1", "XII IPS 2"].map(k => (
                    <option key={k} value={k}>{k}</option>
                  ))}
                </select>
              </label>
            </div>

            <label className="block">
              <span className="text-sm font-black text-slate-700">Password</span>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="Minimal 6 karakter"
                required
                minLength={6}
                className="mt-2 h-14 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
              />
            </label>

            {error && (
              <div className="rounded-lg bg-red-50 p-3 text-sm font-bold text-red-600">{error}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 text-base font-black text-white shadow-[0_18px_45px_rgba(16,185,129,0.28)] transition hover:-translate-y-0.5 hover:bg-emerald-700 disabled:opacity-50"
            >
              {loading ? "Memproses..." : "Daftar & Mulai Belajar"}
              <ArrowRightIcon className="h-5 w-5" />
            </button>
          </form>

          <p className="mt-5 text-center text-sm font-bold text-slate-600">
            Sudah punya akun?{" "}
            <Link href="/login" className="text-red-600 hover:underline">Masuk</Link>
          </p>
        </motion.div>
      </section>
    </main>
  );
}

function UserPlusIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="8.5" cy="7" r="4" />
      <path d="M20 8v6M23 11h-6" />
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
