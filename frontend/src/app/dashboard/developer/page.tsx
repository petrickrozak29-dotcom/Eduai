"use client";

import { useEffect, useMemo, useState } from "react";
import DashboardShell from "@/components/layout/DashboardShell";
import { api, type DeveloperDashboardData } from "@/lib/api";

export default function DeveloperDashboardPage() {
  const [dashboard, setDashboard] = useState<DeveloperDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let active = true;
    api.get<DeveloperDashboardData>("/developer/dashboard").then((result) => {
      if (!active) return;
      if (result.success && result.data) {
        setDashboard(result.data);
        setMessage("");
      } else {
        setDashboard(null);
        setMessage(result.message || "Data dashboard belum tersedia.");
      }
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, []);

  const stats = useMemo(() => {
    const totals = dashboard?.totals;
    return [
      { label: "Total Guru", value: totals?.guru ?? 0, color: "bg-emerald-500" },
      { label: "Total Siswa", value: totals?.siswa ?? 0, color: "bg-blue-500" },
      { label: "Total Kelas", value: totals?.classes ?? dashboard?.platform.totalClasses ?? 0, color: "bg-amber-500" },
      { label: "Total Materi", value: totals?.materials ?? dashboard?.platform.totalMaterials ?? 0, color: "bg-rose-500" },
    ];
  }, [dashboard]);

  const quickStatus = [
    { title: "Server", status: dashboard?.monitoring.apiStatus === "healthy" ? "Online" : loading ? "Memuat" : "Periksa", dot: dashboard ? "bg-green-500" : "bg-amber-500" },
    { title: "Database", status: dashboard ? "Connected" : "Menunggu", dot: dashboard ? "bg-green-500" : "bg-amber-500" },
    { title: "AI Service", status: dashboard?.platform.aiQueue === "normal" ? "Ready" : "Ready", dot: "bg-green-500" },
    { title: "Aktivitas", status: `${dashboard?.monitoring.dailyActivity ?? 0} event`, dot: "bg-blue-500" },
  ];

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Dashboard Developer</h1>
          <p className="mt-1 text-sm font-bold text-slate-500">Panel kontrol sistem EduPath AI</p>
        </div>

        {message && (
          <div className="rounded-xl border-2 border-amber-300 bg-amber-50 p-4 text-sm font-bold text-amber-800">
            {message}
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.label}
              className="rounded-xl border-2 border-black bg-white p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
            >
              <div className={`mb-3 h-3 w-12 rounded-full ${item.color}`} />
              <p className="text-3xl font-black text-slate-900">{loading ? "..." : item.value}</p>
              <p className="mt-1 text-sm font-bold text-slate-500">{item.label}</p>
            </div>
          ))}
        </div>

        <div className="rounded-xl border-2 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-lg font-black text-slate-900">Status Sistem</h2>
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {quickStatus.map((item) => (
              <div key={item.title} className="flex items-center gap-3 rounded-lg bg-slate-50 p-3">
                <span className={`h-3 w-3 rounded-full ${item.dot}`} />
                <div>
                  <p className="text-sm font-black text-slate-900">{item.title}</p>
                  <p className="text-xs font-bold text-slate-500">{item.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border-2 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-black text-slate-900">User Terbaru</h2>
            <p className="text-xs font-bold text-slate-500">{dashboard?.recentUsers?.length ?? 0} akun</p>
          </div>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-xs font-black uppercase text-slate-500">
                  <th className="px-3 py-3">Nama</th>
                  <th className="px-3 py-3">Email</th>
                  <th className="px-3 py-3">Role</th>
                  <th className="px-3 py-3">Identitas</th>
                </tr>
              </thead>
              <tbody>
                {dashboard?.recentUsers && dashboard.recentUsers.length > 0 ? (
                  dashboard.recentUsers.map((user) => (
                    <tr key={user.id} className="border-b border-slate-100">
                      <td className="px-3 py-3 font-bold text-slate-950">{user.name}</td>
                      <td className="px-3 py-3 text-slate-600">{user.email}</td>
                      <td className="px-3 py-3">
                        <span className="rounded-lg bg-slate-100 px-3 py-1 text-xs font-black text-slate-700">{user.role}</span>
                      </td>
                      <td className="px-3 py-3 text-slate-600">{user.nip || user.nis || user.kelas || "-"}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-3 py-8 text-center font-bold text-slate-400">Belum ada user terdaftar</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
