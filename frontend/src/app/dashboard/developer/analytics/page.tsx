"use client";

import DashboardShell from "@/components/layout/DashboardShell";

export default function DeveloperAnalyticsPage() {
  const metrics = [
    { label: "Total Pengguna", value: "2.528", trend: "+12%", color: "from-blue-500 to-cyan-400" },
    { label: "Siswa Aktif", value: "2.184", trend: "+8%", color: "from-emerald-500 to-green-400" },
    { label: "Guru Aktif", value: "128", trend: "+5%", color: "from-yellow-400 to-orange-400" },
    { label: "Rata-rata LI", value: "81%", trend: "+3%", color: "from-red-500 to-rose-400" },
  ];

  const weeklyData = [
    { day: "Sen", siswa: 420, guru: 18, materi: 12 },
    { day: "Sel", siswa: 480, guru: 22, materi: 15 },
    { day: "Rab", siswa: 390, guru: 15, materi: 8 },
    { day: "Kam", siswa: 520, guru: 25, materi: 18 },
    { day: "Jum", siswa: 460, guru: 20, materi: 14 },
    { day: "Sab", siswa: 280, guru: 8, materi: 5 },
    { day: "Min", siswa: 180, guru: 4, materi: 2 },
  ];

  const topSubjects = [
    { name: "Matematika", students: 420, avgLI: 82 },
    { name: "Biologi", students: 380, avgLI: 78 },
    { name: "Fisika", students: 290, avgLI: 76 },
    { name: "Kimia", students: 260, avgLI: 74 },
    { name: "B. Indonesia", students: 350, avgLI: 80 },
  ];

  return (
    <DashboardShell>
      <div className="space-y-5">
        <header className="rounded-lg border border-white/70 bg-white/72 p-5 shadow backdrop-blur-2xl">
          <p className="text-sm font-black uppercase text-blue-600">Developer</p>
          <h2 className="mt-2 text-4xl font-black text-slate-950">Analytics Platform 📊</h2>
          <p className="mt-2 text-base text-slate-600">Ringkasan aktivitas dan performa platform.</p>
        </header>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {metrics.map((m) => (
            <div key={m.label} className={`rounded-lg bg-gradient-to-br ${m.color} p-5 text-white shadow-lg`}>
              <p className="text-sm font-black text-white/80">{m.label}</p>
              <div className="mt-2 flex items-end justify-between">
                <p className="text-3xl font-black">{m.value}</p>
                <span className="text-sm font-black text-white/80">{m.trend} ↑</span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid gap-5 xl:grid-cols-[1fr_360px]">
          <div className="rounded-lg border border-white/70 bg-white/72 p-5 shadow backdrop-blur-2xl">
            <p className="text-sm font-black text-slate-950">Aktivitas 7 Hari Terakhir</p>
            <div className="mt-5 overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-xs font-black uppercase text-slate-500">
                    <th className="pb-3 pr-4">Hari</th>
                    <th className="pb-3 pr-4">Siswa Aktif</th>
                    <th className="pb-3 pr-4">Guru Aktif</th>
                    <th className="pb-3">Materi Dibuat</th>
                  </tr>
                </thead>
                <tbody>
                  {weeklyData.map((d) => (
                    <tr key={d.day} className="border-b border-slate-100">
                      <td className="py-3 pr-4 font-bold text-slate-950">{d.day}</td>
                      <td className="py-3 pr-4">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-24 overflow-hidden rounded-sm bg-slate-100">
                            <div className="h-full rounded-sm bg-gradient-to-r from-blue-500 to-cyan-400" style={{ width: `${(d.siswa / 520) * 100}%` }} />
                          </div>
                          <span className="text-xs font-black">{d.siswa}</span>
                        </div>
                      </td>
                      <td className="py-3 pr-4">{d.guru}</td>
                      <td className="py-3">{d.materi}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-5">
            <div className="rounded-lg border border-white/70 bg-white/72 p-5 shadow backdrop-blur-2xl">
              <p className="text-xs font-black uppercase text-emerald-600">Top Mapel</p>
              <div className="mt-4 space-y-3">
                {topSubjects.map((s) => (
                  <div key={s.name} className="flex items-center justify-between rounded-lg border border-slate-100 bg-white p-3">
                    <div>
                      <p className="text-sm font-black text-slate-950">{s.name}</p>
                      <p className="text-xs font-bold text-slate-500">{s.students} siswa</p>
                    </div>
                    <span className="text-sm font-black text-emerald-600">{s.avgLI}% LI</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-white/70 bg-slate-950 p-5 text-white shadow">
              <p className="text-xs font-black uppercase text-yellow-300">AI Usage</p>
              <p className="mt-2 text-3xl font-black">18.240</p>
              <p className="text-sm font-bold text-slate-300">kali generate hari ini</p>
              <div className="mt-4 h-2 overflow-hidden rounded-sm bg-white/20">
                <div className="h-full w-3/4 rounded-sm bg-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
