"use client";

import DashboardShell from "@/components/layout/DashboardShell";

const stats = [
  { label: "Total Kelas", value: 0, color: "border-sky-500 bg-sky-50" },
  { label: "Total Siswa", value: 0, color: "border-emerald-500 bg-emerald-50" },
  { label: "Materi Tersimpan", value: 0, color: "border-amber-500 bg-amber-50" },
  { label: "Quiz Terbit", value: 0, color: "border-purple-500 bg-purple-50" },
];

export default function GuruBerandaPage() {
  return (
    <DashboardShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Beranda</h1>
          <p className="mt-1 text-sm font-bold text-slate-500">Selamat datang di dashboard Guru EduPath AI</p>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((item) => (
            <div key={item.label} className={`rounded-xl border-2 border-black bg-white p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] ${item.color}`}>
              <p className="text-3xl font-black text-slate-900">{item.value}</p>
              <p className="mt-1 text-sm font-bold text-slate-500">{item.label}</p>
            </div>
          ))}
        </div>

        <div className="rounded-xl border-2 border-black bg-white p-8 text-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-5xl font-black text-slate-300">0</p>
          <h2 className="mt-4 text-2xl font-black text-slate-900">Belum Ada Data</h2>
          <p className="mt-2 text-sm font-bold text-slate-500">Silakan mulai dengan membuat kelas baru.</p>
        </div>
      </div>
    </DashboardShell>
  );
}
