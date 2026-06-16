"use client";

import DashboardShell from "@/components/layout/DashboardShell";
import { getMockClasses, getMockStudents } from "@/lib/api";
import { useState } from "react";

export default function KelasSayaPage() {
  const [activeTab, setActiveTab] = useState<"kelas" | "tambah">("kelas");
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const classes = getMockClasses();
  const students = getMockStudents();
  const [showAddModal, setShowAddModal] = useState(false);

  const activeClass = classes.find((c) => c.id === selectedClass) || classes[0];
  const classStudents = students.filter((s) => s.kelas === activeClass.name);

  return (
    <DashboardShell>
      <div className="space-y-5">
        {/* Header */}
        <header className="rounded-lg border border-white/70 bg-white/72 p-5 shadow-[0_24px_70px_rgba(15,23,42,0.08)] backdrop-blur-2xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-black uppercase text-emerald-600">Kelas Saya</p>
              <h2 className="mt-2 text-4xl font-black text-slate-950 sm:text-5xl">
                Manajemen Kelas 👨‍🏫
              </h2>
              <p className="mt-2 text-base leading-8 text-slate-600">
                Buat kelas, tambah siswa, pantau progress dan Learning Index.
              </p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex h-12 items-center gap-2 rounded-lg bg-emerald-600 px-5 text-sm font-black text-white shadow-lg shadow-emerald-600/20 hover:bg-emerald-700"
            >
              + Buat Kelas Baru
            </button>
          </div>
        </header>

        {/* Tab Navigation */}
        <div className="flex gap-2 rounded-lg bg-white/70 p-1 border border-white/70 backdrop-blur w-fit">
          <button
            onClick={() => setActiveTab("kelas")}
            className={`rounded-lg px-5 py-3 text-sm font-black transition ${
              activeTab === "kelas" ? "bg-slate-950 text-white shadow-lg" : "text-slate-600 hover:text-slate-950"
            }`}
          >
            Daftar Kelas
          </button>
          <button
            onClick={() => setActiveTab("tambah")}
            className={`rounded-lg px-5 py-3 text-sm font-black transition ${
              activeTab === "tambah" ? "bg-slate-950 text-white shadow-lg" : "text-slate-600 hover:text-slate-950"
            }`}
          >
            Tambah Siswa
          </button>
        </div>

        <div className="grid gap-5 xl:grid-cols-[320px_1fr]">
          {/* Class List */}
          <div className="rounded-lg border border-white/70 bg-white/72 p-4 shadow-[0_24px_70px_rgba(15,23,42,0.08)] backdrop-blur-2xl">
            <p className="text-xs font-black uppercase text-slate-500 mb-3">Semua Kelas</p>
            <div className="space-y-2">
              {classes.map((cls) => (
                <button
                  key={cls.id}
                  onClick={() => { setSelectedClass(cls.id); setActiveTab("kelas"); }}
                  className={`w-full rounded-lg border p-4 text-left transition ${
                    activeClass.id === cls.id
                      ? "border-emerald-200 bg-emerald-50 shadow-sm"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-base font-black text-slate-950">{cls.name}</p>
                      <p className="text-xs font-bold text-slate-500">{cls.subject}</p>
                    </div>
                    <span className={`rounded-lg px-3 py-1 text-xs font-black ${
                      cls.status === "aktif" ? "bg-emerald-100 text-emerald-700" : "bg-yellow-100 text-yellow-700"
                    }`}>
                      {cls.status === "aktif" ? "Aktif" : "Review"}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center gap-3 text-xs font-bold text-slate-500">
                    <span>👥 {cls.students} siswa</span>
                    <span>📊 {cls.avgIndex}% LI</span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-sm bg-slate-100">
                    <div className="h-full rounded-sm bg-gradient-to-r from-emerald-500 to-blue-500" style={{ width: `${cls.avgIndex}%` }} />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Class Detail */}
          <div className="space-y-5">
            {activeTab === "kelas" && (
              <>
                {/* Class Info */}
                <div className="rounded-lg border border-white/70 bg-white/72 p-5 shadow-[0_24px_70px_rgba(15,23,42,0.08)] backdrop-blur-2xl">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-black uppercase text-emerald-600">Detail Kelas</p>
                      <h3 className="text-2xl font-black text-slate-950">{activeClass.name}</h3>
                      <p className="text-sm font-bold text-slate-500">{activeClass.subject} • {activeClass.teacher}</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-black text-slate-700 hover:bg-slate-50">Edit</button>
                      <button className="rounded-lg bg-red-600 px-4 py-2 text-sm font-black text-white hover:bg-red-700">Hapus</button>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-4 sm:grid-cols-3">
                    {[
                      { label: "Total Siswa", value: String(activeClass.students), tone: "bg-blue-50 text-blue-700" },
                      { label: "Rata-rata LI", value: `${activeClass.avgIndex}%`, tone: "bg-emerald-50 text-emerald-700" },
                      { label: "Status", value: activeClass.status === "aktif" ? "Aktif" : "Review", tone: activeClass.status === "aktif" ? "bg-emerald-50 text-emerald-700" : "bg-yellow-50 text-yellow-700" },
                    ].map((stat) => (
                      <div key={stat.label} className={`rounded-lg ${stat.tone} p-4`}>
                        <p className="text-xs font-black opacity-80">{stat.label}</p>
                        <p className="mt-1 text-xl font-black">{stat.value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Student List */}
                <div className="rounded-lg border border-white/70 bg-white/72 p-5 shadow-[0_24px_70px_rgba(15,23,42,0.08)] backdrop-blur-2xl">
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-sm font-black text-slate-950">Daftar Siswa ({classStudents.length})</p>
                    <button className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-black text-white hover:bg-blue-700">+ Tambah</button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead>
                        <tr className="border-b border-slate-200 text-xs font-black uppercase text-slate-500">
                          <th className="pb-3 pr-4">Nama</th>
                          <th className="pb-3 pr-4">NIS</th>
                          <th className="pb-3 pr-4">XP</th>
                          <th className="pb-3 pr-4">Learning Index</th>
                          <th className="pb-3 pr-4">Streak</th>
                          <th className="pb-3">Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {classStudents.map((student) => (
                          <tr key={student.id} className="border-b border-slate-100">
                            <td className="py-3 pr-4 font-bold text-slate-950">{student.name}</td>
                            <td className="py-3 pr-4 text-slate-600">{student.nis}</td>
                            <td className="py-3 pr-4">{student.xp}</td>
                            <td className="py-3 pr-4">
                              <div className="flex items-center gap-2">
                                <div className="h-2 w-16 overflow-hidden rounded-sm bg-slate-100">
                                  <div className="h-full rounded-sm bg-gradient-to-r from-emerald-500 to-blue-500" style={{ width: `${student.learningIndex}%` }} />
                                </div>
                                <span className="text-xs font-black">{student.learningIndex}%</span>
                              </div>
                            </td>
                            <td className="py-3 pr-4">{student.streak} hari</td>
                            <td className="py-3">
                              <div className="flex gap-2">
                                <button className="rounded bg-blue-50 px-3 py-1 text-xs font-black text-blue-600 hover:bg-blue-100">Edit</button>
                                <button className="rounded bg-red-50 px-3 py-1 text-xs font-black text-red-600 hover:bg-red-100">Hapus</button>
                              </div>
                            </td>
                          </tr>
                        ))}
                        {classStudents.length === 0 && (
                          <tr>
                            <td colSpan={6} className="py-8 text-center font-bold text-slate-400">Belum ada siswa di kelas ini</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}

            {activeTab === "tambah" && (
              <div className="rounded-lg border border-white/70 bg-white/72 p-5 shadow-[0_24px_70px_rgba(15,23,42,0.08)] backdrop-blur-2xl">
                <p className="text-xs font-black uppercase text-emerald-600">Tambah Siswa</p>
                <h3 className="mt-1 text-2xl font-black text-slate-950">Tambah ke Kelas</h3>

                <form className="mt-5 space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block">
                      <span className="text-sm font-black text-slate-700">Nama Siswa</span>
                      <input type="text" placeholder="Nama lengkap" className="mt-2 h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100" />
                    </label>
                    <label className="block">
                      <span className="text-sm font-black text-slate-700">NIS</span>
                      <input type="text" placeholder="Nomor Induk Siswa" className="mt-2 h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100" />
                    </label>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block">
                      <span className="text-sm font-black text-slate-700">Email</span>
                      <input type="email" placeholder="nama@email.com" className="mt-2 h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100" />
                    </label>
                    <label className="block">
                      <span className="text-sm font-black text-slate-700">Kelas</span>
                      <select className="mt-2 h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100">
                        {classes.map((c) => (
                          <option key={c.id} value={c.name}>{c.name}</option>
                        ))}
                      </select>
                    </label>
                  </div>
                  <button type="submit" className="inline-flex h-12 items-center gap-2 rounded-lg bg-emerald-600 px-6 text-sm font-black text-white shadow-lg hover:bg-emerald-700">
                    + Tambah Siswa
                  </button>
                </form>

                <div className="mt-6 rounded-lg border border-blue-200 bg-blue-50 p-4">
                  <p className="text-sm font-black text-blue-700">Atau impor dari Excel</p>
                  <p className="mt-1 text-xs leading-5 text-blue-700/80">
                    Upload file .csv atau .xlsx dengan kolom: nama, nis, email, kelas
                  </p>
                  <button className="mt-3 rounded-lg bg-white px-4 py-2 text-sm font-black text-blue-700 shadow-sm border border-blue-200">Pilih File</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Class Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm" onClick={() => setShowAddModal(false)}>
          <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-2xl mx-4" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-2xl font-black text-slate-950">Buat Kelas Baru</h3>
            <form className="mt-5 space-y-4" onSubmit={(e) => { e.preventDefault(); setShowAddModal(false); }}>
              <label className="block">
                <span className="text-sm font-black text-slate-700">Nama Kelas</span>
                <input type="text" placeholder="Contoh: X IPA 1" className="mt-2 h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100" />
              </label>
              <label className="block">
                <span className="text-sm font-black text-slate-700">Mata Pelajaran</span>
                <select className="mt-2 h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100">
                  {["Biologi", "Matematika", "Fisika", "Kimia", "Bahasa Indonesia", "Bahasa Inggris", "Sejarah", "Ekonomi"].map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </label>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 rounded-lg border border-slate-300 py-3 text-sm font-black text-slate-700">Batal</button>
                <button type="submit" className="flex-1 rounded-lg bg-emerald-600 py-3 text-sm font-black text-white shadow-lg hover:bg-emerald-700">Buat Kelas</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}
