"use client";

import DashboardShell from "@/components/layout/DashboardShell";
import { getMockClasses, getMockStudents } from "@/lib/api";
import { useState } from "react";

export default function GuruLearningIndexPage() {
  const classes = getMockClasses();
  const students = getMockStudents();
  const [selectedClass, setSelectedClass] = useState<string | null>(null);

  const hasClasses = classes.length > 0;
  const activeClass = selectedClass ? classes.find((c) => c.id === selectedClass) : classes[0];

  return (
    <DashboardShell>
      <div className="space-y-5">
        <header className="rounded-lg border border-white/70 bg-white/72 p-5 shadow backdrop-blur-2xl">
          <p className="text-sm font-black uppercase text-cyan-600">Learning Index</p>
          <h2 className="mt-2 text-4xl font-black text-slate-950 sm:text-5xl">Learning Index 📈</h2>
          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">Data akan muncul setelah siswa mulai belajar dan mengerjakan quiz.</p>
        </header>

        {!hasClasses && (
          <div className="rounded-lg border border-white/70 bg-white/72 p-8 text-center shadow backdrop-blur-2xl">
            <span className="text-5xl">📊</span>
            <h3 className="mt-4 text-2xl font-black text-slate-950">Belum Ada Data</h3>
            <p className="mt-2 text-sm text-slate-500">Belum ada kelas dan siswa terdaftar dalam sistem.</p>
          </div>
        )}

        {hasClasses && activeClass && (
          <div className="grid gap-5 xl:grid-cols-[280px_1fr]">
            <div className="rounded-lg border border-white/70 bg-white/72 p-4 shadow backdrop-blur-2xl">
              <p className="text-xs font-black uppercase text-slate-500 mb-3">Kelas</p>
              <div className="space-y-2">
                {classes.map((cls) => (
                  <button key={cls.id} onClick={() => setSelectedClass(cls.id)}
                    className={`w-full rounded-lg border p-3 text-left transition ${selectedClass === cls.id || (!selectedClass && classes[0]?.id === cls.id) ? "border-cyan-200 bg-cyan-50 shadow-sm" : "border-slate-200 bg-white hover:border-slate-300"}`}>
                    <p className="text-sm font-black text-slate-950">{cls.name}</p>
                    <p className="text-xs font-bold text-slate-500">{cls.subject}</p>
                    <div className="mt-2 text-xs font-bold text-slate-500">Rata-rata LI: {cls.avgIndex}%</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-white/70 bg-white/72 shadow backdrop-blur-2xl overflow-hidden">
              <div className="p-5 border-b border-slate-200">
                <p className="text-sm font-black text-slate-950">Daftar Siswa - {activeClass.name}</p>
              </div>
              {students.filter(s => s.kelas === activeClass.name).length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50/50 text-xs font-black uppercase text-slate-500">
                        <th className="px-5 py-4">Nama</th><th className="px-5 py-4">NIS</th>
                        <th className="px-5 py-4">Kelas</th><th className="px-5 py-4">Learning Index</th>
                        <th className="px-5 py-4">XP</th><th className="px-5 py-4">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.filter(s => s.kelas === activeClass.name).map((s) => (
                        <tr key={s.id} className="border-b border-slate-100 hover:bg-slate-50/50">
                          <td className="px-5 py-4 font-bold text-slate-950">{s.name}</td>
                          <td className="px-5 py-4 text-slate-600">{s.nis}</td>
                          <td className="px-5 py-4">{s.kelas}</td>
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-20 overflow-hidden rounded-sm bg-slate-100">
                                <div className={`h-full rounded-sm ${s.learningIndex >= 80 ? "bg-emerald-500" : s.learningIndex >= 60 ? "bg-yellow-400" : "bg-red-500"}`} style={{ width: `${s.learningIndex}%` }} />
                              </div>
                              <span className="text-xs font-black">{s.learningIndex}%</span>
                            </div>
                          </td>
                          <td className="px-5 py-4 font-bold">{s.xp}</td>
                          <td className="px-5 py-4">
                            <span className={`rounded-lg px-3 py-1 text-xs font-black ${s.learningIndex >= 75 ? "bg-emerald-100 text-emerald-700" : s.learningIndex >= 50 ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}>
                              {s.learningIndex >= 75 ? "Baik" : s.learningIndex >= 50 ? "Sedang" : "Perlu Bimbingan"}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-8 text-center">
                  <p className="font-bold text-slate-400">Belum ada siswa di kelas ini</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </DashboardShell>
  );
}
