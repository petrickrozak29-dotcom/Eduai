"use client";

import DashboardShell from "@/components/layout/DashboardShell";
import { useAuth } from "@/context/AuthContext";
import { getMockLearningPaths } from "@/lib/api";
import { motion } from "framer-motion";
import Link from "next/link";

export default function SiswaDashboard() {
  const { user } = useAuth();
  const paths = getMockLearningPaths();

  const stats = [
    { label: "XP Minggu Ini", value: "1.250", tone: "bg-red-50 text-red-600" },
    { label: "Streak", value: "7 Hari", tone: "bg-yellow-50 text-yellow-700" },
    { label: "Learning Index", value: "88", tone: "bg-emerald-50 text-emerald-600" },
    { label: "Kuis Selesai", value: "12", tone: "bg-blue-50 text-blue-600" },
  ];

  return (
    <DashboardShell>
      <div className="space-y-5">
        {/* Header */}
        <header className="rounded-lg border border-white/70 bg-white/72 p-5 shadow-[0_24px_70px_rgba(15,23,42,0.08)] backdrop-blur-2xl">
          <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
            <div>
              <p className="text-sm font-black uppercase text-red-600">Gamified Learning Hub</p>
              <h2 className="mt-2 text-4xl font-black text-slate-950 sm:text-5xl">
                Halo, {user?.name?.split(" ")[0] || "Siswa"}! 👋
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
                Pretest, materi adaptif, XP, streak, kuis, dan Learning Index — semua dalam satu ruang belajar personal.
              </p>
            </div>
            <div className="rounded-lg bg-gradient-to-br from-red-600 via-yellow-400 to-emerald-500 p-5 text-white">
              <p className="text-sm font-black text-white/80">Status Belajar</p>
              <div className="mt-5 h-3 overflow-hidden rounded-sm bg-white/25">
                <motion.div initial={{ width: 0 }} animate={{ width: "75%" }} className="h-full rounded-sm bg-white" />
              </div>
              <div className="mt-5 grid grid-cols-3 gap-2 text-center">
                {["Learning", "Active", "Sync"].map((item) => (
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
          {/* Learning Paths */}
          <section className="rounded-lg border border-white/70 bg-white/72 p-5 shadow-[0_24px_70px_rgba(15,23,42,0.08)] backdrop-blur-2xl">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase text-red-600">Learning Path</p>
                <h3 className="text-2xl font-black text-slate-950">Jalur Belajarmu</h3>
              </div>
              <Link href="/dashboard/siswa/learning-path" className="rounded-lg bg-slate-950 px-4 py-3 text-sm font-black text-white shadow-lg">
                Lihat Semua
              </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {paths.slice(0, 2).map((path) => (
                <Link key={path.id} href="/dashboard/siswa/learning-path" className="block">
                  <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{path.icon}</span>
                          <div>
                            <p className="text-sm font-black text-slate-950">{path.subject}</p>
                            <p className="text-xs font-bold text-slate-500">{path.bab}</p>
                          </div>
                        </div>
                        <div className="mt-4 flex items-center gap-2">
                          <span className={`rounded-full px-3 py-1 text-xs font-black ${path.status === "aktif" ? "bg-emerald-100 text-emerald-700" : "bg-blue-100 text-blue-700"}`}>
                            {path.status === "aktif" ? "Aktif" : "Selesai"}
                          </span>
                          <span className="text-xs font-black text-slate-500">{path.progress}%</span>
                        </div>
                      </div>
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-lg font-black text-slate-700">
                        {path.progress}%
                      </div>
                    </div>
                    <div className="mt-4 h-2 overflow-hidden rounded-sm bg-slate-100">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${path.progress}%` }}
                        className="h-full rounded-sm bg-gradient-to-r from-red-500 to-emerald-500"
                      />
                    </div>
                  </article>
                </Link>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="mt-6 rounded-lg border border-slate-200 bg-white p-4">
              <p className="mb-3 text-sm font-black text-slate-950">Aktivitas Terakhir</p>
              <div className="grid gap-3">
                {[
                  { icon: "📖", title: "Materi Visual - Sistem Pernapasan", sub: "Biologi • 75%", color: "bg-red-50" },
                  { icon: "📝", title: "Kuis Fungsi Kuadrat", sub: "Matematika • Nilai 82", color: "bg-yellow-50" },
                  { icon: "🔬", title: "Materi Kinestetik - Gerak Lurus", sub: "Fisika • 45%", color: "bg-blue-50" },
                ].map((item) => (
                  <div key={item.title} className={`flex items-center gap-3 rounded-lg ${item.color} p-3`}>
                    <span className="text-xl">{item.icon}</span>
                    <div>
                      <p className="text-sm font-black text-slate-950">{item.title}</p>
                      <p className="text-xs font-bold text-slate-500">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Sidebar */}
          <aside className="space-y-5">
            <div className="rounded-lg border border-white/70 bg-white/72 p-5 shadow-[0_24px_70px_rgba(15,23,42,0.08)] backdrop-blur-2xl">
              <p className="text-xs font-black uppercase text-emerald-600">Rekomendasi</p>
              <h3 className="mt-1 text-2xl font-black text-slate-950">Fokus Hari Ini</h3>
              <div className="mt-4 space-y-3">
                <div className="rounded-lg bg-red-50 p-4 text-sm font-bold leading-6 text-red-700">
                  🎯 Ulang materi visual Bab 2
                </div>
                <div className="rounded-lg bg-yellow-50 p-4 text-sm font-bold leading-6 text-yellow-700">
                  ✏️ Selesaikan latihan soal cerita
                </div>
                <div className="rounded-lg bg-blue-50 p-4 text-sm font-bold leading-6 text-blue-700">
                  💬 Ikuti forum diskusi kelas X IPA
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-white/70 bg-slate-950 p-5 text-white shadow-[0_24px_70px_rgba(15,23,42,0.18)]">
              <p className="text-xs font-black uppercase text-yellow-300">Badge & Pencapaian</p>
              <h3 className="mt-1 text-2xl font-black">3 Badge 🏆</h3>
              <div className="mt-4 space-y-3">
                {["Pelajar Aktif", "Kuis Perfect", "Streak 7 Hari"].map((badge) => (
                  <div key={badge} className="flex items-center gap-3 rounded-lg bg-white/10 p-3">
                    <span className="text-xl">⭐</span>
                    <span className="text-sm font-black">{badge}</span>
                  </div>
                ))}
              </div>
              <Link href="/dashboard/siswa/progress" className="mt-4 inline-flex h-10 items-center gap-2 rounded-lg bg-white/15 px-4 text-sm font-black text-white hover:bg-white/25">
                Lihat Progress
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </DashboardShell>
  );
}
