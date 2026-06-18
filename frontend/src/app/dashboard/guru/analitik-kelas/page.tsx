"use client";

import DashboardShell from "@/components/layout/DashboardShell";
import { getMockClasses } from "@/lib/api";
import { useState } from "react";

export default function AnalitikKelasPage() {
  const classes = getMockClasses();
  const [selectedClass, setSelectedClass] = useState(classes[0]?.id || "");
  const activeClass = classes.find((item) => item.id === selectedClass) || classes[0];

  const weeklyData = [
    { day: "Sen", avgLI: 0, completion: 0, active: 0 },
    { day: "Sel", avgLI: 0, completion: 0, active: 0 },
    { day: "Rab", avgLI: 0, completion: 0, active: 0 },
    { day: "Kam", avgLI: 0, completion: 0, active: 0 },
    { day: "Jum", avgLI: 0, completion: 0, active: 0 },
    { day: "Sab", avgLI: 0, completion: 0, active: 0 },
    { day: "Min", avgLI: 0, completion: 0, active: 0 },
  ];

  return (
    <DashboardShell>
      <div className="space-y-5">
        <header className="rounded-lg border border-white/70 bg-white/72 p-5 shadow backdrop-blur-2xl">
          <p className="text-sm font-black uppercase text-indigo-600">Analitik</p>
          <h2 className="mt-2 text-4xl font-black text-slate-950 sm:text-5xl">Analitik Kelas</h2>
          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
            Pantau performa kelas, Learning Index, tingkat penyelesaian, dan aktivitas siswa.
          </p>
        </header>

        {!activeClass ? (
          <div className="rounded-lg border border-white/70 bg-white/72 p-8 text-center shadow backdrop-blur-2xl">
            <p className="text-5xl font-black text-slate-300">0</p>
            <h3 className="mt-4 text-2xl font-black text-slate-950">Belum Ada Data Analitik</h3>
            <p className="mt-2 text-sm font-bold text-slate-500">
              Data akan muncul setelah kelas memiliki siswa, pretest, materi, dan quiz.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 xl:grid-cols-[280px_1fr]">
            <div className="rounded-lg border border-white/70 bg-white/72 p-4 shadow backdrop-blur-2xl">
              <p className="mb-3 text-xs font-black uppercase text-slate-500">Pilih Kelas</p>
              <div className="space-y-2">
                {classes.map((cls) => (
                  <button
                    key={cls.id}
                    onClick={() => setSelectedClass(cls.id)}
                    className={`w-full rounded-lg border p-3 text-left transition ${
                      selectedClass === cls.id ? "border-indigo-200 bg-indigo-50 shadow-sm" : "border-slate-200 bg-white hover:border-slate-300"
                    }`}
                  >
                    <p className="text-sm font-black text-slate-950">{cls.name}</p>
                    <p className="text-xs font-bold text-slate-500">{cls.subject}</p>
                    <div className="mt-2 flex items-center gap-2 text-xs font-bold text-slate-500">
                      <span>{cls.students} siswa</span>
                      <span>{cls.avgIndex}%</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-5">
              <div className="grid gap-4 md:grid-cols-3">
                {[
                  { label: "Rata-rata Learning Index", value: `${activeClass.avgIndex}%`, trend: "0%", color: "from-indigo-500 to-blue-400" },
                  { label: "Tingkat Penyelesaian", value: "0%", trend: "0%", color: "from-emerald-500 to-green-400" },
                  { label: "Siswa Aktif", value: `${activeClass.students}`, trend: "0%", color: "from-yellow-400 to-orange-400" },
                ].map((metric) => (
                  <div key={metric.label} className={`rounded-lg bg-gradient-to-br ${metric.color} p-4 text-white shadow`}>
                    <p className="text-xs font-black text-white/80">{metric.label}</p>
                    <p className="mt-2 text-3xl font-black">{metric.value}</p>
                    <p className="text-xs font-black text-white/80">{metric.trend}</p>
                  </div>
                ))}
              </div>

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
                      {weeklyData.map((item) => (
                        <tr key={item.day} className="border-b border-slate-100">
                          <td className="py-3 pr-4 font-bold text-slate-950">{item.day}</td>
                          <td className="py-3 pr-4 font-bold">{item.avgLI}%</td>
                          <td className="py-3 pr-4 font-bold">{item.completion}%</td>
                          <td className="py-3 font-bold">{item.active}/{activeClass.students}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="rounded-lg border border-white/70 bg-slate-950 p-5 text-white shadow">
                <p className="text-xs font-black uppercase text-yellow-300">Rekomendasi</p>
                <p className="mt-3 text-sm font-bold leading-6 text-slate-300">
                  Rekomendasi akan dibuat setelah data siswa, pretest, quiz per bab, dan kuis akhir tersedia.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardShell>
  );
}
