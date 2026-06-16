"use client";

import DashboardShell from "@/components/layout/DashboardShell";
import { useState } from "react";

export default function MonitoringSistemPage() {
  const services = [
    { name: "API Server", status: "healthy", latency: "45ms", uptime: "99.9%" },
    { name: "Database", status: "connected", latency: "12ms", uptime: "99.8%" },
    { name: "AI Service", status: "active", latency: "1.2s", uptime: "98.5%" },
    { name: "Storage", status: "healthy", latency: "34ms", uptime: "99.9%" },
    { name: "Email Service", status: "active", latency: "280ms", uptime: "97.2%" },
    { name: "Redis Cache", status: "connected", latency: "3ms", uptime: "99.9%" },
  ];

  const [logs] = useState([
    { time: "15:32:21", action: "Login", user: "Developer EduPath", detail: "Dashboard developer diakses" },
    { time: "15:28:10", action: "Create", user: "Budi Guru", detail: "Membuat materi baru: Sistem Pernapasan" },
    { time: "15:22:45", action: "Delete", user: "Developer", detail: "Menghapus quiz: Kuis Bab 2" },
    { time: "15:18:33", action: "Update", user: "Siti Aisyah", detail: "Memperbarui konten materi Fungsi Kuadrat" },
    { time: "15:10:12", action: "Register", user: "Ani Putri", detail: "Siswa baru mendaftar" },
    { time: "14:55:00", action: "Generate AI", user: "Ahmad Rizal", detail: "Generate materi kinestetik Fisika" },
    { time: "14:30:22", action: "Login", user: "Siswa Demo", detail: "Siswa login ke dashboard" },
  ]);

  return (
    <DashboardShell>
      <div className="space-y-5">
        <header className="rounded-lg border border-white/70 bg-white/72 p-5 shadow backdrop-blur-2xl">
          <p className="text-sm font-black uppercase text-cyan-600">Developer</p>
          <h2 className="mt-2 text-4xl font-black text-slate-950">Monitoring Sistem ⚡</h2>
          <p className="mt-2 text-base text-slate-600">Status layanan dan log aktivitas platform.</p>
        </header>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {services.map((s) => (
            <div key={s.name} className="flex items-center justify-between rounded-lg border border-white/70 bg-white p-5 shadow-sm">
              <div>
                <p className="font-black text-slate-950">{s.name}</p>
                <div className="mt-1 flex items-center gap-3 text-xs font-bold text-slate-500">
                  <span>{s.latency}</span>
                  <span>Uptime: {s.uptime}</span>
                </div>
              </div>
              <span className={`rounded-lg px-3 py-1.5 text-xs font-black ${s.status === "healthy" || s.status === "active" || s.status === "connected" ? "bg-emerald-100 text-emerald-700" : "bg-yellow-100 text-yellow-700"}`}>
                {s.status}
              </span>
            </div>
          ))}
        </div>

        <div className="rounded-lg border border-white/70 bg-white/72 p-5 shadow backdrop-blur-2xl">
          <p className="mb-4 text-sm font-black text-slate-950">Log Aktivitas Terbaru</p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-xs font-black uppercase text-slate-500">
                  <th className="pb-3 pr-4">Waktu</th><th className="pb-3 pr-4">Aksi</th><th className="pb-3 pr-4">User</th><th className="pb-3">Detail</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log, i) => (
                  <tr key={i} className="border-b border-slate-100">
                    <td className="py-3 pr-4 font-mono text-xs text-slate-500">{log.time}</td>
                    <td className="py-3 pr-4"><span className="rounded bg-slate-100 px-2 py-0.5 text-xs font-black">{log.action}</span></td>
                    <td className="py-3 pr-4 font-bold text-slate-950">{log.user}</td>
                    <td className="py-3 text-slate-600">{log.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
