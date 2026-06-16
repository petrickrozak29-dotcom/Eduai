"use client";

import DashboardShell from "@/components/layout/DashboardShell";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import Link from "next/link";

export default function DeveloperDashboard() {
  const { user } = useAuth();

  const stats = [
    { label: "Total Guru", value: "128", tone: "bg-blue-50 text-blue-600", icon: "👨‍🏫" },
    { label: "Total Siswa", value: "2.4k", tone: "bg-emerald-50 text-emerald-600", icon: "👩‍🎓" },
    { label: "AI Usage (hari ini)", value: "18k", tone: "bg-red-50 text-red-600", icon: "🤖" },
    { label: "Uptime", value: "99.8%", tone: "bg-yellow-50 text-yellow-700", icon: "⚡" },
  ];

  const quickLinks = [
    { label: "Manajemen Guru", href: "/dashboard/developer/manajemen-guru", desc: "Tambah, edit, hapus guru", color: "from-blue-500 to-cyan-400" },
    { label: "Manajemen Siswa", href: "/dashboard/developer/manajemen-siswa", desc: "Tambah, edit, hapus siswa", color: "from-emerald-500 to-green-400" },
    { label: "Manajemen Developer", href: "/dashboard/developer/manajemen-developer", desc: "Kelola akses developer", color: "from-slate-700 to-slate-900" },
    { label: "Manajemen Materi", href: "/dashboard/developer/manajemen-materi", desc: "Semua materi platform", color: "from-red-500 to-rose-400" },
    { label: "Manajemen Quiz", href: "/dashboard/developer/manajemen-quiz", desc: "Bank soal & kuis", color: "from-yellow-400 to-orange-400" },
    { label: "Event & Forum", href: "/dashboard/developer/event-forum", desc: "Kelola event & diskusi", color: "from-indigo-500 to-purple-500" },
  ];

  return (
    <DashboardShell>
      <div className="space-y-5">
        {/* Header */}
        <header className="rounded-lg border border-white/70 bg-white/72 p-5 shadow-[0_24px_70px_rgba(15,23,42,0.08)] backdrop-blur-2xl">
          <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
            <div>
              <p className="text-sm font-black uppercase text-blue-600">Platform Control Center</p>
              <h2 className="mt-2 text-4xl font-black text-slate-950 sm:text-5xl">
                Halo, {user?.name?.split(" ")[0] || "Developer"}! 🛡️
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
                Panel kontrol platform untuk monitoring guru, siswa, materi, quiz, analytics, dan AI usage. Kelola seluruh ekosistem EduPath AI.
              </p>
            </div>
            <div className="rounded-lg bg-gradient-to-br from-slate-950 via-blue-600 to-emerald-500 p-5 text-white shadow-lg">
              <p className="text-sm font-black text-white/80">Sistem Status</p>
              <div className="mt-5 h-3 overflow-hidden rounded-sm bg-white/25">
                <motion.div initial={{ width: 0 }} animate={{ width: "88%" }} className="h-full rounded-sm bg-white" />
              </div>
              <div className="mt-5 grid grid-cols-3 gap-2 text-center">
                {["Optimal", "Stabil", "Terpantau"].map((item) => (
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
              <div className="flex items-center justify-between">
                <p className="text-sm font-black opacity-80">{stat.label}</p>
                <span className="text-2xl">{stat.icon}</span>
              </div>
              <p className="mt-2 text-3xl font-black">{stat.value}</p>
            </article>
          ))}
        </section>

        {/* Quick Links Grid */}
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {quickLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <article className={`rounded-lg bg-gradient-to-br ${link.color} p-5 text-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl`}>
                <p className="text-lg font-black">{link.label}</p>
                <p className="mt-2 text-sm font-semibold text-white/80">{link.desc}</p>
                <div className="mt-4 flex items-center gap-2 text-sm font-black text-white/70">
                  <span>Kelola →</span>
                </div>
              </article>
            </Link>
          ))}
        </section>

        {/* Analytics Preview */}
        <div className="grid gap-5 xl:grid-cols-[1fr_360px]">
          <section className="rounded-lg border border-white/70 bg-white/72 p-5 shadow-[0_24px_70px_rgba(15,23,42,0.08)] backdrop-blur-2xl">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase text-blue-600">Analytics Platform</p>
                <h3 className="text-2xl font-black text-slate-950">Ringkasan Platform</h3>
              </div>
              <Link href="/dashboard/developer/analytics" className="rounded-lg bg-slate-950 px-4 py-3 text-sm font-black text-white shadow-lg">
                Analytics Detail
              </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {[
                { label: "Rata-rata Learning Index", value: "81%", trend: "+3%", color: "from-emerald-500 to-green-400" },
                { label: "Siswa Aktif Harian", value: "2.1k", trend: "+12%", color: "from-blue-500 to-cyan-400" },
                { label: "Materi Dipublikasi", value: "342", trend: "+18", color: "from-red-500 to-rose-400" },
                { label: "Quiz Terselesaikan", value: "1.8k", trend: "+8%", color: "from-yellow-400 to-orange-400" },
              ].map((item) => (
                <div key={item.label} className={`rounded-lg bg-gradient-to-br ${item.color} p-4 text-white`}>
                  <p className="text-sm font-black text-white/80">{item.label}</p>
                  <div className="mt-2 flex items-end justify-between">
                    <p className="text-3xl font-black">{item.value}</p>
                    <span className="text-sm font-black text-white/80">{item.trend} ↑</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Bar chart mock */}
            <div className="mt-5 rounded-lg border border-slate-200 bg-white p-4">
              <p className="mb-3 text-sm font-black text-slate-950">Aktivitas 7 Hari Terakhir</p>
              <div className="grid h-36 grid-cols-7 items-end gap-2">
                {[65, 72, 58, 84, 76, 92, 88].map((height, index) => (
                  <div key={index} className="flex flex-col items-center gap-1">
                    <div className="w-full rounded-sm bg-gradient-to-t from-blue-600 to-emerald-400" style={{ height: `${height}%` }} />
                    <span className="text-[10px] font-bold text-slate-500">{["Sen","Sel","Rab","Kam","Jum","Sab","Min"][index]}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* System Status */}
          <aside className="space-y-5">
            <div className="rounded-lg border border-white/70 bg-white/72 p-5 shadow-[0_24px_70px_rgba(15,23,42,0.08)] backdrop-blur-2xl">
              <p className="text-xs font-black uppercase text-emerald-600">Monitoring Sistem</p>
              <h3 className="mt-1 text-2xl font-black text-slate-950">System Health</h3>
              <div className="mt-4 space-y-3">
                {[
                  { label: "API Server", status: "Online", latency: "45ms", color: "bg-emerald-100 text-emerald-700" },
                  { label: "Database", status: "Connected", latency: "12ms", color: "bg-emerald-100 text-emerald-700" },
                  { label: "AI Service", status: "Active", latency: "1.2s", color: "bg-blue-100 text-blue-700" },
                  { label: "Storage", status: "68% used", latency: "34GB/50GB", color: "bg-yellow-100 text-yellow-700" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between rounded-lg border border-slate-100 bg-white p-3">
                    <div>
                      <p className="text-sm font-black text-slate-950">{item.label}</p>
                      <p className="text-xs font-bold text-slate-500">{item.latency}</p>
                    </div>
                    <span className={`rounded-lg px-3 py-1 text-xs font-black ${item.color}`}>{item.status}</span>
                  </div>
                ))}
              </div>
              <Link href="/dashboard/developer/monitoring-sistem" className="mt-4 inline-flex h-10 items-center gap-2 rounded-lg bg-slate-950 px-4 text-sm font-black text-white hover:bg-slate-800">
                Detail Monitoring
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </DashboardShell>
  );
}
