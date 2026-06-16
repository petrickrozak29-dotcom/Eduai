"use client";

import DashboardShell from "@/components/layout/DashboardShell";
import { useAuth } from "@/context/AuthContext";
import { getMockClasses } from "@/lib/api";
import { motion } from "framer-motion";
import Link from "next/link";

export default function GuruDashboard() {
  const { user } = useAuth();
  const classes = getMockClasses();

  const stats = [
    { label: "Kelas Aktif", value: "8", tone: "bg-emerald-50 text-emerald-600" },
    { label: "Materi AI", value: "24", tone: "bg-blue-50 text-blue-600" },
    { label: "Perlu Review", value: "6", tone: "bg-yellow-50 text-yellow-700" },
    { label: "Publikasi", value: "18", tone: "bg-red-50 text-red-600" },
  ];

  return (
    <DashboardShell>
      <div className="space-y-5">
        {/* Header */}
        <header className="rounded-lg border border-white/70 bg-white/72 p-5 shadow-[0_24px_70px_rgba(15,23,42,0.08)] backdrop-blur-2xl">
          <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
            <div>
              <p className="text-sm font-black uppercase text-emerald-600">AI Teaching Workspace</p>
              <h2 className="mt-2 text-4xl font-black text-slate-950 sm:text-5xl">
                Selamat datang, {user?.name?.split(" ")[0] || "Guru"}! 👋
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
                Generate materi AI, review, publish, pantau performa kelas, dan kelola pembelajaran adaptif siswa.
              </p>
            </div>
            <div className="rounded-lg bg-gradient-to-br from-emerald-500 via-blue-500 to-cyan-400 p-5 text-white shadow-lg">
              <p className="text-sm font-black text-white/80">Workspace Status</p>
              <div className="mt-5 h-3 overflow-hidden rounded-sm bg-white/25">
                <motion.div initial={{ width: 0 }} animate={{ width: "68%" }} className="h-full rounded-sm bg-white" />
              </div>
              <div className="mt-5 grid grid-cols-3 gap-2 text-center">
                {["Live", "Sync", "AI Ready"].map((item) => (
                  <span key={item} className="rounded-lg bg-white/18 px-2 py-3 text-sm font-black">{item}</span>
                ))}
              </div>
            </div>
          </div>
        </header>

        {/* Stats */}
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <article key={stat.label} className={`rounded-lg border border-white/70 p-5 shadow-sm ${stat.tone}`}>
              <p className="text-sm font-black opacity-80">{stat.label}</p>
              <p className="mt-2 text-3xl font-black">{stat.value}</p>
            </article>
          ))}
        </section>

        <div className="grid gap-5 xl:grid-cols-[1fr_360px]">
          {/* Kelas Saya */}
          <section className="rounded-lg border border-white/70 bg-white/72 p-5 shadow-[0_24px_70px_rgba(15,23,42,0.08)] backdrop-blur-2xl">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase text-emerald-600">Kelas Saya</p>
                <h3 className="text-2xl font-black text-slate-950">Kelas Aktif</h3>
              </div>
              <Link href="/dashboard/guru/kelas-saya" className="rounded-lg bg-slate-950 px-4 py-3 text-sm font-black text-white shadow-lg">
                Kelola Kelas
              </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {classes.slice(0, 2).map((cls) => (
                <Link key={cls.id} href="/dashboard/guru/kelas-saya" className="block">
                  <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-lg font-black text-slate-950">{cls.name}</p>
                        <p className="text-sm font-bold text-slate-500">{cls.subject}</p>
                      </div>
                      <span className={`rounded-lg px-3 py-1 text-xs font-black ${
                        cls.status === "aktif" ? "bg-emerald-100 text-emerald-700" : "bg-yellow-100 text-yellow-700"
                      }`}>
                        {cls.status === "aktif" ? "Aktif" : "Review"}
                      </span>
                    </div>
                    <div className="mt-4 flex items-center gap-4 text-sm font-bold text-slate-600">
                      <span>👥 {cls.students} siswa</span>
                      <span>📊 {cls.avgIndex} LI</span>
                    </div>
                    <div className="mt-3 h-2 overflow-hidden rounded-sm bg-slate-100">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${cls.avgIndex}%` }}
                        className="h-full rounded-sm bg-gradient-to-r from-emerald-500 to-blue-500"
                      />
                    </div>
                  </article>
                </Link>
              ))}
            </div>

            {/* Quick actions */}
            <div className="mt-6 grid gap-3 md:grid-cols-2">
              <Link href="/dashboard/guru/ai-generate-materi" className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600 text-lg">🤖</span>
                <div>
                  <p className="text-sm font-black text-slate-950">Generate Materi AI</p>
                  <p className="text-xs font-bold text-slate-500">Masukkan acuan, AI buat konten</p>
                </div>
              </Link>
              <Link href="/dashboard/guru/ai-generate-quiz" className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 text-lg">📝</span>
                <div>
                  <p className="text-sm font-black text-slate-950">Generate Quiz AI</p>
                  <p className="text-xs font-bold text-slate-500">Buat kuis otomatis dari materi</p>
                </div>
              </Link>
            </div>
          </section>

          {/* Sidebar */}
          <aside className="space-y-5">
            <div className="rounded-lg border border-white/70 bg-white/72 p-5 shadow-[0_24px_70px_rgba(15,23,42,0.08)] backdrop-blur-2xl">
              <p className="text-xs font-black uppercase text-emerald-600">Prioritas</p>
              <h3 className="mt-1 text-2xl font-black text-slate-950">Fokus Hari Ini</h3>
              <div className="mt-4 space-y-3">
                <div className="rounded-lg bg-blue-50 p-4 text-sm font-bold leading-6 text-blue-700">
                  🎯 Review materi kinestetik
                </div>
                <div className="rounded-lg bg-emerald-50 p-4 text-sm font-bold leading-6 text-emerald-700">
                  📅 Publish kuis akhir Bab 3
                </div>
                <div className="rounded-lg bg-yellow-50 p-4 text-sm font-bold leading-6 text-yellow-700">
                  👀 Pantau siswa Learning Index rendah
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-white/70 bg-slate-950 p-5 text-white shadow-[0_24px_70px_rgba(15,23,42,0.18)]">
              <p className="text-xs font-black uppercase text-yellow-300">AI Generation Stats</p>
              <h3 className="mt-1 text-2xl font-black">Hari Ini</h3>
              <div className="mt-4 space-y-3">
                {[
                  { label: "Generate Materi", value: "5", color: "bg-blue-500" },
                  { label: "Generate Quiz", value: "3", color: "bg-emerald-500" },
                  { label: "Review Pending", value: "6", color: "bg-yellow-500" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-300">{item.label}</span>
                    <span className={`rounded-lg ${item.color} px-3 py-1 text-sm font-black`}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </DashboardShell>
  );
}
