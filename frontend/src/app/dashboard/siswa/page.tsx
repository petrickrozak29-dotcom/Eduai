"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import DashboardShell from "@/components/layout/DashboardShell";

export default function SiswaBeranda() {
  const stats = [
    { label: "Total XP", value: 0 },
    { label: "Quiz Selesai", value: 0 },
    { label: "Learning Index", value: "0%" },
    { label: "Streak", value: "0 hari" },
  ];

  const quickLinks = [
    { label: "Gabung Kelas", href: "/dashboard/siswa/learning-path" },
    { label: "AI Assistant", href: "/dashboard/siswa/ai-assistant" },
    { label: "Materi", href: "/dashboard/siswa/materi" },
    { label: "Quiz", href: "/dashboard/siswa/quiz" },
  ];

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-black text-slate-950">Beranda</h1>
          <p className="mt-1 text-sm font-bold text-slate-500">Selamat datang di EduPath AI</p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="rounded-xl border-2 border-slate-200 bg-white p-4 shadow-lg"
            >
              <p className="mt-2 text-2xl font-black text-slate-950">{stat.value}</p>
              <p className="mt-1 text-xs font-bold text-slate-500">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="rounded-xl border-2 border-slate-200 bg-white p-8 text-center shadow-lg"
        >
          <p className="text-5xl font-black text-slate-300">0</p>
          <p className="mt-3 text-lg font-black text-slate-950">Belum ada aktivitas belajar</p>
          <p className="mt-1 text-sm font-bold text-slate-500">Gabung kelas untuk mulai belajar.</p>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {quickLinks.map((link) => (
            <Link key={link.label} href={link.href}>
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="rounded-xl border-2 border-slate-200 bg-white p-4 text-center shadow-lg transition hover:bg-slate-50 hover:shadow-xl"
              >
                <p className="text-sm font-bold text-slate-950">{link.label}</p>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
