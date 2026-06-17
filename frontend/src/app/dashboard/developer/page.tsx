"use client";

import DashboardShell from "@/components/layout/DashboardShell";

const stats = [
  { label: "Total Guru", value: 0, color: "bg-emerald-500" },
  { label: "Total Siswa", value: 0, color: "bg-blue-500" },
  { label: "Total Kelas", value: 0, color: "bg-amber-500" },
  { label: "Total Materi", value: 0, color: "bg-rose-500" },
];

const quickStatus = [
  { title: "API Server", status: "Online", dot: "bg-green-500" },
  { title: "Database", status: "Connected", dot: "bg-green-500" },
  { title: "AI Service", status: "Ready", dot: "bg-green-500" },
  { title: "Storage", status: "Active", dot: "bg-green-500" },
];

export default function DeveloperDashboardPage() {
  return (
    <DashboardShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Dashboard Developer</h1>
          <p className="mt-1 text-sm font-bold text-slate-500">
            Panel kontrol sistem EduPath AI
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-xl border-2 border-black bg-white p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
            >
              <div className={`mb-3 h-3 w-12 rounded-full ${s.color}`} />
              <p className="text-3xl font-black text-slate-900">{s.value}</p>
              <p className="mt-1 text-sm font-bold text-slate-500">{s.label}</p>
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

        <div className="rounded-xl border-2 border-black bg-amber-50 p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-center text-base font-bold text-slate-600">
            Semua data akan terisi setelah integrasi API real-time
          </p>
        </div>
      </div>
    </DashboardShell>
  );
}