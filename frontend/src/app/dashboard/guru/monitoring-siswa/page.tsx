"use client";

import DashboardShell from "@/components/layout/DashboardShell";
import { getMockClasses, getMockStudents } from "@/lib/api";
import { useState } from "react";

export default function MonitoringSiswaPage() {
  const classes = getMockClasses();
  const students = getMockStudents();
  const [selectedClass, setSelectedClass] = useState(classes[0].id);
  const [search, setSearch] = useState("");

  const activeClass = classes.find((c) => c.id === selectedClass) || classes[0];
  const classStudents = students.filter((s) => s.kelas === activeClass.name);
  const filtered = classStudents.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()) || s.nis.includes(search)
  );

  return (
    <DashboardShell>
      <div className="space-y-5">
        <header className="rounded-lg border border-white/70 bg-white/72 p-5 shadow backdrop-blur-2xl">
          <p className="text-sm font-black uppercase text-yellow-600">Monitoring</p>
          <h2 className="mt-2 text-4xl font-black text-slate-950 sm:text-5xl">Monitoring Siswa 👀</h2>
          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
            Pantau aktivitas, progress, dan Learning Index setiap siswa secara detail.
          </p>
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari siswa..." className="mt-5 h-12 w-full max-w-md rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold outline-none focus:border-yellow-500 focus:ring-4 focus:ring-yellow-100" />
        </header>

        <div className="grid gap-5 xl:grid-cols-[280px_1fr]">
          <div className="rounded-lg border border-white/70 bg-white/72 p-4 shadow backdrop-blur-2xl">
            <p className="text-xs font-black uppercase text-slate-500 mb-3">Kelas</p>
            <div className="space-y-2">
              {classes.map((cls) => (
                <button key={cls.id} onClick={() => setSelectedClass(cls.id)}
                  className={`w-full rounded-lg border p-3 text-left transition ${selectedClass === cls.id ? "border-yellow-200 bg-yellow-50 shadow-sm" : "border-slate-200 bg-white hover:border-slate-300"}`}>
                  <p className="text-sm font-black text-slate-950">{cls.name}</p>
                  <p className="text-xs font-bold text-slate-500">{cls.subject} • {cls.students} siswa</p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-500">Rata-rata LI: {cls.avgIndex}%</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            {/* Class Stats */}
            <div className="grid gap-4 md:grid-cols-3">
              {[
                { label: "Total Siswa", value: String(activeClass.students), color: "bg-blue-50 text-blue-700" },
                { label: "Rata-rata LI", value: `${activeClass.avgIndex}%`, color: "bg-emerald-50 text-emerald-700" },
                { label: "Status", value: activeClass.status === "aktif" ? "Aktif" : "Review", color: activeClass.status === "aktif" ? "bg-emerald-50 text-emerald-700" : "bg-yellow-50 text-yellow-700" },
              ].map((s) => (
                <div key={s.label} className={`rounded-lg ${s.color} p-4`}>
                  <p className="text-xs font-black opacity-80">{s.label}</p>
                  <p className="mt-1 text-xl font-black">{s.value}</p>
                </div>
              ))}
            </div>

            {/* Student Table */}
            <div className="rounded-lg border border-white/70 bg-white/72 shadow backdrop-blur-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50/50 text-xs font-black uppercase text-slate-500">
                      <th className="px-5 py-4">Nama</th><th className="px-5 py-4">NIS</th>
                      <th className="px-5 py-4">XP</th><th className="px-5 py-4">Learning Index</th>
                      <th className="px-5 py-4">Streak</th><th className="px-5 py-4">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((s) => (
                      <tr key={s.id} className="border-b border-slate-100 hover:bg-slate-50/50">
                        <td className="px-5 py-4 font-bold text-slate-950">{s.name}</td>
                        <td className="px-5 py-4 text-slate-600">{s.nis}</td>
                        <td className="px-5 py-4 font-bold">{s.xp}</td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-16 overflow-hidden rounded-sm bg-slate-100">
                              <div className="h-full rounded-sm bg-gradient-to-r from-emerald-500 to-blue-500" style={{ width: `${s.learningIndex}%` }} />
                            </div>
                            <span className="text-xs font-black">{s.learningIndex}%</span>
                          </div>
                        </td>
                        <td className="px-5 py-4">{s.streak} hari</td>
                        <td className="px-5 py-4">
                          <button className="rounded bg-blue-50 px-3 py-1.5 text-xs font-black text-blue-600 hover:bg-blue-100">Detail</button>
                        </td>
                      </tr>
                    ))}
                    {filtered.length === 0 && (
                      <tr><td colSpan={6} className="py-8 text-center font-bold text-slate-400">Tidak ada siswa</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
