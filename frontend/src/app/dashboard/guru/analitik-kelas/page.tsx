"use client";

import DashboardShell from "@/components/layout/DashboardShell";
import { getMockClasses } from "@/lib/api";
import { useState } from "react";

export default function AnalitikKelasPage() {
  const classes = getMockClasses();
  const [selectedClass, setSelectedClass] = useState(classes[0].id);

  const activeClass = classes.find((c) => c.id === selectedClass) || classes[0];

  const weeklyData = [
    { day: "Sen", avgLI: 76, completion: 65, active: 28 },
    { day: "Sel", avgLI: 78, completion: 72, active: 30 },
    { day: "Rab", avgLI: 74, completion: 60, active: 26 },
    { day: "Kam", avgLI: 80, completion: 78, active: 31 },
    { day: "Jum", avgLI: 82, completion: 75, active: 29 },
    { day: "Sab", avgLI: 70, completion: 45, active: 15 },
    { day: "Min", avgLI: 65, completion: 30, active: 8 },
  ];

  return (
    <DashboardShell>
      <div className="space-y-5">
        <header className="rounded-lg border border-white/70 bg-white/72 p-5 shadow backdrop-blur-2xl">
          <p className="text-sm font-black uppercase text-indigo-600">Analitik</p>
          <h2 className="mt-2 text-4xl font-black text-slate-950 sm:text-5xl">Analitik Kelas 📊</h2>
          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
            Pantau performa kelas secara real-time — Learning Index, tingkat penyelesaian, dan aktivitas siswa.
          </p>
        </header>

        <div className="grid gap-5 xl:grid-cols-[280px_1fr]">
          <div className="rounded-lg border border-white/70 bg-white/72 p-4 shadow backdrop-blur-2xl">
            <p className="text-xs font-black uppercase text-slate-500 mb-3">Pilih Kelas</p>
            <div className="space-y-2">
              {classes.map((cls) => (
                <button
                  key={cls.id}
                  onClick={() => setSelectedClass(cls.id)}
                  className={`w-full rounded-lg border p-3 text-left transition ${selectedClass === cls.id ? "border-indigo-200 bg-indigo-50 shadow-sm" : "border-slate-200 bg-white hover:border-slate-300"}`}
                >
                  <p className="text-sm font-black text-slate-950">{cls.name}</p>
                  <p className="text-xs font-bold text-slate-500">{cls.subject}</p>
                  <div className="mt-2 flex items-center gap-2 text-xs font-bold text-slate-500">
                    <span>👥 {cls.students}</span>
                    <span>📊 {cls.avgIndex}%</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            {/* Metrics */}
            <div className="grid gap-4 md:grid-cols-3">
              {[
                { label: "Rata-rata Learning Index", value: `${activeClass.avgIndex}%`, trend: "+3%", color: "from-indigo-500 to-blue-400" },
                { label: "Tingkat Penyelesaian", value: "72%", trend: "+8%", color: "from-emerald-500 to-green-400" },
                { label: "Siswa Aktif", value: `${activeClass.students}`, trend: "100%", color: "from-yellow-400 to-orange-400" },
              ].map((m) => (
                <div key={m.label} className={`rounded-lg bg-gradient-to-br ${m.color} p-4 text-white shadow`}>
                  <p className="text-xs font-black text-white/80">{m.label}</p>
                  <p className="mt-2 text-3xl font-black">{m.value}</p>
                  <p className="text-xs font-black text-white/80">{m.trend} ↑</p>
                </div>
              ))}
            </div>

            {/* Weekly Chart */}
            <div className="rounded-lg border border-white/70 bg-white/72 p-5 shadow backdrop-blur-2xl">
              <p className="text-sm font-black text-slate-950">Aktivitas 7 Hari - {activeClass.name}</p>
              <div className="mt-5 overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 text-xs font-black uppercase text-slate-500">
                      <th className="pb-3 pr-4">Hari</th>
                      <th className="pb-3 pr-4">Rata-rata LI</th>
                      <th className="pb-3 pr-4">Penyelesaian</th>
                      <th className="pb-3">Siswa Aktif</th>
                    </tr>
                  </thead>
                  <tbody>
                    {weeklyData.map((d) => (
                      <tr key={d.day} className="border-b border-slate-100">
                        <td className="py-3 pr-4 font-bold text-slate-950">{d.day}</td>
                        <td className="py-3 pr-4">
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-20 overflow-hidden rounded-sm bg-slate-100">
                              <div className="h-full rounded-sm bg-gradient-to-r from-indigo-500 to-blue-400" style={{ width: `${d.avgLI}%` }} />
                            </div>
                            <span className="text-xs font-black">{d.avgLI}%</span>
                          </div>
                        </td>
                        <td className="py-3 pr-4">
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-20 overflow-hidden rounded-sm bg-slate-100">
                              <div className="h-full rounded-sm bg-gradient-to-r from-emerald-500 to-green-400" style={{ width: `${d.completion}%` }} />
                            </div>
                            <span className="text-xs font-black">{d.completion}%</span>
                          </div>
                        </td>
                        <td className="py-3 font-bold">{d.active}/{activeClass.students}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Distribution */}
            <div className="grid gap-5 md:grid-cols-2">
              <div className="rounded-lg border border-white/70 bg-white/72 p-5 shadow backdrop-blur-2xl">
                <p className="text-sm font-black text-slate-950">Distribusi Learning Index</p>
                <div className="mt-4 space-y-3">
                  {[
                    { range: "90-100%", count: 8, color: "bg-emerald-500" },
                    { range: "75-89%", count: 12, color: "bg-blue-500" },
                    { range: "60-74%", count: 7, color: "bg-yellow-400" },
                    { range: "< 60%", count: 3, color: "bg-red-500" },
                  ].map((item) => (
                    <div key={item.range} className="flex items-center gap-3">
                      <span className="w-16 text-xs font-bold text-slate-600">{item.range}</span>
                      <div className="flex-1 h-3 overflow-hidden rounded-sm bg-slate-100">
                        <div className={`h-full rounded-sm ${item.color}`} style={{ width: `${(item.count / activeClass.students) * 100}%` }} />
                      </div>
                      <span className="text-xs font-black text-slate-950">{item.count}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-lg border border-white/70 bg-slate-950 p-5 text-white shadow">
                <p className="text-xs font-black uppercase text-yellow-300">Rekomendasi</p>
                <div className="mt-4 space-y-3">
                  {[
                    "Berikan remedial untuk 3 siswa dengan LI < 60%",
                    "Tambah latihan soal untuk Bab 3",
                    "Ajak diskusi kelas untuk topik yang sulit",
                  ].map((item) => (
                    <div key={item} className="rounded-lg bg-white/10 p-3 text-sm font-bold leading-6">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
